const ASSETS_PATH = "assets/";
const TOTAL_PAGES = 14;

const pageTexts = [
    "Your Text Here",
    "Your Text Here",
    "Your Text Here",
    "Your Text Here",
    "Your Text Here",
    "Your Text Here",
    "Your Text Here",
    "Your Text Here",
    "Your Text Here",
    "Your Text Here",
    "Your Text Here",
    "Your Text Here",
    "Your Text Here",
    "Your Text Here",
];

const pageStickers = [
    ["🌸", "✨", "💌"], ["📆", "💖", "🌿"], ["⏳", "💞", "✨"],
    ["😊", "🌻", "☁️"], ["💎", "🧸", "🌷"], ["🤝", "🌊", "💌"],
    ["🏡", "☕", "❤️"], ["🐾", "🥺", "🌸"], ["🌈", "🎨", "🦋"],
    ["🙏", "👴👵", "💖"], ["☀️", "🌻", "✨"], ["💌", "🌟", "🥺"],
    ["👫", "💞", "🌷"], ["🎉", "🎂", "🥂"]
];

const ROTATIONS = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"];
const WASHI = ["washi-pink", "washi-yellow", "washi-blue"];
const IMG_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

const BOOK_CONFIG = {
    totalLeaves: 8,
    flipDuration: 2500,
    resetStagger: 120,
    coverImage: ASSETS_PATH + "cover.jpg",
    coverTitle: "Digital Photobook"
};