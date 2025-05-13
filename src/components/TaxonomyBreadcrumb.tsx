
import React from 'react';
import { TaxonInfo } from '@/data/taxonomy';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ChevronRight } from 'lucide-react';

interface TaxonomyBreadcrumbProps {
  path: TaxonInfo[];
  onSelect: (taxonId: string) => void;
}

const TaxonomyBreadcrumb: React.FC<TaxonomyBreadcrumbProps> = ({ path, onSelect }) => {
  if (!path.length) return null;

  return (
    <Breadcrumb className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink 
            onClick={() => onSelect('')}
            className="cursor-pointer hover:text-primary"
          >
            Главная
          </BreadcrumbLink>
        </BreadcrumbItem>
        
        <BreadcrumbSeparator>
          <ChevronRight size={16} />
        </BreadcrumbSeparator>

        {path.map((taxon, index) => (
          <React.Fragment key={taxon.id}>
            <BreadcrumbItem>
              {index === path.length - 1 ? (
                <span className="font-medium text-foreground">{taxon.name}</span>
              ) : (
                <BreadcrumbLink 
                  onClick={() => onSelect(taxon.id)}
                  className="cursor-pointer hover:text-primary"
                >
                  {taxon.name}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            
            {index < path.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight size={16} />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default TaxonomyBreadcrumb;
