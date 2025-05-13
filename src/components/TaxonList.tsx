
import React from 'react';
import { TaxonInfo } from '@/data/taxonomy';
import TaxonCard from './TaxonCard';

interface TaxonListProps {
  taxa: TaxonInfo[];
  onSelectTaxon: (id: string) => void;
  activeTaxonId?: string;
}

const TaxonList: React.FC<TaxonListProps> = ({ taxa, onSelectTaxon, activeTaxonId }) => {
  if (!taxa.length) {
    return (
      <div className="p-6 text-center border rounded-lg bg-muted/30">
        <p className="text-muted-foreground">Нет доступных таксонов в этой категории</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {taxa.map((taxon) => (
        <TaxonCard 
          key={taxon.id} 
          taxon={taxon} 
          onClick={() => onSelectTaxon(taxon.id)} 
          isActive={taxon.id === activeTaxonId}
        />
      ))}
    </div>
  );
};

export default TaxonList;
