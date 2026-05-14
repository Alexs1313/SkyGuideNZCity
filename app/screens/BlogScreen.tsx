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

import {BG, GOLD, GREY, WHITE} from '../../colors';
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from '../../typography';
import BlogDetailBackButton from '../components/BlogDetailBackButton';
import GoldGradientButton from '../components/GoldGradientButton';
import ScreenLayout from '../components/ScreenLayout';

import {
  BLOG_ARTICLES,
  formatBlogTagUpper,
  type BlogArticle,
} from '../data/blogData';

const BlogScreen = () => {
  const blogInsets = useSafeAreaInsets();
  const [blogSelectedId, setBlogSelectedId] =
    useState<string | null>(null);

  const blogFeatured = useMemo(
    () =>
      BLOG_ARTICLES.find(a => a.featured) ??
      BLOG_ARTICLES[0],
    [],
  );

  const blogMore = useMemo(
    () =>
      BLOG_ARTICLES.filter(
        a => a.id !== blogFeatured.id,
      ),
    [blogFeatured.id],
  );

  const blogSelected = useMemo(() => {
    if (!blogSelectedId) {
      return undefined;
    }
    return BLOG_ARTICLES.find(
      a => a.id === blogSelectedId,
    );
  }, [blogSelectedId]);

  const blogOpen = useCallback((id: string) => {
    setBlogSelectedId(id);
  }, []);

  const blogBack = useCallback(() => {
    setBlogSelectedId(null);
  }, []);

  const blogShare = useCallback(
    async (a: BlogArticle) => {
      await Share.share({
        message: `${a.title}\n\n${a.subtitle}`,
      });
    },
    [],
  );

  if (blogSelected) {
    return (
      <ScreenLayout bounce={false}>
        <View style={styles.blogDetailRoot}>
          <ImageBackground
            source={blogSelected.hero}
            style={styles.blogDetailHero}
            imageStyle={styles.blogDetailHeroImg}>
            <LinearGradient
              colors={['rgba(0,0,0,0.10)', 'rgba(0,0,0,0.92)']}
              locations={[0.2, 1]}
              style={StyleSheet.absoluteFill}
            />

            <View
              style={[
                styles.blogDetailTopRow,
                {paddingTop: blogInsets.top + 12},
              ]}>
              <BlogDetailBackButton onPress={blogBack} />

              <View style={styles.blogDetailMetaPill}>
                <Text style={styles.blogDetailMetaPillText}>
                  {formatBlogTagUpper(blogSelected.tag)}
                </Text>
                <Text style={styles.blogDetailMetaDot}>·</Text>
                <Text style={styles.blogDetailMetaPillText}>
                  {blogSelected.readTime}
                </Text>
              </View>
            </View>

            <View style={styles.blogDetailHeroText}>
              <Text style={styles.blogDetailTitle}>
                {blogSelected.title}
              </Text>
            </View>
          </ImageBackground>

          <View style={styles.blogDetailBody}>
            <Text style={styles.blogDetailSub}>
              {blogSelected.subtitle}
            </Text>

            {blogSelected.sections.map((s, idx) => (
              <View
                key={`${blogSelected.id}-${idx}`}
                style={styles.blogSection}>
                {s.title ? (
                  <Text style={styles.blogSectionTitle}>
                    {s.title}
                  </Text>
                ) : null}
                <Text style={styles.blogSectionBody}>
                  {s.body}
                </Text>
              </View>
            ))}

            <GoldGradientButton
              onPress={() => blogShare(blogSelected)}
              colors={[GOLD, '#8B6914']}
              containerStyle={styles.blogShareOuter}
              gradientStyle={styles.blogShareGrad}>
              <Image
                source={require('../../assets/i/skguidenzcittytalshr.png')}
                style={styles.blogShareIcon}
              />
              <Text style={styles.blogShareText}>
                Share this article
              </Text>
            </GoldGradientButton>
          </View>
        </View>
      </ScreenLayout>
    );
  }

  return (
    <ScreenLayout bounce={false}>
      <View
        style={[
          styles.blogRoot,
          {paddingTop: blogInsets.top + 8},
        ]}>
        <View style={styles.blogHeader}>
          <Text style={styles.blogKicker}>STORIES</Text>
          <Text style={styles.blogTitle}>Nature Blog</Text>
        </View>

        <Pressable
          onPress={() => blogOpen(blogFeatured.id)}
          style={({pressed}) => [
            styles.blogFeatured,
            pressed && styles.blogPressed,
          ]}>
          <ImageBackground
            source={blogFeatured.hero}
            style={styles.blogFeaturedBg}
            imageStyle={styles.blogFeaturedBgImg}>
            <LinearGradient
              colors={['rgba(0,0,0,0.10)', 'rgba(0,0,0,0.86)']}
              locations={[0.1, 1]}
              style={StyleSheet.absoluteFill}
            />

            <View style={styles.blogFeaturedTopRow}>
              <View style={styles.blogFeaturedBadge}>
                <Text style={styles.blogFeaturedBadgeText}>
                  ⭐ FEATURED
                </Text>
              </View>
            </View>

            <View style={styles.blogFeaturedText}>
              <View style={styles.blogMetaRow}>
                <Text style={styles.blogMetaTag}>
                  {formatBlogTagUpper(blogFeatured.tag)}
                </Text>
                <Text style={styles.blogMetaDot}>·</Text>
                <Text style={styles.blogMetaTime}>
                  {blogFeatured.readTime}
                </Text>
              </View>
              <Text style={styles.blogFeaturedTitle}>
                {blogFeatured.title}
              </Text>
              <Text
                style={styles.blogFeaturedSub}
                numberOfLines={2}>
                {blogFeatured.subtitle}
              </Text>
            </View>
          </ImageBackground>
        </Pressable>

        <Text style={styles.blogMoreTitle}>MORE STORIES</Text>

        <View style={styles.blogList}>
          {blogMore.map(item => (
            <Pressable
              key={item.id}
              onPress={() => blogOpen(item.id)}
              style={({pressed}) => [
                styles.blogRow,
                pressed && styles.blogPressed,
              ]}>
              <ImageBackground
                source={item.hero}
                style={styles.blogRowImg}
                imageStyle={styles.blogRowImgRadius}
              />
              <View style={styles.blogRowBody}>
                <View style={styles.blogMetaRow}>
                  <Text style={styles.blogMetaTag}>
                    {formatBlogTagUpper(item.tag)}
                  </Text>
                  <Text style={styles.blogMetaDot}>·</Text>
                  <Text style={styles.blogMetaTime}>
                    {item.readTime}
                  </Text>
                </View>
                <Text
                  style={styles.blogRowTitle}
                  numberOfLines={2}>
                  {item.title}
                </Text>
                <Text style={styles.blogRowSub} numberOfLines={2}>
                  {item.subtitle}
                </Text>
              </View>
              <Text style={styles.blogChevron}>›</Text>
            </Pressable>
          ))}
        </View>
        <View style={{height: blogInsets.bottom + 96}} />
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  blogRoot: {
    flex: 1,
    backgroundColor: BG,
  },
  blogHeader: {
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  blogKicker: {
    color: GOLD,
    fontSize: fontSize.subheadline,
    fontWeight: fontWeight.semibold,
    letterSpacing: letterSpacing.kicker,
  },
  blogTitle: {
    marginTop: 4,
    color: WHITE,
    fontSize: fontSize.display2,
    fontWeight: fontWeight.bold,
  },
  blogFeatured: {
    marginHorizontal: 20,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#B38D2F33',
    minHeight: 200,
  },
  blogFeaturedBg: {
    minHeight: 200,
    justifyContent: 'flex-end',
  },
  blogFeaturedBgImg: {
    borderRadius: 22,
  },
  blogFeaturedTopRow: {
    position: 'absolute',
    top: 14,
    left: 14,
  },
  blogFeaturedBadge: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 14,
    backgroundColor: GOLD,
  },
  blogFeaturedBadgeText: {
    color: '#FFFFFF',
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.badge,
  },
  blogFeaturedText: {
    padding: 16,
  },
  blogMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  blogMetaTag: {
    color: GOLD,
    fontSize: fontSize.caption2,
    fontWeight: fontWeight.extrabold,
    letterSpacing: letterSpacing.label,
  },
  blogMetaDot: {
    color: '#FFFFFF80',
    marginTop: -1,
    fontSize: fontSize.footnote,
  },
  blogMetaTime: {
    color: '#FFFFFF80',
    fontSize: fontSize.caption2,
    fontWeight: fontWeight.medium,
  },
  blogFeaturedTitle: {
    color: WHITE,
    fontSize: fontSize.title2,
    fontWeight: fontWeight.extrabold,
  },
  blogFeaturedSub: {
    marginTop: 6,
    color: '#FFFFFFA6',
    fontSize: fontSize.subheadline,
    fontWeight: fontWeight.medium,
  },
  blogMoreTitle: {
    marginTop: 18,
    marginBottom: 10,
    paddingHorizontal: 20,
    color: GREY,
    fontSize: fontSize.caption,
    fontWeight: fontWeight.bold,
    letterSpacing: letterSpacing.label,
  },
  blogList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  blogRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#FFFFFF14',
    backgroundColor: '#FFFFFF0A',
    padding: 12,
  },
  blogRowImg: {
    width: 82,
    height: 82,

    borderRadius: 14,

    overflow: 'hidden',
  },
  blogRowImgRadius: {
    borderRadius: 14,
  },
  blogRowBody: {
    flex: 1,
  },
  blogRowTitle: {
    color: WHITE,
    fontSize: fontSize.body,
    fontWeight: fontWeight.bold,
  },
  blogRowSub: {
    marginTop: 4,
    color: '#FFFFFF80',
    fontSize: fontSize.footnote,
    fontWeight: fontWeight.medium,
  },
  blogChevron: {
    color: '#FFFFFF66',
    fontSize: fontSize.display3,
    fontWeight: fontWeight.light,
    paddingLeft: 4,
    marginTop: -2,
  },
  blogPressed: {
    opacity: 0.88,
  },

  blogDetailRoot: {
    flex: 1,
    backgroundColor: BG,
  },
  blogDetailHero: {
    minHeight: 300,
    justifyContent: 'flex-end',
  },
  blogDetailHeroImg: {
    resizeMode: 'cover',
  },
  blogDetailTopRow: {
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
  blogDetailMetaPill: {
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
  blogDetailMetaPillText: {
    color: '#D4AF37',
    fontSize: fontSize.footnote,
    fontWeight: fontWeight.semibold,
  },
  blogDetailMetaDot: {
    color: '#FFFFFFA6',
    marginTop: -1,
    fontSize: fontSize.callout,
  },
  blogDetailHeroText: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  blogDetailTitle: {
    color: WHITE,
    fontSize: fontSize.title1,
    fontWeight: fontWeight.bold,
  },
  blogDetailBody: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 110,
  },
  blogDetailSub: {
    color: '#B38D2F',
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.medium,

    marginBottom: 6,
  },
  blogSection: {
    marginTop: 14,
  },
  blogSectionTitle: {
    color: WHITE,
    fontSize: fontSize.title3,
    fontWeight: fontWeight.extrabold,

    marginBottom: 8,
  },
  blogSectionBody: {
    color: '#FFFFFFB8',
    fontSize: fontSize.body,
    lineHeight: lineHeight.body,
    fontWeight: fontWeight.regular,
  },
  blogShareOuter: {
    marginTop: 28,
    borderRadius: 16,

    overflow: 'hidden',

    shadowColor: GOLD,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.35,
    shadowRadius: 21,
    elevation: 8,
  },
  blogShareGrad: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  blogShareIcon: {
    width: 18,
    height: 18,

    tintColor: WHITE,
    resizeMode: 'contain',
  },
  blogShareText: {
    color: WHITE,
    fontSize: fontSize.bodyLarge,
    fontWeight: fontWeight.extrabold,
  },
});

export default BlogScreen;
