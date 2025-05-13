
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { taxonomyData, getChildTaxa, TaxonInfo, TaxonomicLevel } from '@/data/taxonomy';
import { ChevronRight, ChevronDown, Home, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const TaxonomyTreeView = () => {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({});
  const rootTaxa = getChildTaxa(null);
  
  // По умолчанию разворачиваем верхние уровни таксонов до отрядов
  useEffect(() => {
    const initialExpandedNodes: Record<string, boolean> = {};
    
    // Рекурсивно раскрываем все домены и царства
    const expandDomains = (taxa: TaxonInfo[]) => {
      taxa.forEach(taxon => {
        if (
          taxon.level === TaxonomicLevel.DOMAIN || 
          taxon.level === TaxonomicLevel.KINGDOM ||
          taxon.level === TaxonomicLevel.PHYLUM ||
          taxon.level === TaxonomicLevel.CLASS
        ) {
          initialExpandedNodes[taxon.id] = true;
          const children = getChildTaxa(taxon.id);
          expandDomains(children);
        }
      });
    };
    
    expandDomains(rootTaxa);
    setExpandedNodes(initialExpandedNodes);
  }, []);
  
  const toggleNode = (id: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  // Уровень вложенности для раскрытия по умолчанию
  const getBackgroundColor = (level: TaxonomicLevel) => {
    switch(level) {
      case TaxonomicLevel.DOMAIN:
        return 'bg-primary/10';
      case TaxonomicLevel.KINGDOM:
        return 'bg-primary/5';
      case TaxonomicLevel.PHYLUM:
        return 'bg-secondary/10';
      case TaxonomicLevel.CLASS:
        return 'bg-secondary/5';
      case TaxonomicLevel.ORDER:
        return 'bg-accent/10';
      case TaxonomicLevel.FAMILY:
        return 'bg-accent/5';
      case TaxonomicLevel.GENUS:
        return 'bg-muted/20';
      case TaxonomicLevel.SPECIES:
        return 'bg-muted/10';
      default:
        return '';
    }
  };
  
  type TreeNodeProps = {
    taxon: TaxonInfo;
    level: number;
    lastInLevel?: boolean;
  };
  
  const TreeNode: React.FC<TreeNodeProps> = ({ taxon, level, lastInLevel = false }) => {
    const children = getChildTaxa(taxon.id);
    const hasChildren = children.length > 0;
    const isExpanded = !!expandedNodes[taxon.id];
    
    return (
      <div className={cn(
        "relative",
        !lastInLevel && "before:absolute before:left-[30px] before:top-10 before:w-px before:h-full before:bg-border/50 before:-z-10"
      )}>
        <div 
          className={cn(
            "flex items-start pl-7 py-2 rounded-md mb-2 group cursor-pointer hover:bg-muted/40 relative",
            getBackgroundColor(taxon.level),
            "before:absolute before:left-[30px] before:top-5 before:w-5 before:h-px before:bg-border/70 before:-z-10",
            level > 0 && "mt-2"
          )}
        >
          <div className="absolute left-1 top-2.5">
            {hasChildren ? (
              <button
                onClick={(e) => toggleNode(taxon.id, e)}
                className="h-5 w-5 rounded-full flex items-center justify-center bg-background border"
              >
                {isExpanded ? (
                  <ChevronDown size={14} />
                ) : (
                  <ChevronRight size={14} />
                )}
              </button>
            ) : (
              <div className="h-5 w-5 rounded-full bg-muted/30 border border-muted-foreground/20"></div>
            )}
          </div>
          
          <div className="flex flex-col">
            <div className="flex items-center gap-2 flex-wrap">
              <Link to={`/?taxon=${taxon.id}`} className="font-medium text-primary hover:underline">
                {taxon.name}
              </Link>
              <span className="text-xs text-muted-foreground italic">{taxon.latinName}</span>
              <Badge variant="outline" className="text-xs py-0 px-1">
                {taxon.level}
              </Badge>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="w-5 h-5 rounded-full flex items-center justify-center bg-muted/40 hover:bg-muted cursor-pointer">
                      <Info size={12} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-sm">
                    <p className="text-xs">{taxon.description}</p>
                    {taxon.characteristics && (
                      <div className="mt-1">
                        <div className="flex flex-wrap gap-1 mt-1">
                          {taxon.characteristics.slice(0, 3).map((char, index) => (
                            <Badge key={index} variant="outline" className="text-xs py-0 px-1 bg-muted/30">
                              {char}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
        
        {isExpanded && hasChildren && (
          <div className="ml-8">
            {children.map((child, index) => (
              <TreeNode 
                key={child.id} 
                taxon={child} 
                level={level + 1} 
                lastInLevel={index === children.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold">Полное дерево таксонов</h1>
            <p className="text-primary-foreground/80 md:text-lg">
              Визуальное представление всех уровней таксономической классификации
            </p>
          </div>
        </div>
      </header>

      <nav className="container mx-auto px-4 py-4 flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link to="/">
            <Home size={16} className="mr-1" /> Главная
          </Link>
        </Button>
      </nav>

      <main className="container mx-auto px-4 py-4 pb-16">
        <div className="bg-card rounded-lg border p-6 mb-6">
          <h2 className="text-xl font-semibold mb-2">Инструкция</h2>
          <p className="text-muted-foreground mb-4">
            Это интерактивное дерево всех таксонов от доменов до видов. Вы можете:
          </p>
          <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
            <li>Нажимать на круглые кнопки с иконками <ChevronRight size={14} className="inline" /> для раскрытия или скрытия подкатегорий таксона</li>
            <li>Нажимать на название таксона для перехода на его детальную страницу</li>
            <li>Наводить на иконку <Info size={14} className="inline" /> для просмотра краткой информации о таксоне</li>
          </ul>
        </div>
        
        <div className="space-y-4 mb-10">
          <h2 className="text-2xl font-bold mb-4">Структура таксономической классификации</h2>
          
          <div className="max-w-5xl mx-auto bg-card rounded-lg border p-6">
            <div className="space-y-0">
              {rootTaxa.map((taxon, index) => (
                <TreeNode 
                  key={taxon.id} 
                  taxon={taxon} 
                  level={0} 
                  lastInLevel={index === rootTaxa.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-muted py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Таксонометрия — Научный каталог живых организмов</p>
        </div>
      </footer>
    </div>
  );
};

export default TaxonomyTreeView;
