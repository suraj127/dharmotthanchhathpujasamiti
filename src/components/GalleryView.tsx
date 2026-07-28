import React, { useState } from 'react';

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

export const GalleryView: React.FC<GalleryViewProps> = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

      {/* 2. Gallery Grid */}
      <section className="max-w-[1280px] mx-auto px-6 md:px-12 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ff9933]/15 text-[#8f4e00] text-xs font-bold border border-[#ff9933]/30">
            <span className="material-symbols-outlined text-sm">photo_library</span>
            <span>आधिकारिक चित्र संग्रह</span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#8f4e00]">
            आधिकारिक समिति संग्रह <span className="text-xl md:text-2xl font-sans font-normal text-[#554336] opacity-80">(Samiti Collection)</span>
          </h2>
          <div className="h-1 w-24 bg-[#8f4e00] mx-auto rounded-full mt-2"></div>
        </div>

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
