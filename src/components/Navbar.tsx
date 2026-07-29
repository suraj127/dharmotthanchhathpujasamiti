import React from 'react';
import { OFFICIAL_LOGO_URL } from '../constants';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenDonateModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab, onOpenDonateModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'home', label: 'मुख्य पृष्ठ' },
    { id: 'about', label: 'हमारे बारे में' },
    { id: 'chhath2026', label: 'छठ पूजा 2026' },
    { id: 'gallery', label: 'गैलरी' },
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav style={{ viewTransitionName: 'site-navbar' }} className="bg-[#f9f9fc]/90 backdrop-blur-md text-[#8f4e00] sticky top-0 z-50 border-b border-[#dbc2b0]/30 shadow-sm transition-all">
      <div className="flex justify-between items-center w-full px-4 md:px-12 py-3.5 max-w-[1280px] mx-auto">
        {/* Logo & Title */}
        <button 
          onClick={() => handleNavClick('home')} 
          className="flex items-center gap-3 text-left group focus:outline-none"
        >
          <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 flex items-center justify-center overflow-hidden">
            <img 
              src={OFFICIAL_LOGO_URL} 
              alt="धर्मोत्थान छठ पूजा समिति लोगो" 
              className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg md:text-xl text-[#b6171e] font-bold tracking-tight leading-tight">
              धर्मोत्थान छठ पूजा समिति
            </span>
            <span className="text-[11px] text-[#554336] font-medium tracking-wide hidden sm:inline-block">
              ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क, नई दिल्ली – 110059
            </span>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-semibold text-sm transition-all duration-300 py-1 relative ${
                  isActive
                    ? 'text-[#8f4e00] font-bold border-b-2 border-[#8f4e00]'
                    : 'text-[#554336] hover:text-[#8f4e00]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenDonateModal}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 saffron-gradient text-white rounded-full text-xs md:text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
            <span>दान करें / सहयोग</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#8f4e00] rounded-lg hover:bg-black/5 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-3xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f9f9fc] border-b border-[#dbc2b0]/40 px-6 py-4 shadow-xl space-y-3 animate-in slide-in-from-top duration-200">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left py-2.5 px-3 rounded-lg text-base font-semibold flex items-center justify-between ${
                currentTab === item.id
                  ? 'bg-[#ff9933]/15 text-[#8f4e00] font-bold'
                  : 'text-[#1a1c1e] hover:bg-black/5'
              }`}
            >
              <span>{item.label}</span>
              {currentTab === item.id && (
                <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
              )}
            </button>
          ))}
          <div className="pt-2 border-t border-[#dbc2b0]/30">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDonateModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 saffron-gradient text-white rounded-xl text-sm font-semibold shadow-md"
            >
              <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
              <span>सहभागी बनें / सहयोग दें</span>
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
