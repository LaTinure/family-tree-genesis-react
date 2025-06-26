
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, RotateCcw, User, Crown } from 'lucide-react';
import { FamilyTreeNode } from '@/types/family';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface Position {
  x: number;
  y: number;
}

export const FamilyTree = () => {
  const { members, isLoading } = useFamilyMembers();
  const svgRef = useRef<SVGSVGElement>(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [selectedMember, setSelectedMember] = useState<FamilyTreeNode | null>(null);
  const [treeData, setTreeData] = useState<FamilyTreeNode | null>(null);

  // Construire l'arbre familial
  useEffect(() => {
    if (members.length === 0) return;

    const memberMap = new Map<string, FamilyTreeNode>();
    members.forEach(member => {
      memberMap.set(member.id, { ...member, level: 0, children: [] });
    });

    // Trouver la racine (patriarche/matriarche)
    const root = members.find(m => m.is_patriarch) || members[0];
    if (!root) return;

    const buildTree = (member: FamilyTreeNode, level: number = 0): FamilyTreeNode => {
      member.level = level;
      
      // Trouver les enfants
      const children = members.filter(m => 
        m.father_id === member.id || m.mother_id === member.id
      );

      member.children = children.map(child => 
        buildTree(memberMap.get(child.id)!, level + 1)
      );

      return member;
    };

    const tree = buildTree(memberMap.get(root.id)!);
    setTreeData(tree);
  }, [members]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleReset = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const renderNode = (node: FamilyTreeNode, x: number, y: number, index: number) => {
    const nodeWidth = 160;
    const nodeHeight = 80;
    const spacing = 200;
    
    const nodeX = x + (index - (node.children?.length || 0) / 2) * spacing;
    const nodeY = y;

    return (
      <g key={node.id}>
        {/* Connexions vers les enfants */}
        {node.children?.map((child, childIndex) => {
          const childX = nodeX + (childIndex - (node.children?.length || 0) / 2) * spacing;
          const childY = nodeY + 150;
          
          return (
            <line
              key={`${node.id}-${child.id}`}
              x1={nodeX}
              y1={nodeY + nodeHeight}
              x2={childX}
              y2={childY}
              stroke="#e2e8f0"
              strokeWidth="2"
              className="transition-colors duration-300"
            />
          );
        })}
        
        {/* Nœud principal */}
        <g
          className="cursor-pointer transition-transform duration-300 hover:scale-105"
          onClick={() => setSelectedMember(node)}
        >
          <rect
            x={nodeX - nodeWidth / 2}
            y={nodeY}
            width={nodeWidth}
            height={nodeHeight}
            rx="12"
            fill="white"
            stroke={node.is_patriarch ? "#f59e0b" : "#e2e8f0"}
            strokeWidth={node.is_patriarch ? "3" : "2"}
            className="shadow-lg"
          />
          
          {/* Avatar */}
          <circle
            cx={nodeX - nodeWidth / 2 + 30}
            cy={nodeY + 25}
            r="15"
            fill={node.photo_url ? `url(#avatar-${node.id})` : "#f3f4f6"}
            stroke="#e2e8f0"
            strokeWidth="2"
          />
          
          {node.photo_url && (
            <defs>
              <pattern
                id={`avatar-${node.id}`}
                patternUnits="userSpaceOnUse"
                width="30"
                height="30"
              >
                <image
                  href={node.photo_url}
                  x="0"
                  y="0"
                  width="30"
                  height="30"
                  preserveAspectRatio="xMidYMid slice"
                />
              </pattern>
            </defs>
          )}
          
          {!node.photo_url && (
            <User
              x={nodeX - nodeWidth / 2 + 22}
              y={nodeY + 17}
              width="16"
              height="16"
              className="text-gray-400"
            />
          )}
          
          {/* Icône patriarche */}
          {node.is_patriarch && (
            <Crown
              x={nodeX - nodeWidth / 2 + 130}
              y={nodeY + 10}
              width="16"
              height="16"
              className="text-yellow-500"
            />
          )}
          
          {/* Nom */}
          <text
            x={nodeX - nodeWidth / 2 + 55}
            y={nodeY + 20}
            className="text-sm font-semibold fill-gray-800"
          >
            {node.first_name} {node.last_name}
          </text>
          
          {/* Relation */}
          <text
            x={nodeX - nodeWidth / 2 + 55}
            y={nodeY + 38}
            className="text-xs fill-gray-600"
          >
            {node.relationship_type}
          </text>
          
          {/* Localisation */}
          {node.current_location && (
            <text
              x={nodeX - nodeWidth / 2 + 55}
              y={nodeY + 55}
              className="text-xs fill-gray-500"
            >
              📍 {node.current_location}
            </text>
          )}
        </g>
        
        {/* Enfants */}
        {node.children?.map((child, childIndex) => 
          renderNode(child, nodeX, nodeY + 150, childIndex)
        )}
      </g>
    );
  };

  if (isLoading) {
    return (
      <Card className="h-96">
        <CardContent className="flex items-center justify-center h-full">
          <LoadingSpinner size="lg" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Arbre Familial Interactif
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleZoomOut}>
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleZoomIn}>
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 h-full">
        <div className="relative w-full h-96 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100">
          <svg
            ref={svgRef}
            className="w-full h-full"
            style={{
              transform: `scale(${zoom}) translate(${position.x}px, ${position.y}px)`
            }}
          >
            {treeData && renderNode(treeData, 400, 50, 0)}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};
