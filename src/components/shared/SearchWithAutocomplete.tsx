
import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { ProfileData } from '@/types/profile';

interface SearchProps {
  onSelect: (member: ProfileData) => void;
  placeholder?: string;
  className?: string;
}

export const SearchWithAutocomplete = ({ onSelect, placeholder = "Rechercher un membre...", className }: SearchProps) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [showNoResults, setShowNoResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Recherche avec debouncing
  const { data: results = [], isLoading } = useQuery({
    queryKey: ['search-members', query],
    queryFn: async () => {
      if (query.length === 0) return [];
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .or(`first_name.ilike.%${query}%,last_name.ilike.%${query}%,email.ilike.%${query}%,profession.ilike.%${query}%,current_location.ilike.%${query}%`)
        .limit(10);

      if (error) throw error;
      return data as ProfileData[];
    },
    enabled: query.length > 0,
  });

  // Gestion clic extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Gestion message "Aucun résultat"
  useEffect(() => {
    if (query.length > 0 && results.length === 0 && !isLoading) {
      setShowNoResults(true);
      const timer = setTimeout(() => {
        setShowNoResults(false);
        setQuery('');
        setIsOpen(false);
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setShowNoResults(false);
    }
  }, [results, query, isLoading]);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.length > 0);
  };

  const handleSelect = (member: ProfileData) => {
    onSelect(member);
    setQuery('');
    setIsOpen(false);
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-whatsapp-200 text-whatsapp-800 px-1 rounded">$1</mark>');
  };

  return (
    <div ref={searchRef} className={`relative w-full max-w-md ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-10"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isOpen && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-y-auto shadow-lg">
          {isLoading && (
            <div className="p-4 text-center text-gray-500">
              Recherche en cours...
            </div>
          )}

          {showNoResults && (
            <div className="p-4 text-center text-red-500">
              Aucun résultat trouvé
            </div>
          )}

          {!isLoading && results.length > 0 && (
            <div className="py-2">
              {results.map((member) => (
                <div
                  key={member.id}
                  onClick={() => handleSelect(member)}
                  className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                >
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarImage src={member.avatar_url || ''} />
                    <AvatarFallback>
                      {member.first_name?.[0]}{member.last_name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900">
                      <span dangerouslySetInnerHTML={{
                        __html: highlightMatch(`${member.first_name} ${member.last_name}`, query)
                      }} />
                    </div>
                    <div className="text-sm text-gray-500 truncate">
                      {member.profession && (
                        <span dangerouslySetInnerHTML={{
                          __html: highlightMatch(member.profession, query)
                        }} />
                      )}
                      {member.profession && member.current_location && ' • '}
                      {member.current_location && (
                        <span dangerouslySetInnerHTML={{
                          __html: highlightMatch(member.current_location, query)
                        }} />
                      )}
                    </div>
                  </div>
                  {member.is_patriarch && (
                    <div className="text-xs bg-whatsapp-100 text-whatsapp-700 px-2 py-1 rounded-full">
                      Patriarche
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};
