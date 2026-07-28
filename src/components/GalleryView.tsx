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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'puja' | 'ghat' | 'community'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'carousel'>('grid');

  const horizontalScrollRef = useRef<HTMLDivElement>(null);

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

  const scrollHorizontal = (direction: 'left' | 'right') => {
    if (!horizontalScrollRef.current) return;
    const distance = 420;
    horizontalScrollRef.current.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth',
    });
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    setSelectedIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* 1. Hero Section */}
      <section className="relative min-h-[420px] flex items-center justify-center overflow-hidden rounded-3xl md:rounded-[40px] shadow-2xl mx-3 md:mx-10 mt-3 border border-[#dbc2b0]/30 text-center">
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
            ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क में छठ पूजा महापर्व के पावन क्षणों, संध्या व प्रातःकालीन अर्घ्य और सामुदायिक एकता की स्मृतियां।
          </p>

          <div className="flex items-center justify-center gap-6 pt-2">
            <div className="flex items-center gap-2 text-amber-200 text-xs font-semibold">
              <span className="material-symbols-outlined text-base">collections</span>
              <span>16+ एचडी चित्र</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Controls & Category Tabs Toolbar */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dbc2b0]/30 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'saffron-gradient text-white shadow-md'
                  : 'bg-[#f4f4f6] text-[#554336] hover:bg-[#e8e8eb]'
              }`}
            >
              सभी चित्र ({galleryItems.length})
            </button>
            <button
              onClick={() => setActiveCategory('puja')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'puja'
                  ? 'saffron-gradient text-white shadow-md'
                  : 'bg-[#f4f4f6] text-[#554336] hover:bg-[#e8e8eb]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">wb_sunny</span>
              <span>अर्घ्य व पूजा</span>
            </button>
            <button
              onClick={() => setActiveCategory('ghat')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'ghat'
                  ? 'saffron-gradient text-white shadow-md'
                  : 'bg-[#f4f4f6] text-[#554336] hover:bg-[#e8e8eb]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">water</span>
              <span>घाट व्यवस्था</span>
            </button>
            <button
              onClick={() => setActiveCategory('community')}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === 'community'
                  ? 'saffron-gradient text-white shadow-md'
                  : 'bg-[#f4f4f6] text-[#554336] hover:bg-[#e8e8eb]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">groups</span>
              <span>सामुदायिक एकता</span>
            </button>
          </div>

          {/* Horizontal Layout Toggle */}
          <div className="flex items-center bg-[#f4f4f6] p-1 rounded-xl border border-[#dbc2b0]/20">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'grid' ? 'bg-white text-[#8f4e00] shadow-sm font-bold' : 'text-[#776356] hover:text-[#1a1c1e]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">view_agenda</span>
              <span>हॉरिजॉन्टल कार्ड्स</span>
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'carousel' ? 'bg-white text-[#8f4e00] shadow-sm font-bold' : 'text-[#776356] hover:text-[#1a1c1e]'
              }`}
            >
              <span className="material-symbols-outlined text-sm">view_carousel</span>
              <span>स्लाइडर रील</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. FEATURED HORIZONTAL SPOTLIGHT SLIDER (Horizontal Scroll Ribbon) */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff9933] animate-ping"></span>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#8f4e00]">
              मुख्य आकर्षण
            </h2>
          </div>

          {/* Navigation Arrow Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollHorizontal('left')}
              className="w-9 h-9 rounded-full bg-white border border-[#dbc2b0]/40 text-[#8f4e00] flex items-center justify-center shadow-sm hover:bg-[#8f4e00] hover:text-white transition-all cursor-pointer"
              title="पिछला (Previous)"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
            </button>
            <button
              onClick={() => scrollHorizontal('right')}
              className="w-9 h-9 rounded-full bg-white border border-[#dbc2b0]/40 text-[#8f4e00] flex items-center justify-center shadow-sm hover:bg-[#8f4e00] hover:text-white transition-all cursor-pointer"
              title="अगला (Next)"
            >
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* Horizontal Continuous Ribbon */}
        <div
          ref={horizontalScrollRef}
          className="flex gap-5 overflow-x-auto scrollbar-none py-2 snap-x snap-mandatory scroll-smooth"
        >
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setSelectedIndex(idx)}
              className="flex-shrink-0 w-80 sm:w-96 snap-start bg-white rounded-3xl overflow-hidden border border-[#dbc2b0]/35 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div className="relative h-52 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Category Badge & Index Pill */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-amber-300/40 text-amber-200 text-[11px] font-bold rounded-full">
                    {item.categoryLabel}
                  </span>
                  <span className="px-2.5 py-0.5 bg-amber-400 text-black text-xs font-extrabold rounded-full shadow-md">
                    #{String(idx + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Bottom Overlay Title */}
                <div className="absolute bottom-3 left-3 right-3 z-10">
                  <h3 className="text-white font-serif font-bold text-base drop-shadow-md group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-b from-white to-[#fffcf7] space-y-3">
                <p className="text-[#554336] text-xs leading-relaxed line-clamp-2">
                  {item.subtitle}
                </p>
                <div className="flex items-center justify-between text-xs font-semibold text-[#8f4e00] pt-2 border-t border-[#dbc2b0]/20">
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>बड़ा देखें (Full View)</span>
                    <span className="material-symbols-outlined text-sm">open_in_full</span>
                  </span>
                  <span className="text-[10px] text-[#887364]">सोम बाज़ार घाट</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MAIN HORIZONTAL LANDSCAPE CARDS GRID */}
      {viewMode === 'grid' ? (
        <section className="max-w-[1280px] mx-auto px-6 md:px-12 space-y-6">
          <div className="border-b border-[#dbc2b0]/30 pb-3 flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-[#1a1c1e]">
              चित्र संग्रह ({filteredItems.length})
            </h3>
            <span className="text-xs text-[#887364] font-medium">स्मृति दीर्घा</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setSelectedIndex(idx)}
                className="group bg-white rounded-3xl overflow-hidden shadow-md border border-[#dbc2b0]/30 cursor-pointer hover:shadow-xl hover:border-[#8f4e00]/40 transition-all duration-300 flex flex-col sm:flex-row h-full"
              >
                {/* Horizontal Left Photo Container (Fixed aspect landscape) */}
                <div className="sm:w-5/12 relative h-56 sm:h-auto overflow-hidden flex-shrink-0">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-white text-[11px] font-semibold flex items-center gap-1 bg-black/50 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      <span className="material-symbols-outlined text-xs">zoom_in</span>
                      ज़ूम करें
                    </span>
                  </div>
                  {/* Photo Index Tag */}
                  <div className="absolute top-3 left-3 bg-[#b6171e] text-white px-2.5 py-0.5 rounded-lg text-[11px] font-bold shadow-md">
                    #{String(idx + 1).padStart(2, '0')}
                  </div>
                </div>

                {/* Horizontal Right Info Content */}
                <div className="sm:w-7/12 p-6 flex flex-col justify-between space-y-3 bg-gradient-to-br from-white via-white to-[#fffaf4]">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 bg-[#ff9933]/15 border border-[#ff9933]/30 text-[#8f4e00] text-[10px] font-bold rounded-full">
                        {item.categoryLabel}
                      </span>
                      <span className="text-[10px] font-semibold text-[#887364] flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">location_on</span>
                        नन्हे पार्क
                      </span>
                    </div>

                    <h4 className="font-serif text-lg font-bold text-[#8f4e00] group-hover:text-[#b6171e] transition-colors leading-snug">
                      {item.title}
                    </h4>

                    <p className="text-[#554336] text-xs leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#dbc2b0]/20 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-[#8f4e00] flex items-center gap-1">
                      <span>विस्तृत देखें</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </span>
                    <span className="text-[10px] text-gray-400">धर्मोत्थान छठ 2026</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        /* Alternate Horizontal Carousel Slide Track */
        <section className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="bg-[#2e1500] rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-amber-300 text-xs uppercase tracking-widest font-bold">स्लाइडर रील व्यू</span>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-amber-100 mt-1">
                  चित्र संग्रह
                </h3>
              </div>
              <span className="text-xs bg-amber-400 text-black font-bold px-3 py-1 rounded-full">
                16 Photos
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {filteredItems.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedIndex(idx)}
                  className="group bg-black/40 border border-amber-300/20 rounded-2xl overflow-hidden cursor-pointer hover:border-amber-400 transition-all p-2 space-y-2"
                >
                  <div className="relative h-40 rounded-xl overflow-hidden">
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    <div className="absolute top-2 left-2 bg-black/60 text-amber-200 px-2 py-0.5 rounded text-[10px] font-bold">
                      #{idx + 1}
                    </div>
                  </div>
                  <h5 className="font-serif text-xs font-bold text-amber-100 truncate">{item.title}</h5>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. LIGHTBOX FULL-SCREEN HORIZONTAL VIEWER */}
      {selectedIndex !== null && filteredItems[selectedIndex] && (
        <div
          onClick={() => setSelectedIndex(null)}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-lg flex items-center justify-center p-4 animate-in fade-in duration-200"
        >
          {/* Main Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#1a0f05] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer"
              title="बंद करें (Close)"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {/* Left/Previous Arrow */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 border border-amber-300/30 text-amber-200 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all cursor-pointer shadow-xl"
              title="पिछली फोटो (Previous)"
            >
              <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>

            {/* Right/Next Arrow */}
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/60 border border-amber-300/30 text-amber-200 flex items-center justify-center hover:bg-amber-500 hover:text-black transition-all cursor-pointer shadow-xl"
              title="अगली फोटो (Next)"
            >
              <span className="material-symbols-outlined text-2xl">chevron_right</span>
            </button>

            {/* Full HD Photo Display Area */}
            <div className="md:w-2/3 bg-black/80 flex items-center justify-center p-4 relative min-h-[300px] md:min-h-[500px]">
              <img
                src={filteredItems[selectedIndex].url}
                alt={filteredItems[selectedIndex].title}
                className="max-w-full max-h-[70vh] md:max-h-[80vh] object-contain rounded-xl drop-shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right Details Panel */}
            <div className="md:w-1/3 p-6 md:p-8 space-y-6 flex flex-col justify-between border-t md:border-t-0 md:border-l border-amber-500/20 bg-gradient-to-b from-[#241306] to-[#140a03]">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-bold rounded-full">
                    {filteredItems[selectedIndex].categoryLabel}
                  </span>
                  <span className="text-amber-200/70 text-xs font-bold">
                    {selectedIndex + 1} / {filteredItems.length}
                  </span>
                </div>

                <h3 className="font-serif text-xl md:text-2xl font-bold text-amber-100 leading-snug">
                  {filteredItems[selectedIndex].title}
                </h3>

                <div className="h-[1px] w-16 bg-amber-400/40"></div>

                <p className="text-amber-100/80 text-xs md:text-sm leading-relaxed">
                  {filteredItems[selectedIndex].subtitle}
                </p>
              </div>

              <div className="pt-4 border-t border-amber-500/20 space-y-3">
                <div className="flex items-center justify-between text-xs text-amber-200/60">
                  <span>स्थान: ई-ब्लॉक सोम बाज़ार</span>
                  <span>धर्मोत्थान छठ पूजा</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevImage}
                    className="flex-1 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs text-amber-200 font-semibold transition-colors cursor-pointer"
                  >
                    ◄ पिछला
                  </button>
                  <button
                    onClick={handleNextImage}
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
