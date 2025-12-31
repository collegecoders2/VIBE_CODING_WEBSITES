export const restaurants = [
    {
        id: 1,
        name: "Italian Bliss",
        cuisine: "Italian, Pasta, Pizza",
        rating: 4.8,
        deliveryTime: "30-40 min",
        priceRange: "$$$",
        image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=800&auto=format&fit=crop",
        offer: "20% OFF on Pasta",
        menu: [
            { id: 1, name: "Margherita Pizza", price: 299, category: "Italian", description: "Classic tomato sauce, mozzarella cheese, and fresh basil.", image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?q=80&w=600&auto=format&fit=crop" },
            { id: 8, name: "Pasta Carbonara", price: 329, category: "Italian", description: "Creamy pasta with egg, cheese, and pancetta.", image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=600&auto=format&fit=crop" },
            { id: 16, name: "Pepperoni Pizza", price: 349, category: "Italian", description: "Zesty pepperoni with melted mozzarella.", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=600&auto=format&fit=crop" },
            { id: 29, name: "Chicken Parmesan", price: 399, category: "Italian", description: "Breaded chicken breast topped with marinara and cheese.", image: "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?q=80&w=600&auto=format&fit=crop" }
        ]
    },
    {
        id: 2,
        name: "American Grill",
        cuisine: "American, Burgers, BBQ",
        rating: 4.5,
        deliveryTime: "25-35 min",
        priceRange: "$$",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop",
        offer: "Free Wings over $500",
        menu: [
            { id: 2, name: "Cheeseburger", price: 349, category: "American", description: "Juicy beef patty with melted cheese and fresh toppings.", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600&auto=format&fit=crop" },
            { id: 7, name: "BBQ Ribs", price: 449, category: "American", description: "Slow-cooked ribs with smoky BBQ sauce.", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop" },
            { id: 13, name: "Beef Steak", price: 549, category: "American", description: "Premium cut steak cooked to perfection.", image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=600&auto=format&fit=crop" },
            { id: 14, name: "Chicken Wings", price: 279, category: "American", description: "Crispy wings tossed in your choice of sauce.", image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?q=80&w=600&auto=format&fit=crop" }
        ]
    },
    {
        id: 3,
        name: "Sushi & Ramen House",
        cuisine: "Japanese, Sushi, Ramen",
        rating: 4.9,
        deliveryTime: "30-45 min",
        priceRange: "$$$",
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=800&auto=format&fit=crop",
        offer: "BOGO on Salmon Sashimi",
        menu: [
            { id: 3, name: "Sushi Platter", price: 599, category: "Japanese", description: "Assorted fresh sushi and rolls.", image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=600&auto=format&fit=crop" },
            { id: 10, name: "Ramen Bowl", price: 349, category: "Japanese", description: "Hearty broth with noodles and traditional toppings.", image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=600&auto=format&fit=crop" },
            { id: 25, name: "Salmon Sashimi", price: 449, category: "Japanese", description: "Thin slices of fresh Atlantic salmon.", image: "https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?q=80&w=600&auto=format&fit=crop" }
        ]
    },
    {
        id: 4,
        name: "Fresh & Mediterranean",
        cuisine: "Salads, Mediterranean",
        rating: 4.4,
        deliveryTime: "20-30 min",
        priceRange: "$$",
        image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=800&auto=format&fit=crop",
        offer: "Flat 10% OFF on Salads",
        menu: [
            { id: 4, name: "Caesar Salad", price: 249, category: "Salads", description: "Crisp romaine with Caesar dressing and croutons.", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?q=80&w=600&auto=format&fit=crop" },
            { id: 9, name: "Greek Salad", price: 199, category: "Mediterranean", description: "Authentic Greek flavors with feta and olives.", image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format&fit=crop" },
            { id: 17, name: "Falafel Wrap", price: 199, category: "Mediterranean", description: "Crispy falafel with fresh veggies in a soft wrap.", image: "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?q=80&w=600&auto=format&fit=crop" }
        ]
    },
    {
        id: 5,
        name: "Asian Fusion",
        cuisine: "Thai, Vietnamese, Chinese",
        rating: 4.6,
        deliveryTime: "25-40 min",
        priceRange: "$$",
        image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=800&auto=format&fit=crop",
        offer: "Complimentary Spring Rolls",
        menu: [
            { id: 5, name: "Pad Thai", price: 279, category: "Thai", description: "Classic stir-fried rice noodles.", image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?q=80&w=600&auto=format&fit=crop" },
            { id: 15, name: "Pho Soup", price: 299, category: "Vietnamese", description: "Traditional Vietnamese noodle soup with herbs.", image: "https://images.unsplash.com/photo-1591814468924-caf88d1232e1?q=80&w=600&auto=format&fit=crop" },
            { id: 18, name: "Fried Rice", price: 249, category: "Chinese", description: "Wok-fried rice with seasoned vegetables.", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=600&auto=format&fit=crop" },
            { id: 22, name: "Tom Yum Soup", price: 229, category: "Thai", description: "Hot and sour Thai soup with shrimp.", image: "https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?q=80&w=600&auto=format&fit=crop" },
            { id: 28, name: "Spring Rolls", price: 199, category: "Vietnamese", description: "Fresh and crispy vegetable spring rolls.", image: "https://images.unsplash.com/photo-1594837318433-96c16f6c5e99?q=80&w=600&auto=format&fit=crop" }
        ]
    },
    {
        id: 6,
        name: "Mexican Fiesta",
        cuisine: "Mexican, Street Food",
        rating: 4.3,
        deliveryTime: "20-35 min",
        priceRange: "$",
        image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=800&auto=format&fit=crop",
        offer: "Buy 2 Tacos Get 1 Free",
        menu: [
            { id: 6, name: "Chicken Tacos", price: 229, category: "Mexican", description: "Seasoned chicken with fresh toppings in corn tortillas.", image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=600&auto=format&fit=crop" },
            { id: 21, name: "Burrito Bowl", price: 329, category: "Mexican", description: "All burrito favorites served in a healthy bowl.", image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=600&auto=format&fit=crop" },
            { id: 24, name: "Beef Tacos", price: 249, category: "Mexican", description: "Savory beef with lime and cilantro.", image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?q=80&w=600&auto=format&fit=crop" }
        ]
    },
    {
        id: 7,
        name: "Spice of India",
        cuisine: "Indian, Curry",
        rating: 4.7,
        deliveryTime: "30-45 min",
        priceRange: "$$",
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop",
        offer: "Free Lassi with Biryani",
        menu: [
            { id: 12, name: "Butter Chicken", price: 379, category: "Indian", description: "Creamy tomato-based chicken curry.", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=600&auto=format&fit=crop" },
            { id: 26, name: "Chicken Biryani", price: 349, category: "Indian", description: "Aromatic basmati rice cooked with tender chicken.", image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop" }
        ]
    },
    {
        id: 8,
        name: "The Gourmet Cafe",
        cuisine: "British, French, Breakfast, Seafood",
        rating: 4.6,
        deliveryTime: "20-40 min",
        priceRange: "$$$",
        image: "https://images.unsplash.com/photo-1579208570378-8c970854bc23?q=80&w=800&auto=format&fit=crop",
        offer: "Breakfast Special: $5 OFF",
        menu: [
            { id: 11, name: "Fish and Chips", price: 299, category: "British", description: "Crispy battered fish with hand-cut fries.", image: "https://images.unsplash.com/photo-1579208570378-8c970854bc23?q=80&w=600&auto=format&fit=crop" },
            { id: 19, name: "Lobster Roll", price: 499, category: "Seafood", description: "Buttery lobster in a toasted brioche roll.", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=600&auto=format&fit=crop" },
            { id: 20, name: "Croissant", price: 149, category: "French", description: "Buttery, flaky French pastry.", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop" },
            { id: 23, name: "Pancakes", price: 199, category: "Breakfast", description: "Fluffy pancakes served with maple syrup.", image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=600&auto=format&fit=crop" },
            { id: 27, name: "Avocado Toast", price: 179, category: "Breakfast", description: "Sourdough toast with creamy avocado.", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=600&auto=format&fit=crop" }
        ]
    }
];
