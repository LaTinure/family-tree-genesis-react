
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ZoomIn, ZoomOut, RotateCcw, Search, Crown, Phone, MapPin } from 'lucide-react';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { FamilyMember } from '@/types/family';
import { motion } from 'framer-motion';

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

export const EnhancedFamilyTree = () => {
  const { members, isLoading } = useFamilyMembers();
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.8);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedMember, setHighlightedMember] = useState<string | null>(null);
  const [treeLayout, setTreeLayout] = useState<TreeLayout>({});
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });

  // Construire l'arbre généalogique
  useEffect(() => {
    if (members.length === 0) return;
    const layout = calculateCircularTreeLayout(members);
    setTreeLayout(layout);
  }, [members]);

  // Recherche de membres
  useEffect(() => {
    if (searchTerm.trim()) {
      const foundMember = members.find(member => 
        `${member.first_name} ${member.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (foundMember) {
        setHighlightedMember(foundMember.id);
        setSelectedMember(foundMember);
        // Centrer sur le membre trouvé
        const memberLayout = treeLayout[foundMember.id];
        if (memberLayout) {
          setPosition({
            x: -memberLayout.x + 400,
            y: -memberLayout.y + 300
          });
        }
      } else {
        setHighlightedMember(null);
      }
    } else {
      setHighlightedMember(null);
    }
  }, [searchTerm, members, treeLayout]);

  const calculateCircularTreeLayout = (familyMembers: FamilyMember[]): TreeLayout => {
    const layout: TreeLayout = {};
    const centerX = 600;
    const centerY = 400;
    const nodeRadius = 60;
    const levelSpacing = 200;
    
    // Identifier les patriarches/matriarches (niveau 0)
    const founders = familyMembers.filter(m => 
      m.is_patriarch || m.relationship_type === 'patriarche' || m.relationship_type === 'matriarche'
    );
    
    // Si pas de patriarche/matriarche, prendre les plus anciens
    if (founders.length === 0) {
      const oldest = familyMembers
        .filter(m => !m.father_id && !m.mother_id)
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
        .slice(0, 2);
      founders.push(...oldest);
    }

    // Placer les fondateurs au centre
    founders.forEach((founder, index) => {
      const angle = (index * 2 * Math.PI) / Math.max(founders.length, 1);
      layout[founder.id] = {
        x: centerX + Math.cos(angle) * 50,
        y: centerY + Math.sin(angle) * 50,
        level: 0
      };
    });

    // Placer les générations suivantes en cercles concentriques
    for (let level = 1; level < 5; level++) {
      const currentLevelMembers = Object.keys(layout)
        .filter(id => layout[id].level === level - 1)
        .map(id => familyMembers.find(m => m.id === id))
        .filter(Boolean);

      if (currentLevelMembers.length === 0) break;

      // Trouver les enfants de ce niveau
      const children = familyMembers.filter(member => 
        currentLevelMembers.some(parent => 
          member.father_id === parent?.id || member.mother_id === parent?.id
        ) && !layout[member.id]
      );

      if (children.length === 0) continue;

      // Placer les enfants en cercle
      const radius = levelSpacing * level;
      children.forEach((child, index) => {
        const angle = (index * 2 * Math.PI) / children.length;
        layout[child.id] = {
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius,
          level: level
        };
      });
    }

    // Placer les membres restants
    const remainingMembers = familyMembers.filter(m => !layout[m.id]);
    remainingMembers.forEach((member, index) => {
      const angle = (index * 2 * Math.PI) / remainingMembers.length;
      const radius = levelSpacing * 3;
      layout[member.id] = {
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        level: 2
      };
    });

    return layout;
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.3));
  const handleReset = () => {
    setZoom(0.8);
    setPosition({ x: 0, y: 0 });
    setSelectedMember(null);
    setSearchTerm('');
    setHighlightedMember(null);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
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
            y1={parentLayout.y}
            x2={memberLayout.x}
            y2={memberLayout.y}
            stroke="#25D366"
            strokeWidth="2"
            className="opacity-60"
            strokeDasharray="5,5"
          />
        );
      }
      
      if (member.mother_id && treeLayout[member.mother_id]) {
        const parentLayout = treeLayout[member.mother_id];
        connections.push(
          <line
            key={`${member.mother_id}-${member.id}`}
            x1={parentLayout.x}
            y1={parentLayout.y}
            x2={memberLayout.x}
            y2={memberLayout.y}
            stroke="#25D366"
            strokeWidth="2"
            className="opacity-60"
            strokeDasharray="5,5"
          />
        );
      }
    });

    return connections;
  };

  const renderCircularMemberNode = (member: FamilyMember) => {
    const layout = treeLayout[member.id];
    if (!layout) return null;

    const nodeRadius = 50;
    const isHighlighted = highlightedMember === member.id;
    const strokeColor = member.is_patriarch ? "#FFD700" : 
                      isHighlighted ? "#FF6B6B" : "#25D366";
    const strokeWidth = member.is_patriarch ? 4 : isHighlighted ? 4 : 2;

    return (
      <g key={member.id}>
        {/* Cercle principal */}
        <motion.g
          className="cursor-pointer"
          onClick={() => setSelectedMember(member)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Effet de surbrillance */}
          {isHighlighted && (
            <circle
              cx={layout.x}
              cy={layout.y}
              r={nodeRadius + 10}
              fill="none"
              stroke="#FF6B6B"
              strokeWidth="3"
              className="animate-pulse"
              opacity="0.6"
            />
          )}

          {/* Cercle de fond */}
          <circle
            cx={layout.x}
            cy={layout.y}
            r={nodeRadius}
            fill="white"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            className="shadow-lg filter drop-shadow-md"
          />

          {/* Avatar */}
          {member.photo_url ? (
            <>
              <defs>
                <pattern
                  id={`avatar-${member.id}`}
                  patternUnits="userSpaceOnUse"
                  width={nodeRadius * 2}
                  height={nodeRadius * 2}
                >
                  <image
                    href={member.photo_url}
                    x="0"
                    y="0"
                    width={nodeRadius * 2}
                    height={nodeRadius * 2}
                    preserveAspectRatio="xMidYMid slice"
                  />
                </pattern>
                <clipPath id={`clip-${member.id}`}>
                  <circle cx={layout.x} cy={layout.y} r={nodeRadius - 3} />
                </clipPath>
              </defs>
              <circle
                cx={layout.x}
                cy={layout.y}
                r={nodeRadius - 3}
                fill={`url(#avatar-${member.id})`}
                clipPath={`url(#clip-${member.id})`}
              />
            </>
          ) : (
            <circle
              cx={layout.x}
              cy={layout.y}
              r={nodeRadius - 10}
              fill="#E5E7EB"
            />
          )}

          {/* Icône patriarche */}
          {member.is_patriarch && (
            <Crown
              x={layout.x - 8}
              y={layout.y - nodeRadius - 20}
              width="16"
              height="16"
              className="text-yellow-500 fill-current"
            />
          )}

          {/* Nom (en dessous du cercle) */}
          <text
            x={layout.x}
            y={layout.y + nodeRadius + 20}
            textAnchor="middle"
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
            x={layout.x}
            y={layout.y + nodeRadius + 35}
            textAnchor="middle"
            className="text-xs fill-whatsapp-600"
            style={{ fontSize: '10px' }}
          >
            {member.relationship_type}
          </text>
        </motion.g>
      </g>
    );
  };

  if (isLoading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="h-full">
      {/* Barre de contrôles */}
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-2">
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
        
        {/* Barre de recherche */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Rechercher un membre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-whatsapp-200 focus:border-whatsapp-500"
          />
        </div>
      </div>

      {/* Conteneur de l'arbre */}
      <div 
        ref={containerRef}
        className="relative w-full h-[600px] overflow-hidden bg-gradient-to-br from-whatsapp-50 to-white rounded-lg border border-whatsapp-200 cursor-move"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <svg
          ref={svgRef}
          className="w-full h-full"
          style={{
            transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: 'center center'
          }}
          viewBox="0 0 1200 800"
        >
          {/* Rendu des connexions */}
          {renderConnections()}
          
          {/* Rendu des membres */}
          {members.map(member => renderCircularMemberNode(member))}
        </svg>
        
        {/* Informations sur le membre sélectionné */}
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border border-whatsapp-200 max-w-xs"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-whatsapp-100 to-whatsapp-200 flex items-center justify-center">
                {selectedMember.photo_url ? (
                  <img
                    src={selectedMember.photo_url}
                    alt="Avatar"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-whatsapp-600 font-semibold">
                    {selectedMember.first_name[0]}{selectedMember.last_name[0]}
                  </span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-whatsapp-700">
                  {selectedMember.first_name} {selectedMember.last_name}
                  {selectedMember.is_patriarch && (
                    <Crown className="inline w-4 h-4 ml-1 text-yellow-500" />
                  )}
                </h3>
                <p className="text-sm text-whatsapp-600">{selectedMember.relationship_type}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              {selectedMember.phone && (
                <p className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-3 h-3" />
                  {selectedMember.phone}
                </p>
              )}
              {selectedMember.current_location && (
                <p className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-3 h-3" />
                  {selectedMember.current_location}
                </p>
              )}
              {selectedMember.profession && (
                <p className="text-gray-600">
                  💼 {selectedMember.profession}
                </p>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-full border-whatsapp-300 text-whatsapp-600 hover:bg-whatsapp-50"
              onClick={() => setSelectedMember(null)}
            >
              Fermer
            </Button>
          </motion.div>
        )}

        {/* Légende */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-lg shadow-sm text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full border-2 border-yellow-500"></div>
              <span>Patriarche/Matriarche</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full border-2 border-green-500"></div>
              <span>Membre</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full border-2 border-red-500"></div>
              <span>Recherché</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
