import { useState } from "react";
import Icon from "@/components/ui/icon";

const PRODUCTS = [
  { id: 9, name: "Book Cards Set", emoji: "📚", desc: "Набор карточек-брелков с обложками книг", price: 200, img: "https://cdn.poehali.dev/projects/8ba4c256-5dea-4df8-ab99-16740f3e74ba/bucket/d1680e0e-3b1a-4f50-8652-a820fdcd9646.jpeg", status: "coming_soon" },
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
              Главная
            </button>
            <button
              onClick={() => setPage("catalog")}
              className={`text-sm font-medium transition-colors ${page === "catalog" ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
            >
              Каталог
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
                ✦ Брелки с душой ✦
              </p>
              <h1 className="font-display text-6xl md:text-8xl font-light text-foreground leading-none mb-6">
                Ksesha
                <br />
                <span className="italic text-primary">Shop</span>
              </h1>
              <p className="text-muted-foreground text-base mb-10 max-w-sm mx-auto leading-relaxed">
                Милые и стильные брелки — каждый как маленькое сокровище для тебя или в подарок.
              </p>
              <button
                onClick={() => setPage("catalog")}
                className="bg-primary text-primary-foreground px-10 py-3 rounded-full font-medium text-sm hover:opacity-90 transition-all hover:shadow-lg"
              >
                Смотреть каталог
              </button>
            </div>
          </section>

          {/* Banner */}
          <section className="relative overflow-hidden">
            <img
              src="https://cdn.poehali.dev/projects/8ba4c256-5dea-4df8-ab99-16740f3e74ba/bucket/e0479101-eb07-4ab5-80c1-f2b322677e6a.jpeg"
              alt="Ksesha Shop баннер"
              className="w-full h-64 md:h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent flex items-center px-8 md:px-16">
              <div className="text-white max-w-md">
                <p className="text-xs font-medium tracking-widest uppercase mb-2 opacity-80">Ksesha Shop</p>
                <h2 className="font-display text-4xl md:text-5xl font-light leading-tight mb-3">
                  Брелки, которые<br />говорят о тебе
                </h2>
                <p className="text-sm opacity-80 mb-5 leading-relaxed">
                  Милые брелки с книжными обложками и kawaii-персонажами — каждый по 200 ₽
                </p>
                <button
                  onClick={() => setPage("catalog")}
                  className="bg-white text-foreground text-sm font-medium px-6 py-2.5 rounded-full hover:opacity-90 transition-all"
                >
                  Перейти в каталог
                </button>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="max-w-5xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "Sparkles", title: "200₽ за штуку", desc: "Единая цена — никаких сюрпризов" },
              { icon: "Package", title: "Подарочная упаковка", desc: "Каждый заказ в милом фирменном мешочке" },
              { icon: "Heart", title: "С любовью", desc: "Каждый брелок подобран с душой" },
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
            <h2 className="font-display text-4xl font-light text-center mb-12">Новинки</h2>
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
                Смотреть все брелки →
              </button>
            </div>
          </section>
        </div>
      )}

      {/* CATALOG */}
      {page === "catalog" && (
        <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in">
          <div className="text-center mb-12">
            <h2 className="font-display text-5xl font-light mb-3">Каталог</h2>
            <p className="text-muted-foreground text-sm">Все брелки — 200 ₽ за штуку</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {PRODUCTS.map((p, i) => (
              <div
                key={p.id}
                className="glass-card rounded-2xl overflow-hidden hover-scale group"
                style={{ animation: `fadeIn 0.4s ease ${i * 0.06}s both` }}
              >
                <div className="aspect-square bg-mint-light overflow-hidden relative">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                  {p.status === "coming_soon" && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-white text-foreground text-xs font-semibold px-3 py-1.5 rounded-full">Скоро в наличии</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <p className="font-semibold text-sm text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.desc}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-primary font-bold">200 ₽</span>
                    {p.status === "coming_soon" ? (
                      <span className="text-muted-foreground text-xs px-3 py-1.5 rounded-full border border-muted">Ожидается</span>
                    ) : (
                      <button
                        onClick={() => addToCart(p)}
                        className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-full hover:opacity-90 transition-all flex items-center gap-1"
                      >
                        <Icon name="Plus" size={12} />
                        В корзину
                      </button>
                    )}
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
          <h2 className="font-display text-5xl font-light mb-8 text-center">Корзина</h2>

          {cart.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🛍️</div>
              <p className="text-muted-foreground mb-6">Корзина пуста</p>
              <button
                onClick={() => setPage("catalog")}
                className="bg-primary text-primary-foreground px-8 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-all"
              >
                Перейти в каталог
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
                      <p className="text-xs text-muted-foreground">200 ₽ за штуку</p>
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
                        удалить
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="glass-card rounded-2xl p-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground text-sm">Товаров</span>
                  <span className="text-sm">{cartCount} шт.</span>
                </div>
                <div className="flex justify-between items-center border-t border-border pt-4 mb-6">
                  <span className="font-display text-xl">Итого</span>
                  <span className="font-display text-2xl text-primary">{cartTotal} ₽</span>
                </div>
                <a
                  href={`https://t.me/Milev_0hh?text=${encodeURIComponent(`Привет! Хочу заказать:\n${cart.map(i => `• ${i.name} × ${i.qty} = ${i.price * i.qty} ₽`).join('\n')}\n\nИтого: ${cartTotal} ₽`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-full font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  <Icon name="Send" size={16} />
                  Оформить заказ в Telegram
                </a>
                <button
                  onClick={() => setPage("catalog")}
                  className="w-full text-center text-sm text-muted-foreground mt-3 hover:text-foreground transition-colors"
                >
                  Продолжить покупки
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-border mt-8 py-10 text-center">
        <p className="font-display text-lg text-primary italic mb-1">Ksesha Shop</p>
        <p className="text-xs text-muted-foreground mb-4">Милые брелки с душой ✦ 200 ₽ за штуку</p>
        <a
          href="https://t.me/Milev_0hh"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary/10 text-primary px-5 py-2 rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <Icon name="Send" size={14} />
          Написать в Telegram
        </a>
      </footer>
    </div>
  );
}