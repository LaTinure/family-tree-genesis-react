
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw, User, Crown, Phone } from 'lucide-react';
import { FamilyTreeNode } from '@/types/family';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { UserAvatar } from '@/components/shared/UserAvatar';

interface Position {
  x: number;
  y: number;
}

interface TreeLayout {
  [key: string]: {
    x: number;
    y: number;
    level: number;
  };
}

export const FamilyTree = () => {
  const { members, isLoading } = useFamilyMembers();
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(0.8);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [selectedMember, setSelectedMember] = useState<FamilyTreeNode | null>(null);
  const [treeLayout, setTreeLayout] = useState<TreeLayout>({});

  console.log('🌳 [FamilyTree] État actuel:', { members: members.length, isLoading });

  // Construire l'arbre familial avec une logique généalogique complète
  useEffect(() => {
    console.log('🔨 [FamilyTree] Construction de l\'arbre avec', members.length, 'membres');

    if (members.length === 0) {
      console.log('⚠️ [FamilyTree] Aucun membre disponible');
      return;
    }

    const layout = calculateTreeLayout(members);
    setTreeLayout(layout);
  }, [members]);

  const calculateTreeLayout = (familyMembers: any[]): TreeLayout => {
    const layout: TreeLayout = {};
    const nodeWidth = 200;
    const nodeHeight = 120;
    const levelSpacing = 180;
    const siblingSpacing = 220;
    
    // Identifier les patriarches/matriarches (génération 0)
    const patriarchs = familyMembers.filter(m => m.is_patriarch || m.relationship_type === 'patriarche');
    const matriarchs = familyMembers.filter(m => m.relationship_type === 'matriarche');
    
    // Créer les couples fondateurs
    const founders = [...patriarchs, ...matriarchs];
    
    // Si pas de patriarche/matriarche, prendre les plus anciens
    if (founders.length === 0) {
      const oldest = familyMembers
        .filter(m => !m.father_id && !m.mother_id)
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        .slice(0, 2);
      founders.push(...oldest);
    }

    let currentX = 400;
    const baseY = 50;

    // Placer les fondateurs (niveau 0)
    founders.forEach((founder, index) => {
      layout[founder.id] = {
        x: currentX + (index * 250),
        y: baseY,
        level: 0
      };
    });

    // Placer les enfants de chaque génération
    const processedLevels = new Set<number>();
    
    for (let level = 0; level < 5; level++) {
      const currentLevelMembers = Object.keys(layout)
        .filter(id => layout[id].level === level)
        .map(id => familyMembers.find(m => m.id === id))
        .filter(Boolean);

      if (currentLevelMembers.length === 0) break;

      // Trouver les enfants de ce niveau
      const children = familyMembers.filter(member => 
        currentLevelMembers.some(parent => 
          member.father_id === parent.id || member.mother_id === parent.id
        ) && !layout[member.id]
      );

      if (children.length === 0) continue;

      // Grouper les enfants par parents
      const childrenByParent: { [parentId: string]: any[] } = {};
      
      children.forEach(child => {
        const parentId = child.father_id || child.mother_id;
        if (parentId && currentLevelMembers.find(p => p.id === parentId)) {
          if (!childrenByParent[parentId]) {
            childrenByParent[parentId] = [];
          }
          childrenByParent[parentId].push(child);
        }
      });

      // Placer les enfants
      Object.keys(childrenByParent).forEach(parentId => {
        const parent = layout[parentId];
        const siblings = childrenByParent[parentId];
        
        siblings.forEach((child, index) => {
          const childX = parent.x + (index - (siblings.length - 1) / 2) * siblingSpacing;
          const childY = parent.y + levelSpacing;
          
          layout[child.id] = {
            x: childX,
            y: childY,
            level: level + 1
          };
        });
      });
    }

    // Placer les membres restants (conjoints, etc.)
    const remainingMembers = familyMembers.filter(m => !layout[m.id]);
    remainingMembers.forEach((member, index) => {
      // Essayer de placer près d'un conjoint ou parent
      let targetX = 100 + (index * 250);
      let targetY = baseY;
      
      // Si c'est un conjoint, placer à côté
      if (member.relationship_type === 'epoux' || member.relationship_type === 'epouse') {
        const spouse = familyMembers.find(m => 
          (m.relationship_type === 'patriarche' || m.relationship_type === 'matriarche') &&
          layout[m.id]
        );
        if (spouse && layout[spouse.id]) {
          targetX = layout[spouse.id].x + (member.relationship_type === 'epoux' ? -100 : 100);
          targetY = layout[spouse.id].y;
        }
      }
      
      layout[member.id] = {
        x: targetX,
        y: targetY,
        level: 0
      };
    });

    return layout;
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.3));
  const handleReset = () => {
    setZoom(0.8);
    setPosition({ x: 0, y: 0 });
  };

  const renderConnections = () => {
    const connections: JSX.Element[] = [];
    
    members.forEach(member => {
      const memberLayout = treeLayout[member.id];
      if (!memberLayout) return;

      // Connexions parent-enfant
      if (member.father_id && treeLayout[member.father_id]) {
        const parentLayout = treeLayout[member.father_id];
        connections.push(
          <line
            key={`${member.father_id}-${member.id}`}
            x1={parentLayout.x}
            y1={parentLayout.y + 60}
            x2={memberLayout.x}
            y2={memberLayout.y}
            stroke="#25D366"
            strokeWidth="2"
            className="opacity-60"
          />
        );
      }
      
      if (member.mother_id && treeLayout[member.mother_id]) {
        const parentLayout = treeLayout[member.mother_id];
        connections.push(
          <line
            key={`${member.mother_id}-${member.id}`}
            x1={parentLayout.x}
            y1={parentLayout.y + 60}
            x2={memberLayout.x}
            y2={memberLayout.y}
            stroke="#25D366"
            strokeWidth="2"
            className="opacity-60"
          />
        );
      }
    });

    return connections;
  };

  const renderMemberNode = (member: any) => {
    const layout = treeLayout[member.id];
    if (!layout) return null;

    const nodeWidth = 180;
    const nodeHeight = 100;

    return (
      <g key={member.id}>
        {/* Nœud principal */}
        <g
          className="cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => setSelectedMember(member)}
        >
          {/* Fond de la carte */}
          <rect
            x={layout.x - nodeWidth / 2}
            y={layout.y}
            width={nodeWidth}
            height={nodeHeight}
            rx="12"
            fill="white"
            stroke={member.is_patriarch ? "#FFD700" : "#25D366"}
            strokeWidth={member.is_patriarch ? "3" : "2"}
            className="shadow-lg filter drop-shadow-md"
          />

          {/* Avatar */}
          <circle
            cx={layout.x - nodeWidth / 2 + 30}
            cy={layout.y + 30}
            r="20"
            fill={member.photo_url ? `url(#avatar-${member.id})` : "#E5E7EB"}
            stroke="#25D366"
            strokeWidth="2"
          />

          {member.photo_url && (
            <defs>
              <pattern
                id={`avatar-${member.id}`}
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
              >
                <image
                  href={member.photo_url}
                  x="0"
                  y="0"
                  width="40"
                  height="40"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            </defs>
          )}

          {!member.photo_url && (
            <User
              x={layout.x - nodeWidth / 2 + 22}
              y={layout.y + 22}
              width="16"
              height="16"
              className="text-gray-400"
            />
          )}

          {/* Icône patriarche */}
          {member.is_patriarch && (
            <Crown
              x={layout.x - nodeWidth / 2 + 150}
              y={layout.y + 8}
              width="16"
              height="16"
              className="text-yellow-500 fill-current"
            />
          )}

          {/* Nom complet */}
          <text
            x={layout.x - nodeWidth / 2 + 60}
            y={layout.y + 25}
            className="text-sm font-semibold fill-gray-800"
            style={{ fontSize: '12px' }}
          >
            {`${member.first_name} ${member.last_name}`.length > 16 
              ? `${member.first_name} ${member.last_name}`.substring(0, 16) + '...'
              : `${member.first_name} ${member.last_name}`
            }
          </text>

          {/* Relation */}
          <text
            x={layout.x - nodeWidth / 2 + 60}
            y={layout.y + 42}
            className="text-xs fill-whatsapp-600"
            style={{ fontSize: '10px' }}
          >
            {member.relationship_type}
          </text>

          {/* Téléphone */}
          {member.phone && (
            <>
              <Phone
                x={layout.x - nodeWidth / 2 + 60}
                y={layout.y + 50}
                width="10"
                height="10"
                className="text-whatsapp-500"
              />
              <text
                x={layout.x - nodeWidth / 2 + 75}
                y={layout.y + 60}
                className="text-xs fill-whatsapp-500"
                style={{ fontSize: '9px' }}
              >
                {member.phone.length > 12 ? member.phone.substring(0, 12) + '...' : member.phone}
              </text>
            </>
          )}

          {/* Localisation */}
          {member.current_location && (
            <text
              x={layout.x - nodeWidth / 2 + 60}
              y={layout.y + 78}
              className="text-xs fill-gray-500"
              style={{ fontSize: '9px' }}
            >
              📍 {member.current_location.length > 12 
                ? member.current_location.substring(0, 12) + '...' 
                : member.current_location
              }
            </text>
          )}
        </g>
      </g>
    );
  };

  if (isLoading) {
    return (
      <Card className="h-96 border-whatsapp-200">
        <CardContent className="flex items-center justify-center h-full">
          <LoadingSpinner size="lg" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full border-whatsapp-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-whatsapp-700">
            <User className="w-5 h-5" />
            Arbre Familial Interactif
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut} className="border-whatsapp-300 text-whatsapp-600 hover:bg-whatsapp-50">
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomIn} className="border-whatsapp-300 text-whatsapp-600 hover:bg-whatsapp-50">
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset} className="border-whatsapp-300 text-whatsapp-600 hover:bg-whatsapp-50">
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-full">
        <div className="relative w-full h-96 overflow-hidden bg-gradient-to-br from-whatsapp-50 to-white">
          <svg
            ref={svgRef}
            className="w-full h-full"
            style={{
              transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`
            }}
            viewBox="0 0 1200 800"
          >
            {/* Rendu des connexions */}
            {renderConnections()}
            
            {/* Rendu des membres */}
            {members.map(member => renderMemberNode(member))}
          </svg>
          
          {/* Informations sur le membre sélectionné */}
          {selectedMember && (
            <div className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-whatsapp-200 max-w-xs">
              <div className="flex items-center gap-3 mb-2">
                <UserAvatar
                  user={{
                    first_name: selectedMember.first_name,
                    last_name: selectedMember.last_name,
                    photo_url: selectedMember.photo_url,
                  }}
                  size="md"
                />
                <div>
                  <h3 className="font-semibold text-whatsapp-700">
                    {selectedMember.first_name} {selectedMember.last_name}
                  </h3>
                  <p className="text-sm text-whatsapp-600">{selectedMember.relationship_type}</p>
                </div>
              </div>
              {selectedMember.phone && (
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  {selectedMember.phone}
                </p>
              )}
              {selectedMember.current_location && (
                <p className="text-sm text-gray-600">📍 {selectedMember.current_location}</p>
              )}
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full border-whatsapp-300 text-whatsapp-600 hover:bg-whatsapp-50"
                onClick={() => setSelectedMember(null)}
              >
                Fermer
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
