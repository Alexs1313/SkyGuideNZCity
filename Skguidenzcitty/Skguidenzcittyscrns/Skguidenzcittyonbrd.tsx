import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GOLD = '#C9A24A';
const GOLD_DARK = '#8B6B2A';
const WHITE = '#FFFFFF';
const WHITE_MUTED = 'rgba(255,255,255,0.78)';
const DOT_IDLE = 'rgba(255,255,255,0.28)';

type SkguidenzcittyonbrdStep = {
  badge: string;
  headline: string;
  subHeadline: string;
  body: string;
  background: ImageSourcePropType;

  feature: ImageSourcePropType;
  primaryLabel: string;
  showBack: boolean;
};

const SKGUIDENZCITTY_ONBRD_STEPS: SkguidenzcittyonbrdStep[] = [
  {
    badge: 'WELCOME',
    headline: 'My name is Liam.',
    subHeadline: 'And this is my love letter to New Zealand.',
    body: "I've hiked every major trail, kayaked through hidden fjords, and camped beneath the Southern Cross. This app is everything I've learned.",
    background: require('../../assets/i/skguidenzcittytaonbg1.png'),
    feature: require('../../assets/i/skguidenzcittytaoncircl1.png'),
    primaryLabel: 'Continue',
    showBack: false,
  },
  {
    badge: 'VOLCANOES',
    headline: 'The volcanoes here are alive.',
    subHeadline: 'Not metaphorically — literally.',
    body: 'I stood on the rim of Tongariro at dawn, watching steam rise from the crater and the emerald lakes glowing below. Nothing prepares you for this.',
    background: require('../../assets/i/skguidenzcittytaonbg2.png'),
    feature: require('../../assets/i/skguidenzcittytaoncircl2.png'),
    primaryLabel: 'Continue',
    showBack: true,
  },
  {
    badge: 'LAKES',
    headline: 'The lakes are another world.',
    subHeadline: 'Turquoise, glacial, impossibly clear.',
    body: "Lake Tekapo at midnight — the Milky Way reflected in glacial water, the old stone church on the shore. That was the moment I knew I'd never stop coming back.",
    background: require('../../assets/i/skguidenzcittytaonbg3.png'),
    feature: require('../../assets/i/skguidenzcittytaoncircl3.png'),
    primaryLabel: 'Continue',
    showBack: true,
  },
  {
    badge: 'GLACIERS',
    headline: 'Glaciers meet rainforest.',
    subHeadline: "A collision of worlds you won't find anywhere else.",
    body: "Fox Glacier flows from the Southern Alps straight into subtropical forest. I've walked on rivers of ancient blue ice while nikau palms swayed above me.",
    background: require('../../assets/i/skguidenzcittytaonbg4.png'),
    feature: require('../../assets/i/skguidenzcittytaoncircl4.png'),
    primaryLabel: 'Continue',
    showBack: true,
  },
  {
    badge: "LET'S GO",
    headline: 'This is your guide.',
    subHeadline: 'Start exploring Aotearoa.',
    body: "Locations, maps, stories, facts, quizzes — everything you need to discover the most extraordinary natural country on Earth. Let's begin.",
    background: require('../../assets/i/skguidenzcittytaonbg5.png'),
    feature: require('../../assets/i/skguidenzcittytaoncircl5.png'),
    primaryLabel: 'Start Exploring',
    showBack: true,
  },
];

const Skguidenzcittyonbrd = () => {
  const pshskylinetwrrsNavigation = useNavigation();
  const [skguidenzcittyonbrdStep, setSkguidenzcittyonbrdStep] = useState(0);
  const skguidenzcittyonbrdFade = useRef(new Animated.Value(1)).current;
  const skguidenzcittyonbrdLastStep = SKGUIDENZCITTY_ONBRD_STEPS.length - 1;

  const skguidenzcittyonbrdGoTabs = useCallback(() => {
    pshskylinetwrrsNavigation.navigate('Skguidenzcittytab' as never);
  }, [pshskylinetwrrsNavigation]);

  const skguidenzcittyonbrdRunFade = useCallback(
    (next: number) => {
      Animated.timing(skguidenzcittyonbrdFade, {
        toValue: 0,
        duration: 140,
        useNativeDriver: true,
      }).start(() => {
        setSkguidenzcittyonbrdStep(next);
        Animated.timing(skguidenzcittyonbrdFade, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    },
    [skguidenzcittyonbrdFade],
  );

  const skguidenzcittyonbrdStepData =
    SKGUIDENZCITTY_ONBRD_STEPS[skguidenzcittyonbrdStep];

  const skguidenzcittyonbrdContinue = () => {
    if (skguidenzcittyonbrdStep >= skguidenzcittyonbrdLastStep) {
      skguidenzcittyonbrdGoTabs();
      return;
    }
    skguidenzcittyonbrdRunFade(skguidenzcittyonbrdStep + 1);
  };

  const skguidenzcittyonbrdBack = () => {
    if (skguidenzcittyonbrdStep <= 0) {
      return;
    }
    skguidenzcittyonbrdRunFade(skguidenzcittyonbrdStep - 1);
  };

  return (
    <ImageBackground
      source={skguidenzcittyonbrdStepData.background}
      style={styles.skguidenzcittyonbrdBg}
      resizeMode="cover">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
        <View style={styles.skguidenzcittyonbrdSafe}>
          <View style={styles.skguidenzcittyonbrdTopRow}>
            <View style={styles.skguidenzcittyonbrdBadge}>
              <Text style={styles.skguidenzcittyonbrdBadgeText}>
                {skguidenzcittyonbrdStepData.badge}
              </Text>
            </View>
            <Pressable onPress={skguidenzcittyonbrdGoTabs} hitSlop={12}>
              <Text style={styles.skguidenzcittyonbrdSkip}>Skip</Text>
            </Pressable>
          </View>

          <View style={styles.skguidenzcittyonbrdCircleWrap}>
            <View style={styles.skguidenzcittyonbrdCircleRing}>
              <Image
                source={skguidenzcittyonbrdStepData.feature}
                style={styles.skguidenzcittyonbrdCircleImg}
                resizeMode="cover"
              />
            </View>
          </View>

          <View>
            <View style={styles.skguidenzcittyonbrdDots}>
              {SKGUIDENZCITTY_ONBRD_STEPS.map((_, skguidenzcittyonbrdI) => (
                <View
                  key={`skguidenzcittyonbrd-dot-${skguidenzcittyonbrdI}`}
                  style={
                    skguidenzcittyonbrdI === skguidenzcittyonbrdStep
                      ? styles.skguidenzcittyonbrdDotActive
                      : styles.skguidenzcittyonbrdDotIdle
                  }
                />
              ))}
            </View>

            <View style={styles.skguidenzcittyonbrdCopy}>
              <Text style={styles.skguidenzcittyonbrdHeadline}>
                {skguidenzcittyonbrdStepData.headline}
              </Text>
              <Text style={styles.skguidenzcittyonbrdSub}>
                {skguidenzcittyonbrdStepData.subHeadline}
              </Text>
              <Text style={styles.skguidenzcittyonbrdBody}>
                {skguidenzcittyonbrdStepData.body}
              </Text>
            </View>

            {skguidenzcittyonbrdStepData.showBack ? (
              <View style={styles.skguidenzcittyonbrdActionsRow}>
                <Pressable
                  onPress={skguidenzcittyonbrdBack}
                  style={({pressed}) => [
                    styles.skguidenzcittyonbrdBtnBack,
                    pressed && styles.skguidenzcittyonbrdBtnPressed,
                  ]}>
                  <Text style={styles.skguidenzcittyonbrdBtnBackText}>
                    Back
                  </Text>
                </Pressable>
                <Pressable
                  onPress={skguidenzcittyonbrdContinue}
                  style={({pressed}) => [
                    styles.skguidenzcittyonbrdBtnPrimary,
                    pressed && styles.skguidenzcittyonbrdBtnPressed,
                  ]}>
                  <LinearGradient
                    colors={['#B38D2F', '#8B6914']}
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 1}}
                    style={styles.skguidenzcittyonbrdBtnPrimaryGrad}>
                    <Text style={styles.skguidenzcittyonbrdBtnPrimaryText}>
                      {skguidenzcittyonbrdStepData.primaryLabel}
                      {skguidenzcittyonbrdStep === skguidenzcittyonbrdLastStep
                        ? '  →'
                        : ''}
                    </Text>
                  </LinearGradient>
                </Pressable>
              </View>
            ) : (
              <Pressable
                onPress={skguidenzcittyonbrdContinue}
                style={({pressed}) => [
                  styles.skguidenzcittyonbrdBtnPrimaryFull,
                  pressed && styles.skguidenzcittyonbrdBtnPressed,
                ]}>
                <LinearGradient
                  colors={[GOLD, GOLD_DARK]}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                  style={styles.skguidenzcittyonbrdBtnPrimaryGrad}>
                  <Text style={styles.skguidenzcittyonbrdBtnPrimaryText}>
                    {skguidenzcittyonbrdStepData.primaryLabel}
                  </Text>
                </LinearGradient>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  skguidenzcittyonbrdDots: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 8,
    marginTop: 22,
  },
  skguidenzcittyonbrdRoot: {
    flex: 1,
  },
  skguidenzcittyonbrdBg: {
    flex: 1,
    width: '101%',
  },
  skguidenzcittyonbrdSafe: {
    paddingHorizontal: 22,
    paddingTop: 62,

    paddingBottom: 45,
    justifyContent: 'space-between',
    flex: 1,
  },

  skguidenzcittyonbrdTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  skguidenzcittyonbrdBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: GOLD,
    backgroundColor: '#B38D2F33',
  },
  skguidenzcittyonbrdBadgeText: {
    color: GOLD,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  skguidenzcittyonbrdSkip: {
    color: WHITE_MUTED,
    fontSize: 15,
    fontWeight: '500',
  },
  skguidenzcittyonbrdCircleWrap: {
    alignItems: 'center',
    marginTop: 28,
  },
  skguidenzcittyonbrdCircleRing: {
    width: 380,
    height: 380,
    borderRadius: 190,
    borderWidth: 2,
    borderColor: '#B38D2F80',

    overflow: 'hidden',
    backgroundColor: '#B38D2F66',
    alignItems: 'center',
    justifyContent: 'center',
  },

  skguidenzcittyonbrdDotActive: {
    width: 23,
    height: 5,
    borderRadius: 3,
    backgroundColor: GOLD,
  },
  skguidenzcittyonbrdDotIdle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: DOT_IDLE,
  },
  skguidenzcittyonbrdCopy: {
    marginTop: 20,
    flexGrow: 1,
  },
  skguidenzcittyonbrdHeadline: {
    color: WHITE,
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  skguidenzcittyonbrdSub: {
    marginTop: 10,
    color: '#B38D2F',
    fontSize: 17,
    fontWeight: '500',
  },
  skguidenzcittyonbrdBody: {
    marginTop: 12,
    color: WHITE_MUTED,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
    marginBottom: 24,
  },
  skguidenzcittyonbrdBottomSafe: {},
  skguidenzcittyonbrdActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  skguidenzcittyonbrdBtnBack: {
    width: 90,
    height: 55,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#B38D2F66',
    backgroundColor: '#B38D2F14',
    alignItems: 'center',
    justifyContent: 'center',
  },
  skguidenzcittyonbrdBtnBackText: {
    color: GOLD,
    fontSize: 16,
    fontWeight: '700',
  },
  skguidenzcittyonbrdBtnPrimary: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: GOLD,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  skguidenzcittyonbrdBtnPrimaryFull: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: GOLD,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  skguidenzcittyonbrdBtnPrimaryGrad: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skguidenzcittyonbrdBtnPrimaryText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: '700',
  },
  skguidenzcittyonbrdBtnPressed: {
    opacity: 0.88,
  },
});

export default Skguidenzcittyonbrd;
