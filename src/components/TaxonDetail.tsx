
import React from 'react';
import { TaxonInfo, getChildTaxa } from '@/data/taxonomy';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import TaxonList from './TaxonList';

interface TaxonDetailProps {
  taxon: TaxonInfo;
  onSelectTaxon: (id: string) => void;
}

const TaxonDetail: React.FC<TaxonDetailProps> = ({ taxon, onSelectTaxon }) => {
  const childTaxa = getChildTaxa(taxon.id);
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{taxon.name}</h1>
              <p className="text-lg text-muted-foreground italic">{taxon.latinName}</p>
            </div>
            <Badge variant="outline" className="text-sm px-3 py-1">
              {taxon.level}
            </Badge>
          </div>
          
          <div className="prose max-w-none">
            <p className="text-lg">{taxon.description}</p>
          </div>
          
          {taxon.characteristics && taxon.characteristics.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Основные характеристики</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 list-disc list-inside">
                  {taxon.characteristics.map((char, index) => (
                    <li key={index}>{char}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          {taxon.examples && taxon.examples.length > 0 && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Примеры</CardTitle>
                <CardDescription>
                  Представители данного таксона
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {taxon.examples.map((example, index) => (
                    <Badge key={index} variant="secondary">
                      {example}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <div className="rounded-lg overflow-hidden border shadow-sm">
            <img 
              src={taxon.imageUrl} 
              alt={taxon.name} 
              className="w-full aspect-video object-cover" 
            />
          </div>
        </div>
      </div>
      
      {childTaxa.length > 0 && (
        <div className="space-y-4">
          <Separator />
          <div>
            <h2 className="text-2xl font-semibold mb-4">Подразделы таксона</h2>
            <TaxonList taxa={childTaxa} onSelectTaxon={onSelectTaxon} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxonDetail;
