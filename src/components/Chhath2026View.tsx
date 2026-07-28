import React, { useState, useEffect } from 'react';
import { OFFICIAL_LOGO_URL } from '../constants';

interface Chhath2026ViewProps {
  onOpenVolunteerModal: () => void;
  onOpenMapModal: () => void;
  onOpenContactModal: () => void;
  onOpenDonateModal?: () => void;
}

export const Chhath2026View: React.FC<Chhath2026ViewProps> = ({
  onOpenVolunteerModal,
  onOpenMapModal,
  onOpenContactModal,
  onOpenDonateModal,
}) => {
  // Live Countdown to Chhath Puja Nov 14, 2026
  const [timeLeft, setTimeLeft] = useState({ days: 109, hours: 1, minutes: 19, seconds: 45 });

  useEffect(() => {
    const targetDate = new Date('2026-11-14T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-16 animate-in fade-in duration-300">
      {/* 1. Hero / Countdown Section */}
      <section className="relative h-[550px] md:h-[650px] flex items-center justify-center overflow-hidden rounded-3xl md:rounded-[40px] shadow-2xl mx-3 md:mx-10 mt-3 border border-[#dbc2b0]/30 text-center">
        <div className="absolute inset-0 z-0">
          <img
            alt="छठ पूजा 2026"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAz9rIKuwUBUUPeQKVauefu4Od5eM6Uu9fZeiwWU15S3mDZ4oBzhiU8wBctAk5Dyls3vDFynRvi6A0EoblGCYQCnEoB_5TIxU21FPEZeU7au71stehknpj_ReEbpc7HJoBJLACtt6aOIkWITvpqGYiEHHXNGO70vLd0Qh23hBse4aUYZXCnIVcxo41j6lT8vjb-bvvBPVJ4886mazBg4V3eMKSdhPbyD009MuBzTmQwIctEXMeFixIk0e_36ktwTG9Pn2tJF58ekHo=s1600"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-[#f9f9fc]"></div>
        </div>

        <div className="relative z-10 px-6 max-w-3xl space-y-6">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            छठ पूजा 2026
          </h1>
          <p className="font-serif text-xl md:text-2xl text-amber-100 font-semibold drop-shadow">
            ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क घाट पर भगवान सूर्य का महापर्व
          </p>

          {/* Countdown timer cards */}
          <div className="flex gap-4 md:gap-6 justify-center pt-2">
            <div className="bg-white/85 backdrop-blur-md px-5 py-3 md:px-7 md:py-4 rounded-2xl min-w-[90px] md:min-w-[110px] text-center solar-glow border border-[#dbc2b0]/50 shadow-xl">
              <div className="font-serif text-2xl md:text-4xl font-bold text-[#8f4e00]">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-xs font-semibold text-[#554336] uppercase tracking-wider mt-1">
                दिन
              </div>
            </div>

            <div className="bg-white/85 backdrop-blur-md px-5 py-3 md:px-7 md:py-4 rounded-2xl min-w-[90px] md:min-w-[110px] text-center solar-glow border border-[#dbc2b0]/50 shadow-xl">
              <div className="font-serif text-2xl md:text-4xl font-bold text-[#8f4e00]">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-xs font-semibold text-[#554336] uppercase tracking-wider mt-1">
                घंटे
              </div>
            </div>

            <div className="bg-white/85 backdrop-blur-md px-5 py-3 md:px-7 md:py-4 rounded-2xl min-w-[90px] md:min-w-[110px] text-center solar-glow border border-[#dbc2b0]/50 shadow-xl">
              <div className="font-serif text-2xl md:text-4xl font-bold text-[#8f4e00]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-xs font-semibold text-[#554336] uppercase tracking-wider mt-1">
                मिनट
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Schedule & Timeline */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 space-y-8">
        <div className="flex items-center gap-4">
          <div className="h-1 w-12 bg-[#8f4e00] rounded-full"></div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1a1c1e]">
            उत्सव की समय सारणी
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Day 1 */}
          <div className="bg-[#f3f3f6] p-6 rounded-2xl border border-[#dbc2b0]/30 hover:border-[#ff9933] transition-all group">
            <div className="text-[#8f4e00] font-bold text-xs mb-1">प्रथम दिन - 14 नवंबर</div>
            <h3 className="font-serif text-xl font-bold text-[#1a1c1e] mb-2 group-hover:text-[#8f4e00] transition-colors">
              नहाय खाय
            </h3>
            <p className="text-[#554336] text-xs leading-relaxed mb-4">
              श्रद्धालु नदी में पवित्र स्नान करते हैं और कद्दू-भात का सात्विक भोजन तैयार करते हैं।
            </p>
            <div className="flex items-center gap-1.5 text-[#b6171e] text-xs font-semibold pt-2 border-t border-[#dbc2b0]/20">
              <span className="material-symbols-outlined text-base">schedule</span>
              <span>प्रातः काल</span>
            </div>
          </div>

          {/* Day 2 */}
          <div className="bg-[#f3f3f6] p-6 rounded-2xl border border-[#dbc2b0]/30 hover:border-[#ff9933] transition-all group">
            <div className="text-[#8f4e00] font-bold text-xs mb-1">द्वितीय दिन - 15 नवंबर</div>
            <h3 className="font-serif text-xl font-bold text-[#1a1c1e] mb-2 group-hover:text-[#8f4e00] transition-colors">
              खरना
            </h3>
            <p className="text-[#554336] text-xs leading-relaxed mb-4">
              दिन भर का उपवास, जिसे शाम को चंद्रोदय के बाद खीर, पूरी और फलों के साथ तोड़ा जाता है।
            </p>
            <div className="flex items-center gap-1.5 text-[#b6171e] text-xs font-semibold pt-2 border-t border-[#dbc2b0]/20">
              <span className="material-symbols-outlined text-base">schedule</span>
              <span>शाम 7:30 बजे से</span>
            </div>
          </div>

          {/* Day 3 */}
          <div className="bg-white p-6 rounded-2xl border-2 border-[#ff9933] shadow-lg transition-all group relative">
            <span className="absolute -top-3 right-4 bg-[#8f4e00] text-white text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase">
              मुख्य अर्घ्य
            </span>
            <div className="text-[#8f4e00] font-bold text-xs mb-1">तृतीय दिन - 16 नवंबर</div>
            <h3 className="font-serif text-xl font-bold text-[#8f4e00] mb-2">
              संध्या अर्घ्य
            </h3>
            <p className="text-[#554336] text-xs leading-relaxed mb-4">
              पूरे समुदाय के साथ घाट पर डूबते सूर्य को 'अर्घ्य' अर्पित करना।
            </p>
            <div className="flex items-center gap-1.5 text-[#b6171e] text-xs font-semibold pt-2 border-t border-[#dbc2b0]/20">
              <span className="material-symbols-outlined text-base">schedule</span>
              <span>शाम 4:30 - 6:00 बजे</span>
            </div>
          </div>

          {/* Day 4 */}
          <div className="bg-[#f3f3f6] p-6 rounded-2xl border border-[#dbc2b0]/30 hover:border-[#ff9933] transition-all group">
            <div className="text-[#8f4e00] font-bold text-xs mb-1">चतुर्थ दिन - 17 नवंबर</div>
            <h3 className="font-serif text-xl font-bold text-[#1a1c1e] mb-2 group-hover:text-[#8f4e00] transition-colors">
              उषा अर्घ्य
            </h3>
            <p className="text-[#554336] text-xs leading-relaxed mb-4">
              उगते सूर्य को अंतिम अर्घ्य, जो 36 घंटे के कठिन व्रत की समाप्ति का प्रतीक है।
            </p>
            <div className="flex items-center gap-1.5 text-[#b6171e] text-xs font-semibold pt-2 border-t border-[#dbc2b0]/20">
              <span className="material-symbols-outlined text-base">schedule</span>
              <span>सुबह 5:30 - 7:00 बजे</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Matiala Special & Guidelines Bento Grid */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-[#ff9933]/15 p-8 md:p-10 rounded-3xl relative overflow-hidden solar-glow border border-[#ff9933]/30">
            <div className="relative z-10 space-y-4">
              <span className="bg-[#8f4e00] text-white font-semibold text-[11px] px-3.5 py-1 rounded-full uppercase tracking-wider inline-block">
                विशेष सुविधाएँ
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#8f4e00]">
                सामुदायिक भक्ति
              </h2>
              <p className="text-[#554336] text-sm md:text-base leading-relaxed max-w-xl">
                हमारी समिति प्रतिवर्ष 500+ से अधिक श्रद्धालुओं की मेजबानी करती है। हम निःशुल्क बांस की टोकरी (दउरा), छठ गीतों के लिए सांस्कृतिक मंच और हर व्रती की सहायता के लिए 50+ स्वयंसेवकों की टीम प्रदान करते हैं।
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="text-center p-3 bg-white/70 rounded-2xl border border-white">
                  <div className="font-serif text-2xl font-bold text-[#8f4e00]">50+</div>
                  <div className="text-[11px] text-[#554336] font-semibold uppercase">स्वयंसेवक</div>
                </div>
                <div className="text-center p-3 bg-white/70 rounded-2xl border border-white">
                  <div className="font-serif text-2xl font-bold text-[#8f4e00]">24/7</div>
                  <div className="text-[11px] text-[#554336] font-semibold uppercase">चिकित्सा सहायता</div>
                </div>
                <div className="text-center p-3 bg-white/70 rounded-2xl border border-white">
                  <div className="font-serif text-2xl font-bold text-[#8f4e00]">निःशुल्क</div>
                  <div className="text-[11px] text-[#554336] font-semibold uppercase">प्रसादम</div>
                </div>
                <div className="text-center p-3 bg-white/70 rounded-2xl border border-white">
                  <div className="font-serif text-2xl font-bold text-[#8f4e00]">CCTV</div>
                  <div className="text-[11px] text-[#554336] font-semibold uppercase">सुरक्षा निगरानी</div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 h-full w-1/3 opacity-20 pointer-events-none flex items-center justify-center p-4">
              <img src={OFFICIAL_LOGO_URL} alt="Logo Emblem" className="max-h-56 object-contain mix-blend-multiply" />
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-[#e8e8ea] p-8 rounded-3xl border border-[#dbc2b0]/40 space-y-5">
            <h3 className="font-serif text-2xl font-bold text-[#1a1c1e] flex items-center gap-2">
              <span className="material-symbols-outlined text-[#b6171e]">verified</span>
              <span>दिशानिर्देश</span>
            </h3>
            <ul className="space-y-4 text-xs md:text-sm text-[#554336]">
              <li className="flex gap-2.5">
                <span className="material-symbols-outlined text-[#8f4e00] text-xl flex-shrink-0 mt-0.5">
                  check_circle
                </span>
                <p>
                  <strong className="text-[#1a1c1e]">व्रती पहले:</strong> अनुष्ठान करने वाले श्रद्धालुओं के लिए प्राथमिकता कतार।
                </p>
              </li>
              <li className="flex gap-2.5">
                <span className="material-symbols-outlined text-[#8f4e00] text-xl flex-shrink-0 mt-0.5">
                  check_circle
                </span>
                <p>
                  <strong className="text-[#1a1c1e]">पर्यावरण के अनुकूल:</strong> जल में प्लास्टिक या गैर-बायोडिग्रेडेबल सामग्री न डालें।
                </p>
              </li>
              <li className="flex gap-2.5">
                <span className="material-symbols-outlined text-[#8f4e00] text-xl flex-shrink-0 mt-0.5">
                  check_circle
                </span>
                <p>
                  <strong className="text-[#1a1c1e]">जूते-चप्पल:</strong> कृपया घाट क्षेत्र में प्रवेश करने से पहले निर्धारित जूता स्टालों का उपयोग करें।
                </p>
              </li>
              <li className="flex gap-2.5">
                <span className="material-symbols-outlined text-[#8f4e00] text-xl flex-shrink-0 mt-0.5">
                  check_circle
                </span>
                <p>
                  <strong className="text-[#1a1c1e]">पार्किंग:</strong> जाम से बचने के लिए केवल ई-ब्लॉक निर्धारित पार्किंग का उपयोग करें।
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Location Guide */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="material-symbols-outlined text-[#8f4e00] text-4xl bg-[#ffdcc2] p-3 rounded-2xl">
                location_on
              </span>
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1a1c1e]">
                  स्थान निर्देशिका
                </h2>
                <p className="text-[#554336] text-xs md:text-sm font-medium">
                  ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क, नई दिल्ली – 110059
                </p>
              </div>
            </div>

            <div className="space-y-3 bg-[#eeeef0] p-6 rounded-2xl border border-[#dbc2b0]/30 text-xs md:text-sm">
              <div className="flex justify-between items-center py-2 border-b border-[#dbc2b0]/30">
                <span className="font-semibold text-[#1a1c1e]">निकटतम मेट्रो स्टेशन</span>
                <span className="text-[#b6171e] font-semibold">उत्तम नगर वेस्ट (ब्लू लाइन)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-[#dbc2b0]/30">
                <span className="font-semibold text-[#1a1c1e]">पैदल दूरी</span>
                <span className="text-[#554336]">10-12 मिनट</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="font-semibold text-[#1a1c1e]">लैंडमार्क</span>
                <span className="text-[#554336]">सोम बाजार मार्केट के पास</span>
              </div>
              <a
                href="https://maps.app.goo.gl/GfcgPXL5B9souB4U9"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-4 py-3 border-2 border-[#b6171e] text-[#b6171e] rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-[#b6171e] hover:text-white transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">directions</span>
                <span>गूगल मैप्स पर रास्ता देखें</span>
              </a>
            </div>
          </div>

          <div className="h-[380px] rounded-3xl overflow-hidden shadow-lg border border-[#dbc2b0]/40 relative group">
            <img
              alt="गूगल मैप"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjwSz2Kk5uPHXOCSMoaFCQZXDB_gD4E3KXD039dlin8Kah_g2EBftjoytc0BYidXzJm5BMZAV0clj-sClLDzdarcifLU3juMHRLbo5bvCCGO_ChMsaLkzd-OA9RjzD1RvGo37MW9bAAXJHY9fxwYDrym8MgiEmPlBZUfGKf_OzZPtjIVGeE7HsO8tEkYOwVbN3_qHN2ErGaaLR2UAZlbO_tVdFg62O5WWtXlfllEZe-lSQlR5xYP-e-yJKQqLdoBR3WMV21sNgVJA=s1600"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <button
                onClick={onOpenMapModal}
                className="px-6 py-3 bg-white text-[#8f4e00] rounded-full font-semibold shadow-xl text-xs md:text-sm flex items-center gap-2 hover:scale-105 transition-transform"
              >
                <span className="material-symbols-outlined text-base">map</span>
                <span>मैप खोलें</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Volunteer/Call to Action */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-6">
        <div className="saffron-gradient rounded-[32px] p-8 md:p-14 text-center text-white solar-glow space-y-6">
          <h2 className="font-serif text-3xl md:text-5xl font-bold leading-tight">
            इस दैवीय सेवा का हिस्सा बनें
          </h2>
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            धर्मोत्थान छठ पूजा समिति 2026 के उत्सव के लिए स्वयंसेवकों को आमंत्रित करती है। घाट प्रबंधन, प्रसाद वितरण या श्रद्धालुओं के मार्गदर्शन में हमारी सहायता करें।
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <button
              onClick={onOpenVolunteerModal}
              className="px-8 py-4 bg-white text-[#8f4e00] font-bold rounded-full hover:shadow-2xl hover:scale-105 active:scale-95 transition-all text-sm cursor-pointer shadow-lg"
            >
              स्वयंसेवक के रूप में पंजीकरण करें
            </button>
            <button
              onClick={onOpenContactModal}
              className="px-8 py-4 border-2 border-white/60 text-white font-bold rounded-full hover:bg-white/10 transition-all text-sm cursor-pointer"
            >
              कार्यक्रम प्रायोजित करें
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
