import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useScrollTo } from '../../application/hooks/useScrollTo';
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollToSection } = useScrollTo();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { label: 'Inicio', id: 'hero' },
    { label: 'Nosotros', id: 'about' },
    { label: 'Cursos', id: 'learning' },
    { label: 'Certificados', id: 'certificate-verification' }
  ];

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div 
            className="cursor-pointer"
            onClick={() => handleNavClick('hero')}
          >
            <Logo 
              variant={isScrolled ? 'dark' : 'light'}
              size="md"
              showText={true}
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-medium transition-colors hover:text-accent ${
                  isScrolled ? 'text-darkText' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            {/* CTA Button */}
            <button
              onClick={() => handleNavClick('contact')}
              className={`font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 ${
                isScrolled 
                  ? 'bg-primary text-white hover:bg-primary/90 shadow-lg' 
                  : 'bg-accent text-white hover:bg-accent/90 shadow-lg'
              }`}
            >
              Inscríbete
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-primary' : 'text-white'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t">
            <nav className="py-4">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="block w-full text-left px-6 py-3 text-darkText hover:bg-lightBg hover:text-accent transition-colors"
                >
                  {item.label}
                </button>
              ))}
              
              {/* CTA Button Mobile */}
              <div className="px-6 py-3">
                <button
                  onClick={() => handleNavClick('contact')}
                  className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300"
                >
                  Inscríbete
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 