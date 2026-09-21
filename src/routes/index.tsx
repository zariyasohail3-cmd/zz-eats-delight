import { createFileRoute } from "@tanstack/react-router";
import {
  CalendarDays,
  ChefHat,
  Clock,
  Facebook,
  Instagram,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Trash2,
  Twitter,
  Utensils,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import heroImage from "@/assets/zz-restaurant-hero.jpg";
import burgerImage from "@/assets/zz-burger.jpg";
import pizzaImage from "@/assets/zz-pizza.jpg";
import bbqImage from "@/assets/zz-bbq.jpg";
import pastaImage from "@/assets/zz-pasta.jpg";
import dessertImage from "@/assets/zz-dessert.jpg";
import interiorImage from "@/assets/zz-interior.jpg";
import chefImage from "@/assets/zz-chef.jpg";
import diningImage from "@/assets/zz-dining.jpg";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ZZ RESTAURANT — Premium Food Ordering in Faisalabad" },
      {
        name: "description",
        content:
          "Order burgers, pizza, BBQ, pasta, desserts and more from ZZ RESTAURANT on Sargodha Road, Faisalabad.",
      },
      { property: "og:title", content: "ZZ RESTAURANT — Premium Food Ordering in Faisalabad" },
      {
        property: "og:description",
        content:
          "A polished online restaurant experience for ZZ RESTAURANT with menu ordering, reservations and contact details.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: string;
  prices: Array<{ label?: string; amount: number }>;
  image: string;
  featured?: boolean;
};

type CartItem = {
  cartId: string;
  itemId: string;
  name: string;
  label?: string;
  price: number;
  quantity: number;
  image: string;
};

type CheckoutSummary = {
  name: string;
  phone: string;
  address: string;
  notes: string;
  orderType: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
};

type ReservationSummary = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
};

const phoneNumber = "03487646233";
const address = "Sargodha Road, Faisalabad, Pakistan";
const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `ZZ RESTAURANT ${address}`,
)}`;
const deliveryFee = 150;

const categories = [
  "All",
  "🍗 Chicken & Starters",
  "🍔 Burgers",
  "🍕 Pizza",
  "🍗 BBQ & Grilled",
  "🍝 Pasta",
  "🍚 Rice & Chinese",
  "🥪 Sandwiches & Wraps",
  "🍟 Sides",
  "🍰 Desserts",
  "🥤 Drinks",
];

const imageByCategory: Record<string, string> = {
  "🍗 Chicken & Starters": bbqImage,
  "🍔 Burgers": burgerImage,
  "🍕 Pizza": pizzaImage,
  "🍗 BBQ & Grilled": bbqImage,
  "🍝 Pasta": pastaImage,
  "🍚 Rice & Chinese": chefImage,
  "🥪 Sandwiches & Wraps": burgerImage,
  "🍟 Sides": heroImage,
  "🍰 Desserts": dessertImage,
  "🥤 Drinks": diningImage,
};

const menuItems: MenuItem[] = [
  {
    id: "chicken-wings",
    name: "Chicken Wings",
    description: "Crispy chicken wings served with a flavorful dipping sauce.",
    category: "🍗 Chicken & Starters",
    prices: [{ amount: 650 }],
    image: bbqImage,
    featured: true,
  },
  {
    id: "chicken-nuggets",
    name: "Chicken Nuggets",
    description: "Golden crispy chicken nuggets served with fries and dip.",
    category: "🍗 Chicken & Starters",
    prices: [{ amount: 550 }],
    image: imageByCategory["🍗 Chicken & Starters"],
  },
  {
    id: "chicken-strips",
    name: "Chicken Strips",
    description: "Crispy seasoned chicken strips with special sauce.",
    category: "🍗 Chicken & Starters",
    prices: [{ amount: 600 }],
    image: imageByCategory["🍗 Chicken & Starters"],
  },
  {
    id: "chicken-cheese-balls",
    name: "Chicken Cheese Balls",
    description: "Crispy cheese-filled chicken bites.",
    category: "🍗 Chicken & Starters",
    prices: [{ amount: 650 }],
    image: imageByCategory["🍗 Chicken & Starters"],
  },
  {
    id: "loaded-fries",
    name: "Loaded Fries",
    description: "Crispy fries topped with chicken, cheese and special sauce.",
    category: "🍗 Chicken & Starters",
    prices: [{ amount: 700 }],
    image: heroImage,
    featured: true,
  },
  {
    id: "classic-chicken-burger",
    name: "Classic Chicken Burger",
    description: "Crispy chicken fillet, lettuce, tomato and signature sauce.",
    category: "🍔 Burgers",
    prices: [{ amount: 550 }],
    image: burgerImage,
  },
  {
    id: "zinger-burger",
    name: "Zinger Burger",
    description: "Crispy spicy chicken fillet with fresh lettuce and special mayo.",
    category: "🍔 Burgers",
    prices: [{ amount: 650 }],
    image: burgerImage,
    featured: true,
  },
  {
    id: "cheese-zinger-burger",
    name: "Cheese Zinger Burger",
    description: "Zinger chicken fillet topped with melted cheese and signature sauce.",
    category: "🍔 Burgers",
    prices: [{ amount: 750 }],
    image: burgerImage,
  },
  {
    id: "bbq-chicken-burger",
    name: "BBQ Chicken Burger",
    description: "Grilled chicken, BBQ sauce, cheese and fresh vegetables.",
    category: "🍔 Burgers",
    prices: [{ amount: 750 }],
    image: burgerImage,
  },
  {
    id: "double-chicken-burger",
    name: "Double Chicken Burger",
    description: "Two juicy chicken fillets with cheese and special sauce.",
    category: "🍔 Burgers",
    prices: [{ amount: 900 }],
    image: burgerImage,
  },
  {
    id: "chicken-tikka-pizza",
    name: "Chicken Tikka Pizza",
    description: "Chicken tikka, onions, capsicum and mozzarella cheese.",
    category: "🍕 Pizza",
    prices: [
      { label: "Small", amount: 1200 },
      { label: "Medium", amount: 1700 },
      { label: "Large", amount: 2200 },
    ],
    image: pizzaImage,
    featured: true,
  },
  {
    id: "chicken-fajita-pizza",
    name: "Chicken Fajita Pizza",
    description: "Spicy chicken, onions, capsicum, olives and mozzarella cheese.",
    category: "🍕 Pizza",
    prices: [
      { label: "Small", amount: 1250 },
      { label: "Medium", amount: 1750 },
      { label: "Large", amount: 2250 },
    ],
    image: pizzaImage,
  },
  {
    id: "bbq-chicken-pizza",
    name: "BBQ Chicken Pizza",
    description: "BBQ chicken, onions, cheese and BBQ sauce.",
    category: "🍕 Pizza",
    prices: [
      { label: "Small", amount: 1300 },
      { label: "Medium", amount: 1800 },
      { label: "Large", amount: 2300 },
    ],
    image: pizzaImage,
  },
  {
    id: "creamy-chicken-pizza",
    name: "Creamy Chicken Pizza",
    description: "Creamy chicken, mushrooms, cheese and special white sauce.",
    category: "🍕 Pizza",
    prices: [
      { label: "Small", amount: 1350 },
      { label: "Medium", amount: 1850 },
      { label: "Large", amount: 2350 },
    ],
    image: pizzaImage,
  },
  {
    id: "cheese-lover-pizza",
    name: "Cheese Lover Pizza",
    description: "Extra mozzarella cheese with a rich creamy cheese sauce.",
    category: "🍕 Pizza",
    prices: [
      { label: "Small", amount: 1300 },
      { label: "Medium", amount: 1800 },
      { label: "Large", amount: 2300 },
    ],
    image: pizzaImage,
  },
  {
    id: "chicken-tikka",
    name: "Chicken Tikka",
    description: "Traditional grilled chicken tikka served with chutney and salad.",
    category: "🍗 BBQ & Grilled",
    prices: [{ amount: 650 }],
    image: bbqImage,
  },
  {
    id: "chicken-malai-boti",
    name: "Chicken Malai Boti",
    description: "Tender chicken marinated in creamy spices and grilled to perfection.",
    category: "🍗 BBQ & Grilled",
    prices: [{ amount: 800 }],
    image: bbqImage,
  },
  {
    id: "chicken-seekh-kebab",
    name: "Chicken Seekh Kebab",
    description: "Juicy chicken seekh kebabs served with chutney and salad.",
    category: "🍗 BBQ & Grilled",
    prices: [{ amount: 700 }],
    image: bbqImage,
  },
  {
    id: "bbq-platter",
    name: "BBQ Platter",
    description: "A delicious combination of chicken tikka, malai boti and seekh kebab.",
    category: "🍗 BBQ & Grilled",
    prices: [{ amount: 1500 }],
    image: bbqImage,
    featured: true,
  },
  {
    id: "grilled-chicken-steak",
    name: "Grilled Chicken Steak",
    description: "Tender grilled chicken served with fries, vegetables and special sauce.",
    category: "🍗 BBQ & Grilled",
    prices: [{ amount: 1100 }],
    image: bbqImage,
  },
  {
    id: "chicken-alfredo-pasta",
    name: "Chicken Alfredo Pasta",
    description: "Creamy white sauce pasta with tender chicken and mushrooms.",
    category: "🍝 Pasta",
    prices: [{ amount: 900 }],
    image: pastaImage,
    featured: true,
  },
  {
    id: "chicken-penne-pasta",
    name: "Chicken Penne Pasta",
    description: "Penne pasta with chicken, vegetables and creamy tomato sauce.",
    category: "🍝 Pasta",
    prices: [{ amount: 850 }],
    image: pastaImage,
  },
  {
    id: "spicy-chicken-pasta",
    name: "Spicy Chicken Pasta",
    description: "Creamy pasta with spicy chicken and signature sauce.",
    category: "🍝 Pasta",
    prices: [{ amount: 900 }],
    image: pastaImage,
  },
  {
    id: "chicken-cheese-pasta",
    name: "Chicken Cheese Pasta",
    description: "Creamy pasta loaded with chicken and melted cheese.",
    category: "🍝 Pasta",
    prices: [{ amount: 950 }],
    image: pastaImage,
  },
  {
    id: "chicken-biryani",
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with spicy chicken and traditional spices.",
    category: "🍚 Rice & Chinese",
    prices: [{ amount: 450 }],
    image: chefImage,
  },
  {
    id: "chicken-fried-rice",
    name: "Chicken Fried Rice",
    description: "Fried rice with chicken, vegetables and special seasoning.",
    category: "🍚 Rice & Chinese",
    prices: [{ amount: 650 }],
    image: chefImage,
  },
  {
    id: "chicken-chow-mein",
    name: "Chicken Chow Mein",
    description: "Stir-fried noodles with chicken and fresh vegetables.",
    category: "🍚 Rice & Chinese",
    prices: [{ amount: 750 }],
    image: chefImage,
  },
  {
    id: "chicken-manchurian-with-rice",
    name: "Chicken Manchurian with Rice",
    description: "Tender chicken in spicy Manchurian sauce served with fried rice.",
    category: "🍚 Rice & Chinese",
    prices: [{ amount: 900 }],
    image: chefImage,
  },
  {
    id: "chicken-shashlik-with-rice",
    name: "Chicken Shashlik with Rice",
    description: "Grilled chicken, vegetables and special sauce served with rice.",
    category: "🍚 Rice & Chinese",
    prices: [{ amount: 950 }],
    image: chefImage,
  },
  {
    id: "chicken-club-sandwich",
    name: "Chicken Club Sandwich",
    description: "Triple-layer sandwich with chicken, egg, cheese, lettuce and mayo.",
    category: "🥪 Sandwiches & Wraps",
    prices: [{ amount: 700 }],
    image: burgerImage,
  },
  {
    id: "chicken-cheese-sandwich",
    name: "Chicken Cheese Sandwich",
    description: "Grilled chicken with melted cheese and special sauce.",
    category: "🥪 Sandwiches & Wraps",
    prices: [{ amount: 650 }],
    image: burgerImage,
  },
  {
    id: "chicken-shawarma",
    name: "Chicken Shawarma",
    description: "Chicken, fresh vegetables and garlic sauce wrapped in soft bread.",
    category: "🥪 Sandwiches & Wraps",
    prices: [{ amount: 450 }],
    image: burgerImage,
  },
  {
    id: "zinger-wrap",
    name: "Zinger Wrap",
    description: "Crispy chicken, lettuce, cheese and special sauce.",
    category: "🥪 Sandwiches & Wraps",
    prices: [{ amount: 650 }],
    image: burgerImage,
  },
  {
    id: "regular-fries",
    name: "Regular Fries",
    description: "Crispy golden fries served hot.",
    category: "🍟 Sides",
    prices: [{ amount: 300 }],
    image: heroImage,
  },
  {
    id: "masala-fries",
    name: "Masala Fries",
    description: "Crispy fries tossed in special spices.",
    category: "🍟 Sides",
    prices: [{ amount: 350 }],
    image: heroImage,
  },
  {
    id: "cheese-fries",
    name: "Cheese Fries",
    description: "Fries topped with creamy cheese sauce.",
    category: "🍟 Sides",
    prices: [{ amount: 450 }],
    image: heroImage,
  },
  {
    id: "garlic-bread",
    name: "Garlic Bread",
    description: "Freshly baked garlic bread.",
    category: "🍟 Sides",
    prices: [{ amount: 350 }],
    image: pizzaImage,
  },
  {
    id: "cheese-garlic-bread",
    name: "Cheese Garlic Bread",
    description: "Garlic bread topped with melted mozzarella cheese.",
    category: "🍟 Sides",
    prices: [{ amount: 500 }],
    image: pizzaImage,
  },
  {
    id: "chocolate-brownie",
    name: "Chocolate Brownie",
    description: "Warm chocolate brownie served with chocolate sauce.",
    category: "🍰 Desserts",
    prices: [{ amount: 450 }],
    image: dessertImage,
  },
  {
    id: "chocolate-lava-cake",
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a rich melted chocolate center.",
    category: "🍰 Desserts",
    prices: [{ amount: 550 }],
    image: dessertImage,
    featured: true,
  },
  {
    id: "vanilla-ice-cream",
    name: "Vanilla Ice Cream",
    description: "Creamy vanilla ice cream.",
    category: "🍰 Desserts",
    prices: [{ amount: 300 }],
    image: dessertImage,
  },
  {
    id: "chocolate-sundae",
    name: "Chocolate Sundae",
    description: "Chocolate ice cream with chocolate sauce and toppings.",
    category: "🍰 Desserts",
    prices: [{ amount: 450 }],
    image: dessertImage,
  },
  {
    id: "fresh-lemonade",
    name: "Fresh Lemonade",
    description: "Fresh lemon drink served chilled.",
    category: "🥤 Drinks",
    prices: [{ amount: 250 }],
    image: diningImage,
  },
  {
    id: "mint-margarita",
    name: "Mint Margarita",
    description: "Refreshing mint and lime drink.",
    category: "🥤 Drinks",
    prices: [{ amount: 300 }],
    image: diningImage,
  },
  {
    id: "soft-drink",
    name: "Soft Drink",
    description: "Chilled soft drink.",
    category: "🥤 Drinks",
    prices: [{ amount: 150 }],
    image: diningImage,
  },
  {
    id: "mineral-water",
    name: "Mineral Water",
    description: "Bottled mineral water.",
    category: "🥤 Drinks",
    prices: [{ amount: 100 }],
    image: diningImage,
  },
  {
    id: "fresh-orange-juice",
    name: "Fresh Orange Juice",
    description: "Fresh orange juice served chilled.",
    category: "🥤 Drinks",
    prices: [{ amount: 350 }],
    image: diningImage,
  },
];

const highlights = [
  "Fresh Ingredients",
  "Delicious Flavors",
  "Expert Chefs",
  "Family-Friendly Atmosphere",
  "Quality Service",
];

const galleryItems = [
  { title: "Burgers", image: burgerImage, height: "lg:row-span-2" },
  { title: "Pizza", image: pizzaImage, height: "" },
  { title: "BBQ", image: bbqImage, height: "" },
  { title: "Pasta", image: pastaImage, height: "lg:row-span-2" },
  { title: "Desserts", image: dessertImage, height: "" },
  { title: "Restaurant interior", image: interiorImage, height: "" },
  { title: "Chef preparing food", image: chefImage, height: "lg:row-span-2" },
  { title: "Dining atmosphere", image: diningImage, height: "" },
];

const reviews = [
  {
    name: "Ayesha Khan",
    rating: 5,
    review:
      "Sample review: The BBQ platter was flavorful, fresh and perfect for a family dinner.",
    initials: "AK",
  },
  {
    name: "Hamza Ali",
    rating: 5,
    review:
      "Sample review: Loved the zinger burger and creamy pasta. Fast service and great taste.",
    initials: "HA",
  },
  {
    name: "Sana Mahmood",
    rating: 5,
    review:
      "Sample review: A warm place for casual dining with generous portions and polite staff.",
    initials: "SM",
  },
];

function formatPrice(amount: number) {
  return `₨ ${amount.toLocaleString("en-PK")}`;
}

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  element?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [hasLoadedCart, setHasLoadedCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderSummary, setOrderSummary] = useState<CheckoutSummary | null>(null);
  const [reservationSummary, setReservationSummary] = useState<ReservationSummary | null>(null);
  const [lightbox, setLightbox] = useState<(typeof galleryItems)[number] | null>(null);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("zz-restaurant-cart");
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        if (Array.isArray(parsed)) {
          setCart(parsed);
        }
      }
    } catch {
      setCart([]);
    } finally {
      setHasLoadedCart(true);
    }
  }, []);

  useEffect(() => {
    if (hasLoadedCart) {
      window.localStorage.setItem("zz-restaurant-cart", JSON.stringify(cart));
    }
  }, [cart, hasLoadedCart]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return menuItems.filter((item) => {
      const categoryMatch = activeCategory === "All" || item.category === activeCategory;
      const searchMatch =
        normalizedSearch.length === 0 ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch) ||
        item.category.toLowerCase().includes(normalizedSearch);
      return categoryMatch && searchMatch;
    });
  }, [activeCategory, searchTerm]);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = cart.length > 0 ? subtotal + deliveryFee : 0;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (item: MenuItem, priceOption = item.prices[0]) => {
    if (!priceOption) {
      return;
    }

    const cartId = `${item.id}-${priceOption.label ?? "regular"}`;
    setCart((current) => {
      const existing = current.find((cartItem) => cartItem.cartId === cartId);
      if (existing) {
        return current.map((cartItem) =>
          cartItem.cartId === cartId ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        );
      }
      return [
        ...current,
        {
          cartId,
          itemId: item.id,
          name: item.name,
          label: priceOption.label,
          price: priceOption.amount,
          quantity: 1,
          image: item.image,
        },
      ];
    });
    setOrderSummary(null);
  };

  const updateQuantity = (cartId: string, change: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.cartId === cartId ? { ...item, quantity: Math.max(0, item.quantity + change) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (cartId: string) => {
    setCart((current) => current.filter((item) => item.cartId !== cartId));
  };

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  const handleCheckoutSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (cart.length === 0) {
      return;
    }

    const form = new FormData(event.currentTarget);
    const name = String(form.get("customerName") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const addressValue = String(form.get("address") ?? "").trim();
    const notes = String(form.get("notes") ?? "").trim();
    const orderType = String(form.get("orderType") ?? "Delivery");

    if (!name || !phone || !addressValue || phone.length < 7) {
      return;
    }

    setOrderSummary({
      name,
      phone,
      address: addressValue,
      notes,
      orderType,
      items: cart,
      subtotal,
      deliveryFee: orderType === "Delivery" ? deliveryFee : 0,
      grandTotal: orderType === "Delivery" ? subtotal + deliveryFee : subtotal,
    });
    setCart([]);
    setShowCheckout(false);
    event.currentTarget.reset();
  };

  const handleReservationSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("reservationName") ?? "").trim();
    const phone = String(form.get("reservationPhone") ?? "").trim();
    const date = String(form.get("reservationDate") ?? "").trim();
    const time = String(form.get("reservationTime") ?? "").trim();
    const guests = String(form.get("guests") ?? "").trim();

    if (!name || !phone || !date || !time || !guests) {
      return;
    }

    setReservationSummary({ name, phone, date, time, guests });
    event.currentTarget.reset();
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/88 backdrop-blur-xl">
        <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => handleNavClick("home")}
            className="flex min-w-0 items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Go to home"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/50 bg-primary/15 font-serif text-lg font-bold text-primary shadow-gold">
              ZZ
            </span>
            <span className="min-w-0">
              <span className="block truncate font-serif text-lg font-bold tracking-wide text-foreground">
                ZZ RESTAURANT
              </span>
              <span className="block truncate text-xs uppercase tracking-[0.24em] text-muted-foreground">
                Faisalabad
              </span>
            </span>
          </button>

          <div className="hidden items-center gap-1 lg:flex">
            <DesktopNav onNavigate={handleNavClick} />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Button
              type="button"
              variant="goldGhost"
              size="icon"
              onClick={() => handleNavClick("cart")}
              aria-label={`Open cart with ${itemCount} items`}
              className="relative"
            >
              <ShoppingBag />
              {itemCount > 0 && <CartBadge count={itemCount} />}
            </Button>
            <Button
              type="button"
              variant="goldGhost"
              size="icon"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </nav>
        {isMenuOpen && (
          <div className="border-t border-border bg-surface px-4 py-4 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              <MobileNav onNavigate={handleNavClick} itemCount={itemCount} />
            </div>
          </div>
        )}
      </header>

      <section id="home" className="relative min-h-[92svh] overflow-hidden pt-20">
        <img
          src={heroImage}
          alt="Grilled chicken, burgers, pizza and pasta served at ZZ RESTAURANT"
          width={1600}
          height={1000}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto grid min-h-[calc(92svh-5rem)] max-w-7xl items-center px-4 pb-16 pt-24 sm:px-6 lg:px-8">
          <div className="max-w-4xl animate-fade-up">
            <p className="mb-4 inline-flex rounded-full border border-primary/40 bg-background/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary backdrop-blur">
              Sargodha Road, Faisalabad
            </p>
            <h1 className="font-serif text-5xl font-black leading-[0.95] text-foreground sm:text-7xl lg:text-8xl">
              ZZ RESTAURANT
            </h1>
            <p className="mt-5 font-serif text-3xl text-primary sm:text-5xl">
              Taste. Tradition. Excellence.
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream-soft sm:text-xl">
              Delicious food, unforgettable flavors, and a dining experience made with passion.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button type="button" variant="hero" size="xl" onClick={() => handleNavClick("menu")}> 
                <Utensils /> View Menu
              </Button>
              <Button type="button" variant="cream" size="xl" onClick={() => handleNavClick("menu")}> 
                <ShoppingBag /> Order Now
              </Button>
              <Button
                type="button"
                variant="goldOutline"
                size="xl"
                onClick={() => handleNavClick("reservations")}
              >
                <CalendarDays /> Reserve a Table
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section-shell bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-8">
          <div className="relative min-h-[520px] overflow-hidden rounded-2xl border border-border bg-surface shadow-premium">
            <img
              src={chefImage}
              alt="Chef preparing grilled food at ZZ RESTAURANT"
              width={928}
              height={720}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-x-5 bottom-5 rounded-xl border border-primary/25 bg-background/82 p-5 backdrop-blur">
              <p className="text-sm uppercase tracking-[0.22em] text-primary">Crafted fresh daily</p>
              <p className="mt-2 font-serif text-2xl text-foreground">Food made with skill, care and warmth.</p>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <SectionKicker>About ZZ RESTAURANT</SectionKicker>
            <h2 className="section-title">Fresh food, careful cooking, welcoming tables.</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              ZZ RESTAURANT offers delicious food made with fresh ingredients, carefully prepared by skilled chefs in a welcoming environment. From crispy starters to smoky BBQ and rich desserts, every plate is made for memorable family moments.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 shadow-soft">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                    <Star className="h-4 w-4 fill-current" />
                  </span>
                  <span className="font-semibold text-foreground">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="menu" className="section-shell bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div>
              <SectionKicker>Order Online</SectionKicker>
              <h2 className="section-title">Explore the ZZ menu.</h2>
              <p className="mt-4 max-w-3xl text-muted-foreground">
                Search, filter by category and add your favorites to the cart. Prices are shown in PKR.
              </p>
            </div>
            <div className="rounded-xl border border-primary/30 bg-background p-4 shadow-gold-soft">
              <p className="text-sm text-muted-foreground">Cart total</p>
              <p className="mt-1 font-serif text-3xl text-primary">{formatPrice(grandTotal)}</p>
            </div>
          </div>

          <div className="sticky top-[72px] z-30 mt-8 rounded-2xl border border-border bg-background/92 p-3 shadow-premium backdrop-blur">
            <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)]">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {categories.map((category) => (
                  <Button
                    key={category}
                    type="button"
                    variant={activeCategory === category ? "hero" : "category"}
                    size="sm"
                    onClick={() => setActiveCategory(category)}
                    className="shrink-0"
                  >
                    {category}
                  </Button>
                ))}
              </div>
              <label className="relative block">
                <span className="sr-only">Search menu items</span>
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search burgers, pizza, BBQ..."
                  className="h-11 w-full rounded-xl border border-input bg-input px-11 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
                />
              </label>
            </div>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} onAdd={addToCart} />
            ))}
          </div>
          {filteredItems.length === 0 && (
            <div className="mt-10 rounded-2xl border border-border bg-card p-10 text-center">
              <p className="font-serif text-2xl text-foreground">No menu item found.</p>
              <p className="mt-2 text-muted-foreground">Try another search or category.</p>
            </div>
          )}
        </div>
      </section>

      <CartSection
        cart={cart}
        subtotal={subtotal}
        grandTotal={grandTotal}
        itemCount={itemCount}
        showCheckout={showCheckout}
        orderSummary={orderSummary}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        onCheckout={() => setShowCheckout(true)}
        onSubmitCheckout={handleCheckoutSubmit}
      />

      <section id="reservations" className="section-shell bg-surface">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:px-8">
          <div>
            <SectionKicker>Reservations</SectionKicker>
            <h2 className="section-title">Reserve a table for your next meal.</h2>
            <p className="mt-5 text-lg leading-8 text-muted-foreground">
              Plan a family dinner, friendly meetup or casual celebration at ZZ RESTAURANT.
            </p>
            <div className="mt-8 rounded-2xl border border-primary/30 bg-background p-6 shadow-gold-soft">
              <div className="flex items-start gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                  <Clock />
                </span>
                <div>
                  <h3 className="font-serif text-2xl text-foreground">Opening Hours</h3>
                  <p className="mt-3 text-muted-foreground">Monday – Sunday</p>
                  <p className="mt-1 text-xl font-semibold text-primary">11:00 AM – 11:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          <form onSubmit={handleReservationSubmit} className="rounded-2xl border border-border bg-card p-5 shadow-premium sm:p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="reservationName" required />
              <Field label="Phone" name="reservationPhone" type="tel" required />
              <Field label="Date" name="reservationDate" type="date" required />
              <Field label="Time" name="reservationTime" type="time" required />
              <Field label="Number of Guests" name="guests" type="number" min="1" required />
              <Field label="Special Requests" name="requests" />
            </div>
            <Button type="submit" variant="hero" size="xl" className="mt-6 w-full">
              Reserve a Table
            </Button>
            {reservationSummary && (
              <div className="mt-5 rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm text-foreground">
                Reservation request received for {reservationSummary.name} on {reservationSummary.date} at {reservationSummary.time} for {reservationSummary.guests} guests.
              </div>
            )}
          </form>
        </div>
      </section>

      <section id="gallery" className="section-shell bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <SectionKicker>Gallery</SectionKicker>
            <h2 className="section-title">A look at the food and atmosphere.</h2>
          </div>
          <div className="mt-9 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {galleryItems.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setLightbox(item)}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${item.height}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  width={928}
                  height={720}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-gallery-overlay" />
                <span className="absolute bottom-4 left-4 font-serif text-2xl text-foreground">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-surface">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
            <div>
              <SectionKicker>Customer Reviews</SectionKicker>
              <h2 className="section-title">Sample reviews.</h2>
              <p className="mt-4 text-muted-foreground">
                These are placeholder reviews and can be replaced with real customer reviews later.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {reviews.map((review) => (
                <article key={review.name} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
                  <div className="flex items-center gap-3">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/15 font-semibold text-primary">
                      {review.initials}
                    </span>
                    <div>
                      <h3 className="font-semibold text-foreground">{review.name}</h3>
                      <div className="mt-1 flex text-primary" aria-label={`${review.rating} star rating`}>
                        {Array.from({ length: review.rating }).map((_, index) => (
                          <Star key={index} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{review.review}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell bg-background">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <SectionKicker>Contact & Location</SectionKicker>
            <h2 className="section-title">Visit ZZ RESTAURANT.</h2>
            <div className="mt-7 grid gap-4">
              <InfoCard icon={<MapPin />} label="Address" value={address} />
              <InfoCard icon={<Phone />} label="Phone" value={phoneNumber} />
            </div>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="hero" size="xl">
                <a href={`tel:${phoneNumber}`}>
                  <Phone /> Call Now
                </a>
              </Button>
              <Button asChild variant="goldOutline" size="xl">
                <a href={directionsUrl} target="_blank" rel="noreferrer">
                  <MapPin /> Get Directions
                </a>
              </Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-premium">
            <div className="p-5">
              <h3 className="font-serif text-2xl text-foreground">ZZ RESTAURANT — Sargodha Road, Faisalabad</h3>
            </div>
            <iframe
              title="ZZ RESTAURANT map"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                `ZZ RESTAURANT ${address}`,
              )}&output=embed`}
              className="h-[360px] w-full border-0 grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-footer py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_auto_auto] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-primary/50 bg-primary/15 font-serif text-lg font-bold text-primary">
                ZZ
              </span>
              <div>
                <h2 className="font-serif text-2xl text-foreground">ZZ RESTAURANT</h2>
                <p className="text-muted-foreground">Great food. Great moments.</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-muted-foreground sm:grid-cols-3 lg:grid-cols-2">
            {[
              ["Home", "home"],
              ["Menu", "menu"],
              ["About", "about"],
              ["Reservations", "reservations"],
              ["Contact", "contact"],
              ["Cart", "cart"],
            ].map(([label, id]) => (
              <button
                key={id}
                type="button"
                onClick={() => handleNavClick(id)}
                className="text-left transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {label}
              </button>
            ))}
          </div>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <span className="block text-foreground">Contact:</span>
              {phoneNumber}
            </p>
            <p>
              <span className="block text-foreground">Address:</span>
              {address}
            </p>
            <div className="flex gap-2 pt-2">
              {[Facebook, Instagram, Twitter].map((Icon, index) => (
                <span key={index} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card text-primary">
                  <Icon className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {lightbox && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-background/90 p-4 backdrop-blur" role="dialog" aria-modal="true">
          <div className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-premium">
            <img src={lightbox.image} alt={lightbox.title} className="max-h-[78svh] w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-gallery-overlay p-6">
              <p className="font-serif text-3xl text-foreground">{lightbox.title}</p>
            </div>
            <Button
              type="button"
              variant="goldGhost"
              size="icon"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 bg-background/80"
              aria-label="Close gallery image"
            >
              <X />
            </Button>
          </div>
        </div>
      )}
    </main>
  );
}

function DesktopNav({ onNavigate }: { onNavigate: (id: string) => void }) {
  const links = [
    ["Home", "home"],
    ["About", "about"],
    ["Menu", "menu"],
    ["Gallery", "gallery"],
    ["Reservations", "reservations"],
    ["Contact", "contact"],
  ];
  return (
    <>
      {links.map(([label, id]) => (
        <Button key={id} type="button" variant="nav" size="sm" onClick={() => onNavigate(id)}>
          {label}
        </Button>
      ))}
      <Button type="button" variant="hero" size="sm" onClick={() => onNavigate("cart")} className="relative ml-2">
        <ShoppingBag /> Cart
      </Button>
    </>
  );
}

function MobileNav({ onNavigate, itemCount }: { onNavigate: (id: string) => void; itemCount: number }) {
  const links = [
    ["Home", "home"],
    ["About", "about"],
    ["Menu", "menu"],
    ["Gallery", "gallery"],
    ["Reservations", "reservations"],
    ["Contact", "contact"],
    ["Cart", "cart"],
  ];
  return links.map(([label, id]) => (
    <Button key={id} type="button" variant="nav" className="justify-start" onClick={() => onNavigate(id)}>
      {id === "cart" && <ShoppingBag />}
      {label}
      {id === "cart" && itemCount > 0 ? <span className="ml-auto text-primary">{itemCount}</span> : null}
    </Button>
  ));
}

function CartBadge({ count }: { count: number }) {
  return (
    <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
      {count}
    </span>
  );
}

function SectionKicker({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-bold uppercase tracking-[0.24em] text-primary">{children}</p>;
}

function FoodCard({ item, onAdd }: { item: MenuItem; onAdd: (item: MenuItem, price: { label?: string; amount: number }) => void }) {
  const [selectedPrice, setSelectedPrice] = useState(item.prices[0]);

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary/70 hover:shadow-gold-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={item.image}
          alt={item.name}
          width={928}
          height={720}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {item.featured && (
          <span className="absolute left-4 top-4 rounded-full border border-primary/30 bg-background/80 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-primary backdrop-blur">
            Favorite
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{item.category}</p>
            <h3 className="mt-2 font-serif text-2xl text-foreground">{item.name}</h3>
          </div>
          <p className="shrink-0 rounded-full bg-primary/15 px-3 py-1 text-sm font-bold text-primary">
            {item.prices.length > 1 ? `From ${formatPrice(item.prices[0]?.amount ?? 0)}` : formatPrice(item.prices[0]?.amount ?? 0)}
          </p>
        </div>
        <p className="mt-3 min-h-12 text-sm leading-6 text-muted-foreground">{item.description}</p>
        {item.prices.length > 1 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {item.prices.map((price) => (
              <Button
                key={price.label}
                type="button"
                variant={selectedPrice?.label === price.label ? "hero" : "category"}
                size="sm"
                onClick={() => setSelectedPrice(price)}
                className="h-auto flex-col gap-1 py-2"
              >
                <span>{price.label}</span>
                <span>{formatPrice(price.amount)}</span>
              </Button>
            ))}
          </div>
        )}
        <Button type="button" variant="hero" className="mt-5 w-full" onClick={() => selectedPrice && onAdd(item, selectedPrice)}>
          <Plus /> Add to Cart
        </Button>
      </div>
    </article>
  );
}

function CartSection({
  cart,
  subtotal,
  grandTotal,
  itemCount,
  showCheckout,
  orderSummary,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  onSubmitCheckout,
}: {
  cart: CartItem[];
  subtotal: number;
  grandTotal: number;
  itemCount: number;
  showCheckout: boolean;
  orderSummary: CheckoutSummary | null;
  onUpdateQuantity: (cartId: string, change: number) => void;
  onRemove: (cartId: string) => void;
  onCheckout: () => void;
  onSubmitCheckout: (event: React.FormEvent<HTMLFormElement>) => void;
}) {
  return (
    <section id="cart" className="section-shell bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div>
            <SectionKicker>Shopping Cart</SectionKicker>
            <h2 className="section-title">Your Cart</h2>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card shadow-premium">
              <div className="hidden grid-cols-[minmax(0,1.6fr)_0.6fr_0.8fr_0.6fr_auto] gap-4 border-b border-border px-5 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground md:grid">
                <span>Item</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Total</span>
                <span>Remove</span>
              </div>
              {cart.length === 0 ? (
                <div className="p-8 text-center">
                  <ShoppingBag className="mx-auto h-10 w-10 text-primary" />
                  <p className="mt-4 font-serif text-2xl text-foreground">Your cart is empty.</p>
                  <p className="mt-2 text-muted-foreground">Add a dish from the menu to begin your order.</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {cart.map((item) => (
                    <div key={item.cartId} className="grid gap-4 p-5 md:grid-cols-[minmax(0,1.6fr)_0.6fr_0.8fr_0.6fr_auto] md:items-center">
                      <div className="flex min-w-0 items-center gap-4">
                        <img src={item.image} alt="" width={88} height={72} loading="lazy" className="h-18 w-22 shrink-0 rounded-xl object-cover" />
                        <div className="min-w-0">
                          <h3 className="truncate font-semibold text-foreground">{item.name}</h3>
                          {item.label && <p className="text-sm text-primary">{item.label}</p>}
                        </div>
                      </div>
                      <p className="font-semibold text-foreground">{formatPrice(item.price)}</p>
                      <div className="flex w-fit items-center rounded-full border border-border bg-background p-1">
                        <Button type="button" variant="goldGhost" size="iconSm" onClick={() => onUpdateQuantity(item.cartId, -1)} aria-label={`Decrease ${item.name}`}>
                          <Minus />
                        </Button>
                        <span className="w-9 text-center font-semibold text-foreground">{item.quantity}</span>
                        <Button type="button" variant="goldGhost" size="iconSm" onClick={() => onUpdateQuantity(item.cartId, 1)} aria-label={`Increase ${item.name}`}>
                          <Plus />
                        </Button>
                      </div>
                      <p className="font-bold text-primary">{formatPrice(item.price * item.quantity)}</p>
                      <Button type="button" variant="goldGhost" size="icon" onClick={() => onRemove(item.cartId)} aria-label={`Remove ${item.name}`}>
                        <Trash2 />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="h-fit rounded-2xl border border-primary/30 bg-card p-5 shadow-gold-soft sm:p-7">
            <h3 className="font-serif text-3xl text-foreground">Order Summary</h3>
            <div className="mt-5 space-y-3 text-sm">
              <SummaryRow label="Items" value={`${itemCount}`} />
              <SummaryRow label="Subtotal" value={formatPrice(subtotal)} />
              <SummaryRow label="Delivery Fee" value={cart.length > 0 ? formatPrice(deliveryFee) : formatPrice(0)} />
              <div className="border-t border-border pt-4">
                <SummaryRow label="Grand Total" value={formatPrice(grandTotal)} strong />
              </div>
            </div>
            <Button type="button" variant="hero" size="xl" className="mt-6 w-full" disabled={cart.length === 0} onClick={onCheckout}>
              Place Order
            </Button>

            {showCheckout && (
              <form onSubmit={onSubmitCheckout} className="mt-7 grid gap-4 border-t border-border pt-7">
                <h4 className="font-serif text-2xl text-foreground">Checkout / Order Form</h4>
                <Field label="Customer Name" name="customerName" required />
                <Field label="Phone Number" name="phone" type="tel" required />
                <Field label="Delivery Address" name="address" required />
                <label className="grid gap-2 text-sm font-semibold text-foreground">
                  Order Notes
                  <textarea
                    name="notes"
                    rows={3}
                    className="rounded-xl border border-input bg-input px-4 py-3 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
                  />
                </label>
                <fieldset className="grid gap-3 rounded-xl border border-border p-4">
                  <legend className="px-2 text-sm font-semibold text-foreground">Order Type</legend>
                  <label className="flex items-center gap-3 text-sm text-muted-foreground">
                    <input className="accent-primary" type="radio" name="orderType" value="Delivery" defaultChecked />
                    Delivery
                  </label>
                  <label className="flex items-center gap-3 text-sm text-muted-foreground">
                    <input className="accent-primary" type="radio" name="orderType" value="Pickup" />
                    Pickup
                  </label>
                </fieldset>
                <Button type="submit" variant="cream" size="xl" className="w-full">
                  Confirm Order
                </Button>
              </form>
            )}

            {orderSummary && (
              <div className="mt-7 rounded-xl border border-primary/30 bg-primary/10 p-5">
                <h4 className="font-serif text-2xl text-foreground">Order confirmed.</h4>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Thank you, {orderSummary.name}. Your {orderSummary.orderType.toLowerCase()} order has been received.
                </p>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {orderSummary.items.map((item) => (
                    <div key={item.cartId} className="flex justify-between gap-3">
                      <span>{item.quantity} × {item.name}{item.label ? ` (${item.label})` : ""}</span>
                      <span className="text-primary">{formatPrice(item.quantity * item.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 border-t border-border pt-4">
                  <SummaryRow label="Grand Total" value={formatPrice(orderSummary.grandTotal)} strong />
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-4 ${strong ? "text-lg font-bold text-foreground" : "text-muted-foreground"}`}>
      <span>{label}</span>
      <span className={strong ? "text-primary" : "text-foreground"}>{value}</span>
    </div>
  );
}

function Field({ label, name, type = "text", required = false, min }: { label: string; name: string; type?: string; required?: boolean; min?: string }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-foreground">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        min={min}
        className="h-12 rounded-xl border border-input bg-input px-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function InfoCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">{icon}</span>
      <div>
        <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        <p className="mt-2 text-lg font-semibold text-foreground">{value}</p>
      </div>
    </div>
  );
}
