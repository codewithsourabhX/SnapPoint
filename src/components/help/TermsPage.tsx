import React from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TermsPage: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentPage('surveys')}
          className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Surveys
        </button>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-slate-800 shadow-sm space-y-6 text-slate-800 dark:text-slate-200">
        <div className="flex items-center gap-3 border-b border-amber-100 dark:border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Terms of Use & Conditions
            </h1>
             <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              SnapPoint • Delhi, India
            </p>
          </div>
        </div>

        <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {/* Section 1 */}
          <section className="space-y-2">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              1. Scope of the Terms of Use
            </h2>
            <p>The following terms and conditions govern your use of the Services provided by SnapPoint.</p>
            <p><strong>1.1.</strong> The provider is SnapPoint , Delhi , India.</p>
            <p><strong>1.2.</strong> The Provider operates SnapPoint ("Platform"), that enables you and other registered users ("Members") to participate in product testing assignments arranged between you and external advertising partners ("Tasks"). These Tasks may include online surveys, product tests, app tests, and website tests. By actively participating in and fulfilling these Tasks in accordance with the following provisions, you may earn remuneration or other benefits.</p>
            <p><strong>1.3.</strong> These services offered by the Provider ("Services") through the Platform are accessible via the internet through both a mobile application ("Mobile App") and a browser-based application ("Web App"; the Mobile App and Web App are collectively referred to as the "App").</p>
            <p><strong>1.4.</strong> These Terms of Use are a binding legal contract between Provider and "you", and govern your access to and use of the Services.</p>
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-slate-200 my-2">
              <p className="font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-1">IMPORTANT – PLEASE READ CAREFULLY</p>
              <p className="text-xs">
                By agreeing to these Terms of Use, or by accessing, registering for an Account, downloading or using our Apps, performing Tasks, providing information through, or generally using the Platform, you indicate that you have both read and accept these Terms of Use. If you do not agree with any of these Terms of Use, do not access or otherwise use the Platform, register an Account, or provide us with any information about you.
              </p>
              <p className="text-xs mt-2">
                These Terms of Use contain a dispute resolution [and arbitration provision], including a class action waiver (See clause 13.3) that affects your rights. These provisions apply solely to the extent applicable in your jurisdiction.
              </p>
            </div>
            <p><strong>1.5.</strong> The sole language available for concluding the contract in the U.S. and Indian market is English.</p>
            <p><strong>1.6.</strong> Your own terms and conditions of business shall not become part of the usage relationship between the Provider and you, even if not expressly rejected by the Provider.</p>
            <p><strong>1.7.</strong> These Terms of Use exclusively govern the contractual relationship between the Provider and you. If you download the Mobile App from the Apple Inc. App Store or the Google LLC Play Store, Apple Inc. and Google LLC shall not be deemed parties to these Terms of Use and shall not be responsible for the content of the Mobile App.</p>
            <p>Provider is responsible for all obligations towards users under these Terms of Use, including payments, refunds, and customer payouts. Prime Insights AB, c/o Aonic AB (publ), Sveavägen 17, 111 57 Stockholm, Sweden, registered at the Swedish Companies Registration Office (Bolagsverket) under 559537-0676 ("Prime Insights"), as the parent company of Provider, may, at its discretion, fulfil such obligations directly, in whole or in part, including making any payments or other direct disbursements to you. Any performance by Prime Insights shall fully discharge Provider's corresponding obligations to the same extent.</p>
          </section>

          {/* Section 2 */}
          <section className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              2. Registration for the Services
            </h2>
            <p>To access and use the Services, you must register for an Account in accordance with the following provisions.</p>
            <p><strong>2.1.</strong> Visitors may access the Platform in accordance with these Terms of Use but in order to have full access to and use of the Services, you are required to register an account ("Account").</p>
            <p><strong>2.2.</strong> The Platform and the Services are for personal, non-commercial use only. You are permitted to have only one Account.</p>
            <p><strong>2.3.</strong> You are obligated to provide accurate and complete information during the registration of an Account. By registering an Account, you represent that you are not barred from using the Services under these Terms of Use, under the laws of the United States of America or your place of residence, or under any other applicable jurisdiction. You agree to maintain and promptly update your registration data to keep it true, accurate, current and complete. If you provide any information (or Provider has reasonable grounds to suspect) that is untrue, inaccurate, not current or incomplete, Provider has the right to suspend or terminate your Account and refuse any and all current or future use of the Services (or any portion thereof) by you for breach. You agree not to create an Account or use the Services if you have been previously removed by Provider, or if you have been previously banned from any of the Provider internet properties.</p>
            <p><strong>2.4.</strong> Prior to completing the registration process, you will be provided with technical means to review and correct your entries. You may cancel the registration at any time before its completion.</p>
            <p><strong>2.5.</strong> Immediately upon completion of the registration process, you will receive an email from Provider to the email address provided at registration, containing an activation link. The activation link is valid for the period specified in the email. If you fail to activate your Account by confirming the activation link within the specified period, the link will expire, and you will be required to restart the registration process.</p>
            <p><strong>2.6.</strong> Upon timely confirmation of your email address, Provider will send you an email confirming your successful registration. Provider's Terms of Use will be attached to or included in the confirmation email sent to the email address provided during registration.</p>
            <p><strong>2.7.</strong> You may also register your Account via single sign-on ("SSO"). We currently offer registration via the SSO service providers listed on the Provider's website. The use of SSO may be subject to the terms of use and privacy policies of the respective SSO service providers. Any issues relating to the SSO login process must be addressed with the relevant provider.</p>
            <p><strong>2.8.</strong> You may terminate your Account at any time. When you terminate your Account, all of your active Tasks will also be terminated. The Provider is entitled to delete Accounts that are considered inactive, meaning Accounts where you have not logged in for a period of more than twelve (12) months.</p>
          </section>

          {/* Section 3 */}
          <section className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              3. Changes to the Services and the Terms of Use
            </h2>
            <p>Provider reserves the right to modify the Services and these Terms of Use as described below.</p>
            <p><strong>3.1.</strong> Provider reserves the right to make formal or editorial changes and updates to the hyperlinks included in these Terms of Use at any time without prior notice. Provider can change, update, add or remove provisions of these Terms of Use by posting the updated Terms of Use, and by providing a notice on the Platform. We will ask for your express consent to the updated Terms of Use where we are legally required to do so, and our notice to you will explain how you can accept or reject the changes. If you do not agree with any of the updated Terms of Use, you must stop using the Services. Continued use of the Services following notice of any modifications indicates that you acknowledge and agree to be bound by the modifications. Unless otherwise required by law, the updated Terms of Use are effective as of the day of posting.</p>
            <p><strong>3.2.</strong> Provider reserves the right to make changes to the Services, at any time and without your prior consent. If you object to any changes to the Services, your sole recourse will be to cease using the Services. Continued use of the Services following posting of any such changes will indicate your acknowledgement of such changes and satisfaction with the Services as modified. We also reserve the right to discontinue the Services, or any component of it or content therein, at any time without notice to you. We will not be liable to you or any third party should we exercise our right to modify or discontinue the Services.</p>
            <p><strong>3.3.</strong> Certain features of the Services may be subject to additional legal terms ("Additional Terms"), which shall be provided to you at the moment you choose to use such features or services. By using such features, or any part thereof, you agree to be bound by the Additional Terms applicable to such features. Additional Terms are hereby incorporated by reference, and in the event that any of the Additional Terms governing such features conflict with these Terms of Use, the Additional Terms will govern.</p>
          </section>

          {/* Section 4 */}
          <section className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              4. Your General Obligations
            </h2>
            <p>When using the Services, you must comply with the following obligations.</p>
            <p><strong>4.1.</strong> When using the Services, you must refrain from any unlawful conduct, violations of applicable laws, and/or infringements or violations of third-party rights.</p>
            <p><strong>4.2.</strong> If you have an Account, you are obliged to:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>(a) ensure that your access credentials are not made accessible to any third party,</li>
              <li>(b) use a secure password for your Account, and</li>
              <li>(c) immediately notify Provider in text form upon becoming aware of any misuse of your Account, so that access can be blocked without undue delay.</li>
            </ul>
            <p>You are responsible for all activities carried out under your Account, including those carried out by third parties, to the extent that you are responsible for enabling such use or could have prevented it with reasonable care.</p>
            <p><strong>4.3.</strong> You shall keep the operating system and/or browser you use for accessing the Services up to date.</p>
            <p><strong>4.4.</strong> You are responsible for installing updates for the Apps, including updates for any plugins or similar required for the use of the Apps, within a reasonable period. If you fail to do so after Provider has informed you of the update's availability and the consequences of not installing it, Provider shall not be responsible for any defects in the Apps resulting from your failure to install the update. If you are unable to properly install the update based on the information provided, you are obligated to promptly notify Provider accordingly.</p>
            <p><strong>4.5.</strong> You are not permitted to interfere with or manipulate the data flow of the Services nor to add or derive data through your own interfaces. Access to the data in the Services is permitted exclusively via the user interfaces provided by Provider.</p>
            <p><strong>4.6.</strong> You must use the Services in accordance with these Terms of Use. In particular and unless otherwise explicitly allowed by applicable law, you are not permitted to:</p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600 dark:text-slate-400">
              <li>(a) access, retrieve, collect or otherwise copy the Services by using robots, crawlers, bots, spiders, or any other technologies, methods, or procedures,</li>
              <li>(b) misuse the system (for example by flooding, providing false information, carrying out DDoS attacks, or creating fake accounts),</li>
              <li>(c) use the Services in any way that may interrupt or otherwise negatively affect their operation (including, without limitation, uploading viruses or malware or otherwise compromising the security of the Services),</li>
              <li>(d) falsify screenshots or other evidence, use third-party evidence, or otherwise pretend to meet the requirements for a Task,</li>
              <li>(e) publish screen recordings of the Services without the prior express consent of the Provider,</li>
              <li>(f) make copyright-protected content of third parties available through the Services, copy, modify, transmit, create derivative works from, use, or reproduce such content without proper authorization,</li>
              <li>(g) modify, sublicense, sell, market, reverse engineer, decrypt, decompile (except to the extent permitted by mandatory law), or otherwise exploit the Services, in whole or in part, yourself or through others, or use or develop applications that interact with Tasks, content, or information of Members, including using a VPN, proxy, or any other type of obfuscated connection,</li>
              <li>(h) perform any Task other than in good faith, such as providing false answers or answering each question the same way,</li>
              <li>(i) use your Account outside of the country you reside in. The Tasks we offer are related to the country you reside. Performing Tasks out of your country of residence can be seen as fraudulent and may result in the termination of your membership,</li>
              <li>(j) access or use any part of the Platform in any way that may violate any applicable law, regulation, or another governmental requirement,</li>
              <li>(k) collect or store any personal information about other Members,</li>
              <li>(l) impersonate any individual or entity, including Provider employees, agents or clients, or other Members, or otherwise misrepresent your affiliation with any person or entity,</li>
              <li>(m) resell, trade, or otherwise attempt to generate income by providing access to your Account to others,</li>
              <li>(n) publish and/or repost any content of Tasks you participate in, including the URL of the Task, the question or answers within the Task, or the name of the Partner,</li>
              <li>(o) do any of the actions listed in clause 7.4 (a) through (f).</li>
            </ul>
            <p><strong>4.7.</strong> Provider reserves the right to temporarily or permanently suspend your access to your Account and, consequently, to the Services, if:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>(a) provide false or misleading information during registration or breach your obligations under these Terms of Use, or</li>
              <li>(b) if your Account shows signs of fraud, abuse, or suspicious activity; or</li>
              <li>(c) if Provider has any other legitimate interest in temporarily or permanently suspending your Account.</li>
            </ul>
            <p><strong>4.8.</strong> Provider will endeavour to inform you in advance of any such suspension and will provide you with a reasonable period to remedy the issue, unless immediate suspension is required for compelling reasons. If you have conducted any fraudulent activity, then subject to applicable law, Provider reserves the right to take any necessary legal action.</p>
          </section>

          {/* Section 5 */}
          <section className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              5. Participation in Tasks
            </h2>
            <p>As a Member, you may participate in various Tasks offered through the Platform.</p>
            <p><strong>5.1.</strong> Upon successfully registering your Account, you may participate in Tasks. These may include evaluations and surveys relating to services or other offerings of advertising partners, such as online surveys, product tests, app tests, and website tests.</p>
            <p><strong>5.2.</strong> The Provider also gives you the option to provide additional information. This includes, in particular, participation in surveys where you provide further details about yourself, as well as verification of your identity by uploading a scan, copy, or photo of your identity card or another official identification document clearly confirming your identity. The Provider is entitled, at its sole discretion, to make certain Tasks available only to specific Members (for example, Members who have provided additional personal details relevant to the respective Tasks in their Account, or Members who have verified their identity).</p>
            <p><strong>5.3.</strong> The Provider may send invitations to registered Members to participate in evaluations and surveys. The details of each Task, in particular the requirements to be met and the remuneration, are set out in the description provided by the Provider for that Task ("Task Description"). You have no right to participate in specific Tasks or to receive invitations to them; the right of selection lies solely with the Provider in its full and absolute discretion.</p>
            <p><strong>5.4.</strong> Except for any submission deadlines specified in the Task Description, you are not bound by any location or time when performing Tasks. Within the framework of the Task Description, you decide at your own discretion how to carry out the Task. In particular, you are not subject to any instructions from the Provider. Using the Services does not create any employment relationship. You are also under no obligation to perform Tasks. You are entirely free to decide whether or not to write an evaluation as part of a Task. You remain free to engage in any other independent or employed activities alongside your participation.</p>
            <p><strong>5.5.</strong> Before participating in certain Tasks, you may be required to accept the terms and conditions of advertising partners ("Partner Terms"). Partner Terms may govern the Task Description and the conditions for fulfilling the Task. In both respects, the Partner Terms take precedence over these Terms of Use.</p>
            <p><strong>5.6.</strong> You must provide the Provider with your responses or evaluations. The Provider will review compliance with the requirements of the respective Task. Your evaluations must be objective, moderate, and fair, avoiding exaggerated statements. Participation in evaluations and surveys must be personal. Participation using bots, other spam software, or under another person's identity is strictly prohibited.</p>
            <p><strong>5.7.</strong> Upon full completion of a Task as specified in the applicable Task Description, you will receive remuneration in one of the available currencies as indicated on the Provider's website, which will be credited to your Account balance. The Provider may verify the Task's complete performance and request necessary proof (e.g., screenshots). The Provider may subject such proof to technical verification to prevent multiple uses.</p>
            <p><strong>5.8.</strong> The Provider has the right to temporarily suspend individual Tasks if there are indications that you have continuously and/or materially breached obligations arising under these Terms of Use. The Provider has the right to terminate individual Tasks for cause. In particular, good cause includes the cases set out in clause 7.4 as well as in the event of a continuous and/or material breach of these Terms of Use. If the Provider terminates a Task for cause, you are not entitled to reactivate that Task.</p>
          </section>

          {/* Section 6 */}
          <section className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              6. Remuneration
            </h2>
            <p>You will be remunerated for completing Tasks in accordance with the provisions below.</p>
            <p><strong>6.1.</strong> You will be remunerated for completing Tasks in accordance with the respective Task Description. A right to remuneration arises only once you have fully completed the Task as set out in clause 5.7.</p>
            <p><strong>6.2.</strong> Remuneration earned for the completion of Tasks will be credited to your Account. A payout of your Account balance is possible once you have reached the minimum balance required from time to time (as communicated to you upon registration). The Provider may, at its discretion, set a lower payout threshold (which may be limited to certain payment methods or promotional periods). In the event of an ordinary termination of your membership, a payout will be made in accordance with clause 7.3 if your Account balance is above the minimum balance. Payouts are made in one of the available currencies via the payout methods as set on the Provider's website ("Payout Methods"). The use of the Payment Methods may be subject to additional and different terms, which are subject to change (and will be binding upon their use upon such change) without direct notice to you. Multiple payouts per day are possible.</p>
            <p><strong>6.3.</strong> The Provider may offer gift cards as remuneration, issued by one or more third parties. If you request a gift card, the Provider will make the gift card code available electronically on behalf of the gift card provider. The terms and conditions of such third-party gift card provider applies to any electronic gift cards.</p>
            <p><strong>6.4.</strong> You are not entitled to remuneration if the Provider has suspended or terminated individual Tasks in accordance with clause 5.8, and/or your responses to a Task contain invalid and/or untrue information and/or defamatory, offensive, or otherwise impermissible or unlawful statements. You are likewise not entitled to remuneration if you materially breach these Terms of Use. This applies in particular to breaches that entitle the Provider to terminate your membership for cause under clause 7.4. The Provider expressly reserves the right to review compliance with the foregoing requirements and to refuse remuneration in the event of an improperly completed Task which is not in accordance with the Task Description.</p>
            <p><strong>6.5.</strong> For fraud prevention purposes (in particular to prevent the use of bots and other spam software), the Provider may require you to complete an identity/existence verification procedure ("Verification Procedure") before making any payout. The Verification Procedure may involve the collection and processing of biometric data. The Provider may refuse payouts until you have successfully completed the Verification Procedure (without prejudice to any further rights of the Provider under these Terms of Use).</p>
            <p><strong>6.6.</strong> Payouts are made using the data stored in your Account. You are solely responsible for the accuracy of this information. If your details have changed but are not updated in your Account, the Provider is entitled, but not obliged, to continue using the previous data, including your payout method choice account details, for all communications and payouts.</p>
            <p><strong>6.7.</strong> You alone are responsible for properly reporting and paying taxes on any payments you receive.</p>
            <p><strong>6.8.</strong> Payouts to your payout method choice account that have already been used by another Member for remuneration purposes can be restricted.</p>
          </section>

          {/* Section 7 */}
          <section className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              7. Term and Termination
            </h2>
            <p>The contract may be terminated by either party as described below.</p>
            <p><strong>7.1.</strong> The term of the contract concluded on the basis of the Terms of Use is indefinite. However, you may deactivate your Account at any time without giving reasons. Your Account will remain in existence and may be reactivated by you at any time, unless you choose to permanently delete your Account.</p>
            <p><strong>7.2.</strong> The Provider has the right to terminate with one month's notice. The Provider also reserves the right to terminate due to inactivity. You are considered inactive if you have not logged in for more than six months. Before deleting an inactive Account, the Provider will attempt to notify you at the email address provided, granting a four-week grace period. If you do not object to the deletion or take any action within this period, your Account will be deleted.</p>
            <p><strong>7.3.</strong> If you have an Account balance at the time of termination, the balance will, upon your request, be paid out to your payout method choice account within 30 business days. For this purpose, you may contact the Provider via the website contact form. The Provider is entitled to refuse payout if you have not successfully completed the Verification Procedure pursuant to clause 6.4, if the bank account or the payout method you provided does not exist. The Provider will, however, work together with you to resolve such issues in due course.</p>
            <p><strong>7.4.</strong> The right of either party to terminate for cause remains unaffected. Good cause for termination by the Provider exists in particular if you:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>(a) violate applicable law or infringe the rights of third parties in connection with the use of the Services, including attempts to do so, for example by uploading, distributing, offering, or promoting pornographic, illegal, fraudulent, or otherwise unlawful content, services, or products,</li>
              <li>(b) publish, make accessible, or express content that insults, defames, or disparages other participants or third parties (natural or legal persons),</li>
              <li>(c) provide or distribute content that is legally protected or subject to third-party rights (e.g., copyrights) without proper authorization, including making copyrighted works publicly accessible or engaging in other copyright infringements,</li>
              <li>(d) register multiple times using different names and/or email addresses,</li>
              <li>(e) disrupt, misuse, fraudulently use, or manipulate the Services, or otherwise cause harm to the Provider through your use, and/or</li>
              <li>(f) continuously and/or materially breach these Terms of Use in a way that makes continuation of the contract unreasonable for the Provider.</li>
            </ul>
            <p><strong>7.5.</strong> If the Provider terminates for cause, you are not entitled to reactivate your Account.</p>
            <p><strong>7.6.</strong> The Provider is also entitled to temporarily suspend your Account if there are indications that you have continuously and/or materially breached obligations arising under these Terms of Use.</p>
          </section>

          {/* Section 8 */}
          <section className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              8. Rights of Use / Intellectual Property Rights
            </h2>
            <p>The following provisions govern intellectual property rights related to the Services.</p>
            <p><strong>8.1.</strong> All pages and all content on the Platform as well as in the offered Tasks and related materials, including but not limited to texts, graphics, audio files, videos, photographs, surveys, logos, and other materials, are the intellectual property of the Provider or of its licensors, business partners, or affiliates, or are used under authorization. This includes, in particular, all trademarks, copyrights, patents, and trade secrets contained therein. You may not alter, reproduce, duplicate, create derivative works from, republish, display, upload, post, transmit, or distribute any content available on the website without the Provider's prior written consent.</p>
            <p><strong>8.2.</strong> You are granted a non-exclusive, non-transferable and non-sublicensable right to use the Services in accordance with their intended purpose and subject to these Terms of Use. This includes, to the extent technically necessary, the installation, loading, display, and execution of the Services on your device. There are no rights by implication hereunder, rights not expressly granted are expressly reserved.</p>
            <p><strong>8.4.</strong> If you download the Mobile App via Google LLC's Google Play, the use of Google Play is subject to the Google Play terms of service (available at https://play.google.com/intl/ALL_de/about/play-terms/).</p>
            <p><strong>8.5.</strong> You grant the Provider a non-exclusive, non-revocable, perpetual, and worldwide right to use any content that you upload or post in the App. This right includes, in particular, the right to make such content publicly available (in whole or in part) through the Provider's website or other media, and to reproduce and distribute it, unless otherwise agreed between you and the Provider. You further permit the Provider to technically process the content, including adapting it to the format requirements of the Platform, shortening it, improving its display quality, or making minor corrections (such as spelling errors).</p>
            <p><strong>8.6.</strong> The grant of rights as set out in clause 8.5 shall remain unaffected by any deletion of the content and/or by the termination of your Account or of individual Tasks, unless otherwise provided by applicable law.</p>
          </section>

          {/* Section 9 */}
          <section className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              9. Liability and Disclaimers
            </h2>
            <p>The following provisions limit Provider's liability and set forth disclaimers.</p>
            <p><strong>9.1.</strong> You expressly agree that your use of the Services, the Platform, and the Apps is at your sole and exclusive risk. The Services are provided on an "as is, with all faults" and "as available" basis. Provider expressly disclaims all warranties of any kind, whether express or implied, including, but not limited to the implied warranties of merchantability, fitness for a particular purpose, title and non-infringement. No advice or information, whether oral or written, obtained by you from Provider or through the Services shall create any warranty, whether by implication, estoppel or otherwise, including but not limited to any marketing or promotional materials describing the Services on Provider's website.</p>
            <p><strong>9.2.</strong> You are solely responsible for your content, your conduct, and all other matters under your control. In no event shall Provider be liable to you for any damages arising from or related to your content. This clause applies to all claims by you irrespective of the cause of action underlying the claim, including, but not limited to, breach of contract, tort, including but not limited to negligence or strict liability.</p>
            <p><strong>9.3.</strong> Regardless of the type of claim or the nature of the cause of action, you agree that in no event will Provider, our affiliates, Partners, contractors, service providers, employees, agents, or licensors, or any other party involved in creating, producing or delivering the Services or materials (including Apps) available on the Services, be liable to you in any manner whatsoever: (i) for any decision made or action or non-action taken by you in reliance upon the information provided through the Services; (ii) for loss or inaccuracy of data, or cost of procurement of substitute goods, services, or technology; (iii) for loss of revenues or loss of profits; or (iv) for any indirect, special, incidental, consequential, exemplary, or punitive damages, including but not limited to loss of reputation, loss of goodwill, loss of data, for business interruption or similar action, even if Provider has been advised of the possibility of such damages.</p>
            <p><strong>9.4.</strong> The total aggregate and maximum liability of Provider and its affiliates, arising from or otherwise relating to these terms (regardless of the form of action or claim) is limited to the greater of (i) any amounts you have paid to Provider during the six (6) months prior to the accrual of the cause or causes of action, or (ii) one hundred us dollars (usd$100).</p>
            <p><strong>9.5.</strong> The limitation of liability set forth in this clause 9 does not apply to liabilities that cannot be limited by law, including, without limitation, liability for physical injury (including death) directly caused by a party, or liabilities arising out of the gross negligence, wilful misconduct, fraud or fraudulent misrepresentation by a party. The foregoing limitations apply even if the remedies under these Terms of Use fail of their essential purpose.</p>
            <p><strong>9.6.</strong> Some jurisdictions do not allow the exclusion or limitation of certain damages. Accordingly, some of the limitations set forth above may not apply to you. However, any exclusion or limitation will be construed to maximum extent permitted under applicable law.</p>
            <p><strong>9.7.</strong> You are required to take appropriate measures to prevent and mitigate damage, in particular to ensure, where technically possible, appropriate security of your data on your devices.</p>
          </section>

          {/* Section 10 */}
          <section className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              10. Notices and Communications
            </h2>
            <p>All communications will be sent to the email address associated with your Account.</p>
            <p>All communications with you will be sent to the email address associated with your Account. You consent to receive such communications and agree that these satisfy legal requirements. In the event that the email address you provided to Provider is not valid, or for any reason is not capable of delivering to you any notices required or permitted by these Terms of Use, Provider's dispatch of the e-mail containing such notice will nonetheless constitute effective notice. We are not responsible for any automatic filtering you or your network or email provider may apply to communications we send to an e-mail address that you provide to us.</p>
          </section>

          {/* Section 11 */}
          <section className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              11. Privacy
            </h2>
            <p>Provider's privacy practices are described in the Privacy Notice.</p>
            <p>When processing your personal information, Provider shall comply with the applicable privacy and data protection legislation. Information on how Provider uses and processes information that you submit in connection with the Services can be found in Provider's Privacy Notice for the Services, available at <a href="https://www.snappoint.online/policy" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 font-bold hover:underline">https://www.snappoint.online/policy</a>. The Privacy Notice is hereby incorporated by reference.</p>
          </section>

          {/* Section 12 */}
          <section className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              12. Consumer Notice
            </h2>
            <p>The following general provisions apply to these Terms of Use.</p>
          </section>

          {/* Section 13 */}
          <section className="space-y-2 border-t border-slate-200 dark:border-slate-800 pt-4">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">
              13. General
            </h2>
            <p><strong>13.1.</strong> The contractual relationship between you and Provider is governed solely by the law of the State of New York, United States of America (without regard to its conflict of law provisions). The application of the UN Sales Convention (CISG) is expressly excluded. Subject to the requirement to arbitrate set forth in this clause 13, exclusive jurisdiction for all disputes that do not require arbitration will be the state and federal courts located in New York and you consent to the jurisdiction of those courts. You hereby waive any and all rights to bring any claim or action related to any matters under these Terms of Use of Use in any forum beyond one (1) year after the first occurrence of the kind of act, event, condition or omission upon which the claim or action is based.</p>
            <p><strong>13.2.</strong> If any dispute arises relating in any way to these Terms of Use or your use of the Services, such dispute shall be submitted to confidential arbitration in Stockholm, except that, to the extent you have in any manner violated or threatened to violate our intellectual property rights, we may seek injunctive or other appropriate relief in any applicable state or federal court in New York and you consent to exclusive jurisdiction and venue in such courts. Arbitration under these Terms of Use shall be conducted under the rules then prevailing of the Stockholm Chamber of Commerce (SCC). The arbitrator's award shall be binding and may be entered as a judgment in any court of competent jurisdiction. To the fullest extent permitted by applicable law, no arbitration under these Terms of Use shall be joined to an arbitration involving any other party subject to these Terms of Use, whether through class arbitration proceedings or otherwise.</p>
            <p className="font-bold text-slate-900 dark:text-white"><strong>13.3.</strong> ALL CLAIMS AND DISPUTES WITHIN THE SCOPE OF THESE TERMS MUST BE ARBITRATED OR LITIGATED ON AN INDIVIDUAL BASIS AND NOT ON A CLASS BASIS, AND CLAIMS OF MORE THAN ONE USER CANNOT BE ARBITRATED OR LITIGATED JOINTLY OR CONSOLIDATED WITH THOSE OF ANY OTHER USER.</p>
            <p className="font-bold text-slate-900 dark:text-white"><strong>13.4.</strong> YOU HEREBY WAIVE YOUR CONSTITUTIONAL AND STATUTORY RIGHTS TO GO TO COURT AND HAVE A TRIAL IN FRONT OF A JUDGE OR A JURY. In the event any litigation should arise between you and Provider in any state or federal court in a suit to vacate or enforce an arbitration award or otherwise, YOU WAIVE ALL RIGHTS TO A JURY TRIAL, instead electing that the dispute be resolved by a judge.</p>
            <p><strong>13.5.</strong> The failure to require performance of any provision shall not affect our right to require performance at any time thereafter, nor shall a waiver of any breach or default of these Terms of Use constitute a waiver of any subsequent breach or default or a waiver of the provision itself. These Terms of Use together with any Additional Terms, policies and any other legal documents incorporated by reference constitute the entire and exclusive understanding and agreement between you and Provider regarding this subject matter, and supersede any and all prior or contemporaneous agreements or understandings, written and oral. Amendments and additions to these Terms of Use shall be in writing.</p>
            <p><strong>13.6.</strong> Should any provision of these Terms of Use be or become wholly or partly ineffective or unenforceable, this shall not affect the validity of the remaining provisions of these Terms of Use.</p>
          </section>
        </div>
      </div>
    </div>
  );
};
