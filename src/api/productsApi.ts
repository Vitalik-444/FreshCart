import axios from 'axios';
import type { Category, Product, ProductResponse } from '../types/product';

const api = axios.create({ baseURL: 'https://dummyjson.com' });

/**
 * The store sells food only. DummyJSON keeps all edible items in the
 * "groceries" category, so that is the only category we ever request.
 * Everything else (electronics, furniture, beauty, clothing, ...) is never loaded.
 */
const FOOD_SOURCE_CATEGORY = 'groceries';

// Items inside "groceries" that are not food for people (pet food etc.) are dropped.
const NOT_FOR_PEOPLE = /\b(cat|dog|pet|puppy|kitten)\b/i;

// Food sections, matched by product title. Order matters: first match wins.
const SECTIONS: { slug: string; name: string; match: RegExp }[] = [
  { slug: 'dairy-eggs', name: 'Dairy & Eggs', match: /milk|egg|cheese|yogurt|yoghurt|butter|cream/i },
  { slug: 'meat-fish', name: 'Meat & Fish', match: /beef|chicken|meat|fish|steak|pork|lamb|turkey|salmon|sausage|ham\b/i },
  { slug: 'fruits', name: 'Fruits & Berries', match: /apple|kiwi|kiivi|lemon|orange|banana|berry|mulberry|strawberr|grape|pear|peach|mango|melon/i },
  { slug: 'vegetables', name: 'Vegetables', match: /cucumber|pepper|chili|potato|onion|tomato|carrot|cabbage|garlic|lettuce|spinach|broccoli/i },
  { slug: 'drinks', name: 'Drinks', match: /juice|water|soft drink|soda|cola|coffee|nescafe|tea\b|drink/i },
  { slug: 'pantry', name: 'Pantry', match: /./ }, // everything else: rice, oil, honey, supplements...
];

const sectionOf = (title: string) => SECTIONS.find(s => s.match.test(title)) ?? SECTIONS[SECTIONS.length - 1];

export const isFood = (p: Pick<Product, 'category' | 'title'>) =>
  p.category === FOOD_SOURCE_CATEGORY && !NOT_FOR_PEOPLE.test(p.title);

const enrich = (p: Product): Product => {
  const s = sectionOf(p.title);
  return { ...p, subcategory: s.slug, subcategoryName: s.name };
};

let cache: Promise<Product[]> | null = null;
const loadFood = (): Promise<Product[]> => {
  if (cache) return cache;
  const request: Promise<Product[]> = api
    .get<ProductResponse>(`/products/category/${FOOD_SOURCE_CATEGORY}`, { params: { limit: 0 } })
    .then(r => r.data.products.filter(isFood).map(enrich));
  request.catch(() => { cache = null; }); // allow retry after a failed request
  cache = request;
  return request;
};

type Params = { limit?: number; skip?: number; search?: string; category?: string; sortBy?: string; order?: string; onSale?: boolean };

export const getProducts = async (params: Params = {}): Promise<ProductResponse> => {
  const { limit = 12, skip = 0, search = '', category = '', sortBy, order = 'asc', onSale = false } = params;
  const q = search.trim().toLowerCase();
  let list = await loadFood();
  if (category) list = list.filter(p => p.subcategory === category);
  if (q) list = list.filter(p => `${p.title} ${p.description} ${p.subcategoryName} ${p.brand ?? ''}`.toLowerCase().includes(q));
  if (onSale) list = list.filter(p => p.discountPercentage >= 10);
  if (sortBy) {
    const dir = order === 'desc' ? -1 : 1;
    list = [...list].sort((a, b) =>
      sortBy === 'title' ? a.title.localeCompare(b.title) * dir
      : ((a[sortBy as 'price' | 'rating'] as number) - (b[sortBy as 'price' | 'rating'] as number)) * dir);
  }
  return { products: list.slice(skip, skip + limit), total: list.length, skip, limit };
};

export const getCategories = async (): Promise<Category[]> => {
  const list = await loadFood();
  return SECTIONS
    .map(s => ({ slug: s.slug, name: s.name, url: `/category/${s.slug}`, count: list.filter(p => p.subcategory === s.slug).length }))
    .filter(c => (c.count ?? 0) > 0);
};

export const getProduct = async (id: string | number): Promise<Product> => {
  const found = (await loadFood()).find(p => p.id === Number(id));
  if (!found) throw new Error('Product not found');
  return found;
};

export const getRelated = async (subcategory: string, id: number) => {
  const list = await loadFood();
  const same = list.filter(p => p.subcategory === subcategory && p.id !== id);
  const others = list.filter(p => p.subcategory !== subcategory && p.id !== id);
  return [...same, ...others].slice(0, 4);
};
