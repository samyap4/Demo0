import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./components/Home";
import { useAuth0 } from "@auth0/auth0-react";
import { waveform } from 'ldrs'

export default function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/about" element={<About />} />
          <Route path="/sso" element={<SSO />} />
        </Routes>
      </>
    </Router>
  );
}

function PrivacyPolicy() {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ width: "800px", margin: "0 auto" }}>
        <div class="page">
          <div class="header">
            <div class="container">
              <p class="title">Privacy Policy for Demo0</p>
            </div>
          </div>
          <div class="translations-content-container">
            <div class="container">
              <div
                class="tab-content translations-content-item en visible"
                id="en"
              >
                <h1>Privacy Policy</h1>
                <p>Last updated: January 24, 2023</p>
                <p>
                  This Privacy Policy describes Our policies and procedures on
                  the collection, use and disclosure of Your information when
                  You use the Service and tells You about Your privacy rights
                  and how the law protects You.
                </p>
                <p>
                  We use Your Personal data to provide and improve the Service.
                  By using the Service, You agree to the collection and use of
                  information in accordance with this Privacy Policy. This
                  Privacy Policy has been created with the help of the{" "}
                  <a
                    href="https://www.privacypolicies.com/privacy-policy-generator/"
                    target="_blank"
                  >
                    Privacy Policy Generator
                  </a>
                  .
                </p>
                <h1>Interpretation and Definitions</h1>
                <h2>Interpretation</h2>
                <p>
                  The words of which the initial letter is capitalized have
                  meanings defined under the following conditions. The following
                  definitions shall have the same meaning regardless of whether
                  they appear in singular or in plural.
                </p>
                <h2>Definitions</h2>
                <p>For the purposes of this Privacy Policy:</p>
                <ul>
                  <li>
                    <p>
                      <strong>Account</strong> means a unique account created
                      for You to access our Service or parts of our Service.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Affiliate</strong> means an entity that controls,
                      is controlled by or is under common control with a party,
                      where &quot;control&quot; means ownership of 50% or more
                      of the shares, equity interest or other securities
                      entitled to vote for election of directors or other
                      managing authority.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Company</strong> (referred to as either &quot;the
                      Company&quot;, &quot;We&quot;, &quot;Us&quot; or
                      &quot;Our&quot; in this Agreement) refers to Demo0.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Cookies</strong> are small files that are placed
                      on Your computer, mobile device or any other device by a
                      website, containing the details of Your browsing history
                      on that website among its many uses.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Country</strong> refers to: Texas, United States
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Device</strong> means any device that can access
                      the Service such as a computer, a cellphone or a digital
                      tablet.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Personal Data</strong> is any information that
                      relates to an identified or identifiable individual.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Service</strong> refers to the Website.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Service Provider</strong> means any natural or
                      legal person who processes the data on behalf of the
                      Company. It refers to third-party companies or individuals
                      employed by the Company to facilitate the Service, to
                      provide the Service on behalf of the Company, to perform
                      services related to the Service or to assist the Company
                      in analyzing how the Service is used.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Third-party Social Media Service</strong> refers
                      to any website or any social network website through which
                      a User can log in or create an account to use the Service.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Usage Data</strong> refers to data collected
                      automatically, either generated by the use of the Service
                      or from the Service infrastructure itself (for example,
                      the duration of a page visit).
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Website</strong> refers to Demo0, accessible from{" "}
                      <a
                        href="https://demo0.sam-yap.com"
                        rel="external nofollow noopener"
                        target="_blank"
                      >
                        https://demo0.sam-yap.com
                      </a>
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>You</strong> means the individual accessing or
                      using the Service, or the company, or other legal entity
                      on behalf of which such individual is accessing or using
                      the Service, as applicable.
                    </p>
                  </li>
                </ul>
                <h1>Collecting and Using Your Personal Data</h1>
                <h2>Types of Data Collected</h2>
                <h3>Personal Data</h3>
                <p>
                  While using Our Service, We may ask You to provide Us with
                  certain personally identifiable information that can be used
                  to contact or identify You. Personally identifiable
                  information may include, but is not limited to:
                </p>
                <ul>
                  <li>
                    <p>Email address</p>
                  </li>
                  <li>
                    <p>Usage Data</p>
                  </li>
                </ul>
                <h3>Usage Data</h3>
                <p>
                  Usage Data is collected automatically when using the Service.
                </p>
                <p>
                  Usage Data may include information such as Your Device's
                  Internet Protocol address (e.g. IP address), browser type,
                  browser version, the pages of our Service that You visit, the
                  time and date of Your visit, the time spent on those pages,
                  unique device identifiers and other diagnostic data.
                </p>
                <p>
                  When You access the Service by or through a mobile device, We
                  may collect certain information automatically, including, but
                  not limited to, the type of mobile device You use, Your mobile
                  device unique ID, the IP address of Your mobile device, Your
                  mobile operating system, the type of mobile Internet browser
                  You use, unique device identifiers and other diagnostic data.
                </p>
                <p>
                  We may also collect information that Your browser sends
                  whenever You visit our Service or when You access the Service
                  by or through a mobile device.
                </p>
                <h3>Information from Third-Party Social Media Services</h3>
                <p>
                  The Company allows You to create an account and log in to use
                  the Service through the following Third-party Social Media
                  Services:
                </p>
                <ul>
                  <li>Google</li>
                  <li>Facebook</li>
                  <li>Twitter</li>
                  <li>LinkedIn</li>
                </ul>
                <p>
                  If You decide to register through or otherwise grant us access
                  to a Third-Party Social Media Service, We may collect Personal
                  data that is already associated with Your Third-Party Social
                  Media Service's account, such as Your name, Your email
                  address, Your activities or Your contact list associated with
                  that account.
                </p>
                <p>
                  You may also have the option of sharing additional information
                  with the Company through Your Third-Party Social Media
                  Service's account. If You choose to provide such information
                  and Personal Data, during registration or otherwise, You are
                  giving the Company permission to use, share, and store it in a
                  manner consistent with this Privacy Policy.
                </p>
                <h3>Tracking Technologies and Cookies</h3>
                <p>
                  We use Cookies and similar tracking technologies to track the
                  activity on Our Service and store certain information.
                  Tracking technologies used are beacons, tags, and scripts to
                  collect and track information and to improve and analyze Our
                  Service. The technologies We use may include:
                </p>
                <ul>
                  <li>
                    <strong>Cookies or Browser Cookies.</strong> A cookie is a
                    small file placed on Your Device. You can instruct Your
                    browser to refuse all Cookies or to indicate when a Cookie
                    is being sent. However, if You do not accept Cookies, You
                    may not be able to use some parts of our Service. Unless you
                    have adjusted Your browser setting so that it will refuse
                    Cookies, our Service may use Cookies.
                  </li>
                  <li>
                    <strong>Web Beacons.</strong> Certain sections of our
                    Service and our emails may contain small electronic files
                    known as web beacons (also referred to as clear gifs, pixel
                    tags, and single-pixel gifs) that permit the Company, for
                    example, to count users who have visited those pages or
                    opened an email and for other related website statistics
                    (for example, recording the popularity of a certain section
                    and verifying system and server integrity).
                  </li>
                </ul>
                <p>
                  Cookies can be &quot;Persistent&quot; or &quot;Session&quot;
                  Cookies. Persistent Cookies remain on Your personal computer
                  or mobile device when You go offline, while Session Cookies
                  are deleted as soon as You close Your web browser. Learn more
                  about cookies on the{" "}
                  <a
                    href="https://www.privacypolicies.com/blog/privacy-policy-template/#Use_Of_Cookies_Log_Files_And_Tracking"
                    target="_blank"
                  >
                    Privacy Policies website
                  </a>{" "}
                  article.
                </p>
                <p>
                  We use both Session and Persistent Cookies for the purposes
                  set out below:
                </p>
                <ul>
                  <li>
                    <p>
                      <strong>Necessary / Essential Cookies</strong>
                    </p>
                    <p>Type: Session Cookies</p>
                    <p>Administered by: Us</p>
                    <p>
                      Purpose: These Cookies are essential to provide You with
                      services available through the Website and to enable You
                      to use some of its features. They help to authenticate
                      users and prevent fraudulent use of user accounts. Without
                      these Cookies, the services that You have asked for cannot
                      be provided, and We only use these Cookies to provide You
                      with those services.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>
                        Cookies Policy / Notice Acceptance Cookies
                      </strong>
                    </p>
                    <p>Type: Persistent Cookies</p>
                    <p>Administered by: Us</p>
                    <p>
                      Purpose: These Cookies identify if users have accepted the
                      use of cookies on the Website.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>Functionality Cookies</strong>
                    </p>
                    <p>Type: Persistent Cookies</p>
                    <p>Administered by: Us</p>
                    <p>
                      Purpose: These Cookies allow us to remember choices You
                      make when You use the Website, such as remembering your
                      login details or language preference. The purpose of these
                      Cookies is to provide You with a more personal experience
                      and to avoid You having to re-enter your preferences every
                      time You use the Website.
                    </p>
                  </li>
                </ul>
                <p>
                  For more information about the cookies we use and your choices
                  regarding cookies, please visit our Cookies Policy or the
                  Cookies section of our Privacy Policy.
                </p>
                <h2>Use of Your Personal Data</h2>
                <p>
                  The Company may use Personal Data for the following purposes:
                </p>
                <ul>
                  <li>
                    <p>
                      <strong>To provide and maintain our Service</strong>,
                      including to monitor the usage of our Service.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>To manage Your Account:</strong> to manage Your
                      registration as a user of the Service. The Personal Data
                      You provide can give You access to different
                      functionalities of the Service that are available to You
                      as a registered user.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>For the performance of a contract:</strong> the
                      development, compliance and undertaking of the purchase
                      contract for the products, items or services You have
                      purchased or of any other contract with Us through the
                      Service.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>To contact You:</strong> To contact You by email,
                      telephone calls, SMS, or other equivalent forms of
                      electronic communication, such as a mobile application's
                      push notifications regarding updates or informative
                      communications related to the functionalities, products or
                      contracted services, including the security updates, when
                      necessary or reasonable for their implementation.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>To provide You</strong> with news, special offers
                      and general information about other goods, services and
                      events which we offer that are similar to those that you
                      have already purchased or enquired about unless You have
                      opted not to receive such information.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>To manage Your requests:</strong> To attend and
                      manage Your requests to Us.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>For business transfers:</strong> We may use Your
                      information to evaluate or conduct a merger, divestiture,
                      restructuring, reorganization, dissolution, or other sale
                      or transfer of some or all of Our assets, whether as a
                      going concern or as part of bankruptcy, liquidation, or
                      similar proceeding, in which Personal Data held by Us
                      about our Service users is among the assets transferred.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>For other purposes</strong>: We may use Your
                      information for other purposes, such as data analysis,
                      identifying usage trends, determining the effectiveness of
                      our promotional campaigns and to evaluate and improve our
                      Service, products, services, marketing and your
                      experience.
                    </p>
                  </li>
                </ul>
                <p>
                  We may share Your personal information in the following
                  situations:
                </p>
                <ul>
                  <li>
                    <strong>With Service Providers:</strong> We may share Your
                    personal information with Service Providers to monitor and
                    analyze the use of our Service, to contact You.
                  </li>
                  <li>
                    <strong>For business transfers:</strong> We may share or
                    transfer Your personal information in connection with, or
                    during negotiations of, any merger, sale of Company assets,
                    financing, or acquisition of all or a portion of Our
                    business to another company.
                  </li>
                  <li>
                    <strong>With Affiliates:</strong> We may share Your
                    information with Our affiliates, in which case we will
                    require those affiliates to honor this Privacy Policy.
                    Affiliates include Our parent company and any other
                    subsidiaries, joint venture partners or other companies that
                    We control or that are under common control with Us.
                  </li>
                  <li>
                    <strong>With business partners:</strong> We may share Your
                    information with Our business partners to offer You certain
                    products, services or promotions.
                  </li>
                  <li>
                    <strong>With other users:</strong> when You share personal
                    information or otherwise interact in the public areas with
                    other users, such information may be viewed by all users and
                    may be publicly distributed outside. If You interact with
                    other users or register through a Third-Party Social Media
                    Service, Your contacts on the Third-Party Social Media
                    Service may see Your name, profile, pictures and description
                    of Your activity. Similarly, other users will be able to
                    view descriptions of Your activity, communicate with You and
                    view Your profile.
                  </li>
                  <li>
                    <strong>With Your consent</strong>: We may disclose Your
                    personal information for any other purpose with Your
                    consent.
                  </li>
                </ul>
                <h2>Retention of Your Personal Data</h2>
                <p>
                  The Company will retain Your Personal Data only for as long as
                  is necessary for the purposes set out in this Privacy Policy.
                  We will retain and use Your Personal Data to the extent
                  necessary to comply with our legal obligations (for example,
                  if we are required to retain your data to comply with
                  applicable laws), resolve disputes, and enforce our legal
                  agreements and policies.
                </p>
                <p>
                  The Company will also retain Usage Data for internal analysis
                  purposes. Usage Data is generally retained for a shorter
                  period of time, except when this data is used to strengthen
                  the security or to improve the functionality of Our Service,
                  or We are legally obligated to retain this data for longer
                  time periods.
                </p>
                <h2>Transfer of Your Personal Data</h2>
                <p>
                  Your information, including Personal Data, is processed at the
                  Company's operating offices and in any other places where the
                  parties involved in the processing are located. It means that
                  this information may be transferred to — and maintained on —
                  computers located outside of Your state, province, country or
                  other governmental jurisdiction where the data protection laws
                  may differ than those from Your jurisdiction.
                </p>
                <p>
                  Your consent to this Privacy Policy followed by Your
                  submission of such information represents Your agreement to
                  that transfer.
                </p>
                <p>
                  The Company will take all steps reasonably necessary to ensure
                  that Your data is treated securely and in accordance with this
                  Privacy Policy and no transfer of Your Personal Data will take
                  place to an organization or a country unless there are
                  adequate controls in place including the security of Your data
                  and other personal information.
                </p>
                <h2>Delete Your Personal Data</h2>
                <p>
                  You have the right to delete or request that We assist in
                  deleting the Personal Data that We have collected about You.
                </p>
                <p>
                  Our Service may give You the ability to delete certain
                  information about You from within the Service.
                </p>
                <p>
                  You may update, amend, or delete Your information at any time
                  by signing in to Your Account, if you have one, and visiting
                  the account settings section that allows you to manage Your
                  personal information. You may also contact Us to request
                  access to, correct, or delete any personal information that
                  You have provided to Us.
                </p>
                <p>
                  Please note, however, that We may need to retain certain
                  information when we have a legal obligation or lawful basis to
                  do so.
                </p>
                <h2>Disclosure of Your Personal Data</h2>
                <h3>Business Transactions</h3>
                <p>
                  If the Company is involved in a merger, acquisition or asset
                  sale, Your Personal Data may be transferred. We will provide
                  notice before Your Personal Data is transferred and becomes
                  subject to a different Privacy Policy.
                </p>
                <h3>Law enforcement</h3>
                <p>
                  Under certain circumstances, the Company may be required to
                  disclose Your Personal Data if required to do so by law or in
                  response to valid requests by public authorities (e.g. a court
                  or a government agency).
                </p>
                <h3>Other legal requirements</h3>
                <p>
                  The Company may disclose Your Personal Data in the good faith
                  belief that such action is necessary to:
                </p>
                <ul>
                  <li>Comply with a legal obligation</li>
                  <li>
                    Protect and defend the rights or property of the Company
                  </li>
                  <li>
                    Prevent or investigate possible wrongdoing in connection
                    with the Service
                  </li>
                  <li>
                    Protect the personal safety of Users of the Service or the
                    public
                  </li>
                  <li>Protect against legal liability</li>
                </ul>
                <h2>Security of Your Personal Data</h2>
                <p>
                  The security of Your Personal Data is important to Us, but
                  remember that no method of transmission over the Internet, or
                  method of electronic storage is 100% secure. While We strive
                  to use commercially acceptable means to protect Your Personal
                  Data, We cannot guarantee its absolute security.
                </p>
                <h1>Children's Privacy</h1>
                <p>
                  Our Service does not address anyone under the age of 13. We do
                  not knowingly collect personally identifiable information from
                  anyone under the age of 13. If You are a parent or guardian
                  and You are aware that Your child has provided Us with
                  Personal Data, please contact Us. If We become aware that We
                  have collected Personal Data from anyone under the age of 13
                  without verification of parental consent, We take steps to
                  remove that information from Our servers.
                </p>
                <p>
                  If We need to rely on consent as a legal basis for processing
                  Your information and Your country requires consent from a
                  parent, We may require Your parent's consent before We collect
                  and use that information.
                </p>
                <h1>Links to Other Websites</h1>
                <p>
                  Our Service may contain links to other websites that are not
                  operated by Us. If You click on a third party link, You will
                  be directed to that third party's site. We strongly advise You
                  to review the Privacy Policy of every site You visit.
                </p>
                <p>
                  We have no control over and assume no responsibility for the
                  content, privacy policies or practices of any third party
                  sites or services.
                </p>
                <h1>Changes to this Privacy Policy</h1>
                <p>
                  We may update Our Privacy Policy from time to time. We will
                  notify You of any changes by posting the new Privacy Policy on
                  this page.
                </p>
                <p>
                  We will let You know via email and/or a prominent notice on
                  Our Service, prior to the change becoming effective and update
                  the &quot;Last updated&quot; date at the top of this Privacy
                  Policy.
                </p>
                <p>
                  You are advised to review this Privacy Policy periodically for
                  any changes. Changes to this Privacy Policy are effective when
                  they are posted on this page.
                </p>
                <h1>Contact Us</h1>
                <p>
                  If you have any questions about this Privacy Policy, You can
                  contact us:
                </p>
                <ul>
                  <li>
                    By email:{" "}
                    <a
                      href="/cdn-cgi/l/email-protection"
                      class="__cf_email__"
                      data-cfemail="3e4d5f5310475f4e555149574a447e51554a5f105d5153"
                    >
                      [email&#160;protected]
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div class="footer">
            <div class="container">
              <button
                onClick={() => navigate("/")}
                style={{ display: "inline-block" }}
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 padding-left:20px"
              >
                Return Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function TermsOfService() {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ width: "800px", margin: "0 auto" }}>
        <h1>Terms of Service</h1>
        <p>
          These terms and conditions (&#8220;Agreement&#8221;) set forth the
          general terms and conditions of your use of the{" "}
          <a href="https://demo0.sam-yap.com">demo0.sam-yap.com</a> website
          (&#8220;Website&#8221; or &#8220;Service&#8221;) and any of its
          related products and services (collectively, &#8220;Services&#8221;).
          This Agreement is legally binding between you (&#8220;User&#8221;,
          &#8220;you&#8221; or &#8220;your&#8221;) and this Website operator
          (&#8220;Operator&#8221;, &#8220;we&#8221;, &#8220;us&#8221; or
          &#8220;our&#8221;). If you are entering into this agreement on behalf
          of a business or other legal entity, you represent that you have the
          authority to bind such entity to this agreement, in which case the
          terms &#8220;User&#8221;, &#8220;you&#8221; or &#8220;your&#8221;
          shall refer to such entity. If you do not have such authority, or if
          you do not agree with the terms of this agreement, you must not accept
          this agreement and may not access and use the Website and Services. By
          accessing and using the Website and Services, you acknowledge that you
          have read, understood, and agree to be bound by the terms of this
          Agreement. You acknowledge that this Agreement is a contract between
          you and the Operator, even though it is electronic and is not
          physically signed by you, and it governs your use of the Website and
          Services.
        </p>
        <div class="wpembed-index">
          <h3>Table of contents</h3>
          <ol class="wpembed-index">
            <li>
              <a href="#accounts-and-membership">Accounts and membership</a>
            </li>
            <li>
              <a href="#links-to-other-resources">Links to other resources</a>
            </li>
            <li>
              <a href="#prohibited-uses">Prohibited uses</a>
            </li>
            <li>
              <a href="#limitation-of-liability">Limitation of liability</a>
            </li>
            <li>
              <a href="#changes-and-amendments">Changes and amendments</a>
            </li>
            <li>
              <a href="#acceptance-of-these-terms">Acceptance of these terms</a>
            </li>
            <li>
              <a href="#contacting-us">Contacting us</a>
            </li>
          </ol>
        </div>
        <h2 id="accounts-and-membership">Accounts and membership</h2>
        <p>
          You must be at least 18 years of age to use the Website and Services.
          By using the Website and Services and by agreeing to this Agreement
          you warrant and represent that you are at least 18 years of age. If
          you create an account on the Website, you are responsible for
          maintaining the security of your account and you are fully responsible
          for all activities that occur under the account and any other actions
          taken in connection with it. We may, but have no obligation to,
          monitor and review new accounts before you may sign in and start using
          the Services. Providing false contact information of any kind may
          result in the termination of your account. You must immediately notify
          us of any unauthorized uses of your account or any other breaches of
          security. We will not be liable for any acts or omissions by you,
          including any damages of any kind incurred as a result of such acts or
          omissions. We may suspend, disable, or delete your account (or any
          part thereof) if we determine that you have violated any provision of
          this Agreement or that your conduct or content would tend to damage
          our reputation and goodwill. If we delete your account for the
          foregoing reasons, you may not re-register for our Services. We may
          block your email address and Internet protocol address to prevent
          further registration.
        </p>
        <h2 id="links-to-other-resources">Links to other resources</h2>
        <p>
          Although the Website and Services may link to other resources (such as
          websites, mobile applications, etc.), we are not, directly or
          indirectly, implying any approval, association, sponsorship,
          endorsement, or affiliation with any linked resource, unless
          specifically stated herein. We are not responsible for examining or
          evaluating, and we do not warrant the offerings of, any businesses or
          individuals or the content of their resources. We do not assume any
          responsibility or liability for the actions, products, services, and
          content of any other third parties. You should carefully review the
          legal statements and other conditions of use of any resource which you
          access through a link on the Website. Your linking to any other
          off-site resources is at your own risk.
        </p>
        <h2 id="prohibited-uses">Prohibited uses</h2>
        <p>
          In addition to other terms as set forth in the Agreement, you are
          prohibited from using the Website and Services or Content: (a) for any
          unlawful purpose; (b) to solicit others to perform or participate in
          any unlawful acts; (c) to violate any international, federal,
          provincial or state regulations, rules, laws, or local ordinances; (d)
          to infringe upon or violate our intellectual property rights or the
          intellectual property rights of others; (e) to harass, abuse, insult,
          harm, defame, slander, disparage, intimidate, or discriminate based on
          gender, sexual orientation, religion, ethnicity, race, age, national
          origin, or disability; (f) to submit false or misleading information;
          (g) to upload or transmit viruses or any other type of malicious code
          that will or may be used in any way that will affect the functionality
          or operation of the Website and Services, third party products and
          services, or the Internet; (h) to spam, phish, pharm, pretext, spider,
          crawl, or scrape; (i) for any obscene or immoral purpose; or (j) to
          interfere with or circumvent the security features of the Website and
          Services, third party products and services, or the Internet. We
          reserve the right to terminate your use of the Website and Services
          for violating any of the prohibited uses.
        </p>
        <h2 id="limitation-of-liability">Limitation of liability</h2>
        <p>
          To the fullest extent permitted by applicable law, in no event will
          the Operator, its affiliates, directors, officers, employees, agents,
          suppliers or licensors be liable to any person for any indirect,
          incidental, special, punitive, cover or consequential damages
          (including, without limitation, damages for lost profits, revenue,
          sales, goodwill, use of content, impact on business, business
          interruption, loss of anticipated savings, loss of business
          opportunity) however caused, under any theory of liability, including,
          without limitation, contract, tort, warranty, breach of statutory
          duty, negligence or otherwise, even if the liable party has been
          advised as to the possibility of such damages or could have foreseen
          such damages. To the maximum extent permitted by applicable law, the
          aggregate liability of the Operator and its affiliates, officers,
          employees, agents, suppliers and licensors relating to the services
          will be limited to an amount no greater than one dollar or any amounts
          actually paid in cash by you to the Operator for the prior one month
          period prior to the first event or occurrence giving rise to such
          liability. The limitations and exclusions also apply if this remedy
          does not fully compensate you for any losses or fails of its essential
          purpose.
        </p>
        <h2 id="changes-and-amendments">Changes and amendments</h2>
        <p>
          We reserve the right to modify this Agreement or its terms related to
          the Website and Services at any time at our discretion. When we do, we
          will revise the updated date at the bottom of this page. We may also
          provide notice to you in other ways at our discretion, such as through
          the contact information you have provided.
        </p>
        <p>
          An updated version of this Agreement will be effective immediately
          upon the posting of the revised Agreement unless otherwise specified.
          Your continued use of the Website and Services after the effective
          date of the revised Agreement (or such other act specified at that
          time) will constitute your consent to those changes.
        </p>
        <h2 id="acceptance-of-these-terms">Acceptance of these terms</h2>
        <p>
          You acknowledge that you have read this Agreement and agree to all its
          terms and conditions. By accessing and using the Website and Services
          you agree to be bound by this Agreement. If you do not agree to abide
          by the terms of this Agreement, you are not authorized to access or
          use the Website and Services. This terms and conditions policy was
          created with the help of{" "}
          <a
            href="https://www.websitepolicies.com"
            target="_blank"
            rel="nofollow"
          >
            WebsitePolicies
          </a>
          .
        </p>
        <h2 id="contacting-us">Contacting us</h2>
        <p>
          If you have any questions, concerns, or complaints regarding this
          Agreement, we encourage you to contact us using the details below:
        </p>
        <p>
          <a href="&#109;&#097;&#105;&#108;&#116;&#111;&#058;sam.&#121;&#97;p&#107;ow&#105;tz&#64;&#111;k&#116;&#97;.&#99;&#111;&#109;">
            &#115;&#97;m&#46;&#121;&#97;&#112;&#107;&#111;&#119;&#105;t&#122;&#64;ok&#116;a&#46;&#99;&#111;m
          </a>
        </p>
        <p>This document was last updated on January 24, 2023</p>
        <p class="madewith">
          <a
            href="https://www.websitepolicies.com/?via=madewithbadge"
            target="_blank"
            rel="nofollow"
          >
            <img
              width="200"
              height="25"
              alt="Made with WebsitePolicies"
              src="https://cdn.websitepolicies.io/img/badge.png"
              srcset="https://cdn.websitepolicies.io/img/badge_2x.png 2x"
            />
          </a>
        </p>
        <button
          onClick={() => navigate("/")}
          style={{ display: "inline-block" }}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Return Home
        </button>
      </div>
    </>
  );
}

function About() {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ width: "800px", margin: "0 auto" }}>
        <h1>About</h1>
        <p>
          Hello! This application is designed to allow users to see the value of
          Auth0. Using this application you can interact with the Auth0 service
          by authenticating with a variety of authentication methods such as:
          UN/PW, Social OAuth 2.0 and enterprise federation leveraging SAML and
          OIDC.
        </p>
        <br></br>
        <br></br>
        <p>
          You can get started by clicking below and trying out one of the
          authentication methods using the Auth0 Universal Login. Once you login
          you can view the information returned in your tokens, go through MFA
          challenges and SSO into other applications.
        </p>
        <button
          onClick={() => navigate("/")}
          style={{ display: "inline-block" }}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Get Started
        </button>
      </div>
    </>
  );
}

function SSO() {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let connection = params.get("connection") || null;
    let organization = params.get("organization") || null;
    let locale = params.get("locale") || null;

    if (connection && organization) {
      loginWithRedirect({ authorizationParams: { connection: connection, organization: organization }});
    } else if (connection) {
      loginWithRedirect({ authorizationParams: { connection: connection }});
    } else if (locale) {
      loginWithRedirect({ authorizationParams: { ui_locales: locale }});
    } else {
      loginWithRedirect();
    }    
  }, []);

  waveform.register();

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      margin: 0,
    }}>
      <div style={{
        width: '200px',
        height: '200px',
        textAlign: 'center',
        lineHeight: '200px',
      }}>
        <l-waveform
          size="80"
          speed="1.2" 
          stroke="7"
          color="black" 
        ></l-waveform>
      </div>
    </div>
  );
}
