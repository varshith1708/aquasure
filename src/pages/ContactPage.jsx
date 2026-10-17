import React, { useState } from 'react';
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  AlertTriangle,
  Globe,
  HelpCircle
} from 'lucide-react';
import { useData } from '../context/DataContext';

export default function ContactPage() {
  const { showToast } = useData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [category, setCategory] = useState('quality');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const hotlines = [
    { region: "National Central Crisis Center", number: "1800-120-WATER (Toll Free)", timing: "24/7 Continuous Emergency" },
    { region: "North Zone Dispatch", number: "+91 11 2389 4400", timing: "06:00 AM - 10:00 PM" },
    { region: "Central Valley Water Board", number: "+91 755 244 8900", timing: "08:00 AM - 08:00 PM" },
    { region: "Coastal District MetroWater", number: "+91 44 4567 8901", timing: "24/7 Flood & Salinity Line" },
    { region: "Eastern Highlands Grievance Desk", number: "+91 33 2214 5500", timing: "08:00 AM - 09:00 PM" },
    { region: "Metro South BWSSB Rapid Line", number: "+91 80 2294 5100", timing: "24/7 Pipeline Emergency" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast("Your inquiry has been submitted! A response will be sent within 24 hours.", "success");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-ocean-100 text-ocean-800 dark:bg-ocean-950 dark:text-aqua-300 text-xs font-bold mb-3">
          <PhoneCall className="w-3.5 h-3.5" />
          <span>24/7 Rapid Assistance</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Emergency Helplines & Civic Contact Desk
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Reach zonal water authorities, request emergency tanker relief, or contact our volunteer coordination desk.
        </p>
      </div>

      {/* Hotlines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotlines.map((h, idx) => (
          <div
            key={idx}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-start gap-3.5"
          >
            <div className="w-10 h-10 rounded-2xl bg-red-50 dark:bg-red-950/60 flex items-center justify-center text-red-500 shrink-0">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {h.region}
              </p>
              <a
                href={`tel:${h.number.replace(/\D/g, '')}`}
                className="font-bold text-sm text-slate-900 dark:text-white hover:text-ocean-600 dark:hover:text-aqua-400 block mt-0.5"
              >
                {h.number}
              </a>
              <span className="text-[10px] text-slate-500 flex items-center gap-1 mt-1">
                <Clock className="w-3 h-3" />
                {h.timing}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Inquiry Form */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Send a General Inquiry or Partnership Request
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            For pipeline leaks or contaminated water, please use the <strong>Report Issue</strong> tab for official ticket tracking.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Ranganathan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="anand@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Phone Number (Optional)</label>
                <input
                  type="tel"
                  placeholder="+91 98000 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Subject Topic</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                >
                  <option value="quality">Water Quality Inquiries</option>
                  <option value="volunteer">Volunteer Chapter Registration</option>
                  <option value="partnership">School / NGO Partnership</option>
                  <option value="media">Press & Academic Research Data</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-200 mb-1">Your Message</label>
              <textarea
                required
                rows={4}
                placeholder="Type your question or proposal details..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-ocean-800 to-aqua-600 hover:from-ocean-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Message</span>
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl animate-in fade-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
            <h4 className="font-bold text-base text-slate-900 dark:text-white">Message Received!</h4>
            <p className="text-xs text-slate-500">
              Thank you, {name}. A member of our community support team will reach out at {email}.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setMessage('');
              }}
              className="mt-2 text-xs font-bold text-aqua-600 dark:text-aqua-400 hover:underline"
            >
              Send Another Inquiry
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
