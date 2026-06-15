/* ============================================================
   TINY TREASURES BY MJ — Config & Content Data
   Update WhatsApp number, social links, products, workshops
   ============================================================ */

// ── WhatsApp Configuration ───────────────────────────────
// REPLACE: Your WhatsApp number with country code, no + or spaces
// India example: 91 + 10-digit number → '918943045800'
export const WHATSAPP_NUMBER = '918943045800';

// Raw message strings — DO NOT pre-encode; waLink() encodes them once
export const WHATSAPP_MESSAGES = {
    order: 'Hello Tiny Treasures by MJ! I would like to enquire about placing an order for a custom miniature piece. Could you please share the details, pricing and lead time?',
    question: 'Hello Tiny Treasures by MJ! I have a question about your handcrafted miniature pieces. Could you please help me?',
    workshop: 'Hello! I am interested in booking a workshop at Tiny Treasures by MJ. Could you please share the upcoming dates, details, and pricing?',
};

export function waLink(type) {
    const msg = WHATSAPP_MESSAGES[type] || WHATSAPP_MESSAGES.question;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ── Social Links ─────────────────────────────────────────
// REPLACE: Update with real social profiles
export const SOCIAL = {
    instagram: 'https://instagram.com/tinytreasuresbymj',
    facebook: '#',
    pinterest: '#',
};

// ── Business Info ────────────────────────────────────────
export const BUSINESS = {
    name: 'Tiny Treasures by MJ',
    tagline: 'Tiny Creations. Endless Joy.',
    email: 'hello@tinytreasuresbymj.com',
    phone: '+91 99999 99999',
    hours: 'Mon–Sat: 10am – 7pm IST',
    address: 'Available Online & by Appointment',
};

// ── Products ─────────────────────────────────────────────
export const PRODUCTS = [
    {
        id: 1,
        name: 'fridge magnet ',
        category: 'Room Box',
        image: 'assets/product1.jpg',
        badge: 'Bestseller',
        badgeType: 'blush',
        description: 'cute magnets to enlighten your workspaces.',
    },
    {
        id: 2,
        name: 'Cosy Reading Nook',
        category: 'Room Box',
        image: 'assets/product2.png',
        badge: 'New',
        badgeType: 'clay',
        description: 'A serene reading corner with dark floral wallpaper and a warm crochet-dressed table.',
    },
    {
        id: 3,
        name: 'skillet',
        category: 'food',
        image: 'assets/product3.jpg',
        badge: 'Popular',
        badgeType: 'blush',
        description: 'A miniature cast-iron skillet with a sunny-side-up egg, bacon, and toast — perfect for breakfast lovers.',
    },
    {
        id: 4,
        name: 'skillet and food miniatures',
        category: 'food',
        image: 'assets/product4.jpg',
        badge: null,
        badgeType: '',
        description: 'A collection of miniature food items including a skillet, pancakes, and a tiny cup of coffee — ideal for dollhouse kitchens.',},
    {
        id: 5,
        name: 'keychains',
        category: 'accessory',
        image: 'assets/product5.jpg',
        badge: 'Limited',
        badgeType: 'clay',
        description: 'Handcrafted clay keychains featuring adorable miniature designs — a perfect gift or personal accessory.',
    },
    {
        id: 6,
        name: 'cute flower vase tabletop',
        category: 'Clay flowers',
        image: 'assets/product6.jpg',
        badge: null,
        badgeType: '',
        description: 'A delicate tabletop flower vase with handcrafted clay flowers, adding a touch of charm and elegance to any space.',
    },
    {
        id: 7,
        name: 'Vintage Café Corner',
        category: 'Room Box',
        image: 'assets/product7.jpg',
        badge: 'New',
        badgeType: 'blush',
        description: 'A Parisian-style mini café with a chalkboard menu, croissants under a glass cloche, and wrought-iron chairs.',
    },
    {
        id: 8,
        name: 'tea tray',
        category: 'food',
        image: 'assets/product8.jpg',
        badge: null,
        badgeType: '',
        description: 'A miniature tea tray with a teapot, cups, and a selection of tiny pastries — perfect for dollhouse tea parties.',
    },
     {
        id: 9,
        name: 'tea set',
        category: 'food',
        image: 'assets/product9.jpg',
        badge: null,
        badgeType: '',
        description: 'A miniature tea set with a teapot, cups, and a selection of tiny pastries — perfect for dollhouse tea parties.',
    },
     {
        id: 10,
        name: 'tabletop set',
        category: 'decor',
        image: 'assets/product10.jpg',
        badge: null,
        badgeType: '',
        description: 'A miniature tabletop set featuring a tiny dining table, chairs, and a selection of miniature food items — ideal for dollhouse dining scenes.',
    },
     {
        id: 11,
        name: 'cute flower vase',
        category: 'flower',
        image: 'assets/product11.jpg',
        badge: null,
        badgeType: '',
        description: 'A delicate flower vase with handcrafted clay flowers, adding a touch of charm and elegance to any space.',
    },
     {
        id: 12,
        name: 'table',
        category: 'decor',
        image: 'assets/product12.jpg',
        badge: null,
        badgeType: '',
        description: 'A miniature dining table with a selection of tiny food items and tableware — perfect for dollhouse dining scenes.',
    },
     {
        id: 13,
        name: 'tea tray',
        category: 'food',
        image: 'assets/product13.jpg',
        badge: null,
        badgeType: '',
        description: 'a life like table setup with a tea tray, teapot, cups, and a selection of tiny pastries — perfect for dollhouse tea parties.',
    },
     {
        id: 14,
        name: 'ring holder',
        category: 'accessory',
        image: 'assets/product14.jpg',
        badge: null,
        badgeType: '',
        description: 'A miniature ring holder with a delicate design, perfect for storing rings and small jewelry items in a charming way.',
    },
     {
        id: 15,
        name: 'tea cups',
        category: 'food',
        image: 'assets/product15.jpg',
        badge: null,
        badgeType: '',
        description: 'A miniature cup',
    },
     {
        id: 16,
        name: 'radio',
        category: 'decor',
        image: 'assets/product 16.jpg',
        badge: null,
        badgeType: '',
        description: 'A miniature radio with a vintage design, perfect for adding a touch of nostalgia to any space.',
    },
     {
        id: 17,
        name: 'jewelry tray',
        category: 'accessory',
        image: 'assets/product17.jpg',
        badge: null,
        badgeType: '',
        description: 'A miniature jewelry tray with a delicate design, perfect for storing rings and small jewelry items in a charming way.',
    },
     {
        id: 18,
        name: 'flower',
        category: 'flower',
        image: 'assets/product18.jpg',
        badge: null,
        badgeType: '',
        description: 'A delicate flower vase with handcrafted clay flowers, adding a touch of charm and elegance to any space.',
    },
];

// ── Gallery Items ────────────────────────────────────────
export const GALLERY = [
    {
         id: 1,
        name: 'fridge magnet ',
        category: 'Room Box',
        image: 'assets/product1.jpg',
        badge: 'Bestseller',
        badgeType: 'blush',
        description: 'cute magnets to enlighten your workspaces.',
    },
    {
        id: 2,
        name: 'Cosy Reading Nook',
        category: 'Room Box',
        image: 'assets/product2.png',
        badge: 'New',
        badgeType: 'clay',
        description: 'A serene reading corner with dark floral wallpaper and a warm crochet-dressed table.',
    },
    {
        id: 3,
        name: 'skillet',
        category: 'food',
        image: 'assets/product3.jpg',
        badge: 'Popular',
        badgeType: 'blush',
        description: 'A miniature cast-iron skillet with a sunny-side-up egg, bacon, and toast — perfect for breakfast lovers.',
    },
    {
        id: 4,
        name: 'skillet and food miniatures',
        category: 'food',
        image: 'assets/product4.jpg',
        badge: null,
        badgeType: '',
        description: 'A collection of miniature food items including a skillet, pancakes, and a tiny cup of coffee — ideal for dollhouse kitchens.',},
    {
        id: 5,
        name: 'keychains',
        category: 'accessory',
        image: 'assets/product5.jpg',
        badge: 'Limited',
        badgeType: 'clay',
        description: 'Handcrafted clay keychains featuring adorable miniature designs — a perfect gift or personal accessory.',
    },
    {
        id: 6,
        name: 'cute flower vase tabletop',
        category: 'Clay flowers',
        image: 'assets/product6.jpg',
        badge: null,
        badgeType: '',
        description: 'A delicate tabletop flower vase with handcrafted clay flowers, adding a touch of charm and elegance to any space.',
    },
    {
        id: 7,
        name: 'Vintage Café Corner',
        category: 'Room Box',
        image: 'assets/product7.jpg',
        badge: 'New',
        badgeType: 'blush',
        description: 'A Parisian-style mini café with a chalkboard menu, croissants under a glass cloche, and wrought-iron chairs.',
    },
    {
        id: 8,
        name: 'tea tray',
        category: 'food',
        image: 'assets/product8.jpg',
        badge: null,
        badgeType: '',
        description: 'A miniature tea tray with a teapot, cups, and a selection of tiny pastries — perfect for dollhouse tea parties.',
    },
     {
        id: 9,
        name: 'tea set',
        category: 'food',
        image: 'assets/product9.jpg',
        badge: null,
        badgeType: '',
        description: 'A miniature tea set with a teapot, cups, and a selection of tiny pastries — perfect for dollhouse tea parties.',
    },
     {
        id: 10,
        name: 'tabletop set',
        category: 'decor',
        image: 'assets/product10.jpg',
        badge: null,
        badgeType: '',
        description: 'A miniature tabletop set featuring a tiny dining table, chairs, and a selection of miniature food items — ideal for dollhouse dining scenes.',
    },
     {
        id: 11,
        name: 'cute flower vase',
        category: 'flower',
        image: 'assets/product11.jpg',
        badge: null,
        badgeType: '',
        description: 'A delicate flower vase with handcrafted clay flowers, adding a touch of charm and elegance to any space.',
    },
     {
        id: 12,
        name: 'table',
        category: 'decor',
        image: 'assets/product12.jpg',
        badge: null,
        badgeType: '',
        description: 'A miniature dining table with a selection of tiny food items and tableware — perfect for dollhouse dining scenes.',
    },
     {
        id: 13,
        name: 'tea tray',
        category: 'food',
        image: 'assets/product13.jpg',
        badge: null,
        badgeType: '',
        description: 'a life like table setup with a tea tray, teapot, cups, and a selection of tiny pastries — perfect for dollhouse tea parties.',
    },
     {
        id: 14,
        name: 'ring holder',
        category: 'accessory',
        image: 'assets/product14.jpg',
        badge: null,
        badgeType: '',
        description: 'A miniature ring holder with a delicate design, perfect for storing rings and small jewelry items in a charming way.',
    },
     {
        id: 15,
        name: 'tea cups',
        category: 'food',
        image: 'assets/product15.jpg',
        badge: null,
        badgeType: '',
        description: 'A miniature cup',
    },
     {
        id: 16,
        name: 'radio',
        category: 'decor',
        image: 'assets/product 16.jpg',
        badge: null,
        badgeType: '',
        description: 'A miniature radio with a vintage design, perfect for adding a touch of nostalgia to any space.',
    },
     {
        id: 17,
        name: 'jewelry tray',
        category: 'accessory',
        image: 'assets/product17.jpg',
        badge: null,
        badgeType: '',
        description: 'A miniature jewelry tray with a delicate design, perfect for storing rings and small jewelry items in a charming way.',
    },
     {
        id: 18,
        name: 'flower',
        category: 'flower',
        image: 'assets/product18.jpg',
        badge: null,
        badgeType: '',
        description: 'A delicate flower vase with handcrafted clay flowers, adding a touch of charm and elegance to any space.',
    },
];

// ── Workshop Data ────────────────────────────────────────
export const WORKSHOPS = [
    {
        id: 1,
        title: 'Beginner Clay Miniatures',
        date: 'July 12, 2026',
        day: 'Saturday',
        duration: '3 Hours',
        age: 'All Ages (8+)',
        price: '₹1,499',
        seats: 8,
        seatsLeft: 3,
        description: 'Learn the art of miniature clay sculpting from scratch. Create your own adorable clay flower and take it home!',
        includes: ['Clay, tools and materials', 'Step-by-step guidance', 'Refreshments', 'Certificate of participation'],
    },
    {
        id: 2,
        title: 'Miniature Room Box Workshop',
        date: 'July 19, 2026',
        day: 'Saturday',
        duration: '5 Hours',
        age: 'Teens and Adults (14+)',
        price: '₹2,999',
        seats: 6,
        seatsLeft: 2,
        description: 'Build your own miniature room box from start to finish. Choose your theme and create a showstopper piece!',
        includes: ['Shadow box frame', 'All clay and decor', 'Step-by-step mentoring', 'Take your piece home'],
    },
    {
        id: 3,
        title: 'Clay Wedding Toppers',
        date: 'August 2, 2026',
        day: 'Sunday',
        duration: '4 Hours',
        age: 'Adults (16+)',
        price: '₹2,499',
        seats: 8,
        seatsLeft: 5,
        description: 'Create personalised clay figurines for weddings, anniversaries, or as a heartfelt gift for a loved one.',
        includes: ['Premium clay and tools', 'Painting and varnishing', 'Personalised keepsake box', 'Take your piece home'],
    }
];

// ── FAQ Data ─────────────────────────────────────────────
export const FAQS = [
    {
        q: 'Do you accept custom orders?',
        a: 'Absolutely! Custom orders are our specialty. Simply reach out via WhatsApp or our contact form with your idea, reference images, and any special requirements. We\'ll create something uniquely tailored to you.',
    },
    {
        q: 'How long do miniature orders take?',
        a: 'Standard pieces take 7–14 business days. Complex custom orders may take 3–4 weeks depending on detail and size. We\'ll always give you a clear timeline before you confirm your order.',
    },
    {
        q: 'Do you ship nationwide?',
        a: 'Yes! We ship across India using trusted courier partners with careful packaging to ensure your precious miniature arrives safely. International shipping is also available — ask us for details.',
    },
    {
        q: 'Can beginners attend workshops?',
        a: 'Yes! Our Beginner Clay Miniatures workshop is specifically designed for people with zero experience. Our instructors guide you every step of the way in a warm, supportive environment.',
    },
    {
        q: 'What materials are used?',
        a: 'We use premium air-dry clay, polymer clay, fabric, paint, varnish, and specialty miniature accessories. All materials are non-toxic and child-safe. Products are sealed with a protective varnish for durability.',
    },
    {
        q: 'Are workshops suitable for children?',
        a: 'Our Beginner workshop is suitable for ages 8 and up (with an accompanying adult for under-12s). The Room Box and Wedding Topper workshops are best for teens and adults aged 14+.',
    },
    {
        q: 'What is your refund/return policy?',
        a: 'We take great pride in every piece. If your order arrives damaged, we\'ll replace it free of charge. As all pieces are handmade, we don\'t offer returns for change of mind, but we\'ll always work with you to ensure you\'re happy.',
    },
    {
        q: 'Can I request a specific colour palette or theme?',
        a: 'Of course! That\'s the joy of custom orders. Share your vision — colour palette, theme, occasion — and we\'ll create a miniature that perfectly captures it.',
    },
];

// ── Testimonials ──────────────────────────────────────────
export const TESTIMONIALS = [
    {
        text: 'MJ created the most breathtaking miniature kitchen for my daughter\'s birthday. She literally cried happy tears when she saw it. Every single detail was perfection.',
        name: 'Priya R.',
        detail: 'Mumbai - Custom Room Box',
        initial: 'P',
        rating: 5,
    },
    {
        text: 'I commissioned a wedding topper for our anniversary. It looked exactly like us — even got my husband\'s little beard right! The craftsmanship is extraordinary.',
        name: 'Ananya S.',
        detail: 'Bengaluru - Wedding Toppers',
        initial: 'A',
        rating: 5,
    },
    {
        text: 'Attended the beginner workshop and left with the most adorable clay bouquet. MJ is so patient and talented. I\'m already signed up for the Room Box workshop!',
        name: 'Deepika M.',
        detail: 'Chennai - Workshop Attendee',
        initial: 'D',
        rating: 5,
    },
    {
        text: 'Ordered the Garden Tea Party box as a gift for my mother. She keeps it on her bedside table and says it brings her joy every single morning. Worth every rupee.',
        name: 'Rahul K.',
        detail: 'Hyderabad - Shadow Box',
        initial: 'R',
        rating: 5,
    },
];

// ── Process Stages ───────────────────────────────────────
export const PROCESS_STAGES = [
    {
        title: 'Clay Selection',
        short: 'Choosing the perfect clay',
        detail: 'Every piece begins with carefully selecting the right type of clay — air-dry for room boxes, premium polymer clay for figurines. Colour blending is done by hand to match your vision exactly.',
    },
    {
        title: 'Sculpting',
        short: 'Shaping each piece by hand',
        detail: 'Using only fingertips and tiny sculpting tools, each miniature is shaped with extraordinary care. No moulds — everything is sculpted freehand, giving each piece a unique, handmade character.',
    },
    {
        title: 'Painting',
        short: 'Bringing colour to life',
        detail: 'After drying, each piece is painted with professional-grade acrylic paints using ultra-fine brushes. Multiple layers of detail are added — from the tiniest book spines to delicate rose petals.',
    },
    {
        title: 'Varnishing',
        short: 'A protective finish',
        detail: 'Every piece receives a hand-applied protective varnish that preserves colours, adds a premium finish, and ensures your miniature lasts for decades as a cherished keepsake.',
    },
    {
        title: 'Finishing Touches',
        short: 'Final details and packaging',
        detail: 'The final stage involves assembling all elements, adding micro-details, quality checking every angle, and packaging your treasure in signature gift wrapping ready for its new home.',
    },
];