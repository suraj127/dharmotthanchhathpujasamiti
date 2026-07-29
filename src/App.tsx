import React, { useState } from 'react';
import { Analytics } from '@vercel/analytics/react';
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
      url: '/gallery/chhath-1.jpeg',
      title: 'सोम बाज़ार घाट पर पवित्र अर्घ्य समर्पण',
      uploader: 'अमित कुमार (ई-ब्लॉक)',
      date: 'नवंबर 2024',
      likes: 142,
    },
    {
      id: 'c2',
      url: '/gallery/chhath-2.jpeg',
      title: 'संध्या अर्घ्य का अलौकिक एवं भव्य दृश्य',
      uploader: 'सुरेश शर्मा',
      date: 'नवंबर 2024',
      likes: 118,
    },
    {
      id: 'c3',
      url: '/gallery/chhath-3.jpeg',
      title: 'पुष्पों एवं दीपों से सजा हुआ छठ घाट',
      uploader: 'राकेश वर्मा (नन्हे पार्क)',
      date: 'नवंबर 2024',
      likes: 95,
    },
    {
      id: 'c4',
      url: '/gallery/chhath-4.jpeg',
      title: 'छठी मैया का ध्यान करतीं व्रती महिलाएं',
      uploader: 'सुनीता देवी एवं परिवार',
      date: 'नवंबर 2024',
      likes: 156,
    },
    {
      id: 'c5',
      url: '/gallery/chhath-5.jpeg',
      title: 'सामूहिक पूजा एवं दीपदान उत्सव',
      uploader: 'विकास गुप्ता',
      date: 'नवंबर 2024',
      likes: 88,
    },
    {
      id: 'c6',
      url: '/gallery/chhath-6.jpeg',
      title: 'उदीयमान सूर्यदेव को प्रात:कालीन अर्घ्य',
      uploader: 'राजेश सिंह',
      date: 'नवंबर 2024',
      likes: 134,
    },
    {
      id: 'c7',
      url: '/gallery/chhath-7.jpeg',
      title: 'समिति कार्यकर्ताओं की सेवा भावना',
      uploader: 'दीपक झा (स्वयंसेवक)',
      date: 'नवंबर 2024',
      likes: 112,
    },
    {
      id: 'c8',
      url: '/gallery/chhath-8.jpeg',
      title: 'घाट पर उमड़ी श्रद्धालुओं की अपार भीड़',
      uploader: 'मनोज कुमार',
      date: 'नवंबर 2024',
      likes: 175,
    },
    {
      id: 'c9',
      url: '/gallery/chhath-9.jpeg',
      title: 'पवित्र सूप, दउरा एवं ठेकुआ प्रसाद',
      uploader: 'रेखा देवी',
      date: 'नवंबर 2024',
      likes: 129,
    },
    {
      id: 'c10',
      url: '/gallery/chhath-10.jpeg',
      title: 'गंगाजल एवं धूप से सुवासित पूजा स्थल',
      uploader: 'संजय चौधरी',
      date: 'नवंबर 2024',
      likes: 104,
    },
  ]);

  const handleAddCommunityPhoto = (newPhoto: any) => {
    setCommunityPhotos((prev) => [newPhoto, ...prev]);
  };

  const handleTabChange = (tab: string) => {
    if (typeof document !== 'undefined' && (document as any).startViewTransition) {
      (document as any).startViewTransition(() => {
        setCurrentTab(tab);
      });
    } else {
      setCurrentTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9fc] text-[#1a1c1e] flex flex-col font-sans">
      {/* Devotional Animated Preloader */}
      {isLoading && <LoadingScreen onFinished={() => setIsLoading(false)} />}

      {/* Top Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={handleTabChange}
        onOpenDonateModal={() => setIsDonateModalOpen(true)}
      />

      {/* Main Page View Content */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomeView
            setCurrentTab={handleTabChange}
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
        setCurrentTab={handleTabChange}
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

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}
