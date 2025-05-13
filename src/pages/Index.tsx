
import React, { useState, useEffect } from 'react';
import { taxonomyData, getChildTaxa, getTaxonById, getTaxonPath, TaxonInfo } from '@/data/taxonomy';
import TaxonomyBreadcrumb from '@/components/TaxonomyBreadcrumb';
import TaxonList from '@/components/TaxonList';
import TaxonDetail from '@/components/TaxonDetail';
import SearchBar from '@/components/SearchBar';

const Index = () => {
  const [selectedTaxonId, setSelectedTaxonId] = useState<string>('');
  const [activeTaxa, setActiveTaxa] = useState<TaxonInfo[]>([]);
  const [taxonPath, setTaxonPath] = useState<TaxonInfo[]>([]);

  useEffect(() => {
    // Если выбран конкретный таксон, загружаем его и его путь
    if (selectedTaxonId) {
      const path = getTaxonPath(selectedTaxonId);
      setTaxonPath(path);
      setActiveTaxa(getChildTaxa(selectedTaxonId));
    } else {
      // Иначе показываем таксоны верхнего уровня (без родителя)
      setTaxonPath([]);
      setActiveTaxa(getChildTaxa(null));
    }
  }, [selectedTaxonId]);

  const selectedTaxon = selectedTaxonId ? getTaxonById(selectedTaxonId) : null;

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-bold">Таксонометрия</h1>
            <p className="text-primary-foreground/80 md:text-lg">
              Интерактивный путеводитель по классификации живых организмов
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <SearchBar taxa={taxonomyData} onSelectTaxon={setSelectedTaxonId} />
        </div>

        <TaxonomyBreadcrumb path={taxonPath} onSelect={setSelectedTaxonId} />

        {selectedTaxon ? (
          <TaxonDetail taxon={selectedTaxon} onSelectTaxon={setSelectedTaxonId} />
        ) : (
          <div className="space-y-6">
            <div className="prose max-w-none">
              <h2 className="text-2xl font-semibold mb-1">Основные домены живых организмов</h2>
              <p>
                Таксономия — наука о законах классификации и систематизации сложноорганизованных 
                объектов: живых организмов, их сообществ и экосистем. Выберите любой таксон, 
                чтобы изучить его подробнее и увидеть его подразделы.
              </p>
            </div>

            <TaxonList 
              taxa={activeTaxa} 
              onSelectTaxon={setSelectedTaxonId} 
            />
          </div>
        )}
      </main>

      <footer className="bg-muted py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Таксонометрия — Научный каталог живых организмов</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
