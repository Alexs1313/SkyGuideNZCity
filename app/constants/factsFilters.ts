import type {FactCategory, FactFilter} from '../data/factsData';

export const RANDOM_FACT_CATEGORIES: FactCategory[] = [
  'wildlife',
  'maori',
  'adventure',
];

export const FACT_FILTER_CHIPS: {
  id: FactFilter;
  label: string;
  cover?: number;
  iconEmoji?: string;
}[] = [
  {id: 'all', label: 'All Facts'},
  {
    id: 'wildlife',
    label: 'Wildlife',
    iconEmoji: '🦜',
    cover: require('../../assets/i/skguidenzcittcat1.jpg'),
  },
  {
    id: 'maori',
    label: 'Māori',
    iconEmoji: '🪶',
    cover: require('../../assets/i/skguidenzcittcat2.jpg'),
  },
  {
    id: 'adventure',
    label: 'Adventure',
    iconEmoji: '🪂',
    cover: require('../../assets/i/skguidenzcittcat3.jpg'),
  },
];
