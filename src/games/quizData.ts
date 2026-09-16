export interface Question {
  q: string;
  options: string[];
  answer: number;
  note: string;
}

export const QUESTION_BANK: Question[] = [
  // 1-10: Original 10
  { q: "In Chinese mythology, what is the Jade Rabbit doing on the moon?", options: ["Guarding the Moon Goddess", "Pounding the elixir of immortality", "Planting cassia trees", "Watching over children"], answer: 1, note: "The Jade Rabbit is famously seen in the shadows of the moon, constantly using a mortar and pestle to grind the elixir of life." },
  { q: "During the Yuan Dynasty, what secret item was famously hidden inside mooncakes?", options: ["Gold coins", "Engagement rings", "Messages of rebellion", "Poetry"], answer: 2, note: "Rebels supposedly smuggled secret messages inside mooncakes to coordinate an uprising against Mongol rule on the 15th of the 8th month." },
  { q: "What type of tea is traditionally recommended to pair with rich mooncakes?", options: ["Jasmine Tea", "Pu'er or Oolong Tea", "Bubble Milk Tea", "Green Tea"], answer: 1, note: "Strong, fermented teas like Pu'er are traditional because they help cut through the heavy, rich sweetness of the mooncake." },
  { q: "What is Wu Gang condemned to do on the moon for eternity?", options: ["Chop a self-healing cassia tree", "Sweep the lunar dust", "Sing to the stars", "Bake mooncakes"], answer: 0, note: "As punishment, Wu Gang must chop down a magical osmanthus/cassia tree that instantly heals itself every time he strikes it." },
  { q: "In Vietnam, the Mid-Autumn Festival (Tết Trung Thu) is heavily focused on celebrating...", options: ["Farmers", "Elders", "Children", "Ancestors"], answer: 2, note: "It is largely considered a children's festival in Vietnam, featuring toys, lanterns, and lion dances." },
  { q: "What do the 5 nuts in the traditional 'Five Kernel' mooncake symbolize?", options: ["The 5 elements", "The 5 cardinal virtues", "A bountiful harvest", "The 5 senses"], answer: 2, note: "The mixture of various seeds and nuts represents the rich, bountiful harvest of autumn." },
  { q: "Which fruit is a staple of the festival because its Chinese name sounds like 'to bless'?", options: ["Watermelon", "Starfruit", "Pomelo", "Persimmon"], answer: 2, note: "The pomelo (youzi) is eaten because its name sounds like words meaning 'to bless' or 'to protect'." },
  { q: "What is a 'Snow Skin' mooncake?", options: ["An unbaked mooncake with a mochi-like crust", "A cake dusted with powdered sugar", "A mooncake eaten in winter", "A frozen fruit dessert"], answer: 0, note: "Originating in Hong Kong in the 1980s, snow skin mooncakes are a chilled, lighter alternative to traditional baked crusts." },
  { q: "What game is famously played in Hokkien communities during the festival to win mooncakes?", options: ["Mahjong", "Go", "Mooncake Dice (Bo Bing)", "Xiangqi"], answer: 2, note: "Bo Bing involves rolling six dice in a porcelain bowl to win varying sizes of mooncakes based on the combination rolled." },
  { q: "Why is the festival celebrated specifically on the 15th day of the 8th lunar month?", options: ["It marks the autumn equinox", "The moon is at its brightest and roundest", "It is the Emperor's birthday", "It is the start of the harvest"], answer: 1, note: "The 15th marks the exact middle of autumn when the full moon is historically believed to be the brightest of the year." },
  // 11-20: New additions
  { q: "Who is the Moon Goddess in Chinese mythology?", options: ["Guan Yin", "Nuwa", "Chang'e", "Mazu"], answer: 2, note: "Chang'e drank the elixir of immortality and floated to the moon." },
  { q: "What do lanterns symbolize?", options: ["Lighting the path to prosperity", "Scaring away the Nian monster", "Guiding the spirits home", "Welcoming the harvest"], answer: 0, note: "Lanterns are lit to symbolize lighting the path to prosperity and good fortune." },
  { q: "What is traditionally hidden inside the center of savory mooncakes?", options: ["Coins", "Messages", "Salted Egg Yolks", "Red Beans"], answer: 2, note: "The salted egg yolk in the center represents the full moon." },
  { q: "Who is the archer that shot down 9 suns?", options: ["Hou Yi", "Wu Gang", "Sun Wukong", "Nezha"], answer: 0, note: "Hou Yi was rewarded with the elixir of immortality for saving the earth from scorching." },
  { q: "Which dynasty popularized the Mid-Autumn Festival as an official holiday?", options: ["Han", "Tang", "Song", "Ming"], answer: 1, note: "The festival became widely celebrated as an official holiday during the Tang Dynasty." },
  { q: "What flower blooms during the Mid-Autumn Festival and is used in traditional wine?", options: ["Lotus", "Cherry Blossom", "Osmanthus", "Plum Blossom"], answer: 2, note: "Osmanthus flowers bloom in autumn, and osmanthus wine is traditionally consumed during the festival." },
  { q: "Which shape of mooncake is the most traditional?", options: ["Square", "Round", "Triangle", "Hexagon"], answer: 1, note: "Round mooncakes symbolize completeness and reunion of the family." },
  { q: "What does the word 'Mid-Autumn' (Zhongqiu) translate to in Chinese?", options: ["Middle of Autumn", "Harvest Moon", "Autumn Reunion", "Golden Month"], answer: 0, note: "Zhongqiu (中秋) literally means the middle of autumn." },
  { q: "What kind of meat is famously used in Suzhou-style mooncakes?", options: ["Pork", "Beef", "Chicken", "Duck"], answer: 0, note: "Suzhou-style mooncakes feature a flaky pastry crust filled with savory minced pork." },
  { q: "Which country calls the festival 'Chuseok'?", options: ["Japan", "Vietnam", "Korea", "Thailand"], answer: 2, note: "Chuseok is the Korean mid-autumn harvest festival, celebrated by visiting ancestral hometowns." },
  // 21-30: Deeper trivia
  { q: "What is the traditional Japanese viewing of the moon called?", options: ["Hanami", "Tsukimi", "Matsuri", "Obon"], answer: 1, note: "Tsukimi (moon-viewing) traditions include displaying decorations and eating rice dumplings." },
  { q: "How many phases does the moon go through in a lunar month?", options: ["4", "6", "8", "12"], answer: 2, note: "The moon goes through 8 distinct phases, culminating in the full moon on the 15th." },
  { q: "Which river is famous for viewing the tidal bore during the festival in Zhejiang?", options: ["Yellow River", "Yangtze River", "Pearl River", "Qiantang River"], answer: 3, note: "The massive Qiantang River tidal bore is traditionally viewed during the mid-autumn festival." },
  { q: "What root vegetable is eaten in Southern China during the festival to ward off evil?", options: ["Taro", "Potato", "Carrot", "Ginger"], answer: 0, note: "Eating taro during the festival is believed to ward off evil and bring good luck." },
  { q: "What does the roundness of the moon represent in Chinese culture?", options: ["Wealth", "Family Reunion", "The cycle of life", "The sun's reflection"], answer: 1, note: "A full round circle symbolizes completeness and the gathering of family." },
  { q: "Which mythical animals chased the suns before Hou Yi shot them down?", options: ["Nine-Tailed Foxes", "Three-Legged Crows", "Golden Dragons", "Heavenly Dogs"], answer: 1, note: "The ten suns were represented as three-legged crows in Chinese mythology." },
  { q: "What is a popular modern flavor of mooncake popularized by Häagen-Dazs?", options: ["Lotus seed", "Red bean", "Ice cream", "Mixed nuts"], answer: 2, note: "Ice cream mooncakes are a modern, highly popular twist on the classic." },
  { q: "What is typically written or molded on the top of most traditional mooncakes?", options: ["The baker's name", "The ingredients", "Characters for 'Longevity' or 'Harmony'", "The price"], answer: 2, note: "Auspicious characters like longevity (壽) or harmony (和) are typically molded into the top." },
  { q: "What fruit is NOT traditionally associated with the autumn festival?", options: ["Pomelo", "Watermelon", "Starfruit", "Pear"], answer: 1, note: "Watermelons are summer fruits, while pomelos, starfruits, and pears are harvested in autumn." },
  { q: "During which dynasty were the elaborate 'Tai Shi' mooncake molds perfected?", options: ["Ming", "Qing", "Song", "Yuan"], answer: 1, note: "Many elaborate molds and designs we see today originated or were perfected during the Qing dynasty." }
];
