import React, { useEffect, useState } from 'react';
import {
  FaArrowRight,
  FaExternalLinkAlt,
  FaGraduationCap,
  FaSchool,
  FaSeedling,
} from 'react-icons/fa';
import './EducationalCampaigns.css';

const fallbackInstitutions = [
  {
    id: 'bpl-manit',
    city: 'Bhopal',
    name: 'MANIT Bhopal',
    category: 'College',
    address: 'Link Road Number 3, Near Kali Mata Mandir, Bhopal, Madhya Pradesh 462003',
    contact: {
      phone: '+91-755-4051000',
      email: 'pro@manit.ac.in',
    },
    website: 'https://www.manit.ac.in/content/contact-us',
    focus: 'Engineering campus sustainability drives and student-led recycling workshops',
  },
  {
    id: 'bpl-peoples-university',
    city: 'Bhopal',
    name: "People's University",
    category: 'College',
    address: 'Peoples Campus, Bhanpur, Bhopal, Madhya Pradesh 462037',
    contact: {
      phone: '+91-7354700700',
      email: 'info@peoplesuniversity.edu.in',
    },
    website: 'https://www.peoplesuniversity.edu.in/contact-us/',
    focus: 'University outreach, health-campus waste awareness and volunteer campaigns',
  },
  {
    id: 'bpl-sagar-public-school',
    city: 'Bhopal',
    name: 'Sagar Public School',
    category: 'School',
    address: 'Saket Nagar, Bhopal, Madhya Pradesh',
    contact: {
      phone: '+91-777100356',
      email: 'principal.spsrn@spsbhopal.ac.in',
    },
    website: 'https://www.spsbhopal.ac.in/',
    focus: 'School-level eco clubs, segregation awareness and campus cleanup campaigns',
  },
  {
    id: 'bpl-st-joseph-coed',
    city: 'Bhopal',
    name: "St. Joseph's Co-ed School",
    category: 'School',
    address: 'E-6, Arera Colony, Bhopal, Madhya Pradesh 462016',
    contact: {
      phone: '+91-755-2565434',
      email: 'info@stjosephcoed.org',
    },
    website: 'https://www.stjosephcoed.org/',
    focus: 'Student engagement drives, poster campaigns and campus sustainability sessions',
  },
  {
    id: 'ind-sgsits',
    city: 'Indore',
    name: 'SGSITS',
    category: 'College',
    address: 'Vallabh Nagar, Indore, Madhya Pradesh 452003',
    contact: {
      phone: '+91-731-2544415',
      email: 'director@sgsits.ac.in',
    },
    website: 'https://sgsits.mponline.gov.in/',
    focus: 'Technical college sustainability campaigns, waste-tech events and community volunteering',
  },
  {
    id: 'ind-mrsc',
    city: 'Indore',
    name: 'Maharaja Ranjit Singh College of Professional Sciences',
    category: 'College',
    address: 'Hemkunt Campus, Near IET-DAVV, Khandwa Road, Indore, Madhya Pradesh 452001',
    contact: {
      phone: '+91-9926003874',
      email: 'info@mrscindore.org',
    },
    website: 'https://www.mrscindore.org/contact-us.php',
    focus: 'Youth-focused recycling awareness, campus clubs and community campaign partnerships',
  },
  {
    id: 'ind-shri-ram-centennial',
    city: 'Indore',
    name: 'Shri Ram Centennial School',
    category: 'School',
    address: 'Indore Ujjain Highway, Sanwer Road, Near Toll Naka, Panchderiya, Indore 453111',
    contact: {
      phone: '+91-9752988888',
      email: 'help@shriramschool.org',
    },
    website: 'https://www.shriramschool.org/contact-us',
    focus: 'School sustainability weeks, family awareness campaigns and eco-club collaboration',
  },
  {
    id: 'ind-emerald-heights',
    city: 'Indore',
    name: 'The Emerald Heights International School',
    category: 'School',
    address: 'AB Road, Rau, Opposite Akashwani, Indore, Madhya Pradesh 453331',
    contact: {
      phone: '+91-8720009992',
      email: 'info@emeraldheights.edu.in',
    },
    website: 'https://emeraldheights.edu.in/contact/',
    focus: 'Large school campaigns, leadership programs and environment-driven student initiatives',
  },
];

const getFallbackInstitutionsByCity = (city) =>
  fallbackInstitutions.filter((institution) => institution.city === city);

const EducationalCampaigns = () => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  const cities = ['Bhopal', 'Indore'];

  const [selectedCity, setSelectedCity] = useState('Bhopal');
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInstitutions = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          `${API_URL}/campaigns?city=${encodeURIComponent(selectedCity)}`
        );
        const payload = await response.json();
        const items = payload.data?.institutions || [];
        const finalItems =
          items.length > 0 ? items : getFallbackInstitutionsByCity(selectedCity);

        setInstitutions(finalItems);
      } catch (err) {
        console.error('Failed to load campaign institutions:', err);
        const fallbackItems = getFallbackInstitutionsByCity(selectedCity);
        setInstitutions(fallbackItems);
        setError(
          fallbackItems.length
            ? 'Showing saved institutions while the live API is unavailable.'
            : 'Could not load institutions right now.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchInstitutions();
  }, [API_URL, selectedCity]);

  return (
    <section className="campaigns-panel">
      <div className="campaigns-header">
        <div className="campaigns-header-copy">
          <div className="campaigns-icon">
            <FaSeedling />
          </div>
          <div>
            <p className="campaigns-eyebrow">Campaign Outreach</p>
            <h3 className="campaigns-title">
              Bhopal and Indore schools and colleges for awareness campaigns
            </h3>
          </div>
        </div>
        <p className="campaigns-description">
          Use this list to plan clean-up drives, recycling workshops,
          sustainability talks, and campus outreach with institutions across
          both cities.
        </p>
      </div>

      <div className="campaigns-city-tabs" role="tablist" aria-label="Campaign cities">
        {cities.map((city) => (
          <button
            key={city}
            type="button"
            className={`campaigns-city-tab ${selectedCity === city ? 'active' : ''}`}
            onClick={() => setSelectedCity(city)}
          >
            {city}
          </button>
        ))}
      </div>

      {error ? <div className="campaigns-state campaigns-state--info">{error}</div> : null}

      {loading ? (
        <div className="campaigns-state">Loading institutions...</div>
      ) : (
        <div className="campaigns-grid">
          {institutions.map((institution) => (
            <article key={institution.id} className="campaign-card">
              <div className="campaign-card-top">
                <div>
                  <span className="campaign-type-badge">
                    {institution.category === 'College' ? <FaGraduationCap /> : <FaSchool />}
                    <span>{institution.category}</span>
                  </span>
                  <h4>{institution.name}</h4>
                </div>
                <span className="campaign-city-badge">{institution.city}</span>
              </div>

              <p className="campaign-address">{institution.address}</p>
              <p className="campaign-focus">{institution.focus}</p>

              <div className="campaign-contact">
                <span>{institution.contact?.phone}</span>
                {institution.contact?.email ? <span>{institution.contact.email}</span> : null}
              </div>

              <a
                href={institution.website}
                target="_blank"
                rel="noreferrer"
                className="campaign-link"
              >
                <span>Open Institution Site</span>
                <FaExternalLinkAlt />
              </a>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default EducationalCampaigns;
