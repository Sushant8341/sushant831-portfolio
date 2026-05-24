import React, { useState } from 'react';
import { Send, CheckCircle, ShieldCheck, Mail } from 'lucide-react';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim() || !email.trim() || !messageText.trim()) {
      setErrorMsg('Please complete all requested fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Please provide a valid email format.');
      return;
    }

    setLoading(true);

    // Simulated network callback delay
    setTimeout(() => {
      // Reset inputs
      setName('');
      setEmail('');
      setMessageText('');
      setLoading(false);
      setSuccess(true);

      // Dismiss success status notification after 4 secs
      setTimeout(() => setSuccess(false), 4000);
    }, 800);
  };

  return (
    <div className="max-w-xl mx-auto w-full text-slate-800" id="contact-guestbook">
      {/* Contact Form input side */}
      <div className="flex flex-col gap-5">
        <div className="text-center sm:text-left">
          <h3 className="text-sm font-bold font-display uppercase tracking-[0.15em] text-slate-900 flex items-center justify-center sm:justify-start gap-2">
            <Mail className="w-4 h-4 text-slate-600" />
            Direct Inquiry
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Interested in collaborations, code audits, or freelance projects? Drop a line to sync.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {errorMsg && (
            <div className="text-[11px] bg-rose-50 border border-rose-200 text-rose-800 font-semibold p-3 rounded-none">
              {errorMsg}
            </div>
          )}

          {success && (
            <div className="text-[11px] bg-slate-50 border border-slate-200 text-slate-900 font-semibold p-3 rounded-none flex items-center gap-1.5 animate-fade-in-up">
              <CheckCircle className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Response recorded to local ledger!</span>
            </div>
          )}

          <div>
            <label className="block text-[9px] font-mono tracking-widest font-extrabold uppercase text-slate-400 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your full name"
              disabled={loading}
              className="w-full text-xs font-sans px-3 py-2.5 bg-white border border-slate-200 rounded-none focus:outline-none focus:border-slate-900 focus:bg-white disabled:bg-slate-50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[9px] font-mono tracking-widest font-extrabold uppercase text-slate-400 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              placeholder="Your email address"
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
              className="w-full text-xs font-sans px-3 py-2.5 bg-white border border-slate-200 rounded-none focus:outline-none focus:border-slate-900 focus:bg-white disabled:bg-slate-50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-[9px] font-mono tracking-widest font-extrabold uppercase text-slate-400 mb-1.5">
              Brief Message
            </label>
            <textarea
              rows={4}
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              placeholder="What would you like to build together?"
              disabled={loading}
              className="w-full text-xs font-sans p-3 bg-white border border-slate-200 rounded-none focus:outline-none focus:border-slate-900 focus:bg-white disabled:bg-slate-50 transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-slate-900 hover:bg-blue-600 disabled:bg-slate-400 text-white rounded-none text-[10px] font-extrabold tracking-widest uppercase flex items-center justify-center gap-2 transition-all select-none cursor-pointer disabled:cursor-not-allowed mt-1.5"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-slate-300 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Submit Transmission</span>
              </>
            )}
          </button>
        </form>

        <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400 bg-slate-50 p-2.5 rounded-none border border-slate-100">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Feedback persistence enabled on active device profiles.</span>
        </div>
      </div>
    </div>
  );
}
