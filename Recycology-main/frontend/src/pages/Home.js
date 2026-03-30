import React from 'react';
import { Link } from 'react-router-dom';
import { FaRecycle, FaSeedling, FaLightbulb, FaUsers } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import ProductIdeaFinder from '../components/Features/ProductIdeaFinder';
import GarbageCollectorFinder from '../components/Features/GarbageCollectorFinder';
import EducationalCampaigns from '../components/Features/EducationalCampaigns';
import CommunityInspiration from '../components/Features/CommunityInspiration';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();

  const heroHighlights = [
    {
      icon: <FaRecycle />,
      title: 'Material-first ideas',
      text: 'Start with scraps, jars, cardboard, fabric, or anything waiting for a second life.',
    },
    {
      icon: <FaLightbulb />,
      title: 'Guided inspiration',
      text: 'Move from a vague idea to a buildable plan with AI-assisted suggestions and examples.',
    },
    {
      icon: <FaUsers />,
      title: 'Community momentum',
      text: 'Share your own builds and learn from what other makers are already creating.',
    },
  ];

  return (
    <div className="home">
      <section className="home-hero">
        <div className="hero-copy">
          <span className="hero-eyebrow">Waste Less. Make Better.</span>
          <h1>Turn everyday leftovers into useful, beautiful builds.</h1>
          <p className="hero-description">
            Recycology blends AI project generation, community creativity, and
            practical sustainability tools into one calm, modern workspace.
          </p>
          <div className="hero-actions">
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="hero-action hero-action--primary"
            >
              {isAuthenticated ? 'Open My Dashboard' : 'Start Creating Free'}
            </Link>
            <a href="#home-features" className="hero-action hero-action--secondary">
              Explore Features
            </a>
          </div>
          <div className="hero-highlights">
            {heroHighlights.map((item) => (
              <article key={item.title} className="hero-highlight-card">
                <span className="hero-highlight-icon">{item.icon}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside className="hero-panel">
          <div className="hero-panel-badge">
            <FaSeedling />
            <span>Circular Design Toolkit</span>
          </div>
          <h2>Build momentum with one smart routine.</h2>
          <p>
            Describe what you already have, discover something worth making,
            then share the finished result back with the community.
          </p>
          <div className="hero-panel-stats">
            <div className="hero-stat">
              <strong>01</strong>
              <span>Describe your materials</span>
            </div>
            <div className="hero-stat">
              <strong>02</strong>
              <span>Generate a practical DIY concept</span>
            </div>
            <div className="hero-stat">
              <strong>03</strong>
              <span>Post and inspire the next maker</span>
            </div>
          </div>
          <div className="hero-panel-note">
            <FaRecycle />
            <p>Designed for makers, students, families, and local eco communities.</p>
          </div>
        </aside>
      </section>

      <section id="home-features" className="home-container">
        <div className="main-content">
          <ProductIdeaFinder />
        </div>
      </section>
      <section className="home-collector-wrap">
        <GarbageCollectorFinder />
      </section>
      <section className="home-campaign-wrap">
        <EducationalCampaigns />
      </section>
      <CommunityInspiration />
    </div>
  );
};

export default Home;
