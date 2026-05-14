import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Skguidenzcittylaytt from '../Skguidenzcittycompn/Skguidenzcittylaytt';
import {
  skguidenzcittyQuizPickRound,
  type SkguidenzcittyQuizQuestion,
} from './skguidenzcittyquizdata';

import {useFocusEffect} from '@react-navigation/native';

const GOLD = '#B38D2F';
const WHITE = '#FFFFFF';
const GREY = 'rgba(255,255,255,0.45)';
const BG = '#0A0A0A';
const GREEN_OK = '#2E7D4A';
const RED_BAD = '#C62828';
const TIMER_WARN = '#E53935';

const QUIZ_LEN = 5;
const SECONDS = 15;

const LETTERS = ['A', 'B', 'C', 'D'] as const;

type SkguidenzcittyquizPhase = 'intro' | 'quiz' | 'results';

const Skguidenzcittyquiz = () => {
  const skguidenzcittyquizInsets = useSafeAreaInsets();
  const [skguidenzcittyquizPhase, setSkguidenzcittyquizPhase] =
    useState<SkguidenzcittyquizPhase>('intro');
  const [skguidenzcittyquizDeck, setSkguidenzcittyquizDeck] = useState<
    SkguidenzcittyQuizQuestion[]
  >([]);
  const [skguidenzcittyquizIndex, setSkguidenzcittyquizIndex] = useState(0);
  const [skguidenzcittyquizAnswers, setSkguidenzcittyquizAnswers] = useState<
    (number | null)[]
  >(() => Array(QUIZ_LEN).fill(null));
  const [skguidenzcittyquizLocked, setSkguidenzcittyquizLocked] =
    useState(false);
  const [skguidenzcittyquizTime, setSkguidenzcittyquizTime] = useState(SECONDS);

  const skguidenzcittyquizCurrent =
    skguidenzcittyquizDeck[skguidenzcittyquizIndex];
  const skguidenzcittyquizLast =
    skguidenzcittyquizIndex >= skguidenzcittyquizDeck.length - 1;

  useFocusEffect(
    useCallback(() => {
      return () => {
        setSkguidenzcittyquizPhase('intro');
        setSkguidenzcittyquizDeck([]);
      };
    }, []),
  );

  useEffect(() => {
    const skguidenzcittyquizHasQ =
      skguidenzcittyquizDeck[skguidenzcittyquizIndex] !== undefined;
    if (
      skguidenzcittyquizPhase !== 'quiz' ||
      skguidenzcittyquizLocked ||
      !skguidenzcittyquizHasQ
    ) {
      return;
    }
    const skguidenzcittyquizTick = setInterval(() => {
      setSkguidenzcittyquizTime(prev => {
        if (prev <= 1) {
          setSkguidenzcittyquizLocked(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(skguidenzcittyquizTick);
  }, [
    skguidenzcittyquizPhase,
    skguidenzcittyquizLocked,
    skguidenzcittyquizIndex,
    skguidenzcittyquizDeck,
  ]);

  useEffect(() => {
    if (skguidenzcittyquizPhase !== 'quiz') {
      return;
    }
    setSkguidenzcittyquizTime(SECONDS);
    setSkguidenzcittyquizLocked(false);
  }, [skguidenzcittyquizPhase, skguidenzcittyquizIndex]);

  const skguidenzcittyquizStart = useCallback(() => {
    const skguidenzcittyquizRound = skguidenzcittyQuizPickRound(
      undefined,
      QUIZ_LEN,
    );
    setSkguidenzcittyquizDeck(skguidenzcittyquizRound);
    setSkguidenzcittyquizIndex(0);
    setSkguidenzcittyquizAnswers(Array(QUIZ_LEN).fill(null));
    setSkguidenzcittyquizPhase('quiz');
  }, []);

  const skguidenzcittyquizExit = useCallback(() => {
    setSkguidenzcittyquizPhase('intro');
    setSkguidenzcittyquizDeck([]);
  }, []);

  const skguidenzcittyquizPick = useCallback(
    (optionIdx: number) => {
      if (skguidenzcittyquizLocked || skguidenzcittyquizPhase !== 'quiz') {
        return;
      }
      setSkguidenzcittyquizAnswers(prev => {
        const skguidenzcittyquizNext = [...prev];
        skguidenzcittyquizNext[skguidenzcittyquizIndex] = optionIdx;
        return skguidenzcittyquizNext;
      });
      setSkguidenzcittyquizLocked(true);
    },
    [
      skguidenzcittyquizLocked,
      skguidenzcittyquizPhase,
      skguidenzcittyquizIndex,
    ],
  );

  const skguidenzcittyquizNext = useCallback(() => {
    if (!skguidenzcittyquizLocked) {
      return;
    }
    if (skguidenzcittyquizLast) {
      setSkguidenzcittyquizPhase('results');
      return;
    }
    setSkguidenzcittyquizIndex(i => i + 1);
  }, [skguidenzcittyquizLocked, skguidenzcittyquizLast]);

  const skguidenzcittyquizScore = useMemo(() => {
    let skguidenzcittyquizN = 0;
    skguidenzcittyquizDeck.forEach((q, i) => {
      if (skguidenzcittyquizAnswers[i] === q.correctIndex) {
        skguidenzcittyquizN += 1;
      }
    });
    return skguidenzcittyquizN;
  }, [skguidenzcittyquizDeck, skguidenzcittyquizAnswers]);

  const skguidenzcittyquizPct = useMemo(
    () =>
      skguidenzcittyquizDeck.length === 0
        ? 0
        : Math.round(
            (skguidenzcittyquizScore / skguidenzcittyquizDeck.length) * 100,
          ),
    [skguidenzcittyquizScore, skguidenzcittyquizDeck.length],
  );

  const skguidenzcittyquizShare = useCallback(async () => {
    const skguidenzcittyquizLines = skguidenzcittyquizDeck
      .map((q, i) => {
        const skguidenzcittyquizOk =
          skguidenzcittyquizAnswers[i] === q.correctIndex;
        return `${i + 1}. ${skguidenzcittyquizOk ? '✓' : '✗'} ${q.prompt}`;
      })
      .join('\n');
    await Share.share({
      message: `Quiz Results: ${skguidenzcittyquizScore}/${skguidenzcittyquizDeck.length} (${skguidenzcittyquizPct}%)\n\n${skguidenzcittyquizLines}`,
    });
  }, [
    skguidenzcittyquizDeck,
    skguidenzcittyquizAnswers,
    skguidenzcittyquizScore,
    skguidenzcittyquizPct,
  ]);

  const skguidenzcittyquizResultsTitle = useMemo(() => {
    if (skguidenzcittyquizPct >= 80) {
      return 'Well Done!';
    }
    if (skguidenzcittyquizPct >= 60) {
      return 'Nice work!';
    }
    if (skguidenzcittyquizPct >= 40) {
      return 'Good effort!';
    }
    return 'Keep learning!';
  }, [skguidenzcittyquizPct]);

  const skguidenzcittyquizResultsSub = useMemo(() => {
    if (skguidenzcittyquizPct >= 80) {
      return 'A solid knowledge of New Zealand.';
    }
    if (skguidenzcittyquizPct >= 60) {
      return 'You know Aotearoa quite well.';
    }
    return 'Explore the app and try again anytime.';
  }, [skguidenzcittyquizPct]);

  if (skguidenzcittyquizPhase === 'intro') {
    return (
      <Skguidenzcittylaytt>
        <View
          style={[
            styles.skguidenzcittyquizIntroScroll,
            {
              paddingTop: skguidenzcittyquizInsets.top + 16,
              paddingBottom: skguidenzcittyquizInsets.bottom + 100,
            },
          ]}>
          <LinearGradient
            colors={['#111111', '#1A1100', BG]}
            style={styles.skguidenzcittyquizIntroHero}>
            <View style={styles.skguidenzcittyquizIntroIconOuter}>
              <View style={styles.skguidenzcittyquizIntroIconInner}>
                <Text style={styles.skguidenzcittyquizIntroIconMark}>?</Text>
              </View>
            </View>
            <Text style={styles.skguidenzcittyquizIntroTitle}>
              NZ Knowledge
            </Text>
            <Text style={styles.skguidenzcittyquizIntroSub}>
              QUIZ CHALLENGE
            </Text>
          </LinearGradient>

          <View style={{paddingHorizontal: 20}}>
            <Text style={styles.skguidenzcittyquizIntroBlurb}>
              Test your knowledge of Aotearoa New Zealand. 5 questions, each
              with a time limit.
            </Text>

            <View style={styles.skguidenzcittyquizIntroCards}>
              <View style={styles.skguidenzcittyquizInfoCard}>
                <View
                  style={{
                    width: 43,
                    height: 43,
                    backgroundColor: '#B38D2F1A',
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#B38D2F33',
                  }}>
                  <Text style={styles.skguidenzcittyquizInfoIcon}>❓</Text>
                </View>
                <View style={styles.skguidenzcittyquizInfoText}>
                  <Text style={styles.skguidenzcittyquizInfoTitle}>
                    5 Questions
                  </Text>
                  <Text style={styles.skguidenzcittyquizInfoDesc}>
                    Covering nature, Māori culture, and adventure
                  </Text>
                </View>
              </View>
              <View style={styles.skguidenzcittyquizInfoCard}>
                <View
                  style={{
                    width: 43,
                    height: 43,
                    backgroundColor: '#B38D2F1A',
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#B38D2F33',
                  }}>
                  <Text style={styles.skguidenzcittyquizInfoIcon}>⏱️</Text>
                </View>
                <View style={styles.skguidenzcittyquizInfoText}>
                  <Text style={styles.skguidenzcittyquizInfoTitle}>
                    15 Seconds Each
                  </Text>
                  <Text style={styles.skguidenzcittyquizInfoDesc}>
                    Answer before the timer runs out
                  </Text>
                </View>
              </View>
              <View style={styles.skguidenzcittyquizInfoCard}>
                <View
                  style={{
                    width: 43,
                    height: 43,
                    backgroundColor: '#B38D2F1A',
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#B38D2F33',
                  }}>
                  <Text style={styles.skguidenzcittyquizInfoIcon}>✅</Text>
                </View>
                <View style={styles.skguidenzcittyquizInfoText}>
                  <Text style={styles.skguidenzcittyquizInfoTitle}>
                    4 Options
                  </Text>
                  <Text style={styles.skguidenzcittyquizInfoDesc}>
                    Only one answer is correct per question
                  </Text>
                </View>
              </View>
            </View>

            <Pressable onPress={skguidenzcittyquizStart}>
              <LinearGradient
                colors={['#B38D2F', '#8B6914']}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
                style={[styles.skguidenzcittyquizPrimaryBtn]}>
                <Text style={styles.skguidenzcittyquizPrimaryBtnText}>
                  Start Quiz →
                </Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>
      </Skguidenzcittylaytt>
    );
  }

  if (skguidenzcittyquizPhase === 'results') {
    return (
      <Skguidenzcittylaytt>
        <View
          style={[
            styles.skguidenzcittyquizResultsScroll,
            {
              paddingTop: skguidenzcittyquizInsets.top + 12,
              paddingBottom: skguidenzcittyquizInsets.bottom + 100,
            },
          ]}>
          <LinearGradient
            colors={['#111111', '#1A1100', BG]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.skguidenzcittyquizScoreBlock}>
            <View style={{padding: 20, alignItems: 'center'}}>
              <View style={styles.skguidenzcittyquizScoreRing}>
                <Text style={styles.skguidenzcittyquizScoreBig}>
                  {skguidenzcittyquizScore}/{skguidenzcittyquizDeck.length}
                </Text>
                <Text style={styles.skguidenzcittyquizScorePct}>
                  {skguidenzcittyquizPct}%
                </Text>

                <Image
                  source={require('../../assets/i/skguidenzcittrng.png')}
                  style={{
                    position: 'absolute',
                    top: 0,
                  }}
                />
              </View>
              <Text style={styles.skguidenzcittyquizStar}>⭐</Text>
              <Text style={styles.skguidenzcittyquizResultsHead}>
                {skguidenzcittyquizResultsTitle}
              </Text>
              <Text style={styles.skguidenzcittyquizResultsSub}>
                {skguidenzcittyquizResultsSub}
              </Text>
            </View>
          </LinearGradient>

          <View style={{paddingHorizontal: 20}}>
            <Text style={styles.skguidenzcittyquizReviewKicker}>REVIEW</Text>
            {skguidenzcittyquizDeck.map((q, i) => {
              const skguidenzcittyquizOk =
                skguidenzcittyquizAnswers[i] === q.correctIndex;
              return (
                <View
                  key={q.id}
                  style={[
                    styles.skguidenzcittyquizReviewCard,
                    skguidenzcittyquizOk
                      ? styles.skguidenzcittyquizReviewOk
                      : styles.skguidenzcittyquizReviewBad,
                  ]}>
                  <View style={styles.skguidenzcittyquizReviewTop}>
                    <View
                      style={{
                        width: 26,
                        height: 26,
                        backgroundColor: skguidenzcittyquizOk
                          ? '#48BB7826'
                          : '#E840401F',
                        borderRadius: 7,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: skguidenzcittyquizOk ? '#48BB78' : '#E84040',
                          fontSize: 12,
                          fontWeight: '700',
                        }}>
                        {skguidenzcittyquizOk ? '✓' : '✕'}
                      </Text>
                    </View>
                    <Text style={styles.skguidenzcittyquizReviewQ}>
                      {q.prompt}
                    </Text>
                  </View>
                  <View style={styles.skguidenzcittyquizReviewDivider} />
                  {skguidenzcittyquizOk ? (
                    <Text style={styles.skguidenzcittyquizReviewCorrect}>
                      Correct: {q.options[q.correctIndex]}
                    </Text>
                  ) : (
                    <>
                      <Text style={styles.skguidenzcittyquizReviewWrong}>
                        You answered:{' '}
                        {skguidenzcittyquizAnswers[i] === null
                          ? '— (time up)'
                          : q.options[skguidenzcittyquizAnswers[i]!]}
                      </Text>
                      <Text style={styles.skguidenzcittyquizReviewCorrectLine}>
                        Correct: {q.options[q.correctIndex]}
                      </Text>
                    </>
                  )}
                </View>
              );
            })}

            <View style={styles.skguidenzcittyquizResultsActions}>
              <Pressable onPress={skguidenzcittyquizShare} style={{flex: 1}}>
                <LinearGradient
                  colors={['#B38D2F', '#8B6914']}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                  style={[styles.skguidenzcittyquizShareBtn]}>
                  <Text style={styles.skguidenzcittyquizShareBtnText}>
                    Share
                  </Text>
                </LinearGradient>
              </Pressable>
              <Pressable
                onPress={() => {
                  setSkguidenzcittyquizPhase('intro');
                  setSkguidenzcittyquizDeck([]);
                }}
                style={({pressed}) => [
                  styles.skguidenzcittyquizBackBtn,
                  pressed && styles.skguidenzcittyquizPressed,
                ]}>
                <Text style={styles.skguidenzcittyquizBackBtnText}>Back</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Skguidenzcittylaytt>
    );
  }

  if (!skguidenzcittyquizCurrent) {
    return null;
  }

  const skguidenzcittyquizProgress =
    (skguidenzcittyquizIndex + 1) / skguidenzcittyquizDeck.length;
  const skguidenzcittyquizTimeFrac = skguidenzcittyquizTime / SECONDS;
  const skguidenzcittyquizChosen =
    skguidenzcittyquizAnswers[skguidenzcittyquizIndex];
  const skguidenzcittyquizTimerWarn = skguidenzcittyquizTime <= 5;

  return (
    <Skguidenzcittylaytt>
      <View
        style={[
          styles.skguidenzcittyquizRoot,
          {paddingTop: skguidenzcittyquizInsets.top + 8},
        ]}>
        <View style={styles.skguidenzcittyquizTopRow}>
          <Pressable
            onPress={skguidenzcittyquizExit}
            style={({pressed}) => [
              styles.skguidenzcittyquizExit,
              pressed && styles.skguidenzcittyquizPressed,
            ]}>
            <Image
              source={require('../../assets/i/skguidenzcittytaoback.png')}
              style={styles.skguidenzcittyquizExitChevron}
              resizeMode="contain"
            />
            <Text style={styles.skguidenzcittyquizExitText}>Exit</Text>
          </Pressable>
          <Text style={styles.skguidenzcittyquizProgressNum}>
            {skguidenzcittyquizIndex + 1}/{skguidenzcittyquizDeck.length}
          </Text>
        </View>

        <View style={styles.skguidenzcittyquizProgTrack}>
          <View
            style={[
              styles.skguidenzcittyquizProgFill,
              {width: `${skguidenzcittyquizProgress * 100}%`},
            ]}
          />
        </View>

        <View style={styles.skguidenzcittyquizTimerHeader}>
          <Text style={styles.skguidenzcittyquizTimerLabel}>
            TIME REMAINING
          </Text>
          <Text
            style={[
              styles.skguidenzcittyquizTimerVal,
              skguidenzcittyquizTimerWarn && styles.skguidenzcittyquizTimerWarn,
            ]}>
            {skguidenzcittyquizTime}s
          </Text>
        </View>
        <View style={styles.skguidenzcittyquizTimerTrack}>
          <View
            style={[
              styles.skguidenzcittyquizTimerFill,
              {
                width: `${skguidenzcittyquizTimeFrac * 100}%`,
                backgroundColor: skguidenzcittyquizTimerWarn
                  ? TIMER_WARN
                  : GOLD,
              },
            ]}
          />
        </View>

        <View
          style={[
            styles.skguidenzcittyquizScroll,
            {paddingBottom: skguidenzcittyquizInsets.bottom + 88},
          ]}>
          <View style={styles.skguidenzcittyquizQCard}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                marginBottom: 8,
              }}>
              <LinearGradient
                colors={['#B38D2F', '#8B6914']}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
                style={styles.skguidenzcittyquizQBadge}>
                <Text style={styles.skguidenzcittyquizQNumText}>
                  {skguidenzcittyquizIndex + 1}
                </Text>
              </LinearGradient>
              <Text style={styles.skguidenzcittyquizQLabel}>QUESTION</Text>
            </View>
            <Text style={styles.skguidenzcittyquizQText}>
              {skguidenzcittyquizCurrent.prompt}
            </Text>
          </View>

          {skguidenzcittyquizCurrent.options.map((opt, idx) => {
            const skguidenzcittyquizShow = skguidenzcittyquizLocked;
            const skguidenzcittyquizCorrect =
              idx === skguidenzcittyquizCurrent.correctIndex;
            const skguidenzcittyquizPickedWrong =
              skguidenzcittyquizShow &&
              skguidenzcittyquizChosen === idx &&
              !skguidenzcittyquizCorrect;

            let skguidenzcittyquizOptStyle = styles.skguidenzcittyquizOpt;
            if (skguidenzcittyquizShow) {
              if (skguidenzcittyquizCorrect) {
                skguidenzcittyquizOptStyle = {
                  ...styles.skguidenzcittyquizOpt,
                  ...styles.skguidenzcittyquizOptOk,
                };
              } else if (skguidenzcittyquizPickedWrong) {
                skguidenzcittyquizOptStyle = {
                  ...styles.skguidenzcittyquizOpt,
                  ...styles.skguidenzcittyquizOptBad,
                };
              }
            }

            return (
              <Pressable
                key={`${skguidenzcittyquizCurrent.id}-${idx}`}
                onPress={() => skguidenzcittyquizPick(idx)}
                disabled={skguidenzcittyquizLocked}
                style={({pressed}) => [
                  skguidenzcittyquizOptStyle,
                  pressed &&
                    !skguidenzcittyquizLocked &&
                    styles.skguidenzcittyquizPressed,
                ]}>
                <View
                  style={[
                    styles.skguidenzcittyquizOptGlyph,
                    skguidenzcittyquizShow && skguidenzcittyquizCorrect
                      ? {
                          ...styles.skguidenzcittyquizOptGlyph,
                          backgroundColor: '#48BB7826',
                          borderColor: '#48BB7833',
                        }
                      : skguidenzcittyquizShow && skguidenzcittyquizPickedWrong
                      ? {
                          ...styles.skguidenzcittyquizOptGlyph,
                          backgroundColor: '#E8404033',
                          borderColor: '#E8404033',
                        }
                      : {
                          ...styles.skguidenzcittyquizOptGlyph,
                          backgroundColor: '#FFFFFF14',
                        },
                  ]}>
                  {skguidenzcittyquizShow && skguidenzcittyquizCorrect ? (
                    <Text style={styles.skguidenzcittyquizOptCheck}>✓</Text>
                  ) : skguidenzcittyquizShow &&
                    skguidenzcittyquizPickedWrong ? (
                    <Text style={styles.skguidenzcittyquizOptX}>✕</Text>
                  ) : (
                    <Text style={styles.skguidenzcittyquizOptLetter}>
                      {LETTERS[idx]}
                    </Text>
                  )}
                </View>
                <Text style={styles.skguidenzcittyquizOptText}>{opt}</Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={skguidenzcittyquizNext}
          disabled={!skguidenzcittyquizLocked}>
          <LinearGradient
            colors={['#B38D2F', '#8B6914']}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={[
              styles.skguidenzcittyquizNextBtn,

              !skguidenzcittyquizLocked &&
                styles.skguidenzcittyquizNextDisabled,
            ]}>
            <Text style={styles.skguidenzcittyquizNextText}>
              {skguidenzcittyquizLast ? 'See Results →' : 'Next Question →'}
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </Skguidenzcittylaytt>
  );
};

const styles = StyleSheet.create({
  skguidenzcittyquizIntroScroll: {},
  skguidenzcittyquizIntroHero: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 22,

    overflow: 'hidden',

    minHeight: 320,
    justifyContent: 'center',
  },

  skguidenzcittyquizIntroIconOuter: {
    width: 88,
    height: 88,
    borderRadius: 26,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
    shadowColor: GOLD,

    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.45,
    shadowRadius: 16,

    elevation: 10,
  },
  skguidenzcittyquizIntroIconInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skguidenzcittyquizIntroIconMark: {
    fontSize: 32,
    fontWeight: '800',
    color: GOLD,
  },
  skguidenzcittyquizIntroTitle: {
    color: WHITE,
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },
  skguidenzcittyquizIntroSub: {
    marginTop: 8,
    color: GOLD,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 2,
    textAlign: 'center',
  },
  skguidenzcittyquizIntroBlurb: {
    color: '#FFFFFF99',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 22,
  },
  skguidenzcittyquizIntroCards: {
    gap: 12,
    marginBottom: 28,
  },
  skguidenzcittyquizInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 14,
    padding: 16,
    borderRadius: 16,

    borderWidth: 1,

    borderColor: '#FFFFFF14',
    backgroundColor: '#FFFFFF08',
  },
  skguidenzcittyquizInfoIcon: {
    fontSize: 18,
  },
  skguidenzcittyquizInfoText: {
    flex: 1,
  },
  skguidenzcittyquizInfoTitle: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '700',
  },
  skguidenzcittyquizInfoDesc: {
    marginTop: 4,
    color: '#FFFFFF99',
    fontSize: 13,
    lineHeight: 18,
  },
  skguidenzcittyquizPrimaryBtn: {
    borderRadius: 16,
    height: 55,

    alignItems: 'center',

    justifyContent: 'center',
  },
  skguidenzcittyquizPrimaryBtnText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: '800',
  },
  skguidenzcittyquizRoot: {
    flex: 1,
    backgroundColor: BG,
    paddingHorizontal: 20,
  },
  skguidenzcittyquizTopRow: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
    marginBottom: 10,
  },
  skguidenzcittyquizExit: {
    flexDirection: 'row',

    alignItems: 'center',
    gap: 6,
  },
  skguidenzcittyquizExitChevron: {
    width: 14,
    height: 14,
    tintColor: GOLD,
  },
  skguidenzcittyquizExitText: {
    color: GOLD,
    fontSize: 15,
    fontWeight: '700',
  },
  skguidenzcittyquizProgressNum: {
    color: GREY,
    fontSize: 14,
    fontWeight: '600',
  },
  skguidenzcittyquizProgTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF14',
    overflow: 'hidden',
    marginBottom: 18,
    marginTop: 5,
  },
  skguidenzcittyquizProgFill: {
    height: '100%',

    borderRadius: 2,
    backgroundColor: GOLD,
  },
  skguidenzcittyquizTimerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  skguidenzcittyquizTimerLabel: {
    color: '#FFFFFF66',
    fontSize: 12,

    fontWeight: '500',
    letterSpacing: 1,

    bottom: 4,
  },
  skguidenzcittyquizTimerVal: {
    color: GOLD,
    fontSize: 20,
    fontWeight: '700',
  },
  skguidenzcittyquizTimerWarn: {
    color: TIMER_WARN,
  },
  skguidenzcittyquizTimerTrack: {
    height: 5,
    borderRadius: 3,

    backgroundColor: '#FFFFFF14',
    overflow: 'hidden',

    marginBottom: 18,
  },
  skguidenzcittyquizTimerFill: {
    height: '100%',
    borderRadius: 3,
  },
  skguidenzcittyquizScroll: {
    paddingBottom: 12,
  },
  skguidenzcittyquizQCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: `#B38D2F33`,
    backgroundColor: '#141414',
    padding: 18,
    marginBottom: 18,
  },
  skguidenzcittyquizQBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skguidenzcittyquizQNum: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skguidenzcittyquizQNumText: {
    color: '#0A0A0A',
    fontSize: 14,

    fontWeight: '800',
  },
  skguidenzcittyquizQLabel: {
    color: GOLD,
    fontSize: 11,

    fontWeight: '800',
    letterSpacing: 1.2,
  },
  skguidenzcittyquizQText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  skguidenzcittyquizOpt: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 12,
    paddingVertical: 14,

    paddingHorizontal: 14,
    borderRadius: 14,

    borderWidth: 1,
    borderColor: '#FFFFFF22',
    backgroundColor: '#FFFFFF0A',
    marginBottom: 10,
  },
  skguidenzcittyquizOptOk: {
    borderColor: GREEN_OK,
    backgroundColor: '#48BB7826',
  },
  skguidenzcittyquizOptBad: {
    borderColor: RED_BAD,
    backgroundColor: '#E840401F',
  },
  skguidenzcittyquizOptGlyph: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFFFF14',
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#FFFFFF1F',
  },
  skguidenzcittyquizOptLetter: {
    color: '#FFFFFFAA',
    fontSize: 15,
    fontWeight: '500',
  },
  skguidenzcittyquizOptCheck: {
    color: '#48BB78',
    fontSize: 16,
    fontWeight: '600',
  },
  skguidenzcittyquizOptX: {
    color: '#E84040',
    fontSize: 15,
    fontWeight: '800',
  },
  skguidenzcittyquizOptText: {
    flex: 1,
    color: WHITE,
    fontSize: 15,
    fontWeight: '600',

    lineHeight: 20,
  },
  skguidenzcittyquizNextBtn: {
    borderRadius: 16,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  skguidenzcittyquizNextDisabled: {
    opacity: 0.45,
  },
  skguidenzcittyquizNextText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '800',
  },
  skguidenzcittyquizResultsScroll: {},
  skguidenzcittyquizScoreBlock: {
    alignItems: 'center',
    marginBottom: 22,
    width: '100%',
  },
  skguidenzcittyquizScoreRing: {
    width: 132,
    height: 132,

    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  skguidenzcittyquizScoreBig: {
    color: WHITE,
    fontSize: 28,
    fontWeight: '700',
  },
  skguidenzcittyquizScorePct: {
    color: GOLD,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 2,
  },
  skguidenzcittyquizScoreDots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  skguidenzcittyquizScoreDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  skguidenzcittyquizScoreDotOn: {
    backgroundColor: GOLD,
  },
  skguidenzcittyquizScoreDotOff: {
    backgroundColor: '#FFFFFF22',
  },
  skguidenzcittyquizStar: {
    fontSize: 28,
    color: GOLD,
    marginBottom: 12,
    marginTop: 8,
  },
  skguidenzcittyquizResultsHead: {
    color: WHITE,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  skguidenzcittyquizResultsSub: {
    marginTop: 8,
    color: GREY,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  skguidenzcittyquizReviewKicker: {
    color: GREY,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
  },
  skguidenzcittyquizReviewCard: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  skguidenzcittyquizReviewOk: {
    borderColor: GREEN_OK,
    backgroundColor: '#2E7D4A18',
  },
  skguidenzcittyquizReviewBad: {
    borderColor: RED_BAD,
    backgroundColor: '#C6282818',
  },
  skguidenzcittyquizReviewTop: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  skguidenzcittyquizReviewMark: {
    fontSize: 16,
    fontWeight: '800',
  },
  skguidenzcittyquizReviewQ: {
    flex: 1,
    color: WHITE,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  skguidenzcittyquizReviewDivider: {
    height: 1,
    backgroundColor: '#FFFFFF18',
    marginVertical: 8,
  },
  skguidenzcittyquizReviewCorrect: {
    color: GREEN_OK,
    fontSize: 12,
    fontWeight: '600',
  },
  skguidenzcittyquizReviewWrong: {
    color: RED_BAD,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  skguidenzcittyquizReviewCorrectLine: {
    color: GREEN_OK,
    fontSize: 13,
    fontWeight: '600',
  },
  skguidenzcittyquizResultsActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  skguidenzcittyquizShareBtn: {
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  skguidenzcittyquizShareBtnText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '800',
  },
  skguidenzcittyquizBackBtn: {
    flex: 1,
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF33',
    backgroundColor: '#FFFFFF0A',
  },
  skguidenzcittyquizBackBtnText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '800',
  },
  skguidenzcittyquizPressed: {
    opacity: 0.88,
  },
});

export default Skguidenzcittyquiz;
