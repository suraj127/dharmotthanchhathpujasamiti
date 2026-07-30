import React, { useState } from 'react';
import { OFFICIAL_LOGO_URL, CONTACT_PHONE, CONTACT_PHONE_2, CONTACT_EMAIL } from '../constants';
import { submitFormAndSendEmail } from '../lib/emailService';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 1. Volunteer & Participation Modal
export const VolunteerModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', area: '', role: 'घाटी प्रबंधन' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitFormAndSendEmail({
        formType: 'Volunteer',
        name: formData.name,
        phone: formData.phone,
        area: formData.area,
        role: formData.role,
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl relative border border-[#dbc2b0]/40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-3 overflow-hidden">
            <img src={OFFICIAL_LOGO_URL} alt="Logo" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#8f4e00]">सहभागी बनें / स्वयंसेवक पंजीकरण</h3>
          <p className="text-[#554336] text-xs mt-1">
            छठ पूजा 2026 में हमारी समिति के साथ निःस्वार्थ सेवा के लिए पंजीकरण करें।
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            <h4 className="font-serif text-xl font-bold text-emerald-900">जय छठी मैया!</h4>
            <p className="text-slate-600 text-sm">
              आपका पंजीकरण सफलतापूर्वक स्वीकार कर लिया गया है। समिति जल्द ही आपसे संपर्क करेगी।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-[#554336] mb-1">पूरा नाम *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="उदा. राहुल कुमार"
                className="w-full bg-[#f3f3f6] border border-[#dbc2b0] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8f4e00]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#554336] mb-1">मोबाईल नंबर *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="उदा. 9876543210"
                className="w-full bg-[#f3f3f6] border border-[#dbc2b0] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8f4e00]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#554336] mb-1">आपका क्षेत्र (ई-ब्लॉक/सोम बाज़ार/नन्हे पार्क)</label>
              <input
                type="text"
                value={formData.area}
                onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                placeholder="उदा. E block, Som Bazar, Matiala"
                className="w-full bg-[#f3f3f6] border border-[#dbc2b0] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8f4e00]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#554336] mb-1">सेवा का मुख्य क्षेत्र</label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full bg-[#f3f3f6] border border-[#dbc2b0] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8f4e00]"
              >
                <option value="घाट प्रबंधन">घाट प्रबंधन एवं व्यवस्था</option>
                <option value="प्रसाद वितरण">निःशुल्क प्रसाद एवं जल वितरण</option>
                <option value="सुरक्षा एवं मार्ग">सुरक्षा, पार्किंग एवं मार्ग दर्शन</option>
                <option value="चिकित्सा एवं सहायता">चिकित्सा सहायता शिविर</option>
                <option value="सांस्कृतिक मंच">सांस्कृतिक एवं ध्वनि प्रबंधन</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-3.5 saffron-gradient text-white font-semibold rounded-xl shadow-lg hover:scale-[1.01] transition-transform text-sm mt-2"
            >
              पंजीकरण जमा करें
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// 2. Contact Modal
export const ContactModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await submitFormAndSendEmail({
        formType: 'Contact',
        name: formData.name,
        phone: formData.phone,
        message: formData.message,
      });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 3000);
    } catch (err) {
      console.error('Contact submission error:', err);
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl relative border border-[#dbc2b0]/40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-3 overflow-hidden">
            <img src={OFFICIAL_LOGO_URL} alt="Logo" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#b6171e]">हमसे संपर्क करें</h3>
          <p className="text-[#554336] text-xs mt-1">
            धर्मोत्थान छठ पूजा समिति (ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क)
          </p>

          <div className="mt-4 p-3.5 bg-[#f8f5f0] border border-[#dbc2b0]/50 rounded-2xl flex flex-col gap-2 text-xs">
            <div className="flex flex-wrap items-center justify-around gap-2">
              <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 text-[#8f4e00] font-bold hover:text-[#b6171e] transition-colors">
                <span className="material-symbols-outlined text-base">call</span>
                <span>{CONTACT_PHONE}</span>
              </a>
              <a href={`tel:${CONTACT_PHONE_2.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 text-[#8f4e00] font-bold hover:text-[#b6171e] transition-colors">
                <span className="material-symbols-outlined text-base">call</span>
                <span>{CONTACT_PHONE_2}</span>
              </a>
            </div>
            <div className="text-center pt-1 border-t border-[#dbc2b0]/30">
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-1.5 text-[#8f4e00] font-bold hover:text-[#b6171e] transition-colors break-all">
                <span className="material-symbols-outlined text-base">mail</span>
                <span>{CONTACT_EMAIL}</span>
              </a>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-4xl">mark_email_read</span>
            </div>
            <h4 className="font-serif text-xl font-bold text-emerald-900">संदेश प्राप्त हुआ!</h4>
            <p className="text-slate-600 text-sm">
              आपके संदेश के लिए धन्यवाद। समिति के प्रतिनिधि शीघ्र ही आपसे संपर्क करेंगे।
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-semibold text-[#554336] mb-1">आपका नाम *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="आपका नाम दर्ज करें"
                className="w-full bg-[#f3f3f6] border border-[#dbc2b0] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#b6171e]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#554336] mb-1">मोबाईल नंबर / ईमेल *</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="संपर्क नंबर या ईमेल"
                className="w-full bg-[#f3f3f6] border border-[#dbc2b0] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#b6171e]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#554336] mb-1">संदेश या सुझाव *</label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="आयोजन से जुड़ी कोई जानकारी या सुझाव..."
                className="w-full bg-[#f3f3f6] border border-[#dbc2b0] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#b6171e]"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 bg-[#b6171e] text-white font-semibold rounded-xl shadow-lg hover:bg-[#b6171e]/90 transition-colors text-sm"
            >
              संदेश भेजें
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// 3. Event Guide Modal
export const EventGuideModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 shadow-2xl relative border border-[#dbc2b0]/40 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img src={OFFICIAL_LOGO_URL} alt="Logo" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#8f4e00]">ईवेंट गाइड - छठ पूजा 2026</h3>
            <p className="text-[#554336] text-xs">छठ घाट समिति निर्देश पुस्तिका एवं दिशानिर्देश</p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-[#1a1c1e]">
          <div className="p-4 bg-[#f3f3f6] rounded-2xl border border-[#dbc2b0]/30 space-y-2">
            <h4 className="font-serif font-bold text-[#b6171e] text-base flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">event</span>
              4-दिवसीय अनुसूची (14 नवंबर - 17 नवंबर 2026)
            </h4>
            <ul className="space-y-2 text-xs text-[#554336] pl-2">
              <li><strong>14 नवंबर (नहाय खाय):</strong> प्रातः पवित्र स्नान, कद्दू-भात सात्विक महाप्रसाद वितरण।</li>
              <li><strong>15 नवंबर (खरना):</strong> दिनभर उपवास, रात्रि 7:30 बजे से चंद्रोदय दर्शन व गुड़ खीर प्रसाद।</li>
              <li><strong>16 नवंबर (संध्या अर्घ्य):</strong> शाम 4:30 - 6:00 बजे अस्ताचलगामी सूर्य देव को प्रथम अर्घ्य।</li>
              <li><strong>17 नवंबर (उषा अर्घ्य):</strong> सुबह 5:30 - 7:00 बजे उदीयमान सूर्य देव को अंतिम अर्घ्य एवं पारण।</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-serif font-bold text-[#8f4e00] text-base">घाट सुरक्षा व सुविधाएं</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-[#ffdcc2]/30 rounded-xl border border-[#ffdcc2] flex items-start gap-2">
                <span className="material-symbols-outlined text-[#8f4e00]">clean_hands</span>
                <div>
                  <strong>निःशुल्क दउरा व सुपली:</strong>
                  <p className="text-slate-600">असमर्थ व्रतियों के लिए बांस की नई टोकरी व पूजन सामग्री निःशुल्क उपलब्ध।</p>
                </div>
              </div>
              <div className="p-3 bg-[#ffdad6]/30 rounded-xl border border-[#ffdad6] flex items-start gap-2">
                <span className="material-symbols-outlined text-[#b6171e]">medical_services</span>
                <div>
                  <strong>24/7 चिकित्सा शिविर:</strong>
                  <p className="text-slate-600">डॉक्टरों एवं एम्बुलेंस की टीम हर समय घाट परिसर में तैनात रहेगी।</p>
                </div>
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2">
                <span className="material-symbols-outlined text-amber-700">videocam</span>
                <div>
                  <strong>CCTV एवं प्रकाश व्यवस्था:</strong>
                  <p className="text-slate-600">32 हाई-डेफिनिशन कैमरों व आधुनिक फ्लड-लाइट्स से परिसर सुरक्षित।</p>
                </div>
              </div>
              <div className="p-3 bg-sky-50 rounded-xl border border-sky-200 flex items-start gap-2">
                <span className="material-symbols-outlined text-sky-700">local_parking</span>
                <div>
                  <strong>ई-ब्लॉक निर्धारित पार्किंग:</strong>
                  <p className="text-slate-600">सोम बाजार रोड से प्रवेश करें, पुलिस व स्वयंसेवक पार्क करवाएंगे।</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2.5 saffron-gradient text-white rounded-xl text-xs font-semibold shadow-md"
            >
              समझ गए / बंद करें
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Map Route Modal
export const MapRouteModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const googleMapsUrl = 'https://maps.app.goo.gl/GfcgPXL5B9souB4U9';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-2xl relative border border-[#dbc2b0]/40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 overflow-hidden">
            <img src={OFFICIAL_LOGO_URL} alt="Logo" className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#8f4e00]">स्थान निर्देशिका - ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क</h3>
            <p className="text-[#554336] text-xs font-medium">ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क, नई दिल्ली – 110059</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="w-full h-52 bg-slate-100 rounded-2xl overflow-hidden relative border border-[#dbc2b0]/50">
            <iframe
              title="Matiala Ghat Location"
              src="https://maps.google.com/maps?q=Matiala%20Som%20Bazar%20Nanhe%20Park%20Delhi&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 bg-[#f3f3f6] rounded-xl">
              <span className="text-[#b6171e] font-bold block">निकटतम मेट्रो</span>
              <span className="text-slate-600">उत्तम नगर वेस्ट (ब्लू लाइन)</span>
            </div>
            <div className="p-2.5 bg-[#f3f3f6] rounded-xl">
              <span className="text-[#8f4e00] font-bold block">पैदल दूरी</span>
              <span className="text-slate-600">10-12 मिनट</span>
            </div>
            <div className="p-2.5 bg-[#f3f3f6] rounded-xl">
              <span className="text-[#8f4e00] font-bold block">प्रमुख लैंडमार्क</span>
              <span className="text-slate-600">सोम बाजार मार्केट</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 saffron-gradient text-white font-semibold rounded-xl text-center text-xs shadow-md flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">near_me</span>
              <span>गूगल मैप्स में रास्ता देखें</span>
            </a>
            <button
              onClick={onClose}
              className="px-5 py-3 border border-[#dbc2b0] text-[#554336] font-semibold rounded-xl text-xs hover:bg-slate-50"
            >
              बंद करें
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// 5. Photo Upload Modal
export const PhotoUploadModal: React.FC<{ isOpen: boolean; onClose: () => void; onUploadSuccess: (imgData: any) => void }> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [caption, setCaption] = useState('');
  const [uploader, setUploader] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (imagePreview) {
      await submitFormAndSendEmail({
        formType: 'PhotoUpload',
        name: uploader || 'स्थानीय निवासी',
        message: caption || 'फोटो गैलरी हेतु शेयर की गई',
        details: { image: imagePreview }
      });
      onUploadSuccess({
        id: Date.now().toString(),
        url: imagePreview,
        title: caption || 'श्रद्धालु द्वारा साझा क्षण',
        uploader: uploader || 'स्थानीय निवासी',
        date: 'अभी',
        likes: 1,
      });
      setImagePreview(null);
      setCaption('');
      setUploader('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl relative border border-[#dbc2b0]/40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
        >
          <span className="material-symbols-outlined text-xl">close</span>
        </button>

        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-[#ffdcc2] text-[#8f4e00] rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-3xl">add_a_photo</span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#8f4e00]">अपनी तस्वीरें अपलोड करें</h3>
          <p className="text-[#554336] text-xs mt-1">
            छठ पूजा की पवित्र स्मृतियां हमारे सामुदायिक संग्रह में साझा करें।
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="block text-xs font-semibold text-[#554336] mb-1">फोटो चुनें *</label>
            <div className="border-2 border-dashed border-[#dbc2b0] rounded-2xl p-4 text-center hover:bg-slate-50 transition-colors cursor-pointer relative">
              <input
                type="file"
                accept="image/*"
                required
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {imagePreview ? (
                <div className="relative h-40 w-full rounded-xl overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] px-2 py-1 rounded">
                    बदलने के लिए क्लिक करें
                  </span>
                </div>
              ) : (
                <div className="space-y-1 py-4">
                  <span className="material-symbols-outlined text-3xl text-[#8f4e00]">cloud_upload</span>
                  <p className="text-xs text-slate-600 font-medium">तस्वीर चुनने के लिए क्लिक करें या यहाँ लाएं</p>
                  <span className="text-[10px] text-slate-400 block">PNG, JPG 10MB तक</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#554336] mb-1">शीर्षक / विवरण</label>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="उदा. सोम बाज़ार घाट पर संध्या अर्घ्य का दिव्य क्षण"
              className="w-full bg-[#f3f3f6] border border-[#dbc2b0] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8f4e00]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#554336] mb-1">आपका नाम</label>
            <input
              type="text"
              value={uploader}
              onChange={(e) => setUploader(e.target.value)}
              placeholder="उदा. रमेश प्रसाद"
              className="w-full bg-[#f3f3f6] border border-[#dbc2b0] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#8f4e00]"
            />
          </div>

          <button
            type="submit"
            disabled={!imagePreview}
            className={`w-full py-3.5 font-semibold rounded-xl shadow-lg transition-transform text-sm ${
              imagePreview
                ? 'saffron-gradient text-white hover:scale-[1.01]'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            संग्रह में अपलोड करें
          </button>
        </form>
      </div>
    </div>
  );
};
