import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaRecycle, FaArrowRight } from 'react-icons/fa';
import './CommunityInspiration.css';

const CommunityInspiration = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/community`);
      setPosts(response.data.data?.posts || response.data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const defaultPosts = [
    {
      _id: '1',
      title: 'Cardboard Desk Organizer',
      description: 'A simple way to upcycle an old cardboard box.',
      material: 'Cardboard',
    },
    {
      _id: '2',
      title: 'DIY Bottle Planters',
      description: 'Transform plastic bottles into beautiful planters!',
      material: 'Plastic Bottles',
    },
    {
      _id: '3',
      title: 'Glass Jar Candle Holders',
      description: 'Make cozy and eco-friendly candle holders from old jars.',
      material: 'Glass Jars',
    },
    {
      _id: '4',
      title: 'T-Shirt Tote Bag',
      description: 'A simple, no-sew project to turn an old shirt into a bag.',
      material: 'Fabric',
    },
    {
      _id: '5',
      title: 'Tin Can Herb Garden',
      description: 'Give old tin cans a new purpose in your kitchen or garden.',
      material: 'Metal Cans',
    },
    {
      _id: '6',
      title: 'Denim Wallet',
      description: 'Repurpose old jeans into a stylish, custom wallet.',
      material: 'Fabric',
    },
  ];

  const displayPosts = posts.length > 0 ? posts : defaultPosts;

  if (loading) {
    return <div className="community-inspiration">Loading...</div>;
  }

  return (
    <div className="community-inspiration">
      <div className="community-header">
        <div>
          <p className="community-eyebrow">Community Showcase</p>
          <h2 className="community-title">Inspiration from our circular makers</h2>
        </div>
        <p className="community-intro">
          Browse ideas people are already turning into planters, organizers,
          decor, and practical everyday upgrades.
        </p>
      </div>
      <div className="inspiration-grid">
        {displayPosts.slice(0, 6).map((post) => (
          <div key={post._id} className="inspiration-card">
            <div className="card-icon">
              <FaRecycle />
            </div>
            <div className="card-content">
              <span className="material-badge">{post.material || 'Upcycled build'}</span>
              <h3 className="card-title-small">{post.title}</h3>
              <p className="card-description-small">{post.description}</p>
              <button type="button" className="community-link">
                <span>See idea</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityInspiration;
