export type SkguidenzcittyFcctsCategory =
  | 'wildlife'
  | 'maori'
  | 'adventure';

export type SkguidenzcittyFcctsFilter = 'all' | SkguidenzcittyFcctsCategory;

export type SkguidenzcittyFcctsEntry = {
  id: string;
  category: SkguidenzcittyFcctsCategory;
  categoryBadge: string;
  badgeEmoji: string;
  title: string;
  body: string;
  iconEmoji: string;
};

export const SKGUIDENZCITTY_FCCTS_ITEMS: SkguidenzcittyFcctsEntry[] = [
  {
    id: 'fc-wildlife-kiwi',
    category: 'wildlife',
    categoryBadge: 'WILDLIFE',
    badgeEmoji: '🦜',
    iconEmoji: '🥚',
    title: 'Kiwi Bird',
    body:
      'The kiwi is one of the most unique birds in the world because it cannot fly and is active mostly at night. Unlike many birds, the kiwi uses its long beak to search for insects underground. It has become the national symbol of New Zealand and represents the country’s unique wildlife.',
  },
  {
    id: 'fc-wildlife-no-snakes',
    category: 'wildlife',
    categoryBadge: 'WILDLIFE',
    badgeEmoji: '🦜',
    iconEmoji: '🚫',
    title: 'No Native Snakes',
    body:
      'New Zealand is one of the few countries in the world without native snakes living on land. This makes hiking and exploring forests much safer for travelers compared to many other natural destinations around the world.',
  },
  {
    id: 'fc-wildlife-glowworm',
    category: 'wildlife',
    categoryBadge: 'WILDLIFE',
    badgeEmoji: '🦜',
    iconEmoji: '✨',
    title: 'Glowworm Caves',
    body:
      'Some caves in New Zealand are filled with tiny glowworms that create blue lights across cave ceilings. These glowing insects make the caves look like underground starry skies and attract thousands of tourists every year.',
  },
  {
    id: 'fc-wildlife-kea',
    category: 'wildlife',
    categoryBadge: 'WILDLIFE',
    badgeEmoji: '🦜',
    iconEmoji: '🦜',
    title: 'Kea Parrot',
    body:
      'The kea is a rare alpine parrot known for being extremely intelligent and curious. These birds often interact with tourists and sometimes even steal small objects from backpacks or cars in mountain regions.',
  },
  {
    id: 'fc-wildlife-blue-penguins',
    category: 'wildlife',
    categoryBadge: 'WILDLIFE',
    badgeEmoji: '🦜',
    iconEmoji: '🐧',
    title: 'Blue Penguins',
    body:
      'New Zealand is home to the smallest penguin species in the world called the little blue penguin. These tiny penguins return to the shore during sunset and can often be seen walking toward their nests in coastal areas.',
  },
  {
    id: 'fc-wildlife-weta',
    category: 'wildlife',
    categoryBadge: 'WILDLIFE',
    badgeEmoji: '🦜',
    iconEmoji: '🦗',
    title: 'Giant Insects',
    body:
      'The country has unusual giant insects called weta. Some species are large enough to fit in a human hand. Despite their appearance, they are harmless and play an important role in New Zealand ecosystems.',
  },
  {
    id: 'fc-maori-haka',
    category: 'maori',
    categoryBadge: 'MĀORI',
    badgeEmoji: '🌀',
    iconEmoji: '💪',
    title: 'Haka Tradition',
    body:
      'The haka is a traditional Maori performance involving strong movements, loud chants, and intense facial expressions. It was originally used before battles but today is performed during ceremonies and sports events.',
  },
  {
    id: 'fc-maori-mountains',
    category: 'maori',
    categoryBadge: 'MĀORI',
    badgeEmoji: '🌀',
    iconEmoji: '⛰️',
    title: 'Sacred Mountains',
    body:
      'Many mountains in New Zealand are considered spiritually important in Maori culture. Some peaks are treated with deep respect because they are connected to ancestors and ancient legends.',
  },
  {
    id: 'fc-maori-tattoos',
    category: 'maori',
    categoryBadge: 'MĀORI',
    badgeEmoji: '🌀',
    iconEmoji: '🖋️',
    title: 'Maori Tattoos',
    body:
      'Traditional Maori tattoos called ta moko are more than decoration. The patterns represent family history, identity, and personal achievements. Each tattoo design is unique to the individual.',
  },
  {
    id: 'fc-maori-carvings',
    category: 'maori',
    categoryBadge: 'MĀORI',
    badgeEmoji: '🌀',
    iconEmoji: '🪵',
    title: 'Wooden Carvings',
    body:
      'Maori communities are famous for detailed wood carvings found in meeting houses and cultural centers. These carvings often tell stories about history, ancestors, and mythology.',
  },
  {
    id: 'fc-maori-nature',
    category: 'maori',
    categoryBadge: 'MĀORI',
    badgeEmoji: '🌀',
    iconEmoji: '🌿',
    title: 'Nature Respect',
    body:
      'Maori traditions strongly focus on protecting nature. Rivers, forests, and oceans are viewed as living elements connected to spiritual life and community responsibility.',
  },
  {
    id: 'fc-maori-navigation',
    category: 'maori',
    categoryBadge: 'MĀORI',
    badgeEmoji: '🌀',
    iconEmoji: '🛶',
    title: 'Ancient Navigation',
    body:
      'Long before modern technology existed, Maori ancestors traveled across the Pacific Ocean using stars, ocean currents, and wind patterns to reach New Zealand in large traditional canoes.',
  },
  {
    id: 'fc-adventure-bungy',
    category: 'adventure',
    categoryBadge: 'ADVENTURE',
    badgeEmoji: '🪂',
    iconEmoji: '🪢',
    title: 'Bungy Birthplace',
    body:
      'New Zealand is considered the birthplace of commercial bungy jumping. The first famous modern bungy site opened near Queenstown and quickly became popular among adventure travelers.',
  },
  {
    id: 'fc-adventure-queenstown',
    category: 'adventure',
    categoryBadge: 'ADVENTURE',
    badgeEmoji: '🪂',
    iconEmoji: '🎯',
    title: 'Extreme Capital',
    body:
      'Queenstown is often called the adventure capital of the world because visitors can try activities such as skydiving, jet boating, mountain biking, and canyon swings.',
  },
  {
    id: 'fc-adventure-volcano',
    category: 'adventure',
    categoryBadge: 'ADVENTURE',
    badgeEmoji: '🪂',
    iconEmoji: '🌋',
    title: 'Volcano Hiking',
    body:
      'Travelers in New Zealand can hike across active volcanic regions filled with lava fields, crater lakes, and steaming ground. Some landscapes look similar to scenes from science fiction movies.',
  },
  {
    id: 'fc-adventure-glacier',
    category: 'adventure',
    categoryBadge: 'ADVENTURE',
    badgeEmoji: '🪂',
    iconEmoji: '🚁',
    title: 'Glacier Flights',
    body:
      'In glacier regions, tourists can take helicopter flights and land directly on ancient ice formations surrounded by mountains and rainforests at the same time.',
  },
  {
    id: 'fc-adventure-rivers',
    category: 'adventure',
    categoryBadge: 'ADVENTURE',
    badgeEmoji: '🪂',
    iconEmoji: '🛟',
    title: 'Fast Rivers',
    body:
      'Many rivers in New Zealand are perfect for white-water rafting because of their strong currents and narrow rocky valleys. Adventure tours range from beginner-friendly to extremely difficult.',
  },
  {
    id: 'fc-adventure-caves',
    category: 'adventure',
    categoryBadge: 'ADVENTURE',
    badgeEmoji: '🪂',
    iconEmoji: '🧗',
    title: 'Cave Adventures',
    body:
      'New Zealand has underground cave systems where visitors can explore rivers, climb rocks, and float through dark tunnels under glowing cave ceilings filled with glowworms.',
  },
];

export function skguidenzcittyFcctsFilterItems(
  filter: SkguidenzcittyFcctsFilter,
): SkguidenzcittyFcctsEntry[] {
  if (filter === 'all') {
    return SKGUIDENZCITTY_FCCTS_ITEMS;
  }
  return SKGUIDENZCITTY_FCCTS_ITEMS.filter(f => f.category === filter);
}
