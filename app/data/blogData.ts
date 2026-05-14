import type {ImageSourcePropType} from 'react-native';

export type BlogTag =
  | 'Adventure'
  | 'Trekking'
  | 'Nature'
  | 'Geology'
  | 'Wildlife';

export type BlogArticle = {
  id: string;
  featured?: boolean;
  tag: BlogTag;
  readTime: string;
  title: string;
  subtitle: string;
  hero: ImageSourcePropType;
  sections: {title?: string; body: string}[];
};

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'fjords-south-island',
    featured: true,
    tag: 'Nature',
    readTime: '6 min read',
    title: 'Fjords of the South Island',
    subtitle:
      'Milford Sound, Doubtful Sound, and the dramatic landscapes of Fiordland.',
    hero: require('../../assets/i/skguidenzcittblog1.png'),
    sections: [
      {
        body: 'The fjords of New Zealand are considered some of the most breathtaking natural landscapes on Earth. Located mainly in the Fiordland region of the South Island, these massive formations were created thousands of years ago by moving glaciers that slowly carved deep valleys into the mountains. Today, these valleys are filled with dark blue ocean water and surrounded by enormous cliffs covered in green vegetation. The atmosphere in these places changes constantly because of rain, fog, and moving clouds, creating dramatic scenery during every hour of the day.\n\nMilford Sound is the most famous fjord in the country and one of the most visited natural attractions in New Zealand. Travelers usually explore it through boat cruises that pass close to waterfalls, rocky cliffs, and small islands. During rainy weather, hundreds of temporary waterfalls appear on the mountain walls, making the landscape even more impressive. Dolphins, seals, and penguins are often seen near the water, while birds fly across the cliffs and forests above.\n\nThe nearby Doubtful Sound offers a quieter and more isolated experience for travelers who prefer peaceful nature away from crowds. The silence in this area is so unique that some tours stop all engines for several minutes so visitors can hear only natural sounds like water, wind, and birds. Hiking tracks around Fiordland also provide unforgettable panoramic views over valleys, lakes, and distant mountain peaks. The region became globally famous after being featured in several fantasy films because its landscapes look almost untouched by civilization.',
      },
    ],
  },
  {
    id: 'volcano-trails',
    tag: 'Geology',
    readTime: '6 min read',
    title: 'Volcano Trails and Geothermal Wonders',
    subtitle: 'Tongariro, Rotorua, steaming valleys and colorful crater lakes.',
    hero: require('../../assets/i/skguidenzcittblog2.png'),
    sections: [
      {
        body: 'New Zealand is part of the Pacific Ring of Fire, which means volcanic activity has shaped much of the country’s landscape for thousands of years. The North Island contains active volcanoes, steaming valleys, hot springs, and colorful geothermal lakes that create scenery unlike almost anywhere else in the world. Many travelers visit these regions specifically to experience landscapes that feel almost alien because of the steam rising from the ground and the strong geothermal activity visible across the environment.\n\nTongariro National Park is one of the country’s most famous natural destinations. The park contains volcanic mountains, lava fields, and crater lakes with bright green and blue colors. The Tongariro Alpine Crossing hiking route is considered one of the best one-day hikes in the world because it allows visitors to walk directly through volcanic terrain while enjoying panoramic views of mountains and valleys. The changing weather conditions often make the scenery feel dramatic and cinematic throughout the journey.\n\nRotorua is another important geothermal destination known for geysers, bubbling mud pools, and natural hot springs. The smell of sulfur is noticeable throughout the city because geothermal energy is constantly active underground. Visitors can relax in thermal pools, explore volcanic parks, and learn how geothermal energy is connected to Maori culture and local traditions. At night, steam rising through lights creates a unique atmosphere that makes the city feel completely different from ordinary tourist destinations.\n\nVolcanic regions also attract photographers because of their unusual colors and textures. Black volcanic rocks, glowing mineral pools, and steaming ground create scenes that look extraordinary during sunrise and sunset. Many areas are protected national parks, allowing travelers to safely experience these powerful natural environments while preserving them for future generations.',
      },
    ],
  },
  {
    id: 'ancient-forests',
    tag: 'Nature',
    readTime: '6 min read',
    title: 'Forests Filled With Ancient Nature',
    subtitle: 'Kauri giants, West Coast rainforests, glowworms and birdsong.',
    hero: require('../../assets/i/skguidenzcittblog3.png'),
    sections: [
      {
        body: 'New Zealand forests are known for their peaceful atmosphere, deep green colors, and ancient natural beauty. Large rainforests cover parts of both the North and South Islands, creating environments filled with giant trees, waterfalls, moss-covered rocks, and rare bird species. Walking through these forests often feels like entering another world because many areas remain untouched and incredibly quiet.\n\nOne of the most famous forest attractions is the ancient kauri tree forests located in the northern part of the country. Kauri trees are among the largest and oldest trees in the world, with some estimated to be more than a thousand years old. Their enormous trunks and massive branches create unforgettable scenery for visitors exploring forest walking tracks. Conservation efforts are extremely important because these ancient trees are vulnerable to disease and environmental damage.\n\nThe rainforests along the West Coast are famous for their dense vegetation and constantly changing weather conditions. Heavy rainfall creates vibrant green landscapes where plants grow rapidly and rivers flow through rocky valleys. Wooden pathways and suspension bridges allow travelers to safely explore these forests while enjoying waterfalls and panoramic viewpoints hidden deep inside nature.\n\nNew Zealand forests are also home to unique wildlife, including kiwi birds, parrots, and glowworms. Some caves and forest trails become magical at night when tiny glowing insects illuminate the darkness like stars. Eco-tourism is very popular in these areas because travelers can experience nature in a peaceful and environmentally responsible way. Many visitors describe the forests as calming places where the sounds of birds, rivers, and wind create a relaxing atmosphere far away from busy cities.',
      },
    ],
  },
  {
    id: 'glaciers-between-worlds',
    tag: 'Adventure',
    readTime: '6 min read',
    title: 'Glaciers Between Mountains and Rainforests',
    subtitle:
      'Franz Josef and Fox Glacier — blue ice, rainforest valleys, and fast-changing weather.',
    hero: require('../../assets/i/skguidenzcittblog4.png'),
    sections: [
      {
        body: 'New Zealand is one of the few countries where glaciers exist close to rainforests and the ocean, creating a unique combination of landscapes rarely seen anywhere else in the world. The most famous glaciers are Franz Josef Glacier and Fox Glacier, located on the South Island near the rugged West Coast. These glaciers slowly descend from snowy mountain peaks into green valleys surrounded by forests and rivers.\n\nTravelers visiting these glaciers can experience guided walking tours across icy terrain filled with deep blue ice formations, frozen caves, and narrow crevices. Some tours include helicopter flights that land directly on the glacier surface, offering breathtaking panoramic views over mountains, forests, and coastline. The contrast between snow-covered ice and green rainforest scenery creates incredibly photogenic landscapes during every season.\n\nWeather conditions in glacier regions change very quickly. Clouds can move rapidly across mountain peaks while sunlight suddenly illuminates the ice with bright blue reflections. Rainfall often creates waterfalls flowing down nearby cliffs, adding movement and energy to the scenery. Because glaciers are constantly changing naturally, each visit feels slightly different from the previous one.\n\nScientists and environmental researchers also study these glaciers because they provide important information about climate change and environmental conditions. Visitors can learn about how glaciers formed thousands of years ago and how they continue to shape valleys and rivers today. The surrounding national parks contain hiking routes, observation points, and scenic roads that make the journey through glacier regions equally memorable.\n\nThe combination of adventure tourism, natural beauty, and scientific importance makes these glaciers one of the most fascinating destinations in New Zealand. Whether travelers explore them by foot, helicopter, or scenic drive, the experience leaves a lasting impression because of the scale and beauty of the icy landscapes.',
      },
    ],
  },
  {
    id: 'hidden-lakes',
    tag: 'Nature',
    readTime: '6 min read',
    title: 'Hidden Lakes With Crystal Water',
    subtitle:
      'Tekapo, Wanaka, Wakatipu — turquoise water, mountain reflections, and stargazing skies.',
    hero: require('../../assets/i/skguidenzcittblog5.png'),
    sections: [
      {
        body: 'The lakes of New Zealand are famous for their incredibly clean water, vibrant blue colors, and peaceful mountain scenery. Many lakes were formed by glaciers thousands of years ago, which explains their unusual shapes and bright turquoise tones. Surrounded by mountains, forests, and open skies, these lakes attract travelers looking for both relaxation and adventure.\n\nLake Tekapo is one of the most photographed lakes in the country because of its striking turquoise water and nearby snowy mountains. During spring and summer, colorful flowers bloom near the shoreline, creating beautiful landscapes that attract photographers from around the world. At night, the area becomes internationally famous for stargazing because of minimal light pollution. The sky above the lake often reveals thousands of visible stars and the Milky Way stretching across the horizon.\n\nLake Wanaka is another popular destination known for its peaceful atmosphere and scenic walking paths. One of the lake’s most famous attractions is the lone tree growing directly from the water near the shoreline. This tree became an iconic photography location because of its simple but unique appearance against mountain backgrounds during sunrise and sunset.\n\nLake Wakatipu near Queenstown is surrounded by dramatic mountains and offers opportunities for boating, kayaking, hiking, and scenic drives. The lake changes color depending on weather and lighting conditions, sometimes appearing deep blue and other times reflecting golden sunset tones. Visitors often stop at viewpoints along the roads because almost every angle offers impressive scenery.\n\nMany smaller hidden lakes across the country remain less crowded and provide peaceful natural escapes for travelers who enjoy quiet environments. These lakes are ideal for camping, fishing, and exploring nature without large tourist groups. The calm water reflections, fresh mountain air, and surrounding forests create relaxing environments that perfectly represent the natural beauty of New Zealand.',
      },
    ],
  },
  {
    id: 'maori-connection-nature',
    tag: 'Nature',
    readTime: '6 min read',
    title: 'Maori Connection With Nature',
    subtitle:
      'Sacred landmarks, legends, and a living philosophy of environmental respect.',
    hero: require('../../assets/i/skguidenzcittblog6.png'),
    sections: [
      {
        body: 'Nature has always played a central role in Maori culture and traditions. For centuries, Maori communities developed a strong spiritual connection with mountains, forests, rivers, and oceans across New Zealand. Many natural landmarks are considered sacred because they are connected to legends, ancestors, and important historical events passed down through generations.\n\nMaori traditions teach respect for the environment and emphasize the importance of protecting natural resources. This philosophy is still visible today in many parts of New Zealand, especially within national parks and protected regions. Travelers visiting cultural centers and Maori villages can learn traditional stories about volcanic mountains, lakes, and forests while understanding how deeply nature is connected to Maori identity.\n\nRotorua is one of the best places to experience Maori culture because geothermal landscapes and traditional communities exist closely together. Visitors can attend cultural performances featuring haka dances, traditional songs, and storytelling. Local guides often explain how geothermal energy was used for cooking, heating, and daily life long before modern technology appeared.\n\nMany Maori legends describe natural phenomena in symbolic ways. Mountains are often represented as powerful living beings, while rivers and forests are seen as spiritual elements connected to ancestors. These stories help visitors experience New Zealand not only as a beautiful destination but also as a place filled with cultural meaning and history.\n\nTourism experiences connected to Maori culture often focus on respect, education, and environmental awareness. Guided forest walks, canoe journeys, and cultural tours allow travelers to see nature from a different perspective. Instead of simply observing landscapes, visitors learn how these places are connected to identity, tradition, and community values that continue to influence modern New Zealand society.',
      },
    ],
  },
  {
    id: 'wildlife-adventures',
    tag: 'Wildlife',
    readTime: '6 min read',
    title: 'Wildlife Adventures Across New Zealand',
    subtitle:
      'Kiwi, whales, dolphins, and rare birds — encounters shaped by isolation and conservation.',
    hero: require('../../assets/i/skguidenzcittblog7.png'),
    sections: [
      {
        body: 'New Zealand is home to some of the most unique wildlife species in the world because of its long geographic isolation from other continents. Many animals and birds found in the country evolved separately and cannot be seen naturally anywhere else. Wildlife tourism has become one of the most popular travel activities because visitors can experience rare species in beautiful natural environments.\n\nThe kiwi bird is the national symbol of New Zealand and one of the country’s most famous animals. These small flightless birds are nocturnal and difficult to spot in the wild, so many travelers visit protected wildlife centers to observe them safely. Conservation programs across the country work hard to protect kiwi populations from environmental threats and introduced predators.\n\nCoastal regions offer incredible marine wildlife experiences. Whale watching tours near Kaikoura allow visitors to see giant sperm whales, dolphins, seals, and sometimes even orcas moving through the ocean. Boat tours often bring travelers surprisingly close to wildlife while maintaining safe and respectful distances. The combination of mountains and ocean in these areas creates dramatic scenery during wildlife excursions.\n\nNew Zealand is also famous for rare bird species such as the kea, a highly intelligent mountain parrot known for its playful behavior. Forests and islands contain many colorful native birds that thrive because of strong conservation efforts. Some islands are protected sanctuaries where endangered species can live safely without predators.\n\nAdventure tourism and wildlife experiences are often connected in New Zealand. Travelers can hike through forests, kayak near seals, or explore coastal caves filled with glowing insects. Because the country places a strong focus on environmental protection, many natural areas remain incredibly clean and preserved. This allows visitors to experience wildlife in environments that still feel wild, peaceful, and untouched by modern development.',
      },
    ],
  },
];

export function formatBlogTagUpper(tag: BlogTag): string {
  return tag.toUpperCase();
}
