import React, { useState, useEffect } from 'react';

const sampleProducts = [
  {
    id: 1,
    name: "Crème hydratante jour",
    price: 12.99,
    description: "Hydratation légère, peau éclatante toute la journée.",
    image: "https://images.unsplash.com/photo-1580281657527-8f5e9b0b6f4e?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    name: "Sérum vitamine C",
    price: 19.5,
    description: "Rend le teint uniforme et lumineux.",
    image: "https://images.unsplash.com/photo-1580281657399-9b0c55d9d2b3?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Baume lèvres",
    price: 5.75,
    description: "Protection et douceur pour les lèvres sèches.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=60",
  },
];

export default function App() {
  const [products, setProducts] = useState(sampleProducts);
  const [cart, setCart] = useState([]);
  const [query, setQuery] = useState('');

  function addToCart(product) {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id);
      if (found) {
        return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart(prev => prev.filter(p => p.id !== productId));
  }

  function changeQty(productId, qty) {
    if (qty <= 0) return removeFromCart(productId);
    setCart(prev => prev.map(p => p.id === productId ? { ...p, qty } : p));
  }

  const filtered = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  const total = cart.reduce((s, p) => s + p.price * p.qty, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Beauty Shop</h1>
        <div className="flex items-center gap-4">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher un produit..."
            className="border px-3 py-1 rounded"
          />
          <CartButton cart={cart} total={total} />
        </div>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">
        <section className="lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4">Produits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filtered.map(p => (
              <article key={p.id} className="bg-white rounded-lg shadow p-4 flex gap-4">
                <img src={p.image} alt={p.name} className="w-28 h-28 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-gray-600">{p.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-bold">{p.price.toFixed(2)} €</span>
                    <button
                      onClick={() => addToCart(p)}
                      className="px-3 py-1 rounded bg-indigo-600 text-white text-sm hover:opacity-90"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <aside className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">Panier</h2>
          {cart.length === 0 ? (
            <p className="text-sm text-gray-500">Votre panier est vide.</p>
          ) : (
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">{(item.price * item.qty).toFixed(2)} €</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={e => changeQty(item.id, Number(e.target.value))}
                      className="w-16 border rounded px-2 py-1 text-center"
                    />
                    <button onClick={() => removeFromCart(item.id)} className="text-sm text-red-600">
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}

              <div className="border-t pt-3 flex items-center justify-between">
                <div>Total</div>
                <div className="font-bold">{total} €</div>
              </div>

              <button className="w-full mt-3 py-2 rounded bg-green-600 text-white">
                Passer à la caisse
              </button>
            </div>
          )}
        </aside>
      </main>

      <footer className="max-w-6xl mx-auto mt-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Beauty Shop - Starter
      </footer>
    </div>
  );
}

function CartButton({ cart, total }) {
  return (
    <div className="flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4" />
      </svg>
      <div className="text-sm">{cart.length} | {total} €</div>
    </div>
  );
}
