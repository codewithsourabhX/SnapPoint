import React from 'react';
import { Lock, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PrivacyPage: React.FC = () => {
  const { user, currentPage, setCurrentPage } = useApp();

  const handleBack = () => {
    // If authenticated user, go back to profile, otherwise go to landing page
    if (user && user.uid && user.uid !== 'guest-123') {
      setCurrentPage('profile');
    } else {
      setCurrentPage('landing');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 text-slate-800 dark:text-slate-200">
      {/* Back navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-xs font-semibold text-rose-500 hover:text-rose-400 hover:underline cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{user && user.uid && user.uid !== 'guest-123' ? 'Back to Profile' : 'Back to Home'}</span>
        </button>
      </div>

      {/* Switcher Widget */}
      <div className="flex bg-slate-100 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-200 dark:border-slate-800 gap-1 text-xs font-bold max-w-md">
        <button
          onClick={() => setCurrentPage('privacy')}
          className={`flex-1 py-2 px-3 rounded-lg text-center transition-all cursor-pointer ${
            currentPage === 'privacy' 
              ? 'bg-rose-600 text-white shadow-xs' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          Privacy Policy
        </button>
        <button
          onClick={() => setCurrentPage('terms')}
          className={`flex-1 py-2 px-3 rounded-lg text-center transition-all cursor-pointer ${
            currentPage === 'terms' 
              ? 'bg-rose-600 text-white shadow-xs' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          Terms of Use
        </button>
        <button
          onClick={() => setCurrentPage('cookies')}
          className={`flex-1 py-2 px-3 rounded-lg text-center transition-all cursor-pointer ${
            currentPage === 'cookies' 
              ? 'bg-rose-600 text-white shadow-xs' 
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
          }`}
        >
          Cookie Policy
        </button>
      </div>

      {/* Main card */}
      <div className="p-6 sm:p-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-8">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
              Effective from 23 July 2026
            </p>
          </div>
        </div>

        {/* Policy Body */}
        <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          
          <p className="font-medium">
            This Privacy Policy explains how SnapPoint Pvt. Ltd., registered in Delhi, India ("we", "us", or "our"), uses and protects your personal information when you use <a href="https://snappoint.in" className="text-rose-500 hover:underline">https://snappoint.in</a> (the "Platform") and the related services we offer (the "Services").
          </p>

          <p className="font-medium">
            We are committed to protecting your privacy and complying with all applicable data protection laws, including but not limited to the GDPR and applicable Indian laws, as well as U.S. federal and state data privacy laws where applicable.
          </p>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              1. WHAT INFORMATION WE COLLECT
            </h2>
            <p>
              We collect different types of information depending on how you use the Platform and the Services. Some of this information is provided directly by you, some is collected automatically when you access and use the Platform, and in limited cases, we receive information from others (for example, survey partners).
            </p>
            <p>
              Below are the categories of personal data we collect.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white mt-4">A. Data you provide directly</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-900 dark:text-white">Account Data:</strong> Your profile name, email address, password, and country (collected from your device, see Usage Data below). We use this information to create and manage your account.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Profile Data:</strong> Details such as your age, gender, education, employment status, household composition, and income range. We use this information to match you with surveys and tasks that fit your demographic profile.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Sensitive Profile Data:</strong> Details such as race/ethnicity, pregnancy status, and political opinions. Providing this information is optional. If you choose to provide it, we use it only to better match you with relevant surveys and tasks.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Payout Data:</strong> Depending on the payout method you choose, this may include: Full name, selected payout method, and email address. We use this information to process payouts and rewards.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Verification Data:</strong> To prevent fraud, we may request identity verification before releasing payouts. This may include: Facial scan, government-issued identification (where applicable), receipts, bank statements, payment confirmations. This information helps us validate your identity and protect the integrity of the Platform.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Communication & Support Data:</strong> Information you submit through contact forms, support tickets, email communications, and other customer support channels. This information is used to respond to your requests and improve our services.
              </li>
            </ul>

            <h3 className="font-bold text-slate-900 dark:text-white mt-4">B. Data We Collect Automatically</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-900 dark:text-white">Usage Data:</strong> Includes technical data (IP address, browser type, operating system, device identifiers, language settings, timestamps) used to ensure correct function and detect suspicious activity; and usage & performance data (pages visited, session duration, clicks, survey participation, completion status, eligibility, time spent) used to improve UX, monitor performance, and prevent abuse.
              </li>
            </ul>

            <h3 className="font-bold text-slate-900 dark:text-white mt-4">C. Data We Receive From Others</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong className="text-slate-900 dark:text-white">Authentication Partners:</strong> Google or Apple share Account Data on login to manage your account.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Survey & Reward Partners:</strong> Share participation details so we can verify completion and credit your account.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Payout Partners:</strong> Provide transaction confirmations.
              </li>
            </ul>

            <h3 className="font-bold text-slate-900 dark:text-white mt-4">D. California Mapping Table</h3>
            <div className="overflow-x-auto my-3 border border-slate-200 dark:border-slate-800 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="p-3 font-extrabold text-slate-900 dark:text-white">CCPA Category</th>
                    <th className="p-3 font-extrabold text-slate-900 dark:text-white">Personal Data Collected</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Identifiers</td>
                    <td className="p-3">Account Data, Usage Data, Payout Data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Protected Characteristics</td>
                    <td className="p-3">Profile Data, Sensitive Profile Data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Commercial Information</td>
                    <td className="p-3">Usage Data, Payout Data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Biometric Information</td>
                    <td className="p-3">Verification Data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Sensitive Personal Information</td>
                    <td className="p-3">Sensitive Profile Data, Verification Data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Internet Activity</td>
                    <td className="p-3">Usage Data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Geolocation Data</td>
                    <td className="p-3">Non-precise location derived from IP address</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Other Information</td>
                    <td className="p-3">Communication & Support Data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              2. HOW AND WHY WE USE YOUR INFORMATION
            </h2>
            <div className="overflow-x-auto my-3 border border-slate-200 dark:border-slate-800 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="p-3 font-extrabold text-slate-900 dark:text-white">Purpose</th>
                    <th className="p-3 font-extrabold text-slate-900 dark:text-white">Legal Basis</th>
                    <th className="p-3 font-extrabold text-slate-900 dark:text-white">Data Used</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Provide the Platform and Services</td>
                    <td className="p-3">Performance of our contract</td>
                    <td className="p-3">Account Data, Profile Data, Sensitive Profile Data, Payout Data, Verification Data, Communication & Support Data, Usage Data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Match you with surveys and tasks</td>
                    <td className="p-3">Contract performance and consent (where applicable)</td>
                    <td className="p-3">Account Data, Profile Data, Sensitive Profile Data, Usage Data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Improve the Platform</td>
                    <td className="p-3">Legitimate interests</td>
                    <td className="p-3">Usage Data, Communication & Support Data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Diagnose and resolve technical issues</td>
                    <td className="p-3">Contract performance</td>
                    <td className="p-3">Account Data, Profile Data, Usage Data, Communication & Support Data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Marketing communications</td>
                    <td className="p-3">Legitimate interests and consent where required</td>
                    <td className="p-3">Account Data, Usage Data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Fraud prevention and identity verification</td>
                    <td className="p-3">Legitimate interests and consent where applicable</td>
                    <td className="p-3">Account Data, Profile Data, Verification Data, Usage Data, Communication & Support Data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Process payouts</td>
                    <td className="p-3">Contract performance</td>
                    <td className="p-3">Account Data, Payout Data, Verification Data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Comply with tax, accounting and legal obligations</td>
                    <td className="p-3">Legal obligation</td>
                    <td className="p-3">Account Data, Profile Data, Sensitive Profile Data, Payout Data, Verification Data, Communication & Support Data, Usage Data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Respond to lawful requests from authorities</td>
                    <td className="p-3">Legal obligation and legitimate interests</td>
                    <td className="p-3">Account Data, Profile Data, Sensitive Profile Data, Payout Data, Verification Data, Communication & Support Data, Usage Data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Meet contractual obligations with survey partners</td>
                    <td className="p-3">Legitimate interests</td>
                    <td className="p-3">Account Data, Profile Data, Sensitive Profile Data, Payout Data, Verification Data, Usage Data</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-slate-900 dark:text-white font-bold">Establish or defend legal claims</td>
                    <td className="p-3">Legitimate interests</td>
                    <td className="p-3">Account Data, Profile Data, Sensitive Profile Data, Payout Data, Verification Data, Communication & Support Data, Usage Data</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              3. WHO WE SHARE INFORMATION WITH
            </h2>
            <p>
              We share your personal data only when it is necessary to operate the Platform, provide the Services, fulfill contractual obligations, or comply with applicable laws.
            </p>
            <p>
              Your profile name may be displayed on the Platform and visible to other users if you choose to participate in leaderboards or other community features.
            </p>
            <p>
              Depending on the activity, certain information may be shared with service providers, payout partners, survey and reward partners, group companies, law enforcement or government authorities, or during business transfers.
            </p>
            <p>
              <strong>Third-Party Survey Platforms:</strong> Some surveys are hosted by external partners. When you participate, you may be redirected to their platform. They act as independent data controllers; review their privacy policies before participating.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              4. INTERNATIONAL TRANSFERS
            </h2>
            <p>
              Some of our partners and providers may be located outside India or your country of residence. We apply safeguards, contractual agreements, and encryption where appropriate. Outside the EEA/UK, transfers are compliant with European Commission Adequacy Decisions or Standard Contractual Clauses (SCCs).
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              5. HOW LONG WE KEEP YOUR INFORMATION
            </h2>
            <p>
              We retain personal data as long as necessary to provide the Services, maintain accounts, resolve disputes, prevent fraud, and comply with law. You may request account deletion at any time. Payout-related records are retained for up to seven (7) years to comply with accounting and tax requirements.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              6. YOUR PRIVACY RIGHTS
            </h2>
            <p>
              Depending on your location, you may have rights to access, correct, delete, restrict, port, or object to processing of your personal data. We verify your identity before fulfilling requests to protect privacy.
            </p>
            <p>
              To exercise your rights, contact us at: <a href="mailto:support@snappoint.in" className="text-rose-500 hover:underline">support@snappoint.in</a>. You also have the right to lodge a complaint with your local data protection authority.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              7. CHILDREN'S PRIVACY
            </h2>
            <p>
              The Platform and Services are intended only for individuals 18 years of age or older. We do not knowingly collect information from anyone under 18. If you believe a child has used the platform, contact us at <a href="mailto:support@snappoint.in" className="text-rose-500 hover:underline">support@snappoint.in</a>.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              8. COOKIES AND TRACKING TECHNOLOGIES
            </h2>
            <p>
              We use cookies to operate, improve performance, remember preferences, and analyze traffic. Non-essential cookies require consent, which you can adjust through cookie settings. Refer to our Cookie Policy on our website.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              9. AUTOMATED DECISION-MAKING
            </h2>
            <p>
              We do not perform automated decision-making producing legal/significant effects without human involvement. We use automated systems for survey matching, fraud detection (identifying bots, scripts, duplicates), platform quality control, and fair opportunity distribution.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              10. HOW WE PROTECT YOUR INFORMATION
            </h2>
            <p>
              We use technical safeguards including transmission/storage encryption, secure cloud architecture, multi-factor authentication, and monitoring. In case of a legal notification-triggering breach, we will notify authorities and users.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 11 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              11. UPDATES TO THIS PRIVACY POLICY
            </h2>
            <p>
              We may update this Privacy Policy from time to time. The latest version will be available on the site, and we will notify users of material changes via email or in-app alerts. Continued use indicates acceptance.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 12 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              12. CONTACT US
            </h2>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 font-semibold space-y-1">
              <p className="text-slate-900 dark:text-white font-extrabold">SnapPoint Pvt. Ltd.</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Address: Delhi, India</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Email: <a href="mailto:support@snappoint.in" className="text-rose-500 hover:underline">support@snappoint.in</a></p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Website: <a href="https://snappoint.in" className="text-rose-500 hover:underline">https://snappoint.in</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
