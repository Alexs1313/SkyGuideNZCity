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
} from 'react-native';

import GoldGradientButton from '../components/GoldGradientButton';
import OnboardingOutlineBackButton from '../components/OnboardingOutlineBackButton';

import {ONBOARDING_STEPS} from '../data/onboardingData';

const GOLD = '#C9A24A';
const GOLD_DARK = '#8B6B2A';
const WHITE = '#FFFFFF';
const WHITE_MUTED = 'rgba(255,255,255,0.78)';
const DOT_IDLE = 'rgba(255,255,255,0.28)';

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [onboardStep, setOnboardStep] = useState(0);
  const onboardFade = useRef(new Animated.Value(1)).current;
  const onboardLastStep = ONBOARDING_STEPS.length - 1;

  const onboardGoTabs = useCallback(() => {
    navigation.navigate('MainTabs' as never);
  }, [navigation]);

  const onboardRunFade = useCallback(
    (next: number) => {
      Animated.timing(onboardFade, {
        toValue: 0,
        duration: 140,
        useNativeDriver: true,
      }).start(() => {
        setOnboardStep(next);
        Animated.timing(onboardFade, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    },
    [onboardFade],
  );

  const onboardStepData = ONBOARDING_STEPS[onboardStep];

  const onboardContinue = () => {
    if (onboardStep >= onboardLastStep) {
      onboardGoTabs();
      return;
    }
    onboardRunFade(onboardStep + 1);
  };

  const onboardBack = () => {
    if (onboardStep <= 0) {
      return;
    }
    onboardRunFade(onboardStep - 1);
  };

  return (
    <ImageBackground
      source={onboardStepData.background}
      style={styles.onboardBg}
      resizeMode="cover">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
        <View style={styles.onboardSafe}>
          <View style={styles.onboardTopRow}>
            <View style={styles.onboardBadge}>
              <Text style={styles.onboardBadgeText}>
                {onboardStepData.badge}
              </Text>
            </View>
            <Pressable onPress={onboardGoTabs} hitSlop={12}>
              <Text style={styles.onboardSkip}>Skip</Text>
            </Pressable>
          </View>

          <View style={styles.onboardCircleWrap}>
            <View style={styles.onboardCircleRing}>
              <Image
                source={onboardStepData.feature}
                style={styles.onboardCircleImg}
                resizeMode="cover"
              />
            </View>
          </View>

          <View>
            <View style={styles.onboardDots}>
              {ONBOARDING_STEPS.map((_, onboardI) => (
                <View
                  key={`onboard-dot-${onboardI}`}
                  style={
                    onboardI === onboardStep
                      ? styles.onboardDotActive
                      : styles.onboardDotIdle
                  }
                />
              ))}
            </View>

            <View style={styles.onboardCopy}>
              <Text style={styles.onboardHeadline}>
                {onboardStepData.headline}
              </Text>
              <Text style={styles.onboardSub}>
                {onboardStepData.subHeadline}
              </Text>
              <Text style={styles.onboardBody}>{onboardStepData.body}</Text>
            </View>

            {onboardStepData.showBack ? (
              <View style={styles.onboardActionsRow}>
                <OnboardingOutlineBackButton onPress={onboardBack} />
                <GoldGradientButton
                  onPress={onboardContinue}
                  containerStyle={styles.onboardBtnPrimary}
                  gradientStyle={styles.onboardBtnPrimaryGrad}>
                  <Text style={styles.onboardBtnPrimaryText}>
                    {onboardStepData.primaryLabel}
                    {onboardStep === onboardLastStep ? '  →' : ''}
                  </Text>
                </GoldGradientButton>
              </View>
            ) : (
              <GoldGradientButton
                onPress={onboardContinue}
                colors={[GOLD, GOLD_DARK]}
                containerStyle={styles.onboardBtnPrimaryFull}
                gradientStyle={styles.onboardBtnPrimaryGrad}>
                <Text style={styles.onboardBtnPrimaryText}>
                  {onboardStepData.primaryLabel}
                </Text>
              </GoldGradientButton>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  onboardDots: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 8,
    marginTop: 22,
  },
  onboardRoot: {
    flex: 1,
  },
  onboardBg: {
    flex: 1,
    width: '101%',
  },
  onboardSafe: {
    paddingHorizontal: 22,
    paddingTop: 62,

    paddingBottom: 45,
    justifyContent: 'space-between',
    flex: 1,
  },

  onboardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  onboardBadge: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: GOLD,
    backgroundColor: '#B38D2F33',
  },
  onboardBadgeText: {
    color: GOLD,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
  },
  onboardSkip: {
    color: WHITE_MUTED,
    fontSize: 15,
    fontWeight: '500',
  },
  onboardCircleWrap: {
    alignItems: 'center',
    marginTop: 28,
  },
  onboardCircleRing: {
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
  onboardCircleImg: {
    resizeMode: 'cover',
  },

  onboardDotActive: {
    width: 23,
    height: 5,
    borderRadius: 3,
    backgroundColor: GOLD,
  },
  onboardDotIdle: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: DOT_IDLE,
  },
  onboardCopy: {
    marginTop: 20,
    flexGrow: 1,
  },
  onboardHeadline: {
    color: WHITE,
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  onboardSub: {
    marginTop: 10,
    color: '#B38D2F',
    fontSize: 17,
    fontWeight: '500',
  },
  onboardBody: {
    marginTop: 12,
    color: WHITE_MUTED,
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '400',
    marginBottom: 24,
  },
  onboardBottomSafe: {},
  onboardActionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  onboardBtnPrimary: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: GOLD,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  onboardBtnPrimaryFull: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: GOLD,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  onboardBtnPrimaryGrad: {
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboardBtnPrimaryText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: '700',
  },
});

export default OnboardingScreen;
