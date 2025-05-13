import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  taxonomyData,
  getChildTaxa,
  getTaxonById,
  getTaxonPath,
  TaxonInfo,
} from "@/data/taxonomy";
import TaxonomyBreadcrumb from "@/components/TaxonomyBreadcrumb";
import TaxonList from "@/components/TaxonList";
import TaxonDetail from "@/components/TaxonDetail";
import SearchBar from "@/components/SearchBar";
import TaxonomyTree from "@/components/TaxonomyTree";
import RelatedTaxa from "@/components/RelatedTaxa";
import { Button } from "@/components/ui/button";
import { ChevronDown, Network } from "lucide-react";

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTaxonId, setSelectedTaxonId] = useState<string>("");
  const [activeTaxa, setActiveTaxa] = useState<TaxonInfo[]>([]);
  const [taxonPath, setTaxonPath] = useState<TaxonInfo[]>([]);

  // Получаем ID таксона из URL параметров
  useEffect(() => {
    const taxonId = searchParams.get("taxon");
    if (taxonId) {
      setSelectedTaxonId(taxonId);
    }
  }, [searchParams]);

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

  // Обновление URL при изменении выбранного таксона
  const handleSelectTaxon = (id: string) => {
    if (id) {
      setSearchParams({ taxon: id });
    } else {
      setSearchParams({});
    }
    setSelectedTaxonId(id);
  };

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

      <div className="container mx-auto px-4 py-4">
        <Button variant="outline" className="mb-4" asChild>
          <Link to="/tree">
            <Network size={16} className="mr-2" /> Просмотр полного дерева
            таксонов
          </Link>
        </Button>
      </div>

      <main className="container mx-auto px-4 py-2 pb-8">
        <div className="mb-6">
          <SearchBar taxa={taxonomyData} onSelectTaxon={handleSelectTaxon} />
        </div>

        <TaxonomyBreadcrumb path={taxonPath} onSelect={handleSelectTaxon} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="sticky top-4">
              <TaxonomyTree onSelectTaxon={handleSelectTaxon} />
            </div>
          </div>

          <div className="lg:col-span-3 order-1 lg:order-2">
            {selectedTaxon ? (
              <div className="space-y-8">
                <TaxonDetail
                  taxon={selectedTaxon}
                  onSelectTaxon={handleSelectTaxon}
                />
                <RelatedTaxa
                  taxon={selectedTaxon}
                  onSelectTaxon={handleSelectTaxon}
                />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <h2 className="text-2xl font-semibold mb-1">
                    Основные домены живых организмов
                  </h2>
                  <p>
                    Таксономия — наука о законах классификации и систематизации
                    сложноорганизованных объектов: живых организмов, их
                    сообществ и экосистем. Выберите любой таксон, чтобы изучить
                    его подробнее и увидеть его подразделы.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    <ChevronDown className="inline-block mr-1" size={16} />{" "}
                    Прокрутите вниз, чтобы увидеть основные домены или
                    воспользуйтесь деревом таксонов слева
                  </p>
                </div>
                <TaxonList
                  taxa={activeTaxa}
                  onSelectTaxon={handleSelectTaxon}
                />
              </div>
            )}
          </div>
        </div>
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
