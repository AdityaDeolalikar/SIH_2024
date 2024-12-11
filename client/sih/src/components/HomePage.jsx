import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import logo from '../assets/images/logo.png';
import logo2 from '../assets/images/logo2.png';

const SubNavbar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const links = [
    { id: 'home', label: 'Home' },
    { id: 'About Srujan', label: 'About Srujan' },
    { id: 'FAQ', label: 'FAQ' },
    { id: 'Contact Us', label: 'Contact Us' },
    { id: 'Feedback', label: 'Feedback' },
    { id: 'faq', label: 'Forums' },
    // { id: 'contact', label: 'Contact Us' }
  ];

  return (
    <nav className="bg-gray-50 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-center h-16">
          <div className="flex space-x-8 items-center">
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
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
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
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  }

  return (
    <div className="relative h-screen bg-gradient-to-r from-blue-900 to-indigo-900">
      <Slider {...settings} className="h-full">
        {slides.map((slide) => (
          <div key={slide.id} className="h-screen outline-none">
            <div className="flex h-full">
              {/* Image Half */}
              <div className="w-1/2 h-full relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent z-10" />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center transform scale-110 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-blue-900/50 via-transparent to-transparent" />
              </div>

              {/* Content Half - Adjusted padding and sizing for full viewport height */}
              <div className="w-1/2 h-full flex items-center px-20 bg-gradient-to-l from-transparent to-blue-900/10">
                <div className="space-y-8 max-w-2xl">
                  <h2 className="text-5xl font-bold text-white leading-tight">
                    {slide.title}
                  </h2>
                  <div className="w-20 h-2 bg-blue-500 rounded-full" />
                  <p className="text-xl text-gray-200 leading-relaxed">
                    {slide.description}
                  </p>
                  <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium 
                    hover:bg-blue-700 transition-all duration-300 transform hover:translate-y-[-2px] 
                    hover:shadow-lg active:translate-y-0 focus:outline-none focus:ring-2 
                    focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-900">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Navigation */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <img 
                  src={logo} 
                  alt="Srujan Logo" 
                  className="h-10 w-auto"
                />
                <img 
                  src={logo2} 
                  alt="Secondary Logo" 
                  className="h-10 w-auto"
                />
              </div>
              <span className="text-3xl font-bold text-gray-800">SRUJAN</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
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

      {/* You can add new content here */}
    </div>
  );
};

export default HomePage;

