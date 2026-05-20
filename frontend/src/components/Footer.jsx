import { useEffect, useState } from "react";
import api from "../api/api";

export default function Footer() {
  const [setting, setSetting] = useState(null);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);

  useEffect(() => {
    const getSetting = async () => {
      try {
        const res = await api.get("/settings");
        setSetting(res.data);
      } catch (error) {
        console.log(error.response?.data || error);
      }
    };

    getSetting();
  }, []);

  const storeName = setting?.storeName;
  const description = setting?.description;
  const contactEmail = setting?.contactEmail || "admin@petals.com";

  return (
    <footer className="bg-surface-container dark:bg-surface-container-highest full-width py-16 border-t border-outline-variant/30">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-4 gap-gutter">
        <div className="col-span-1 md:col-span-1">
          <a className="flex items-center gap-3 font-headline-md text-headline-md text-secondary dark:text-secondary-fixed-dim italic mb-6" href="/">
            {setting?.logo && <img src={setting.logo} alt={storeName} className="h-10 w-10 rounded-full object-cover" />}
            <span>{storeName}</span>
          </a>

          <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">{description}</p>

          <p className="mt-4 font-body-md text-sm text-on-surface-variant">{contactEmail}</p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-label-md text-label-md uppercase tracking-widest text-on-surface mb-2">Shop</h4>
          <a className="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-secondary transition-colors underline-offset-4 hover:underline" href="/about">
            About
          </a>
          <a className="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-secondary transition-colors underline-offset-4 hover:underline" href="/gallery">
            Gallery
          </a>
          <a className="font-body-md text-body-md text-on-surface-variant dark:text-outline-variant hover:text-secondary transition-colors underline-offset-4 hover:underline" href="/shop">
            Shop
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-label-md text-label-md uppercase tracking-widest text-on-surface mb-2">Customer Care</h4>

          <button onClick={() => setShowPrivacyModal(true)} className="text-left font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors underline-offset-4 hover:underline" type="button">
            Privacy Policy
          </button>

          <a className="font-body-md text-body-md text-on-surface-variant hover:text-secondary transition-colors underline-offset-4 hover:underline" href="https://wa.me/6281234567890" target="_blank" rel="noreferrer">
            Contact Us
          </a>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="font-label-md text-label-md uppercase tracking-widest text-on-surface mb-2">Social</h4>
          <div className="flex gap-4">
            <a className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-secondary hover:border-secondary transition-all" href="#">
              <span className="material-symbols-outlined">photo_camera</span>
            </a>
            <a className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-on-surface-variant hover:text-secondary hover:border-secondary transition-all" href="#">
              <span className="material-symbols-outlined">share</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mt-16 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-body-md text-body-md text-on-surface-variant opacity-70">
          © {new Date().getFullYear()} {storeName}. Crafted for Moments of Grace.
        </p>

        <div className="flex gap-6">
          <span className="material-symbols-outlined text-on-surface-variant opacity-40">payments</span>
          <span className="material-symbols-outlined text-on-surface-variant opacity-40">local_shipping</span>
        </div>
      </div>
      {showPrivacyModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between">
              <div>
                <h2 className="text-3xl font-black text-[#81515a]">Privacy Policy</h2>

                <p className="mt-2 text-sm text-[#514345]">Your privacy and data security matter to us.</p>
              </div>

              <button onClick={() => setShowPrivacyModal(false)} className="rounded-full bg-pink-50 p-2 text-[#81515a] hover:bg-pink-100">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Content */}
            <div className="space-y-5 text-sm leading-relaxed text-[#514345]">
              <div>
                <h3 className="mb-2 text-lg font-bold text-[#1f1a1b]">Information Collection</h3>

                <p>We collect customer information such as name, phone number, address, and payment information only for order processing and delivery purposes.</p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-bold text-[#1f1a1b]">Data Protection</h3>

                <p>Your personal information is securely stored and will never be shared with third parties without your permission.</p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-bold text-[#1f1a1b]">Payment Security</h3>

                <p>All payments are processed securely through trusted payment gateways and banking partners.</p>
              </div>

              <div>
                <h3 className="mb-2 text-lg font-bold text-[#1f1a1b]">Customer Rights</h3>

                <p>Customers may request account data updates or deletion by contacting our customer support team.</p>
              </div>
            </div>

            {/* Button */}
            <button onClick={() => setShowPrivacyModal(false)} className="mt-8 w-full rounded-2xl bg-[#81515a] py-4 font-bold text-white hover:bg-[#6a4047]">
              I Understand
            </button>
          </div>
        </div>
      )}
    </footer>
  );
}
