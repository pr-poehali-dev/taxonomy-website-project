
// Данные о таксономических группах
export interface TaxonInfo {
  id: string;
  name: string;
  latinName: string;
  description: string;
  parentId: string | null;
  level: TaxonomicLevel;
  imageUrl: string;
  characteristics?: string[];
  examples?: string[];
}

// Уровни таксономической классификации
export enum TaxonomicLevel {
  DOMAIN = "Домен",
  KINGDOM = "Царство",
  PHYLUM = "Тип",
  CLASS = "Класс",
  ORDER = "Отряд",
  FAMILY = "Семейство",
  GENUS = "Род",
  SPECIES = "Вид"
}

// Главная структура данных с таксонами
export const taxonomyData: TaxonInfo[] = [
  // Домены
  {
    id: "bacteria",
    name: "Бактерии",
    latinName: "Bacteria",
    description: "Домен одноклеточных микроорганизмов. Бактерии имеют клеточную стенку и не имеют ядра.",
    parentId: null,
    level: TaxonomicLevel.DOMAIN,
    imageUrl: "https://images.unsplash.com/photo-1610394352573-ee7ec01c6e8c?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Одноклеточные", "Прокариоты", "Нет ядра", "Есть клеточная стенка"],
    examples: ["Cyanobacteria", "Proteobacteria", "Firmicutes"]
  },
  {
    id: "archaea",
    name: "Археи",
    latinName: "Archaea",
    description: "Домен одноклеточных микроорганизмов. Археи имеют клеточную стенку и не имеют ядра, но генетически отличаются от бактерий.",
    parentId: null,
    level: TaxonomicLevel.DOMAIN,
    imageUrl: "https://images.unsplash.com/photo-1617041866522-52f9a7d2179d?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Одноклеточные", "Прокариоты", "Часто обитают в экстремальных условиях"],
    examples: ["Thermoproteales", "Halobacteriales", "Methanosarcinales"]
  },
  {
    id: "eukarya",
    name: "Эукариоты",
    latinName: "Eukarya",
    description: "Домен живых организмов, клетки которых содержат ядро.",
    parentId: null,
    level: TaxonomicLevel.DOMAIN,
    imageUrl: "https://images.unsplash.com/photo-1570288685369-f7305163d0e3?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Имеют клеточное ядро", "Сложная внутренняя организация", "Могут быть одноклеточными или многоклеточными"],
    examples: ["Растения", "Животные", "Грибы", "Простейшие"]
  },

  // Царства (для домена эукариот)
  {
    id: "animalia",
    name: "Животные",
    latinName: "Animalia",
    description: "Многоклеточные организмы, которые питаются готовыми органическими веществами и способны активно передвигаться.",
    parentId: "eukarya",
    level: TaxonomicLevel.KINGDOM,
    imageUrl: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Многоклеточные", "Гетеротрофы", "Способны к передвижению", "Отсутствие клеточной стенки"],
    examples: ["Млекопитающие", "Птицы", "Рептилии", "Рыбы", "Насекомые"]
  },
  {
    id: "plantae",
    name: "Растения",
    latinName: "Plantae",
    description: "Многоклеточные организмы, способные к фотосинтезу, имеющие клеточную стенку и неподвижные.",
    parentId: "eukarya",
    level: TaxonomicLevel.KINGDOM,
    imageUrl: "https://images.unsplash.com/photo-1457530378978-8bac673b8062?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Многоклеточные", "Автотрофы", "Способны к фотосинтезу", "Имеют клеточную стенку"],
    examples: ["Покрытосеменные", "Голосеменные", "Папоротники", "Мхи"]
  },
  {
    id: "fungi",
    name: "Грибы",
    latinName: "Fungi",
    description: "Организмы, питающиеся готовыми органическими веществами путем внешнего переваривания.",
    parentId: "eukarya",
    level: TaxonomicLevel.KINGDOM,
    imageUrl: "https://images.unsplash.com/photo-1566244838200-9353ca34b428?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Эукариоты", "Гетеротрофы", "Имеют клеточную стенку", "Отсутствие хлорофилла"],
    examples: ["Аскомицеты", "Базидиомицеты", "Зигомицеты"]
  },
  
  // Типы (для царства животных)
  {
    id: "chordata",
    name: "Хордовые",
    latinName: "Chordata",
    description: "Тип животных, для которых характерно наличие хорды, полой нервной трубки и глоточных щелей.",
    parentId: "animalia",
    level: TaxonomicLevel.PHYLUM,
    imageUrl: "https://images.unsplash.com/photo-1566240134911-c77a6366a8c5?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Наличие хорды", "Полая нервная трубка", "Глоточные щели в эмбриональном периоде"],
    examples: ["Млекопитающие", "Птицы", "Рептилии", "Амфибии", "Рыбы"]
  },
  {
    id: "arthropoda",
    name: "Членистоногие",
    latinName: "Arthropoda",
    description: "Тип беспозвоночных животных с сегментированным телом и членистыми конечностями.",
    parentId: "animalia",
    level: TaxonomicLevel.PHYLUM,
    imageUrl: "https://images.unsplash.com/photo-1600865624369-9bef972ba401?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Сегментированное тело", "Членистые конечности", "Хитиновый экзоскелет"],
    examples: ["Насекомые", "Паукообразные", "Ракообразные"]
  },
  
  // Классы (для типа хордовых)
  {
    id: "mammalia",
    name: "Млекопитающие",
    latinName: "Mammalia",
    description: "Класс позвоночных животных, вскармливающих детёнышей молоком и имеющих волосяной покров.",
    parentId: "chordata",
    level: TaxonomicLevel.CLASS,
    imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Вскармливание молоком", "Волосяной покров", "Диафрагма", "Теплокровность"],
    examples: ["Приматы", "Хищные", "Грызуны", "Китообразные"]
  },
  {
    id: "aves",
    name: "Птицы",
    latinName: "Aves",
    description: "Класс позвоночных животных, имеющих перья, клюв и откладывающих яйца.",
    parentId: "chordata",
    level: TaxonomicLevel.CLASS,
    imageUrl: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Перьевой покров", "Клюв", "Теплокровность", "Откладывание яиц"],
    examples: ["Воробьинообразные", "Соколообразные", "Гусеобразные"]
  },
  
  // Отряды (для класса млекопитающих)
  {
    id: "primates",
    name: "Приматы",
    latinName: "Primates",
    description: "Отряд млекопитающих, включающий лемуров, долгопятов, обезьян и людей.",
    parentId: "mammalia",
    level: TaxonomicLevel.ORDER,
    imageUrl: "https://images.unsplash.com/photo-1544382748-9f990734b5fd?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Большой мозг", "Хватательные конечности", "Зрение вместо обоняния", "Сложное социальное поведение"],
    examples: ["Человекообразные обезьяны", "Мартышковые", "Лемуры"]
  },
  {
    id: "carnivora",
    name: "Хищные",
    latinName: "Carnivora",
    description: "Отряд плацентарных млекопитающих, преимущественно плотоядных животных.",
    parentId: "mammalia",
    level: TaxonomicLevel.ORDER,
    imageUrl: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Острые клыки", "Когти", "Мощные челюсти", "Развитые органы чувств"],
    examples: ["Кошачьи", "Собачьи", "Медвежьи"]
  },
  
  // Семейства (для отряда приматов)
  {
    id: "hominidae",
    name: "Гоминиды",
    latinName: "Hominidae",
    description: "Семейство приматов, к которому относятся современные люди, человекообразные обезьяны и их предки.",
    parentId: "primates",
    level: TaxonomicLevel.FAMILY,
    imageUrl: "https://images.unsplash.com/photo-1560812500-629a1e485fb2?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Отсутствие хвоста", "Прямая осанка", "Развитый мозг", "Сложное социальное поведение"],
    examples: ["Человек", "Шимпанзе", "Горилла", "Орангутан"]
  },
  {
    id: "felidae",
    name: "Кошачьи",
    latinName: "Felidae",
    description: "Семейство хищных млекопитающих, включающее кошек, львов, тигров и других.",
    parentId: "carnivora",
    level: TaxonomicLevel.FAMILY,
    imageUrl: "https://images.unsplash.com/photo-1548681528-6a5c45b66b42?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Втяжные когти", "Острые зубы", "Гибкое тело", "Превосходное зрение в темноте"],
    examples: ["Лев", "Тигр", "Рысь", "Домашняя кошка"]
  },
  
  // Роды (для семейства гоминид)
  {
    id: "homo",
    name: "Человек",
    latinName: "Homo",
    description: "Род приматов семейства гоминид, включающий современного человека и его непосредственных предков.",
    parentId: "hominidae",
    level: TaxonomicLevel.GENUS,
    imageUrl: "https://images.unsplash.com/photo-1607748851687-ba9a10438621?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Прямохождение", "Развитие речи", "Высокий интеллект", "Использование орудий труда"],
    examples: ["Человек разумный", "Неандерталец", "Человек прямоходящий"]
  },
  {
    id: "panthera",
    name: "Пантера",
    latinName: "Panthera",
    description: "Род крупных диких кошек, включающий тигров, львов, ягуаров и леопардов.",
    parentId: "felidae",
    level: TaxonomicLevel.GENUS,
    imageUrl: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Крупный размер", "Громкий рык", "Мощные челюсти", "Территориальное поведение"],
    examples: ["Лев", "Тигр", "Ягуар", "Леопард"]
  },
  
  // Виды (для рода человек)
  {
    id: "homo_sapiens",
    name: "Человек разумный",
    latinName: "Homo sapiens",
    description: "Единственный современный вид рода Homo. Разумное социальное существо, обладающее развитым мышлением и членораздельной речью.",
    parentId: "homo",
    level: TaxonomicLevel.SPECIES,
    imageUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Развитый головной мозг", "Абстрактное мышление", "Сложная речь", "Письменность", "Технологии"],
  },
  {
    id: "panthera_leo",
    name: "Лев",
    latinName: "Panthera leo",
    description: "Вид хищных млекопитающих, один из представителей рода пантер, наряду с тигром, ягуаром и леопардом.",
    parentId: "panthera",
    level: TaxonomicLevel.SPECIES,
    imageUrl: "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1974&auto=format&fit=crop",
    characteristics: ["Социальное поведение", "Половой диморфизм (у самцов грива)", "Групповая охота", "Территориальность"],
  }
];

// Функция для получения дочерних таксонов
export const getChildTaxa = (parentId: string | null) => {
  return taxonomyData.filter(taxon => taxon.parentId === parentId);
};

// Функция для получения данных о конкретном таксоне
export const getTaxonById = (id: string) => {
  return taxonomyData.find(taxon => taxon.id === id);
};

// Функция для получения пути к таксону (цепочка предков)
export const getTaxonPath = (id: string): TaxonInfo[] => {
  const result: TaxonInfo[] = [];
  let currentTaxon = getTaxonById(id);
  
  while (currentTaxon) {
    result.unshift(currentTaxon);
    if (currentTaxon.parentId) {
      currentTaxon = getTaxonById(currentTaxon.parentId);
    } else {
      break;
    }
  }
  
  return result;
};
