import type {ImageSourcePropType} from 'react-native';

export type OnboardingStep = {
  badge: string;
  headline: string;
  subHeadline: string;
  body: string;
  background: ImageSourcePropType;
  feature: ImageSourcePropType;
  primaryLabel: string;
  showBack: boolean;
};

export const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    badge: 'WELCOME',
    headline: 'My name is Liam.',
    subHeadline: 'And this is my love letter to New Zealand.',
    body: "I've hiked every major trail, kayaked through quiet fjords, and camped beneath the Southern Cross. This app is everything I've learned.",
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
