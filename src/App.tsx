import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { AboutView } from './components/AboutView';
import { Chhath2026View } from './components/Chhath2026View';
import { GalleryView } from './components/GalleryView';
import { LoadingScreen } from './components/LoadingScreen';
import {
  VolunteerModal,
  ContactModal,
  EventGuideModal,
  MapRouteModal,
  PhotoUploadModal,
} from './components/Modals';
import { DonationModal } from './components/DonationModal';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTab, setCurrentTab] = useState<string>('home');

  // Modal visibility state
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isEventGuideModalOpen, setIsEventGuideModalOpen] = useState(false);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isPhotoUploadModalOpen, setIsPhotoUploadModalOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);

  // User submitted community photos
  const [communityPhotos, setCommunityPhotos] = useState<
    Array<{
      id: string;
      url: string;
      title: string;
      uploader: string;
      date: string;
      likes: number;
    }>
  >([
    {
      id: 'c1',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwWUBWiFFA3-ybRm4TCYa9Z3JilP5Us803iQBzFFiopIwR9rtGfR5SbIsaOM2seTO5c-blnCW8pTphIdoZWRXjN5HQglyMpaT2Jk6XmLIvoIHFuEFeOsb_fuBcZg1O-D_u8nNbSHPQA3e-53rDECyXWtrS7TsOBVosgZlV4SXkQfJUQLegoPF-Tv4N-cA2LEoNtCBiS8CUDb-yVs8I3BmM3iQ2WY2aD8lKcugKJ53a1xE_qbHbog9tcEF7cU_zqYLvjLh2iV3PEmM',
      title: 'सोम बाज़ार घाट पर संध्या अर्घ्य का अलौकिक दृश्य',
      uploader: 'अमित कुमार (ई-ब्लॉक, नन्हे पार्क)',
      date: 'नवंबर 2024',
      likes: 124,
    },
    {
      id: 'c2',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfJkr949HEHg81Jx027y5jUAbYj6fJLoHcezzXN3pIEKydCdogSlWqPEfliTfpyLMdfYKsUBG1mTYtxCAZNt_ZHe7P_j0NpQpMoyhW54GwLHnqG3tmmSak1UwKOyWRwfuG12j46kYgGU9afMAWTZALeCfn26IYfhGnrPxCDt6eZ9UY8OVcUYcr4SYnXdqj9J0jY9522b1Zp7GsJS7pygPHw9s37rg-7IO4mTFhuxhStHVeLAL1JmqPLjAmT76nspM3g6iWqhBZfqw',
      title: 'घर में निर्मित पवित्र ठेकुआ महाप्रसाद',
      uploader: 'सुनीता देवी',
      date: 'नवंबर 2024',
      likes: 98,
    },
  ]);

  const handleAddCommunityPhoto = (newPhoto: any) => {
    setCommunityPhotos((prev) => [newPhoto, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#f9f9fc] text-[#1a1c1e] flex flex-col font-sans">
      {/* Devotional Animated Preloader */}
      {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}

      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onOpenDonateModal={() => setIsDonateModalOpen(true)}
      />

      {/* Main Page View Content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            setCurrentTab={setCurrentTab}
            onOpenEventGuideModal={() => setIsEventGuideModalOpen(true)}
            onOpenContactModal={() => setIsContactModalOpen(true)}
            onOpenVolunteerModal={() => setIsVolunteerModalOpen(true)}
            onOpenDonateModal={() => setIsDonateModalOpen(true)}
          />
        )}

        {currentTab === 'about' && (
          <AboutView
            onOpenDonateModal={() => setIsDonateModalOpen(true)}
            onOpenContactModal={() => setIsContactModalOpen(true)}
          />
        )}

        {currentTab === 'chhath2026' && (
          <Chhath2026View
            onOpenVolunteerModal={() => setIsVolunteerModalOpen(true)}
            onOpenMapModal={() => setIsMapModalOpen(true)}
            onOpenContactModal={() => setIsContactModalOpen(true)}
            onOpenDonateModal={() => setIsDonateModalOpen(true)}
          />
        )}

        {currentTab === 'gallery' && (
          <GalleryView
            onOpenPhotoUploadModal={() => setIsPhotoUploadModalOpen(true)}
            communityPhotos={communityPhotos}
          />
        )}
      </main>

      {/* Shared Footer */}
      <Footer
        setCurrentTab={setCurrentTab}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        onOpenMapModal={() => setIsMapModalOpen(true)}
        onOpenDonateModal={() => setIsDonateModalOpen(true)}
      />

      {/* Interactive Modals */}
      <DonationModal
        isOpen={isDonateModalOpen}
        onClose={() => setIsDonateModalOpen(false)}
      />
      <VolunteerModal
        isOpen={isVolunteerModalOpen}
        onClose={() => setIsVolunteerModalOpen(false)}
      />

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <EventGuideModal
        isOpen={isEventGuideModalOpen}
        onClose={() => setIsEventGuideModalOpen(false)}
      />

      <MapRouteModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
      />

      <PhotoUploadModal
        isOpen={isPhotoUploadModalOpen}
        onClose={() => setIsPhotoUploadModalOpen(false)}
        onUploadSuccess={handleAddCommunityPhoto}
      />
    </div>
  );
}
