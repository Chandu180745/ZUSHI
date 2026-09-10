const fs = require('fs');

const items = [
  // SOUPS
  { id: 'miso-dashi', name: 'Miso Dashi', description: 'Savory broth from fermented soybean paste and Kombu seaweed stock.', category: 'soups', type: 'veg', basePrice: 199, image: '/images/miso_dashi_1788934395446.jpg' },
  { id: 'crab-meat-soup', name: 'Crab Meat Soup', description: 'Rich, warming soup infused with ginger and garnished with fresh cilantro.', category: 'soups', type: 'non-veg', basePrice: 249, image: '/images/crab_meat_soup_1788934410519.jpg' },
  { id: 'tom-kha-gai', name: 'Tom Kha Gai', description: 'Classic Thai coconut soup with vegetables/meat and lemongrass in creamy broth.', category: 'soups', type: 'non-veg', basePrice: 219, image: '/images/tom_kha_gai_1788934424646.jpg', chefSpecial: true },
  
  // SALADS
  { id: 'raw-papaya-salad', name: 'Raw Papaya Salad', description: 'Shredded papaya & cherry tomatoes with chili, lime & roasted peanuts.', category: 'salads', type: 'veg', basePrice: 249, image: '/images/raw_papaya_salad_1788934463216.jpg', chefSpecial: true },
  { id: 'thai-herb-cucumber-salad', name: 'Thai Herb & Cucumber Salad', description: 'Cucumber, fresh mint, cilantro & Thai herbs.', category: 'salads', type: 'veg', basePrice: 249, image: '/images/thai_herb_salad_1788934609599.jpg' },
  { id: 'kani-salad', name: 'Kani Salad', description: 'Shredded crab stick & crisp cucumber in creamy Kewpie mayonnaise.', category: 'salads', type: 'non-veg', basePrice: 289, image: '/images/kani_salad_1788934760551.jpg' },

  // ONIGIRI
  { id: 'tofu-mayo-onigiri', name: 'Tofu Mayo Onigiri', description: 'Rice balls with creamy soft tofu & Japanese mayo.', category: 'onigiri', type: 'veg', basePrice: 499, image: '/images/tofu_mayo_onigiri_1788934778479.jpg' },
  { id: 'kimchi-mayo-onigiri', name: 'Kimchi Mayo', description: 'Rice balls with tangy spicy kimchi & rich mayo.', category: 'onigiri', type: 'veg', basePrice: 499, image: '/images/kimchi_mayo_onigiri_1788934796777.jpg' },
  { id: 'prawn-onigiri', name: 'Prawn Onigiri', description: 'Rice balls with savory prawns seasoned with soy & sesame.', category: 'onigiri', type: 'non-veg', basePrice: 549, image: '/images/prawn_onigiri_1788934815221.jpg' },
  { id: 'tuna-mayo-onigiri', name: 'Tuna Mayo', description: 'Rice balls with flaked cooked tuna & Japanese mayo.', category: 'onigiri', type: 'non-veg', basePrice: 569, image: '/images/tuna_mayo_onigiri_1788934830245.jpg' },
  { id: 'spicy-tuna-mayo-onigiri', name: 'Spicy Tuna Mayo', description: 'Rice balls with flaked tuna & creamy spicy mayo.', category: 'onigiri', type: 'non-veg', basePrice: 599, image: '/images/spicy_tuna_mayo_onigiri_1788934902771.jpg', chefSpecial: true },
  { id: 'salmon-mayo-onigiri', name: 'Salmon Mayo', description: 'Rice balls with flaked cooked salmon & mayonnaise.', category: 'onigiri', type: 'non-veg', basePrice: 599, image: '/images/salmon_mayo_onigiri_1788934919965.jpg' },

  // NIGIRI
  { id: 'salmon-nigiri', name: 'Salmon Nigiri', description: 'Rich, buttery orange salmon over vinegared rice.', category: 'nigiri', type: 'non-veg', basePrice: 749, image: '/images/salmon_nigiri_1788934938668.jpg' },
  { id: 'tuna-nigiri', name: 'Tuna Nigiri', description: 'Lean tuna over vinegared rice.', category: 'nigiri', type: 'non-veg', basePrice: 749, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=600&auto=format&fit=crop' },

  // SUSHI ROLLS (VEGETARIAN)
  { id: 'asparagus-maki', name: 'Asparagus Maki', description: 'Fresh asparagus wrapped in nori.', category: 'sushi-rolls-veg', type: 'veg', basePrice: 449, image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?q=80&w=600&auto=format&fit=crop' },
  { id: 'tofu-crunchy-roll', name: 'Tofu Crunchy Roll', description: 'Crispy fried tofu, cucumber & avocado with tempura bits.', category: 'sushi-rolls-veg', type: 'veg', basePrice: 449, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop' },
  { id: 'avocado-cheese-roll', name: 'Avocado Cheese Roll', description: 'Creamy avocado & cream cheese wrapped in rice & nori.', category: 'sushi-rolls-veg', type: 'veg', basePrice: 499, image: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?q=80&w=600&auto=format&fit=crop', chefSpecial: true },
  { id: 'shiitake-gimbap', name: 'Shiitake Gimbap', description: 'Korean-style rice rolls with shiitake mushrooms, spinach, danmuji.', category: 'sushi-rolls-veg', type: 'veg', basePrice: 499, image: 'https://images.unsplash.com/photo-1558985250-27a406d64cb3?q=80&w=600&auto=format&fit=crop' },
  { id: 'zushi-sushi-platter-veg', name: 'Zushi Sushi Platter (Veg)', description: 'Mixed vegetarian selection.', category: 'sushi-rolls-veg', type: 'veg', basePrice: 1999, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=600&auto=format&fit=crop' },

  // SUSHI ROLLS (NON-VEG)
  { id: 'maki-roll', name: 'Maki Roll', description: 'Traditional thin rolls with filling of choice.', category: 'sushi-rolls', type: 'non-veg', basePrice: 499, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop', chefSpecial: true },
  { id: 'dragon-roll', name: 'Dragon Roll', description: 'Shrimp tempura, avocado, eel sauce with dragon scales.', category: 'sushi-rolls', type: 'non-veg', basePrice: 499, image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=600&auto=format&fit=crop' },

  // DIM SUM
  { id: 'spinach-cheese-dim-sum', name: 'Spinach Cheese Dim Sum', description: 'Steamed dim sum with wilted spinach & creamy cheese.', category: 'dim-sum', type: 'veg', basePrice: 379, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop' },
  { id: 'spicy-cheese-dim-sum', name: 'Spicy Cheese Dim Sum', description: 'Steamed dim sum with warm cheese & savory-spicy gochujang.', category: 'dim-sum', type: 'veg', basePrice: 379, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop', chefSpecial: true },
  { id: 'vegetable-gyoza', name: 'Vegetable Gyoza', description: 'Pan-fried dim sum with cabbage & garlic chives.', category: 'dim-sum', type: 'veg', basePrice: 389, image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=600&auto=format&fit=crop' },
  { id: 'truffle-edamame', name: 'Truffle Edamame', description: 'Steamed soybeans with aromatic truffle oil & sea salt.', category: 'dim-sum', type: 'veg', basePrice: 399, image: 'https://images.unsplash.com/photo-1590059599547-062e787498c0?q=80&w=600&auto=format&fit=crop', chefSpecial: true },
  { id: 'chicken-sui-mai', name: 'Chicken Sui Mai', description: 'Open-topped steamed dim sum with ground chicken.', category: 'dim-sum', type: 'non-veg', basePrice: 399, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop' },
  { id: 'chicken-gyoza', name: 'Chicken Gyoza', description: 'Japanese pan-fried dim sum with seasoned ground chicken.', category: 'dim-sum', type: 'non-veg', basePrice: 399, image: 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?q=80&w=600&auto=format&fit=crop' },
  { id: 'chicken-chilli-oil-dim-sum', name: 'Chicken Chilli Oil Dim Sum', description: 'Steamed dim sum with chicken & chilli oil infused with garlic & sesame.', category: 'dim-sum', type: 'non-veg', basePrice: 399, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop', chefSpecial: true },
  { id: 'prawn-har-gum', name: 'Prawn Har Gum', description: 'Classic steamed dumplings with seasoned shrimp.', category: 'dim-sum', type: 'non-veg', basePrice: 429, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop', chefSpecial: true },

  // RAMEN
  { id: 'bulduk-ramen', name: 'Bulduk Ramen', description: 'Korean fire ramen in deeply spicy broth with gochujang & gochugaru.', category: 'ramen', type: 'non-veg', basePrice: 349, image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=600&auto=format&fit=crop' },
  { id: 'bulduk-carbonara', name: 'Bulduk Carbonara', description: 'Creamy carbonara sauce meets Korean fire with gochujang & chilli oil.', category: 'ramen', type: 'non-veg', basePrice: 349, image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=600&auto=format&fit=crop', chefSpecial: true },
  { id: 'tantan-ramen', name: 'Tantan Ramen', description: 'Rich, nutty, spicy ramen with creamy sesame paste & chilli oil broth.', category: 'ramen', type: 'non-veg', basePrice: 379, image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=600&auto=format&fit=crop' },
  { id: 'miso-ramen', name: 'Miso Ramen', description: 'Hearty, savory ramen with fermented soybean paste broth.', category: 'ramen', type: 'non-veg', basePrice: 379, image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=600&auto=format&fit=crop' },

  // RICE DISHES
  { id: 'kimchi-rice', name: 'Kimchi Rice', description: 'Fried rice with spicy & tangy kimchi & kimchi sauce.', category: 'rice', type: 'veg', basePrice: 299, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600&auto=format&fit=crop', chefSpecial: true },
  { id: 'manchow-fried-rice', name: 'Manchow Fried Rice', description: 'Wok-tossed rice with diced vegetables, soy sauce, ginger & garlic.', category: 'rice', type: 'veg', basePrice: 299, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600&auto=format&fit=crop' },
  { id: 'teriyaki-rice', name: 'Teriyaki Rice', description: 'Steamed rice tossed with teriyaki-glazed protein or vegetables.', category: 'rice', type: 'veg', basePrice: 319, image: 'https://images.unsplash.com/photo-1601314115160-5a3d00755919?q=80&w=600&auto=format&fit=crop' },
  { id: 'niniku-yakishimi', name: 'Niniku Yakishimi', description: 'Japanese garlic rice - golden fried garlic tossed with steamed rice.', category: 'rice', type: 'veg', basePrice: 329, image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=600&auto=format&fit=crop' },
  { id: 'nasi-goreng', name: 'Nasi Goreng', description: 'Indonesian fried rice with shrimp paste, fried egg & shrimp crackers.', category: 'rice', type: 'non-veg', basePrice: 399, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop', chefSpecial: true },

  // NOODLE DISHES
  { id: 'schezuan-noodles', name: 'Schezuan Noodles', description: 'Stir-fried noodles with vegetables in aromatic Sichuan pepper sauce.', category: 'noodles', type: 'veg', basePrice: 299, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop' },
  { id: 'butter-garlic-noodles', name: 'Butter Garlic Noodles', description: 'Stir-fried noodles with indulgent melted butter, garlic & herbs.', category: 'noodles', type: 'veg', basePrice: 299, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop' },
  { id: 'thai-drunken-noodles', name: 'Thai Drunken Noodles', description: 'Wide rice noodles stir-fried with Thai basil & chilli in fiery savory sauce.', category: 'noodles', type: 'veg', basePrice: 329, image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=600&auto=format&fit=crop', chefSpecial: true },
  { id: 'japche', name: 'Japche', description: 'Korean stir-fried glass noodles with thinly sliced vegetables & savory sesame-soy glaze.', category: 'noodles', type: 'veg', basePrice: 329, image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop' },
  { id: 'pad-thai', name: 'Pad Thai', description: 'Rice noodles tossed in fiery savory sauce with roasted peanuts.', category: 'noodles', type: 'veg', basePrice: 329, image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=600&auto=format&fit=crop' },

  // ASIAN ENTREES
  { id: 'katsu-curry', name: 'Katsu Curry', description: 'Crispy panko-breaded chicken cutlet over rice in rich, mild Japanese curry sauce.', category: 'entrees', type: 'non-veg', basePrice: 449, image: 'https://images.unsplash.com/photo-1601314115160-5a3d00755919?q=80&w=600&auto=format&fit=crop' },
  { id: 'pad-krapow', name: 'Pad Krapow', description: 'Thai street-food chicken stir-fry with Thai chillies, garlic & basil in savory-sweet sauce.', category: 'entrees', type: 'non-veg', basePrice: 449, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop' },
  { id: 'thai-curry', name: 'Thai Curry', description: 'Aromatic Thai curry with coconut milk, bamboo shoots & seasonal vegetables.', category: 'entrees', type: 'veg', basePrice: 399, image: 'https://images.unsplash.com/photo-1548943487-a2e4f43b4850?q=80&w=600&auto=format&fit=crop', chefSpecial: true },
  { id: 'panang-curry', name: 'Panang Curry', description: 'Thick, aromatic curry with creamy coconut base, savory peanut flavor & subtle heat.', category: 'entrees', type: 'veg', basePrice: 399, image: 'https://images.unsplash.com/photo-1548943487-a2e4f43b4850?q=80&w=600&auto=format&fit=crop', chefSpecial: true },

  // APPETIZERS
  { id: 'spring-roll', name: 'Spring Roll', description: 'Crispy fried rolls with minced protein, vegetables & glass noodles in sweet chilli sauce.', category: 'appetizers', type: 'non-veg', basePrice: 349, image: 'https://images.unsplash.com/photo-1548508930-7e32a6e0ebc5?q=80&w=600&auto=format&fit=crop' },
  { id: 'yaki-tori', name: 'Yaki Tori', description: 'Charcoal-grilled chicken skewers glazed with teriyaki sauce.', category: 'appetizers', type: 'non-veg', basePrice: 399, image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=600&auto=format&fit=crop' },
  { id: 'korean-spicy-wings', name: 'Korean Spicy Wings', description: 'Crispy fried wings tossed in sticky, addictive glaze - sweet, spicy & savory gochujang heat.', category: 'appetizers', type: 'non-veg', basePrice: 399, image: 'https://images.unsplash.com/photo-1569691899455-88464f6d3ab1?q=80&w=600&auto=format&fit=crop' },
  { id: 'teriyaki-chicken', name: 'Teriyaki Chicken', description: 'Tender chicken basted with house-made teriyaki glaze until caramelized & sticky.', category: 'appetizers', type: 'non-veg', basePrice: 399, image: 'https://images.unsplash.com/photo-1601314115160-5a3d00755919?q=80&w=600&auto=format&fit=crop', chefSpecial: true },
  { id: 'thai-satay', name: 'Thai Satay', description: 'Coconut-milk-marinated chicken skewers grilled & served with peanut sauce.', category: 'appetizers', type: 'non-veg', basePrice: 399, image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=600&auto=format&fit=crop' },
  { id: 'phuket-fish', name: 'Phuket Fish', description: 'Signature fish appetizer.', category: 'appetizers', type: 'non-veg', basePrice: 399, image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=600&auto=format&fit=crop' },

  // VEGETARIAN APPETIZERS
  { id: 'lotus-stem-chestnut', name: 'Lotus Stem & Chestnut', description: 'Crispy fried lotus root & tendar roasted chestnuts tossed in sweet & tangy glaze.', category: 'veg-appetizers', type: 'veg', basePrice: 379, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop', chefSpecial: true },
  { id: 'tempura-veg-set', name: 'Tempura Veg Set', description: 'Light, crispy assortment of seasonal vegetables in tempura batter.', category: 'veg-appetizers', type: 'veg', basePrice: 379, image: 'https://images.unsplash.com/photo-1615361200141-f45040f367be?q=80&w=600&auto=format&fit=crop' },
  { id: 'tofu-chilly', name: 'Tofu Chilly', description: 'Silken, chilled tofu topped with vibrant sauce of minced garlic, chilli oil & soy.', category: 'veg-appetizers', type: 'veg', basePrice: 379, image: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=600&auto=format&fit=crop', chefSpecial: true },
  { id: 'paneer-chilly-basil', name: 'Paneer Chilly Basil', description: 'Golden cubes of paneer wok-fried in flary chilli & soy-based sauce with fresh basil & crisp vegetables.', category: 'veg-appetizers', type: 'veg', basePrice: 379, image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=600&auto=format&fit=crop' },

  // DESSERTS
  { id: 'wasabi-ice-cream', name: 'Wasabi Ice Cream', description: 'Wasabi flavored ice cream.', category: 'desserts', type: 'veg', basePrice: 229, image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=600&auto=format&fit=crop' },
  { id: 'matcha-ice-cream', name: 'Matcha Ice Cream', description: 'Matcha flavored ice cream.', category: 'desserts', type: 'veg', basePrice: 229, image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=600&auto=format&fit=crop' },
  { id: 'mochi-ice-cream', name: 'Mochi Ice Cream', description: 'Strawberry / Chocolate / Vanilla / Mango.', category: 'desserts', type: 'veg', basePrice: 289, image: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=600&auto=format&fit=crop' },
  { id: 'mango-sticky-rice', name: 'Mango Sticky Rice', description: 'Mango sticky rice dessert.', category: 'desserts', type: 'veg', basePrice: 299, image: 'https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?q=80&w=600&auto=format&fit=crop' },

  // BEVERAGES
  { id: 'soft-drink', name: 'Soft Drink', description: 'Assorted soft drinks.', category: 'beverages', type: 'veg', basePrice: 99, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=600&auto=format&fit=crop' },
  { id: 'lime-soda', name: 'Lime Soda', description: 'Fresh lime soda.', category: 'beverages', type: 'veg', basePrice: 149, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?q=80&w=600&auto=format&fit=crop' },
  { id: 'virgin-mojito', name: 'Virgin Mojito', description: 'Classic virgin mojito.', category: 'beverages', type: 'veg', basePrice: 199, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=600&auto=format&fit=crop' },
  { id: 'fruit-soda-float', name: 'Fruit Soda Float', description: 'Yuzu / Peach / Passion Fruit / Mango / Pineapple / Water Melon.', category: 'beverages', type: 'veg', basePrice: 249, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=600&auto=format&fit=crop' },
  { id: 'matcha-soda-float', name: 'Matcha Soda Float', description: 'Matcha soda float.', category: 'beverages', type: 'veg', basePrice: 299, image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?q=80&w=600&auto=format&fit=crop' },
  { id: 'thai-tea', name: 'Thai Tea', description: 'Classic Thai iced tea.', category: 'beverages', type: 'veg', basePrice: 299, image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=600&auto=format&fit=crop' },
  { id: 'boba-tea', name: 'Boba Tea', description: 'Classic milk boba tea.', category: 'beverages', type: 'veg', basePrice: 349, image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=600&auto=format&fit=crop' },
  { id: 'thai-tea-boba-tea', name: 'Thai Tea Boba Tea', description: 'Thai tea with boba pearls.', category: 'beverages', type: 'veg', basePrice: 349, image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=600&auto=format&fit=crop' },
  { id: 'matcha-boba', name: 'Matcha Boba', description: 'Matcha milk tea with boba pearls.', category: 'beverages', type: 'veg', basePrice: 349, image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=600&auto=format&fit=crop' },
  { id: 'fruit-boba', name: 'Fruit Boba', description: 'Yuzu / Peach / Passion Fruit / Mango / Water Melon / Pine Apple.', category: 'beverages', type: 'veg', basePrice: 349, image: 'https://images.unsplash.com/photo-1558160074-4d7d8bdf4256?q=80&w=600&auto=format&fit=crop' },
];

const categories = [
  { id: 'soups', label: 'Soups', icon: '🍲', sortOrder: 1 },
  { id: 'salads', label: 'Salads', icon: '🥗', sortOrder: 2 },
  { id: 'onigiri', label: 'Onigiri', icon: '🍙', sortOrder: 3 },
  { id: 'nigiri', label: 'Nigiri', icon: '🍣', sortOrder: 4 },
  { id: 'sushi-rolls-veg', label: 'Veg Sushi Rolls', icon: '🥑', sortOrder: 5 },
  { id: 'sushi-rolls', label: 'Sushi Rolls', icon: '🍣', sortOrder: 6 },
  { id: 'dim-sum', label: 'Dim Sum', icon: '🥟', sortOrder: 7 },
  { id: 'ramen', label: 'Ramen', icon: '🍜', sortOrder: 8 },
  { id: 'rice', label: 'Rice Dishes', icon: '🍚', sortOrder: 9 },
  { id: 'noodles', label: 'Noodles', icon: '🍝', sortOrder: 10 },
  { id: 'entrees', label: 'Asian Entrees', icon: '🍛', sortOrder: 11 },
  { id: 'appetizers', label: 'Appetizers', icon: '🍤', sortOrder: 12 },
  { id: 'veg-appetizers', label: 'Veg Appetizers', icon: '🥬', sortOrder: 13 },
  { id: 'desserts', label: 'Desserts', icon: '🍨', sortOrder: 14 },
  { id: 'beverages', label: 'Beverages', icon: '🥤', sortOrder: 15 },
];

const fileContent = `export const CATEGORIES = ${JSON.stringify(categories, null, 2)};

export const MENU_ITEMS = ${JSON.stringify(items.map((i, index) => ({ ...i, available: true, sortOrder: index + 1 })), null, 2)};

export default MENU_ITEMS;
`;

fs.writeFileSync('src/data/menu.js', fileContent);
console.log('menu.js generated successfully');
