import React, { useState } from 'react';
import { OFFICIAL_LOGO_URL } from '../constants';
import { submitFormAndSendEmail } from '../lib/emailService';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onOpenContactModal: () => void;
  onOpenMapModal: () => void;
  onOpenDonateModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setCurrentTab,
  onOpenContactModal,
  onOpenMapModal,
  onOpenDonateModal,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await submitFormAndSendEmail({
        formType: 'Newsletter',
        email: email,
        message: 'न्यूज़लेटर सब्सक्रिप्शन अनुरोध',
      });
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const handleNav = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#e2e2e5] border-t border-[#dbc2b0]/50 mt-20 text-[#1a1c1e]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-16 py-12 max-w-[1280px] mx-auto">
        {/* Column 1: Organization Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img src={OFFICIAL_LOGO_URL} alt="Dharmotthan Logo" className="w-12 h-12 object-contain mix-blend-multiply" />
            <span className="font-serif text-xl font-bold text-[#8f4e00]">Dharmotthan Chhath Puja Samiti</span>
          </div>
          <p className="text-[#554336] text-sm leading-relaxed">
            छठ पूजा की आध्यात्मिक विरासत को संजोने और ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क (दिल्ली) के निवासियों की सेवा के लिए समर्पित एक समुदाय-संचालित संगठन।
          </p>
          <div className="flex gap-3 pt-1">
            <button
              onClick={onOpenContactModal}
              title="QR / संपर्क"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#ffdcc2] text-[#8f4e00] transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-xl">qr_code_2</span>
            </button>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'Dharmotthan Chhath Puja Samiti',
                    text: 'धर्मोत्थान छठ पूजा समिति, ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क',
                    url: window.location.href,
                  }).catch(() => {});
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('लिंक कॉपी कर लिया गया है!');
                }
              }}
              title="साझा करें"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#ffdcc2] text-[#8f4e00] transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-xl">share</span>
            </button>
            <button
              onClick={onOpenContactModal}
              title="ईमेल करें"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-[#ffdcc2] text-[#8f4e00] transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-xl">mail</span>
            </button>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-sm text-[#b6171e] mb-4 uppercase tracking-wider">त्वरित संपर्क</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={onOpenContactModal} className="text-[#554336] hover:text-[#b6171e] underline underline-offset-4 transition-colors">
                  संपर्क करें
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('chhath2026')} className="text-[#554336] hover:text-[#b6171e] underline underline-offset-4 transition-colors">
                  दिशानिर्देश
                </button>
              </li>
              <li>
                <button onClick={onOpenMapModal} className="text-[#554336] hover:text-[#b6171e] underline underline-offset-4 transition-colors">
                  स्थान (ई-ब्लॉक, सोम बाज़ार)
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-[#b6171e] mb-4 uppercase tracking-wider">समुदाय व सहयोग</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={onOpenDonateModal} className="text-[#b6171e] font-bold hover:underline underline-offset-4 transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">volunteer_activism</span>
                  <span>दान करें (रसीद पाएँ)</span>
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="text-[#554336] hover:text-[#b6171e] underline underline-offset-4 transition-colors">
                  इतिहास
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('gallery')} className="text-[#554336] hover:text-[#b6171e] underline underline-offset-4 transition-colors">
                  गैलरी
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Column 3: Newsletter */}
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-[#b6171e] uppercase tracking-wider">न्यूज़लेटर से जुड़ें</h4>
          <p className="text-[#554336] text-xs">
            छठ महोत्सव के समय सारणी और समिति की खबरों के साथ अपडेट रहें।
          </p>
          {subscribed ? (
            <div className="p-3 bg-emerald-100 text-emerald-800 text-xs rounded-lg font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-base">check_circle</span>
              धन्यवाद! आप न्यूज़लेटर से जुड़ चुके हैं।
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ईमेल पता दर्ज करें"
                required
                className="flex-1 bg-[#f3f3f6] border border-[#dbc2b0] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#b6171e] focus:ring-1 focus:ring-[#b6171e]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#b6171e] text-white rounded-lg text-xs font-semibold hover:bg-[#b6171e]/90 transition-opacity flex items-center gap-1"
              >
                <span>जुड़ें</span>
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          )}
          <a
            href="https://maps.app.goo.gl/GfcgPXL5B9souB4U9"
            target="_blank"
            rel="noopener noreferrer"
            className="pt-2 text-[12px] text-[#554336] flex items-center gap-1.5 cursor-pointer hover:text-[#8f4e00]"
          >
            <span className="material-symbols-outlined text-sm text-[#8f4e00]">location_on</span>
            <span>ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क, नई दिल्ली – 110059</span>
          </a>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-4 border-t border-[#dbc2b0]/30 text-center text-xs text-[#554336] flex flex-col md:flex-row items-center justify-between gap-2">
        <p>© 2026 Dharmotthan Chhath Puja Samiti. 2025 से ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क (दिल्ली)। सर्वाधिकार सुरक्षित।</p>
        <p className="font-medium text-[#8f4e00] flex items-center justify-center gap-1">
          Built with <span className="text-red-500 animate-pulse">❤️</span> by <span className="font-bold underline decoration-[#8f4e00]/40">Suraj Bhan Gupta</span>
        </p>
      </div>
    </footer>
  );
};
