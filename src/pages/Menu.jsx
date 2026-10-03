import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Reveal from '../components/Reveal';
import { img } from '../images';
import { categories } from '../menuData';

const RATIO = 1.42;
export default function Menu() {
  const book = useRef(null);
  const [vp, setVp] = useState({ w: 0, h: 0 });
  useEffect(() => {
    const f = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    f(); window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  const portrait = vp.w < 1024;
  const pw = Math.min(480, vp.w * (vp.w < 768 ? 0.88 : 0.7));
  const width = portrait ? pw : (vp.h * 0.8) / RATIO;
  const height = width * RATIO;
  const pages = [
    <div className="fp cover" key="c"><img src={img.roll} alt="" /><div className="fp-shade" /><div className="fp-brand"><span className="script">Le</span><b>Menu</b><small>Café de Paris</small></div></div>,
    ...[img.menu1, img.menu3, img.menu2].map((s, k) => <div className="fp" key={k}><img src={s} alt={`Menu page ${k + 1}`} className="fit" /></div>),
    <div className="fp cover" key="e"><img src={img.heritage} alt="" /><div className="fp-shade" /><div className="fp-brand"><span className="script">Merci</span><small>À bientôt</small></div></div>,
  ];
  return (
    <Layout>
      <section className="page-hero"><img src={img.display} alt="" /><div className="hero-shade" />
        <div className="hero-content"><h1 className="hero-title sm">Our Menu</h1><motion.div className="rule" initial={{ width: 0 }} animate={{ width: 128 }} transition={{ duration: 1, delay: 0.6 }} /></div>
      </section>
      <section className="section book-wrap">
        {vp.w > 0 && (
          <HTMLFlipBook key={portrait ? 'p' : 'd'} ref={book} width={width} height={height} size="fixed" minWidth={260} maxWidth={1200} minHeight={360} maxHeight={1600}
            maxShadowOpacity={0.7} showCover={false} mobileScrollSupport usePortrait={portrait} className="flip">
            {pages}
          </HTMLFlipBook>
        )}
        <div className="flip-ctrl">
          <button onClick={() => book.current?.pageFlip().flipPrev()} aria-label="Previous page"><ChevronLeft /></button>
          <span>Turn the page</span>
          <button onClick={() => book.current?.pageFlip().flipNext()} aria-label="Next page"><ChevronRight /></button>
        </div>
      </section>
      <section className="container section">
        <Reveal className="center"><span className="eyebrow">À la carte</span><h2 className="h2">At a <em>glance</em></h2></Reveal>
        <div className="menu-cols">
          {categories.map((c) => (
            <Reveal key={c.title}><div className="menu-cat"><h3>{c.title}</h3>
              {c.items.map((it) => <div className="menu-row" key={it.id}><span>{it.name}</span><i /><b>₹{it.price}</b></div>)}
            </div></Reveal>
          ))}
        </div>
        <p className="note center">Prices as printed on our menu card and subject to change.</p>
        <div className="center mt"><Link to="/order-now" className="btn gold">Order now</Link></div>
      </section>
    </Layout>
  );
}
