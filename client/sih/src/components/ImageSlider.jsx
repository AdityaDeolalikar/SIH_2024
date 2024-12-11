import React, { useState, useEffect } from 'react';

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Innovate & Transform',
      subtitle: 'Empowering Students to Shape the Future',
      description: 'Join a vibrant community of innovators, researchers, and entrepreneurs.'
    },
    {
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Research Excellence',
      subtitle: 'Pushing Boundaries of Knowledge',
      description: 'Access cutting-edge research facilities and expert mentorship.'
    },
    {
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
      title: 'Collaborative Success',
      subtitle: 'Building Tomorrow Together',
      description: 'Connect with industry leaders and academic pioneers.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image with Gradient Overlay */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content */}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 transform -translate-y-10 opacity-0 animate-slideDown">
                {slide.title}
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-400 transform -translate-y-10 opacity-0 animate-slideDown animation-delay-200">
                {slide.subtitle}
              </h2>
              <p className="text-lg md:text-xl mb-8 transform -translate-y-10 opacity-0 animate-slideDown animation-delay-400">
                {slide.description}
              </p>
              <button className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 -translate-y-10 opacity-0 animate-slideDown animation-delay-600">
                Get Started
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-blue-500 w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={() => goToSlide((currentSlide - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
      >
        <i className="fas fa-chevron-left text-white text-2xl"></i>
      </button>
      <button
        onClick={() => goToSlide((currentSlide + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300"
      >
        <i className="fas fa-chevron-right text-white text-2xl"></i>
      </button>
    </div>
  );
};

export default ImageSlider; 