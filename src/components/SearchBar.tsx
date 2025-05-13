
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { TaxonInfo } from '@/data/taxonomy';

interface SearchBarProps {
  taxa: TaxonInfo[];
  onSelectTaxon: (id: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ taxa, onSelectTaxon }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TaxonInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const results = taxa.filter(
      taxon => 
        taxon.name.toLowerCase().includes(query) || 
        taxon.latinName.toLowerCase().includes(query)
    );
    
    setSearchResults(results);
    setIsSearching(true);
  };
  
  const handleReset = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <div className="w-full space-y-2">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Поиск таксона..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
        <Button type="submit" variant="default">
          <SearchIcon size={18} className="mr-2" />
          Найти
        </Button>
      </form>
      
      {isSearching && (
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">
              Найдено результатов: {searchResults.length}
            </h3>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Сбросить
            </Button>
          </div>
          
          {searchResults.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <div className="max-h-60 overflow-y-auto">
                {searchResults.map((taxon) => (
                  <div 
                    key={taxon.id} 
                    className="flex items-center gap-3 p-2 border-b last:border-0 hover:bg-muted/50 cursor-pointer"
                    onClick={() => {
                      onSelectTaxon(taxon.id);
                      handleReset();
                    }}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                      <img 
                        src={taxon.imageUrl} 
                        alt={taxon.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{taxon.name}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2">
                        <span className="italic">{taxon.latinName}</span>
                        <span className="inline-block w-1 h-1 bg-muted-foreground rounded-full"></span>
                        <span>{taxon.level}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-muted-foreground text-center p-4 border rounded-lg bg-muted/30">
              По вашему запросу ничего не найдено
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
