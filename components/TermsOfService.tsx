import React from 'react';
import { X } from 'lucide-react';

interface TermsOfServiceProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsOfService: React.FC<TermsOfServiceProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-[#010103] border border-[#1e2433] rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#010103] border-b border-[#1e2433] flex items-center justify-between p-8 z-50">
          <h1 className="text-3xl font-bold font-display text-[#e8eaf0] tracking-tight">
            Terms of Service
          </h1>
          <button
            onClick={onClose}
            className="text-[#8892aa] hover:text-[#e8eaf0] transition-colors p-2"
          >
            <X size={28} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 text-[#8892aa] space-y-8">
          {/* Last Updated */}
          <div className="text-sm font-mono text-[#5a6178]"><strong>Last updated:</strong> February 18, 2026</div>

          {/* Intro */}
          <p className="text-base leading-relaxed">
            Welcome to leaderboat.xyz ("leaderboat," "we," "our," or "us"). These Terms of Service ("Terms") govern your access to and use of the leaderboat website, services, applications, wagering races, bonus programs, and any related content (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree, you must not use the Service.
          </p>

          <hr className="border-[#1e2433]" />

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#e8eaf0] font-display">1. Purpose of the Service</h2>
            <p className="leading-relaxed">
              leaderboat exists for the purpose of providing promotional bonuses, wager races, and lossback rewards to users who support Boat. The Service distributes promotional funds that users would not otherwise receive independently.
            </p>
            <p className="leading-relaxed">
              All bonuses, rewards, and lossback payments are discretionary promotional incentives. Users must not expect guaranteed returns, guaranteed profit, or guaranteed compensation of any kind.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#e8eaf0] font-display">2. Eligibility</h2>
            <p className="leading-relaxed">
              You must be at least <strong>18 years old</strong> (or the minimum legal gambling age in your jurisdiction, whichever is higher) to use the Service. By using leaderboat, you represent and warrant that:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>You meet the legal age requirement;</li>
              <li>Online gambling and wagering are legal in your jurisdiction;</li>
              <li>You have the legal capacity to enter into a binding agreement.</li>
            </ul>
            <p className="leading-relaxed">We reserve the right to request proof of age or identity at any time.</p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#e8eaf0] font-display">3. Nature of Bonuses and No Guarantee</h2>
            <p className="leading-relaxed">All bonuses, deposit bonuses, race rewards, and lossback offers:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Are <strong>not guaranteed</strong>;</li>
              <li>Are promotional and discretionary;</li>
              <li>May be modified, reduced, paused, revoked, or discontinued at any time;</li>
              <li>May be declared <strong>void</strong> due to abuse, fraud, technical error, insufficient profit, or rule violations.</li>
            </ul>
            <p className="leading-relaxed">Participation in any race or bonus program does <strong>not</strong> create a contractual right to payment unless explicitly confirmed by leaderboat.</p>
            <p className="leading-relaxed">Payouts are processed <strong>in order</strong> and are subject to available profit and operational capacity. There is <strong>no guaranteed payout timeline</strong>, and leaderboat makes no representation regarding how long any payout may take.</p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#e8eaf0] font-display">4. Account Registration</h2>
            <p className="leading-relaxed">To access certain features, you may be required to create an account or connect third-party gambling accounts. You agree to:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Provide accurate, current, and complete information;</li>
              <li>Maintain the security of your login credentials;</li>
              <li>Accept responsibility for all activities under your account;</li>
              <li>Notify us immediately of any unauthorized use.</li>
            </ul>
            <p className="leading-relaxed">We may suspend, restrict, or permanently terminate accounts at our sole discretion.</p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#e8eaf0] font-display">5. Deposit Bonus and Lossback Eligibility Requirements</h2>
            <p className="leading-relaxed">To be eligible for <strong>any deposit bonus, lossback, race reward, or promotional payment</strong>, you must strictly comply with all of the following requirements:</p>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li>Open a support ticket in the official leaderboat Discord server;</li>
              <li>Clearly notify administrators of your intent to participate <strong>before depositing, wagering, or playing</strong>;</li>
              <li>Receive explicit written approval from an administrator prior to depositing or wagering.</li>
            </ol>
            <p className="leading-relaxed">If you deposit, wager, or participate <strong>before receiving approval</strong>, you will:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Be automatically ineligible for any related bonus or lossback;</li>
              <li>Have no claim to payment;</li>
              <li>Not be paid retroactively.</li>
            </ul>
            <p className="leading-relaxed">Administrator decisions regarding eligibility, approval, or denial are <strong>final and non-appealable</strong>.</p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#e8eaf0] font-display">6. Anti-Abuse, Bots, and Prohibited Conduct</h2>
            <p className="leading-relaxed">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Use bots, scripts, automation, artificial intelligence tools, or any automated wagering methods;</li>
              <li>Engage in multi-accounting, VPN abuse, identity masking, or account sharing;</li>
              <li>Manipulate wager volume, races, or leaderboards artificially;</li>
              <li>Engage in fraud, collusion, money laundering, or exploitative strategies;</li>
              <li>Circumvent approval requirements or bonus rules.</li>
            </ul>
            <p className="leading-relaxed">leaderboat may, at its sole discretion and without notice:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Disqualify wagers or race entries;</li>
              <li>Void bonuses or rewards;</li>
              <li>Ban, suspend, or permanently block accounts;</li>
              <li>Withhold, delay, or cancel payments where abuse is suspected.</li>
            </ul>
            <p className="leading-relaxed">No warning is required prior to enforcement action.</p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#e8eaf0] font-display">7. Third-Party Gambling Platforms</h2>
            <p className="leading-relaxed">leaderboat may reference or integrate with third-party gambling platforms. leaderboat:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Does not operate those platforms;</li>
              <li>Does not control their games, odds, or payouts;</li>
              <li>Is not responsible for gambling losses, disputes, account closures, or platform errors.</li>
            </ul>
            <p className="leading-relaxed">Your gambling activity is conducted entirely at your own risk.</p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#e8eaf0] font-display">8. Suspension, Termination, and Void Results</h2>
            <p className="leading-relaxed">leaderboat may suspend, terminate, restrict, or void participation at any time for any reason, including but not limited to:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Suspected abuse or bot activity;</li>
              <li>Violation of these Terms;</li>
              <li>Legal or regulatory concerns;</li>
              <li>Technical or tracking errors;</li>
              <li>Insufficient profitability of promotions.</li>
            </ul>
            <p className="leading-relaxed">We reserve the absolute right to void race results or cancel bonuses where fairness, integrity, or sustainability is in question.</p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#e8eaf0] font-display">9. Disclaimers</h2>
            <p className="leading-relaxed">The Service is provided <strong>"as is"</strong> and <strong>"as available."</strong> leaderboat makes no warranties, express or implied, including but not limited to:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Guaranteed bonuses;</li>
              <li>Guaranteed profit or returns;</li>
              <li>Guaranteed payout timing;</li>
              <li>Continuous availability of races or promotions.</li>
            </ul>
            <p className="leading-relaxed">All participation is voluntary and at your own risk.</p>
          </section>

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#e8eaf0] font-display">10. Limitation of Liability</h2>
            <p className="leading-relaxed">To the maximum extent permitted by law, leaderboat shall not be liable for:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Gambling losses;</li>
              <li>Missed bonuses or disqualified rewards;</li>
              <li>Delayed payouts;</li>
              <li>Indirect or consequential damages;</li>
              <li>Loss of profits, revenue, or goodwill.</li>
            </ul>
            <p className="leading-relaxed">Total liability shall not exceed the amount you paid directly to leaderboat in the prior 12 months, or <strong>$0</strong> if you paid nothing.</p>
          </section>

          {/* Section 11 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#e8eaf0] font-display">11. Indemnification</h2>
            <p className="leading-relaxed">You agree to defend, indemnify, and hold harmless leaderboat from any claims, damages, losses, or expenses arising from:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Your gambling activities;</li>
              <li>Your breach of these Terms;</li>
              <li>Fraudulent, abusive, or automated conduct;</li>
              <li>Disputes with third-party platforms.</li>
            </ul>
          </section>

          {/* Section 12 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#e8eaf0] font-display">12. Changes to the Service or Terms</h2>
            <p className="leading-relaxed">leaderboat may modify, suspend, or discontinue any part of the Service at any time without notice. Updated Terms become effective upon posting. Continued use constitutes acceptance.</p>
          </section>

          {/* Section 13 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#e8eaf0] font-display">13. Governing Law</h2>
            <p className="leading-relaxed">These Terms shall be governed by the laws of the jurisdiction in which the Service operator is legally established, without regard to conflict of law principles.</p>
          </section>

          {/* Section 14 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#e8eaf0] font-display">14. Entire Agreement</h2>
            <p className="leading-relaxed">These Terms constitute the entire agreement between you and leaderboat regarding the Service and supersede all prior agreements.</p>
          </section>

          {/* Footer */}
          <div className="pt-8 border-t border-[#1e2433] text-center text-sm font-mono text-[#5a6178]">
            <p>© 2026 leaderboat.xyz. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;