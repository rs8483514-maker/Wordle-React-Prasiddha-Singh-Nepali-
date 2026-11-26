
export const WORD_BANK = {
  Animals: [
    { word: "TIGER", hint: "A large striped wild cat" },
    { word: "HORSE", hint: "An animal people ride" },
    { word: "ZEBRA", hint: "An animal with black and white stripes" },
    { word: "SHEEP", hint: "An animal that gives us wool" },
    { word: "MOUSE", hint: "A small animal with a long tail" },
    { word: "SNAKE", hint: "A long reptile with no legs" },
    { word: "EAGLE", hint: "A bird known for sharp eyesight" },
    { word: "WHALE", hint: "A huge animal living in the ocean" },
    { word: "PANDA", hint: "A black and white bear" },
    { word: "OTTER", hint: "A playful animal that swims" }
  ],
  Food: [
    { word: "BREAD", hint: "A common baked food" },
    { word: "APPLE", hint: "A popular red or green fruit" },
    { word: "MANGO", hint: "A sweet tropical fruit" },
    { word: "GRAPE", hint: "A small fruit used to make raisins" },
    { word: "HONEY", hint: "A sweet substance made by bees" },
    { word: "LEMON", hint: "A sour yellow fruit" },
    { word: "PIZZA", hint: "A round Italian dish" },
    { word: "OLIVE", hint: "A small fruit used to make oil" },
    { word: "PEACH", hint: "A soft fruit with fuzzy skin" },
    { word: "MELON", hint: "A large juicy fruit" }
  ],
  Nature: [
    { word: "RIVER", hint: "A natural flowing body of water" },
    { word: "PLANT", hint: "A living thing that grows in soil" },
    { word: "OCEAN", hint: "A very large body of salt water" },
    { word: "EARTH", hint: "The planet we live on" },
    { word: "CLOUD", hint: "A white or gray shape in the sky" },
    { word: "STORM", hint: "Bad weather with strong wind and rain" },
    { word: "GRASS", hint: "A green plant covering the ground" },
    { word: "BEACH", hint: "A sandy area beside the sea" },
    { word: "STONE", hint: "A small piece of rock" },
    { word: "LEAFY", hint: "Covered with leaves" }
  ],
  Technology: [
    { word: "ROBOT", hint: "A machine that can perform tasks" },
    { word: "PHONE", hint: "A device used to make calls" },
    { word: "MOUSE", hint: "A computer pointing device" },
    { word: "SCREEN", hint: "The display of a device" },
    { word: "PIXEL", hint: "A tiny part of a digital image" },
    { word: "CABLE", hint: "A wire used to connect devices" },
    { word: "LASER", hint: "A focused beam of light" },
    { word: "CHIPS", hint: "Small electronic components" },
    { word: "RADIO", hint: "A device that receives broadcasts" },
    { word: "DRONE", hint: "An aircraft controlled remotely" }
  ],
  Space: [
    { word: "COMET", hint: "An icy object that travels through space" },
    { word: "STARS", hint: "Bright objects visible in the night sky" },
    { word: "MOONS", hint: "Natural objects orbiting planets" },
    { word: "SOLAR", hint: "Related to the Sun" },
    { word: "ALIEN", hint: "A possible being from another world" },
    { word: "ORBIT", hint: "The path of one object around another" },
    { word: "VENUS", hint: "The second planet from the Sun" },
    { word: "MARS", hint: "The red planet" },
    { word: "NOVA", hint: "A star that suddenly becomes brighter" },
    { word: "NEBULA", hint: "A cloud of gas and dust in space" }
  ],
  Sports: [
    { word: "CHESS", hint: "A board game played with kings and queens" },
    { word: "BOXER", hint: "A person who fights in a ring" },
    { word: "GAMES", hint: "Activities played for fun or competition" },
    { word: "SCORE", hint: "The number of points earned" },
    { word: "RUGBY", hint: "A sport played with an oval ball" },
    { word: "SKATE", hint: "To glide using wheels or blades" },
    { word: "SWING", hint: "A movement used in golf or baseball" },
    { word: "TRACK", hint: "A place where runners compete" },
    { word: "DANCE", hint: "Moving rhythmically to music" },
    { word: "GOALS", hint: "What players try to score in football" }
  ]
};

export const VALID_WORDS = new Set(
  Object.values(WORD_BANK)
    .flat()
    .map((entry) => entry.word.toUpperCase())
    .filter((word) => word.length === 5)
);

export function getRandomEntry(category) {
  const words = WORD_BANK[category];
  return words[Math.floor(Math.random() * words.length)];
}

export function getRandomCategory() {
  const categories = Object.keys(WORD_BANK);
  return categories[Math.floor(Math.random() * categories.length)];
}
wh
