import React from 'react';
import { OFFICIAL_LOGO_URL } from '../constants';

interface AboutViewProps {
  onOpenDonateModal: () => void;
  onOpenContactModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenDonateModal, onOpenContactModal }) => {
  const coreLeaders = [
    {
      name: 'श्री अरविंद कुमार (Arvind Kumar)',
      role: 'अध्यक्ष (President)',
      desc: 'समिति के कुशल मार्गदर्शक एवं अध्यक्ष जो सभी गतिविधियों और सामाजिक-धार्मिक परियोजनाओं का नेतृत्व करते हैं।',
      image: '/members/arvind-kumar.jpeg',
    },
    {
      name: 'श्री सूरज भान गुप्ता (Suraj Bhan Gupta)',
      role: 'उपाध्यक्ष (Vice President)',
      desc: 'समिति के सह-मार्गदर्शक जो सभी कार्यक्रमों, घाट व्यवस्था और प्रशासनिक कार्यों का समन्वय करते हैं।',
      image: '/members/suraj-bhan-gupta.jpeg',
    },
    {
      name: 'श्री सोनू कुमार (Sonu Kumar)',
      role: 'सचिव (Secretary)',
      desc: 'समिति के मुख्य संचालक जो सभी कार्यक्रमों, पत्राचार और संगठनात्मक गतिविधियों का प्रबंधन करते हैं।',
      image: '/members/sonu-kumar.jpeg',
    },
  ];

  const executiveMembers = [
    {
      name: 'श्री राज सिंह (Raj Singh)',
      role: 'कोषाध्यक्ष (Treasurer)',
      desc: 'वित्तीय पारदर्शिता और समिति के कोष का लेखा-जोखा रखने के जिम्मेदार अधिकारी।',
      image: '/members/raj-singh.jpeg',
    },
    {
      name: 'श्री रजनीश राय (Rajnish Rai)',
      role: 'संरक्षक (Patron)',
      desc: 'समिति के मुख्य संरक्षक और वरिष्ठ मार्गदर्शक जो सभी कल्याणकारी निर्णयों में दिशा-निर्देश प्रदान करते हैं।',
      image: '/members/rajnish-rai.jpeg',
    },
    {
      name: 'आचार्य आदित्य झा (Acharya Aditya Jha)',
      role: 'सलाहकार (Advisor)',
      desc: 'धार्मिक अनुष्ठानों, पावन छठ पूजा विधि-विधान और सांस्कृतिक कार्यक्रमों के मुख्य सलाहकार।',
      image: '/members/acharya-aditya-jha.jpeg',
    },
    {
      name: 'श्री रजनीश मिश्रा (Rajnish Mishra)',
      role: 'कार्यकारिणी सदस्य (Executive Member)',
      desc: 'घाट व्यवस्था, महाप्रसाद वितरण और स्वयंसेवक प्रबंधन के सक्रिय प्रभारी सदस्य।',
      image: '/members/rajnish-mishra.jpeg',
    },
  ];


  return (
    <div className="space-y-16 animate-in fade-in duration-300">
      {/* 1. Hero Section */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#ffdcc2] text-[#2e1500] text-xs font-semibold uppercase tracking-wider">
            हमारा पावन उद्देश्य
          </span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#8f4e00] leading-tight">
            परंपरा का संरक्षण, मानवता की सेवा।
          </h1>
          <p className="text-[#554336] text-base leading-relaxed">
            धर्म के सिद्धांतों पर आधारित, हम ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क (दिल्ली) के आध्यात्मिक और सामाजिक कल्याण के लिए समर्पित एक समुदाय-संचालित संगठन हैं, जो छठ पूजा के दिव्य उत्सव के माध्यम से सेवा करते हैं।
          </p>

          <div className="pt-2">
            <button
              onClick={onOpenDonateModal}
              className="saffron-gradient text-white px-8 py-3.5 rounded-full font-semibold text-xs md:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-lg">favorite</span>
              <span>हमारे मिशन का समर्थन करें</span>
            </button>
          </div>
        </div>

        <div className="flex-1 relative flex justify-center">
          <div className="absolute -inset-4 bg-[#ffe16d]/20 blur-3xl rounded-full"></div>
          <img
            alt="धर्मोत्थान छठ पूजा समिति लोगो"
            className="relative z-10 w-full max-w-[420px] object-contain mix-blend-multiply hover:scale-105 transition-transform"
            src={OFFICIAL_LOGO_URL}
          />
        </div>
      </section>

      {/* 2. Our Story */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 space-y-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-[#b6171e]">हमारी कहानी</h2>
          <p className="text-xs uppercase tracking-widest text-[#887364] font-semibold mt-1">
            ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क में भक्ति की एक विरासत
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 bg-[#f3f3f6] border border-[#dbc2b0]/40 p-8 rounded-3xl solar-glow flex flex-col justify-center space-y-3">
            <h3 className="font-serif text-2xl font-bold text-[#8f4e00]">समुदाय से जुड़ी जड़ें</h3>
            <p className="text-[#554336] text-sm leading-relaxed">
              धर्मोत्थान छठ पूजा समिति का उदय ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क क्षेत्र के उन श्रद्धालुओं के एक विनम्र समूह से हुआ, जिन्होंने नदी के तटों की पवित्रता को दिल्ली के हृदय तक लाने का संकल्प लिया। 2025 से शुरू होकर, यह हजारों लोगों के लिए आध्यात्मिक शक्ति का स्तंभ बन गई है। हमारा इतिहास स्थानीय समाज के ताने-बाने में बुना हुआ है, जहाँ छठ के दौरान हर सूर्योदय सामूहिक प्रार्थना और सामाजिक सद्भाव के प्रति हमारी प्रतिबद्धता को दर्शाता है।
            </p>
          </div>

          <div className="md:col-span-4 rounded-3xl overflow-hidden min-h-[250px] border border-[#dbc2b0]/40 shadow-sm">
            <img
              alt="समिति इतिहास"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsL5ZlI-BVND2RJ1aXJusRUT-sjahr1AD1zix37DUVbOMO66toTdyCN1xQuN6fs0YGU-GlDy0hngHbILzk_gRkLRPP97Uc6ZhAQGFO7ZALfeARBRs7zcysFINRJfGw199l5h25DcbXLSVMpQkyCHKFjJVJeN8Nlbp0ZMAEkkrsNtlRSpGnvavjDcjbR87KDTqUcNMZyQzeWBORbcw77xbbkrIt4PtZZQBYLHl6WeqVKJ320IA2aMYlYke7nAkT6Eu33drg-Rle7FM=s1600"
            />
          </div>

          <div className="md:col-span-4 rounded-3xl overflow-hidden min-h-[250px] border border-[#dbc2b0]/40 shadow-sm">
            <img
              alt="घाट प्रभाव"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBX2WDkhmwBnyFWX8t4AtROrjgpfRI-10BLA9xvLlg7gqhKHeYovkayD6ZHR8l9JwOAHA061QOXHOz6O-wStHSp6y-Tc46dFiReSyjs0zc4fTwud1Q-oczR0RXkzWq9e2TYIYMNIaCGveAqfG8DJ_VHkNoCWvSFxFLsBslZJIbarR3PPCeA1_qJxe9ErsjR9m7OoZvdV1FHWSyHK9niBBUrj2l_fGfeyY-XOoUpVYBfH29vavbO-G0NgZq0REPj_Q-PIsfBDs86ncw=s1600"
            />
          </div>

          <div className="md:col-span-8 bg-[#eeeef0] border border-[#dbc2b0]/40 p-8 rounded-3xl flex flex-col justify-center space-y-3">
            <h3 className="font-serif text-2xl font-bold text-[#b6171e]">हमारा प्रभाव</h3>
            <p className="text-[#554336] text-sm leading-relaxed">
              आज हमारा प्रभाव चार दिवसीय त्योहार से कहीं आगे तक फैला हुआ है। हम साल भर सामुदायिक सेवा की सुविधा प्रदान करते हैं, सार्वजनिक स्वच्छता अभियान चलाते हैं, और ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क के भीतर शिक्षा और स्वास्थ्य सेवा के लिए वित्तीय सहायता प्रदान करते हैं। समिति इस बात का प्रमाण है कि "आस्था" के प्रकाश में "एकजुटता" क्या हासिल कर सकती है।
            </p>
          </div>
        </div>
      </section>

      {/* 3. Our Values */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 space-y-8">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold text-[#b6171e]">हमारे मूल्य</h2>
          <div className="h-1 w-20 bg-[#8f4e00] mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Faith */}
          <div className="bg-white border border-[#dbc2b0]/40 p-6 rounded-3xl solar-glow text-center space-y-3 hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-[#ffdcc2] rounded-full flex items-center justify-center mx-auto text-[#8f4e00]">
              <span className="material-symbols-outlined text-3xl">brightness_7</span>
            </div>
            <h4 className="font-serif text-xl font-bold text-[#8f4e00]">आस्था</h4>
            <p className="text-xs text-[#554336]">हमारी हर प्रार्थना और कार्य की अडिग नींव।</p>
          </div>

          {/* Service */}
          <div className="bg-white border border-[#dbc2b0]/40 p-6 rounded-3xl solar-glow text-center space-y-3 hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-[#ffdad6] rounded-full flex items-center justify-center mx-auto text-[#b6171e]">
              <span className="material-symbols-outlined text-3xl">volunteer_activism</span>
            </div>
            <h4 className="font-serif text-xl font-bold text-[#b6171e]">सेवा</h4>
            <p className="text-xs text-[#554336]">अपने समुदाय के सदस्यों के उत्थान के लिए निस्वार्थ समर्पण।</p>
          </div>

          {/* Transparency */}
          <div className="bg-white border border-[#dbc2b0]/40 p-6 rounded-3xl solar-glow text-center space-y-3 hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-[#ffe16d] rounded-full flex items-center justify-center mx-auto text-[#705d00]">
              <span className="material-symbols-outlined text-3xl">visibility</span>
            </div>
            <h4 className="font-serif text-xl font-bold text-[#705d00]">पारदर्शिता</h4>
            <p className="text-xs text-[#554336]">हमारे द्वारा प्रबंधित प्रत्येक दान और परियोजना में पूर्ण ईमानदारी।</p>
          </div>

          {/* Togetherness */}
          <div className="bg-white border border-[#dbc2b0]/40 p-6 rounded-3xl solar-glow text-center space-y-3 hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-[#ffb77a] rounded-full flex items-center justify-center mx-auto text-[#2e1500]">
              <span className="material-symbols-outlined text-3xl">group</span>
            </div>
            <h4 className="font-serif text-xl font-bold text-[#8f4e00]">एकजुटता</h4>
            <p className="text-xs text-[#554336]">एकता ही हमारी शक्ति है; हम एक परिवार के रूप में उत्सव मनाते हैं और सेवा करते हैं।</p>
          </div>
        </div>
      </section>

      {/* 4. The Committee */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 py-6">
        <div className="bg-[#f3f3f6] rounded-3xl p-8 md:p-12 border border-[#dbc2b0]/40 space-y-10">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="lg:w-1/3 space-y-4">
              <h2 className="font-serif text-3xl font-bold text-[#8f4e00]">कार्यकारिणी समिति</h2>
              <p className="text-xs md:text-sm text-[#554336] leading-relaxed">
                विवेक और जुनून से प्रेरित, हमारी समिति के सदस्य स्थानीय नेता हैं जो यह सुनिश्चित करने के लिए अपना समय स्वेच्छा से देते हैं कि समिति अपने आध्यात्मिक और सामाजिक दायित्वों को पूरा करे।
              </p>

              <div className="p-5 bg-[#e8e8ea] border border-[#dbc2b0]/50 rounded-2xl italic text-[#554336] relative text-xs md:text-sm">
                <span className="material-symbols-outlined absolute -top-3 -left-2 text-[#ff9933] text-3xl opacity-60">
                  format_quote
                </span>
                "हमारा मिशन यह सुनिश्चित करना है कि छठ पूजा की प्राचीन परंपरा हमारे क्षेत्र में आने वाली पीढ़ियों के लिए आशा और पवित्रता की मशाल बनी रहे।"
                <div className="mt-3 font-semibold text-[#1a1c1e] not-italic text-xs">
                  — अध्यक्ष का संदेश
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 space-y-8">
              {/* Core Leaders */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#887364] border-b border-[#dbc2b0]/30 pb-2">
                  मुख्य नेतृत्व (Core Leadership)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {coreLeaders.map((m, idx) => (
                    <div key={idx} className="group p-5 bg-white rounded-2xl shadow-sm border border-[#dbc2b0]/25 hover:shadow-md hover:border-[#8f4e00]/40 transition-all duration-300 flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-[#ff9933]/30 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="space-y-2 text-center sm:text-left flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-1.5">
                          <h5 className="font-serif font-bold text-base text-[#8f4e00] group-hover:text-[#b6171e] transition-colors duration-200">{m.name}</h5>
                          <span className="text-[11px] font-semibold text-[#b6171e] px-2.5 py-0.5 rounded-full bg-[#ffdad6]">{m.role}</span>
                        </div>
                        <p className="text-xs text-[#554336] leading-relaxed pt-1.5 border-t border-[#dbc2b0]/20">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Executive Team */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#887364] border-b border-[#dbc2b0]/30 pb-2">
                  समिति के अन्य प्रमुख पदाधिकारी (Executive Officers)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {executiveMembers.map((m, idx) => (
                    <div key={idx} className="group p-4 bg-white rounded-2xl shadow-sm border border-[#dbc2b0]/25 hover:shadow-md hover:border-[#8f4e00]/40 transition-all duration-300 flex flex-col sm:flex-row gap-3.5 items-center sm:items-start">
                      <img
                        src={m.image}
                        alt={m.name}
                        className="w-16 h-16 rounded-xl object-cover border-2 border-[#ff9933]/30 shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform"
                      />
                      <div className="space-y-1.5 text-center sm:text-left flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-1">
                          <h5 className="font-serif font-bold text-xs md:text-sm text-[#8f4e00] group-hover:text-[#b6171e] transition-colors duration-200">{m.name}</h5>
                          <span className="text-[10px] font-semibold text-[#705d00] px-2 py-0.5 rounded-full bg-[#ffe16d]/30">{m.role}</span>
                        </div>
                        <p className="text-[11px] text-[#554336] leading-relaxed pt-1 border-t border-[#dbc2b0]/15">{m.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
