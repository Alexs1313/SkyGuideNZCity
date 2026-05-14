import type {LocationFilter} from '../data/locationTypes';

export const LOCATION_FILTER_CHIPS: {
  id: LocationFilter;
  label: string;
  emoji: string;
}[] = [
  {id: 'all', label: 'All', emoji: '🌍'},
  {id: 'fjords', label: 'Fjords', emoji: '🌊'},
  {id: 'volcanoes', label: 'Volcanoes', emoji: '🌋'},
  {id: 'glaciers', label: 'Glaciers', emoji: '🧊'},
  {id: 'forests', label: 'Forests', emoji: '🌲'},
  {id: 'lakes', label: 'Lakes', emoji: '💧'},
];
