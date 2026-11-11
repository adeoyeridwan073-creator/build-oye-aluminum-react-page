export const IMAGES = {
  hero: "https://images.pexels.com/photos/9901861/pexels-photo-9901861.jpeg?auto=compress&cs=tinysrgb&w=1920",
  facade1: "https://images.pexels.com/photos/36568917/pexels-photo-36568917.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  facade2: "https://images.pexels.com/photos/33719829/pexels-photo-33719829.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  facade3: "https://images.pexels.com/photos/16829268/pexels-photo-16829268.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  room1: "https://images.pexels.com/photos/18559636/pexels-photo-18559636.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  room2: "https://images.pexels.com/photos/17158675/pexels-photo-17158675.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  room3: "https://images.pexels.com/photos/8134753/pexels-photo-8134753.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  room4: "https://images.pexels.com/photos/7587855/pexels-photo-7587855.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  weld1: "https://images.pexels.com/photos/29386092/pexels-photo-29386092.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
  weld2: "https://images.pexels.com/photos/9729633/pexels-photo-9729633.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
};

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Approach", href: "#approach" },
  { label: "Contact", href: "#contact" },
];

export const SERVICES = [
  { icon: "window", title: "Aluminium Windows", text: "Sliding, casement, tilt & turn and fixed windows, configured to suit the opening and the room." },
  { icon: "door", title: "Doors & Entrances", text: "Folding, sliding, pivot and hinged doors engineered for smooth operation and heavy daily use." },
  { icon: "building", title: "Curtain Walls & Facades", text: "Glazing systems for commercial buildings, showrooms and offices, coordinated with the wider design." },
  { icon: "rail", title: "Railings & Balustrades", text: "Glass and bar railings for stairs, balconies and terraces — corrosion-free and low maintenance." },
  { icon: "roof", title: "Pergolas & Canopies", text: "Louvred pergolas, carports and shade canopies built to withstand sun, wind and rain." },
  { icon: "tool", title: "Custom Fabrication", text: "Bespoke aluminium components developed around your drawings, dimensions and finish requirements." },
];

export type Category = "All" | "Windows" | "Doors" | "Facades" | "Railings";

export const PRODUCTS: { name: string; category: Exclude<Category, "All">; img: string; specs: string[]; price: string }[] = [
  { name: "Sliding Windows", category: "Windows", img: IMAGES.room1, specs: ["Sliding", "Made to measure"], price: "" },
  { name: "Casement Windows", category: "Windows", img: IMAGES.room4, specs: ["Casement", "Made to measure"], price: "" },
  { name: "Folding Doors", category: "Doors", img: IMAGES.room3, specs: ["Folding", "Made to measure"], price: "" },
  { name: "Sliding Doors", category: "Doors", img: IMAGES.room2, specs: ["Sliding", "Made to measure"], price: "" },
  { name: "Curtain Wall Systems", category: "Facades", img: IMAGES.facade1, specs: ["Glazed facade", "Project specific"], price: "" },
  { name: "Architectural Facades", category: "Facades", img: IMAGES.facade2, specs: ["Facade systems", "Project specific"], price: "" },
  { name: "Glass Railings", category: "Railings", img: IMAGES.facade3, specs: ["Glass railing", "Made to measure"], price: "" },
];

export const PROJECTS = [
  { title: "Skyline Business Tower", type: "Curtain Wall", img: IMAGES.facade2, size: "lg" },
  { title: "Lakeside Villa", type: "Bi-Fold Doors", img: IMAGES.room3, size: "sm" },
  { title: "Metro Office Park", type: "Facade Glazing", img: IMAGES.facade1, size: "sm" },
  { title: "Harbor Residences", type: "Sliding Windows", img: IMAGES.room1, size: "sm" },
  { title: "Garden House", type: "Lift & Slide Doors", img: IMAGES.room2, size: "sm" },
];

export const TESTIMONIALS = [
  { name: "Adaeze Okafor", role: "Homeowner", text: "OYE Aluminum replaced every window in our home. The finish is flawless and the house is noticeably quieter and cooler." },
  { name: "Michael Grant", role: "Project Manager, BuildRight", text: "They delivered the curtain wall package for our 12-storey build ahead of schedule. Very professional team." },
  { name: "Fatima Bello", role: "Architect", text: "Precise fabrication, great colour options and they actually follow the drawings. My go-to aluminium partner." },
];

export const PROCESS = [
  { step: "01", title: "Understand", text: "Share your project, priorities and the space you are working with." },
  { step: "02", title: "Measure & plan", text: "Work through dimensions, configuration and finish for your requirements." },
  { step: "03", title: "Make", text: "Your aluminium system is prepared to the agreed project details." },
  { step: "04", title: "Fit", text: "Coordinate the installation and complete the final fit for your space." },
];

export const PRODUCT_RATES: Record<string, number> = {
  // Indicative Nigeria budget rates in NGN; confirm current supplier and profile rates before quoting.
  "Sliding Window": 180000,
  "Casement Window": 210000,
  "Bi-Fold Door": 320000,
  "Lift & Slide Door": 360000,
  "Glass Railing (per m)": 140000,
};

export const FINISHES: Record<string, { mult: number; swatch: string }> = {
  "Silver Anodized": { mult: 1, swatch: "linear-gradient(135deg,#f1f5f9,#94a3b8)" },
  "Matte Black": { mult: 1.12, swatch: "linear-gradient(135deg,#334155,#020617)" },
  "Champagne": { mult: 1.15, swatch: "linear-gradient(135deg,#f5e6c8,#b89b6a)" },
  "Bronze": { mult: 1.15, swatch: "linear-gradient(135deg,#a47148,#4a2f1b)" },
  "Pure White": { mult: 1.05, swatch: "linear-gradient(135deg,#ffffff,#e2e8f0)" },
  "Wood Grain": { mult: 1.25, swatch: "repeating-linear-gradient(100deg,#8b5a2b 0 6px,#a0693a 6px 10px)" },
};
