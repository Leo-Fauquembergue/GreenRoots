import React, { useState } from 'react';
import { Cookie } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(true);

  const handleAccept = () => {
    setIsVisible(false);
  };

  const handleMouseOver = (e) => {
    e.currentTarget.style.backgroundColor = '#152416';
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.backgroundColor = '#85af61';
  };

  const handleFocus = (e) => {
    e.currentTarget.style.backgroundColor = '#152416';
  };

  const handleBlur = (e) => {
    e.currentTarget.style.backgroundColor = '#85af61';
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white text-color-dark p-4 rounded-lg shadow-lg max-w-sm border border-color-dark">
      <div className="flex flex-col items-start">
        <div className="flex items-center w-full">
          <div className="flex-shrink-0">
            <Cookie size={32} className="text-color-dark" />
          </div>
          <div className="ml-3">
            <p className="text-sm">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site web et pour vous offrir des contenus personnalisés.
              En continuant à utiliser notre site web, vous acceptez notre <a href="/privacy-policy" className="underline text-color-green-Pistachio">Politique de Confidentialité</a> et notre utilisation des cookies conformément au RGPD.
            </p>
          </div>
        </div>
        <button
        type="button"
          onClick={handleAccept}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ backgroundColor: '#85af61' }}
          className="mt-3 self-stretch text-white font-bold py-2 px-4 rounded-full transition-colors duration-300 cursor-pointer"
        >
          Accepter
        </button>
      </div>
    </div>
  );
}
