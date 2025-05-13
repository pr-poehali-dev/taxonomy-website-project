
import React from 'react';
import { TaxonInfo } from '@/data/taxonomy';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

interface TaxonCardProps {
  taxon: TaxonInfo;
  onClick: () => void;
  isActive?: boolean;
}

const TaxonCard: React.FC<TaxonCardProps> = ({ taxon, onClick, isActive = false }) => {
  return (
    <Card 
      className={`overflow-hidden hover:border-primary/50 transition-all duration-200 
                 ${isActive ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-md'}`}
    >
      <div className="aspect-video w-full relative overflow-hidden">
        <img 
          src={taxon.imageUrl} 
          alt={taxon.name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300" 
        />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
            {taxon.level}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-start">
          <span>{taxon.name}</span>
        </CardTitle>
        <CardDescription className="italic">{taxon.latinName}</CardDescription>
      </CardHeader>
      
      <CardContent className="text-sm">
        <p className="line-clamp-3">{taxon.description}</p>
        
        {taxon.characteristics && taxon.characteristics.length > 0 && (
          <div className="mt-3">
            <div className="flex flex-wrap gap-1 mt-1">
              {taxon.characteristics.slice(0, 3).map((char, index) => (
                <Badge key={index} variant="outline" className="bg-primary/5">
                  {char}
                </Badge>
              ))}
              {taxon.characteristics.length > 3 && (
                <Badge variant="outline" className="bg-muted">
                  +{taxon.characteristics.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button 
          variant="ghost" 
          className="ml-auto" 
          onClick={onClick}
        >
          Подробнее <ChevronRight size={16} className="ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TaxonCard;
