import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Image, Pressable, Share, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import GoldGradientButton from '../components/GoldGradientButton';
import ScreenLayout from '../components/ScreenLayout';
import {pickQuizRound, type QuizQuestion} from '../data/quizData';

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

type QuizPhase = 'intro' | 'quiz' | 'results';

const QuizScreen = () => {
  const quizInsets = useSafeAreaInsets();
  const [quizPhase, setQuizPhase] = useState<QuizPhase>('intro');
  const [quizDeck, setQuizDeck] = useState<QuizQuestion[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<(number | null)[]>(() =>
    Array(QUIZ_LEN).fill(null),
  );
  const [quizLocked, setQuizLocked] = useState(false);
  const [quizTime, setQuizTime] = useState(SECONDS);

  const quizCurrent = quizDeck[quizIndex];
  const quizLast = quizIndex >= quizDeck.length - 1;

  useFocusEffect(
    useCallback(() => {
      return () => {
        setQuizPhase('intro');
        setQuizDeck([]);
      };
    }, []),
  );

  useEffect(() => {
    const quizHasQ = quizDeck[quizIndex] !== undefined;
    if (quizPhase !== 'quiz' || quizLocked || !quizHasQ) {
      return;
    }
    const quizTick = setInterval(() => {
      setQuizTime(prev => {
        if (prev <= 1) {
          setQuizLocked(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(quizTick);
  }, [quizPhase, quizLocked, quizIndex, quizDeck]);

  useEffect(() => {
    if (quizPhase !== 'quiz') {
      return;
    }
    setQuizTime(SECONDS);
    setQuizLocked(false);
  }, [quizPhase, quizIndex]);

  const quizStart = useCallback(() => {
    const quizRound = pickQuizRound(undefined, QUIZ_LEN);
    setQuizDeck(quizRound);
    setQuizIndex(0);
    setQuizAnswers(Array(QUIZ_LEN).fill(null));
    setQuizPhase('quiz');
  }, []);

  const quizExit = useCallback(() => {
    setQuizPhase('intro');
    setQuizDeck([]);
  }, []);

  const quizPick = useCallback(
    (optionIdx: number) => {
      if (quizLocked || quizPhase !== 'quiz') {
        return;
      }
      setQuizAnswers(prev => {
        const quizNext = [...prev];
        quizNext[quizIndex] = optionIdx;
        return quizNext;
      });
      setQuizLocked(true);
    },
    [quizLocked, quizPhase, quizIndex],
  );

  const quizNext = useCallback(() => {
    if (!quizLocked) {
      return;
    }
    if (quizLast) {
      setQuizPhase('results');
      return;
    }
    setQuizIndex(i => i + 1);
  }, [quizLocked, quizLast]);

  const quizScore = useMemo(() => {
    let quizN = 0;
    quizDeck.forEach((q, i) => {
      if (quizAnswers[i] === q.correctIndex) {
        quizN += 1;
      }
    });
    return quizN;
  }, [quizDeck, quizAnswers]);

  const quizPct = useMemo(
    () =>
      quizDeck.length === 0
        ? 0
        : Math.round((quizScore / quizDeck.length) * 100),
    [quizScore, quizDeck.length],
  );

  const quizShare = useCallback(async () => {
    const quizLines = quizDeck
      .map((q, i) => {
        const quizOk = quizAnswers[i] === q.correctIndex;
        return `${i + 1}. ${quizOk ? '✓' : '✗'} ${q.prompt}`;
      })
      .join('\n');
    await Share.share({
      message: `Quiz Results: ${quizScore}/${quizDeck.length} (${quizPct}%)\n\n${quizLines}`,
    });
  }, [quizDeck, quizAnswers, quizScore, quizPct]);

  const quizResultsTitle = useMemo(() => {
    if (quizPct >= 80) {
      return 'Well Done!';
    }
    if (quizPct >= 60) {
      return 'Nice work!';
    }
    if (quizPct >= 40) {
      return 'Good effort!';
    }
    return 'Keep learning!';
  }, [quizPct]);

  const quizResultsSub = useMemo(() => {
    if (quizPct >= 80) {
      return 'A solid knowledge of New Zealand.';
    }
    if (quizPct >= 60) {
      return 'You know Aotearoa quite well.';
    }
    return 'Explore the app and try again anytime.';
  }, [quizPct]);

  if (quizPhase === 'intro') {
    return (
      <ScreenLayout>
        <View
          style={[
            styles.quizIntroScroll,
            {
              paddingTop: quizInsets.top + 16,
              paddingBottom: quizInsets.bottom + 100,
            },
          ]}>
          <LinearGradient
            colors={['#111111', '#1A1100', BG]}
            style={styles.quizIntroHero}>
            <View style={styles.quizIntroIconOuter}>
              <View style={styles.quizIntroIconInner}>
                <Text style={styles.quizIntroIconMark}>?</Text>
              </View>
            </View>
            <Text style={styles.quizIntroTitle}>NZ Knowledge</Text>
            <Text style={styles.quizIntroSub}>QUIZ CHALLENGE</Text>
          </LinearGradient>

          <View style={{paddingHorizontal: 20}}>
            <Text style={styles.quizIntroBlurb}>
              Test your knowledge of Aotearoa New Zealand. 5 questions, each
              with a time limit.
            </Text>

            <View style={styles.quizIntroCards}>
              <View style={styles.quizInfoCard}>
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
                  <Text style={styles.quizInfoIcon}>❓</Text>
                </View>
                <View style={styles.quizInfoText}>
                  <Text style={styles.quizInfoTitle}>5 Questions</Text>
                  <Text style={styles.quizInfoDesc}>
                    Covering nature, Māori culture, and adventure
                  </Text>
                </View>
              </View>
              <View style={styles.quizInfoCard}>
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
                  <Text style={styles.quizInfoIcon}>⏱️</Text>
                </View>
                <View style={styles.quizInfoText}>
                  <Text style={styles.quizInfoTitle}>15 Seconds Each</Text>
                  <Text style={styles.quizInfoDesc}>
                    Answer before the timer runs out
                  </Text>
                </View>
              </View>
              <View style={styles.quizInfoCard}>
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
                  <Text style={styles.quizInfoIcon}>✅</Text>
                </View>
                <View style={styles.quizInfoText}>
                  <Text style={styles.quizInfoTitle}>4 Options</Text>
                  <Text style={styles.quizInfoDesc}>
                    Only one answer is correct per question
                  </Text>
                </View>
              </View>
            </View>

            <GoldGradientButton
              onPress={quizStart}
              gradientStyle={styles.quizPrimaryBtn}>
              <Text style={styles.quizPrimaryBtnText}>Start Quiz →</Text>
            </GoldGradientButton>
          </View>
        </View>
      </ScreenLayout>
    );
  }

  if (quizPhase === 'results') {
    return (
      <ScreenLayout>
        <View
          style={[
            styles.quizResultsScroll,
            {
              paddingTop: quizInsets.top + 12,
              paddingBottom: quizInsets.bottom + 100,
            },
          ]}>
          <LinearGradient
            colors={['#111111', '#1A1100', BG]}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={styles.quizScoreBlock}>
            <View style={{padding: 20, alignItems: 'center'}}>
              <View style={styles.quizScoreRing}>
                <Text style={styles.quizScoreBig}>
                  {quizScore}/{quizDeck.length}
                </Text>
                <Text style={styles.quizScorePct}>{quizPct}%</Text>

                <Image
                  source={require('../../assets/i/skguidenzcittrng.png')}
                  style={{
                    position: 'absolute',
                    top: 0,
                  }}
                />
              </View>
              <Text style={styles.quizStar}>⭐</Text>
              <Text style={styles.quizResultsHead}>{quizResultsTitle}</Text>
              <Text style={styles.quizResultsSub}>{quizResultsSub}</Text>
            </View>
          </LinearGradient>

          <View style={{paddingHorizontal: 20}}>
            <Text style={styles.quizReviewKicker}>REVIEW</Text>
            {quizDeck.map((q, i) => {
              const quizOk = quizAnswers[i] === q.correctIndex;
              return (
                <View
                  key={q.id}
                  style={[
                    styles.quizReviewCard,
                    quizOk ? styles.quizReviewOk : styles.quizReviewBad,
                  ]}>
                  <View style={styles.quizReviewTop}>
                    <View
                      style={{
                        width: 26,
                        height: 26,
                        backgroundColor: quizOk ? '#48BB7826' : '#E840401F',
                        borderRadius: 7,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          color: quizOk ? '#48BB78' : '#E84040',
                          fontSize: 12,
                          fontWeight: '700',
                        }}>
                        {quizOk ? '✓' : '✕'}
                      </Text>
                    </View>
                    <Text style={styles.quizReviewQ}>{q.prompt}</Text>
                  </View>
                  <View style={styles.quizReviewDivider} />
                  {quizOk ? (
                    <Text style={styles.quizReviewCorrect}>
                      Correct: {q.options[q.correctIndex]}
                    </Text>
                  ) : (
                    <>
                      <Text style={styles.quizReviewWrong}>
                        You answered:{' '}
                        {quizAnswers[i] === null
                          ? '— (time up)'
                          : q.options[quizAnswers[i]!]}
                      </Text>
                      <Text style={styles.quizReviewCorrectLine}>
                        Correct: {q.options[q.correctIndex]}
                      </Text>
                    </>
                  )}
                </View>
              );
            })}

            <View style={styles.quizResultsActions}>
              <Pressable onPress={quizShare} style={{flex: 1}}>
                <LinearGradient
                  colors={['#B38D2F', '#8B6914']}
                  start={{x: 0.5, y: 0}}
                  end={{x: 0.5, y: 1}}
                  style={[styles.quizShareBtn]}>
                  <Text style={styles.quizShareBtnText}>Share</Text>
                </LinearGradient>
              </Pressable>
              <Pressable
                onPress={() => {
                  setQuizPhase('intro');
                  setQuizDeck([]);
                }}
                style={({pressed}) => [
                  styles.quizBackBtn,
                  pressed && styles.quizPressed,
                ]}>
                <Text style={styles.quizBackBtnText}>Back</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScreenLayout>
    );
  }

  if (!quizCurrent) {
    return null;
  }

  const quizProgress = (quizIndex + 1) / quizDeck.length;
  const quizTimeFrac = quizTime / SECONDS;
  const quizChosen = quizAnswers[quizIndex];
  const quizTimerWarn = quizTime <= 5;

  return (
    <ScreenLayout>
      <View style={[styles.quizRoot, {paddingTop: quizInsets.top + 8}]}>
        <View style={styles.quizTopRow}>
          <Pressable
            onPress={quizExit}
            style={({pressed}) => [
              styles.quizExit,
              pressed && styles.quizPressed,
            ]}>
            <Image
              source={require('../../assets/i/skguidenzcittytaoback.png')}
              style={styles.quizExitChevron}
              resizeMode="contain"
            />
            <Text style={styles.quizExitText}>Exit</Text>
          </Pressable>
          <Text style={styles.quizProgressNum}>
            {quizIndex + 1}/{quizDeck.length}
          </Text>
        </View>

        <View style={styles.quizProgTrack}>
          <View
            style={[styles.quizProgFill, {width: `${quizProgress * 100}%`}]}
          />
        </View>

        <View style={styles.quizTimerHeader}>
          <Text style={styles.quizTimerLabel}>TIME REMAINING</Text>
          <Text
            style={[
              styles.quizTimerVal,
              quizTimerWarn && styles.quizTimerWarn,
            ]}>
            {quizTime}s
          </Text>
        </View>
        <View style={styles.quizTimerTrack}>
          <View
            style={[
              styles.quizTimerFill,
              {
                width: `${quizTimeFrac * 100}%`,
                backgroundColor: quizTimerWarn ? TIMER_WARN : GOLD,
              },
            ]}
          />
        </View>

        <View
          style={[styles.quizScroll, {paddingBottom: quizInsets.bottom + 88}]}>
          <View style={styles.quizQCard}>
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
                style={styles.quizQBadge}>
                <Text style={styles.quizQNumText}>{quizIndex + 1}</Text>
              </LinearGradient>
              <Text style={styles.quizQLabel}>QUESTION</Text>
            </View>
            <Text style={styles.quizQText}>{quizCurrent.prompt}</Text>
          </View>

          {quizCurrent.options.map((opt, idx) => {
            const quizShow = quizLocked;
            const quizCorrect = idx === quizCurrent.correctIndex;
            const quizPickedWrong =
              quizShow && quizChosen === idx && !quizCorrect;

            let quizOptStyle = styles.quizOpt;
            if (quizShow) {
              if (quizCorrect) {
                quizOptStyle = {
                  ...styles.quizOpt,
                  ...styles.quizOptOk,
                };
              } else if (quizPickedWrong) {
                quizOptStyle = {
                  ...styles.quizOpt,
                  ...styles.quizOptBad,
                };
              }
            }

            return (
              <Pressable
                key={`${quizCurrent.id}-${idx}`}
                onPress={() => quizPick(idx)}
                disabled={quizLocked}
                style={({pressed}) => [
                  quizOptStyle,
                  pressed && !quizLocked && styles.quizPressed,
                ]}>
                <View
                  style={[
                    styles.quizOptGlyph,
                    quizShow && quizCorrect
                      ? {
                          ...styles.quizOptGlyph,
                          backgroundColor: '#48BB7826',
                          borderColor: '#48BB7833',
                        }
                      : quizShow && quizPickedWrong
                      ? {
                          ...styles.quizOptGlyph,
                          backgroundColor: '#E8404033',
                          borderColor: '#E8404033',
                        }
                      : {
                          ...styles.quizOptGlyph,
                          backgroundColor: '#FFFFFF14',
                        },
                  ]}>
                  {quizShow && quizCorrect ? (
                    <Text style={styles.quizOptCheck}>✓</Text>
                  ) : quizShow && quizPickedWrong ? (
                    <Text style={styles.quizOptX}>✕</Text>
                  ) : (
                    <Text style={styles.quizOptLetter}>{LETTERS[idx]}</Text>
                  )}
                </View>
                <Text style={styles.quizOptText}>{opt}</Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable onPress={quizNext} disabled={!quizLocked}>
          <LinearGradient
            colors={['#B38D2F', '#8B6914']}
            start={{x: 0.5, y: 0}}
            end={{x: 0.5, y: 1}}
            style={[
              styles.quizNextBtn,

              !quizLocked && styles.quizNextDisabled,
            ]}>
            <Text style={styles.quizNextText}>
              {quizLast ? 'See Results →' : 'Next Question →'}
            </Text>
          </LinearGradient>
        </Pressable>
      </View>
    </ScreenLayout>
  );
};

const styles = StyleSheet.create({
  quizIntroScroll: {},
  quizIntroHero: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 22,

    overflow: 'hidden',

    minHeight: 320,
    justifyContent: 'center',
  },

  quizIntroIconOuter: {
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
  quizIntroIconInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizIntroIconMark: {
    fontSize: 32,
    fontWeight: '800',
    color: GOLD,
  },
  quizIntroTitle: {
    color: WHITE,
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },
  quizIntroSub: {
    marginTop: 8,
    color: GOLD,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 2,
    textAlign: 'center',
  },
  quizIntroBlurb: {
    color: '#FFFFFF99',
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 22,
  },
  quizIntroCards: {
    gap: 12,
    marginBottom: 28,
  },
  quizInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',

    gap: 14,
    padding: 16,
    borderRadius: 16,

    borderWidth: 1,

    borderColor: '#FFFFFF14',
    backgroundColor: '#FFFFFF08',
  },
  quizInfoIcon: {
    fontSize: 18,
  },
  quizInfoText: {
    flex: 1,
  },
  quizInfoTitle: {
    color: WHITE,
    fontSize: 15,
    fontWeight: '700',
  },
  quizInfoDesc: {
    marginTop: 4,
    color: '#FFFFFF99',
    fontSize: 13,
    lineHeight: 18,
  },
  quizPrimaryBtn: {
    borderRadius: 16,
    height: 55,

    alignItems: 'center',

    justifyContent: 'center',
  },
  quizPrimaryBtnText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: '800',
  },
  quizRoot: {
    flex: 1,
    paddingHorizontal: 20,
  },
  quizTopRow: {
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'space-between',
    marginBottom: 10,
  },
  quizExit: {
    flexDirection: 'row',

    alignItems: 'center',
    gap: 6,
  },
  quizExitChevron: {
    width: 14,
    height: 14,
    tintColor: GOLD,
  },
  quizExitText: {
    color: GOLD,
    fontSize: 15,
    fontWeight: '700',
  },
  quizProgressNum: {
    color: GREY,
    fontSize: 14,
    fontWeight: '600',
  },
  quizProgTrack: {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#FFFFFF14',
    overflow: 'hidden',
    marginBottom: 18,
    marginTop: 5,
  },
  quizProgFill: {
    height: '100%',

    borderRadius: 2,
    backgroundColor: GOLD,
  },
  quizTimerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  quizTimerLabel: {
    color: '#FFFFFF66',
    fontSize: 12,

    fontWeight: '500',
    letterSpacing: 1,

    bottom: 4,
  },
  quizTimerVal: {
    color: GOLD,
    fontSize: 20,
    fontWeight: '700',
  },
  quizTimerWarn: {
    color: TIMER_WARN,
  },
  quizTimerTrack: {
    height: 5,
    borderRadius: 3,

    backgroundColor: '#FFFFFF14',
    overflow: 'hidden',

    marginBottom: 18,
  },
  quizTimerFill: {
    height: '100%',
    borderRadius: 3,
  },
  quizScroll: {
    paddingBottom: 12,
  },
  quizQCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: `#B38D2F33`,
    backgroundColor: '#141414',
    padding: 18,
    marginBottom: 18,
  },
  quizQBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizQNum: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizQNumText: {
    color: '#0A0A0A',
    fontSize: 14,

    fontWeight: '800',
  },
  quizQLabel: {
    color: GOLD,
    fontSize: 11,

    fontWeight: '800',
    letterSpacing: 1.2,
  },
  quizQText: {
    color: WHITE,
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 24,
  },
  quizOpt: {
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
  quizOptOk: {
    borderColor: GREEN_OK,
    backgroundColor: '#48BB7826',
  },
  quizOptBad: {
    borderColor: RED_BAD,
    backgroundColor: '#E840401F',
  },
  quizOptGlyph: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFFFFF14',
    alignItems: 'center',
    justifyContent: 'center',

    borderWidth: 1,
    borderColor: '#FFFFFF1F',
  },
  quizOptLetter: {
    color: '#FFFFFFAA',
    fontSize: 15,
    fontWeight: '500',
  },
  quizOptCheck: {
    color: '#48BB78',
    fontSize: 16,
    fontWeight: '600',
  },
  quizOptX: {
    color: '#E84040',
    fontSize: 15,
    fontWeight: '800',
  },
  quizOptText: {
    flex: 1,
    color: WHITE,
    fontSize: 15,
    fontWeight: '600',

    lineHeight: 20,
  },
  quizNextBtn: {
    borderRadius: 16,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 100,
  },
  quizNextDisabled: {
    opacity: 0.45,
  },
  quizNextText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '800',
  },
  quizResultsScroll: {},
  quizScoreBlock: {
    alignItems: 'center',
    marginBottom: 22,
    width: '100%',
  },
  quizScoreRing: {
    width: 132,
    height: 132,

    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  quizScoreBig: {
    color: WHITE,
    fontSize: 28,
    fontWeight: '700',
  },
  quizScorePct: {
    color: GOLD,
    fontSize: 14,
    fontWeight: '400',
    marginTop: 2,
  },
  quizScoreDots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  quizScoreDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  quizScoreDotOn: {
    backgroundColor: GOLD,
  },
  quizScoreDotOff: {
    backgroundColor: '#FFFFFF22',
  },
  quizStar: {
    fontSize: 28,
    color: GOLD,
    marginBottom: 12,
    marginTop: 8,
  },
  quizResultsHead: {
    color: WHITE,
    fontSize: 24,
    fontWeight: '800',
    textAlign: 'center',
  },
  quizResultsSub: {
    marginTop: 8,
    color: GREY,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  quizReviewKicker: {
    color: GREY,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 12,
  },
  quizReviewCard: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
  },
  quizReviewOk: {
    borderColor: GREEN_OK,
    backgroundColor: '#2E7D4A18',
  },
  quizReviewBad: {
    borderColor: RED_BAD,
    backgroundColor: '#C6282818',
  },
  quizReviewTop: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'flex-start',
  },
  quizReviewMark: {
    fontSize: 16,
    fontWeight: '800',
  },
  quizReviewQ: {
    flex: 1,
    color: WHITE,
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 20,
  },
  quizReviewDivider: {
    height: 1,
    backgroundColor: '#FFFFFF18',
    marginVertical: 8,
  },
  quizReviewCorrect: {
    color: GREEN_OK,
    fontSize: 12,
    fontWeight: '600',
  },
  quizReviewWrong: {
    color: RED_BAD,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  quizReviewCorrectLine: {
    color: GREEN_OK,
    fontSize: 13,
    fontWeight: '600',
  },
  quizResultsActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  quizShareBtn: {
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizShareBtnText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '800',
  },
  quizBackBtn: {
    flex: 1,
    borderRadius: 14,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF33',
    backgroundColor: '#FFFFFF0A',
  },
  quizBackBtnText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '800',
  },
  quizPressed: {
    opacity: 0.88,
  },
});

export default QuizScreen;
