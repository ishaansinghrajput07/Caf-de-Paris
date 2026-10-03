import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import Layout from '../components/Layout';
import { img } from '../images';
import { categories } from '../menuData';
import { wa } from '../config';

export default function OrderNow() {
  const [qty, setQty] = useState({});
  const [tab, setTab] = useState(categories[0].title);
  const [who, setWho] = useState({ name: '', phone: '', note: '' });
  const all = useMemo(() => categories.flatMap((c) => c.items), []);
  const lines = all.filter((x) => qty[x.id]);
  const total = lines.reduce((s, x) => s + x.price * qty[x.id], 0);
  const count = lines.reduce((s, x) => s + qty[x.id], 0);
  const bump = (id, d) => setQty((q) => { const n = Math.max(0, (q[id] || 0) + d); const c = { ...q, [id]: n }; if (!n) delete c[id]; return c; });
  const place = () => {
    if (!count) return toast.error('Add something delicious first.');
    if (!who.name.trim() || !who.phone.trim()) return toast.error('Please add your name and phone number.');
    const body = lines.map((x) => `• ${qty[x.id]} × ${x.name} — ₹${x.price * qty[x.id]}`).join('\n');
    const text = `Hello Café de Paris! New order:\n${body}\n\nTotal: ₹${total}\nName: ${who.name}\nPhone: ${who.phone}${who.note ? `\nNote: ${who.note}` : ''}`;
    toast.success('Opening WhatsApp to confirm your order…');
    window.open(wa(text), '_blank', 'noopener');
  };
  const cat = categories.find((c) => c.title === tab);
  return (
    <Layout>
      <section className="page-hero"><img src={img.counter} alt="" /><div className="hero-shade" /><div className="hero-content"><h1 className="hero-title sm">Order Now</h1><p>Build your order and confirm it on WhatsApp.</p></div></section>
      <section className="container section order">
        <div>
          <div className="tabs" role="tablist">{categories.map((c) => <button key={c.title} role="tab" aria-selected={c.title === tab} className={c.title === tab ? 'on' : ''} onClick={() => setTab(c.title)}>{c.title}</button>)}</div>
          <ul className="items">
            {cat.items.map((x) => (
              <li key={x.id}><div><b>{x.name}</b><small>₹{x.price}</small></div>
                <div className="qty"><button onClick={() => bump(x.id, -1)} aria-label={`Remove ${x.name}`}><Minus size={16} /></button><span>{qty[x.id] || 0}</span><button onClick={() => bump(x.id, 1)} aria-label={`Add ${x.name}`}><Plus size={16} /></button></div>
              </li>
            ))}
          </ul>
        </div>
        <aside className="cart">
          <h3><ShoppingBag size={18} /> Your order {count > 0 && <em>({count})</em>}</h3>
          {lines.length ? lines.map((x) => <div className="cart-row" key={x.id}><span>{qty[x.id]} × {x.name}</span><b>₹{x.price * qty[x.id]}</b></div>) : <p className="note">Nothing here yet.</p>}
          <div className="cart-total"><span>Total</span><b>₹{total}</b></div>
          <input placeholder="Your name" value={who.name} onChange={(e) => setWho({ ...who, name: e.target.value })} />
          <input placeholder="Phone number" inputMode="tel" value={who.phone} onChange={(e) => setWho({ ...who, phone: e.target.value })} />
          <textarea rows="2" placeholder="Notes (optional)" value={who.note} onChange={(e) => setWho({ ...who, note: e.target.value })} />
          <button className="btn gold full" onClick={place}>Place order on WhatsApp</button>
        </aside>
      </section>
    </Layout>
  );
}
