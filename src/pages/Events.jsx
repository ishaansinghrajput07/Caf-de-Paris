import { useState } from 'react';
import { toast } from 'sonner';
import { Cake, Briefcase, Music, Wine } from 'lucide-react';
import Layout from '../components/Layout';
import Reveal from '../components/Reveal';
import { img } from '../images';
import { wa } from '../config';

const types = [
  { icon: Cake, t: 'Birthdays', d: 'Cakes, candles and a table that fits everyone.', s: img.garden },
  { icon: Briefcase, t: 'Corporate', d: 'Team lunches and client catch-ups in a calm setting.', s: img.interior },
  { icon: Music, t: 'Get-togethers', d: 'Casual evenings with friends and family.', s: img.hall },
  { icon: Wine, t: 'Private dining', d: 'An intimate, candle-lit dinner for a few.', s: img.dark },
];
export default function Events() {
  const [f, setF] = useState({ name: '', phone: '', date: '', guests: '', type: 'Birthday', msg: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (!f.name.trim() || !f.phone.trim()) return toast.error('Please add your name and phone number.');
    const text = `Hello Café de Paris! I'd like to enquire about an event.\nName: ${f.name}\nPhone: ${f.phone}\nOccasion: ${f.type}\nDate: ${f.date || 'TBD'}\nGuests: ${f.guests || 'TBD'}\n${f.msg}`;
    toast.success('Opening WhatsApp with your enquiry…');
    window.open(wa(text), '_blank', 'noopener');
  };
  return (
    <Layout>
      <section className="page-hero tall"><img src={img.garden} alt="" /><div className="hero-shade" />
        <div className="hero-content"><span className="eyebrow">Celebrate at Café de Paris</span><h1 className="hero-title sm"><span className="script big">Host</span> With Us</h1><p>Crafting unforgettable moments, one table at a time.</p></div>
      </section>
      <section className="container section">
        <div className="cards four">
          {types.map(({ icon: Icon, t, d, s }, k) => (
            <Reveal key={t} delay={k * 0.08}><article className="card event"><div className="card-img"><img src={s} alt={t} loading="lazy" /></div><Icon size={22} /><h3>{t}</h3><p>{d}</p></article></Reveal>
          ))}
        </div>
      </section>
      <section className="container section form-section">
        <Reveal className="form-intro"><span className="eyebrow">Enquire</span><h2 className="h2">Let’s plan your <em>occasion</em></h2><p>Tell us a little about your event and we’ll get back to you on WhatsApp.</p><img src={img.pavilion} alt="" loading="lazy" /></Reveal>
        <Reveal delay={0.1}>
          <form className="form" onSubmit={submit}>
            <label>Name<input value={f.name} onChange={set('name')} placeholder="Your name" /></label>
            <label>Phone<input value={f.phone} onChange={set('phone')} placeholder="+91 …" inputMode="tel" /></label>
            <label>Occasion<select value={f.type} onChange={set('type')}><option>Birthday</option><option>Corporate</option><option>Get-together</option><option>Private dining</option><option>Other</option></select></label>
            <label>Date<input type="date" value={f.date} onChange={set('date')} /></label>
            <label>Guests<input type="number" min="1" value={f.guests} onChange={set('guests')} placeholder="Approx. number" /></label>
            <label className="full">Message<textarea rows="4" value={f.msg} onChange={set('msg')} placeholder="Anything we should know?" /></label>
            <button className="btn gold full" type="submit">Send enquiry</button>
          </form>
        </Reveal>
      </section>
    </Layout>
  );
}
