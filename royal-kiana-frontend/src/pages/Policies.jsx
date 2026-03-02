import { motion } from 'framer-motion';

const Policies = () => {
  return (
    <div className="pt-20 min-h-screen bg-gray-50 dark:bg-dark-900">
      <section className="relative py-20 bg-gradient-to-br from-primary-500 to-primary-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Hotel Policies
            </h1>
            <p className="text-xl text-white/90">Terms and conditions for your stay</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="card-premium">
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Check-in & Check-out
              </h2>
              <ul className="space-y-2 text-gray-600 dark:text-white/70">
                <li>• Check-in time: 2:00 PM</li>
                <li>• Check-out time: 12:00 PM (Noon)</li>
                <li>• Early check-in and late check-out subject to availability</li>
                <li>• Valid ID required at check-in</li>
                <li>• Credit card or cash deposit required for incidentals</li>
              </ul>
            </div>

            <div className="card-premium">
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Cancellation Policy
              </h2>
              <ul className="space-y-2 text-gray-600 dark:text-white/70">
                <li>• Free cancellation up to 48 hours before check-in</li>
                <li>• Cancellations within 48 hours: 50% charge</li>
                <li>• No-shows: Full charge</li>
                <li>• Refunds processed within 7-10 business days</li>
              </ul>
            </div>

            <div className="card-premium">
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Payment Policy
              </h2>
              <ul className="space-y-2 text-gray-600 dark:text-white/70">
                <li>• Payment accepted: Cash, Bank Transfer, Debit/Credit Cards</li>
                <li>• Full payment required at check-in</li>
                <li>• Prices quoted in Nigerian Naira (₦)</li>
                <li>• All rates are subject to applicable taxes</li>
              </ul>
            </div>

            <div className="card-premium">
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                House Rules
              </h2>
              <ul className="space-y-2 text-gray-600 dark:text-white/70">
                <li>• No smoking in rooms (designated smoking areas available)</li>
                <li>• No pets allowed</li>
                <li>• Quiet hours: 10:00 PM - 7:00 AM</li>
                <li>• Maximum occupancy per room must be respected</li>
                <li>• Visitors must register at reception</li>
                <li>• Guests responsible for any damages to hotel property</li>
              </ul>
            </div>

            <div className="card-premium">
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Children & Extra Beds
              </h2>
              <ul className="space-y-2 text-gray-600 dark:text-white/70">
                <li>• Children under 12 stay free with parents</li>
                <li>• Extra bed available on request (additional charge applies)</li>
                <li>• Crib available for infants (free of charge)</li>
                <li>• Maximum 1 extra bed per room</li>
              </ul>
            </div>

            <div className="card-premium">
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Safety & Security
              </h2>
              <ul className="space-y-2 text-gray-600 dark:text-white/70">
                <li>• 24/7 security and CCTV surveillance</li>
                <li>• Safe deposit boxes available</li>
                <li>• Fire safety equipment in all rooms</li>
                <li>• Emergency exits clearly marked</li>
                <li>• Hotel not liable for lost or stolen items</li>
              </ul>
            </div>

            <div className="card-premium">
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Privacy Policy
              </h2>
              <p className="text-gray-600 dark:text-white/70 mb-4">
                Royal Kiana Hotel respects your privacy. Personal information collected during booking 
                and stay is used solely for hotel operations and will not be shared with third parties 
                without consent.
              </p>
              <ul className="space-y-2 text-gray-600 dark:text-white/70">
                <li>• Guest information kept confidential</li>
                <li>• Data stored securely</li>
                <li>• Marketing communications opt-in only</li>
                <li>• Right to request data deletion</li>
              </ul>
            </div>

            <div className="card-premium bg-primary-500/10 border-primary-500/30">
              <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600 dark:text-white/70 mb-4">
                For questions about our policies or to discuss special requirements:
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-white/50">Phone</p>
                    <a href="tel:07070279453" className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 font-medium">07070279453</a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-white/50">Email</p>
                    <a href="mailto:adejiboladc24@gmail.com" className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 font-medium">adejiboladc24@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-white/50">Address</p>
                    <p className="text-gray-900 dark:text-white font-medium">12, Olayinka Olugoke Str, Idmu Pipeline, Lagos, Nigeria</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Policies;
