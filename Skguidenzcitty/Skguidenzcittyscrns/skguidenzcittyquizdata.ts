export type SkguidenzcittyQuizQuestion = {
  id: string;
  prompt: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
};

export const SKGUIDENZCITTY_QUIZ_POOL: SkguidenzcittyQuizQuestion[] = [
  {
    id: 'q-capital',
    prompt: 'What is the capital city of New Zealand?',
    options: ['Auckland', 'Wellington', 'Christchurch', 'Queenstown'],
    correctIndex: 1,
  },
  {
    id: 'q-bird-symbol',
    prompt: 'Which bird is the national symbol of New Zealand?',
    options: ['Eagle', 'Kiwi', 'Penguin', 'Falcon'],
    correctIndex: 1,
  },
  {
    id: 'q-fjord',
    prompt: 'What is the most famous fjord in New Zealand?',
    options: ['Milford Sound', 'Golden Bay', 'Tasman Gulf', 'Blue Coast'],
    correctIndex: 0,
  },
  {
    id: 'q-adventure-capital',
    prompt: 'Which city is called the adventure capital of New Zealand?',
    options: ['Rotorua', 'Hamilton', 'Queenstown', 'Nelson'],
    correctIndex: 2,
  },
  {
    id: 'q-rotorua',
    prompt: 'What natural activity is Rotorua famous for?',
    options: ['Desert dunes', 'Geothermal springs', 'Ice caves', 'Coral reefs'],
    correctIndex: 1,
  },
  {
    id: 'q-movies',
    prompt: 'Which movie series was filmed in New Zealand?',
    options: ['Harry Potter', 'Star Wars', 'Lord of the Rings', 'Pirates of the Caribbean'],
    correctIndex: 2,
  },
  {
    id: 'q-glaciers-island',
    prompt: 'Which island of New Zealand contains most glaciers?',
    options: ['North Island', 'East Island', 'South Island', 'Central Island'],
    correctIndex: 2,
  },
  {
    id: 'q-tekapo-color',
    prompt: 'What color is Lake Tekapo famous for?',
    options: ['Red', 'Yellow', 'Turquoise', 'Purple'],
    correctIndex: 2,
  },
  {
    id: 'q-glow-caves',
    prompt: 'Which animal is known for glowing inside caves in New Zealand?',
    options: ['Fireflies', 'Glowworms', 'Jellyfish', 'Crabs'],
    correctIndex: 1,
  },
  {
    id: 'q-haka',
    prompt: 'What is the traditional Maori dance called?',
    options: ['Samba', 'Haka', 'Tango', 'Waltz'],
    correctIndex: 1,
  },
  {
    id: 'q-bungy',
    prompt: 'Which extreme activity began commercially in New Zealand?',
    options: ['Surfing', 'Bungy Jumping', 'Snowboarding', 'Rock Climbing'],
    correctIndex: 1,
  },
  {
    id: 'q-ocean',
    prompt: 'What ocean surrounds New Zealand?',
    options: ['Atlantic Ocean', 'Arctic Ocean', 'Pacific Ocean', 'Indian Ocean'],
    correctIndex: 2,
  },
  {
    id: 'q-kiwi-fly',
    prompt: 'Which New Zealand bird cannot fly?',
    options: ['Kiwi', 'Swan', 'Hawk', 'Seagull'],
    correctIndex: 0,
  },
  {
    id: 'q-sky-tower',
    prompt: 'Which city is known for Sky Tower?',
    options: ['Dunedin', 'Auckland', 'Napier', 'Tauranga'],
    correctIndex: 1,
  },
  {
    id: 'q-tongariro',
    prompt: 'What type of landscape is Tongariro National Park famous for?',
    options: ['Volcanoes', 'Jungles', 'Deserts', 'Beaches'],
    correctIndex: 0,
  },
  {
    id: 'q-penguin',
    prompt: 'Which small penguin species lives in New Zealand?',
    options: ['Emperor Penguin', 'Little Blue Penguin', 'King Penguin', 'Yellow Penguin'],
    correctIndex: 1,
  },
  {
    id: 'q-lakes-activity',
    prompt: 'What is one popular activity on New Zealand lakes?',
    options: ['Camel riding', 'Kayaking', 'Sandboarding', 'Dog sledding'],
    correctIndex: 1,
  },
  {
    id: 'q-kea',
    prompt: 'Which famous parrot lives in New Zealand mountains?',
    options: ['Macaw', 'Kea', 'Cockatoo', 'Toucan'],
    correctIndex: 1,
  },
  {
    id: 'q-fiordland',
    prompt: 'Which New Zealand region is known for fjords and waterfalls?',
    options: ['Waikato', 'Fiordland', 'Canterbury', "Hawke's Bay"],
    correctIndex: 1,
  },
  {
    id: 'q-tekapo-night',
    prompt: 'What makes New Zealand night skies famous near Lake Tekapo?',
    options: ['Volcano lights', 'Northern lights', 'Stargazing views', 'City reflections'],
    correctIndex: 2,
  },
];

const QUIZ_ROUND_LEN = 5;

export function skguidenzcittyQuizPickRound(
  pool: SkguidenzcittyQuizQuestion[] = SKGUIDENZCITTY_QUIZ_POOL,
  count: number = QUIZ_ROUND_LEN,
): SkguidenzcittyQuizQuestion[] {
  const skguidenzcittyquizCopy = [...pool];
  for (let skguidenzcittyquizI = skguidenzcittyquizCopy.length - 1; skguidenzcittyquizI > 0; skguidenzcittyquizI--) {
    const skguidenzcittyquizJ = Math.floor(
      Math.random() * (skguidenzcittyquizI + 1),
    );
    const skguidenzcittyquizT = skguidenzcittyquizCopy[skguidenzcittyquizI];
    skguidenzcittyquizCopy[skguidenzcittyquizI] =
      skguidenzcittyquizCopy[skguidenzcittyquizJ];
    skguidenzcittyquizCopy[skguidenzcittyquizJ] = skguidenzcittyquizT;
  }
  return skguidenzcittyquizCopy.slice(0, Math.min(count, pool.length));
}
