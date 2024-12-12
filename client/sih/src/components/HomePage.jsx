import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import logo from '../assets/images/logo.png';
import logo2 from '../assets/images/logo2.png';

const SubNavbar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const links = [
    { id: 'home', label: 'Home' },
    // { id: 'About Srujan', label: 'About Srujan' },
    // { id: 'FAQ', label: 'FAQ' },
    // { id: 'Contact Us', label: 'Contact Us' },
    // { id: 'Feedback', label: 'Feedback' },
    // { id: 'faq', label: 'Forums' },
    // { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-50 shadow-sm">
      <div className="px-6 mx-auto max-w-7xl sm:px-8 lg:px-10">
        <div className="flex justify-center h-16">
          <div className="flex items-center space-x-8">
            {links.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveLink(item.id)}
                className={`px-5 py-3 text-base font-semibold transition-all duration-200 ${
                  activeLink === item.id
                    ? 'text-blue-600 border-b-3 border-blue-600 scale-105'
                    : 'text-gray-600 hover:text-blue-600 hover:border-b-3 hover:border-blue-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      image: "https://img.freepik.com/free-vector/innovation-concept-illustration_114360-5848.jpg",
      title: "Fostering Innovation Excellence",
      description: "Empowering institutions to track, measure, and enhance their innovation capabilities through comprehensive metrics and analytics."
    },
    {
      id: 2,
      image: "https://img.freepik.com/free-vector/scientists-concept-illustration_114360-2291.jpg",
      title: "Top 10 most innovative global economies in 2024: Where does India stand?",
      description: "Global Innovation Index 2024: India has risen significantly in the Global Innovation Index (GII) rankings, rising from 81st in 2015 to 39th in 2024."
    },
    {
      id: 3,
      image: "https://img.freepik.com/free-vector/startup-life-concept-illustration_114360-1068.jpg",
      title: "Patents have been filed for 5 new AYUSH drugs developed by the Central Research Councils of M/o AYUSH: Shri Shripad Naik",
      description: "Four among the Central Research Councils functioning under the Ministry of AYUSH, namely Central Council for Research in Ayurvedic Sciences (CCRAS), Central Council for Research in Unani Medicine (CCRUM), Central Council for Research in Siddha (CCRS) and Central Council for Research in Homoeopathy (CCRH) are involved in research activities, including development of new drugs."
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    cssEase: 'cubic-bezier(0.4, 0, 0.2, 1)',
    arrows: true,
    appendDots: dots => (
      <div className="absolute bottom-5 w-full">
        <ul className="flex justify-center space-x-3"> {dots} </ul>
      </div>
    ),
    customPaging: i => (
      <button className="w-2.5 h-2.5 rounded-full bg-white/40 hover:bg-white/60 transition-all duration-300">
        <span className="sr-only">Slide {i + 1}</span>
      </button>
    ),
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  };

  // Custom arrow components
  function PrevArrow(props) {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute left-4 top-1/2 z-10 p-2 rounded-full transition-all duration-300 -translate-y-1/2 bg-white/10 hover:bg-white/20"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    );
  }

  function NextArrow(props) {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="absolute right-4 top-1/2 z-10 p-2 rounded-full transition-all duration-300 -translate-y-1/2 bg-white/10 hover:bg-white/20"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  }

  return (
    <div className="relative h-[calc(100vh-8rem)] bg-gradient-to-r from-blue-900 to-indigo-900">
      <Slider {...settings} className="h-full">
        {slides.map((slide) => (
          <div key={slide.id} className="h-full outline-none">
            <div className="flex flex-col h-full lg:flex-row">
              {/* Image Half */}
              <div className="relative w-full h-1/2 lg:h-full lg:w-1/2">
                <div className="absolute inset-0 z-10 bg-gradient-to-r to-transparent from-blue-900/30" />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="object-cover object-center w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-l via-transparent to-transparent from-blue-900/50" />
              </div>

              {/* Content Half */}
              <div className="flex items-center px-6 py-8 w-full h-1/2 bg-gradient-to-l from-transparent to-blue-900/10 lg:h-full lg:w-1/2 lg:px-20">
                <div className="space-y-4 max-w-2xl lg:space-y-8">
                  <h2 className="text-3xl font-bold leading-tight text-white lg:text-5xl">
                    {slide.title}
                  </h2>
                  <div className="w-20 h-2 bg-blue-500 rounded-full" />
                  <p className="text-base leading-relaxed text-gray-200 lg:text-xl">
                    {slide.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const InnovationIndicators = () => {
  const indicators = [
    {
      id: 1,
      title: "Patent Applications",
      value: "72.5K+",
      change: "+12.3%",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: "Filed in 2023-24"
    },
    {
      id: 2,
      title: "Research Publications",
      value: "198K+",
      change: "+8.7%",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      description: "Academic papers published"
    },
    {
      id: 3,
      title: "Innovation Index Rank",
      value: "39th",
      change: "+5",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      description: "Global Innovation Index"
    },
    {
      id: 4,
      title: "R&D Investment",
      value: "₹1.5T",
      change: "+15.2%",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: "Annual investment in 2023"
    }
  ];

  return (
    <div className="py-12 bg-white lg:py-16">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8 text-center lg:mb-12">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Key Innovation Indicators
          </h2>
          <p className="mt-3 text-lg text-gray-500 lg:text-xl">
            Tracking India's innovation ecosystem growth
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {indicators.map((indicator) => (
            <div
              key={indicator.id}
              className="relative p-4 bg-white rounded-2xl border border-gray-100 shadow-xl transition-all duration-300 group hover:shadow-2xl hover:border-blue-500 lg:p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="p-2 text-blue-600 bg-blue-50 rounded-lg transition-colors duration-300 group-hover:bg-blue-100">
                  {indicator.icon}
                </div>
                <span className={`px-2.5 py-1 text-sm font-semibold rounded-full ${
                  indicator.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>
                  {indicator.change}
                </span>
              </div>
              
              <h3 className="mb-2 text-xl font-semibold text-gray-900">
                {indicator.title}
              </h3>
              <div className="flex gap-2 items-baseline">
                <span className="text-3xl font-bold text-blue-600">
                  {indicator.value}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ImpactSection = () => {
  const impacts = [
    {
      category: "Social Impact",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      stats: [
        { label: "Jobs Created", value: "50K+" },
        { label: "Startups Founded", value: "2.5K" },
        { label: "Student Innovators", value: "100K+" }
      ],
      description: "Fostering inclusive growth and empowering communities through innovation-led initiatives."
    },
    {
      category: "Economic Impact",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      stats: [
        { label: "Revenue Generated", value: "₹250B" },
        { label: "Export Growth", value: "15%" },
        { label: "GDP Contribution", value: "3.2%" }
      ],
      description: "Driving economic growth through technological advancement and innovation ecosystem development."
    },
    {
      category: "Environmental Impact",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      stats: [
        { label: "CO₂ Reduction", value: "2.5M tons" },
        { label: "Green Patents", value: "1.2K" },
        { label: "Clean Tech Projects", value: "500+" }
      ],
      description: "Promoting sustainable innovation and environmental consciousness in technological development."
    }
  ];

  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-gray-100 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-12 text-center lg:mb-16">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 lg:text-4xl">
            Innovation Impact Metrics
          </h2>
          <div className="mx-auto mb-4 w-24 h-1 bg-blue-600 rounded-full"></div>
          <p className="mx-auto max-w-3xl text-lg text-gray-600 lg:text-xl">
            Measuring the transformative power of innovation across different dimensions of society
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {impacts.map((impact, index) => (
            <div
              key={impact.category}
              className="overflow-hidden relative bg-white rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl group"
            >
              {/* Decorative background pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-5" />
              
              <div className="relative p-8">
                {/* Header */}
                <div className="flex items-center mb-6">
                  <div className="p-3 mr-4 text-blue-600 bg-blue-50 rounded-xl">
                    {impact.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {impact.category}
                  </h3>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-4 mb-6">
                  {impact.stats.map((stat, idx) => (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg transition-colors duration-300 hover:bg-blue-50">
                      <p className="mb-1 text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-blue-600">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <p className="leading-relaxed text-gray-600">
                  {impact.description}
                </p>

                {/* Learn More Link */}
                {/* <div className="mt-6">
                  <a href="#" className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-700">
                    Learn more
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RealWorldApplications = () => {
  const applications = [
    {
      id: 1,
      title: "Healthcare Innovation Tracking",
      description: "Monitor and analyze healthcare innovations across institutions, tracking patents, research papers, and clinical trials in real-time.",
      metrics: {
        institutions: 250,
        activeProjects: 1200,
        successRate: 78
      },
      image: "https://img.freepik.com/free-vector/telemedicine-abstract-concept-vector-illustration_107173-25325.jpg",
      features: [
        "Real-time innovation monitoring",
        "Patent tracking system",
        "Research collaboration platform",
        "Impact assessment tools"
      ]
    },
    {
      id: 2,
      title: "Smart Agriculture Solutions",
      description: "Track agricultural innovations and their implementation across different regions, measuring impact on crop yields and farmer income.",
      metrics: {
        institutions: 180,
        activeProjects: 850,
        successRate: 82
      },
      image: "https://img.freepik.com/free-vector/smart-farming-abstract-concept-vector-illustration_107173-25641.jpg",
      features: [
        "Innovation performance metrics",
        "Regional impact analysis",
        "Collaboration network mapping",
        "Resource optimization tools"
      ]
    },
    {
      id: 3,
      title: "Clean Technology Initiatives",
      description: "Monitor and evaluate clean technology innovations, tracking their environmental impact and adoption rates across industries.",
      metrics: {
        institutions: 320,
        activeProjects: 1500,
        successRate: 75
      },
      image: "https://img.freepik.com/free-vector/alternative-energy-concept-illustration_114360-1598.jpg",
      features: [
        "Environmental impact tracking",
        "Technology adoption metrics",
        "Cross-industry collaboration",
        "Sustainability assessment"
      ]
    }
  ];

  return (
    <div className="py-12 bg-white lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-center lg:mb-16">
          <span className="px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-50 rounded-full">
            Real World Impact
          </span>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 lg:text-4xl">
            Innovation in Action
          </h2>
          <p className="mt-4 text-lg text-gray-600 lg:text-xl">
            Discover how our innovation tracking system transforms ideas into real-world solutions
          </p>
        </div>

        {/* Applications Grid */}
        <div className="space-y-12 lg:space-y-16">
          {applications.map((app, index) => (
            <div 
              key={app.id}
              className={`flex flex-col gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
              }`}
            >
              {/* Image Section */}
              <div className="relative w-full lg:w-1/2">
                <div className="overflow-hidden rounded-2xl aspect-video">
                  <img 
                    src={app.image} 
                    alt={app.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                {/* Metrics Overlay */}
                <div className="grid absolute right-4 bottom-4 left-4 grid-cols-3 gap-2 lg:gap-4">
                  <div className="p-4 text-center bg-white bg-opacity-90 rounded-lg shadow-lg backdrop-blur-lg">
                    <div className="text-2xl font-bold text-blue-600">{app.metrics.institutions}</div>
                    <div className="text-sm text-gray-600">Institutions</div>
                  </div>
                  <div className="p-4 text-center bg-white bg-opacity-90 rounded-lg shadow-lg backdrop-blur-lg">
                    <div className="text-2xl font-bold text-blue-600">{app.metrics.activeProjects}</div>
                    <div className="text-sm text-gray-600">Active Projects</div>
                  </div>
                  <div className="p-4 text-center bg-white bg-opacity-90 rounded-lg shadow-lg backdrop-blur-lg">
                    <div className="text-2xl font-bold text-blue-600">{app.metrics.successRate}%</div>
                    <div className="text-sm text-gray-600">Success Rate</div>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col justify-center w-full lg:w-1/2">
                <h3 className="mb-4 text-3xl font-bold text-gray-900">
                  {app.title}
                </h3>
                <p className="mb-6 text-lg text-gray-600">
                  {app.description}
                </p>
                
                {/* Features Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {app.features.map((feature, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center p-4 space-x-3 bg-gray-50 rounded-lg transition-colors duration-300 group hover:bg-blue-50"
                    >
                      <svg 
                        className="w-6 h-6 text-blue-600" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                      </svg>
                      <span className="text-gray-700 group-hover:text-blue-700">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Call to Action */}
                <div className="mt-8">
                  {/* <button className="inline-flex items-center px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg transition-colors duration-300 hover:bg-blue-700">
                    Learn More
                    <svg 
                      className="ml-2 w-5 h-5" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17 8l4 4m0 0l-4 4m4-4H3" 
                      />
                    </svg>
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img 
                  src={logo} 
                  alt="Srujan Logo" 
                  className="w-auto h-8 lg:h-10"
                />
                <img 
                  src={logo2} 
                  alt="Secondary Logo" 
                  className="w-auto h-8 lg:h-10"
                />
              </div>
              <span className="text-2xl font-bold text-gray-800 lg:text-3xl">SRUJAN</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                to="/login"
                className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 lg:px-4 lg:text-base"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700 lg:px-4 lg:text-base"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Sub Navigation */}
      <SubNavbar />

      {/* Hero Slider Section */}
      <HeroSlider />

      <InnovationIndicators />
      <ImpactSection />
      <RealWorldApplications />

      {/* You can add new content here */}
    </div>
  );
};

export default HomePage;

