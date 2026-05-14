export type LocationCategory =
  | 'fjords'
  | 'volcanoes'
  | 'glaciers'
  | 'forests'
  | 'lakes';

export type LocationFilter = 'all' | LocationCategory;

export type LocationItem = {
  id: string;
  category: LocationCategory;
  categoryBadge: string;
  badgeEmoji: string;
  name: string;
  tagline: string;
  lat: number;
  lon: number;
  body: string;
};
