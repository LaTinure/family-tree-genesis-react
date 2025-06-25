
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FamilyMember } from '@/types/family';

interface TreeNode {
  id: string;
  name: string;
  civilite: string;
  photoUrl?: string;
  attributes?: {
    birthDate?: string;
    currentLocation?: string;
    situation?: string;
  };
  children?: TreeNode[];
}

export const useFamilyTree = () => {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const buildTree = (members: FamilyMember[]): TreeNode | null => {
    if (members.length === 0) return null;

    const memberMap = new Map<string, FamilyMember>();
    members.forEach(member => memberMap.set(member.id, member));

    const patriarch = members.find(member =>
      (!member.father_id && !member.mother_id) ||
      member.is_patriarch
    );

    if (!patriarch) {
      return buildNodeFromMember(members[0], memberMap);
    }

    return buildNodeFromMember(patriarch, memberMap);
  };

  const buildNodeFromMember = (member: FamilyMember, memberMap: Map<string, FamilyMember>): TreeNode => {
    const children: TreeNode[] = [];

    memberMap.forEach(potentialChild => {
      if (potentialChild.father_id === member.id || potentialChild.mother_id === member.id) {
        children.push(buildNodeFromMember(potentialChild, memberMap));
      }
    });

    return {
      id: member.id,
      name: `${member.first_name} ${member.last_name}`,
      civilite: member.civilite || member.title || 'Membre',
      photoUrl: member.avatar_url,
      attributes: {
        birthDate: member.birth_date,
        currentLocation: member.current_location,
        situation: member.situation
      },
      children: children.length > 0 ? children : undefined
    };
  };

  const fetchFamilyData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const { data: profiles, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: true });

      if (fetchError) {
        throw fetchError;
      }

      if (!profiles || profiles.length === 0) {
        const mockMembers: FamilyMember[] = [
          {
            id: '1',
            first_name: 'Pierre',
            last_name: 'Martin',
            title: 'Fils',
            birth_date: '1945-03-15',
            birth_place: 'Lyon, France',
            current_location: 'Lyon, France',
            avatar_url: '',
            situation: 'Marié',
            email: 'pierre.martin@example.com',
            relationship_type: 'patriarche',
            is_admin: false,
            is_patriarch: true,
            civilite: 'Patriarche',
            father_id: undefined,
            mother_id: undefined,
            phone: undefined,
            profession: undefined,
            photo_url: undefined,
            father_name: undefined,
            mother_name: undefined,
            spouse_name: undefined,
            created_at: '2024-01-01',
            updated_at: '2024-01-01'
          },
          {
            id: '2',
            first_name: 'Marie',
            last_name: 'Martin',
            title: 'Fille',
            birth_date: '1948-07-22',
            birth_place: 'Lyon, France',
            current_location: 'Lyon, France',
            avatar_url: '',
            situation: 'Mariée',
            email: 'marie.martin@example.com',
            relationship_type: 'matriarche',
            is_admin: false,
            is_patriarch: false,
            civilite: 'Matriarche',
            father_id: undefined,
            mother_id: undefined,
            phone: undefined,
            profession: undefined,
            photo_url: undefined,
            father_name: undefined,
            mother_name: undefined,
            spouse_name: undefined,
            created_at: '2024-01-01',
            updated_at: '2024-01-01'
          },
          {
            id: '3',
            first_name: 'Jean',
            last_name: 'Martin',
            title: 'Fils',
            birth_date: '1975-11-10',
            birth_place: 'Lyon, France',
            current_location: 'Abidjan Riviera 3',
            avatar_url: '',
            situation: 'Marié',
            email: 'jean.martin@example.com',
            relationship_type: 'fils',
            is_admin: false,
            is_patriarch: false,
            civilite: 'Fils',
            father_id: '1',
            mother_id: '2',
            phone: undefined,
            profession: undefined,
            photo_url: undefined,
            father_name: undefined,
            mother_name: undefined,
            spouse_name: undefined,
            created_at: '2024-01-01',
            updated_at: '2024-01-01'
          },
          {
            id: '4',
            first_name: 'Sophie',
            last_name: 'Martin',
            title: 'Fille',
            birth_date: '1978-05-18',
            birth_place: 'Lyon, France',
            current_location: 'Nice, France',
            avatar_url: '',
            situation: 'Célibataire',
            email: 'sophie.martin@example.com',
            relationship_type: 'fille',
            is_admin: false,
            is_patriarch: false,
            civilite: 'Fille',
            father_id: '1',
            mother_id: '2',
            phone: undefined,
            profession: undefined,
            photo_url: undefined,
            father_name: undefined,
            mother_name: undefined,
            spouse_name: undefined,
            created_at: '2024-01-01',
            updated_at: '2024-01-01'
          }
        ];
        const tree = buildTree(mockMembers);
        setTreeData(tree);
      } else {
        const familyMembers: FamilyMember[] = profiles.map(profile => ({
          id: profile.id,
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          title: (profile.civilite as FamilyMember['title']) || 'Fils',
          birth_date: profile.birth_date || undefined,
          birth_place: profile.birth_place || undefined,
          current_location: profile.current_location || undefined,
          phone: profile.phone || undefined,
          email: profile.email || '',
          avatar_url: profile.avatar_url || undefined,
          relationship_type: (profile.relationship_type as FamilyMember['relationship_type']) || 'fils',
          is_admin: profile.is_admin || false,
          is_patriarch: profile.is_patriarch || false,
          civilite: profile.civilite || undefined,
          father_id: profile.father_id || undefined,
          mother_id: profile.mother_id || undefined,
          situation: profile.situation || undefined,
          profession: profile.profession || undefined,
          photo_url: profile.photo_url || undefined,
          father_name: profile.father_name || undefined,
          mother_name: profile.mother_name || undefined,
          spouse_name: profile.spouse_name || undefined,
          created_at: profile.created_at || new Date().toISOString(),
          updated_at: profile.updated_at || new Date().toISOString()
        }));

        const tree = buildTree(familyMembers);
        setTreeData(tree);
      }
    } catch (err) {
      console.error('Error fetching family data:', err);
      setError(err instanceof Error ? err.message : 'Erreur lors du chargement des données');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFamilyData();
  }, []);

  return {
    treeData,
    isLoading,
    error,
    refetch: fetchFamilyData
  };
};
