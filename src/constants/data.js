export const CATEGORIES = [
  { id: "all", label: "All", icon: "🏪" },
  { id: "smartphones", label: "Smartphones", icon: "📱" },
  { id: "laptops", label: "Laptops", icon: "💻" },
  { id: "audio", label: "Audio", icon: "🎧" },
  { id: "wearables", label: "Wearables", icon: "⌚" },
  { id: "cameras", label: "Cameras", icon: "📷" },
  { id: "gaming", label: "Gaming", icon: "🎮" },
  { id: "accessories", label: "Accessories", icon: "🔌" },
  { id: "tvs", label: "TVs", icon: "📺" },
  { id: "tablets", label: "Tablets", icon: "📟" },
];

export const PRODUCTS = [
  { id:1,  name:"ProMax Ultra 15 Pro",     category:"smartphones", price:1299, originalPrice:1499, rating:4.8, reviews:2341, img:"📱", badge:"NEW",       color:"#1D4ED8", stock:12, brand:"TechPro",   specs:["6.7\" OLED","200MP Camera","5G Ready","Titanium Frame","4nm Chip"], tags:["5g","oled","flagship"], colors:["#1D4ED8","#1E293B","#DC2626"], description:"The ultimate flagship with a titanium frame, 200MP camera system, and our fastest chip yet." },
  { id:2,  name:"NovaPad X1 Laptop",       category:"laptops",     price:1899, originalPrice:2199, rating:4.9, reviews:876,  img:"💻", badge:"HOT",       color:"#7C3AED", stock:5,  brand:"NovaTech",  specs:["16\" 4K OLED","i9 Processor","32GB RAM","RTX 4080","2TB NVMe"], tags:["creator","4k","gaming"], colors:["#1E293B","#94A3B8"], description:"Unrivaled power meets stunning display. Built for creators who refuse to compromise." },
  { id:3,  name:"SoundSphere Pro Max",     category:"audio",       price:399,  originalPrice:499,  rating:4.7, reviews:5621, img:"🎧", badge:"BESTSELLER", color:"#059669", stock:30, brand:"SoundX",    specs:["Active Noise Cancel","40hr Battery","Hi-Res Audio","LDAC","Spatial Audio"], tags:["anc","wireless","hires"], colors:["#1E293B","#F1F5F9","#B45309"], description:"Reference-class sound with industry-leading noise cancellation. Hear nothing but music." },
  { id:4,  name:"QuantumWatch S8",         category:"wearables",   price:549,  originalPrice:649,  rating:4.6, reviews:1203, img:"⌚", badge:"NEW",       color:"#DC2626", stock:18, brand:"Quantum",   specs:["AMOLED Display","GPS + Compass","ECG Sensor","SpO2 Monitor","14 Day Battery"], tags:["health","gps","ecg"], colors:["#1E293B","#DC2626","#F1F5F9"], description:"Your complete health companion. Track everything from heart rhythm to sleep quality." },
  { id:5,  name:"AlphaShot Z9 Mark IV",   category:"cameras",     price:2499, originalPrice:2799, rating:4.9, reviews:432,  img:"📷", badge:"PRO",       color:"#1E3A22", stock:8,  brand:"AlphaLens", specs:["61MP Full Frame","8K Video","Phase-detect AF","Weather Sealed","Dual CFexpress"], tags:["professional","8k","fullframe"], colors:["#1E293B"], description:"The benchmark for professional photography. Capture the impossible." },
  { id:6,  name:"NexusStation 5",          category:"gaming",      price:699,  originalPrice:699,  rating:4.8, reviews:9832, img:"🎮", badge:"IN STOCK",  color:"#1E293B", stock:25, brand:"Nexus",     specs:["4K 120fps","2TB Custom SSD","Ray Tracing","VR Ready","Backward Compatible"], tags:["4k","raytracing","console"], colors:["#1E293B","#F1F5F9"], description:"Next-gen gaming starts here. Breathtaking visuals, lightning-fast load times." },
  { id:7,  name:"SlimBook Air Pro",        category:"laptops",     price:1199, originalPrice:1399, rating:4.6, reviews:1540, img:"💻", badge:"SALE",      color:"#9D174D", stock:15, brand:"SlimTech",  specs:["14\" Liquid Retina","M3 Max Chip","18hr Battery","16GB RAM","512GB SSD"], tags:["ultrabook","battery","lightweight"], colors:["#C0A080","#1E293B","#E2E8F0"], description:"Incredible performance in a featherlight design. All day, every day." },
  { id:8,  name:"BudsElite Pro",           category:"audio",       price:249,  originalPrice:299,  rating:4.5, reviews:3201, img:"🎵", badge:"SALE",      color:"#B45309", stock:40, brand:"SoundX",    specs:["Spatial Audio","36hr Total","IPX5 Rating","LDAC Support","Adaptive EQ"], tags:["tws","spatial","compact"], colors:["#1E293B","#F1F5F9","#B45309"], description:"True wireless freedom with pro-level sound. Tiny buds, massive performance." },
  { id:9,  name:"VisionBand Ultra",        category:"wearables",   price:299,  originalPrice:349,  rating:4.4, reviews:780,  img:"⌚", badge:"",          color:"#374151", stock:22, brand:"VisionWear", specs:["Blood Oxygen","SpO2 Monitor","14 Day Battery","50m Water Resist","Sleep Analysis"], tags:["fitness","sleep","budget"], colors:["#374151","#059669","#DC2626"], description:"Comprehensive health tracking at an accessible price point." },
  { id:10, name:"AlphaLens 85mm f/1.4",   category:"cameras",     price:799,  originalPrice:999,  rating:4.7, reviews:231,  img:"🔭", badge:"DEAL",      color:"#3B1F08", stock:7,  brand:"AlphaLens", specs:["85mm Prime","f/1.4 Aperture","Weather Sealed","Nano Coating","11 Blade Iris"], tags:["portrait","prime","bokeh"], colors:["#1E293B"], description:"Legendary portrait lens with buttery bokeh and razor-sharp optics." },
  { id:11, name:"HyperCharge Station 200W",category:"accessories", price:89,   originalPrice:129,  rating:4.6, reviews:4521, img:"⚡", badge:"POPULAR",   color:"#1D4ED8", stock:60, brand:"ChargePro", specs:["200W Total","6 Ports","GaN Technology","USB-C PD","Auto Detect"], tags:["charger","gan","multi"], colors:["#1E293B","#F1F5F9"], description:"Power every device simultaneously with blazing-fast GaN charging technology." },
  { id:12, name:"NexusController Elite",   category:"gaming",      price:199,  originalPrice:229,  rating:4.8, reviews:2109, img:"🕹️", badge:"NEW",      color:"#4C1D95", stock:35, brand:"Nexus",     specs:["Hall Effect Sticks","Haptic Feedback","Adaptive Triggers","40hr Battery","Programmable"], tags:["controller","haptic","wireless"], colors:["#1E293B","#F1F5F9","#DC2626"], description:"Professional-grade control with zero drift Hall Effect sticks." },
  { id:13, name:"QuantumVision 85\" QLED", category:"tvs",        price:3299, originalPrice:3999, rating:4.8, reviews:654,  img:"📺", badge:"MEGA DEAL",  color:"#1D4ED8", stock:6,  brand:"Quantum",   specs:["85\" 8K QLED","144Hz Panel","Dolby Vision IQ","HDMI 2.1 x4","AI Picture"], tags:["8k","qled","large"], colors:["#1E293B"], description:"Cinematic perfection for your living room. 8K resolution you have to see to believe." },
  { id:14, name:"TabPro Ultra 13",         category:"tablets",     price:1099, originalPrice:1299, rating:4.7, reviews:987,  img:"📟", badge:"NEW",       color:"#0E7490", stock:14, brand:"NovaTech",  specs:["13\" OLED 120Hz","M2 Chip","WiFi 6E","12GB RAM","256GB Storage"], tags:["creative","display","performance"], colors:["#C0A080","#1E293B","#E2E8F0"], description:"The tablet that replaces your laptop. Limitless creativity in your hands." },
  { id:15, name:"XR Spatial Headset",      category:"accessories", price:3499, originalPrice:3499, rating:4.5, reviews:321,  img:"🥽", badge:"EXCLUSIVE",  color:"#7C3AED", stock:3,  brand:"VisionTech", specs:["4K per Eye","Eye Tracking","Hand Tracking","12GB RAM","256GB Storage"], tags:["vr","spatial","ar"], colors:["#F1F5F9"], description:"Step into spatial computing. Mixed reality has never been this immersive." },
  { id:16, name:"ProPhone Flip 4",         category:"smartphones", price:999,  originalPrice:1099, rating:4.3, reviews:876,  img:"📱", badge:"SALE",      color:"#065F46", stock:19, brand:"TechPro",   specs:["6.7\" Foldable OLED","Cover Display","Flex Mode","50MP Camera","30W Charging"], tags:["foldable","flip","compact"], colors:["#065F46","#DC2626","#7C3AED"], description:"The iconic flip phone reimagined. Style meets functionality." },
];

export const REVIEWS_DATA = {
  1: [
    { user:"Alex M.", rating:5, date:"Jan 2025", comment:"Absolutely mind-blowing camera. The 200MP shots are insane in detail.", helpful:142 },
    { user:"Sarah K.", rating:5, date:"Dec 2024", comment:"Battery lasts all day even with heavy use. Titanium feels premium.", helpful:98 },
    { user:"James L.", rating:4, date:"Dec 2024", comment:"Great phone overall, slightly pricey but worth it for the camera system.", helpful:67 },
  ],
  2: [
    { user:"Dev P.", rating:5, date:"Jan 2025", comment:"RTX 4080 handles everything I throw at it. 4K editing is buttery smooth.", helpful:201 },
    { user:"Emma R.", rating:5, date:"Nov 2024", comment:"The OLED display is stunning. Best laptop screen I've ever used.", helpful:155 },
  ],
};

export const FLASH_DEALS = [
  { id:1, name:"ProMax Ultra 15 Pro", img:"📱", price:999, originalPrice:1299, timeLeft:7200, sold:73 },
  { id:3, name:"SoundSphere Pro Max", img:"🎧", price:279, originalPrice:399,  timeLeft:3600, sold:91 },
  { id:6, name:"NexusStation 5",      img:"🎮", price:549, originalPrice:699,  timeLeft:1800, sold:56 },
];

export const NAV_ITEMS = [
  { id:"home",    label:"Home" },
  { id:"shop",    label:"Shop" },
  { id:"orders",  label:"My Orders" },
  { id:"profile", label:"Account" },
];

export const FEATURED_BRANDS = ["TechPro","NovaTech","SoundX","Nexus","AlphaLens","Quantum"];
