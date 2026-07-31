import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TermsPage: React.FC = () => {
  const { user, currentPage, setCurrentPage } = useApp();

  const handleBack = () => {
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
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Terms of Service
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
              Effective from November 2025 • Market: India
            </p>
          </div>
        </div>

        {/* Terms Body */}
        <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              1. Scope of the Terms of Use
            </h2>
            <p>The following terms and conditions govern your use of the Services provided by SnapPoint Private Limited.</p>
            <p>
              <strong>1.1.</strong> The provider is SnapPoint Private Limited, Sveavägen 17, 111 57 Jaipur, India (together with its affiliates, "Provider").
            </p>
            <p>
              <strong>1.2.</strong> The Provider operates SnapPoint ("Platform"), that enables you and other registered users ("Members") to participate in product testing assignments arranged between you and external advertising partners ("Tasks"). These Tasks may include online surveys, product tests, app tests, and website tests. By actively participating in and fulfilling these Tasks in accordance with the following provisions, you may earn remuneration or other benefits.
            </p>
            <p>
              <strong>1.3.</strong> These services offered by the Provider ("Services") through the Platform are accessible via the internet through both a mobile application ("Mobile App") and a browser-based application ("Web App"; the Mobile App and Web App are collectively referred to as the "App").
            </p>
            <p>
              <strong>1.4.</strong> These Terms of Use are a binding legal contract between Provider and "you", and govern your access to and use of the Services.
            </p>
            
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-slate-800 dark:text-amber-300 space-y-2">
              <p className="text-[10px] uppercase tracking-widest text-amber-600 dark:text-amber-500">IMPORTANT - PLEASE READ CAREFULLY</p>
              <p className="leading-relaxed">
                By agreeing to these Terms of Use, or by accessing, registering for an Account, downloading or using our Apps, performing Tasks, providing information through, or generally using the Platform, you indicate that you have both read and accept these Terms of Use. If you do not agree with any of these Terms of Use, do not access or otherwise use the Platform, register an Account, or provide us with any information about you.
              </p>
              <p className="leading-relaxed font-semibold">
                These Terms of Use contain a dispute resolution [and arbitration provision], including a class action waiver (See clause 13.3) that affects your rights. These provisions apply solely to the extent applicable in your jurisdiction.
              </p>
            </div>

            <p>
              <strong>1.5.</strong> The sole language available for concluding the contract in the U.S. and Indian market is English.
            </p>
            <p>
              <strong>1.6.</strong> Your own terms and conditions of business shall not become part of the usage relationship between the Provider and you, even if not expressly rejected by the Provider.
            </p>
            <p>
              <strong>1.7.</strong> These Terms of Use exclusively govern the contractual relationship between the Provider and you. If you download the Mobile App from the Apple Inc. App Store or the Google LLC Play Store, Apple Inc. and Google LLC shall not be deemed parties to these Terms of Use and shall not be responsible for the content of the Mobile App.
            </p>
            <p>
              Provider is responsible for all obligations towards users under these Terms of Use, including payments, refunds, and customer payouts. Prime Insights AB, c/o Aonic AB (publ), Sveavägen 17, 111 57 Jaipur, India, registered at the Swedish Companies Registration Office (Bolagsverket) under 559537-0676 ("Prime Insights"), as the parent company of Provider, may, at its discretion, fulfil such obligations directly, in whole or in part, including making any payments or other direct disbursements to you. Any performance by Prime Insights shall fully discharge Provider's corresponding obligations to the same extent.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              2. Registration for the Services
            </h2>
            <p>To access and use the Services, you must register for an Account in accordance with the following provisions.</p>
            <p>
              <strong>2.1.</strong> Visitors may access the Platform in accordance with these Terms of Use but in order to have full access to and use of the Services, you are required to register an account ("Account").
            </p>
            <p>
              <strong>2.2.</strong> The Platform and the Services are for personal, non-commercial use only. You are permitted to have only one Account.
            </p>
            <p>
              <strong>2.3.</strong> You are obligated to provide accurate and complete information during the registration of an Account. By registering an Account, you represent that you are not barred from using the Services under these Terms of Use, under the laws of India or your place of residence, or under any other applicable jurisdiction. You agree to maintain and promptly update your registration data to keep it true, accurate, current and complete. If you provide any information (or Provider has reasonable grounds to suspect) that is untrue, inaccurate, not current or incomplete, Provider has the right to suspend or terminate your Account and refuse any and all current or future use of the Services (or any portion thereof) by you for breach. You agree not to create an Account or use the Services if you have been previously removed by Provider, or if you have been previously banned from any of the Provider internet properties.
            </p>
            <p>
              <strong>2.4.</strong> Prior to completing the registration process, you will be provided with technical means to review and correct your entries. You may cancel the registration at any time before its completion.
            </p>
            <p>
              <strong>2.5.</strong> Immediately upon completion of the registration process, you will receive an email from Provider to the email address provided at registration, containing an activation link. The activation link is valid for the period specified in the email. If you fail to activate your Account by confirming the activation link within the specified period, the link will expire, and you will be required to restart the registration process.
            </p>
            <p>
              <strong>2.6.</strong> Upon timely confirmation of your email address, Provider will send you an email confirming your successful registration. Provider's Terms of Use will be attached to or included in the confirmation email sent to the email address provided during registration.
            </p>
            <p>
              <strong>2.7.</strong> You may also register your Account via single sign-on ("SSO"). We currently offer registration via the SSO service providers listed on the Provider's website. The use of SSO may be subject to the terms of use and privacy policies of the respective SSO service providers. Any issues relating to the SSO login process must be addressed with the relevant provider.
            </p>
            <p>
              <strong>2.8.</strong> You may terminate your Account at any time. When you terminate your Account, all of your active Tasks will also be terminated. The Provider is entitled to delete Accounts that are considered inactive, meaning Accounts where you have not logged in for a period of more than twelve (12) months.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              3. Changes to the Services and the Terms of Use
            </h2>
            <p>Provider reserves the right to modify the Services and these Terms of Use as described below.</p>
            <p>
              <strong>3.1.</strong> Provider reserves the right to make formal or editorial changes and updates to the hyperlinks included in these Terms of Use at any time without prior notice. Provider can change, update, add or remove provisions of these Terms of Use by posting the updated Terms of Use, and by providing a notice on the Platform. We will ask for your express consent to the updated Terms of Use where we are legally required to do so, and our notice to you will explain how you can accept or reject the changes. If you do not agree with any of the updated Terms of Use, you must stop using the Services. Continued use of the Services following notice of any modifications indicates that you acknowledge and agree to be bound by the modifications. Unless otherwise required by law, the updated Terms of Use are effective as of the day of posting.
            </p>
            <p>
              <strong>3.2.</strong> Provider reserves the right to make changes to the Services, at any time and without your prior consent. If you object to any changes to the Services, your sole recourse will be to cease using the Services. Continued use of the Services following posting of any such changes will indicate your acknowledgement of such changes and satisfaction with the Services as modified. We also reserve the right to discontinue the Services, or any component of it or content therein, at any time without notice to you. We will not be liable to you or any third party should we exercise our right to modify or discontinue the Services.
            </p>
            <p>
              <strong>3.3.</strong> Certain features of the Services may be subject to additional legal terms ("Additional Terms"), which shall be provided to you at the moment you choose to use such features or services. By using such features, or any part thereof, you agree to be bound by the Additional Terms applicable to such features. Additional Terms are hereby incorporated by reference, and in the event that any of the Additional Terms governing such features conflict with these Terms of Use, the Additional Terms will govern.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              4. Your General Obligations
            </h2>
            <p>When using the Services, you must comply with the following obligations.</p>
            <p>
              <strong>4.1.</strong> When using the Services, you must refrain from any unlawful conduct, violations of applicable laws, and/or infringements or violations of third-party rights.
            </p>
            <p>
              <strong>4.2.</strong> If you have an Account, you are obliged to:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>(a) ensure that your access credentials are not made accessible to any third party,</li>
              <li>(b) use a secure password for your Account, and</li>
              <li>(c) immediately notify Provider in text form upon becoming aware of any misuse of your Account, so that access can be blocked without undue delay.</li>
            </ul>
            <p>
              You are responsible for all activities carried out under your Account, including those carried out by third parties, to the extent that you are responsible for enabling such use or could have prevented it with reasonable care.
            </p>
            <p>
              <strong>4.3.</strong> You shall keep the operating system and/or browser you use for accessing the Services up to date.
            </p>
            <p>
              <strong>4.4.</strong> You are responsible for installing updates for the Apps, including updates for any plugins or similar required for the use of the Apps, within a reasonable period. If you fail to do so after Provider has informed you of the update's availability and the consequences of not installing it, Provider shall not be responsible for any defects in the Apps resulting from your failure to install the update. If you are unable to properly install the update based on the information provided, you are obligated to promptly notify Provider accordingly.
            </p>
            <p>
              <strong>4.5.</strong> You are not permitted to interfere with or manipulate the data flow of the Services nor to add or derive data through your own interfaces. Access to the data in the Services is permitted exclusively via the user interfaces provided by Provider.
            </p>
            <p>
              <strong>4.6.</strong> You must use the Services in accordance with these Terms of Use. In particular and unless otherwise explicitly allowed by applicable law, you are not permitted to perform any actions including: robotic crawling/scraping, DDoS system abuse, uploading malware, falsifying screenshots or verification evidence, making copyright-infringing uploads, connection obfuscation/VPN usage, bad-faith survey responses, performing tasks outside of your country of residence, resell or trade account access, or publishing URLs/details of tasks.
            </p>
            <p>
              <strong>4.7.</strong> Provider reserves the right to temporarily or permanently suspend your access to your Account if you provide false information, or if your account shows signs of fraud/abuse, or if there is any other legitimate interest.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              5. Participation in Tasks
            </h2>
            <p>As a Member, you may participate in various Tasks offered through the Platform.</p>
            <p>
              <strong>5.1.</strong> Upon successfully registering your Account, you may participate in Tasks (evaluations, surveys, app tests).
            </p>
            <p>
              <strong>5.2.</strong> The Provider gives you the option to provide additional profile details and complete identity verification to unlock specific premium tasks.
            </p>
            <p>
              <strong>5.3.</strong> Invitations to Tasks are sent at the sole discretion of the Provider; you have no absolute right to receive invitations.
            </p>
            <p>
              <strong>5.4.</strong> You are not bound by location or time (except for deadlines in descriptions) and decide how to carry out tasks independently. No employment relationship is created.
            </p>
            <p>
              <strong>5.5.</strong> Partner Terms of third-party advertising partners take precedence over these Terms of Use for specific Tasks.
            </p>
            <p>
              <strong>5.6.</strong> Responses must be personal, objective, and completed in good faith without the use of bots or scripts.
            </p>
            <p>
              <strong>5.7.</strong> Remuneration will be credited to your Account upon full, valid completion of a Task in accordance with requirements.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              6. Remuneration
            </h2>
            <p>
              <strong>6.1.</strong> Remuneration is granted only after a Task is fully completed and verified.
            </p>
            <p>
              <strong>6.2.</strong> You can request a payout of your balance once the minimum payout threshold is reached. Payouts are sent using available methods (like UPI or PayPal) which are subject to third-party terms.
            </p>
            <p>
              <strong>6.3.</strong> Gift card rewards are subject to the terms and conditions of their respective issuers.
            </p>
            <p>
              <strong>6.4.</strong> The Provider reserves the right to deny or withhold remuneration in case of invalid, duplicate, fraudulent, or bad-faith completions, or material breaches.
            </p>
            <p>
              <strong>6.5.</strong> For fraud prevention, a Verification Procedure (which may involve biometric identity scans) may be required before releasing payouts.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              7. Term and Termination
            </h2>
            <p>
              <strong>7.1.</strong> The contract is indefinite but you may deactivate or permanently delete your account at any time.
            </p>
            <p>
              <strong>7.2.</strong> The Provider can terminate with one month's notice, or close inactive accounts (no login for 12+ months) after prior warning.
            </p>
            <p>
              <strong>7.3.</strong> Remaining balances upon ordinary termination will be paid out to verified accounts within 30 business days.
            </p>
            <p>
              <strong>7.4.</strong> Good cause for immediate termination by the Provider includes: laws/rights violations, harassment of others, copyright infringements, multiple account registrations, script manipulations, or material breaches.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              8. Rights of Use / Intellectual Property Rights
            </h2>
            <p>
              <strong>8.1.</strong> All Platform content, graphics, surveys, logos, and materials are the intellectual property of the Provider or its licensors.
            </p>
            <p>
              <strong>8.2.</strong> You are granted a limited, non-exclusive, non-transferable, and non-sublicensable right to access and use the Platform for personal use.
            </p>
            <p>
              <strong>8.5.</strong> By uploading evaluations or content, you grant the Provider a perpetual, worldwide, irrevocable, non-exclusive right to adapt and use it on the Platform.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              9. Liability and Disclaimers
            </h2>
            <p>
              <strong>9.1.</strong> The Services are provided "as is" and "as available". We disclaim all warranties of any kind, whether express or implied.
            </p>
            <p>
              <strong>9.2-9.4.</strong> Under no circumstances shall Provider be liable for indirect, incidental, special, or consequential damages. The aggregate and maximum liability of Provider for all claims is limited to the greater of (i) amounts paid by you to Provider in the last 6 months, or (ii) one hundred US dollars ($100).
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 10 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              10. Notices and Communications
            </h2>
            <p>All notices will be sent to your registered email address and shall constitute effective legal notice.</p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 11 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              11. Privacy
            </h2>
            <p>
              Provider complies with data protection laws. Our privacy practices are detailed in the Privacy Notice available at <a href="https://snappoint.in/privacypolicy" className="text-rose-500 hover:underline">https://snappoint.in/privacypolicy</a>.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 12 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              12. Consumer Notice
            </h2>
            <p>
              Under California Civil Code Section 1789.3, users are notified that the Services are provided by SnapPoint Private Limited, Sveavägen 17, 111 57 Jaipur, India. If you have questions/complaints, contact support at <a href="mailto:help@snappoint.in" className="text-rose-500 hover:underline">help@snappoint.in</a>.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Section 13 */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              13. General
            </h2>
            <p>
              <strong>13.1.</strong> The relationship is governed solely by the laws of the State of Jaipur, Rajasthan, India. Exclusive jurisdiction for all non-arbitration disputes lies in courts located in Jaipur, Rajasthan. All claims must be brought within one (1) year.
            </p>
            <p>
              <strong>13.2.</strong> Disputes shall be submitted to confidential arbitration in Jaipur under the rules of the Stockholm Chamber of Commerce (SCC) / Jaipur Chamber of Commerce.
            </p>
            <p className="font-bold text-slate-900 dark:text-white">
              <strong>13.3.</strong> ALL CLAIMS AND DISPUTES MUST BE ARBITRATED OR LITIGATED ON AN INDIVIDUAL BASIS AND NOT ON A CLASS BASIS.
            </p>
            <p className="font-bold text-slate-900 dark:text-white">
              <strong>13.4.</strong> YOU HEREBY WAIVE YOUR CONSTITUTIONAL AND STATUTORY RIGHTS TO GO TO COURT AND HAVE A JURY TRIAL.
            </p>
            <p>
              <strong>13.6.</strong> If any provision becomes ineffective or unenforceable, it shall not affect the validity of the remaining provisions.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};
