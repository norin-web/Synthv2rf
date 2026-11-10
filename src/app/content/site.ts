// Every fact about the operator, the app and its features lives here.
// Pages read only from this file. Unknown values are marked PLACEHOLDER.
// Facts come from the Figma design of the app ("Syntx v1"); the app is not
// on the App Store yet, so store data (min iOS, category, price) is unknown.

export const site = {
  brand: "Syntx",
  tagline: "AI image and video generator for iPhone",
  email: "jancao@seifertapp.click",
  operator: "PLACEHOLDER", // company that ships the app — confirm with the documents
  year: 2026,
  disclaimer:
    "Nano Banana, GPT Image, Seedream, Flux, Runway, Grok, Luma, Kling, Google Veo, Seedance, Sora and other model names are trademarks of their respective owners and are used only to identify the models available in the app.",
};

export const app = {
  id: "6821891250",
  url: "https://apps.apple.com/app/id6821891250",
  minIOS: "PLACEHOLDER",
  category: "PLACEHOLDER",
  price: "PLACEHOLDER",
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/app", label: "App" },
  { to: "/about", label: "About" },
  { to: "/support", label: "Support" },
  { to: "/contact", label: "Contact" },
];

/** Home · "Made for every idea" — captions are History titles from the app design. */
export const ideas = [
  { img: "/images/gen-portrait.webp", title: "Portraits", caption: "Cinematic portrait" },
  { img: "/images/gen-street.webp", title: "Street style", caption: "Street style in the rain" },
  { img: "/images/gen-cat.webp", title: "Pets", caption: "Lucky golden cat" },
  { img: "/images/gen-grandma.webp", title: "Pure fun", caption: "Neon party grandma" },
];

/** Home · feature tabs; each tab swaps the phone screen. */
export const features = [
  {
    title: "Create Image / Video",
    text: "Describe what you see in your head, choose Image or Video and send. The result lands right in the chat.",
    screen: "/images/screen-result.webp",
  },
  {
    title: "Ask AI",
    text: "Not sure what to write? The built‑in assistant suggests ideas and helps you shape the prompt.",
    screen: "/images/screen-assistant.webp",
  },
  {
    title: "Pick your model",
    text: "Nano Banana, GPT Image, Seedream and more for images; Kling, Google Veo, Sora and more for video.",
    screen: "/images/screen-models-image.webp",
  },
  {
    title: "History",
    text: "Your images, videos and chats are kept in History. Search them by name and pick up where you left off.",
    screen: "/images/screen-history.webp",
  },
];

export const imageModels = ["Nano Banana", "GPT Image", "Seedream", "Flux", "Runway Frames", "Grok Imagine", "Luma"];
export const videoModels = ["Kling", "Google Veo", "Seedance", "Sora", "Grok Imagine", "HappyHorse", "Beeble"];

/** [label, width, height] — the preview frame reshapes to the picked ratio. */
export const ratios: [string, number, number][] = [
  ["16:9", 16, 9],
  ["9:16", 9, 16],
  ["1:1", 1, 1],
  ["3:2", 3, 2],
  ["2:3", 2, 3],
  ["21:9", 21, 9],
  ["9:21", 9, 21],
];

export const examplePrompt = {
  text: "An old wizard summoning golden fire, cinematic",
  chips: ["Image", "Nano Banana 2.0", "9:16"],
  img: "/images/gen-wizard.webp",
};

export const stats = [
  { n: "10+", text: "AI models for images and video" },
  { n: "7", text: "frame sizes, 21:9 to 9:21" },
  { n: "1", text: "chat for prompts, results and help" },
];

export const steps = [
  { title: "Get Syntx from the App Store", text: "Download the app on your iPhone and open it." },
  { title: "Write a prompt or add a photo", text: "Type, dictate, or attach a picture to start from." },
  { title: "Pick a model and generate", text: "Choose Image or Video, a model and a frame size, then send." },
];

export const assistantSuggestions = ["Best ways to generate AI Video", "Help me write a nice scenario for Video"];

/** App page */
export const appScreens = [
  { src: "/images/screen-home.webp", alt: "Syntx home screen with Create Image / Video" },
  { src: "/images/screen-result.webp", alt: "Chat with a generated image and Download and Share buttons" },
  { src: "/images/screen-models-image.webp", alt: "Image model picker" },
  { src: "/images/screen-models-video.webp", alt: "Video model picker" },
  { src: "/images/screen-dimensions.webp", alt: "Aspect ratio picker" },
  { src: "/images/screen-history.webp", alt: "History with search" },
];

export const appFeatures = [
  {
    label: "Create Image / Video",
    title: "Type it, send it, get it back in the chat",
    text: "Pick Image or Video under the prompt field, choose a model and a frame size, then send. Download or share the result right away.",
    screen: "/images/screen-result.webp",
  },
  {
    label: "Ask AI",
    title: "A helper for when the words won’t come",
    text: "Ask how to write a prompt, what’s trending in AI, or for a short video scenario. Tap a suggestion to start.",
    screen: "/images/screen-assistant.webp",
  },
  {
    label: "Models and formats",
    title: "Choose the engine and the frame",
    text: "Image models like Nano Banana, GPT Image and Seedream. Video models like Kling, Google Veo and Sora. Seven aspect ratios for every format.",
    screen: "/images/screen-models-video.webp",
  },
  {
    label: "History",
    title: "Every result, easy to find again",
    text: "Your images, videos and AI chats are listed in History. Search by title and reopen any of them.",
    screen: "/images/screen-history.webp",
  },
];

export const specs: [string, string][] = [
  ["Creates", "Images and videos"],
  ["AI models", "10+ image and video models"],
  ["Aspect ratios", "16:9, 9:16, 1:1, 3:2, 2:3, 21:9, 9:21"],
  ["Input", "Text, voice, camera and photo library"],
  ["Category", app.category],
  ["Compatibility", `iPhone, iOS ${app.minIOS} or later`],
  ["Languages", "English"],
  ["Price", `${app.price} (in-app subscription)`],
  ["Developer", site.operator],
];

/** About page */
export const approach = {
  lead: "New AI models appear every month, and each one lives in its own app or website. We think that’s too much to keep up with.",
  text: "So we built one chat where you describe what you want, pick a model and get the result. The assistant helps when you’re not sure what to write, and History keeps everything you made.",
};

export const principles = [
  { title: "Your idea comes first", text: "A plain sentence is enough. No settings to learn before you see a result." },
  { title: "Choice, not lock-in", text: "Different models are good at different things, so you can switch between them freely." },
  { title: "Clear about AI", text: "Before your first request, the app explains what is sent to the AI provider and asks for your consent." },
];

/** Support: question chips → answer shown as a chat. Draft answers — check with the owner. */
export const faq = [
  {
    q: "How do I create an image or a video?",
    short: "Create an image or video",
    a: "Open Create Image / Video on the home screen and tap Generate. Write your prompt, choose Image or Video, a model and a frame size under the field, then tap send. The result appears in the chat with Download and Share buttons.",
  },
  {
    q: "Which AI models can I use?",
    short: "Which AI models?",
    a: "For images: Nano Banana, GPT Image, Seedream, Flux, Runway Frames, Grok Imagine and Luma. For video: Kling, Google Veo, Seedance, Sora, Grok Imagine, HappyHorse and Beeble. Pick one under the prompt field.",
  },
  {
    q: "Can I start from my own photo?",
    short: "My own photo",
    a: "Yes. Tap the paperclip next to the prompt field, take a photo or pick one from your library. It’s sent as a reference with your prompt.",
  },
  {
    q: "Where are my past results?",
    short: "Past results",
    a: "Open History in the tab bar. Your images, videos and AI chats are listed there, and you can search them by title.",
  },
  {
    q: "How do I cancel my subscription?",
    short: "Cancel subscription",
    a: "Subscriptions are managed by Apple. Open iPhone Settings → your name → Subscriptions → Syntx → Cancel Subscription. Deleting the app doesn’t cancel it.",
  },
  {
    q: "How do I restore a purchase?",
    short: "Restore a purchase",
    a: "On the subscription screen tap Restore. Make sure you’re signed in with the same Apple ID you used to subscribe.",
  },
  {
    q: "What happens to my prompts and photos?",
    short: "My prompts and photos",
    a: "Before your first request the app shows an AI processing notice: your prompt and images are sent to the AI provider to create the result. Details are in the Privacy Policy.",
  },
  {
    q: "The app can’t access my camera or photos",
    short: "Camera or photos access",
    a: "Open iPhone Settings → Syntx and allow access to Camera and Photos, then try again.",
  },
];

export const contactTopics = ["Feedback", "Bug", "Idea", "Subscription"];
