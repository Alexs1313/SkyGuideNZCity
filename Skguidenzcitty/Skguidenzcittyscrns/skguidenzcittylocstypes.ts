export type SkguidenzcittyLocsCategory =
  | 'fjords'
  | 'volcanoes'
  | 'glaciers'
  | 'forests'
  | 'lakes';

export type SkguidenzcittyLocsFilter = 'all' | SkguidenzcittyLocsCategory;

export type SkguidenzcittyLocEntry = {
  id: string;
  category: SkguidenzcittyLocsCategory;
  categoryBadge: string;
  badgeEmoji: string;
  name: string;
  tagline: string;
  lat: number;
  lon: number;
  body: string;
};
