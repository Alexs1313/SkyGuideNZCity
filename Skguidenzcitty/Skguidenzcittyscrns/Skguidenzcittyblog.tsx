import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Skguidenzcittylaytt from '../Skguidenzcittycompn/Skguidenzcittylaytt';

const GOLD = '#B38D2F';
const WHITE = '#FFFFFF';
const GREY = 'rgba(255,255,255,0.45)';
const BG = '#0A0A0A';

type SkguidenzcittyBlogTag =
  | 'Adventure'
  | 'Trekking'
  | 'Nature'
  | 'Geology'
  | 'Wildlife';

type SkguidenzcittyBlogArticle = {
  id: string;
  featured?: boolean;
  tag: SkguidenzcittyBlogTag;
  readTime: string;
  title: string;
  subtitle: string;
  hero: number;
  sections: {title?: string; body: string}[];
};

const SKGUIDENZCITTY_BLOG_ITEMS: SkguidenzcittyBlogArticle[] = [
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

function skguidenzcittyBlogTagUpper(tag: SkguidenzcittyBlogTag) {
  return tag.toUpperCase();
}

const Skguidenzcittyblog = () => {
  const skguidenzcittyblogInsets = useSafeAreaInsets();
  const [skguidenzcittyblogSelectedId, setSkguidenzcittyblogSelectedId] =
    useState<string | null>(null);

  const skguidenzcittyblogFeatured = useMemo(
    () =>
      SKGUIDENZCITTY_BLOG_ITEMS.find(a => a.featured) ??
      SKGUIDENZCITTY_BLOG_ITEMS[0],
    [],
  );

  const skguidenzcittyblogMore = useMemo(
    () =>
      SKGUIDENZCITTY_BLOG_ITEMS.filter(
        a => a.id !== skguidenzcittyblogFeatured.id,
      ),
    [skguidenzcittyblogFeatured.id],
  );

  const skguidenzcittyblogSelected = useMemo(() => {
    if (!skguidenzcittyblogSelectedId) {
      return undefined;
    }
    return SKGUIDENZCITTY_BLOG_ITEMS.find(
      a => a.id === skguidenzcittyblogSelectedId,
    );
  }, [skguidenzcittyblogSelectedId]);

  const skguidenzcittyblogOpen = useCallback((id: string) => {
    setSkguidenzcittyblogSelectedId(id);
  }, []);

  const skguidenzcittyblogBack = useCallback(() => {
    setSkguidenzcittyblogSelectedId(null);
  }, []);

  const skguidenzcittyblogShare = useCallback(
    async (a: SkguidenzcittyBlogArticle) => {
      await Share.share({
        message: `${a.title}\n\n${a.subtitle}`,
      });
    },
    [],
  );

  if (skguidenzcittyblogSelected) {
    return (
      <Skguidenzcittylaytt bounce={false}>
        <View style={styles.skguidenzcittyblogDetailRoot}>
          <ImageBackground
            source={skguidenzcittyblogSelected.hero}
            style={styles.skguidenzcittyblogDetailHero}
            imageStyle={styles.skguidenzcittyblogDetailHeroImg}>
            <LinearGradient
              colors={['rgba(0,0,0,0.10)', 'rgba(0,0,0,0.92)']}
              locations={[0.2, 1]}
              style={StyleSheet.absoluteFill}
            />

            <View
              style={[
                styles.skguidenzcittyblogDetailTopRow,
                {paddingTop: skguidenzcittyblogInsets.top + 12},
              ]}>
              <Pressable
                onPress={skguidenzcittyblogBack}
                style={({pressed}) => [
                  styles.skguidenzcittyblogBackBtn,
                  pressed && styles.skguidenzcittyblogPressed,
                ]}>
                <Image
                  source={require('../../assets/i/skguidenzcittytaoback.png')}
                  style={styles.skguidenzcittyblogBackIcon}
                />
                <Text style={styles.skguidenzcittyblogBackText}>Back</Text>
              </Pressable>

              <View style={styles.skguidenzcittyblogDetailMetaPill}>
                <Text style={styles.skguidenzcittyblogDetailMetaPillText}>
                  {skguidenzcittyBlogTagUpper(skguidenzcittyblogSelected.tag)}
                </Text>
                <Text style={styles.skguidenzcittyblogDetailMetaDot}>·</Text>
                <Text style={styles.skguidenzcittyblogDetailMetaPillText}>
                  {skguidenzcittyblogSelected.readTime}
                </Text>
              </View>
            </View>

            <View style={styles.skguidenzcittyblogDetailHeroText}>
              <Text style={styles.skguidenzcittyblogDetailTitle}>
                {skguidenzcittyblogSelected.title}
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.skguidenzcittyblogDetailBody}>
            <Text style={styles.skguidenzcittyblogDetailSub}>
              {skguidenzcittyblogSelected.subtitle}
            </Text>

            {skguidenzcittyblogSelected.sections.map((s, idx) => (
              <View
                key={`${skguidenzcittyblogSelected.id}-${idx}`}
                style={styles.skguidenzcittyblogSection}>
                {s.title ? (
                  <Text style={styles.skguidenzcittyblogSectionTitle}>
                    {s.title}
                  </Text>
                ) : null}
                <Text style={styles.skguidenzcittyblogSectionBody}>
                  {s.body}
                </Text>
              </View>
            ))}

            <Pressable
              onPress={() =>
                skguidenzcittyblogShare(skguidenzcittyblogSelected)
              }
              style={({pressed}) => [
                styles.skguidenzcittyblogShareOuter,
                pressed && styles.skguidenzcittyblogPressed,
              ]}>
              <LinearGradient
                colors={[GOLD, '#8B6914']}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
                style={styles.skguidenzcittyblogShareGrad}>
                <Image
                  source={require('../../assets/i/skguidenzcittytalshr.png')}
                  style={styles.skguidenzcittyblogShareIcon}
                />
                <Text style={styles.skguidenzcittyblogShareText}>
                  Share this article
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </Skguidenzcittylaytt>
    );
  }

  return (
    <Skguidenzcittylaytt bounce={false}>
      <View
        style={[
          styles.skguidenzcittyblogRoot,
          {paddingTop: skguidenzcittyblogInsets.top + 8},
        ]}>
        <View style={styles.skguidenzcittyblogHeader}>
          <Text style={styles.skguidenzcittyblogKicker}>STORIES</Text>
          <Text style={styles.skguidenzcittyblogTitle}>Nature Blog</Text>
        </View>

        <Pressable
          onPress={() => skguidenzcittyblogOpen(skguidenzcittyblogFeatured.id)}
          style={({pressed}) => [
            styles.skguidenzcittyblogFeatured,
            pressed && styles.skguidenzcittyblogPressed,
          ]}>
          <ImageBackground
            source={skguidenzcittyblogFeatured.hero}
            style={styles.skguidenzcittyblogFeaturedBg}
            imageStyle={styles.skguidenzcittyblogFeaturedBgImg}>
            <LinearGradient
              colors={['rgba(0,0,0,0.10)', 'rgba(0,0,0,0.86)']}
              locations={[0.1, 1]}
              style={StyleSheet.absoluteFill}
            />

            <View style={styles.skguidenzcittyblogFeaturedTopRow}>
              <View style={styles.skguidenzcittyblogFeaturedBadge}>
                <Text style={styles.skguidenzcittyblogFeaturedBadgeText}>
                  ⭐ FEATURED
                </Text>
              </View>
            </View>

            <View style={styles.skguidenzcittyblogFeaturedText}>
              <View style={styles.skguidenzcittyblogMetaRow}>
                <Text style={styles.skguidenzcittyblogMetaTag}>
                  {skguidenzcittyBlogTagUpper(skguidenzcittyblogFeatured.tag)}
                </Text>
                <Text style={styles.skguidenzcittyblogMetaDot}>·</Text>
                <Text style={styles.skguidenzcittyblogMetaTime}>
                  {skguidenzcittyblogFeatured.readTime}
                </Text>
              </View>
              <Text style={styles.skguidenzcittyblogFeaturedTitle}>
                {skguidenzcittyblogFeatured.title}
              </Text>
              <Text
                style={styles.skguidenzcittyblogFeaturedSub}
                numberOfLines={2}>
                {skguidenzcittyblogFeatured.subtitle}
              </Text>
            </View>
          </ImageBackground>
        </Pressable>

        <Text style={styles.skguidenzcittyblogMoreTitle}>MORE STORIES</Text>

        <View style={styles.skguidenzcittyblogList}>
          {skguidenzcittyblogMore.map(item => (
            <Pressable
              key={item.id}
              onPress={() => skguidenzcittyblogOpen(item.id)}
              style={({pressed}) => [
                styles.skguidenzcittyblogRow,
                pressed && styles.skguidenzcittyblogPressed,
              ]}>
              <ImageBackground
                source={item.hero}
                style={styles.skguidenzcittyblogRowImg}
                imageStyle={styles.skguidenzcittyblogRowImgRadius}
              />
              <View style={styles.skguidenzcittyblogRowBody}>
                <View style={styles.skguidenzcittyblogMetaRow}>
                  <Text style={styles.skguidenzcittyblogMetaTag}>
                    {skguidenzcittyBlogTagUpper(item.tag)}
                  </Text>
                  <Text style={styles.skguidenzcittyblogMetaDot}>·</Text>
                  <Text style={styles.skguidenzcittyblogMetaTime}>
                    {item.readTime}
                  </Text>
                </View>
                <Text
                  style={styles.skguidenzcittyblogRowTitle}
                  numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.skguidenzcittyblogRowSub} numberOfLines={2}>
                  {item.subtitle}
                </Text>
              </View>
              <Text style={styles.skguidenzcittyblogChevron}>›</Text>
            </Pressable>
          ))}
        </View>
        <View style={{height: skguidenzcittyblogInsets.bottom + 96}} />
      </View>
    </Skguidenzcittylaytt>
  );
};

const styles = StyleSheet.create({
  skguidenzcittyblogRoot: {
    flex: 1,
    backgroundColor: BG,
  },
  skguidenzcittyblogHeader: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  skguidenzcittyblogKicker: {
    color: GOLD,
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  skguidenzcittyblogTitle: {
    marginTop: 4,
    color: WHITE,
    fontSize: 28,
    fontWeight: '700',
  },
  skguidenzcittyblogFeatured: {
    marginHorizontal: 20,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#B38D2F33',
    minHeight: 200,
  },
  skguidenzcittyblogFeaturedBg: {
    minHeight: 200,
    justifyContent: 'flex-end',
  },
  skguidenzcittyblogFeaturedBgImg: {
    borderRadius: 22,
  },
  skguidenzcittyblogFeaturedTopRow: {
    position: 'absolute',
    top: 14,
    left: 14,
  },
  skguidenzcittyblogFeaturedBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
    backgroundColor: GOLD,
  },
  skguidenzcittyblogFeaturedBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  skguidenzcittyblogFeaturedText: {
    padding: 16,
  },
  skguidenzcittyblogMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  skguidenzcittyblogMetaTag: {
    color: GOLD,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  skguidenzcittyblogMetaDot: {
    color: '#FFFFFF80',
    marginTop: -1,
    fontSize: 12,
  },
  skguidenzcittyblogMetaTime: {
    color: '#FFFFFF80',
    fontSize: 10,
    fontWeight: '500',
  },
  skguidenzcittyblogFeaturedTitle: {
    color: WHITE,
    fontSize: 20,
    fontWeight: '800',
  },
  skguidenzcittyblogFeaturedSub: {
    marginTop: 6,
    color: '#FFFFFFA6',
    fontSize: 13,
    fontWeight: '500',
  },
  skguidenzcittyblogMoreTitle: {
    marginTop: 18,
    marginBottom: 10,
    paddingHorizontal: 20,
    color: GREY,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  skguidenzcittyblogList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  skguidenzcittyblogRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FFFFFF14',
    backgroundColor: '#FFFFFF0A',
    padding: 12,
  },
  skguidenzcittyblogRowImg: {
    width: 82,
    height: 82,

    borderRadius: 14,

    overflow: 'hidden',
  },
  skguidenzcittyblogRowImgRadius: {
    borderRadius: 14,
  },
  skguidenzcittyblogRowBody: {
    flex: 1,
  },
  skguidenzcittyblogRowTitle: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '700',
  },
  skguidenzcittyblogRowSub: {
    marginTop: 4,
    color: '#FFFFFF80',
    fontSize: 12,
    fontWeight: '500',
  },
  skguidenzcittyblogChevron: {
    color: '#FFFFFF66',
    fontSize: 26,
    fontWeight: '300',
    paddingLeft: 4,
    marginTop: -2,
  },
  skguidenzcittyblogPressed: {
    opacity: 0.88,
  },

  skguidenzcittyblogDetailRoot: {
    flex: 1,
    backgroundColor: BG,
  },
  skguidenzcittyblogDetailHero: {
    minHeight: 300,
    justifyContent: 'flex-end',
  },
  skguidenzcittyblogDetailHeroImg: {
    resizeMode: 'cover',
  },
  skguidenzcittyblogDetailTopRow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,

    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    gap: 12,
  },
  skguidenzcittyblogBackBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 80,
    height: 62,
    borderRadius: 18,
    justifyContent: 'center',
    backgroundColor: '#00000080',
    borderWidth: 1,
    borderColor: '#FFFFFF26',
  },
  skguidenzcittyblogBackIcon: {
    width: 14,
    height: 14,
    tintColor: WHITE,
    resizeMode: 'contain',
  },
  skguidenzcittyblogBackText: {
    color: WHITE,
    fontSize: 13,
    fontWeight: '700',
  },
  skguidenzcittyblogDetailMetaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,

    paddingVertical: 10,
    borderRadius: 18,

    backgroundColor: '#B38D2F40',
    borderWidth: 1,
    borderColor: '#B38D2F73',
  },
  skguidenzcittyblogDetailMetaPillText: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '600',
  },
  skguidenzcittyblogDetailMetaDot: {
    color: '#FFFFFFA6',
    marginTop: -1,
    fontSize: 14,
  },
  skguidenzcittyblogDetailHeroText: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  skguidenzcittyblogDetailTitle: {
    color: WHITE,
    fontSize: 22,

    fontWeight: '700',
  },
  skguidenzcittyblogDetailBody: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 110,
  },
  skguidenzcittyblogDetailSub: {
    color: '#B38D2F',
    fontSize: 16,
    fontWeight: '500',

    marginBottom: 6,
  },
  skguidenzcittyblogSection: {
    marginTop: 14,
  },
  skguidenzcittyblogSectionTitle: {
    color: WHITE,
    fontSize: 18,

    fontWeight: '800',

    marginBottom: 8,
  },
  skguidenzcittyblogSectionBody: {
    color: '#FFFFFFB8',
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
  },
  skguidenzcittyblogShareOuter: {
    marginTop: 28,
    borderRadius: 16,

    overflow: 'hidden',

    shadowColor: GOLD,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.35,
    shadowRadius: 21,
    elevation: 8,
  },
  skguidenzcittyblogShareGrad: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  skguidenzcittyblogShareIcon: {
    width: 18,
    height: 18,

    tintColor: WHITE,
    resizeMode: 'contain',
  },
  skguidenzcittyblogShareText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '800',
  },
});

export default Skguidenzcittyblog;
