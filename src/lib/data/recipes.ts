// ============================================================
// Magic Meal — Recipe Data
// Source: three-ingredient-meals-data.json
// ============================================================

// Helper: get a flat list of all recipes
export function getAllRecipes(): Recipe[] {
  const proteinRecipes = PROTEINS.flatMap((p) => p.pairings);
  const baseRecipes = DOCTOR_IT_UP_BASES.flatMap((b) => b.recipes);
  return [...proteinRecipes, ...baseRecipes];
}

// Helper: find a recipe by ID across all sources
export function getRecipeById(id: string): Recipe | undefined {
  return getAllRecipes().find((r) => r.id === id);
}

// Helper: find which protein or base a recipe belongs to
export function getRecipeContext(id: string): { type: "protein"; parent: Protein } | { type: "base"; parent: DoctorItUpBase } | null {
  for (const protein of PROTEINS) {
    if (protein.pairings.some((r) => r.id === id)) {
      return { type: "protein", parent: protein };
    }
  }
  for (const base of DOCTOR_IT_UP_BASES) {
    if (base.recipes.some((r) => r.id === id)) {
      return { type: "base", parent: base };
    }
  }
  return null;
}

export interface Recipe {
  id: string;
  recipeName: string;
  emoji?: string;
  ingredients: string[];
  cookTime: string;
  difficulty?: string;
  equipment?: string[];
  servings?: number;
  instructions: string[];
  proTips?: string[];
  whyThesePairings?: string;
}

export interface Protein {
  id: string;
  name: string;
  emoji: string;
  category: string;
  whyIncluded: string;
  buyingTip: string;
  storageTip: string;
  pairings: Recipe[];
}

export interface DoctorItUpBase {
  id: string;
  name: string;
  emoji: string;
  whyIncluded: string;
  recipes: Recipe[];
}

export const FREE_PANTRY_STAPLES = {
  basics: ["salt", "black pepper", "cooking oil (vegetable, canola, or olive)", "butter"],
  condiments: ["ketchup", "mustard (yellow)", "mayonnaise", "soy sauce", "hot sauce (Tabasco/Frank's/Sriracha)"],
  sweeteners: ["sugar", "honey"],
  driedSpices: ["garlic powder", "onion powder", "paprika", "Italian seasoning", "chili powder", "cumin"],
  baking: ["all-purpose flour", "baking powder"],
  liquids: ["chicken or beef bouillon cubes", "vinegar (white or apple cider)"],
};

export const SHOPPING_LIST = {
  proteins: [
    "1 pack boneless skinless chicken breasts (1-1.5 lbs)",
    "1 lb ground beef (80/20)",
    "1 dozen large eggs",
    "2-3 cans chunk light tuna",
    "1 pack regular sliced bacon",
  ],
  pairingIngredients: [
    "1 box instant/minute rice",
    "1 bag frozen broccoli",
    "1 bag frozen mixed vegetables or peas/carrots",
    "1 pack flour tortillas (large)",
    "1 bag shredded Mexican cheese blend",
    "1 pack American cheese slices",
    "1 box spaghetti or penne",
    "1 jar marinara sauce",
    "1 pack hamburger buns",
    "1 loaf sandwich bread",
    "1 bottle BBQ sauce",
    "2-3 ripe bananas",
    "1 container quick oats",
    "1 tomato",
    "1 bunch green onions",
  ],
  doctoredUpBases: [
    "2-3 packs instant ramen",
    "2 cans Campbell's soup (cream of mushroom + tomato)",
    "2 boxes Kraft Mac & Cheese",
    "2 cans black beans",
  ],
  estimatedCost: "$45-65 depending on region and store",
};

// --------------- PROTEINS ---------------

export const PROTEINS: Protein[] = [
  {
    id: "chicken",
    name: "Chicken",
    emoji: "\u{1F357}",
    category: "fresh",
    whyIncluded: "#1 protein in America at 43% market share.",
    buyingTip: "Boneless skinless chicken breast or thighs. Pre-trimmed. About $3-5/lb.",
    storageTip: "Use within 2 days of buying, or freeze.",
    pairings: [
      {
        id: "chicken-rice-broccoli",
        recipeName: "One-Pan Chicken, Rice & Broccoli",
        emoji: "🍗",
        ingredients: ["chicken breast", "instant/minute rice", "frozen broccoli"],
        whyThesePairings: "Rice is a top-5 pantry staple in NA. Frozen broccoli is the #1 frozen vegetable purchased. This is the classic American meal-prep combo.",
        cookTime: "25 minutes",
        difficulty: "easy",
        equipment: ["large skillet with lid"],
        servings: 2,
        instructions: [
          "Cut 2 chicken breasts into bite-sized cubes. Season with salt, pepper, and garlic powder.",
          "Heat oil in a large skillet over medium-high heat. Cook chicken pieces 5-6 minutes, stirring occasionally, until cooked through (no pink inside). Remove to a plate.",
          "In the same skillet, add 1 cup instant rice, 1 cup water, and a pinch of salt. Stir.",
          "Pour 2 cups frozen broccoli on top of the rice. Do NOT stir.",
          "Cover with lid. Reduce heat to low. Cook 10 minutes.",
          "Remove lid. Fluff rice with a fork. Add chicken back in. Stir everything together.",
          "Optional: drizzle with soy sauce or squeeze of hot sauce.",
        ],
        proTips: [
          "If using regular long-grain rice, increase water to 2 cups and cook time to 20 minutes.",
          "Chicken thighs are more forgiving than breasts \u2014 harder to overcook.",
        ],
      },
      {
        id: "chicken-tortilla-cheese",
        recipeName: "Chicken Quesadillas",
        emoji: "🌮",
        ingredients: ["chicken breast", "flour tortillas (large)", "shredded Mexican cheese blend"],
        whyThesePairings: "Tortillas are a top-10 grocery item. Shredded cheese is in 82% of households. Quesadillas are the quintessential lazy-cook meal.",
        cookTime: "15 minutes",
        difficulty: "beginner",
        equipment: ["large skillet"],
        servings: 2,
        instructions: [
          "Slice 1 chicken breast into very thin strips. Season with salt, pepper, chili powder, and cumin.",
          "Heat oil in skillet over medium-high. Cook chicken strips 4-5 minutes until done. Remove to plate and roughly chop.",
          "Wipe skillet. Place 1 large tortilla flat in skillet over medium heat.",
          "Sprinkle a generous handful of shredded cheese on one half of the tortilla. Add chicken on top of cheese. Add more cheese on top of chicken.",
          "Fold tortilla in half. Press down gently with spatula.",
          "Cook 2-3 minutes per side until tortilla is golden and cheese is melted.",
          "Repeat with remaining tortillas. Cut into wedges.",
          "Serve with salsa, sour cream, or hot sauce if you have them.",
        ],
        proTips: [
          "Use a rotisserie chicken from the store deli to skip the cooking step entirely \u2014 just shred it up.",
          "Medium heat is key. Too high and the tortilla burns before cheese melts.",
        ],
      },
      {
        id: "chicken-pasta-jarredsauce",
        recipeName: "Chicken Pasta with Marinara",
        emoji: "🍝",
        ingredients: ["chicken breast", "pasta (penne or rotini)", "jarred marinara sauce"],
        whyThesePairings: "Pasta is a top pantry staple. Jarred marinara sauce is a top-20 grocery item. Classic comfort food combo.",
        cookTime: "25 minutes",
        difficulty: "easy",
        equipment: ["pot", "large skillet"],
        servings: 3,
        instructions: [
          "Boil a pot of salted water. Cook pasta according to box directions. Drain.",
          "While pasta cooks: cut 2 chicken breasts into bite-sized pieces. Season with salt, pepper, garlic powder, and Italian seasoning.",
          "Heat oil in skillet over medium-high. Cook chicken 6-7 minutes until cooked through.",
          "Pour half a jar of marinara sauce into the skillet with the chicken. Stir. Let simmer 3 minutes.",
          "Add drained pasta to the skillet. Toss everything together.",
          "Optional: top with parmesan cheese if you have it.",
        ],
        proTips: [
          "Save a cup of pasta water before draining \u2014 add a splash if the dish seems dry.",
          "This is even faster with pre-cooked frozen grilled chicken strips from the freezer section.",
        ],
      },
      {
        id: "chicken-bbqsauce-buns",
        recipeName: "BBQ Chicken Sandwiches",
        emoji: "🥪",
        ingredients: ["chicken breast", "BBQ sauce (bottle)", "hamburger or brioche buns"],
        whyThesePairings: "BBQ sauce is a top-5 condiment in America. Buns are a bread aisle staple. This mimics pulled chicken BBQ with zero effort.",
        cookTime: "20 minutes",
        difficulty: "beginner",
        equipment: ["pot with lid or slow cooker"],
        servings: 4,
        instructions: [
          "Place 2-3 chicken breasts in a pot. Pour enough BBQ sauce to mostly cover them (about 1 cup).",
          "Add a splash of water (1/4 cup). Cover with lid.",
          "Cook on medium-low heat for 15-18 minutes until chicken is cooked through (no pink when you cut the thickest piece).",
          "Use two forks to shred the chicken right in the pot. Stir into the sauce.",
          "Pile onto buns. Done.",
          "SLOW COOKER VERSION: Same thing but cook on LOW for 4-6 hours or HIGH for 2-3 hours.",
        ],
        proTips: [
          "The slow cooker version is the ultimate set-and-forget meal. Start it before work.",
          "Top with coleslaw from the deli section if you want to get fancy.",
        ],
      },
    ],
  },
  {
    id: "ground-beef",
    name: "Ground Beef",
    emoji: "\u{1F969}",
    category: "fresh",
    whyIncluded: "#2 protein in America at 36% market share. Most affordable beef cut at ~$6/lb.",
    buyingTip: "80/20 ground beef (80% lean) is the sweet spot for flavor and price. 1 lb feeds 3-4 people.",
    storageTip: "Use within 2 days or freeze. Thaw in fridge overnight.",
    pairings: [
      {
        id: "beef-pasta-jarredsauce",
        recipeName: "Spaghetti with Meat Sauce",
        emoji: "🍝",
        ingredients: ["ground beef", "spaghetti", "jarred marinara sauce"],
        whyThesePairings: "The single most iconic easy American dinner. Spaghetti + jarred sauce are in nearly every pantry.",
        cookTime: "20 minutes",
        difficulty: "beginner",
        equipment: ["pot", "large skillet"],
        servings: 4,
        instructions: [
          "Boil a big pot of salted water. Cook spaghetti per box directions. Drain.",
          "While pasta cooks: crumble 1 lb ground beef into a skillet over medium-high heat.",
          "Cook beef 6-8 minutes, breaking it into small pieces with a spoon, until no longer pink. Drain fat if there is a lot (tilt pan, spoon it out).",
          "Season beef with salt, pepper, garlic powder, and Italian seasoning.",
          "Pour in half to full jar of marinara sauce. Stir. Let simmer 5 minutes.",
          "Serve sauce over spaghetti.",
        ],
        proTips: [
          "A little sugar (1/2 tsp) in the sauce cuts acidity. Many jarred sauces already have it.",
          "Save pasta water \u2014 a splash loosens up the sauce perfectly.",
        ],
      },
      {
        id: "beef-tortilla-cheese",
        recipeName: "Beef Tacos",
        emoji: "🌮",
        ingredients: ["ground beef", "taco shells or flour tortillas", "shredded cheddar or Mexican blend cheese"],
        whyThesePairings: "Tacos are the #1 most searched easy dinner in NA. Taco shells and shredded cheese are grocery staples.",
        cookTime: "15 minutes",
        difficulty: "beginner",
        equipment: ["skillet"],
        servings: 4,
        instructions: [
          "Crumble 1 lb ground beef into a skillet over medium-high heat. Cook 6-8 minutes until browned. Drain excess fat.",
          "Season with chili powder (2 tsp), cumin (1 tsp), garlic powder (1 tsp), salt, and pepper. Stir.",
          "Add 1/4 cup water. Stir and let simmer 2-3 minutes until it thickens slightly.",
          "Warm taco shells in oven (325\u00b0F, 5 min) or microwave tortillas 15 seconds each.",
          "Fill shells with beef. Top with cheese.",
          "Add whatever else you have: salsa, sour cream, hot sauce, lettuce, tomato.",
        ],
        proTips: [
          "Buy a $1 packet of taco seasoning to replace the individual spices if you want. That becomes a pantry staple.",
          "Soft flour tortillas are more forgiving than hard taco shells (which break).",
        ],
      },
      {
        id: "beef-buns-cheese",
        recipeName: "Smash Burgers",
        emoji: "🍔",
        ingredients: ["ground beef", "hamburger buns", "American cheese slices or cheddar slices"],
        whyThesePairings: "Burgers are the most iconic American meal. Buns and cheese slices are always at the store. This method needs zero skill.",
        cookTime: "10 minutes",
        difficulty: "beginner",
        equipment: ["skillet"],
        servings: 4,
        instructions: [
          "Divide 1 lb ground beef into 4 balls (about the size of a golf ball for smash burgers, or tennis ball for thick patties).",
          "Heat skillet on HIGH heat with a thin coat of oil. Let it get really hot.",
          "Place a ball on the skillet. Use a spatula to SMASH it flat (press hard for 5 seconds). Season top with salt and pepper.",
          "Cook 2-3 minutes until edges are crispy and brown. Flip.",
          "Immediately place a cheese slice on top. Cook 1-2 more minutes.",
          "Place on bun. Repeat with remaining patties.",
          "Top with ketchup, mustard, pickles, whatever you like.",
        ],
        proTips: [
          "The smash technique gives you crispy edges like a diner burger. High heat is the secret.",
          "Don't press the burger AFTER you flip \u2014 only smash once at the start, or you squeeze out the juice.",
        ],
      },
      {
        id: "beef-rice-frozenveg",
        recipeName: "Beef & Rice Skillet",
        emoji: "🍚",
        ingredients: ["ground beef", "instant/minute rice", "frozen mixed vegetables"],
        whyThesePairings: "Rice and frozen veggies are both top-10 pantry/freezer staples. This is the classic budget one-pan dinner.",
        cookTime: "20 minutes",
        difficulty: "easy",
        equipment: ["large skillet with lid"],
        servings: 3,
        instructions: [
          "Brown 1 lb ground beef in a large skillet over medium-high heat, 6-8 minutes. Drain fat.",
          "Season with salt, pepper, garlic powder, and onion powder.",
          "Add 1 cup instant rice and 1 cup water (or beef bouillon). Stir.",
          "Pour 2 cups frozen mixed vegetables on top.",
          "Cover. Reduce heat to low. Cook 10 minutes.",
          "Remove lid. Fluff and stir everything together.",
          "Hit it with soy sauce or hot sauce to taste.",
        ],
        proTips: [
          "A splash of soy sauce at the end turns this into quasi-fried rice.",
          "Frozen stir-fry vegetable blends work great here too.",
        ],
      },
    ],
  },
  {
    id: "eggs",
    name: "Eggs",
    emoji: "\u{1F95A}",
    category: "fresh",
    whyIncluded: "Bought by 60% of all US households. Cheapest protein per gram. Most versatile ingredient in existence.",
    buyingTip: "Large eggs, any brand. About $3-6/dozen depending on the bird flu situation.",
    storageTip: "Keep refrigerated. Good for 3-5 weeks past purchase.",
    pairings: [
      {
        id: "eggs-bread-cheese",
        recipeName: "Egg & Cheese Sandwich",
        emoji: "🍳",
        ingredients: ["eggs", "sandwich bread or English muffins", "American cheese slices or cheddar slices"],
        whyThesePairings: "Bread is a $10 billion/year grocery item in the US. Cheese is in 82% of households. This is the fastest hot meal in existence.",
        cookTime: "5 minutes",
        difficulty: "beginner",
        equipment: ["skillet"],
        servings: 1,
        instructions: [
          "Heat a skillet over medium heat with a little butter.",
          "Crack 2 eggs into the skillet. Break the yolks with a fork or leave them whole \u2014 your call.",
          "Season with salt and pepper.",
          "Cook about 2 minutes. Flip eggs (or don't \u2014 fold them over instead).",
          "Place cheese slice on top immediately. Cook 30 more seconds until cheese starts melting.",
          "Toast bread or English muffin while eggs cook.",
          "Slide eggs and cheese onto toast. Add ketchup or hot sauce if you want.",
        ],
        proTips: [
          "Medium heat is key \u2014 too hot and the eggs get rubbery.",
          "For a 'diner-style' egg: crack egg, immediately break yolk and swirl it around, flip once. Fast and even.",
        ],
      },
      {
        id: "eggs-tortilla-cheese",
        recipeName: "Breakfast Burritos",
        emoji: "🌯",
        ingredients: ["eggs", "flour tortillas (large)", "shredded Mexican cheese blend"],
        whyThesePairings: "Tortillas + cheese = quesadilla territory. Add scrambled eggs and you have the most popular grab-and-go breakfast in America. Works for dinner too.",
        cookTime: "10 minutes",
        difficulty: "beginner",
        equipment: ["skillet"],
        servings: 2,
        instructions: [
          "Crack 4 eggs into a bowl. Add a pinch of salt and pepper. Beat with a fork until combined.",
          "Heat butter in a skillet over medium-low heat.",
          "Pour eggs in. Let them sit 30 seconds, then gently push/stir them with a spatula. Repeat until eggs are just barely set (slightly wet-looking is perfect \u2014 they keep cooking off heat).",
          "Remove eggs to a plate.",
          "Warm tortillas in the microwave (15 seconds) or on the skillet (10 seconds each side).",
          "Lay tortilla flat. Add scrambled eggs down the center. Top with a generous handful of shredded cheese.",
          "Fold bottom up, then fold sides in to make a burrito.",
          "Optional: add salsa, hot sauce, or sour cream.",
        ],
        proTips: [
          "Low and slow is the secret to creamy scrambled eggs. Don't rush them on high heat.",
          "Make a batch, wrap individually in foil, freeze. Microwave 90 seconds for breakfast all week.",
        ],
      },
      {
        id: "eggs-rice-soysauce",
        recipeName: "Egg Fried Rice",
        emoji: "🍚",
        ingredients: ["eggs", "instant rice (or leftover rice)", "frozen peas and carrots mix"],
        whyThesePairings: "Rice is a pantry staple, soy sauce is free (pantry staple). Frozen peas/carrots are a freezer door classic. This is the cheapest delicious meal you can make.",
        cookTime: "15 minutes",
        difficulty: "easy",
        equipment: ["large skillet or pot"],
        servings: 2,
        instructions: [
          "Cook 1 cup instant rice according to package. Spread on a plate to cool slightly (or use leftover rice \u2014 even better).",
          "Heat oil in a large skillet over HIGH heat. This needs to be hot.",
          "Add 1 cup frozen peas and carrots. Stir-fry 2-3 minutes until thawed and lightly cooked.",
          "Push veggies to one side. Crack 2-3 eggs into the empty side. Scramble them quickly with your spatula.",
          "Before eggs are fully set, add rice on top. Stir everything together vigorously.",
          "Add 2-3 tablespoons soy sauce. Stir-fry another 1-2 minutes.",
          "Season with pepper. Optional: drizzle sesame oil or hot sauce.",
        ],
        proTips: [
          "Day-old rice from the fridge makes MUCH better fried rice than fresh. The drier the better.",
          "High heat is essential. If your pan isn't sizzling, it's not hot enough.",
          "Keep everything moving in the pan \u2014 fried rice should never sit still.",
        ],
      },
      {
        id: "eggs-banana-oats",
        recipeName: "3-Ingredient Banana Pancakes",
        emoji: "🥞",
        ingredients: ["eggs", "ripe bananas", "quick oats"],
        whyThesePairings: "Bananas are the #1 most purchased grocery item in America. Oats are a top pantry staple. These pancakes went viral for a reason \u2014 no flour needed.",
        cookTime: "15 minutes",
        difficulty: "easy",
        equipment: ["skillet", "fork or bowl"],
        servings: 2,
        instructions: [
          "In a bowl, mash 2 ripe bananas with a fork until smooth-ish (some lumps are fine).",
          "Add 2 eggs and 1/2 cup quick oats. Stir with fork until combined. Let sit 5 minutes so oats absorb moisture.",
          "Heat a skillet over medium-low heat with butter or oil.",
          "Pour small pancakes (about 3 inches wide). These are delicate \u2014 keep them small.",
          "Cook 2-3 minutes until edges look set and bottom is golden. Carefully flip. Cook 1-2 more minutes.",
          "Serve with honey, maple syrup, or just eat them plain \u2014 the banana makes them sweet.",
        ],
        proTips: [
          "The riper the banana, the sweeter the pancakes. Brown-spotted bananas are ideal.",
          "These are MUCH more delicate than regular pancakes. Small size + gentle flip is the move.",
          "Add a pinch of cinnamon to the batter for extra flavor.",
        ],
      },
    ],
  },
  {
    id: "canned-tuna",
    name: "Canned Tuna",
    emoji: "\u{1F41F}",
    category: "canned",
    whyIncluded: "#3 seafood in America. The ultimate pantry protein \u2014 cheap, shelf-stable, ready to eat.",
    buyingTip: "Chunk light tuna in water is cheapest. Albacore/white tuna is pricier but milder. About $1-3/can.",
    storageTip: "Shelf-stable for years. Once opened, use within 2 days refrigerated.",
    pairings: [
      {
        id: "tuna-bread-lettuce",
        recipeName: "Classic Tuna Salad Sandwich",
        emoji: "🥪",
        ingredients: ["canned tuna", "sandwich bread", "celery or lettuce"],
        whyThesePairings: "Bread + mayo (free pantry staple) + tuna is arguably the most common workday lunch in America. Zero cooking required.",
        cookTime: "5 minutes (no cooking)",
        difficulty: "beginner",
        equipment: ["bowl", "fork", "can opener"],
        servings: 2,
        instructions: [
          "Drain 2 cans of tuna. Dump into a bowl.",
          "Add 2-3 tablespoons mayo. Mix with fork, breaking up chunks.",
          "Season with salt, pepper, and a tiny squeeze of mustard if you want.",
          "If you have celery: chop a stalk finely and mix in for crunch. If not, skip it \u2014 still good.",
          "Pile onto bread. Add lettuce if you have it. Done.",
          "Optional: add a squeeze of lemon juice, diced pickles, or hot sauce.",
        ],
        proTips: [
          "Drain the tuna WELL \u2014 squeeze the can lid down to press out water. Wet tuna = soggy sandwich.",
          "Toast the bread for a major upgrade with zero extra effort.",
        ],
      },
      {
        id: "tuna-pasta-mayo",
        recipeName: "Tuna Pasta Salad",
        emoji: "🍝",
        ingredients: ["canned tuna", "pasta (elbow macaroni or rotini)", "frozen peas"],
        whyThesePairings: "Pasta + canned tuna is a pantry-only meal millions of North Americans grew up on. Frozen peas add color and nutrition with zero prep.",
        cookTime: "15 minutes",
        difficulty: "easy",
        equipment: ["pot", "colander", "bowl"],
        servings: 3,
        instructions: [
          "Boil salted water. Cook 2 cups pasta according to box directions.",
          "During the last 2 minutes of cooking, toss 1 cup frozen peas directly into the pasta water.",
          "Drain pasta and peas together. Rinse with cold water to cool them down.",
          "Dump into a bowl. Add 2 drained cans of tuna.",
          "Add 3-4 tablespoons mayo. Season with salt, pepper, and garlic powder.",
          "Mix well. Eat warm, room temp, or cold \u2014 all good.",
          "Optional: splash of vinegar or lemon juice brightens it up.",
        ],
        proTips: [
          "This is great as next-day leftovers straight from the fridge.",
          "Mustard (1 tsp) in the mayo dressing is a classic move.",
        ],
      },
      {
        id: "tuna-crackers-cheese",
        recipeName: "Tuna Melt Nachos",
        emoji: "🧀",
        ingredients: ["canned tuna", "Ritz-style crackers or tortilla chips", "shredded cheddar cheese"],
        whyThesePairings: "Snack foods are bought by 76% of households. Crackers/chips + cheese + tuna = a snack-dinner that requires almost zero effort.",
        cookTime: "8 minutes",
        difficulty: "beginner",
        equipment: ["baking sheet", "oven"],
        servings: 2,
        instructions: [
          "Preheat oven to 375\u00b0F (or use the broiler for speed).",
          "Spread crackers or tortilla chips in a single layer on a baking sheet.",
          "Drain 1-2 cans of tuna. Mix with a spoonful of mayo and a pinch of pepper.",
          "Drop small spoonfuls of tuna mixture onto the crackers/chips.",
          "Sprinkle shredded cheese generously over everything.",
          "Bake 5-7 minutes until cheese is melted and bubbly (or broil 2-3 minutes \u2014 watch carefully).",
          "Optional: hit with hot sauce or a squeeze of mustard.",
        ],
        proTips: [
          "Broiler is faster but will burn things in seconds if you look away. Stay by the oven.",
          "Tortilla chips hold up better than crackers under the tuna and cheese.",
        ],
      },
    ],
  },
  {
    id: "bacon",
    name: "Bacon",
    emoji: "\u{1F953}",
    category: "fresh/processed",
    whyIncluded: "Americans consume roughly 18 lbs of bacon per capita annually. Top-5 breakfast meat and a universal flavor enhancer.",
    buyingTip: "Regular sliced bacon, any brand. About $5-8 per pack.",
    storageTip: "Use within 7 days of opening, or freeze individual portions in bags.",
    pairings: [
      {
        id: "bacon-eggs-cheese",
        recipeName: "Bacon, Egg & Cheese (the BEC)",
        emoji: "🥓",
        ingredients: ["bacon", "eggs", "American cheese slices or cheddar"],
        whyThesePairings: "The BEC is America's #1 breakfast sandwich. Eggs and cheese are both top-5 grocery purchases. This is diner food at home.",
        cookTime: "10 minutes",
        difficulty: "beginner",
        equipment: ["skillet"],
        servings: 2,
        instructions: [
          "Lay 4-6 strips of bacon in a cold skillet. Turn heat to medium.",
          "Cook bacon 4-5 minutes per side until crispy to your liking. Remove to a plate with paper towel.",
          "Pour out most of the bacon grease (leave a little in the pan).",
          "Crack 2-4 eggs into the same skillet. Season with salt and pepper. Cook 2-3 minutes.",
          "Place cheese slice on each egg. Cover skillet for 30 seconds to melt cheese.",
          "Serve on toasted bread, English muffins, or a bun. Layer: bread, egg with cheese, bacon, bread.",
        ],
        proTips: [
          "Starting bacon in a COLD pan is the trick. It renders the fat evenly and prevents burning.",
          "Save the bacon grease \u2014 cooking eggs in it is what makes diner eggs taste so good.",
        ],
      },
      {
        id: "bacon-pasta-cream",
        recipeName: "Poor Man's Carbonara",
        emoji: "🍝",
        ingredients: ["bacon", "spaghetti or any long pasta", "parmesan cheese (grated, from the green can is fine)"],
        whyThesePairings: "Pasta is a universal pantry staple. Real carbonara is bacon + egg + cheese + pasta \u2014 and eggs are a free staple when paired with bacon here.",
        cookTime: "20 minutes",
        difficulty: "easy",
        equipment: ["pot", "skillet", "bowl"],
        servings: 2,
        instructions: [
          "Boil salted water. Cook pasta per box directions. SAVE 1 CUP OF PASTA WATER before draining.",
          "While pasta cooks: chop 6 strips of bacon into small pieces. Cook in skillet over medium heat until crispy, 5-6 minutes.",
          "In a bowl, whisk 2 eggs with a big handful of parmesan cheese (about 1/2 cup). Add pepper.",
          "When pasta is drained, add it to the skillet with the bacon (heat OFF or very low).",
          "Pour the egg-cheese mixture over the hot pasta. TOSS QUICKLY with tongs or a fork. The hot pasta cooks the eggs into a creamy sauce.",
          "Add splashes of reserved pasta water as needed to keep it saucy (not dry).",
          "Top with more parmesan and black pepper.",
        ],
        proTips: [
          "The pan must NOT be on high heat when you add the egg mixture \u2014 or you get scrambled eggs instead of creamy sauce.",
          "Toss, toss, toss. The constant motion is what creates the silky texture.",
          "This is based on real Italian carbonara. You just made restaurant food.",
        ],
      },
      {
        id: "bacon-bread-tomato",
        recipeName: "BLT (Bacon Lettuce Tomato)",
        emoji: "🥪",
        ingredients: ["bacon", "sandwich bread (white, toasted)", "tomato"],
        whyThesePairings: "The BLT is one of the top-5 sandwiches in America. Tomatoes are a top-selling produce item.",
        cookTime: "10 minutes",
        difficulty: "beginner",
        equipment: ["skillet"],
        servings: 2,
        instructions: [
          "Cook 6-8 strips of bacon in a skillet over medium heat until crispy. Remove to paper towel.",
          "Toast bread.",
          "Slice tomato into thick rounds.",
          "Spread mayo on both slices of toast.",
          "Layer: toast, bacon, tomato, lettuce (if you have it), toast.",
          "Cut diagonally. This is mandatory for BLTs. Don't ask why.",
        ],
        proTips: [
          "Toasting the bread is non-negotiable. A BLT on soggy bread is a tragedy.",
          "Season the tomato slices with a pinch of salt \u2014 transforms them completely.",
          "Summer tomatoes make this sandwich. Winter tomatoes... still fine but not life-changing.",
        ],
      },
    ],
  },
];

// --------------- DOCTOR IT UP ---------------

export const DOCTOR_IT_UP_BASES: DoctorItUpBase[] = [
  {
    id: "ramen-upgrade",
    name: "Instant Ramen",
    emoji: "\u{1F35C}",
    whyIncluded: "One of the most purchased items in North America, especially for non-cooks. Dirt cheap and everywhere.",
    recipes: [
      {
        id: "ramen-egg-greenonion",
        recipeName: "Upgraded Ramen",
        emoji: "🍜",
        ingredients: ["instant ramen", "egg", "green onions"],
        cookTime: "8 minutes",
        difficulty: "beginner",
        equipment: ["pot"],
        servings: 1,
        instructions: [
          "Cook ramen noodles per package directions with the seasoning packet. Keep it a bit soupy.",
          "While broth is simmering, crack an egg directly into the pot.",
          "Let egg cook 2 minutes without stirring for a poached egg, or stir it in for egg-drop style.",
          "Pour into a bowl. Chop green onions and scatter on top.",
          "Optional: drizzle soy sauce and/or hot sauce (Sriracha). Squeeze of sesame oil if you have it.",
        ],
        proTips: [
          "For a soft-boiled egg instead: boil 6.5 min, ice bath, peel, halve, place on top. Instagram-worthy.",
        ],
      },
    ],
  },
  {
    id: "canned-soup-upgrade",
    name: "Campbell's Soup",
    emoji: "\u{1F372}",
    whyIncluded: "Most iconic canned soup brand in NA. Cream of mushroom and tomato are the top sellers.",
    recipes: [
      {
        id: "soup-cheese-bread",
        recipeName: "Tomato Soup & Grilled Cheese",
        emoji: "🍲",
        ingredients: ["Campbell's tomato soup", "sandwich bread", "American or cheddar cheese slices"],
        cookTime: "15 minutes",
        difficulty: "beginner",
        equipment: ["pot", "skillet"],
        servings: 2,
        instructions: [
          "Heat soup in a pot per can directions. Use milk instead of water for creamier soup.",
          "While soup heats: butter one side of 2 bread slices each.",
          "Place one slice butter-side-down in a skillet over medium heat. Add cheese slice(s). Top with second slice, butter-side-up.",
          "Cook 3 minutes per side until golden and cheese is melted.",
          "Cut grilled cheese in half. Dip in soup. Experience pure comfort.",
        ],
        proTips: [
          "Stir a spoonful of butter into the hot soup. Fancy restaurant secret.",
        ],
      },
      {
        id: "soup-chicken-rice-stovetop",
        recipeName: "Creamy Chicken & Rice Soup",
        emoji: "🍲",
        ingredients: ["Campbell's cream of mushroom soup", "canned chicken (or leftover chicken)", "instant rice"],
        cookTime: "15 minutes",
        difficulty: "easy",
        equipment: ["pot with lid"],
        servings: 2,
        instructions: [
          "In a pot, combine 1 can cream of mushroom soup, 1 can water, and a pinch of garlic powder. Stir and bring to a simmer over medium heat.",
          "Drain 1 can of chicken and break into chunks. Add to the pot. Stir.",
          "Add 1 cup instant rice. Stir everything together.",
          "Cover with lid. Reduce heat to low. Cook 5 minutes.",
          "Remove lid. Stir. The rice will have absorbed the liquid into a thick, creamy soup.",
          "Season with salt, pepper, and a dash of hot sauce if you like.",
        ],
        proTips: [
          "Use milk instead of water for an even creamier result.",
          "Leftover rotisserie chicken works perfectly here \u2014 just shred and toss it in.",
          "A handful of frozen peas in step 3 adds color and nutrition.",
        ],
      },
    ],
  },
  {
    id: "mac-and-cheese-upgrade",
    name: "Mac & Cheese",
    emoji: "\u{1F9C0}",
    whyIncluded: "Over 1 million boxes sold daily in the US and Canada. One of the most iconic NA pantry items.",
    recipes: [
      {
        id: "mac-hotdog",
        recipeName: "Hot Dog Mac & Cheese",
        emoji: "🌭",
        ingredients: ["boxed mac & cheese", "hot dogs"],
        cookTime: "15 minutes",
        difficulty: "beginner",
        equipment: ["pot", "skillet"],
        servings: 2,
        instructions: [
          "Make boxed mac & cheese per box directions.",
          "While pasta boils: slice 3-4 hot dogs into coins.",
          "In a separate skillet, cook hot dog slices over medium heat 3-4 minutes until lightly browned on the edges.",
          "Stir hot dogs into finished mac & cheese.",
          "Optional: squirt of mustard or ketchup on top.",
        ],
      },
      {
        id: "mac-broccoli-chicken",
        recipeName: "Loaded Chicken Broccoli Mac",
        emoji: "🧀",
        ingredients: ["boxed mac & cheese", "frozen broccoli", "canned chicken (or rotisserie chicken)"],
        cookTime: "18 minutes",
        difficulty: "beginner",
        equipment: ["pot"],
        servings: 2,
        instructions: [
          "Make boxed mac & cheese per box directions.",
          "During the last 3 minutes of pasta boiling, add 1 cup frozen broccoli florets directly to the pasta water.",
          "Drain together. Make the cheese sauce as normal.",
          "Stir in 1 can of drained chicken (or 1 cup shredded rotisserie chicken).",
          "Season with pepper and garlic powder. Stir. Eat.",
        ],
      },
    ],
  },
  {
    id: "canned-beans-upgrade",
    name: "Canned Beans",
    emoji: "\u{1FAD8}",
    whyIncluded: "Top-20 grocery item. Extremely cheap ($1/can), shelf-stable, and a solid protein/fiber source.",
    recipes: [
      {
        id: "beans-rice-salsa",
        recipeName: "Beans & Rice Bowl",
        emoji: "🫘",
        ingredients: ["canned black beans", "instant rice", "jarred salsa"],
        cookTime: "12 minutes",
        difficulty: "beginner",
        equipment: ["pot", "small pot"],
        servings: 2,
        instructions: [
          "Cook 1 cup instant rice per package directions.",
          "While rice cooks: drain and rinse 1 can of black beans. Pour into a small pot.",
          "Add 2-3 big spoonfuls of salsa to the beans. Heat over medium, stirring, for 3-4 minutes.",
          "Season with cumin, chili powder, salt, and pepper.",
          "Scoop rice into a bowl. Top with saucy beans.",
          "Optional: top with shredded cheese, sour cream, hot sauce.",
        ],
      },
    ],
  },
];
