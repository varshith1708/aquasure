import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  MapPin, 
  Award, 
  Heart, 
  ShieldCheck, 
  CheckCircle2, 
  CreditCard, 
  DollarSign, 
  X, 
  QrCode, 
  ArrowRight,
  Sparkles,
  Download
} from 'lucide-react';
import { mockEvents, mockLeaderboard, donationTiers } from '../data/mockCommunity';
import { useData } from '../context/DataContext';

export default function CommunityPage() {
  const { showToast } = useData();
  const [activeTab, setActiveTab] = useState('events'); // 'events', 'leaderboard', 'donate'

  // Volunteer Modal State
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [volunteerName, setVolunteerName] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');
  const [volunteerPhone, setVolunteerPhone] = useState('');

  // Donation State
  const [selectedTier, setSelectedTier] = useState(35);
  const [customAmount, setCustomAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donationSuccess, setDonationSuccess] = useState(null);

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    showToast(`Registered ${volunteerName} for "${selectedEvent.title}"! Details sent to ${volunteerEmail}`, 'success');
    setSelectedEvent(null);
    setVolunteerName('');
    setVolunteerEmail('');
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    const amount = customAmount ? Number(customAmount) : selectedTier;
    setDonationSuccess({
      name: donorName || "Civic Supporter",
      amount,
      date: new Date().toLocaleDateString(),
      transactionId: `AQUA-DON-${Math.floor(100000 + Math.random() * 900000)}`
    });
    showToast(`Thank you for your generous $${amount} donation to UN SDG 6!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aqua-100 text-aqua-800 dark:bg-aqua-950 dark:text-aqua-300 text-xs font-bold mb-3">
          <Users className="w-3.5 h-3.5" />
          <span>Civic Action & Community Network</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">
          Community Drives, Volunteers & Crowdfunding
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
          Join river restoration initiatives, support decentralized bio-sand filters, and celebrate our active citizen hydrologists.
        </p>

        {/* Tab Switcher */}
        <div className="flex justify-center mt-6">
          <div className="p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'events'
                  ? 'bg-white dark:bg-slate-900 text-ocean-800 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Clean-up Drives & Events
            </button>
            <button
              onClick={() => setActiveTab('leaderboard')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'leaderboard'
                  ? 'bg-white dark:bg-slate-900 text-ocean-800 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Volunteer Leaderboard
            </button>
            <button
              onClick={() => setActiveTab('donate')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'donate'
                  ? 'bg-white dark:bg-slate-900 text-ocean-800 dark:text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Sponsor Clean Water
            </button>
          </div>
        </div>
      </div>

      {/* TAB 1: Events & Drives */}
      {activeTab === 'events' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:border-aqua-500/50 transition-all space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-ocean-100 text-ocean-800 dark:bg-ocean-950 dark:text-aqua-300">
                      {evt.category}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      {evt.region}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    {evt.title}
                  </h3>

                  <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    <p className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-aqua-600 dark:text-aqua-400" />
                      <span>{evt.date} • {evt.time}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-aqua-600 dark:text-aqua-400" />
                      <span>{evt.location}</span>
                    </p>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {evt.description}
                  </p>

                  {/* Volunteer Slots Progress */}
                  <div className="space-y-1 pt-2">
                    <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                      <span>Volunteers Registered</span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {evt.volunteersRegistered} / {evt.volunteersNeeded} slots
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-ocean-600 to-aqua-500 rounded-full"
                        style={{ width: `${Math.min(100, (evt.volunteersRegistered / evt.volunteersNeeded) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>Certificate Provided</span>
                  </div>
                  <button
                    onClick={() => setSelectedEvent(evt)}
                    className="px-5 py-2.5 rounded-xl bg-ocean-800 hover:bg-ocean-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
                  >
                    Join Volunteer Drive
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: Volunteer Leaderboard */}
      {activeTab === 'leaderboard' && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                  Civic Water Guardians Leaderboard
                </h3>
                <p className="text-xs text-slate-400">
                  Top community contributors ranked by verified hazard reports and community testing points.
                </p>
              </div>
              <span className="p-2 rounded-xl bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 font-bold text-xs flex items-center gap-1">
                <Award className="w-4 h-4" /> 2026 Honor Roll
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {mockLeaderboard.map((user) => (
                <div
                  key={user.rank}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                      user.rank === 1 ? 'bg-amber-400 text-slate-950' :
                      user.rank === 2 ? 'bg-slate-300 text-slate-950' :
                      user.rank === 3 ? 'bg-amber-600 text-white' :
                      'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      #{user.rank}
                    </span>

                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-aqua-500/30"
                    />

                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                        {user.name}
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-aqua-100 text-aqua-800 dark:bg-aqua-950 dark:text-aqua-300">
                          {user.badge}
                        </span>
                      </h4>
                      <p className="text-xs text-slate-400">
                        {user.role} • {user.region}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 sm:text-right pl-12 sm:pl-0">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Verified Reports</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{user.reportsVerified}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Water Conserved</span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{user.litersConservedEstimate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Civic Points</span>
                      <span className="text-sm font-black text-ocean-700 dark:text-aqua-300">{user.points}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Crowdfunding & Donation (Mock UI) */}
      {activeTab === 'donate' && (
        <div className="max-w-4xl mx-auto space-y-8">
          
          {!donationSuccess ? (
            <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
              
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-ocean-600 dark:text-aqua-400">
                  Tax-Deductible Civic Impact
                </span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  Sponsor Clean Drinking Water Infrastructure
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  100% of public contributions directly fund community bio-sand filters, school hygiene stations, and emergency testing kits.
                </p>
              </div>

              {/* Tiers Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {donationTiers.map((tier) => {
                  const isSelected = selectedTier === tier.amount && !customAmount;
                  return (
                    <div
                      key={tier.id}
                      onClick={() => {
                        setSelectedTier(tier.amount);
                        setCustomAmount('');
                      }}
                      className={`p-5 rounded-3xl border cursor-pointer transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-aqua-500 bg-aqua-50/70 dark:bg-aqua-950/60 ring-2 ring-aqua-500 shadow-md'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-black text-slate-900 dark:text-white">
                            ${tier.amount}
                          </span>
                          {tier.popular && (
                            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                              Most Popular
                            </span>
                          )}
                        </div>
                        <h4 className="text-xs font-bold text-ocean-800 dark:text-aqua-300">
                          {tier.label}
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                          {tier.impact}
                        </p>
                      </div>

                      <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-[10px] font-semibold text-slate-400">
                        Badge: {tier.badge}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Amount */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Or Custom Gift:</span>
                <div className="relative">
                  <span className="text-xs font-bold text-slate-400 absolute left-3 top-2.5">$</span>
                  <input
                    type="number"
                    min="5"
                    placeholder="Enter USD"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="pl-7 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white w-32 focus:outline-none focus:ring-2 focus:ring-aqua-500"
                  />
                </div>
              </div>

              {/* Mock Payment Form */}
              <form onSubmit={handleDonationSubmit} className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                      Email Address (For Tax Receipt)
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="donor@example.com"
                      value={donorEmail}
                      onChange={(e) => setDonorEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Payment Method Switcher */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-2">
                    Payment Gateway (Mock)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'card', label: 'Credit Card / Debit', icon: CreditCard },
                      { id: 'upi', label: 'UPI / Instant QR', icon: QrCode },
                      { id: 'paypal', label: 'PayPal Global', icon: Heart }
                    ].map(pm => {
                      const Icon = pm.icon;
                      return (
                        <button
                          type="button"
                          key={pm.id}
                          onClick={() => setPaymentMethod(pm.id)}
                          className={`p-3 rounded-2xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                            paymentMethod === pm.id
                              ? 'border-aqua-500 bg-aqua-50 dark:bg-aqua-950/60 text-ocean-900 dark:text-white ring-2 ring-aqua-500'
                              : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{pm.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-aqua-600 hover:from-emerald-700 hover:to-aqua-700 text-white font-black text-sm shadow-xl shadow-emerald-500/20 transition-all cursor-pointer"
                >
                  Confirm Contribution (${customAmount || selectedTier})
                </button>
              </form>

            </div>
          ) : (
            /* Donation Confirmation Certificate Card */
            <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-500 shadow-2xl text-center space-y-6 animate-in fade-in">
              <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[11px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  Official Contribution Certificate
                </span>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white mt-2">
                  Thank You, {donationSuccess.name}!
                </h3>
                <p className="text-xs text-slate-500 mt-1 font-mono">
                  Receipt Ref: {donationSuccess.transactionId} • {donationSuccess.date}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 text-xs max-w-lg mx-auto text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount Contributed:</span>
                  <span className="font-bold text-slate-900 dark:text-white">${donationSuccess.amount} USD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Cause Allocation:</span>
                  <span className="font-bold text-emerald-600">UN SDG 6 Clean Water & Sanitation</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tax Exemption:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">501(c)(3) / 80G Certified</span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Print Official Certificate</span>
                </button>
                <button
                  onClick={() => setDonationSuccess(null)}
                  className="px-5 py-2.5 rounded-xl bg-ocean-800 text-white text-xs font-bold hover:bg-ocean-700"
                >
                  Make Another Gift
                </button>
              </div>
            </div>
          )}

        </div>
      )}

      {/* Volunteer Registration Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-5 right-5 p-1 rounded-lg text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-aqua-600">
                Volunteer Enrollment
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                {selectedEvent.title}
              </h3>
              <p className="text-xs text-slate-500">
                📅 {selectedEvent.date} • {selectedEvent.time}
              </p>
            </div>

            <form onSubmit={handleVolunteerSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Priya Sharma"
                  value={volunteerName}
                  onChange={(e) => setVolunteerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="priya@example.com"
                  value={volunteerEmail}
                  onChange={(e) => setVolunteerEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1">
                  Phone (For WhatsApp Field Coordination)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98000 00000"
                  value={volunteerPhone}
                  onChange={(e) => setVolunteerPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-ocean-800 hover:bg-ocean-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer mt-2"
              >
                Confirm Field Registration
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
