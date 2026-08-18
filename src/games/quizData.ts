export interface Question {
  q: string;
  options: string[];
  answer: number;
  note: string;
}

export const QUESTION_BANK: Question[] = [
  { q: "Who is the Moon Goddess in Chinese mythology?", options: ["Guan Yin", "Nuwa", "Chang'e", "Mazu"], answer: 2, note: "Chang'e drank the elixir of immortality and floated to the moon." },
  { q: "Why are pomelos eaten during the festival?", options: ["They are sweet", "Their name sounds like 'blessing'", "They are round like the moon", "They keep away evil spirits"], answer: 1, note: "The Chinese word for pomelo sounds like 'to bless' or 'to protect'." },
  { q: "What do lanterns symbolize?", options: ["Lighting the path to prosperity", "Scaring away the Nian monster", "Guiding the spirits home", "Welcoming the harvest"], answer: 0, note: "Lanterns are lit to symbolize lighting the path to prosperity and good fortune." },
  { q: "Why is the festival on the 15th day of the 8th month?", options: ["It is the harvest season", "The moon is at its brightest and roundest", "It marks the middle of autumn", "All of the above"], answer: 3, note: "The 15th of the 8th lunar month coincides with the harvest, mid-autumn, and the brightest full moon." },
  { q: "What is traditionally hidden inside mooncakes?", options: ["Coins", "Messages", "Salted Egg Yolks", "Red Beans"], answer: 2, note: "The salted egg yolk in the center represents the full moon." },
  { q: "Who is the archer that shot down 9 suns?", options: ["Hou Yi", "Wu Gang", "Sun Wukong", "Nezha"], answer: 0, note: "Hou Yi was rewarded with the elixir of immortality for saving the earth from scorching." },
  { q: "What animal is believed to live on the moon?", options: ["Dragon", "Tiger", "Rabbit", "Snake"], answer: 2, note: "The Jade Rabbit lives on the moon, pounding the elixir of life." },
  { q: "Which dynasty popularized the Mid-Autumn Festival?", options: ["Han", "Tang", "Song", "Ming"], answer: 1, note: "The festival became widely celebrated as an official holiday during the Tang Dynasty." },
  { q: "What historical message was once hidden in mooncakes?", options: ["Love letters", "Rebellion plans", "Treasury maps", "Poetry"], answer: 1, note: "During the Yuan Dynasty, rebels hid messages inside mooncakes to coordinate an uprising against Mongol rule." },
  { q: "What type of tea is most traditionally paired with mooncakes?", options: ["Green Tea", "Oolong or Pu'er Tea", "Bubble Tea", "Black Tea"], answer: 1, note: "Strong, fermented teas like Pu'er help cut through the heavy richness of traditional mooncakes." },
  { q: "What flower blooms during the Mid-Autumn Festival?", options: ["Lotus", "Cherry Blossom", "Osmanthus", "Plum Blossom"], answer: 2, note: "Osmanthus flowers bloom in autumn, and osmanthus wine is traditionally consumed during the festival." },
  { q: "What is Wu Gang condemned to do on the moon?", options: ["Pound medicine", "Chop down a self-healing cassia tree", "Sing to the stars", "Guard the palace"], answer: 1, note: "Wu Gang was banished to the moon to chop a magical tree that instantly heals every time it is cut." },
  { q: "In Vietnam, the Mid-Autumn Festival is heavily focused on...", options: ["Elders", "Children", "Farmers", "Merchants"], answer: 1, note: "Known as Tết Trung Thu, it is largely considered a children's festival in Vietnam." },
  { q: "Which shape of mooncake is the most traditional?", options: ["Square", "Round", "Triangle", "Hexagon"], answer: 1, note: "Round mooncakes symbolize completeness and reunion of the family." },
  { q: "What game is often played in Hokkien communities during the festival?", options: ["Mahjong", "Mooncake Dice (Bo Bing)", "Xiangqi", "Go"], answer: 1, note: "Bo Bing involves rolling six dice in a porcelain bowl to win varying sizes of mooncakes." },
  { q: "What is a 'Snow Skin' mooncake?", options: ["A mooncake eaten in winter", "A frozen fruit dessert", "An unbaked mooncake with a mochi-like crust", "A cake dusted with powdered sugar"], answer: 2, note: "Snow skin mooncakes originated in Hong Kong as a lighter, non-baked alternative to traditional crusts." },
  { q: "What does the word 'Mid-Autumn' translate to in Chinese?", options: ["Zhongqiu", "Chunjie", "Duanwu", "Qingming"], answer: 0, note: "Zhongqiu (中秋) literally means the middle of autumn." },
  { q: "What kind of meat is famously used in Suzhou-style mooncakes?", options: ["Pork", "Beef", "Chicken", "Duck"], answer: 0, note: "Suzhou-style mooncakes feature a flaky pastry crust filled with savory minced pork." },
  { q: "Which country calls the festival 'Chuseok'?", options: ["Japan", "Vietnam", "Korea", "Thailand"], answer: 2, note: "Chuseok is the Korean mid-autumn harvest festival, celebrated by visiting ancestral hometowns." },
  { q: "What is the traditional Japanese viewing of the moon called?", options: ["Hanami", "Tsukimi", "Matsuri", "Obon"], answer: 1, note: "Tsukimi (moon-viewing) traditions include displaying decorations and eating rice dumplings." },
  { q: "What do the 5 nuts in a 'Five Kernel' mooncake symbolize?", options: ["Wealth", "The 5 elements", "The 5 cardinal virtues", "A bountiful harvest"], answer: 3, note: "The mixture of seeds and nuts represents the rich harvest of the season." },
  { q: "How many phases does the moon go through in a lunar month?", options: ["4", "6", "8", "12"], answer: 2, note: "The moon goes through 8 distinct phases, culminating in the full moon on the 15th." },
  { q: "Which river is famous for floating lanterns during the festival?", options: ["Yellow River", "Yangtze River", "Pearl River", "Qiantang River"], answer: 3, note: "The Qiantang River tidal bore is traditionally viewed during the mid-autumn festival in Zhejiang." },
  { q: "What root vegetable is eaten in Southern China during the festival?", options: ["Taro", "Potato", "Carrot", "Ginger"], answer: 0, note: "Eating taro during the festival is believed to ward off evil and bring good luck." },
  { q: "What is the primary ingredient of the elixir of immortality?", options: ["Ginseng", "Ground jade", "Morning dew", "It is unknown"], answer: 1, note: "In myth, the Jade Rabbit uses a mortar and pestle to grind jade into the elixir." },
  { q: "What does the roundness of the moon represent?", options: ["Money", "Family Reunion", "The cycle of life", "The sun's reflection"], answer: 1, note: "In Chinese culture, a full round circle symbolizes completeness and the gathering of family." },
  { q: "What dynasty is associated with the 'Tai Shi' mooncake design?", options: ["Ming", "Qing", "Song", "Yuan"], answer: 1, note: "Many elaborate molds and designs we see today originated or were perfected during the Qing dynasty." },
  { q: "Which mythical animal chased the suns before Hou Yi shot them down?", options: ["The Nine-Tailed Fox", "The Three-Legged Crow", "The Golden Dragon", "The Heavenly Dog"], answer: 1, note: "The ten suns were represented as three-legged crows in Chinese mythology." },
  { q: "What is a modern flavor of mooncake?", options: ["Lotus seed", "Red bean", "Ice cream", "Mixed nuts"], answer: 2, note: "Ice cream mooncakes, popularized by Häagen-Dazs, are a modern twist on the classic." },
  { q: "What is written on the top of most traditional mooncakes?", options: ["The baker's name", "The ingredients", "Characters for 'Longevity' or 'Harmony'", "The price"], answer: 2, note: "Auspicious characters like longevity (壽) or harmony (和) are typically molded into the top." },
  { q: "What fruit is NOT traditionally associated with the festival?", options: ["Pomelo", "Watermelon", "Starfruit", "Pear"], answer: 1, note: "Watermelons are summer fruits, while pomelos, starfruits, and pears are harvested in autumn." }
];
