import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Layout from '../components/Layout';
import Reveal from '../components/Reveal';
import { img } from '../images';
gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const root = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.parallax-img', { scale: 1 }, { scale: 1.18, ease: 'none', scrollTrigger: { trigger: '.parallax-box', start: 'top bottom', end: 'bottom top', scrub: true } });
      gsap.to('.about-hero img', { yPercent: 15, ease: 'none', scrollTrigger: { trigger: '.about-hero', start: 'top top', end: 'bottom top', scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <Layout>
      <div ref={root}>
        <section className="about-hero"><img src={img.dark} alt="Café de Paris dining room" /><div className="hero-shade" /><h1 className="hero-title right">Our<br /><em>Story.</em></h1></section>
        <section className="container section about-grid">
          <div className="parallax-box"><div className="parallax-img" style={{ backgroundImage: `url(${img.interior})` }} /></div>
          <Reveal className="about-card">
            <span className="eyebrow">About the Café</span>
            <p className="quote">“More than a café. A place to linger.”</p>
            <p>Some places are built to be seen. Café de Paris was built to be felt — a warm, unhurried spot where the coffee is poured with care and the table is always ready.</p>
            <p>Inspired by the corner cafés of Paris, we serve frothy cappuccinos, flaky pastries, hearty pizzas and burgers, and plates meant for sharing. Inside, polished wood and lantern light; outside, plants, tiles and open sky.</p>
            <p>Whether you’re here at nine in the morning with a book or late in the evening with friends, there is a table for you.</p>
            <p className="gold-line">Come find your corner of Paris.</p>
          </Reveal>
        </section>
        <section className="values container">
          {[[img.latte, 'Crafted Coffee', 'Every cup finished with a little latte art.'], [img.pastries, 'Baked Fresh', 'Croissants, tarts and cakes through the day.'], [img.friends, 'Made for Company', 'Big wooden tables and easy conversation.']].map(([s, t, d], k) => (
            <Reveal key={t} delay={k * 0.1}><article className="card"><div className="card-img"><img src={s} alt={t} loading="lazy" /></div><h3>{t}</h3><p>{d}</p></article></Reveal>
          ))}
        </section>
      </div>
    </Layout>
  );
}
