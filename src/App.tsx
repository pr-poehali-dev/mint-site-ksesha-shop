import { useState } from "react";
import Icon from "@/components/ui/icon";

const PRODUCTS = [
  { id: 1, name: "Heart Charm", emoji: "🩷", desc: "Pastel pink heart with glitter", price: 200, img: "https://cdn.poehali.dev/projects/8ba4c256-5dea-4df8-ab99-16740f3e74ba/files/74847898-00c1-4e44-907e-8c64b8c14482.jpg" },
  { id: 2, name: "Star Glow", emoji: "⭐", desc: "Shimmery golden star pendant", price: 200, img: "https://cdn.poehali.dev/projects/8ba4c256-5dea-4df8-ab99-16740f3e74ba/files/df20f325-cf88-4137-9cf6-95ed4ec27ee5.jpg" },
  { id: 3, name: "Mini Cloud", emoji: "☁️", desc: "Soft white fluffy cloud shape", price: 200, img: "https://cdn.poehali.dev/projects/8ba4c256-5dea-4df8-ab99-16740f3e74ba/files/e2b2c6a2-590b-434b-b66c-13c30d01c6e5.jpg" },
  { id: 4, name: "Lucky Cat", emoji: "🐱", desc: "Kawaii fortune cat charm", price: 200, img: "https://cdn.poehali.dev/projects/8ba4c256-5dea-4df8-ab99-16740f3e74ba/files/80fc765e-aa25-48ef-923a-3627c3bdc89f.jpg" },
  { id: 5, name: "Sweet Bow", emoji: "🎀", desc: "Satin ribbon with rhinestones", price: 200, img: "https://cdn.poehali.dev/projects/8ba4c256-5dea-4df8-ab99-16740f3e74ba/files/5ba5bf54-38e3-4837-8c6b-181c81ba51d9.jpg" },
  { id: 6, name: "Moon Drop", emoji: "🌙", desc: "Crescent moon in mint enamel", price: 200, img: "https://cdn.poehali.dev/projects/8ba4c256-5dea-4df8-ab99-16740f3e74ba/files/5b22c8b7-5729-4ff7-b6cb-c33fa9962a73.jpg" },
  { id: 7, name: "Cherry Pair", emoji: "🍒", desc: "Twin cherries on a chain", price: 200, img: "https://cdn.poehali.dev/projects/8ba4c256-5dea-4df8-ab99-16740f3e74ba/files/e442c961-6d9d-41ee-be93-0dd07138a0de.jpg" },
  { id: 8, name: "Daisy Bell", emoji: "🌼", desc: "Daisy flower with tiny bell", price: 200, img: "https://cdn.poehali.dev/projects/8ba4c256-5dea-4df8-ab99-16740f3e74ba/files/ddb5ea17-1c1b-44fa-b481-da2799fc3a0c.jpg" },
  { id: 9, name: "Book Cards Set", emoji: "📚", desc: "Набор карточек-брелков с обложками книг", price: 200, img: "https://cdn.poehali.dev/projects/8ba4c256-5dea-4df8-ab99-16740f3e74ba/bucket/d1680e0e-3b1a-4f50-8652-a820fdcd9646.jpeg" },
];

type Page = "home" | "catalog" | "cart";

interface CartItem {
  id: number;
  name: string;
  emoji: string;
  price: number;
  qty: number;
}

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const changeQty = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((i) => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i)
    );
  };

  return (
    <div className="min-h-screen bg-background font-body">
      {/* NAV */}
      <nav className="sticky top-0 z-50 glass-card border-b border-border">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => setPage("home")}
            className="font-display text-2xl font-semibold text-primary tracking-wide"
          >
            Ksesha Shop
          </button>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setPage("home")}
              className={`text-sm font-medium transition-colors ${page === "home" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              Home
            </button>
            <button
              onClick={() => setPage("catalog")}
              className={`text-sm font-medium transition-colors ${page === "catalog" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              Catalog
            </button>
            <button
              onClick={() => setPage("cart")}
              className={`relative text-sm font-medium transition-colors ${page === "cart" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Icon name="ShoppingBag" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* HOME */}
      {page === "home" && (
        <div className="animate-fade-in">
          {/* Hero */}
          <section className="mint-gradient py-24 px-6 text-center relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 50%, hsl(158,60%,60%) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(152,70%,70%) 0%, transparent 40%)",
              }}
            />
            <div className="relative max-w-2xl mx-auto">
              <p className="text-primary font-body text-sm font-medium tracking-widest uppercase mb-4">
                ✦ Handpicked keychains ✦
              </p>
              <h1 className="font-display text-6xl md:text-8xl font-light text-foreground leading-none mb-6">
                Ksesha
                <br />
                <span className="italic text-primary">Shop</span>
              </h1>
              <p className="text-muted-foreground text-base mb-10 max-w-sm mx-auto leading-relaxed">
                Cute &amp; charming keychains — each one a little treasure for you or your loved ones.
              </p>
              <button
                onClick={() => setPage("catalog")}
                className="bg-primary text-primary-foreground px-10 py-3 rounded-full font-medium text-sm hover:opacity-90 transition-all hover:shadow-lg"
              >
                Shop Now
              </button>
            </div>
          </section>

          {/* Features */}
          <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "Sparkles", title: "200₽ each", desc: "One flat price — no surprises" },
              { icon: "Package", title: "Gift wrapped", desc: "Every order comes in a cute pouch" },
              { icon: "Heart", title: "Made with love", desc: "Handpicked for charm collectors" },
            ].map((f) => (
              <div key={f.title} className="text-center p-6 rounded-2xl bg-mint-light/60 border border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={f.icon as "Sparkles"} size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </section>

          {/* Preview */}
          <section className="max-w-5xl mx-auto px-6 pb-20">
            <h2 className="font-display text-4xl font-light text-center mb-12">New Arrivals</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PRODUCTS.slice(0, 4).map((p) => (
                <div key={p.id} className="glass-card rounded-2xl p-5 hover-scale cursor-pointer">
                  <div className="w-full aspect-square bg-mint-light rounded-xl overflow-hidden mb-3">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-medium text-sm text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
                  <p className="text-primary font-semibold text-sm mt-2">200 ₽</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <button
                onClick={() => setPage("catalog")}
                className="border border-primary text-primary px-8 py-2.5 rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all"
              >
                View all keychains →
              </button>
            </div>
          </section>
        </div>
      )}

      {/* CATALOG */}
      {page === "catalog" && (
        <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="font-display text-5xl font-light mb-3">Catalog</h2>
            <p className="text-muted-foreground text-sm">All keychains — 200 ₽ each</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {PRODUCTS.map((p, i) => (
              <div
                key={p.id}
                className="glass-card rounded-2xl overflow-hidden hover-scale group"
                style={{ animation: `fadeIn 0.4s ease ${i * 0.06}s both` }}
              >
                <div className="aspect-square bg-mint-light overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <p className="font-semibold text-sm text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.desc}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-primary font-bold">200 ₽</span>
                    <button
                      onClick={() => addToCart(p)}
                      className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-full hover:opacity-90 transition-all flex items-center gap-1"
                    >
                      <Icon name="Plus" size={12} />
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CART */}
      {page === "cart" && (
        <div className="max-w-2xl mx-auto px-6 py-12 animate-fade-in">
          <h2 className="font-display text-5xl font-light mb-8 text-center">Your Cart</h2>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🛍️</div>
              <p className="text-muted-foreground mb-6">Your cart is empty</p>
              <button
                onClick={() => setPage("catalog")}
                className="bg-primary text-primary-foreground px-8 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-all"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-3 mb-8">
                {cart.map((item) => (
                  <div key={item.id} className="glass-card rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-14 h-14 bg-mint-light rounded-xl flex items-center justify-center text-2xl shrink-0">
                      {item.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">200 ₽ each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeQty(item.id, -1)}
                        className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Icon name="Minus" size={12} />
                      </button>
                      <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
                      <button
                        onClick={() => changeQty(item.id, 1)}
                        className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors"
                      >
                        <Icon name="Plus" size={12} />
                      </button>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-primary text-sm">{item.price * item.qty} ₽</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-muted-foreground hover:text-destructive transition-colors mt-1"
                      >
                        remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card rounded-2xl p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground text-sm">Items</span>
                  <span className="text-sm">{cartCount} pcs</span>
                </div>
                <div className="flex justify-between items-center border-t border-border pt-4 mb-6">
                  <span className="font-display text-xl">Total</span>
                  <span className="font-display text-2xl text-primary">{cartTotal} ₽</span>
                </div>
                <button className="w-full bg-primary text-primary-foreground py-3 rounded-full font-medium hover:opacity-90 transition-all">
                  Checkout
                </button>
                <button
                  onClick={() => setPage("catalog")}
                  className="w-full text-center text-sm text-muted-foreground mt-3 hover:text-foreground transition-colors"
                >
                  Continue shopping
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-border mt-8 py-8 text-center">
        <p className="font-display text-lg text-primary italic mb-1">Ksesha Shop</p>
        <p className="text-xs text-muted-foreground">Cute keychains, big joy ✦ 200 ₽ each</p>
      </footer>
    </div>
  );
}