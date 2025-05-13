
import React from 'react';
import { TaxonInfo, getTaxonById, getChildTaxa } from '@/data/taxonomy';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

interface RelatedTaxaProps {
  taxon: TaxonInfo;
  onSelectTaxon: (id: string) => void;
}

const RelatedTaxa: React.FC<RelatedTaxaProps> = ({ taxon, onSelectTaxon }) => {
  const childTaxa = getChildTaxa(taxon.id);
  
  // Получаем таксоны того же уровня (братья/сестры)
  const siblingTaxa = taxon.parentId 
    ? getChildTaxa(taxon.parentId).filter(t => t.id !== taxon.id)
    : [];
  
  // Получаем родительский таксон, если есть
  const parentTaxon = taxon.parentId ? getTaxonById(taxon.parentId) : null;
  
  if (!childTaxa.length && !siblingTaxa.length && !parentTaxon) {
    return null;
  }
  
  return (
    <div className="space-y-6 mt-6">
      <h2 className="text-2xl font-semibold">Продолжить изучение</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Дочерние таксоны */}
        {childTaxa.length > 0 && (
          <Card className="border-primary/20 hover:border-primary transition-colors duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <ArrowRight size={18} className="text-primary" />
                Подразделы {taxon.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {childTaxa.map((child) => (
                  <Badge 
                    key={child.id} 
                    variant="outline"
                    className="cursor-pointer hover:bg-primary/10 px-2.5 py-1"
                    onClick={() => onSelectTaxon(child.id)}
                  >
                    {child.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Родственные таксоны того же уровня */}
        {siblingTaxa.length > 0 && (
          <Card className="hover:border-primary/80 transition-colors duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                Другие {parentTaxon?.name ? `${parentTaxon.name} → ` : ''}{taxon.level.toLowerCase()}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {siblingTaxa.slice(0, 8).map((sibling) => (
                  <Badge 
                    key={sibling.id} 
                    variant="secondary"
                    className="cursor-pointer hover:bg-secondary/80 px-2.5 py-1"
                    onClick={() => onSelectTaxon(sibling.id)}
                  >
                    {sibling.name}
                  </Badge>
                ))}
                {siblingTaxa.length > 8 && (
                  <Badge variant="outline">
                    +{siblingTaxa.length - 8}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Родительский таксон */}
        {parentTaxon && (
          <Card className="hover:border-muted-foreground/20 transition-colors duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                Относится к
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="flex items-center gap-2 p-2 border rounded-md hover:bg-muted/50 cursor-pointer"
                onClick={() => onSelectTaxon(parentTaxon.id)}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img 
                    src={parentTaxon.imageUrl} 
                    alt={parentTaxon.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-medium">{parentTaxon.name}</div>
                  <div className="text-xs text-muted-foreground italic">
                    {parentTaxon.latinName} ({parentTaxon.level})
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RelatedTaxa;
