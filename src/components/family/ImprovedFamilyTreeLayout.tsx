
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ZoomIn, ZoomOut, RotateCcw, Search, Crown, Phone, MapPin, User } from 'lucide-react';
import { useFamilyMembers } from '@/hooks/useFamilyMembers';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { FamilyMember } from '@/types/family';
import { motion, AnimatePresence } from 'framer-motion';

interface Position {
  x: number;
  y: number;
}

interface DraggableNode {
  member: FamilyMember;
  position: Position;
  isDragging: boolean;
}

interface TreeLayoutNode {
  member: FamilyMember;
  x: number;
  y: number;
  level: number;
  children: TreeLayoutNode[];
}

export const ImprovedFamilyTreeLayout = () => {
  const { members, isLoading } = useFamilyMembers();
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);
  const [panPosition, setPanPosition] = useState<Position>({ x: 0, y: 0 });
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedMember, setHighlightedMember] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [nodes, setNodes] = useState<DraggableNode[]>([]);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<Position>({ x: 0, y: 0 });

  // Construire la hiérarchie généalogique correcte
  const buildFamilyHierarchy = useCallback((familyMembers: FamilyMember[]): TreeLayoutNode[] => {
    if (!familyMembers || familyMembers.length === 0) return [];

    // Identifier les patriarches/matriarches (racines)
    const roots = familyMembers.filter(member => 
      member.is_patriarch || 
      member.relationship_type === 'patriarche' || 
      member.relationship_type === 'matriarche' ||
      (!member.father_id && !member.mother_id)
    );

    // Si pas de patriarche, prendre les plus anciens
    if (roots.length === 0 && familyMembers.length > 0) {
      const oldest = familyMembers
        .sort((a, b) => new Date(a.birth_date || '1900-01-01').getTime() - new Date(b.birth_date || '1900-01-01').getTime())
        .slice(0, 2);
      roots.push(...oldest);
    }

    const buildTree = (parent: FamilyMember, level: number): TreeLayoutNode => {
      // Trouver les enfants directs
      const children = familyMembers.filter(member => 
        member.father_id === parent.id || member.mother_id === parent.id
      );

      const childNodes = children.map(child => buildTree(child, level + 1));

      return {
        member: parent,
        x: 0, // Position calculée plus tard
        y: 0,
        level,
        children: childNodes
      };
    };

    return roots.map(root => buildTree(root, 0));
  }, []);

  // Calculer les positions avec une vraie logique généalogique
  const calculateTreePositions = useCallback((treeNodes: TreeLayoutNode[]): DraggableNode[] => {
    if (!treeNodes || treeNodes.length === 0) return [];

    const nodeWidth = 200;
    const nodeHeight = 160;
    const levelSpacing = 250;
    const siblingSpacing = 220;
    
    const positionedNodes: DraggableNode[] = [];
    
    // Calculer la largeur totale nécessaire pour chaque niveau
    const calculateNodePositions = (nodes: TreeLayoutNode[], startX: number, startY: number) => {
      nodes.forEach((node, index) => {
        // Position horizontale basée sur l'index et l'espacement
        const x = startX + (index * siblingSpacing);
        const y = startY + (node.level * levelSpacing);
        
        // Ajouter le noeud positionné
        positionedNodes.push({
          member: node.member,
          position: { x, y },
          isDragging: false
        });

        // Positionner les enfants
        if (node.children && node.children.length > 0) {
          const childrenStartX = x - ((node.children.length - 1) * siblingSpacing) / 2;
          calculateNodePositions(node.children, childrenStartX, startY);
        }
      });
    };

    // Centrer les racines
    const rootStartX = 400;
    const rootStartY = 100;
    calculateNodePositions(treeNodes, rootStartX, rootStartY);

    return positionedNodes;
  }, []);

  // Initialiser les positions des noeuds
  useEffect(() => {
    if (members && members.length > 0) {
      try {
        const hierarchy = buildFamilyHierarchy(members);
        const positionedNodes = calculateTreePositions(hierarchy);
        setNodes(positionedNodes);
      } catch (error) {
        console.error('Error building family tree:', error);
        setNodes([]);
      }
    }
  }, [members, buildFamilyHierarchy, calculateTreePositions]);

  // Gestion de la recherche
  useEffect(() => {
    if (searchTerm.trim() && members) {
      const foundMember = members.find(member => 
        `${member.first_name} ${member.last_name}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (foundMember) {
        setHighlightedMember(foundMember.id);
        setSelectedMember(foundMember);
        // Centrer sur le membre trouvé
        const foundNode = nodes.find(node => node.member.id === foundMember.id);
        if (foundNode) {
          setPanPosition({
            x: -foundNode.position.x + 400,
            y: -foundNode.position.y + 300
          });
        }
      } else {
        setHighlightedMember(null);
      }
    } else {
      setHighlightedMember(null);
    }
  }, [searchTerm, members, nodes]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.3));
  const handleReset = () => {
    setZoom(1);
    setPanPosition({ x: 0, y: 0 });
    setSelectedMember(null);
    setSearchTerm('');
    setHighlightedMember(null);
  };

  // Gestion du déplacement individuel des cartes
  const handleNodeDragStart = (nodeIndex: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setNodes(prev => prev.map((node, index) => 
      index === nodeIndex ? { ...node, isDragging: true } : node
    ));
  };

  const handleNodeDrag = (nodeIndex: number, deltaX: number, deltaY: number) => {
    setNodes(prev => prev.map((node, index) => 
      index === nodeIndex 
        ? { 
            ...node, 
            position: { 
              x: node.position.x + deltaX / zoom, 
              y: node.position.y + deltaY / zoom 
            }
          }
        : node
    ));
  };

  const handleNodeDragEnd = (nodeIndex: number) => {
    setNodes(prev => prev.map((node, index) => 
      index === nodeIndex ? { ...node, isDragging: false } : node
    ));
  };

  // Gestion du pan global
  const handlePanStart = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      setIsPanning(true);
      setPanStart({ x: event.clientX - panPosition.x, y: event.clientY - panPosition.y });
    }
  };

  const handlePanMove = (event: React.MouseEvent) => {
    if (isPanning) {
      setPanPosition({
        x: event.clientX - panStart.x,
        y: event.clientY - panStart.y
      });
    }
  };

  const handlePanEnd = () => {
    setIsPanning(false);
  };

  // Rendu des connexions généalogiques avec key unique
  const renderConnections = () => {
    if (!nodes || nodes.length === 0) return null;

    const connections: JSX.Element[] = [];
    
    nodes.forEach((node, index) => {
      // Connexions parent-enfant
      const children = nodes.filter(n => 
        n.member.father_id === node.member.id || n.member.mother_id === node.member.id
      );
      
      children.forEach((child, childIndex) => {
        const connectionKey = `connection-${node.member.id}-${child.member.id}-${index}-${childIndex}`;
        connections.push(
          <line
            key={connectionKey}
            x1={node.position.x + 100}
            y1={node.position.y + 80}
            x2={child.position.x + 100}
            y2={child.position.y}
            stroke="#25D366"
            strokeWidth="2"
            className="opacity-60"
            strokeDasharray="5,5"
          />
        );
      });
    });

    return connections;
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
      {/* Contrôles */}
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <RotateCcw className="w-4 h-4" />
          </Button>
          <span className="text-sm text-gray-600">Zoom: {Math.round(zoom * 100)}%</span>
        </div>
        
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Rechercher un membre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Conteneur de l'arbre */}
      <div 
        ref={containerRef}
        className="relative w-full h-[700px] overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border cursor-move"
        onMouseDown={handlePanStart}
        onMouseMove={handlePanMove}
        onMouseUp={handlePanEnd}
        onMouseLeave={handlePanEnd}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: `scale(${zoom}) translate(${panPosition.x}px, ${panPosition.y}px)`,
            transformOrigin: '0 0'
          }}
        >
          {/* SVG pour les connexions */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ minWidth: '2000px', minHeight: '2000px' }}
          >
            <AnimatePresence>
              {renderConnections()}
            </AnimatePresence>
          </svg>

          {/* Rendu des cartes membres */}
          <AnimatePresence>
            {nodes.map((node, index) => (
              <DraggableMemberCard
                key={`member-${node.member.id}-${index}`}
                node={node}
                index={index}
                isHighlighted={highlightedMember === node.member.id}
                onSelect={setSelectedMember}
                onDragStart={(e) => handleNodeDragStart(index, e)}
                onDrag={(deltaX, deltaY) => handleNodeDrag(index, deltaX, deltaY)}
                onDragEnd={() => handleNodeDragEnd(index)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Membre sélectionné */}
        <AnimatePresence>
          {selectedMember && (
            <motion.div
              key={`selected-${selectedMember.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border max-w-xs"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  {selectedMember.photo_url ? (
                    <img
                      src={selectedMember.photo_url}
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <User className="w-6 h-6 text-green-600" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-green-700 flex items-center">
                    {selectedMember.first_name} {selectedMember.last_name}
                    {selectedMember.is_patriarch && (
                      <Crown className="w-4 h-4 ml-1 text-yellow-500" />
                    )}
                  </h3>
                  <p className="text-sm text-green-600">{selectedMember.relationship_type}</p>
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
              </div>
              
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full"
                onClick={() => setSelectedMember(null)}
              >
                Fermer
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Composant pour les cartes draggables
interface DraggableMemberCardProps {
  node: DraggableNode;
  index: number;
  isHighlighted: boolean;
  onSelect: (member: FamilyMember) => void;
  onDragStart: (event: React.MouseEvent) => void;
  onDrag: (deltaX: number, deltaY: number) => void;
  onDragEnd: () => void;
}

const DraggableMemberCard: React.FC<DraggableMemberCardProps> = ({
  node,
  index,
  isHighlighted,
  onSelect,
  onDragStart,
  onDrag,
  onDragEnd
}) => {
  const [dragStartPos, setDragStartPos] = useState<Position>({ x: 0, y: 0 });

  const handleMouseDown = (event: React.MouseEvent) => {
    event.stopPropagation();
    setDragStartPos({ x: event.clientX, y: event.clientY });
    onDragStart(event);

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStartPos.x;
      const deltaY = e.clientY - dragStartPos.y;
      onDrag(deltaX, deltaY);
      setDragStartPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      onDragEnd();
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <motion.div
      key={`card-${node.member.id}-${index}`}
      className={`absolute cursor-move ${node.isDragging ? 'z-50' : 'z-10'}`}
      style={{
        left: node.position.x,
        top: node.position.y,
        width: '200px',
        height: '140px'
      }}
      whileHover={{ scale: 1.02 }}
      onMouseDown={handleMouseDown}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={`h-full w-full shadow-lg ${
        isHighlighted ? 'ring-4 ring-red-400 bg-red-50' : 'bg-white'
      } ${node.member.is_patriarch ? 'ring-2 ring-yellow-400' : ''}`}>
        <CardContent className="p-4 h-full flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center flex-shrink-0">
              {node.member.photo_url ? (
                <img
                  src={node.member.photo_url}
                  alt="Avatar"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-green-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm text-green-700 flex items-center truncate">
                {node.member.first_name} {node.member.last_name}
                {node.member.is_patriarch && (
                  <Crown className="w-3 h-3 ml-1 text-yellow-500 flex-shrink-0" />
                )}
              </h3>
              <p className="text-xs text-green-600 truncate">{node.member.relationship_type}</p>
            </div>
          </div>
          
          <div className="flex-1 space-y-1 text-xs text-gray-600">
            {node.member.phone && (
              <p className="flex items-center gap-1 truncate">
                <Phone className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{node.member.phone}</span>
              </p>
            )}
            {node.member.current_location && (
              <p className="flex items-center gap-1 truncate">
                <MapPin className="w-3 h-3 flex-shrink-0" />
                <span className="truncate">{node.member.current_location}</span>
              </p>
            )}
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2 h-6 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(node.member);
            }}
          >
            Détails
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};
