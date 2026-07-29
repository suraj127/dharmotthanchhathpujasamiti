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
      <section className="relative min-h-0 md:min-h-[90vh] flex items-center overflow-hidden rounded-3xl md:rounded-[40px] shadow-2xl mx-3 md:mx-10 mt-3 border border-[#dbc2b0]/30">
        <div className="absolute inset-0 z-0">
          <img
            alt="छठ पूजा सूर्योदय का दृश्य"
            className="w-full h-full object-cover object-[70%_center] md:object-center"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwsWpWMLFJeL5aW_wc7yfEwwP2sL82WdKguD2snWKTNeTc6cqelGvsl9dl-W1IAJ-tJoBqQ9gQx-9vridp06ScSuuwksBwLvYXLjNf23PtQWZ3nJxo0xOkUEBKeG26bJZVGZoVe_gSITrmZjEg7cNCpX3pEkHYEoanicwYjdm6ko9TgWw5YQrLNYyoeiiklO6zwmSn-AIL32z8MXEFLuHbC9DsQYU7zKXmaWahGOnO9tbjh7JqO7kVvV3AC2X8LbkuSdiq5thlI1w=s1600"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2e1500]/90 via-[#2e1500]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f9f9fc]"></div>
        </div>

        <div className="relative z-10 w-full max-w-[1280px] mx-auto px-4 sm:px-6 md:px-16 py-10 sm:py-12 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10">
          <div className="max-w-2xl space-y-4 sm:space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2.5 bg-[#ff9933]/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#ff9933]/50 text-amber-100 mx-auto md:mx-0">
              <img src={OFFICIAL_LOGO_URL} alt="Logo" className="w-5 h-5 sm:w-6 sm:h-6 object-contain mix-blend-multiply" />
              <span className="text-[10px] sm:text-xs font-semibold tracking-widest uppercase">धर्मोत्थान छठ पूजा समिति</span>
            </div>

            <h1 className="text-white font-serif text-3xl sm:text-4xl md:text-6xl font-bold leading-tight drop-shadow-md">
              आस्था और एकजुटता का संगम: <br />
              <span className="text-[#e9c400]">छठ पूजा 2026</span>
            </h1>

            <p className="text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
              सूर्य देव और छठी मैया के पावण पर्व पर धर्मोत्थान छठ पूजा समिति के साथ जुड़ें। ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क के हृदय में पवित्रता, भक्ति और सामुदायिक सेवा की एक आध्यात्मिक यात्रा।
            </p>

            <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center md:justify-start pt-2 sm:pt-4">
              <button
                onClick={() => {
                  setCurrentTab('chhath2026');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 sm:px-6 py-3 sm:py-3.5 saffron-gradient text-white rounded-xl font-semibold text-xs sm:text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>कार्यक्रम विवरण</span>
                <span className="material-symbols-outlined text-base sm:text-lg">arrow_forward</span>
              </button>

              <button
                onClick={onOpenDonateModal}
                className="px-5 sm:px-6 py-3 sm:py-3.5 bg-amber-100 text-[#8f4e00] hover:bg-white rounded-xl font-bold text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-base sm:text-lg text-[#b6171e]">volunteer_activism</span>
                <span>दान करें (सहयोग राशि)</span>
              </button>

              <button
                onClick={() => {
                  setCurrentTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-4 sm:px-5 py-3 sm:py-3.5 border border-white/50 text-white hover:bg-white/20 rounded-xl font-semibold text-xs sm:text-sm backdrop-blur-sm transition-all cursor-pointer"
              >
                हमारा इतिहास
              </button>
            </div>
          </div>

          {/* Hero Logo - Floating Motion Divine Emblem with Sun Corona Aura */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex flex-col items-center justify-center p-2 sm:p-4 group mt-2 md:mt-0"
          >
            {/* Outer Fading Solar Aura (Massive Sun Glow extending outwards) */}
            <motion.div
              animate={{
                scale: [1, 1.28, 1],
                opacity: [0.85, 0.45, 0.85],
              }}
              transition={{
                repeat: Infinity,
                duration: 3.8,
                ease: "easeInOut",
              }}
              className="absolute w-64 h-64 sm:w-96 sm:h-96 md:w-[460px] md:h-[460px] rounded-full pointer-events-none z-0"
              style={{
                background: 'radial-gradient(circle, rgba(255, 180, 0, 0.85) 0%, rgba(255, 120, 0, 0.5) 30%, rgba(255, 70, 0, 0.2) 60%, rgba(255, 50, 0, 0.05) 80%, transparent 100%)',
                filter: 'blur(16px)',
              }}
            />

            {/* Inner Intense Solar Flare Corona Ring */}
            <motion.div
              animate={{
                scale: [1.05, 1.18, 1.05],
                opacity: [0.9, 0.6, 0.9],
              }}
              transition={{
                repeat: Infinity,
                duration: 2.8,
                ease: "easeInOut",
              }}
              className="absolute w-44 h-44 sm:w-64 sm:h-64 md:w-76 md:h-76 rounded-full pointer-events-none z-0"
              style={{
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.9) 0%, rgba(255, 140, 0, 0.6) 45%, rgba(255, 90, 0, 0.2) 75%, transparent 100%)',
                filter: 'blur(8px)',
              }}
            />

            {/* Sacred Sun Levitation Container */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4.5,
                ease: "easeInOut",
              }}
              className="relative flex items-center justify-center cursor-pointer z-10"
            >
              {/* Central Circle holding Official Sun Emblem */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full bg-white/95 p-2.5 sm:p-3.5 shadow-[0_0_50px_rgba(255,215,0,0.9),0_12px_35px_rgba(0,0,0,0.4)] border-3 border-amber-300 flex items-center justify-center overflow-hidden z-20"
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

      {/* 3. Executive Committee Section (कार्यकारिणी समिति) */}
      <section className="py-6 max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-[#dbc2b0]/30 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dbc2b0]/30 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ffdcc2] text-[#8f4e00] text-xs font-semibold uppercase tracking-wider mb-2">
                <span className="material-symbols-outlined text-sm">groups</span>
                <span>धर्मोत्थान छठ पूजा समिति</span>
              </div>
              <h2 className="font-serif text-2xl md:text-4xl font-bold text-[#8f4e00]">
                कार्यकारिणी समिति (Executive Committee)
              </h2>
              <p className="text-[#554336] text-xs md:text-sm mt-1">
                ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क (दिल्ली) — हमारे समर्पित पदाधिकारी एवं कार्यकारिणी सदस्य
              </p>
            </div>
            <button
              onClick={() => {
                setCurrentTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 bg-[#ff9933]/15 text-[#8f4e00] hover:bg-[#ff9933]/25 border border-[#ff9933]/30 rounded-xl font-semibold text-xs transition-all flex items-center gap-1.5 self-start md:self-auto cursor-pointer shadow-sm hover:scale-105"
            >
              <span>समिति के बारे में विस्तार से देखें</span>
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>

          <div className="flex overflow-x-auto snap-x snap-mandatory space-x-3 sm:space-x-0 pb-4 pt-1 sm:pb-0 sm:pt-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 styled-scrollbar scroll-smooth">
            {[
              {
                name: 'श्री अरविंद कुमार',
                nameEn: 'Arvind Kumar',
                role: 'अध्यक्ष (President)',
                image: '/members/arvind-kumar.jpeg',
                badgeBg: 'bg-[#b6171e] text-white',
                desc: 'समिति के अध्यक्ष जो सभी गतिविधियों और सामाजिक-धार्मिक परियोजनाओं का मार्गदर्शन व नेतृत्व करते हैं।',
              },
              {
                name: 'श्री सूरज भान गुप्ता',
                nameEn: 'Suraj Bhan Gupta',
                role: 'उपाध्यक्ष (Vice President)',
                image: '/members/suraj-bhan-gupta.jpeg',
                badgeBg: 'bg-[#ff9933] text-white',
                desc: 'समिति के सह-मार्गदर्शक जो सभी कार्यक्रमों, घाट व्यवस्था और प्रशासनिक कार्यों का समन्वय करते हैं।',
              },
              {
                name: 'श्री राज सिंह',
                nameEn: 'Raj Singh',
                role: 'महासचिव (General Secretary)',
                image: '/members/raj-singh.jpeg',
                badgeBg: 'bg-[#8f4e00] text-white',
                desc: 'समिति के मुख्य संचालक जो सभी कार्यक्रमों, पत्राचार और संगठनात्मक गतिविधियों का प्रबंधन करते हैं।',
              },
              {
                name: 'श्री मुरारी झा',
                nameEn: 'Murari Jha',
                role: 'कोषाध्यक्ष (Treasurer)',
                image: '/members/murari-jha.jpeg',
                badgeBg: 'bg-[#705d00] text-white',
                desc: 'वित्तीय पारदर्शिता और समिति के कोष का लेखा-जोखा रखने के जिम्मेदार अधिकारी।',
              },
              {
                name: 'श्री रजनीश राय',
                nameEn: 'Rajnish Rai',
                role: 'संरक्षक (Patron)',
                image: '/members/rajnish-rai.jpeg',
                badgeBg: 'bg-[#554336] text-white',
                desc: 'समिति के मुख्य संरक्षक और वरिष्ठ मार्गदर्शक जो सभी कल्याणकारी निर्णयों में दिशा-निर्देश प्रदान करते हैं।',
              },
              {
                name: 'आचार्य आदित्य झा',
                nameEn: 'Acharya Aditya Jha',
                role: 'सलाहकार (Advisor)',
                image: '/members/acharya-aditya-jha.jpeg',
                badgeBg: 'bg-[#b6171e] text-white',
                desc: 'धार्मिक अनुष्ठानों, पावन छठ पूजा विधि-विधान और सांस्कृतिक कार्यक्रमों के मुख्य सलाहकार।',
              },
              {
                name: 'श्री सोनू कुमार',
                nameEn: 'Sonu Kumar',
                role: 'कार्यकारिणी सदस्य',
                image: '/members/sonu-kumar.jpeg',
                badgeBg: 'bg-[#ff9933] text-white',
                desc: 'घाट व्यवस्था, महाप्रसाद वितरण और स्वयंसेवक प्रबंधन के सक्रिय प्रभारी सदस्य।',
              },
              {
                name: 'श्री रजनीश मिश्रा',
                nameEn: 'Rajnish Mishra',
                role: 'कार्यकारिणी सदस्य',
                image: '/members/rajnish-mishra.jpeg',
                badgeBg: 'bg-[#ff9933] text-white',
                desc: 'घाट व्यवस्था, महाप्रसाद वितरण और स्वयंसेवक प्रबंधन के सक्रिय प्रभारी सदस्य।',
              },
            ].map((member, index) => (
              <div
                key={index}
                className="w-[44vw] min-w-[155px] max-w-[210px] sm:w-full flex-shrink-0 snap-start group bg-[#f9f8f6] hover:bg-white rounded-2xl p-3 sm:p-5 border border-[#dbc2b0]/30 hover:border-[#ff9933]/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center space-y-2 sm:space-y-3 relative overflow-hidden"
              >
                {/* Decorative Top Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1 sm:h-1.5 saffron-gradient opacity-80 group-hover:opacity-100 transition-opacity"></div>

                {/* Member Photo */}
                <div className="relative w-20 h-20 sm:w-32 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#ff9933]/30 shadow-md group-hover:scale-105 group-hover:border-[#ff9933] transition-all duration-300">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Member Details */}
                <div className="space-y-1 sm:space-y-1.5 flex-1 flex flex-col justify-between w-full">
                  <div>
                    <h3 className="font-serif font-bold text-xs sm:text-base text-[#1a1c1e] group-hover:text-[#8f4e00] transition-colors leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-[#887364] font-medium mt-0.5 truncate">({member.nameEn})</p>
                  </div>

                  <div className="pt-0.5 sm:pt-1">
                    <span className={`inline-block px-2 py-0.5 sm:px-3 rounded-full text-[10px] sm:text-[11px] font-semibold shadow-sm leading-tight ${member.badgeBg}`}>
                      {member.role}
                    </span>
                  </div>

                  <p className="text-[10px] sm:text-xs text-[#554336] leading-tight sm:leading-relaxed pt-1.5 sm:pt-2 border-t border-[#dbc2b0]/20 mt-1 sm:mt-2 line-clamp-3 sm:line-clamp-none">
                    {member.desc}
                  </p>
                </div>
              </div>
            ))}
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
