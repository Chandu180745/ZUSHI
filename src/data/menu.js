export const CATEGORIES = [
  {
    "id": "soups",
    "label": "Soups",
    "icon": "🍲",
    "sortOrder": 1
  },
  {
    "id": "salads",
    "label": "Salads",
    "icon": "🥗",
    "sortOrder": 2
  },
  {
    "id": "onigiri",
    "label": "Onigiri",
    "icon": "🍙",
    "sortOrder": 3
  },
  {
    "id": "nigiri",
    "label": "Nigiri",
    "icon": "🍣",
    "sortOrder": 4
  },
  {
    "id": "sushi-rolls-veg",
    "label": "Veg Sushi Rolls",
    "icon": "🥑",
    "sortOrder": 5
  },
  {
    "id": "sushi-rolls",
    "label": "Sushi Rolls",
    "icon": "🍣",
    "sortOrder": 6
  },
  {
    "id": "dim-sum",
    "label": "Dim Sum",
    "icon": "🥟",
    "sortOrder": 7
  },
  {
    "id": "ramen",
    "label": "Ramen",
    "icon": "🍜",
    "sortOrder": 8
  },
  {
    "id": "rice",
    "label": "Rice Dishes",
    "icon": "🍚",
    "sortOrder": 9
  },
  {
    "id": "noodles",
    "label": "Noodles",
    "icon": "🍝",
    "sortOrder": 10
  },
  {
    "id": "entrees",
    "label": "Asian Entrees",
    "icon": "🍛",
    "sortOrder": 11
  },
  {
    "id": "appetizers",
    "label": "Appetizers",
    "icon": "🍤",
    "sortOrder": 12
  },
  {
    "id": "veg-appetizers",
    "label": "Veg Appetizers",
    "icon": "🥬",
    "sortOrder": 13
  },
  {
    "id": "desserts",
    "label": "Desserts",
    "icon": "🍨",
    "sortOrder": 14
  },
  {
    "id": "beverages",
    "label": "Beverages",
    "icon": "🥤",
    "sortOrder": 15
  }
];

export const MENU_ITEMS = [
  {
    "id": "miso-dashi",
    "name": "Miso Dashi",
    "description": "Savory broth from fermented soybean paste and Kombu seaweed stock.",
    "category": "soups",
    "type": "veg",
    "image": "/images/miso_dashi.jpg",
    "basePrice": 199,
    "variants": [
      {
        "id": "veg",
        "name": "Veg",
        "price": 199,
        "available": true
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 229,
        "available": true
      },
      {
        "id": "seafood",
        "name": "Seafood",
        "price": 249,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 1
  },
  {
    "id": "crab-meat-soup",
    "name": "Crab Meat Soup",
    "description": "Rich, warming soup infused with ginger and garnished with fresh cilantro.",
    "category": "soups",
    "type": "non-veg",
    "basePrice": 249,
    "image": "/images/crab_meat_soup.jpg",
    "available": true,
    "sortOrder": 2
  },
  {
    "id": "tom-kha-gai",
    "name": "Tom Kha Gai",
    "description": "Classic Thai coconut soup with vegetables/meat and lemongrass in creamy broth.",
    "category": "soups",
    "type": "non-veg",
    "image": "/images/tom_kha_gai.jpg",
    "chefSpecial": true,
    "basePrice": 219,
    "variants": [
      {
        "id": "veg",
        "name": "Veg",
        "price": 219,
        "available": true
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 249,
        "available": true
      },
      {
        "id": "seafood",
        "name": "Seafood",
        "price": 289,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 3
  },
  {
    "id": "raw-papaya-salad",
    "name": "Raw Papaya Salad",
    "description": "Shredded papaya & cherry tomatoes with chili, lime & roasted peanuts.",
    "category": "salads",
    "type": "veg",
    "basePrice": 249,
    "image": "/images/raw_papaya_salad.jpg",
    "chefSpecial": true,
    "available": true,
    "sortOrder": 4
  },
  {
    "id": "thai-herb-cucumber-salad",
    "name": "Thai Herb & Cucumber Salad",
    "description": "Cucumber, fresh mint, cilantro & Thai herbs.",
    "category": "salads",
    "type": "veg",
    "basePrice": 249,
    "image": "/images/thai_herb_salad.jpg",
    "available": true,
    "sortOrder": 5
  },
  {
    "id": "kani-salad",
    "name": "Kani Salad",
    "description": "Shredded crab stick & crisp cucumber in creamy Kewpie mayonnaise.",
    "category": "salads",
    "type": "non-veg",
    "basePrice": 289,
    "image": "/images/kani_salad.jpg",
    "available": true,
    "sortOrder": 6
  },
  {
    "id": "tofu-mayo-onigiri",
    "name": "Tofu Mayo Onigiri",
    "description": "Rice balls with creamy soft tofu & Japanese mayo.",
    "category": "onigiri",
    "type": "veg",
    "basePrice": 499,
    "image": "/images/tofu_mayo_onigiri.jpg",
    "available": true,
    "sortOrder": 7
  },
  {
    "id": "kimchi-mayo-onigiri",
    "name": "Kimchi Mayo",
    "description": "Rice balls with tangy spicy kimchi & rich mayo.",
    "category": "onigiri",
    "type": "veg",
    "basePrice": 499,
    "image": "/images/kimchi_mayo_onigiri.jpg",
    "available": true,
    "sortOrder": 8
  },
  {
    "id": "prawn-onigiri",
    "name": "Prawn Onigiri",
    "description": "Rice balls with savory prawns seasoned with soy & sesame.",
    "category": "onigiri",
    "type": "non-veg",
    "basePrice": 549,
    "image": "/images/prawn_onigiri.jpg",
    "available": true,
    "sortOrder": 9
  },
  {
    "id": "tuna-mayo-onigiri",
    "name": "Tuna Mayo",
    "description": "Rice balls with flaked cooked tuna & Japanese mayo.",
    "category": "onigiri",
    "type": "non-veg",
    "basePrice": 569,
    "image": "/images/tuna_mayo_onigiri.jpg",
    "available": true,
    "sortOrder": 10
  },
  {
    "id": "spicy-tuna-mayo-onigiri",
    "name": "Spicy Tuna Mayo",
    "description": "Rice balls with flaked tuna & creamy spicy mayo.",
    "category": "onigiri",
    "type": "non-veg",
    "basePrice": 599,
    "image": "/images/spicy_tuna_mayo_onigiri.jpg",
    "chefSpecial": true,
    "available": true,
    "sortOrder": 11
  },
  {
    "id": "salmon-mayo-onigiri",
    "name": "Salmon Mayo",
    "description": "Rice balls with flaked cooked salmon & mayonnaise.",
    "category": "onigiri",
    "type": "non-veg",
    "basePrice": 599,
    "image": "/images/salmon_mayo_onigiri.jpg",
    "available": true,
    "sortOrder": 12
  },
  {
    "id": "salmon-nigiri",
    "name": "Salmon Nigiri",
    "description": "Rich, buttery orange salmon over vinegared rice.",
    "category": "nigiri",
    "type": "non-veg",
    "image": "/images/salmon_nigiri.jpg",
    "basePrice": 749,
    "variants": [
      {
        "id": "3pc",
        "name": "3 pc",
        "price": 749,
        "available": true
      },
      {
        "id": "5pc",
        "name": "5 pc",
        "price": 999,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 13
  },
  {
    "id": "tuna-nigiri",
    "name": "Tuna Nigiri",
    "description": "Lean tuna over vinegared rice.",
    "category": "nigiri",
    "type": "non-veg",
    "image": "/images/tuna_nigiri.jpg",
    "basePrice": 749,
    "variants": [
      {
        "id": "3pc",
        "name": "3 pc",
        "price": 749,
        "available": true
      },
      {
        "id": "5pc",
        "name": "5 pc",
        "price": 999,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 14
  },
  {
    "id": "asparagus-maki",
    "name": "Asparagus Maki",
    "description": "Fresh asparagus wrapped in nori.",
    "category": "sushi-rolls-veg",
    "type": "veg",
    "image": "/images/asparagus_maki.jpg",
    "basePrice": 449,
    "variants": [
      {
        "id": "4pc",
        "name": "4 pc",
        "price": 449,
        "available": true
      },
      {
        "id": "8pc",
        "name": "8 pc",
        "price": 699,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 15
  },
  {
    "id": "tofu-crunchy-roll",
    "name": "Tofu Crunchy Roll",
    "description": "Crispy fried tofu, cucumber & avocado with tempura bits.",
    "category": "sushi-rolls-veg",
    "type": "veg",
    "image": "/images/tofu_crunchy_roll.jpg",
    "basePrice": 449,
    "variants": [
      {
        "id": "4pc",
        "name": "4 pc",
        "price": 449,
        "available": true
      },
      {
        "id": "8pc",
        "name": "8 pc",
        "price": 699,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 16
  },
  {
    "id": "avocado-cheese-roll",
    "name": "Avocado Cheese Roll",
    "description": "Creamy avocado & cream cheese wrapped in rice & nori.",
    "category": "sushi-rolls-veg",
    "type": "veg",
    "image": "/images/avocado_cheese_roll.jpg",
    "chefSpecial": true,
    "basePrice": 499,
    "variants": [
      {
        "id": "4pc",
        "name": "4 pc",
        "price": 499,
        "available": true
      },
      {
        "id": "8pc",
        "name": "8 pc",
        "price": 749,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 17
  },
  {
    "id": "shiitake-gimbap",
    "name": "Shiitake Gimbap",
    "description": "Korean-style rice rolls with shiitake mushrooms, spinach, danmuji.",
    "category": "sushi-rolls-veg",
    "type": "veg",
    "image": "/images/shiitake_gimbap.jpg",
    "basePrice": 499,
    "variants": [
      {
        "id": "4pc",
        "name": "4 pc",
        "price": 499,
        "available": true
      },
      {
        "id": "8pc",
        "name": "8 pc",
        "price": 749,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 18
  },
  {
    "id": "zushi-sushi-platter-veg",
    "name": "Zushi Sushi Platter (Veg)",
    "description": "Mixed vegetarian selection.",
    "category": "sushi-rolls-veg",
    "type": "veg",
    "image": "/images/zushi_sushi_platter_veg.jpg",
    "basePrice": 1999,
    "variants": [
      {
        "id": "16pc",
        "name": "16 pc",
        "price": 1999,
        "available": true
      },
      {
        "id": "24pc",
        "name": "24 pc",
        "price": 3499,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 19
  },
  {
    "id": "maki-roll",
    "name": "Maki Roll",
    "description": "Traditional thin rolls with filling of choice.",
    "category": "sushi-rolls",
    "type": "non-veg",
    "image": "/images/maki_roll.jpg",
    "chefSpecial": true,
    "basePrice": 499,
    "variants": [
      {
        "id": "salmon-4pc",
        "name": "Salmon (4 pc)",
        "price": 499,
        "available": true
      },
      {
        "id": "salmon-8pc",
        "name": "Salmon (8 pc)",
        "price": 849,
        "available": true
      },
      {
        "id": "tuna-4pc",
        "name": "Tuna (4 pc)",
        "price": 499,
        "available": true
      },
      {
        "id": "tuna-8pc",
        "name": "Tuna (8 pc)",
        "price": 849,
        "available": true
      },
      {
        "id": "hamachi-4pc",
        "name": "Hamachi (4 pc)",
        "price": 549,
        "available": true
      },
      {
        "id": "hamachi-8pc",
        "name": "Hamachi (8 pc)",
        "price": 899,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 20
  },
  {
    "id": "dragon-roll",
    "name": "Dragon Roll",
    "description": "Shrimp tempura, avocado, eel sauce with dragon scales.",
    "category": "sushi-rolls",
    "type": "non-veg",
    "image": "/images/dragon_roll.jpg",
    "basePrice": 499,
    "variants": [
      {
        "id": "4pc",
        "name": "4 pc",
        "price": 499,
        "available": true
      },
      {
        "id": "8pc",
        "name": "8 pc",
        "price": 799,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 21
  },
  {
    "id": "spinach-cheese-dim-sum",
    "name": "Spinach Cheese Dim Sum",
    "description": "Steamed dim sum with wilted spinach & creamy cheese.",
    "category": "dim-sum",
    "type": "veg",
    "basePrice": 379,
    "image": "/images/spinach_cheese_dim_sum.jpg",
    "available": true,
    "sortOrder": 22
  },
  {
    "id": "spicy-cheese-dim-sum",
    "name": "Spicy Cheese Dim Sum",
    "description": "Steamed dim sum with warm cheese & savory-spicy gochujang.",
    "category": "dim-sum",
    "type": "veg",
    "basePrice": 379,
    "image": "/images/spicy_cheese_dim_sum.jpg",
    "chefSpecial": true,
    "available": true,
    "sortOrder": 23
  },
  {
    "id": "vegetable-gyoza",
    "name": "Vegetable Gyoza",
    "description": "Pan-fried dim sum with cabbage & garlic chives.",
    "category": "dim-sum",
    "type": "veg",
    "basePrice": 389,
    "image": "/images/vegetable_gyoza.jpg",
    "available": true,
    "sortOrder": 24
  },
  {
    "id": "truffle-edamame",
    "name": "Truffle Edamame",
    "description": "Steamed soybeans with aromatic truffle oil & sea salt.",
    "category": "dim-sum",
    "type": "veg",
    "basePrice": 399,
    "image": "/images/truffle_edamame.jpg",
    "chefSpecial": true,
    "available": true,
    "sortOrder": 25
  },
  {
    "id": "chicken-sui-mai",
    "name": "Chicken Sui Mai",
    "description": "Open-topped steamed dim sum with ground chicken.",
    "category": "dim-sum",
    "type": "non-veg",
    "basePrice": 399,
    "image": "/images/chicken_sui_mai.jpg",
    "available": true,
    "sortOrder": 26
  },
  {
    "id": "chicken-gyoza",
    "name": "Chicken Gyoza",
    "description": "Japanese pan-fried dim sum with seasoned ground chicken.",
    "category": "dim-sum",
    "type": "non-veg",
    "basePrice": 399,
    "image": "/images/chicken_gyoza.jpg",
    "available": true,
    "sortOrder": 27
  },
  {
    "id": "chicken-chilli-oil-dim-sum",
    "name": "Chicken Chilli Oil Dim Sum",
    "description": "Steamed dim sum with chicken & chilli oil infused with garlic & sesame.",
    "category": "dim-sum",
    "type": "non-veg",
    "basePrice": 399,
    "image": "/images/chicken_chilli_oil_dim_sum.jpg",
    "chefSpecial": true,
    "available": true,
    "sortOrder": 28
  },
  {
    "id": "prawn-har-gum",
    "name": "Prawn Har Gum",
    "description": "Classic steamed dumplings with seasoned shrimp.",
    "category": "dim-sum",
    "type": "non-veg",
    "basePrice": 429,
    "image": "/images/prawn_har_gum.jpg",
    "chefSpecial": true,
    "available": true,
    "sortOrder": 29
  },
  {
    "id": "bulduk-ramen",
    "name": "Bulduk Ramen",
    "description": "Korean fire ramen in deeply spicy broth with gochujang & gochugaru.",
    "category": "ramen",
    "type": "non-veg",
    "image": "/images/bulduk_ramen.jpg",
    "basePrice": 349,
    "variants": [
      {
        "id": "veg",
        "name": "Veg",
        "price": 349,
        "available": true
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 389,
        "available": true
      },
      {
        "id": "fish",
        "name": "Fish",
        "price": 399,
        "available": true
      },
      {
        "id": "shrimp",
        "name": "Shrimp",
        "price": 399,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 30
  },
  {
    "id": "bulduk-carbonara",
    "name": "Bulduk Carbonara",
    "description": "Creamy carbonara sauce meets Korean fire with gochujang & chilli oil.",
    "category": "ramen",
    "type": "non-veg",
    "image": "/images/bulduk_carbonara.jpg",
    "chefSpecial": true,
    "basePrice": 349,
    "variants": [
      {
        "id": "veg",
        "name": "Veg",
        "price": 349,
        "available": true
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 389,
        "available": true
      },
      {
        "id": "fish",
        "name": "Fish",
        "price": 399,
        "available": true
      },
      {
        "id": "shrimp",
        "name": "Shrimp",
        "price": 399,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 31
  },
  {
    "id": "tantan-ramen",
    "name": "Tantan Ramen",
    "description": "Rich, nutty, spicy ramen with creamy sesame paste & chilli oil broth.",
    "category": "ramen",
    "type": "non-veg",
    "image": "/images/tantan_ramen.jpg",
    "basePrice": 379,
    "variants": [
      {
        "id": "veg",
        "name": "Veg",
        "price": 379,
        "available": true
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 429,
        "available": true
      },
      {
        "id": "fish",
        "name": "Fish",
        "price": 439,
        "available": true
      },
      {
        "id": "shrimp",
        "name": "Shrimp",
        "price": 449,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 32
  },
  {
    "id": "miso-ramen",
    "name": "Miso Ramen",
    "description": "Hearty, savory ramen with fermented soybean paste broth.",
    "category": "ramen",
    "type": "non-veg",
    "image": "/images/miso_ramen.jpg",
    "basePrice": 379,
    "variants": [
      {
        "id": "veg",
        "name": "Veg",
        "price": 379,
        "available": true
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 429,
        "available": true
      },
      {
        "id": "fish",
        "name": "Fish",
        "price": 439,
        "available": true
      },
      {
        "id": "shrimp",
        "name": "Shrimp",
        "price": 449,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 33
  },
  {
    "id": "kimchi-rice",
    "name": "Kimchi Rice",
    "description": "Fried rice with spicy & tangy kimchi & kimchi sauce.",
    "category": "rice",
    "type": "veg",
    "image": "/images/kimchi_rice.jpg",
    "chefSpecial": true,
    "basePrice": 299,
    "variants": [
      {
        "id": "veg",
        "name": "Veg",
        "price": 299,
        "available": true
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 329,
        "available": true
      },
      {
        "id": "fish",
        "name": "Fish",
        "price": 349,
        "available": true
      },
      {
        "id": "shrimp",
        "name": "Shrimp",
        "price": 379,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 34
  },
  {
    "id": "manchow-fried-rice",
    "name": "Manchow Fried Rice",
    "description": "Wok-tossed rice with diced vegetables, soy sauce, ginger & garlic.",
    "category": "rice",
    "type": "veg",
    "image": "/images/manchow_fried_rice.jpg",
    "basePrice": 299,
    "variants": [
      {
        "id": "veg",
        "name": "Veg",
        "price": 299,
        "available": true
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 349,
        "available": true
      },
      {
        "id": "fish",
        "name": "Fish",
        "price": 379,
        "available": true
      },
      {
        "id": "shrimp",
        "name": "Shrimp",
        "price": 389,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 35
  },
  {
    "id": "teriyaki-rice",
    "name": "Teriyaki Rice",
    "description": "Steamed rice tossed with teriyaki-glazed protein or vegetables.",
    "category": "rice",
    "type": "veg",
    "image": "/images/teriyaki_rice.jpg",
    "basePrice": 319,
    "variants": [
      {
        "id": "veg",
        "name": "Veg",
        "price": 319,
        "available": true
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 349,
        "available": true
      },
      {
        "id": "fish",
        "name": "Fish",
        "price": 389,
        "available": true
      },
      {
        "id": "shrimp",
        "name": "Shrimp",
        "price": 389,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 36
  },
  {
    "id": "niniku-yakishimi",
    "name": "Niniku Yakishimi",
    "description": "Japanese garlic rice - golden fried garlic tossed with steamed rice.",
    "category": "rice",
    "type": "veg",
    "image": "/images/niniku_yakishimi.jpg",
    "basePrice": 329,
    "variants": [
      {
        "id": "veg",
        "name": "Veg",
        "price": 329,
        "available": true
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 379,
        "available": true
      },
      {
        "id": "fish",
        "name": "Fish",
        "price": 399,
        "available": true
      },
      {
        "id": "shrimp",
        "name": "Shrimp",
        "price": 399,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 37
  },
  {
    "id": "nasi-goreng",
    "name": "Nasi Goreng",
    "description": "Indonesian fried rice with shrimp paste, fried egg & shrimp crackers.",
    "category": "rice",
    "type": "non-veg",
    "image": "/images/nasi_goreng.jpg",
    "chefSpecial": true,
    "basePrice": 399,
    "variants": [
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 399,
        "available": true
      },
      {
        "id": "fish",
        "name": "Fish",
        "price": 439,
        "available": true
      },
      {
        "id": "shrimp",
        "name": "Shrimp",
        "price": 449,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 38
  },
  {
    "id": "schezuan-noodles",
    "name": "Schezuan Noodles",
    "description": "Stir-fried noodles with vegetables in aromatic Sichuan pepper sauce.",
    "category": "noodles",
    "type": "veg",
    "image": "/images/schezuan_noodles.jpg",
    "basePrice": 299,
    "variants": [
      {
        "id": "veg",
        "name": "Veg",
        "price": 299,
        "available": true
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 329,
        "available": true
      },
      {
        "id": "fish",
        "name": "Fish",
        "price": 379,
        "available": true
      },
      {
        "id": "shrimp",
        "name": "Shrimp",
        "price": 349,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 39
  },
  {
    "id": "butter-garlic-noodles",
    "name": "Butter Garlic Noodles",
    "description": "Stir-fried noodles with indulgent melted butter, garlic & herbs.",
    "category": "noodles",
    "type": "veg",
    "image": "/images/butter_garlic_noodles.jpg",
    "basePrice": 299,
    "variants": [
      {
        "id": "veg",
        "name": "Veg",
        "price": 299,
        "available": true
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 329,
        "available": true
      },
      {
        "id": "fish",
        "name": "Fish",
        "price": 379,
        "available": true
      },
      {
        "id": "shrimp",
        "name": "Shrimp",
        "price": 389,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 40
  },
  {
    "id": "thai-drunken-noodles",
    "name": "Thai Drunken Noodles",
    "description": "Wide rice noodles stir-fried with Thai basil & chilli in fiery savory sauce.",
    "category": "noodles",
    "type": "veg",
    "image": "/images/thai_drunken_noodles.jpg",
    "chefSpecial": true,
    "basePrice": 329,
    "variants": [
      {
        "id": "veg",
        "name": "Veg",
        "price": 329,
        "available": true
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 349,
        "available": true
      },
      {
        "id": "fish",
        "name": "Fish",
        "price": 379,
        "available": true
      },
      {
        "id": "shrimp",
        "name": "Shrimp",
        "price": 389,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 41
  },
  {
    "id": "japche",
    "name": "Japche",
    "description": "Korean stir-fried glass noodles with thinly sliced vegetables & savory sesame-soy glaze.",
    "category": "noodles",
    "type": "veg",
    "image": "/images/japche.jpg",
    "basePrice": 329,
    "variants": [
      {
        "id": "veg",
        "name": "Veg",
        "price": 329,
        "available": true
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 349,
        "available": true
      },
      {
        "id": "fish",
        "name": "Fish",
        "price": 379,
        "available": true
      },
      {
        "id": "shrimp",
        "name": "Shrimp",
        "price": 389,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 42
  },
  {
    "id": "pad-thai",
    "name": "Pad Thai",
    "description": "Rice noodles tossed in fiery savory sauce with roasted peanuts.",
    "category": "noodles",
    "type": "veg",
    "image": "/images/pad_thai.jpg",
    "basePrice": 329,
    "variants": [
      {
        "id": "veg",
        "name": "Veg",
        "price": 329,
        "available": true
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 359,
        "available": true
      },
      {
        "id": "fish",
        "name": "Fish",
        "price": 399,
        "available": true
      },
      {
        "id": "shrimp",
        "name": "Shrimp",
        "price": 399,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 43
  },
  {
    "id": "katsu-curry",
    "name": "Katsu Curry",
    "description": "Crispy panko-breaded chicken cutlet over rice in rich, mild Japanese curry sauce.",
    "category": "entrees",
    "type": "non-veg",
    "basePrice": 449,
    "image": "/images/katsu_curry.jpg",
    "available": true,
    "sortOrder": 44
  },
  {
    "id": "pad-krapow",
    "name": "Pad Krapow",
    "description": "Thai street-food chicken stir-fry with Thai chillies, garlic & basil in savory-sweet sauce.",
    "category": "entrees",
    "type": "non-veg",
    "basePrice": 449,
    "image": "/images/pad_krapow.jpg",
    "available": true,
    "sortOrder": 45
  },
  {
    "id": "thai-curry",
    "name": "Thai Curry",
    "description": "Aromatic Thai curry with coconut milk, bamboo shoots & seasonal vegetables.",
    "category": "entrees",
    "type": "veg",
    "image": "/images/thai_curry.jpg",
    "chefSpecial": true,
    "basePrice": 399,
    "variants": [
      {
        "id": "veg",
        "name": "Veg",
        "price": 399,
        "available": true
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 449,
        "available": true
      },
      {
        "id": "fish",
        "name": "Fish",
        "price": 489,
        "available": true
      },
      {
        "id": "shrimp",
        "name": "Shrimp",
        "price": 499,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 46
  },
  {
    "id": "panang-curry",
    "name": "Panang Curry",
    "description": "Thick, aromatic curry with creamy coconut base, savory peanut flavor & subtle heat.",
    "category": "entrees",
    "type": "veg",
    "image": "/images/panang_curry.jpg",
    "chefSpecial": true,
    "basePrice": 399,
    "variants": [
      {
        "id": "veg",
        "name": "Veg",
        "price": 399,
        "available": true
      },
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 449,
        "available": true
      },
      {
        "id": "fish",
        "name": "Fish",
        "price": 489,
        "available": true
      },
      {
        "id": "shrimp",
        "name": "Shrimp",
        "price": 499,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 47
  },
  {
    "id": "spring-roll",
    "name": "Spring Roll",
    "description": "Crispy fried rolls with minced protein, vegetables & glass noodles in sweet chilli sauce.",
    "category": "appetizers",
    "type": "non-veg",
    "image": "/images/spring_roll.jpg",
    "basePrice": 349,
    "variants": [
      {
        "id": "chicken",
        "name": "Chicken",
        "price": 349,
        "available": true
      },
      {
        "id": "prawn",
        "name": "Prawn",
        "price": 399,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 48
  },
  {
    "id": "yaki-tori",
    "name": "Yaki Tori",
    "description": "Charcoal-grilled chicken skewers glazed with teriyaki sauce.",
    "category": "appetizers",
    "type": "non-veg",
    "basePrice": 399,
    "image": "/images/yaki_tori.jpg",
    "available": true,
    "sortOrder": 49
  },
  {
    "id": "korean-spicy-wings",
    "name": "Korean Spicy Wings",
    "description": "Crispy fried wings tossed in sticky, addictive glaze - sweet, spicy & savory gochujang heat.",
    "category": "appetizers",
    "type": "non-veg",
    "basePrice": 399,
    "image": "/images/korean_spicy_wings.jpg",
    "available": true,
    "sortOrder": 50
  },
  {
    "id": "teriyaki-chicken",
    "name": "Teriyaki Chicken",
    "description": "Tender chicken basted with house-made teriyaki glaze until caramelized & sticky.",
    "category": "appetizers",
    "type": "non-veg",
    "basePrice": 399,
    "image": "/images/teriyaki_chicken.jpg",
    "chefSpecial": true,
    "available": true,
    "sortOrder": 51
  },
  {
    "id": "thai-satay",
    "name": "Thai Satay",
    "description": "Coconut-milk-marinated chicken skewers grilled & served with peanut sauce.",
    "category": "appetizers",
    "type": "non-veg",
    "basePrice": 399,
    "image": "/images/thai_satay.jpg",
    "available": true,
    "sortOrder": 52
  },
  {
    "id": "phuket-fish",
    "name": "Phuket Fish",
    "description": "Signature fish appetizer.",
    "category": "appetizers",
    "type": "non-veg",
    "basePrice": 399,
    "image": "/images/phuket_fish.jpg",
    "available": true,
    "sortOrder": 53
  },
  {
    "id": "lotus-stem-chestnut",
    "name": "Lotus Stem & Chestnut",
    "description": "Crispy fried lotus root & tendar roasted chestnuts tossed in sweet & tangy glaze.",
    "category": "veg-appetizers",
    "type": "veg",
    "basePrice": 379,
    "image": "/images/lotus_stem_chestnut.jpg",
    "chefSpecial": true,
    "available": true,
    "sortOrder": 54
  },
  {
    "id": "tempura-veg-set",
    "name": "Tempura Veg Set",
    "description": "Light, crispy assortment of seasonal vegetables in tempura batter.",
    "category": "veg-appetizers",
    "type": "veg",
    "basePrice": 379,
    "image": "/images/tempura_veg_set.jpg",
    "available": true,
    "sortOrder": 55
  },
  {
    "id": "tofu-chilly",
    "name": "Tofu Chilly",
    "description": "Silken, chilled tofu topped with vibrant sauce of minced garlic, chilli oil & soy.",
    "category": "veg-appetizers",
    "type": "veg",
    "basePrice": 379,
    "image": "/images/tofu_chilly.jpg",
    "chefSpecial": true,
    "available": true,
    "sortOrder": 56
  },
  {
    "id": "paneer-chilly-basil",
    "name": "Paneer Chilly Basil",
    "description": "Golden cubes of paneer wok-fried in flary chilli & soy-based sauce with fresh basil & crisp vegetables.",
    "category": "veg-appetizers",
    "type": "veg",
    "basePrice": 379,
    "image": "/images/paneer_chilly_basil.jpg",
    "available": true,
    "sortOrder": 57
  },
  {
    "id": "wasabi-ice-cream",
    "name": "Wasabi Ice Cream",
    "description": "Wasabi flavored ice cream.",
    "category": "desserts",
    "type": "veg",
    "basePrice": 229,
    "image": "/images/wasabi_ice_cream.jpg",
    "available": true,
    "sortOrder": 58
  },
  {
    "id": "matcha-ice-cream",
    "name": "Matcha Ice Cream",
    "description": "Matcha flavored ice cream.",
    "category": "desserts",
    "type": "veg",
    "basePrice": 229,
    "image": "/images/matcha_ice_cream.jpg",
    "available": true,
    "sortOrder": 59
  },
  {
    "id": "mochi-ice-cream",
    "name": "Mochi Ice Cream",
    "description": "Assorted flavors.",
    "category": "desserts",
    "type": "veg",
    "basePrice": 289,
    "image": "/images/mochi_ice_cream.jpg",
    "variants": [
      {
        "id": "strawberry",
        "name": "Strawberry",
        "price": 289,
        "available": true
      },
      {
        "id": "chocolate",
        "name": "Chocolate",
        "price": 289,
        "available": true
      },
      {
        "id": "vanilla",
        "name": "Vanilla",
        "price": 289,
        "available": true
      },
      {
        "id": "mango",
        "name": "Mango",
        "price": 289,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 60
  },
  {
    "id": "mango-sticky-rice",
    "name": "Mango Sticky Rice",
    "description": "Mango sticky rice dessert.",
    "category": "desserts",
    "type": "veg",
    "basePrice": 299,
    "image": "/images/mango_sticky_rice.jpg",
    "available": true,
    "sortOrder": 61
  },
  {
    "id": "soft-drink",
    "name": "Soft Drink",
    "description": "Assorted soft drinks.",
    "category": "beverages",
    "type": "veg",
    "basePrice": 99,
    "image": "/images/soft_drink.jpg",
    "available": true,
    "sortOrder": 62
  },
  {
    "id": "lime-soda",
    "name": "Lime Soda",
    "description": "Fresh lime soda.",
    "category": "beverages",
    "type": "veg",
    "basePrice": 149,
    "image": "/images/lime_soda.jpg",
    "available": true,
    "sortOrder": 63
  },
  {
    "id": "virgin-mojito",
    "name": "Virgin Mojito",
    "description": "Classic virgin mojito.",
    "category": "beverages",
    "type": "veg",
    "basePrice": 199,
    "image": "/images/virgin_mojito.jpg",
    "available": true,
    "sortOrder": 64
  },
  {
    "id": "fruit-soda-float",
    "name": "Fruit Soda Float",
    "description": "Fruit flavored soda floats.",
    "category": "beverages",
    "type": "veg",
    "basePrice": 249,
    "image": "/images/fruit_soda_float.jpg",
    "variants": [
      {
        "id": "yuzu",
        "name": "Yuzu",
        "price": 249,
        "available": true
      },
      {
        "id": "peach",
        "name": "Peach",
        "price": 249,
        "available": true
      },
      {
        "id": "passion-fruit",
        "name": "Passion Fruit",
        "price": 249,
        "available": true
      },
      {
        "id": "mango",
        "name": "Mango",
        "price": 249,
        "available": true
      },
      {
        "id": "pineapple",
        "name": "Pineapple",
        "price": 249,
        "available": true
      },
      {
        "id": "watermelon",
        "name": "Watermelon",
        "price": 249,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 65
  },
  {
    "id": "matcha-soda-float",
    "name": "Matcha Soda Float",
    "description": "Matcha soda float.",
    "category": "beverages",
    "type": "veg",
    "basePrice": 299,
    "image": "/images/matcha_soda_float.jpg",
    "available": true,
    "sortOrder": 66
  },
  {
    "id": "thai-tea",
    "name": "Thai Tea",
    "description": "Classic Thai iced tea.",
    "category": "beverages",
    "type": "veg",
    "basePrice": 299,
    "image": "/images/thai_tea.jpg",
    "available": true,
    "sortOrder": 67
  },
  {
    "id": "boba-tea",
    "name": "Boba Tea",
    "description": "Classic milk boba tea.",
    "category": "beverages",
    "type": "veg",
    "basePrice": 349,
    "image": "/images/boba_tea.jpg",
    "available": true,
    "sortOrder": 68
  },
  {
    "id": "thai-tea-boba-tea",
    "name": "Thai Tea Boba Tea",
    "description": "Thai tea with boba pearls.",
    "category": "beverages",
    "type": "veg",
    "basePrice": 349,
    "image": "/images/thai_tea_boba_tea.jpg",
    "available": true,
    "sortOrder": 69
  },
  {
    "id": "matcha-boba",
    "name": "Matcha Boba",
    "description": "Matcha milk tea with boba pearls.",
    "category": "beverages",
    "type": "veg",
    "basePrice": 349,
    "image": "/images/matcha_boba.jpg",
    "available": true,
    "sortOrder": 70
  },
  {
    "id": "fruit-boba",
    "name": "Fruit Boba",
    "description": "Fruit flavored boba tea.",
    "category": "beverages",
    "type": "veg",
    "basePrice": 349,
    "image": "/images/fruit_boba.jpg",
    "variants": [
      {
        "id": "yuzu",
        "name": "Yuzu",
        "price": 349,
        "available": true
      },
      {
        "id": "peach",
        "name": "Peach",
        "price": 349,
        "available": true
      },
      {
        "id": "passion-fruit",
        "name": "Passion Fruit",
        "price": 349,
        "available": true
      },
      {
        "id": "mango",
        "name": "Mango",
        "price": 349,
        "available": true
      },
      {
        "id": "watermelon",
        "name": "Watermelon",
        "price": 349,
        "available": true
      },
      {
        "id": "pineapple",
        "name": "Pineapple",
        "price": 349,
        "available": true
      }
    ],
    "available": true,
    "sortOrder": 71
  }
];

export default MENU_ITEMS;
