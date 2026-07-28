import React, { useState } from 'react';

interface GalleryViewProps {
  onOpenPhotoUploadModal: () => void;
  communityPhotos: Array<{
    id: string;
    url: string;
    title: string;
    uploader: string;
    date: string;
    likes: number;
  }>;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  onOpenPhotoUploadModal,
  communityPhotos,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'community'>('all');
  const [likesCount, setLikesCount] = useState<Record<string, number>>({});

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikesCount((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const galleryItems = [
    {
      id: '1',
      title: 'पवित्र सरोवर एवं अर्घ्य समर्पण',
      subtitle: 'छठ पूजा के पावन पर्व पर सरोवर के जल में अर्घ्य अर्पित करते श्रद्धालु।',
      url: '/gallery/chhath-1.jpeg',
      span: 'md:col-span-8',
    },
    {
      id: '2',
      title: 'संध्या अर्घ्य अनुष्ठान',
      subtitle: 'अस्ताचलगामी सूर्यदेव को प्रथम अर्घ्य समर्पित करने के अद्भुत क्षण।',
      url: '/gallery/chhath-2.jpeg',
      span: 'md:col-span-4',
    },
    {
      id: '3',
      title: 'सजा हुआ भव्य पूजा घाट',
      subtitle: 'दीपों, पुष्पों और तोरण द्वारों से सुसज्जित सोम बाज़ार छठ घाट।',
      url: '/gallery/chhath-3.jpeg',
      span: 'md:col-span-4',
    },
    {
      id: '4',
      title: 'व्रतियों की अटूट श्रद्धा',
      subtitle: 'छठी मैया के गीतों एवं भक्तिमय वातावरण में लीन श्रद्धालुजन।',
      url: '/gallery/chhath-4.jpeg',
      span: 'md:col-span-4',
    },
    {
      id: '5',
      title: 'आस्था एवं भक्ति का दृश्य',
      subtitle: 'पूजा अर्चना करते हुए समिति के सदस्य एवं श्रद्धालु परिवार।',
      url: '/gallery/chhath-5.jpeg',
      span: 'md:col-span-4',
    },
    {
      id: '6',
      title: 'सूर्योदय अर्घ्य एवं पारण',
      subtitle: 'उदीयमान सूर्यदेव को अर्घ्य देकर व्रत पूर्ण करने का पावन पल।',
      url: '/gallery/chhath-6.jpeg',
      span: 'md:col-span-8',
    },
    {
      id: '7',
      title: 'छठ महापर्व समिति व्यवस्था',
      subtitle: 'घाट निर्माण एवं व्यवस्था संचालन में लगे समर्पित कार्यकर्ता।',
      url: '/gallery/chhath-7.jpeg',
      span: 'md:col-span-6',
    },
    {
      id: '8',
      title: 'घाट पर श्रद्धालुओं की उपस्थिति',
      subtitle: 'सामूहिक भक्ति एवं सांस्कृतिक एकता का अनुपम संगम।',
      url: '/gallery/chhath-8.jpeg',
      span: 'md:col-span-6',
    },
    {
      id: '9',
      title: 'अर्घ्य सामग्री एवं दउरा',
      subtitle: 'ठेकुआ, फल और गन्ने से सजे पवित्र सूप एवं दउरा।',
      url: '/gallery/chhath-9.jpeg',
      span: 'md:col-span-4',
    },
    {
      id: '10',
      title: 'छठी मैया की विशेष पूजा',
      subtitle: 'गंगाजल और धूप की सुगंध से सुवासित पावन वातावरण।',
      url: '/gallery/chhath-10.jpeg',
      span: 'md:col-span-4',
    },
    {
      id: '11',
      title: 'समिति सेवादार एवं सुरक्षा',
      subtitle: 'श्रद्धालुओं की सुविधा हेतु दिन-रात तत्पर सेवादार टीम।',
      url: '/gallery/chhath-11.jpeg',
      span: 'md:col-span-4',
    },
    {
      id: '12',
      title: 'घाट पर दीपदान एवं आरती',
      subtitle: 'संध्या समय जल में तैरते असंख्य प्रज्वलित दीप।',
      url: '/gallery/chhath-12.jpeg',
      span: 'md:col-span-8',
    },
    {
      id: '13',
      title: 'सांस्कृतिक एवं धार्मिक कार्यक्रम',
      subtitle: 'छठ गीतों की सुमधुर प्रस्तुति और सामूहिक वंदना।',
      url: '/gallery/chhath-13.jpeg',
      span: 'md:col-span-4',
    },
    {
      id: '14',
      title: 'घाट परिसर का मनोरम दृश्य',
      subtitle: 'स्वच्छता एवं पवित्रता के साथ तैयार किया गया पूजा स्थल।',
      url: '/gallery/chhath-14.jpeg',
      span: 'md:col-span-4',
    },
    {
      id: '15',
      title: 'प्रसाद वितरण व्यवस्था',
      subtitle: 'अर्घ्य समाप्ति पश्चात् सभी श्रद्धालुओं में प्रसाद वितरण।',
      url: '/gallery/chhath-15.jpeg',
      span: 'md:col-span-4',
    },
    {
      id: '16',
      title: 'महापर्व की अमर स्मृतियां',
      subtitle: 'धर्मोत्थान छठ पूजा समिति 2026 के अविस्मरणीय क्षण।',
      url: '/gallery/chhath-16.jpeg',
      span: 'md:col-span-4',
    },
  ];

  return (
    <div className="space-y-16 animate-in fade-in duration-300">
      {/* 1. Hero Section */}
      <section className="relative min-h-[450px] flex items-center justify-center overflow-hidden rounded-3xl md:rounded-[40px] shadow-xl mx-3 md:mx-10 mt-3 border border-[#dbc2b0]/30 text-center">
        <div className="absolute inset-0 z-0">
          <img
            alt="गैलरी"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBzHr0OnoYCm7RHe-7OfssrYjZQoSpr_4-UXb6OOLY1wk6QZDdUnfChA8-P-4UppLzjUpHYSRFD0Bimns5c6KucBT0tcAF5UUMlbx9dLIza_dS7Ac7ZjPHg_L5cstBT1pPOpA22uKeXzkWQzu4YglGPoAKlwX1KN_HmVyqf9Q9DXrjkkcU-KttWGPwAsAdlhpVC5SoCeDSE2eZnR7lTo08cOBNPVzOokSDGBIG2k-GUgtCt2UDrhcsNeIwVmZy2uCJzSU_ywHaEHjE=s1600"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#f9f9fc]"></div>
        </div>

        <div className="relative z-10 px-6 max-w-3xl space-y-4">
          <span className="inline-block px-4 py-1 bg-[#ff9933]/20 text-amber-200 border border-amber-300/30 rounded-full text-xs font-semibold">
            पवित्र स्मृतियां
          </span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white text-glow leading-tight">
            भक्ति का प्रकाश
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            आस्था, समुदाय और हमारी पवित्र नदियों के तट पर सूर्य देव की उपासना की शाश्वत परंपरा के गहरे क्षणों को संजोते हुए।
          </p>

          <div className="flex justify-center pt-2">
            <span className="material-symbols-outlined text-[#ffe16d] text-3xl">light_mode</span>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-[1280px] mx-auto px-6 flex justify-center gap-4">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all ${
            activeTab === 'all'
              ? 'saffron-gradient text-white shadow-md'
              : 'bg-[#e8e8ea] text-[#554336] hover:bg-slate-200'
          }`}
        >
          समिति संग्रह
        </button>
        <button
          onClick={() => setActiveTab('community')}
          className={`px-6 py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'community'
              ? 'saffron-gradient text-white shadow-md'
              : 'bg-[#e8e8ea] text-[#554336] hover:bg-slate-200'
          }`}
        >
          <span className="material-symbols-outlined text-sm">groups</span>
          <span>श्रद्धालुओं के चित्र ({communityPhotos.length})</span>
        </button>
      </div>

      {/* 2. Gallery Grid */}
      {activeTab === 'all' ? (
        <section className="max-w-[1280px] mx-auto px-6 md:px-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item.url)}
                className={`${item.span} group bg-white rounded-2xl overflow-hidden shadow-md border border-[#dbc2b0]/30 cursor-pointer hover:shadow-xl transition-all duration-300`}
              >
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white text-xs font-semibold flex items-center gap-1 bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
                      <span className="material-symbols-outlined text-sm">zoom_in</span>
                      बड़ा देखें
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#8f4e00]">{item.title}</h3>
                  <p className="text-[#554336] text-xs leading-relaxed">{item.subtitle}</p>
                </div>
              </div>
            ))}

            {/* Banner stat card */}
            <div className="md:col-span-12 saffron-gradient p-8 md:p-10 rounded-3xl text-center text-white solar-glow flex flex-col items-center justify-center space-y-2">
              <span className="material-symbols-outlined text-5xl">groups</span>
              <h3 className="font-serif text-3xl font-bold">500+ श्रद्धालु</h3>
              <p className="text-white/90 text-sm">2024 में ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क घाट पर एक परिवार के रूप में एकजुट हुए।</p>
            </div>
          </div>
        </section>
      ) : (
        /* Community Photos View */
        <section className="max-w-[1280px] mx-auto px-6 md:px-12">
          {communityPhotos.length === 0 ? (
            <div className="text-center py-12 bg-[#f3f3f6] rounded-3xl p-8 space-y-4">
              <span className="material-symbols-outlined text-5xl text-[#8f4e00]">add_a_photo</span>
              <p className="text-[#554336] text-sm">अभी तक श्रद्धालुओं द्वारा कोई तस्वीर साझा नहीं की गई है। प्रथम बनें!</p>
              <button
                onClick={onOpenPhotoUploadModal}
                className="px-6 py-3 saffron-gradient text-white rounded-xl text-xs font-semibold"
              >
                तस्वीर अपलोड करें
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {communityPhotos.map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setSelectedImage(photo.url)}
                  className="bg-white rounded-2xl overflow-hidden shadow-md border border-[#dbc2b0]/30 cursor-pointer group"
                >
                  <div className="relative h-60">
                    <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-serif font-bold text-sm text-[#1a1c1e]">{photo.title}</h4>
                    <div className="flex justify-between items-center text-xs text-[#554336]">
                      <span>प्रेषक: {photo.uploader}</span>
                      <button
                        onClick={(e) => handleLike(photo.id, e)}
                        className="flex items-center gap-1 text-[#b6171e] hover:scale-110 transition-transform"
                      >
                        <span className="material-symbols-outlined text-base">favorite</span>
                        <span>{photo.likes + (likesCount[photo.id] || 0)}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* 3. Community contribution CTA */}
      <section className="bg-[#f3f3f6] py-16 relative">
        <div className="max-w-[1280px] mx-auto px-6 text-center space-y-6">
          <div className="inline-block saffron-gradient p-4 rounded-2xl text-white shadow-lg">
            <span className="material-symbols-outlined text-3xl">add_a_photo</span>
          </div>

          <h2 className="font-serif text-2xl md:text-4xl font-bold text-[#1a1c1e]">
            अपनी पावन यात्रा साझा करें
          </h2>

          <p className="text-[#554336] text-xs md:text-sm max-w-2xl mx-auto leading-relaxed">
            क्या आपके पास पिछली छठ पूजा का कोई विशेष क्षण कैद है? हम आपको हमारे सामुदायिक संग्रह में योगदान करने के लिए आमंत्रित करते हैं।
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onOpenPhotoUploadModal}
              className="px-8 py-3.5 saffron-gradient text-white rounded-xl font-semibold text-xs md:text-sm shadow-md hover:scale-105 transition-transform flex items-center gap-2 cursor-pointer"
            >
              <span>अपनी तस्वीरें अपलोड करें</span>
              <span className="material-symbols-outlined text-lg">upload</span>
            </button>

            <button
              onClick={() => setActiveTab('community')}
              className="px-8 py-3.5 border-2 border-[#b6171e] text-[#b6171e] rounded-xl font-semibold text-xs md:text-sm hover:bg-[#b6171e] hover:text-white transition-all cursor-pointer"
            >
              जनता के योगदान देखें
            </button>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in"
        >
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            <img src={selectedImage} alt="Expanded view" className="w-full h-full object-contain rounded-2xl" referrerPolicy="no-referrer" />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/40"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
