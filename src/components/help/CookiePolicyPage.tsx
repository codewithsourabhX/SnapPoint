import React from 'react';
import { Cookie, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CookiePolicyPage: React.FC = () => {
  const { user, setCurrentPage } = useApp();

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

      {/* Main card */}
      <div className="p-6 sm:p-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-8">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center font-bold">
            <Cookie className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Cookie Policy
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-semibold">
              Effective Date: 3rd of July, 2026
            </p>
          </div>
        </div>

        {/* Policy Body */}
        <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
          
          <p>
            When we use words like "us", "we", "our", we mean SnapPoint Private Limited. You can find our company details below. We are the data controller of the data collected through the use of cookies on our website.
          </p>

          <p>
            Our website is <a href="https://snappoint.in" className="text-rose-500 hover:underline">https://snappoint.in</a>, including all sub-domains we own and operate.
          </p>

          <p>
            When we refer to "you", we mean you as a user or visitor of our website.
          </p>

          <p>
            This policy is part of our privacy policy. Our use of cookies may include processing of your personal data, and we therefore recommend that you read our privacy policy, which can be found at <a href="https://snappoint.in/privacypolicy" className="text-rose-500 hover:underline">https://snappoint.in/privacypolicy</a>.
          </p>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* What is a cookie */}
          <section className="space-y-3 font-normal">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              What You Need to Know About Cookies
            </h2>
            <h3 className="font-bold text-slate-900 dark:text-white">What is a cookie?</h3>
            <p>
              A cookie is a small piece of data that a website stores on your device when you visit it and which is then read when you later revisit the site. The word "cookies" in this policy and the consent also refers to other forms of automatic collection of data, including: Flash-cookies (Local Shared Objects), Web Storage (HTML5), JavaScript trackers, and cookies placed by other software.
            </p>
            <p>
              A cookie may contain information about the website itself, a unique identifier that allows the site to recognise your web browser when you return, additional data that serves the purpose of the cookie, and the lifespan of the cookie itself.
            </p>
            <p>
              The word "cookies" or "cookie data" also covers information about IP and MAC addresses and other information about your device collected by said technologies.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white mt-4">Why we use cookies</h3>
            <p>Cookies are used to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Enable certain features (e.g., logging in)</li>
              <li>Track site usage (e.g., analytics)</li>
              <li>Store your user settings (e.g., language preferences)</li>
              <li>Personalize your content (e.g., advertising)</li>
            </ul>

            <h3 className="font-bold text-slate-900 dark:text-white mt-4">Session cookies vs. persistent cookies</h3>
            <p>
              <strong>Session cookies</strong> only last as long as your online session. They disappear from your computer or device when you close your browser. These are sometimes referred to as temporary cookies and are typically used to remember what a user put in their basket when browsing a website.
            </p>
            <p>
              <strong>Persistent cookies</strong> stay on your computer or device after you close your browser. These cookies expire according to the time specified in the cookie. You can see the specific duration of each persistent cookie below.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white mt-4">First-party vs. third-party cookies</h3>
            <p>
              <strong>First-party cookies</strong> are cookies set by the website you are visiting. Only this website can access and read these cookies.
            </p>
            <p>
              <strong>Third-party cookies</strong> are set by someone other than the owner of the website you're visiting. For example, some pages have content from other sites like YouTube. These third parties may set their own cookies on your browser.
            </p>
            <p>
              We may engage third parties to assist with maintenance, operation, creation, or functionality of our website, including analytics providers and content partners. We grant these third parties access to selected information to perform specific tasks on our behalf.
            </p>
            <p>
              We are, as a main rule, a joint controller with providers of third-party cookies for the collection of personal data via such cookies and the disclosure to the provider. The provider of third-party cookies is data controller for the processing taking place after receiving the personal data from us.
            </p>

            <h3 className="font-bold text-slate-900 dark:text-white mt-4">Consent</h3>
            <p>
              Because we respect your right to privacy, you can choose not to allow some types of cookies. Click on the different category headings below to find out more about each category of cookies we use. However, blocking some types of cookies may impact your experience of the site and the services we are able to offer.
            </p>
            <p>
              By accepting our use of cookies, apart from strictly necessary cookies, you consent to our use of cookies as described under "Types of Cookies We Use" below.
            </p>
            <p>
              You may at any time change or withdraw your cookie consent - see the section "How to Change Your Cookie Settings" below.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Types of Cookies We Use */}
          <section className="space-y-4">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              Types of Cookies We Use
            </h2>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white">1. Strictly Necessary Cookies</h3>
              <p className="font-normal text-xs sm:text-sm">
                These cookies are necessary for the website to function and cannot be switched off in our systems. They do not store any personally identifiable information.
              </p>

              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                      <th className="p-2.5 font-extrabold text-slate-900 dark:text-white">Cookie Name</th>
                      <th className="p-2.5 font-extrabold text-slate-900 dark:text-white">Expiry</th>
                      <th className="p-2.5 font-extrabold text-slate-900 dark:text-white">Domain</th>
                      <th className="p-2.5 font-extrabold text-slate-900 dark:text-white">Legal Basis</th>
                      <th className="p-2.5 font-extrabold text-slate-900 dark:text-white">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-normal">
                    <tr>
                      <td className="p-2.5 text-slate-900 dark:text-white font-bold">OptanonConsent</td>
                      <td className="p-2.5">1 year</td>
                      <td className="p-2.5">.snappoint.in</td>
                      <td className="p-2.5">GDPR Art. 6.1.c</td>
                      <td className="p-2.5">Stores cookie consent preferences</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-slate-900 dark:text-white font-bold">m_id</td>
                      <td className="p-2.5">Session</td>
                      <td className="p-2.5">www.snappoint.in</td>
                      <td className="p-2.5">GDPR Art. 6.1.f</td>
                      <td className="p-2.5">Unique identifier for managing sessions</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-slate-900 dark:text-white font-bold">viewport</td>
                      <td className="p-2.5">1 year</td>
                      <td className="p-2.5">www.snappoint.in</td>
                      <td className="p-2.5">GDPR Art. 6.1.f</td>
                      <td className="p-2.5">Stores viewport display preference</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white mt-4">2. Functional Cookies</h3>
              <p className="font-normal text-xs sm:text-sm">
                Functional cookies enable the website to provide enhanced functionality and personalisation. If you do not allow these, some services may not function properly.
              </p>

              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                      <th className="p-2.5 font-extrabold text-slate-900 dark:text-white">Cookie Name</th>
                      <th className="p-2.5 font-extrabold text-slate-900 dark:text-white">Expiry</th>
                      <th className="p-2.5 font-extrabold text-slate-900 dark:text-white">Domain</th>
                      <th className="p-2.5 font-extrabold text-slate-900 dark:text-white">Legal Basis</th>
                      <th className="p-2.5 font-extrabold text-slate-900 dark:text-white">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-normal">
                    <tr>
                      <td className="p-2.5 text-slate-900 dark:text-white font-bold">localization</td>
                      <td className="p-2.5">1 year</td>
                      <td className="p-2.5">.snappoint.in</td>
                      <td className="p-2.5">GDPR Art. 6.1.a</td>
                      <td className="p-2.5">Stores language and regional preferences</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-slate-900 dark:text-white font-bold">NID, AEC, SEARCH_SAMESITE</td>
                      <td className="p-2.5">6 months</td>
                      <td className="p-2.5">.google.com</td>
                      <td className="p-2.5">GDPR Art. 6.1.a</td>
                      <td className="p-2.5">Google security preferences and SameSite checks</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-slate-900 dark:text-white font-bold">SID, SSID, APISID, SAPISID, HSID, SIDCC</td>
                      <td className="p-2.5">1-2 years</td>
                      <td className="p-2.5">.google.com</td>
                      <td className="p-2.5">GDPR Art. 6.1.a</td>
                      <td className="p-2.5">Google Account security and login authentication</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-white mt-4">3. Performance and Analytics Cookies</h3>
              <p className="font-normal text-xs sm:text-sm">
                Google Analytics and DoubleClick cookies track and report website traffic to help us understand visitor behaviour and evaluate advertising efficiency.
              </p>

              <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                      <th className="p-2.5 font-extrabold text-slate-900 dark:text-white">Cookie Name</th>
                      <th className="p-2.5 font-extrabold text-slate-900 dark:text-white">Expiry</th>
                      <th className="p-2.5 font-extrabold text-slate-900 dark:text-white">Domain</th>
                      <th className="p-2.5 font-extrabold text-slate-900 dark:text-white">Legal Basis</th>
                      <th className="p-2.5 font-extrabold text-slate-900 dark:text-white">Purpose</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-normal">
                    <tr>
                      <td className="p-2.5 text-slate-900 dark:text-white font-bold">_ga, _ga_[container-id]</td>
                      <td className="p-2.5">2 years</td>
                      <td className="p-2.5">.snappoint.in</td>
                      <td className="p-2.5">GDPR Art. 6.1.a</td>
                      <td className="p-2.5">Google Analytics visitor traffic tracking</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-slate-900 dark:text-white font-bold">_gcl_au</td>
                      <td className="p-2.5">90 days</td>
                      <td className="p-2.5">.snappoint.in</td>
                      <td className="p-2.5">GDPR Art. 6.1.a</td>
                      <td className="p-2.5">Google Ads conversion and experiment tracking</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 text-slate-900 dark:text-white font-bold">IDE, ar_debug</td>
                      <td className="p-2.5">28 days to 1 year</td>
                      <td className="p-2.5">.doubleclick.net</td>
                      <td className="p-2.5">GDPR Art. 6.1.a</td>
                      <td className="p-2.5">Targeted advertisements and tracking reports</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* How to Change Your Cookie Settings */}
          <section className="space-y-3 font-normal">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              How to Change Your Cookie Settings
            </h2>
            <p>
              As part of our cookie solution, we always ask for your consent to cookies, except for strictly necessary cookies, before placing cookies on your device. You can always change your consent preferences by accessing your cookie settings to view active cookies, accept or reject categories, or withdraw consent at any time.
            </p>
            <p>
              You can also change cookie settings in your web browser settings to block or delete cookies. Refer to your browser's Help menu for instructions.
            </p>
          </section>

          <hr className="border-slate-150 dark:border-slate-800" />

          {/* Contact Information */}
          <section className="space-y-3">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              Contact Information
            </h2>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-1 font-semibold">
              <p className="text-slate-900 dark:text-white font-extrabold">SnapPoint Private Limited</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Address: Sveavägen 17, 111 57 Stockholm, India</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Privacy contact: <a href="mailto:privacy@snappoint.in" className="text-rose-500 hover:underline">privacy@snappoint.in</a></p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Website: <a href="https://snappoint.in" className="text-rose-500 hover:underline">https://snappoint.in</a></p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
