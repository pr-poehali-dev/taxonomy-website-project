
import React, { useState } from 'react';
import { TaxonInfo, TaxonomicLevel, getTaxonById, getChildTaxa } from '@/data/taxonomy';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TaxonomyTreeProps {
  onSelectTaxon: (id: string) => void;
}

interface TreeNodeProps {
  taxon: TaxonInfo;
  level: number;
  onSelect: (id: string) => void;
  expanded: boolean;
  onToggle: () => void;
  isLast?: boolean;
}

const TreeNode: React.FC<TreeNodeProps> = ({ 
  taxon, 
  level, 
  onSelect, 
  expanded, 
  onToggle,
  isLast = false
}) => {
  const childTaxa = getChildTaxa(taxon.id);
  const hasChildren = childTaxa.length > 0;
  const maxLevel = Object.values(TaxonomicLevel).indexOf(TaxonomicLevel.ORDER);
  const currentLevel = Object.values(TaxonomicLevel).indexOf(taxon.level);
  const canExpand = hasChildren && currentLevel <= maxLevel;
  
  return (
    <div className={cn(
      "relative",
      !isLast && level > 0 && "before:absolute before:border-l before:border-dashed before:border-muted-foreground/40 before:h-full before:left-3.5 before:-z-10 before:top-5"
    )}>
      <div 
        className={cn(
          "flex items-center py-1.5 -ml-1.5 px-1.5 rounded-md gap-2 relative",
          "hover:bg-muted/60 cursor-pointer",
          level > 0 && "mt-1 before:absolute before:w-5 before:border-t before:border-dashed before:border-muted-foreground/40 before:left-[-0.5rem] before:top-4"
        )}
        onClick={() => onSelect(taxon.id)}
      >
        {canExpand ? (
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }} 
            className="w-5 h-5 flex items-center justify-center rounded hover:bg-muted"
          >
            {expanded ? (
              <ChevronDown size={14} />
            ) : (
              <ChevronRight size={14} />
            )}
          </button>
        ) : (
          <div className="w-5 h-5" />
        )}
        
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-medium">{taxon.name}</span>
            <Badge variant="outline" className="text-xs py-0 px-1.5">
              {taxon.level}
            </Badge>
          </div>
          <span className="text-xs text-muted-foreground italic">{taxon.latinName}</span>
        </div>
      </div>
      
      {expanded && hasChildren && (
        <div className="ml-5">
          {childTaxa.map((child, index) => (
            <TreeNode
              key={child.id}
              taxon={child}
              level={level + 1}
              onSelect={onSelect}
              expanded={false}
              onToggle={() => {}}
              isLast={index === childTaxa.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TaxonomyTree: React.FC<TaxonomyTreeProps> = ({ onSelectTaxon }) => {
  const rootTaxa = getChildTaxa(null);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
  
  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  return (
    <Card className="w-full overflow-hidden">
      <CardContent className="pt-6">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold mb-3">Дерево таксонов</h3>
          <div className="space-y-0.5">
            {rootTaxa.map((taxon, index) => (
              <TreeNode
                key={taxon.id}
                taxon={taxon}
                level={0}
                onSelect={onSelectTaxon}
                expanded={!!expandedNodes[taxon.id]}
                onToggle={() => toggleNode(taxon.id)}
                isLast={index === rootTaxa.length - 1}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxonomyTree;
