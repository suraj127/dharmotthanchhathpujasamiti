import React, { useState } from 'react';
import { OFFICIAL_LOGO_URL } from '../constants';
import { submitFormAndSendEmail } from '../lib/emailService';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Convert amount to Hindi words helper
const amountInHindiWords = (num: number): string => {
  if (!num || isNaN(num)) return 'रुपये शून्य मात्र';
  const units = ['', 'एक', 'दो', 'तीन', 'चार', 'पाँच', 'छह', 'सात', 'आठ', 'नौ'];
  const tens = ['', 'दस', 'बीस', 'तीस', 'चालीस', 'पचास', 'साठ', 'सत्तर', 'अस्सी', 'नब्बे'];
  const teens = ['दस', 'ग्यारह', 'बारह', 'तेरह', 'चौदह', 'पंद्रह', 'सोलह', 'सत्रह', 'अठारह', 'उन्नीस'];

  if (num === 101) return 'रुपये एक सौ एक मात्र';
  if (num === 251) return 'रुपये दो सौ एकवन मात्र';
  if (num === 501) return 'रुपये पाँच सौ एक मात्र';
  if (num === 1100) return 'रुपये एक हजार एक सौ मात्र';
  if (num === 2100) return 'रुपये दो हजार एक सौ मात्र';
  if (num === 5100) return 'रुपये पाँच हजार एक सौ मात्र';

  let str = '';
  if (num >= 100000) {
    const lakh = Math.floor(num / 100000);
    str += `${lakh} लाख `;
    num %= 100000;
  }
  if (num >= 1000) {
    const thousand = Math.floor(num / 1000);
    str += `${thousand} हजार `;
    num %= 1000;
  }
  if (num >= 100) {
    const hundred = Math.floor(num / 100);
    str += `${units[hundred]} सौ `;
    num %= 100;
  }
  if (num >= 20) {
    const ten = Math.floor(num / 10);
    str += `${tens[ten]} `;
    num %= 10;
  } else if (num >= 10) {
    str += `${teens[num - 10]} `;
    num = 0;
  }
  if (num > 0) {
    str += `${units[num]} `;
  }

  return `रुपये ${str.trim()} मात्र`;
};

export const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'receipt'>('details');

  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState<number>(501);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [utr, setUtr] = useState('');
  const [purpose, setPurpose] = useState('छठ पूजा 2026 घाट सजावट एवं महाप्रसाद सेवा');
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

  const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Receipt data after generation
  const [receiptData, setReceiptData] = useState<{
    receiptNo: string;
    date: string;
    time: string;
    amount: number;
    name: string;
    address: string;
    phone: string;
    utr: string;
    purpose: string;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const upiId = '8383809579@ptsbi';
  const payeeName = 'Suraj Bhan Gupta';

  const finalAmount = customAmount ? parseFloat(customAmount) || 0 : amount;

  // Generate dynamic UPI Deep Link
  const refId = `DPJ2026${Date.now().toString().slice(-6)}`;
  const upiDeepLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
    payeeName
  )}&tr=${refId}&tn=${encodeURIComponent('Chhath Puja Samiti Donation')}&am=${finalAmount}&cu=INR`;

  // QR Code URL via QR Server API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    upiDeepLink
  )}`;

  const handlePresetAmount = (val: number) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    if (!name.trim()) {
      setErrorMsg('कृपया अपना नाम दर्ज करें।');
      return;
    }
    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMsg('कृपया अपना सही 10-अंकों का मोबाईल नंबर दर्ज करें।');
      return;
    }
    if (!address.trim()) {
      setErrorMsg('कृपया अपना पता या क्षेत्र दर्ज करें।');
      return;
    }
    if (finalAmount <= 0) {
      setErrorMsg('कृपया मान्य सहयोग राशि दर्ज करें।');
      return;
    }

    setStep('payment');
  };

  const handleConfirmPaymentAndGenerateReceipt = async () => {
    setErrorMsg('');
    if (!utr.trim() || utr.trim().length < 8) {
      setErrorMsg('कृपया भुगतान का 12-अंकों का UTR/Transaction Ref No. दर्ज करें!');
      return;
    }

    setLoading(true);

    const now = new Date();
    const dateStr = now.toLocaleDateString('hi-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    const timeStr = now.toLocaleTimeString('hi-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newReceipt = {
      receiptNo: `DPJ-${now.getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      date: dateStr,
      time: timeStr,
      amount: finalAmount,
      name: name.trim(),
      address: address.trim(),
      phone: phone.trim(),
      utr: utr.trim(),
      purpose: purpose.trim(),
    };

    try {
      // Submit form and notify admin email via Gmail API
      await submitFormAndSendEmail({
        formType: 'General',
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        area: address.trim(),
        role: `दानदाता (Donation ₹${finalAmount})`,
        message: `दान राशि: ₹${finalAmount} | UTR No: ${utr.trim()} | उद्देश्य: ${purpose.trim()}`,
        details: {
          ...newReceipt,
          screenshot: screenshotPreview
        },
      });
    } catch (err) {
      console.warn('Donation email notice error:', err);
    } finally {
      setReceiptData(newReceipt);
      setLoading(false);
      setStep('receipt');
    }
  };

  const handleCopyUpi = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const handleResetModal = () => {
    setStep('details');
    setName('');
    setPhone('');
    setEmail('');
    setAddress('');
    setAmount(501);
    setCustomAmount('');
    setUtr('');
    setScreenshotPreview(null);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden my-auto animate-in zoom-in-95 duration-200">
        
        {/* Header Header Banner */}
        <div className="bg-gradient-to-r from-[#b6171e] via-[#8f4e00] to-[#ff9933] text-white p-5 sm:p-6 text-center relative">
          <button
            onClick={handleResetModal}
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 w-9 h-9 rounded-full flex items-center justify-center transition-all focus:outline-none"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>

          <div className="w-14 h-14 mx-auto mb-2 bg-white/95 rounded-full p-1.5 shadow-md flex items-center justify-center">
            <img src={OFFICIAL_LOGO_URL} alt="Logo" className="w-full h-full object-contain" />
          </div>

          <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-amber-100">
            धर्मोत्थान छठ पूजा समिति
          </h2>
          <p className="text-xs text-amber-200/90 font-medium tracking-wide mt-0.5">
            ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क, नई दिल्ली – 110059
          </p>

          {/* Progress Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4 text-xs font-medium">
            <span
              className={`px-3 py-1 rounded-full transition-all ${
                step === 'details'
                  ? 'bg-amber-100 text-[#8f4e00] font-bold shadow-sm'
                  : 'bg-white/20 text-white/80'
              }`}
            >
              1. जानकारी
            </span>
            <span className="text-amber-200/50">➔</span>
            <span
              className={`px-3 py-1 rounded-full transition-all ${
                step === 'payment'
                  ? 'bg-amber-100 text-[#8f4e00] font-bold shadow-sm'
                  : 'bg-white/20 text-white/80'
              }`}
            >
              2. UPI भुगतान
            </span>
            <span className="text-amber-200/50">➔</span>
            <span
              className={`px-3 py-1 rounded-full transition-all ${
                step === 'receipt'
                  ? 'bg-amber-100 text-[#8f4e00] font-bold shadow-sm'
                  : 'bg-white/20 text-white/80'
              }`}
            >
              3. आधिकारिक रसीद
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6 max-h-[80vh] overflow-y-auto">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm rounded-xl flex items-center gap-2">
              <span className="material-symbols-outlined text-lg flex-shrink-0">error</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* STEP 1: DONOR DETAILS */}
          {step === 'details' && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              <div className="text-center pb-2">
                <h3 className="font-serif text-lg font-bold text-[#8f4e00]">
                  छठ महापर्व 2026 हेतु पवित्र दान व सहयोग
                </h3>
                <p className="text-xs text-[#554336] mt-0.5">
                  आपका सहयोग घाट निर्माण, स्वच्छता, बिजली व्यवस्था और भण्डारे में प्रयुक्त होगा।
                </p>
              </div>

              {/* Amount Quick Options */}
              <div>
                <label className="block text-xs font-bold text-[#554336] mb-1.5">
                  सहयोग राशि चुनें (₹) <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2 mb-2.5">
                  {[101, 251, 501, 1100, 2100, 5100].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handlePresetAmount(amt)}
                      className={`py-2 px-3 rounded-xl border text-xs sm:text-sm font-bold transition-all ${
                        amount === amt && !customAmount
                          ? 'bg-[#8f4e00] text-white border-[#8f4e00] shadow-sm scale-[1.02]'
                          : 'bg-amber-50/50 border-amber-200/80 text-[#554336] hover:bg-amber-100/60'
                      }`}
                    >
                      ₹{amt.toLocaleString('hi-IN')}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#8f4e00]">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="1"
                    placeholder="अन्य राशि (उदा. 1001)"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      if (e.target.value) setAmount(0);
                    }}
                    className="w-full pl-8 pr-4 py-2.5 border border-amber-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff9933] focus:border-transparent outline-none bg-white font-medium"
                  />
                </div>
              </div>

              {/* Donor Name */}
              <div>
                <label className="block text-xs font-bold text-[#554336] mb-1">
                  दानदाता का नाम (Full Name) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. सूरज भान गुप्ता"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-amber-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff9933] focus:border-transparent outline-none bg-white"
                />
              </div>

              {/* Phone & Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#554336] mb-1">
                    मोबाईल नंबर (WhatsApp) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="10-अंकों का मोबाइल"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-amber-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff9933] focus:border-transparent outline-none bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#554336] mb-1">
                    ईमेल आईडी (ऐच्छिक / Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="रसीद प्राप्त करने के लिए"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-amber-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff9933] focus:border-transparent outline-none bg-white"
                  />
                </div>
              </div>

              {/* Address / Location */}
              <div>
                <label className="block text-xs font-bold text-[#554336] mb-1">
                  पूरा पता / क्षेत्र (Address) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. E-Block, Nanhe Park, Matiala, New Delhi"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-amber-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff9933] focus:border-transparent outline-none bg-white"
                />
              </div>

              {/* Purpose */}
              <div>
                <label className="block text-xs font-bold text-[#554336] mb-1">
                  सहयोग का उद्देश्य
                </label>
                <select
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-amber-200 rounded-xl text-sm focus:ring-2 focus:ring-[#ff9933] focus:border-transparent outline-none bg-white text-[#554336]"
                >
                  <option value="छठ पूजा 2026 घाट सजावट एवं महाप्रसाद सेवा">
                    छठ पूजा 2026 घाट सजावट एवं महाप्रसाद सेवा
                  </option>
                  <option value="निःशुल्क दउरा व बांस सामग्री वितरण">
                    निःशुल्क दउरा व बांस सामग्री वितरण
                  </option>
                  <option value="सांस्कृतिक मंच एवं भक्ति संध्या">
                    सांस्कृतिक मंच एवं भक्ति संध्या
                  </option>
                  <option value="घाट स्वच्छता व सुरक्षा कोष">घाट स्वच्छता व सुरक्षा कोष</option>
                  <option value="सामान्य धर्मोत्थान कोष">सामान्य धर्मोत्थान कोष</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 saffron-gradient text-white font-bold rounded-2xl text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>आगे बढ़ें (₹{finalAmount.toLocaleString('hi-IN')} भुगतान करें)</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: UPI PAYMENT & UTR VERIFICATION */}
          {step === 'payment' && (
            <div className="space-y-5">
              <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-center">
                <span className="text-xs font-bold text-[#8f4e00] uppercase tracking-wider block">
                  कुल देय सहयोग राशि
                </span>
                <span className="font-serif text-3xl font-extrabold text-[#b6171e] block my-0.5">
                  ₹{finalAmount.toLocaleString('hi-IN')}
                </span>
                <span className="text-xs text-[#554336] font-medium">
                  {name} ({phone})
                </span>
              </div>

              {/* UPI QR & Details Card */}
              <div className="bg-white border-2 border-amber-200 rounded-2xl p-4 shadow-sm text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-[#002970] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider flex items-center gap-1">
                  <span>paytm</span>
                  <span>●</span>
                  <span>UPI</span>
                </div>

                <p className="text-xs text-[#554336] font-bold mt-1 mb-3">
                  किसी भी UPI ऐप (Google Pay, PhonePe, Paytm, BHIM) से QR स्कैन करें:
                </p>

                {/* QR Code Container */}
                <div className="relative w-48 h-48 mx-auto bg-white p-2.5 rounded-2xl border-2 border-[#002970] shadow-md flex items-center justify-center">
                  <img
                    src={qrCodeUrl}
                    alt="UPI Payment QR Code"
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>

                <div className="mt-3 space-y-1">
                  <div className="inline-flex items-center gap-2 bg-amber-100/70 border border-amber-300/80 px-3 py-1.5 rounded-full text-xs font-bold text-[#8f4e00]">
                    <span>UPI ID: {upiId}</span>
                    <button
                      type="button"
                      onClick={handleCopyUpi}
                      className="ml-1 text-[10px] bg-[#8f4e00] text-white px-2 py-0.5 rounded-md hover:bg-amber-900 transition-colors"
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-[11px] text-gray-600 font-semibold">
                    प्राप्तकर्ता नाम (Payee): <span className="text-gray-900">{payeeName}</span>
                  </p>
                </div>

                {/* Direct App Launch Buttons on Mobile */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-center gap-2">
                  <a
                    href={upiDeepLink}
                    className="px-4 py-2 bg-[#002970] text-white text-xs font-bold rounded-xl shadow hover:bg-[#001f54] transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    <span>Pay via UPI App</span>
                  </a>
                </div>
              </div>

              {/* UTR Verification Section */}
              <div className="bg-amber-100/50 border border-amber-300/80 p-4 rounded-2xl space-y-3">
                <div className="flex items-start gap-2 text-left">
                  <span className="material-symbols-outlined text-amber-700 text-xl flex-shrink-0 mt-0.5">
                    verified_user
                  </span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#8f4e00]">
                      भुगतान के बाद UTR / Transaction Ref No. दर्ज करें:
                    </h4>
                    <p className="text-[11px] text-[#554336] leading-relaxed mt-0.5">
                      अपने PhonePe / GPay / Paytm रसीद से 12-अंकों का <strong>UPI Ref No. / UTR</strong> यहाँ दर्ज करके रसीद तुरंत प्राप्त करें।
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    required
                    maxLength={16}
                    placeholder="उदा. 421890384910 (12-अंकों का UTR/Ref No)"
                    value={utr}
                    onChange={(e) => setUtr(e.target.value.replace(/[^0-9A-Za-z]/g, ''))}
                    className="w-full px-4 py-3 border-2 border-amber-300 rounded-xl text-sm font-mono font-bold tracking-wider text-center text-gray-900 bg-white focus:ring-2 focus:ring-[#8f4e00] outline-none"
                  />
                </div>

                <div className="pt-2 border-t border-amber-200/50">
                  <label className="block text-xs font-bold text-[#8f4e00] mb-1">
                    भुगतान स्क्रीनशॉट / रसीद अपलोड करें (वैकल्पिक)
                  </label>
                  <div className="border border-dashed border-amber-300 rounded-xl p-3 text-center bg-white hover:bg-amber-50/50 transition-colors relative cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleScreenshotChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    {screenshotPreview ? (
                      <div className="flex items-center justify-between gap-2 px-1">
                        <span className="text-xs text-emerald-700 font-semibold truncate max-w-[80%] flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">check_circle</span>
                          स्क्रीनशॉट चुना गया
                        </span>
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); setScreenshotPreview(null); }}
                          className="text-xs text-red-500 font-bold hover:underline"
                        >
                          हटाएं
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-1 text-slate-500">
                        <span className="material-symbols-outlined text-base text-[#8f4e00]">add_photo_alternate</span>
                        <span className="text-xs">स्क्रीनशॉट जोड़ने के लिए क्लिक करें</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep('details')}
                  className="w-1/3 py-3 border border-gray-300 text-gray-700 font-semibold rounded-2xl text-xs sm:text-sm hover:bg-gray-100 transition-all"
                >
                  पीछे जाएँ
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPaymentAndGenerateReceipt}
                  disabled={loading}
                  className="w-2/3 py-3 saffron-gradient text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>सत्यापित किया जा रहा है...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">receipt_long</span>
                      <span>भुगतान की पुष्टि करें और रसीद पाएँ</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: OFFICIAL DONATION RECEIPT (रसीद) */}
          {step === 'receipt' && receiptData && (
            <div className="space-y-4">
              {/* Printable Official Receipt Box */}
              <div
                id="official-receipt-print"
                className="relative bg-[#fffdfa] border-4 border-[#8f4e00] rounded-2xl p-5 sm:p-6 shadow-xl overflow-hidden print:border-2 print:shadow-none"
              >
                {/* Decorative Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                  <img src={OFFICIAL_LOGO_URL} alt="Watermark" className="w-80 h-80 object-contain" />
                </div>

                {/* Top Committee Header */}
                <div className="text-center border-b-2 border-amber-200 pb-4 relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <img src={OFFICIAL_LOGO_URL} alt="Logo" className="w-12 h-12 object-contain" />
                    <div className="text-center flex-1">
                      <span className="block text-xs font-bold uppercase tracking-wider text-[#b6171e]">
                        ॥ श्री गणेशाय नमः ॥ जय छठी मैया ॥
                      </span>
                      <h1 className="font-serif text-xl sm:text-2xl font-black text-[#8f4e00]">
                        धर्मोत्थान छठ पूजा समिति
                      </h1>
                      <p className="text-[11px] text-gray-700 font-semibold">
                        ई-ब्लॉक, सोम बाज़ार, नन्हे पार्क, नई दिल्ली – 110059 (पंजीकृत सामाजिक संस्थान)
                      </p>
                    </div>
                    <div className="w-12 text-right">
                      <span className="inline-block bg-emerald-600 text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        स्वीकृत
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 inline-block bg-[#8f4e00] text-amber-100 font-serif font-bold text-sm px-6 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    आधिकारिक दान एवं सहयोग रसीद
                  </div>
                </div>

                {/* Receipt Metadata Row */}
                <div className="flex justify-between items-center text-xs text-gray-700 border-b border-amber-100 py-2.5 relative z-10 font-mono">
                  <div>
                    <span className="font-bold text-gray-500">रसीद सं. (Receipt No): </span>
                    <span className="font-extrabold text-[#b6171e]">{receiptData.receiptNo}</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-500">दिनांक: </span>
                    <span className="font-bold text-gray-900">{receiptData.date}</span>
                  </div>
                </div>

                {/* Main Receipt Details Body */}
                <div className="py-4 space-y-3 relative z-10 text-xs sm:text-sm text-gray-800">
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 border-b border-dashed border-amber-200 pb-2">
                    <span className="font-bold text-[#8f4e00] min-w-[130px]">दानदाता का नाम:</span>
                    <span className="font-extrabold text-base text-gray-900 uppercase">
                      {receiptData.name}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 border-b border-dashed border-amber-200 pb-2">
                    <span className="font-bold text-[#8f4e00] min-w-[130px]">संपर्क व पता:</span>
                    <span className="font-semibold text-gray-800">
                      {receiptData.address} (मो. {receiptData.phone})
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 border-b border-dashed border-amber-200 pb-2">
                    <span className="font-bold text-[#8f4e00] min-w-[130px]">प्रदान सहयोग राशि:</span>
                    <span className="font-extrabold text-lg text-[#b6171e]">
                      ₹{receiptData.amount.toLocaleString('hi-IN')}/-
                    </span>
                    <span className="text-xs text-gray-600 italic sm:ml-2">
                      ({amountInHindiWords(receiptData.amount)})
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 border-b border-dashed border-amber-200 pb-2">
                    <span className="font-bold text-[#8f4e00] min-w-[130px]">भुगतान माध्यम:</span>
                    <span className="font-mono font-bold text-gray-900">
                      UPI ({upiId}) | UTR/Ref: {receiptData.utr}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1">
                    <span className="font-bold text-[#8f4e00] min-w-[130px]">सहयोग हेतु:</span>
                    <span className="font-medium text-gray-700">{receiptData.purpose}</span>
                  </div>
                </div>

                {/* Footer Stamp & Devotional Message */}
                <div className="mt-4 pt-4 border-t-2 border-amber-200 flex items-center justify-between relative z-10">
                  <div className="text-[11px] text-[#554336] max-w-[260px] leading-tight">
                    <p className="font-serif font-bold text-[#8f4e00]">
                      ॥ छठी मैया की कृपा आप पर सदा बनी रहे ॥
                    </p>
                    <p className="text-[10px] text-gray-500 mt-0.5">
                      यह कंप्यूटर जनित आधिकारिक दान रसीद धर्मोत्थान छठ पूजा समिति द्वारा जारी की गई है।
                    </p>
                  </div>

                  {/* Stamp Seal Simulation */}
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#b6171e] p-1 flex flex-col items-center justify-center text-center rotate-[-6deg] bg-amber-50/50 shadow-inner">
                      <span className="text-[8px] font-bold text-[#b6171e] uppercase leading-tight">
                        धर्मोत्थान छठ पूजा समिति
                      </span>
                      <span className="material-symbols-outlined text-[#b6171e] text-lg">
                        verified
                      </span>
                      <span className="text-[8px] font-extrabold text-emerald-700">
                        कोषाध्यक्ष स्वीकृत
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Receipt Utility Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrintReceipt}
                  className="py-3 bg-[#8f4e00] hover:bg-amber-900 text-white font-bold rounded-2xl text-xs sm:text-sm shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">print</span>
                  <span>रसीद प्रिंट / सेव PDF</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetModal}
                  className="py-3 border border-amber-300 text-[#8f4e00] font-bold rounded-2xl text-xs sm:text-sm hover:bg-amber-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-lg">check_circle</span>
                  <span>समाप्त करें</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
