import React from 'react';
import { motion } from 'motion/react';
import { OFFICIAL_LOGO_URL } from '../constants';

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  onOpenEventGuideModal: () => void;
  onOpenContactModal: () => void;
  onOpenVolunteerModal: () => void;
  onOpenDonateModal?: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  setCurrentTab,
  onOpenEventGuideModal,
  onOpenContactModal,
  onOpenVolunteerModal,
  onOpenDonateModal,
}) => {
  return (
    <div className="space-y-16 animate-in fade-in duration-300">
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center overflow-hidden rounded-3xl md:rounded-[40px] shadow-2xl mx-3 md:mx-10 mt-3 border border-[#dbc2b0]/30">
        <div className="absolute inset-0 z-0">
          <img
            alt="छठ पूजा सूर्योदय का दृश्य"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwsWpWMLFJeL5aW_wc7yfEwwP2sL82WdKguD2snWKTNeTc6cqelGvsl9dl-W1IAJ-tJoBqQ9gQx-9vridp06ScSuuwksBwLvYXLjNf23PtQWZ3nJxo0xOkUEBKeG26bJZVGZoVe_gSITrmZjEg7cNCpX3pEkHYEoanicwYjdm6ko9TgWw5YQrLNYyoeiiklO6zwmSn-AIL32z8MXEFLuHbC9DsQYU7zKXmaWahGOnO9tbjh7JqO7kVvV3AC2X8LbkuSdiq5thlI1w=s1600"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2e1500]/80 via-[#2e1500]/40 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-6 md:px-16 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2.5 bg-[#ff9933]/30 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#ff9933]/50 text-amber-100">
              <img src={OFFICIAL_LOGO_URL} alt="Logo" className="w-6 h-6 object-contain mix-blend-multiply" />
              <span className="text-xs font-semibold tracking-widest uppercase">धर्मोत्थान छठ पूजा समिति</span>
            </div>

            <h1 className="text-white font-serif text-4xl md:text-6xl font-bold leading-tight drop-shadow-md">
              आस्था और एकजुटता का संगम: <br />
              <span className="text-[#e9c400]">छठ पूजा 2026</span>
            </h1>

            <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-xl">
              सूर्य देव और छठी मैया के पावण पर्व पर धर्मोत्थान छठ पूजा समिति के साथ जुड़ें। ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क के हृदय में पवित्रता, भक्ति और सामुदायिक सेवा की एक आध्यात्मिक यात्रा।
            </p>

            <div className="flex flex-wrap gap-3 pt-4">
              <button
                onClick={() => {
                  setCurrentTab('chhath2026');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 py-3.5 saffron-gradient text-white rounded-xl font-semibold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>कार्यक्रम विवरण</span>
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>

              <button
                onClick={onOpenDonateModal}
                className="px-6 py-3.5 bg-amber-100 text-[#8f4e00] hover:bg-white rounded-xl font-bold text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg text-[#b6171e]">volunteer_activism</span>
                <span>दान करें (सहयोग राशि)</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3.5 border border-white/50 text-white hover:bg-white/20 rounded-xl font-semibold text-sm backdrop-blur-sm transition-all cursor-pointer"
              >
                हमारा इतिहास
              </button>
            </div>
          </div>

          {/* Hero Logo - Floating Motion Divine Emblem without Outer Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center p-2 sm:p-4 group"
          >
            {/* Soft Sunbeams Glow */}
            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              className="absolute w-72 h-72 md:w-80 md:h-80 rounded-full bg-gradient-to-tr from-[#ff9933]/30 via-[#ffd700]/25 to-[#ff4500]/20 blur-3xl pointer-events-none"
            />

            {/* Sacred Orbit Halo & Smooth Levitation Container */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
                ease: "easeInOut",
              }}
              className="relative w-52 h-52 sm:w-60 sm:h-60 md:w-68 md:h-68 flex items-center justify-center cursor-pointer"
            >
              {/* Golden Dashed Clockwise Orbit */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 24,
                  ease: "linear",
                }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-[#ffd700]/70"
              />

              {/* Dotted Counter-Clockwise Orbit */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  repeat: Infinity,
                  duration: 16,
                  ease: "linear",
                }}
                className="absolute inset-2.5 rounded-full border border-dotted border-amber-100/60"
              />

              {/* Central Circle holding Official Emblem */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 rounded-full bg-white/95 p-3.5 shadow-[0_12px_35px_rgba(0,0,0,0.4)] border-2 border-amber-200 flex items-center justify-center overflow-hidden"
              >
                {/* Subtle Light Reflection Sweep */}
                <motion.div
                  animate={{
                    x: ['-150%', '150%'],
                  }}
                  transition={{
                    repeat: Infinity,
                    repeatDelay: 3.5,
                    duration: 1.5,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent transform -skew-x-12 pointer-events-none"
                />

                <img
                  src={OFFICIAL_LOGO_URL}
                  alt="धर्मोत्थान छठ पूजा समिति लोगो"
                  className="w-full h-full object-contain filter drop-shadow-md relative z-10"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Mission Pillars Section */}
      <section className="py-8 relative overflow-hidden max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#8f4e00] mb-3">हमारे पावन आधार स्तंभ</h2>
          <div className="h-1 w-24 bg-[#8f4e00] mx-auto rounded-full mb-4"></div>
          <p className="text-[#554336] text-sm md:text-base max-w-2xl mx-auto">
            प्राचीन परंपराओं में निहित, हमारी समिति चार मूलभूत मूल्यों पर आधारित है जो हमारे द्वारा प्रदान किए जाने वाले प्रत्येक अनुष्ठान और सेवा का मार्गदर्शन करते हैं।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1: Faith */}
          <div className="bg-white p-6 rounded-2xl border border-[#dbc2b0]/30 solar-glow hover:-translate-y-2 transition-all duration-300 text-center">
            <div className="w-14 h-14 bg-[#ffdcc2] text-[#8f4e00] rounded-full flex items-center justify-center mb-4 mx-auto shadow-sm">
              <span className="material-symbols-outlined text-3xl">temple_hindu</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1a1c1e] mb-2">आस्था</h3>
            <p className="text-[#554336] text-xs md:text-sm leading-relaxed">
              ब्रह्मांडीय प्रकाश के प्रति अटूट भक्ति के साथ छठ परंपराओं की पवित्रता को बनाए रखना।
            </p>
          </div>

          {/* Pillar 2: Service */}
          <div className="bg-white p-6 rounded-2xl border border-[#dbc2b0]/30 solar-glow hover:-translate-y-2 transition-all duration-300 text-center">
            <div className="w-14 h-14 bg-[#ffdcc2] text-[#8f4e00] rounded-full flex items-center justify-center mb-4 mx-auto shadow-sm">
              <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1a1c1e] mb-2">सेवा</h3>
            <p className="text-[#554336] text-xs md:text-sm leading-relaxed">
              श्रद्धालुओं की सहायता और हमारे पवित्र घाटों की स्वच्छता बनाए रखने के लिए निस्वार्थ समर्पण।
            </p>
          </div>

          {/* Pillar 3: Transparency */}
          <div className="bg-white p-6 rounded-2xl border border-[#dbc2b0]/30 solar-glow hover:-translate-y-2 transition-all duration-300 text-center">
            <div className="w-14 h-14 bg-[#ffdcc2] text-[#8f4e00] rounded-full flex items-center justify-center mb-4 mx-auto shadow-sm">
              <span className="material-symbols-outlined text-3xl">verified</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1a1c1e] mb-2">पारदर्शिता</h3>
            <p className="text-[#554336] text-xs md:text-sm leading-relaxed">
              सामुदायिक कार्यों और प्रबंधन में पूर्ण जवाबदेही और स्पष्टता सुनिश्चित करना।
            </p>
          </div>

          {/* Pillar 4: Togetherness */}
          <div className="bg-white p-6 rounded-2xl border border-[#dbc2b0]/30 solar-glow hover:-translate-y-2 transition-all duration-300 text-center">
            <div className="w-14 h-14 bg-[#ffdcc2] text-[#8f4e00] rounded-full flex items-center justify-center mb-4 mx-auto shadow-sm">
              <span className="material-symbols-outlined text-3xl">groups</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-[#1a1c1e] mb-2">एकजुटता</h3>
            <p className="text-[#554336] text-xs md:text-sm leading-relaxed">
              जीवन, प्रकृति और समाज के इस साझा उत्सव में सभी पृष्ठभूमि के लोगों को एकजुट करना।
            </p>
          </div>
        </div>
      </section>

      {/* 3. Upcoming Event Card Section */}
      <section className="py-6 max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-[#dbc2b0]/30 flex flex-col md:flex-row">
          <div className="md:w-1/2 relative h-64 md:h-auto">
            <img
              alt="सजा हुआ घाट"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXslVGB0mhG38f21dq6SVo6Z5ueCCa_KrMaB5ZcItmr6Nyie5kIih1ShjRXMw-PVLmJgEQPlgykSfFRl-aZMd7uIB6Z37jsMjcz1Q-2Q1rom76m26iHep645MdlothVsG3FRaTBcIDf2kyGVv6jjDO8jB2cg3UagFP0RgW619vea4RJuWnmpoBRXuPT-6_DFR_AG04pPWEUiPV3q-foIgOS5VGRTTgJ-rsIaa_wLGdTb002-reo2raRS7uebpazmcy3gh66oyUupI=s1600"
            />
            <div className="absolute top-5 left-5 bg-[#b6171e] text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow-lg">
              आगामी: नवंबर 2026
            </div>
          </div>

          <div className="md:w-1/2 p-8 md:p-10 space-y-6">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1a1c1e]">
              छठ पूजा उत्सव 2026: ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क
            </h2>

            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-[#8f4e00] bg-[#ffdcc2] p-2.5 rounded-xl text-xl flex-shrink-0">
                location_on
              </span>
              <div>
                <h4 className="font-semibold text-sm text-[#1a1c1e]">मुख्य स्थान</h4>
                <p className="text-[#554336] text-xs md:text-sm mt-0.5">
                  ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क, दिल्ली – 110059
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <span className="material-symbols-outlined text-[#8f4e00] bg-[#ffdcc2] p-2.5 rounded-xl text-xl flex-shrink-0">
                event
              </span>
              <div>
                <h4 className="font-semibold text-sm text-[#1a1c1e]">कार्यक्रम अनुसूची</h4>
                <p className="text-[#554336] text-xs md:text-sm mt-0.5">
                  4-दिवसीय भव्य महोत्सव। वैदिक मंत्रोच्चार के साथ 2026 के उत्सव का उद्घाटन समारोह।
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#dbc2b0]/30 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#1a1c1e]">तैयारी की प्रगति</span>
                <span className="text-[#8f4e00]">65%</span>
              </div>
              <div className="w-full h-3 bg-[#e2e2e5] rounded-full overflow-hidden">
                <div className="h-full saffron-gradient w-[65%] rounded-full"></div>
              </div>
            </div>

            <button
              onClick={onOpenEventGuideModal}
              className="w-full md:w-auto px-7 py-3 bg-[#b6171e] text-white rounded-xl font-semibold text-xs md:text-sm hover:bg-[#b6171e]/90 transition-all cursor-pointer shadow-md"
            >
              ईवेंट गाइड देखें
            </button>
          </div>
        </div>
      </section>

      {/* 4. Sacred Quote Section */}
      <section className="py-16 bg-[#2e1500] text-center text-white relative overflow-hidden shadow-2xl">
        <div className="max-w-3xl mx-auto px-6 relative z-10 space-y-6">
          <span className="material-symbols-outlined text-[#ffe16d] text-6xl opacity-60">
            format_quote
          </span>
          <h2 className="font-serif text-xl md:text-3xl italic leading-relaxed text-amber-100">
            "हे जीवनदाता सूर्य, हम आपके तेज के लिए अपनी प्रार्थनाएं और आभार अर्पित करते हैं जो ब्रह्मांड का पोषण करता है। आपका प्रकाश हमारे हृदयों को सत्य और पवित्रता की ओर ले जाए।"
          </h2>
          <div className="flex items-center justify-center gap-4 text-[#ffe16d]">
            <div className="h-[1px] w-12 bg-[#ffe16d] opacity-50"></div>
            <span className="text-xs tracking-widest uppercase font-semibold">सूर्य देव का आह्वान</span>
            <div className="h-[1px] w-12 bg-[#ffe16d] opacity-50"></div>
          </div>
        </div>
      </section>

      {/* 5. Service & Contact Banner Section */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-6">
        <div className="bg-[#ff9933]/15 border border-[#ff9933]/30 rounded-[36px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          <div className="flex-1 space-y-4 text-center md:text-left">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#693800]">
              सेवा के हमारे मिशन का हिस्सा बनें
            </h2>
            <p className="text-[#693800]/90 text-sm leading-relaxed">
              हमारी समिति घाटों के रखरखाव, स्वच्छता और श्रद्धालुओं के लिए एक सुरक्षित, दिव्य अनुभव सुनिश्चित करने के लिए समर्पित है। आपके सहयोग और सक्रिय भागीदारी से हम इस महापर्व को और भी भव्य बना सकते हैं।
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-2">
              <span
                onClick={onOpenDonateModal}
                className="px-5 py-2.5 bg-[#8f4e00] text-white rounded-full text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-amber-900 shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-sm">volunteer_activism</span>
                <span>सहयोग व दान राशि प्रदान करें</span>
              </span>
              <span
                onClick={onOpenVolunteerModal}
                className="px-4 py-2 bg-white/80 border border-[#dbc2b0]/50 rounded-full text-xs font-semibold text-[#8f4e00] flex items-center gap-1.5 cursor-pointer hover:bg-white"
              >
                <span className="material-symbols-outlined text-sm">handshake</span>
                <span>स्वयंसेवा करें</span>
              </span>
              <span
                onClick={onOpenContactModal}
                className="px-4 py-2 bg-white/80 border border-[#dbc2b0]/50 rounded-full text-xs font-semibold text-[#8f4e00] flex items-center gap-1.5 cursor-pointer hover:bg-white"
              >
                <span className="material-symbols-outlined text-sm">groups</span>
                <span>समुदाय से जुड़ें</span>
              </span>
            </div>
          </div>

          <div className="flex-shrink-0 w-full md:w-80">
            <div className="bg-white p-6 rounded-3xl shadow-xl space-y-4 border border-[#dbc2b0]/30 text-center">
              <h3 className="font-serif text-xl font-bold text-[#1a1c1e]">हमसे संपर्क करें</h3>
              <p className="text-[#554336] text-xs">
                आयोजन से जुड़ी किसी भी जानकारी या सुझाव के लिए आप हमसे जुड़ सकते हैं।
              </p>
              <button
                onClick={onOpenContactModal}
                className="w-full py-3.5 saffron-gradient text-white rounded-xl font-semibold text-xs md:text-sm shadow-md hover:scale-105 transition-all cursor-pointer"
              >
                संपर्क करें
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
