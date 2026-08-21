export interface Question {
  q: string;
  options: string[];
  answer: number;
  note: string;
}

export const QUESTION_BANK: Question[] = [
  { 
    q: "In Chinese mythology, what is the Jade Rabbit doing on the moon?", 
    options: ["Guarding the Moon Goddess", "Pounding the elixir of immortality", "Planting cassia trees", "Watching over children"], 
    answer: 1, 
    note: "The Jade Rabbit is famously seen in the shadows of the moon, constantly using a mortar and pestle to grind the elixir of life." 
  },
  { 
    q: "During the Yuan Dynasty, what secret item was famously hidden inside mooncakes?", 
    options: ["Gold coins", "Engagement rings", "Messages of rebellion", "Poetry"], 
    answer: 2, 
    note: "Rebels supposedly smuggled secret messages inside mooncakes to coordinate an uprising against Mongol rule on the 15th of the 8th month." 
  },
  { 
    q: "What type of tea is traditionally recommended to pair with rich mooncakes?", 
    options: ["Jasmine Tea", "Pu'er or Oolong Tea", "Bubble Milk Tea", "Green Tea"], 
    answer: 1, 
    note: "Strong, fermented teas like Pu'er are traditional because they help cut through the heavy, rich sweetness of the mooncake." 
  },
  { 
    q: "What is Wu Gang condemned to do on the moon for eternity?", 
    options: ["Chop a self-healing cassia tree", "Sweep the lunar dust", "Sing to the stars", "Bake mooncakes"], 
    answer: 0, 
    note: "As punishment, Wu Gang must chop down a magical osmanthus/cassia tree that instantly heals itself every time he strikes it." 
  },
  { 
    q: "In Vietnam, the Mid-Autumn Festival (Tết Trung Thu) is heavily focused on celebrating...", 
    options: ["Farmers", "Elders", "Children", "Ancestors"], 
    answer: 2, 
    note: "It is largely considered a children's festival in Vietnam, featuring toys, lanterns, and lion dances." 
  },
  { 
    q: "What do the 5 nuts in the traditional 'Five Kernel' mooncake symbolize?", 
    options: ["The 5 elements", "The 5 cardinal virtues", "A bountiful harvest", "The 5 senses"], 
    answer: 2, 
    note: "The mixture of various seeds and nuts (like walnuts and melon seeds) represents the rich, bountiful harvest of autumn." 
  },
  { 
    q: "Which fruit is a staple of the Mid-Autumn Festival because its Chinese name sounds like 'to bless'?", 
    options: ["Watermelon", "Starfruit", "Pomelo", "Persimmon"], 
    answer: 2, 
    note: "The pomelo (youzi) is eaten because its name sounds like words meaning 'to bless' or 'to protect'." 
  },
  { 
    q: "What is a 'Snow Skin' mooncake?", 
    options: ["An unbaked mooncake with a mochi-like crust", "A cake dusted with powdered sugar", "A mooncake eaten in winter", "A frozen fruit dessert"], 
    answer: 0, 
    note: "Originating in Hong Kong in the 1980s, snow skin mooncakes are a chilled, lighter alternative to traditional baked crusts." 
  },
  { 
    q: "What game is famously played in Hokkien communities during the festival to win mooncakes?", 
    options: ["Mahjong", "Go", "Mooncake Dice (Bo Bing)", "Xiangqi"], 
    answer: 2, 
    note: "Bo Bing involves rolling six dice in a porcelain bowl to win varying sizes of mooncakes based on the combination rolled." 
  },
  { 
    q: "Why is the festival celebrated specifically on the 15th day of the 8th lunar month?", 
    options: ["It marks the autumn equinox", "The moon is at its brightest and roundest", "It is the Emperor's birthday", "It is the start of the harvest"], 
    answer: 1, 
    note: "The 15th marks the exact middle of autumn when the full moon is historically believed to be the brightest of the year." 
  }
];
