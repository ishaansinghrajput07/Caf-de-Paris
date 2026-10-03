import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
export default function NotFound() {
  return (
    <Layout>
      <section className="center-screen"><span className="script">Oh là là…</span><h1 className="hero-title sm">404</h1><p>This page seems to have wandered off.</p><Link className="btn gold" to="/">Return home</Link></section>
    </Layout>
  );
}
