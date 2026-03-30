import React, { useEffect, useState } from 'react';
import {
  FaClock,
  FaEnvelope,
  FaExternalLinkAlt,
  FaMapMarkerAlt,
  FaMapMarkedAlt,
  FaPhoneAlt,
  FaRecycle,
} from 'react-icons/fa';
import './GarbageCollectorFinder.css';

const fallbackCollectors = [
  {
    id: 'bpl-the-kabadiwala',
    city: 'Bhopal',
    name: 'The Kabadiwala',
    address:
      '3rd floor, Plot No. 22, Beside SOM office, MP Nagar Zone-2, Bhopal, Madhya Pradesh 462011',
    contact: {
      phone: '+91-7697260260',
      email: 'contact@thekabadiwala.com',
    },
    services: [
      'Door-to-door scrap pickup',
      'Dry waste recycling',
      'Paper, plastic and metal collection',
    ],
    operatingHours: 'Please confirm pickup slot directly with the vendor.',
    mapQuery:
      'The Kabadiwala, Plot No. 22, MP Nagar Zone-2, Bhopal, Madhya Pradesh 462011',
    sourceUrl: 'https://www.thekabadiwala.com/',
  },
  {
    id: 'bpl-india-waste-management',
    city: 'Bhopal',
    name: 'India Waste Management',
    address:
      'E-3, New Industrial Area Phase II, Mandideep, District Raisen, Madhya Pradesh 462046',
    contact: {
      phone: '+91-9926909297',
      email: 'indiawastemanagement@outlook.com',
    },
    services: [
      'Bio-medical waste treatment',
      'Expired medicine disposal',
      'E-waste disposal assistance',
    ],
    operatingHours: 'Weekdays 08:00 AM - 09:00 PM',
    mapQuery:
      'India Waste Management, E-3 New Industrial Area Phase II, Mandideep, Raisen, Madhya Pradesh 462046',
    sourceUrl: 'https://indiawastemanagement.co.in/contact.php',
  },
  {
    id: 'ind-unique-eco-recycle',
    city: 'Indore',
    name: 'Unique Eco Recycle',
    address:
      '26, R.D. Udyog Nagar, Nemawar Road, Behind JIO Petrol Pump, Palda, Indore, Madhya Pradesh 452020',
    contact: {
      phone: '+91-9425072692',
      email: 'fazal@uerindia.com',
    },
    services: [
      'Authorised e-waste recycling',
      'Industrial e-waste pickup',
      'Safe logistics support',
    ],
    operatingHours: 'Please confirm collection timing directly with the vendor.',
    mapQuery:
      'Unique Eco Recycle, 26 R.D. Udyog Nagar, Nemawar Road, Palda, Indore, Madhya Pradesh 452020',
    sourceUrl: 'https://www.uerindia.com/contact.html',
  },
  {
    id: 'ind-ewaste-samadhan',
    city: 'Indore',
    name: 'E-Waste Samadhan',
    address:
      '108, Silver Sanchora Castle, RNT Marg, Indore, Madhya Pradesh 452001',
    contact: {
      phone: '1800-3092971',
      email: 'info@ewastesamadhan.com',
    },
    services: [
      'E-waste collection',
      'Responsible disposal and recycling',
      'Business and institutional support',
    ],
    operatingHours: '24/7 customer support listed on the vendor contact page.',
    mapQuery:
      'E-Waste Samadhan, Silver Sanchora Castle, RNT Marg, Indore, Madhya Pradesh 452001',
    sourceUrl: 'https://twameev.com/contact-us/',
  },
];

const getFallbackCollectorsByCity = (city) =>
  fallbackCollectors.filter((collector) => collector.city === city);

const GarbageCollectorFinder = () => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const cities = ['Bhopal', 'Indore'];

  const [selectedCity, setSelectedCity] = useState('Bhopal');
  const [collectors, setCollectors] = useState([]);
  const [activeCollectorId, setActiveCollectorId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCollectors = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          `${API_URL}/collectors?city=${encodeURIComponent(selectedCity)}`
        );
        const payload = await response.json();
        const items = payload.data?.collectors || [];
        const finalItems =
          items.length > 0 ? items : getFallbackCollectorsByCity(selectedCity);

        setCollectors(finalItems);
        setActiveCollectorId(finalItems[0]?.id || '');
      } catch (err) {
        console.error('Failed to load collectors:', err);
        const fallbackItems = getFallbackCollectorsByCity(selectedCity);
        setCollectors(fallbackItems);
        setActiveCollectorId(fallbackItems[0]?.id || '');
        setError(
          fallbackItems.length
            ? 'Showing saved local vendors while the live API is unavailable.'
            : 'Could not load local vendors right now.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCollectors();
  }, [API_URL, selectedCity]);

  const activeCollector =
    collectors.find((collector) => collector.id === activeCollectorId) ||
    collectors[0] ||
    null;

  const activeMapQuery = activeCollector?.mapQuery || activeCollector?.address || selectedCity;
  const googleEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    activeMapQuery
  )}&output=embed`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    activeMapQuery
  )}`;

  return (
    <section className="collector-finder">
      <div className="collector-header">
        <div className="collector-header-copy">
          <div className="collector-header-icon">
            <FaMapMarkedAlt />
          </div>
          <div>
            <p className="collector-eyebrow">Local Support</p>
            <h3 className="collector-title">Find garbage collectors in Bhopal and Indore</h3>
          </div>
        </div>
        <p className="collector-description">
          Switch cities, compare nearby waste vendors, and open the selected
          location directly in Google Maps.
        </p>
      </div>

      <div className="collector-city-tabs" role="tablist" aria-label="Collector cities">
        {cities.map((city) => (
          <button
            key={city}
            type="button"
            className={`collector-city-tab ${selectedCity === city ? 'active' : ''}`}
            onClick={() => setSelectedCity(city)}
          >
            {city}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="collector-state-panel">Loading local vendors...</div>
      ) : error ? (
        <div className="collector-state-panel collector-state-panel--error">{error}</div>
      ) : (
        <div className="collector-layout">
          <div className="collector-list">
            {collectors.map((collector) => (
              <button
                key={collector.id}
                type="button"
                className={`collector-card ${
                  collector.id === activeCollectorId ? 'active' : ''
                }`}
                onClick={() => setActiveCollectorId(collector.id)}
              >
                <div className="collector-card-top">
                  <h4>{collector.name}</h4>
                  <span className="collector-chip">{collector.city}</span>
                </div>
                <p className="collector-card-address">
                  <FaMapMarkerAlt />
                  <span>{collector.address}</span>
                </p>
                <div className="collector-services">
                  {(collector.services || []).slice(0, 3).map((service) => (
                    <span key={`${collector.id}-${service}`} className="collector-service-chip">
                      {service}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {activeCollector && (
            <div className="collector-map-panel">
              <div className="collector-map-shell">
                <div className="collector-map-toolbar">
                  <div>
                    <p className="collector-map-label">Google Map Layout</p>
                    <h4>{activeCollector.name}</h4>
                  </div>
                  <span className="collector-chip collector-chip--accent">
                    <FaMapMarkerAlt />
                    <span>{activeCollector.city}</span>
                  </span>
                </div>
                <div className="collector-map-frame">
                  <iframe
                    title={`Google map for ${activeCollector.name}`}
                    src={googleEmbedUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="collector-map-address-bar">
                  <FaMapMarkerAlt />
                  <div>
                    <span className="collector-address-label">Address</span>
                    <p>{activeCollector.address}</p>
                  </div>
                </div>
              </div>
              <div className="collector-detail-card">
                <div className="collector-detail-head">
                  <div>
                    <p className="collector-eyebrow">Selected Vendor</p>
                    <h4>{activeCollector.name}</h4>
                  </div>
                  <span className="collector-chip collector-chip--accent">
                    <FaRecycle />
                    <span>{activeCollector.city}</span>
                  </span>
                </div>
                <p className="collector-detail-address">
                  Use the map preview above for direction planning, then contact
                  the vendor directly before your visit or pickup request.
                </p>
                <div className="collector-detail-grid">
                  <div className="collector-detail-item">
                    <span className="collector-detail-label">Phone</span>
                    <div className="collector-detail-value">
                      <FaPhoneAlt />
                      <a href={`tel:${(activeCollector.contact?.phone || '').replace(/\s+/g, '')}`}>
                        {activeCollector.contact?.phone || 'Contact on request'}
                      </a>
                    </div>
                  </div>
                  {activeCollector.contact?.email ? (
                    <div className="collector-detail-item">
                      <span className="collector-detail-label">Email</span>
                      <div className="collector-detail-value">
                        <FaEnvelope />
                        <a href={`mailto:${activeCollector.contact.email}`}>
                          {activeCollector.contact.email}
                        </a>
                      </div>
                    </div>
                  ) : null}
                  {activeCollector.operatingHours ? (
                    <div className="collector-detail-item collector-detail-item--wide">
                      <span className="collector-detail-label">Hours</span>
                      <div className="collector-detail-value">
                        <FaClock />
                        <span>{activeCollector.operatingHours}</span>
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="collector-actions">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="collector-action collector-action--primary"
                  >
                    <span>Open in Google Maps</span>
                    <FaExternalLinkAlt />
                  </a>
                  {activeCollector.sourceUrl ? (
                    <a
                      href={activeCollector.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="collector-action collector-action--secondary"
                    >
                      <span>View Source</span>
                      <FaExternalLinkAlt />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default GarbageCollectorFinder;
