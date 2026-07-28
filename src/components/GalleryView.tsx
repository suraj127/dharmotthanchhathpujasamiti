import React, { useState, useRef } from 'react';

interface GalleryViewProps {
  onOpenPhotoUploadModal?: () => void;
  communityPhotos?: Array<{
    id: string;
    url: string;
    title: string;
    uploader: string;
    date: string;
    likes: number;
  }>;
}

interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  category: 'puja' | 'ghat' | 'community';
  categoryLabel: string;
}

export const GalleryView: React.FC<GalleryViewProps> = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<'all' | 'puja' | 'ghat' | 'community'>('all');
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const thumbnailRibbonRef = useRef<HTMLDivElement>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: '1',
      title: 'पवित्र सरोवर एवं अर्घ्य समर्पण',
      subtitle: 'छठ पूजा के पावन पर्व पर सरोवर के जल में अस्ताचलगामी सूर्यदेव को अर्घ्य अर्पित करते श्रद्धालु।',
      url: '/gallery/chhath-1.jpeg',
      category: 'puja',
      categoryLabel: 'अर्घ्य व पूजा',
    },
    {
      id: '2',
      title: 'संध्या अर्घ्य अनुष्ठान',
      subtitle: 'अस्ताचलगामी सूर्यदेव को प्रथम अर्घ्य समर्पित करने के अद्भुत एवं पावन क्षण।',
      url: '/gallery/chhath-2.jpeg',
      category: 'puja',
      categoryLabel: 'अर्घ्य व पूजा',
    },
    {
      id: '3',
      title: 'सजा हुआ भव्य पूजा घाट',
      subtitle: 'दीपों, पुष्पों और तोरण द्वारों से सुसज्जित सोम बाज़ार नन्हे पार्क छठ घाट।',
      url: '/gallery/chhath-3.jpeg',
      category: 'ghat',
      categoryLabel: 'घाट व्यवस्था',
    },
    {
      id: '4',
      title: 'व्रतियों की अटूट श्रद्धा',
      subtitle: 'छठी मैया के पारंपरिक गीतों एवं भक्तिमय वातावरण में लीन श्रद्धालुजन।',
      url: '/gallery/chhath-4.jpeg',
      category: 'community',
      categoryLabel: 'सामुदायिक एकता',
    },
    {
      id: '5',
      title: 'आस्था एवं भक्ति का दृश्य',
      subtitle: 'सामूहिक पूजा अर्चना करते हुए समिति के सदस्य एवं श्रद्धालु परिवार।',
      url: '/gallery/chhath-5.jpeg',
      category: 'puja',
      categoryLabel: 'अर्घ्य व पूजा',
    },
    {
      id: '6',
      title: 'सूर्योदय अर्घ्य एवं पारण',
      subtitle: 'उदीयमान सूर्यदेव को प्रातःकालीन अर्घ्य देकर 36 घंटे का निर्जला व्रत पूर्ण करने का पवित्र पल।',
      url: '/gallery/chhath-6.jpeg',
      category: 'puja',
      categoryLabel: 'अर्घ्य व पूजा',
    },
    {
      id: '7',
      title: 'छठ महापर्व समिति व्यवस्था',
      subtitle: 'घाट निर्माण, जल व्यवस्था एवं सुरक्षा संचालन में दिन-रात लगे समर्पित कार्यकर्ता।',
      url: '/gallery/chhath-7.jpeg',
      category: 'ghat',
      categoryLabel: 'घाट व्यवस्था',
    },
    {
      id: '8',
      title: 'घाट पर श्रद्धालुओं की उपस्थिति',
      subtitle: 'सोम बाज़ार नन्हे पार्क में सामूहिक भक्ति एवं सामाजिक सद्भाव का अनुपम संगम।',
      url: '/gallery/chhath-8.jpeg',
      category: 'community',
      categoryLabel: 'सामुदायिक एकता',
    },
    {
      id: '9',
      title: 'अर्घ्य सामग्री एवं पवित्र दउरा',
      subtitle: 'ठेकुआ, केला, गन्ने एवं ताज़े फलों से सुसज्जित पवित्र सूप एवं दउरा।',
      url: '/gallery/chhath-9.jpeg',
      category: 'puja',
      categoryLabel: 'अर्घ्य व पूजा',
    },
    {
      id: '10',
      title: 'छठी मैया की विशेष पूजा',
      subtitle: 'गंगाजल, कच्चे दूध एवं सुगंधित धूप की महक से सराबोर घाट परिसर।',
      url: '/gallery/chhath-10.jpeg',
      category: 'puja',
      categoryLabel: 'अर्घ्य व पूजा',
    },
    {
      id: '11',
      title: 'समिति सेवादार एवं सुरक्षा दल',
      subtitle: 'हर व्रती एवं श्रद्धालु की सुविधा व सुरक्षा हेतु मुस्तैद सेवादार टीम।',
      url: '/gallery/chhath-11.jpeg',
      category: 'ghat',
      categoryLabel: 'घाट व्यवस्था',
    },
    {
      id: '12',
      title: 'घाट पर दीपदान एवं महाआरती',
      subtitle: 'संध्या समय जल की धाराओं में तैरते और जगमगाते असंख्य मिट्टी के दीप।',
      url: '/gallery/chhath-12.jpeg',
      category: 'puja',
      categoryLabel: 'अर्घ्य व पूजा',
    },
    {
      id: '13',
      title: 'सांस्कृतिक एवं धार्मिक कार्यक्रम',
      subtitle: 'लोक गायकों द्वारा छठ मैया के पारंपरिक भजनों की सुमधुर संगीतमय प्रस्तुति।',
      url: '/gallery/chhath-13.jpeg',
      category: 'community',
      categoryLabel: 'सामुदायिक एकता',
    },
    {
      id: '14',
      title: 'घाट परिसर का मनोरम दृश्य',
      subtitle: 'पूर्ण स्वच्छता, प्रकाश व्यवस्था एवं वैदिक गरिमा के साथ तैयार किया गया मुख्य घाट।',
      url: '/gallery/chhath-14.jpeg',
      category: 'ghat',
      categoryLabel: 'घाट व्यवस्था',
    },
    {
      id: '15',
      title: 'महाप्रसाद वितरण व्यवस्था',
      subtitle: 'प्रातःकालीन अर्घ्य समाप्ति के पश्चात् सभी उपस्थित श्रद्धालुओं में ठेकुआ प्रसाद का वितरण।',
      url: '/gallery/chhath-15.jpeg',
      category: 'community',
      categoryLabel: 'सामुदायिक एकता',
    },
    {
      id: '16',
      title: 'महापर्व की अमर स्मृतियां',
      subtitle: 'धर्मोत्थान छठ पूजा समिति के वार्षिकोत्सव की अविस्मरणीय और पावन स्मृतियां।',
      url: '/gallery/chhath-16.jpeg',
      category: 'community',
      categoryLabel: 'सामुदायिक एकता',
    },
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  // Safely clamp slide index if category changes
  const activeSlideIndex = Math.min(currentSlideIndex, filteredItems.length - 1);
  const activeItem = filteredItems[activeSlideIndex] || filteredItems[0];

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  const handleThumbnailClick = (idx: number) => {
    setCurrentSlideIndex(idx);
    if (thumbnailRibbonRef.current) {
      const activeThumb = thumbnailRibbonRef.current.children[idx] as HTMLElement;
      if (activeThumb) {
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* 1. Hero Header */}
      <section className="relative min-h-[380px] flex items-center justify-center overflow-hidden rounded-3xl md:rounded-[40px] shadow-2xl mx-3 md:mx-10 mt-3 border border-[#dbc2b0]/30 text-center">
        <div className="absolute inset-0 z-0">
          <img
            alt="गैलरी"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzHr0OnoYCm7RHe-7OfssrYjZQoSpr_4-UXb6OOLY1wk6QZDdUnfChA8-P-4UppLzjUpHYSRFD0Bimns5c6KucBT0tcAF5UUMlbx9dLIza_dS7Ac7ZjPHg_L5cstBT1pPOpA22uKeXzkWQzu4YglGPoAKlwX1KN_HmVyqf9Q9DXrjkkcU-KttWGPwAsAdlhpVC5SoCeDSE2eZnR7lTo08cOBNPVzOokSDGBIG2k-GUgtCt2UDrhcsNeIwVmZy2uCJzSU_ywHaEHjE=s1600"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#2e1500]/90"></div>
        </div>

        <div className="relative z-10 px-6 max-w-3xl space-y-4 py-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ff9933]/30 backdrop-blur-md text-amber-100 border border-[#ff9933]/50 rounded-full text-xs font-semibold">
            <span className="material-symbols-outlined text-sm text-amber-300">collections</span>
            <span>पवित्र चित्र संग्रह</span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white drop-shadow-md leading-tight">
            छठ पूजा चित्र दीर्घा
          </h1>

          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क में छठ पूजा महापर्व के पावन क्षणों और भक्तिमय माहौल की पावन स्मृतियां।
          </p>
        </div>
      </section>

      {/* 2. Category Filter Pills */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dbc2b0]/30 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => { setActiveCategory('all'); setCurrentSlideIndex(0); }}
              className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'saffron-gradient text-white shadow-md'
                  : 'bg-[#f4f4f6] text-[#554336] hover:bg-[#e8e8eb]'
              }`}
            >
              सभी चित्र ({galleryItems.length})
            </button>
            <button
              onClick={() => { setActiveCategory('puja'); setCurrentSlideIndex(0); }}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'puja'
                  ? 'saffron-gradient text-white shadow-md'
                  : 'bg-[#f4f4f6] text-[#554336] hover:bg-[#e8e8eb]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">wb_sunny</span>
              <span>अर्घ्य व पूजा</span>
            </button>
            <button
              onClick={() => { setActiveCategory('ghat'); setCurrentSlideIndex(0); }}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'ghat'
                  ? 'saffron-gradient text-white shadow-md'
                  : 'bg-[#f4f4f6] text-[#554336] hover:bg-[#e8e8eb]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">water</span>
              <span>घाट व्यवस्था</span>
            </button>
            <button
              onClick={() => { setActiveCategory('community'); setCurrentSlideIndex(0); }}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'community'
                  ? 'saffron-gradient text-white shadow-md'
                  : 'bg-[#f4f4f6] text-[#554336] hover:bg-[#e8e8eb]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">groups</span>
              <span>सामुदायिक एकता</span>
            </button>
          </div>

          <div className="text-xs text-[#887364] font-semibold flex items-center gap-1">
            <span className="material-symbols-outlined text-sm text-[#ff9933]">swipe</span>
            <span>स्लाइडर प्रस्तुति ({activeSlideIndex + 1} / {filteredItems.length})</span>
          </div>
        </div>
      </section>

      {/* 3. MAIN PURE SLIDER / CAROUSEL DECK (JUST SLIDE) */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 space-y-6">
        <div className="relative bg-white rounded-3xl md:rounded-[36px] overflow-hidden border border-[#dbc2b0]/35 shadow-2xl flex flex-col lg:flex-row min-h-[480px] md:min-h-[540px]">
          
          {/* Main Slide Photo Frame (Left 65% on Desktop) */}
          <div
            onClick={() => setIsLightboxOpen(true)}
            className="lg:w-2/3 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-black cursor-pointer group"
          >
            <img
              key={activeItem.id}
              src={activeItem.url}
              alt={activeItem.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 animate-in fade-in"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Left Arrow Navigation Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handlePrevSlide(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border border-white/30 text-white flex items-center justify-center shadow-2xl hover:bg-[#ff9933] hover:border-[#ff9933] transition-all cursor-pointer hover:scale-110 active:scale-95"
              title="पिछला स्लाइड (Previous Slide)"
            >
              <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>

            {/* Right Arrow Navigation Button */}
            <button
              onClick={(e) => { e.stopPropagation(); handleNextSlide(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/60 border border-white/30 text-white flex items-center justify-center shadow-2xl hover:bg-[#ff9933] hover:border-[#ff9933] transition-all cursor-pointer hover:scale-110 active:scale-95"
              title="अगला स्लाइड (Next Slide)"
            >
              <span className="material-symbols-outlined text-2xl">chevron_right</span>
            </button>

            {/* Category Tag & Slide Counter Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
              <span className="px-3.5 py-1 bg-black/60 backdrop-blur-md border border-amber-300/40 text-amber-200 text-xs font-bold rounded-full shadow-lg">
                {activeItem.categoryLabel}
              </span>
              <span className="px-3 py-1 bg-[#b6171e] text-white text-xs font-extrabold rounded-full shadow-lg">
                #{String(activeSlideIndex + 1).padStart(2, '0')} / {String(filteredItems.length).padStart(2, '0')}
              </span>
            </div>

            {/* Fullscreen Zoom Hint */}
            <div className="absolute bottom-4 left-4 z-10 opacity-80 group-hover:opacity-100 transition-opacity">
              <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-xs font-semibold rounded-full flex items-center gap-1.5 border border-white/20">
                <span className="material-symbols-outlined text-sm">zoom_in</span>
                <span>पूर्ण चित्र देखें</span>
              </span>
            </div>
          </div>

          {/* Active Slide Info Content Panel (Right 35% on Desktop) */}
          <div className="lg:w-1/3 p-6 md:p-8 bg-gradient-to-br from-[#2e1500] via-[#241000] to-[#170900] text-white flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-amber-300/80 font-bold border-b border-amber-500/20 pb-3">
                <span>स्लाइड {activeSlideIndex + 1}</span>
                <span>सोम बाज़ार, नन्हे पार्क घाट</span>
              </div>

              <h2 className="font-serif text-2xl md:text-3xl font-bold text-amber-100 leading-snug">
                {activeItem.title}
              </h2>

              <div className="h-[2px] w-16 bg-[#ff9933] rounded-full"></div>

              <p className="text-amber-100/85 text-xs md:text-sm leading-relaxed">
                {activeItem.subtitle}
              </p>
            </div>

            {/* Slide Navigation Buttons */}
            <div className="pt-6 border-t border-amber-500/20 space-y-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevSlide}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 border border-amber-300/20 rounded-xl text-xs font-bold text-amber-100 flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  <span>पिछला</span>
                </button>
                <button
                  onClick={handleNextSlide}
                  className="flex-1 py-3 saffron-gradient text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg hover:scale-102 transition-all cursor-pointer active:scale-95"
                >
                  <span>अगला</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>

              <button
                onClick={() => setIsLightboxOpen(true)}
                className="w-full py-2.5 bg-amber-400/15 hover:bg-amber-400/25 border border-amber-400/40 text-amber-300 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">fullscreen</span>
                <span>फुल स्क्रीन में देखें</span>
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Slider Thumbnail Ribbon */}
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between text-xs font-semibold text-[#8f4e00]">
            <span>थंबनेल रील (Click to Jump Slide):</span>
            <span>{filteredItems.length} चित्र उपलब्ध</span>
          </div>

          <div
            ref={thumbnailRibbonRef}
            className="flex gap-3 overflow-x-auto scrollbar-none py-2 px-1 snap-x snap-mandatory scroll-smooth"
          >
            {filteredItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => handleThumbnailClick(idx)}
                className={`flex-shrink-0 relative w-24 h-16 sm:w-32 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 cursor-pointer snap-start ${
                  idx === activeSlideIndex
                    ? 'border-[#ff9933] ring-4 ring-[#ff9933]/30 scale-105 shadow-lg'
                    : 'border-transparent opacity-60 hover:opacity-100 hover:scale-102'
                }`}
              >
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <div className="absolute top-1 left-1 bg-black/70 text-amber-200 text-[10px] font-bold px-1.5 py-0.5 rounded">
                  #{idx + 1}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FULL-SCREEN LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div
          onClick={() => setIsLightboxOpen(false)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#1c0d02] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-4 right-4 z-40 w-11 h-11 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
              title="बंद करें (Close)"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>

            {/* Left Arrow Button */}
            <button
              onClick={handlePrevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/70 border border-amber-300/30 text-amber-200 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all cursor-pointer shadow-2xl"
              title="पिछला फोटो (Previous)"
            >
              <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>

            {/* Right Arrow Button */}
            <button
              onClick={handleNextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-black/70 border border-amber-300/30 text-amber-200 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all cursor-pointer shadow-2xl"
              title="अगली फोटो (Next)"
            >
              <span className="material-symbols-outlined text-2xl">chevron_right</span>
            </button>

            {/* Photo Preview Container */}
            <div className="md:w-2/3 bg-black flex items-center justify-center p-4 min-h-[320px] md:min-h-[500px]">
              <img
                src={activeItem.url}
                alt={activeItem.title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl drop-shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Photo Info Side Panel */}
            <div className="md:w-1/3 p-6 md:p-8 space-y-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-amber-500/20 bg-gradient-to-b from-[#281303] to-[#120701] text-white">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold rounded-full">
                    {activeItem.categoryLabel}
                  </span>
                  <span className="text-amber-200/70 text-xs font-bold">
                    {activeSlideIndex + 1} / {filteredItems.length}
                  </span>
                </div>

                <h3 className="font-serif text-xl md:text-2xl font-bold text-amber-100 leading-snug">
                  {activeItem.title}
                </h3>

                <div className="h-[2px] w-12 bg-amber-400"></div>

                <p className="text-amber-100/80 text-xs md:text-sm leading-relaxed">
                  {activeItem.subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-amber-500/20 space-y-3">
                <div className="flex justify-between text-xs text-amber-200/60">
                  <span>स्थान: ई-ब्लॉक सोम बाज़ार</span>
                  <span>धर्मोत्थान छठ 2026</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevSlide}
                    className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs text-amber-200 font-semibold transition-colors cursor-pointer"
                  >
                    ◄ पिछला
                  </button>
                  <button
                    onClick={handleNextSlide}
                    className="flex-1 py-2.5 bg-amber-500 text-black hover:bg-amber-400 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    अगला ►
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
