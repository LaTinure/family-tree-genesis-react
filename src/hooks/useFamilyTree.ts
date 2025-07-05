
import { useState, useEffect } from 'react';
import { FamilyMember, FamilyTreeNode } from '@/types/family';
import { supabase } from '@/integrations/supabase/client';

export const useFamilyTree = () => {
  const [familyTree, setFamilyTree] = useState<FamilyTreeNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFamilyTree();
  }, []);

  const fetchFamilyTree = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        const members: FamilyMember[] = data.map(profile => ({
          id: profile.id,
          user_id: profile.user_id,
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          email: profile.email || '',
          civilite: profile.civilite as 'M.' | 'Mme' || 'M.',
          phone: profile.phone,
          profession: profile.profession,
          current_location: profile.current_location,
          birth_place: profile.birth_place,
          birth_date: profile.birth_date,
          avatar_url: profile.avatar_url,
          photo_url: profile.photo_url,
          relationship_type: profile.relationship_type as any || 'conjoint',
          father_id: profile.father_id,
          mother_id: profile.mother_id,
          father_name: profile.father_name,
          mother_name: profile.mother_name,
          spouse_name: '', // Default value
          is_admin: profile.is_admin || false,
          is_patriarch: profile.is_patriarch || false,
          is_parent: profile.is_parent || false,
          situation: profile.situation,
          role: (profile.role as any) || 'Membre',
          created_at: profile.created_at,
          updated_at: profile.updated_at,
        }));

        const treeNodes = buildFamilyTree(members);
        setFamilyTree(treeNodes);
      }
    } catch (err) {
      console.error('Error fetching family tree:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const buildFamilyTree = (members: FamilyMember[]): FamilyTreeNode[] => {
    const nodeMap = new Map<string, FamilyTreeNode>();
    
    // Create nodes for all members
    members.forEach(member => {
      nodeMap.set(member.id, {
        id: member.id,
        member,
        children: [],
        level: 0,
        x: 0,
        y: 0,
      });
    });

    const rootNodes: FamilyTreeNode[] = [];
    
    // Find patriarchs/matriarchs as root nodes
    members.forEach(member => {
      if (member.is_patriarch || member.relationship_type === 'patriarche' || member.relationship_type === 'matriarche') {
        const node = nodeMap.get(member.id);
        if (node) {
          rootNodes.push(node);
        }
      }
    });

    // If no patriarchs found, use members without parents as roots
    if (rootNodes.length === 0) {
      members.forEach(member => {
        if (!member.father_id && !member.mother_id) {
          const node = nodeMap.get(member.id);
          if (node) {
            rootNodes.push(node);
          }
        }
      });
    }

    // Build parent-child relationships
    members.forEach(member => {
      const node = nodeMap.get(member.id);
      if (node && (member.father_id || member.mother_id)) {
        const parent = nodeMap.get(member.father_id || member.mother_id || '');
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(node);
          node.level = parent.level + 1;
        }
      }
    });

    return rootNodes;
  };

  const getMockData = (): FamilyMember[] => {
    return [
      {
        id: '1',
        user_id: '1',
        first_name: 'Jean',
        last_name: 'Dupont',
        email: 'jean.dupont@example.com',
        civilite: 'M.',
        relationship_type: 'patriarche',
        birth_date: '1950-01-01',
        birth_place: 'Paris',
        current_location: 'Lyon',
        phone: '+33123456789',
        avatar_url: '/images/profile01.png',
        spouse_name: '',
        is_admin: true,
        is_patriarch: true,
        is_parent: true,
        role: 'Administrateur',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
  };

  return {
    familyTree,
    loading,
    error,
    refetch: fetchFamilyTree,
    getMockData,
  };
};
