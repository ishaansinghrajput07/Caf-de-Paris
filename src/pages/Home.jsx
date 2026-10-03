import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Phone, MapPin, Clock, Instagram, Facebook } from 'lucide-react';
import Layout from '../components/Layout';
import Reveal from '../components/Reveal';
import { img } from '../images';
import { cafe } from '../config';

const highlights = [
  { img: img.glasshouse, title: 'The Glasshouse', text: 'Light-filled tables wrapped in greenery — made for long, lazy mornings.' },
  { img: img.garden, title: 'Garden Evenings', text: 'Woven lanterns, patterned tiles and warm lights once the sun goes down.' },
  { img: img.bar, title: 'The Bar', text: 'A copper-topped counter beneath handwoven lamps.' },
  { img: img.hall, title: 'Thatched Pavilion', text: 'Open-air dining under a carved timber roof.' },
  { img: img.heritage, title: 'Heritage Room', text: 'Terracotta tiles, polished wood and soft lantern glow.' },
];
const dishes = [
  { img: img.megaburger, t: 'Signature Burgers', d: 'Stacked, melty and served with golden fries.' },
  { img: img.pasta, t: 'Pasta & Garlic Bread', d: 'Slow-simmered sauce, olives and fresh basil.' },
  { img: img.croissant, t: 'Croissant Caprese', d: 'Flaky, buttery and layered with mozzarella.' },
  { img: img.thali, t: 'Coastal Flavours', d: 'A table of Goan-style curries and grilled catch.' },
  { img: img.display, t: 'Cakes & Tarts', d: 'A glass case of fruit tarts, éclairs and cakes.' },
  { img: img.donuts, t: 'Doughnuts', d: 'Glazed, sprinkled and made to share.' },
];
const gallery = [img.latte, img.breakfast, img.lattice, img.counter, img.pastries, img.night, img.mocha, img.patio];

export default function Home() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((v) => (v + 1) % highlights.length), 6000); return () => clearInterval(t); }, []);
  const go = (d) => setI((v) => (v + d + highlights.length) % highlights.length);
  return (
    <Layout>
      <section className="hero">
        <motion.img src={img.hero} alt="Café de Paris storefront" className="hero-img" initial={{ scale: 1.15 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: 'easeOut' }} />
        <div className="hero-shade" />
        <div className="hero-content">
          <motion.span className="script" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }}>Bienvenue à</motion.span>
          <motion.h1 className="hero-title" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1 }}>Café <em>de</em> Paris</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}>{cafe.tagline}</motion.p>
          <motion.div className="btn-row" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}>
            <Link to="/menu" className="btn gold">Explore the Menu</Link>
            <Link to="/order-now" className="btn ghost">Order Now</Link>
          </motion.div>
        </div>
        <a href={`tel:${cafe.phone.replace(/\s/g, '')}`} className="help-chip"><span>Can't decide? Need help?</span><b><Phone size={14} /> Ring Us</b></a>
      </section>

      <div className="marquee" aria-hidden="true"><div>{Array(6).fill('Espresso ✦ Pastries ✦ Pizzas ✦ Burgers ✦ Coffee & Cakes ✦ ').join('')}</div></div>

      <section className="section container split">
        <Reveal className="split-text">
          <span className="eyebrow">Notre Histoire</span>
          <h2 className="h2">Dine in the <em>heart</em> of a little Paris</h2>
          <p>Tucked among the trees, Café de Paris pairs the ease of a Parisian terrace with the warmth of home. Come for the first coffee of the day, stay for a wood-table lunch, or return when the lanterns glow.</p>
          <p>From frothy cappuccinos and buttery pastries to pizzas, burgers and plates made to share — there is always something honest and delicious on the table.</p>
          <Link to="/about" className="btn outline">Our Story</Link>
        </Reveal>
        <Reveal className="split-img stack" delay={0.15}>
          <img src={img.terrace} alt="Terrace dining" /><img src={img.friends} alt="Friends dining together" />
        </Reveal>
      </section>

      <section className="section slider-wrap">
        <div className="container"><Reveal><span className="eyebrow">Spaces to linger</span><h2 className="h2">Find your <em>corner</em></h2></Reveal></div>
        <div className="slider">
          {highlights.map((h, k) => <div key={h.title} className={`slide ${k === i ? 'on' : ''}`}><img src={h.img} alt={h.title} loading="lazy" /></div>)}
          <div className="slide-shade" />
          <div className="slide-cap" key={i}><h3>{highlights[i].title}</h3><p>{highlights[i].text}</p></div>
          <div className="slide-ctrl">
            <button onClick={() => go(-1)} aria-label="Previous"><ChevronLeft /></button>
            <span>{String(i + 1).padStart(2, '0')} / {String(highlights.length).padStart(2, '0')}</span>
            <button onClick={() => go(1)} aria-label="Next"><ChevronRight /></button>
          </div>
        </div>
      </section>

      <section className="section container">
        <Reveal className="center"><span className="eyebrow">À Table</span><h2 className="h2">From our <em>kitchen</em></h2></Reveal>
        <div className="cards">
          {dishes.map((d, k) => (
            <Reveal key={d.t} delay={(k % 3) * 0.1}><article className="card"><div className="card-img"><img src={d.img} alt={d.t} loading="lazy" /></div><h3>{d.t}</h3><p>{d.d}</p></article></Reveal>
          ))}
        </div>
        <div className="center mt"><Link to="/menu" className="btn outline">See the full menu</Link></div>
      </section>

      <section className="mosaic" aria-label="Gallery">
        {gallery.map((g, k) => <div key={k} className={`m m${k}`}><img src={g} alt="" loading="lazy" /></div>)}
      </section>

      <section className="cta">
        <img src={img.garden2} alt="" className="cta-bg" loading="lazy" />
        <Reveal className="cta-in"><span className="script">Let's celebrate</span><h2 className="h2">Birthdays, dinners &amp; get-togethers</h2><p>Host your next occasion among the lanterns and leaves.</p><Link to="/events" className="btn gold">Plan an event</Link></Reveal>
      </section>

      <section className="section container contact">
        <Reveal className="contact-card">
          <h3><MapPin size={16} /> Location</h3><p>{cafe.address}</p>
          <h3><Clock size={16} /> Hours</h3><p>{cafe.hours}</p>
          <h3>Good to know</h3><p>Dine-in · Takeaway · Group tables</p>
        </Reveal>
        <Reveal className="contact-links" delay={0.15}>
          <h2 className="h2">Find <em>Us.</em></h2>
          <div className="round-row">
            <a href={cafe.instagram} target="_blank" rel="noreferrer"><span><Instagram /></span>Instagram</a>
            <a href={cafe.facebook} target="_blank" rel="noreferrer"><span><Facebook /></span>Facebook</a>
            <a href={cafe.maps} target="_blank" rel="noreferrer"><span><MapPin /></span>Maps</a>
            <a href={`tel:${cafe.phone.replace(/\s/g, '')}`}><span><Phone /></span>Call Us</a>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
