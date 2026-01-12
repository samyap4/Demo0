import { useState, Fragment, useEffect, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Transition, Disclosure, Menu } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import jwt_decode from "jwt-decode";
import googleOneTap from "google-one-tap";
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { useNavigate } from "react-router-dom";

export default function Home() {
  const {
    user,
    loginWithRedirect,
    logout,
    isLoading,
    isAuthenticated,
    getAccessTokenSilently,
    exchangeToken
  } = useAuth0();

  const navigate = useNavigate();

  const [ idClaims, setIdClaims ] = useState();
  const [ accessToken, setAccessToken ] = useState();
  const [ errorDescription, setErrorDescription ] = useState();
  const [ companyId, setCompanyId ] = useState(null);
  
  const orgName = idClaims ? idClaims['https://samyap.dev/org_name'] : null;
  const orgLogoUrl = idClaims ? idClaims['https://samyap.dev/org_logo_url'] : null;

  const { data } = useVisitorData(
    { extendedResult: true },
    { immediate: true }
  );

  const getClaims = useCallback(async () => {
    const auth0AccessTokenValues = localStorage.getItem(
      "@@auth0spajs@@::jy9k2snrECCsGY6iDyTAOUFH9UEApycT::https://edge.samyap.dev/api::openid profile email offline_access",
    );
    const auth0IdTokenValues = localStorage.getItem(
      "@@auth0spajs@@::jy9k2snrECCsGY6iDyTAOUFH9UEApycT::@@user@@",
    );
    
    let rawAccessToken = JSON.parse(auth0AccessTokenValues)?.body?.access_token;
    let IdClaims = JSON.parse(auth0IdTokenValues)?.decodedToken?.claims;

    if (IdClaims) {
      setIdClaims(IdClaims);
      setAccessToken(jwt_decode(rawAccessToken));
    }
  }, []);

  useEffect(() => {
    getClaims();
  }, [user]);

  const params = new URLSearchParams(window.location.search);
  useEffect(() => {
    let error = params.get("error_description");
    if (error) {
      setErrorDescription(error);
    } else {
      const companyIds = {
        "lululemon": "org_RUz5Akf1AnP7YnqQ",
        "southwest": "org_9rXgKnxL3dMy2Tpa",
        "wholefoods": "org_TYC0okL11U149FP4",
        "afcu": "org_W6PaFrPeY4kMxF90"
      };
      
      let org = params.get("company");
      setCompanyId(companyIds[org] || undefined);
    }
  }, [params]);

  const goToAWS = () => {
    window.open(
      "https://auth.samyap.dev/samlp/9l7gswp9KpFoj0k7v1cRQUsoMlKLMyZE",
      "_blank",
    );
  };

  const goToOktaReact = () => {
    window.open(
      "https://auth.samyap.dev/samlp/UzuMwOYAuauzsOBMOPY2esnrN9978oxE?RelayState=https://blueocean.samyap.dev/sso/callback",
      "_blank",
    );
  };

  const goToXAppSSO = () => {
    window.open(
      "https://app1.samyap.dev",
      "_blank",
    );
  };

  const clearAllSessions = async () => {
    const response = await fetch('https://edge.samyap.dev/api/clear-all-sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: errorDescription.split(':')[1] }),
    });

    const responseData = await response.json();

    console.log(responseData);

    if (responseData.message) {
      navigate("/sso");
    }
  }

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ");
  };

  const navigation = [
    { name: "Home", href: "#", current: true },
    { name: "About", href: "about", current: false },
    { name: "Privacy Policy", href: "privacy-policy", current: false },
    { name: "Terms of Service", href: "terms-of-service", current: false },
  ];

  const generateNonce = () => {
    const array = new Uint8Array(16);
    crypto.getRandomValues(array);
    return btoa(String.fromCharCode(...array))
      .replace(/[+/=]/g, '')
      .slice(0, 22);
  };


  const [loginData, setLoginData] = useState();

  // Google One Tap Code
  useEffect(() => {
    const options = {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // required
      auto_select: false, // optional
      cancel_on_tap_outside: false, // optional
      context: "signin", // optional
      use_fedcm_for_prompt: true,
      nonce: generateNonce()
    };

    if (!loginData && !isAuthenticated && !errorDescription && !isLoading && !companyId) {
      googleOneTap(options, async (response) => {
        setLoginData(response);
        try {
          await exchangeToken({
            subject_token: response.credential,
            subject_token_type: 'http://auth0.com/oauth/token-type/google-id-token'
          });
        } catch (err) {
          console.err("Login failed", err);
        }
      });
    }
  }, [loginData, errorDescription, isLoading, isAuthenticated]);

  const logoutGlobally = () => {
    setLoginData(null);
    logout();
  };

  const fetchAccessTokenSilently = () => {
    getAccessTokenSilently({
      acr_values: "http://schemas.openid.net/pape/policies/2007/06/multi-factor",
    });
  }

  const loginButtons = [
    { text: "Login", params: companyId ? { organization: companyId, visitorId: data?.visitorId } : { visitorId: data?.visitorId } },
    { text: "Login w SSO", params: { connection: "Lululemon" } },
    { text: "Login w Lululemon Org", params: { organization: "org_RUz5Akf1AnP7YnqQ" } },
    { text: "Login w SMS OTP", params: { connection: "sms" } },
    { text: "Login w Email OTP", params: { connection: "email"} },
    { text: "Login w Passkey", params: { "ext-alt-brand": "passkey_only" } },
    { text: "Login w Alt Brand", params: { "ext-alt-brand": "portal_1" } },
    { text: "Login w Custom DB", params: { connection: "custom-db" } },
    // { text: "Login w Cognito", params: { connection: "cognito-custom-db" } },
    { text: "Login w Firebase", params: { connection: "firebase-auth-migration" } },
    { text: "Login w Phone", params: { connection: "phone" } },
    {
      text: "Signup",
      params: {
        screen_hint: "signup",
        connection: "Username-Password-Authentication",
        scope: "ab-experiment-1",
      },
    },
    { text: "Login w ConvergedDB", params: { connection: "PasswordlessConnection" } },
    // {
    //   text: "Signup - Post Eligibility",
    //   params: {
    //     screen_hint: "signup",
    //     connection: "Username-Password-Authentication",
    //     scope: "tivity_user_id:12345678",
    //     login_hint: "test@test.com",
    //   },
    // },
  ];

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium",
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        {/* {profileImage ? <img
                        className="h-8 w-8 rounded-full"
                        src={profileImage}
                        alt=""
                      /> :
                      <UserIcon className="h-6 w-6" aria-hidden="true"/>} */}
                      </Menu.Button>
                    </>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700",
                              )}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700",
                              )}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700",
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium",
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <br></br>
      <br></br>
      <div style={{ width: "1100px", margin: "0 auto" }}>
        {!user && !errorDescription && (
          <>
            <LoginDropdown loginButtons={loginButtons} loginWithRedirect={loginWithRedirect} />
          </>
        )}
        {!user && errorDescription && (
          <>
            <p>{errorDescription}</p>
            <button
              onClick={() => loginWithRedirect({authorizationParams: { prompt: "login" }})}
              style={{ display: "inline-block", marginLeft: "10px" }}
              class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Log In
            </button>
            <button
              onClick={() => clearAllSessions()}
              style={{ display: "inline-block", marginLeft: "10px" }}
              class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign Me Out of All Devices
            </button>
          </>
        )}
        {user && (
          <div style={{ margin: "auto" }}>
            <div
              class="relative shadow-md sm:rounded-lg"
              style={{ display: "inline-block" }}
            >
              <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      ID
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Email
                    </th>
                    {orgName && 
                      <th scope="col" class="px-6 py-3">
                        Org
                      </th>
                    }
                  </tr>
                </thead>
                <tbody>
                  <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      class="whitespace-nowrap px-12 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {user.nickname}
                    </th>
                    <td class="whitespace-nowrap px-6 py-4 font-medium dark:text-white">
                      {user.email}
                    </td>
                    {orgName && (
                      <td class="whitespace-nowrap px-6 py-4 font-medium dark:text-white">
                        <div class="flex items-center">
                          <span>{orgName}</span>
                          <img
                            src={orgLogoUrl}
                            alt={`${orgName} logo`}
                            class="ml-3 h-8 w-8 rounded-full object-cover"
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                </tbody>
              </table>
            </div>
            <br></br>
            <>
              <button
                onClick={() => logoutGlobally()}
                class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Logout
              </button>
            </>
            <br />
            <hr />
            <br />
            <>
              <button
                onClick={() => goToOktaReact()}
                class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Partner App
              </button>
              <button
                onClick={() => goToAWS()}
                style={{ display: "inline-block", marginLeft: "10px" }}
                class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                AWS - SSO
              </button>
              <button
                onClick={() =>
                  loginWithRedirect({
                    authorizationParams: {
                      acr_values:
                      "http://schemas.openid.net/pape/policies/2007/06/multi-factor",
                    }
                  })
                }
                style={{ display: "inline-block", marginLeft: "10px" }}
                class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Issue MFA
              </button>
              <button
                onClick={() =>
                  loginWithRedirect({authorizationParams: { organization: "org_3vMJmTZoFIpZ1tp5" }})
                }
                style={{ display: "inline-block", marginLeft: "10px" }}
                class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login to Team B
              </button>
              <button
                onClick={() => goToXAppSSO()}
                style={{ display: "inline-block", marginLeft: "10px" }}
                class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                X-App SSO
              </button>
              <button
                onClick={() => fetchAccessTokenSilently()}
                style={{ display: "inline-block", marginLeft: "10px" }}
                class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Get New Access Token
              </button>
            </>
            <br />
            <br />
            <hr />
            <br />
            <>
              <div class="w-full max-w-sm overflow-scroll lg:flex lg:max-w-full">
                <div class="px-6 py-4">
                  <div class="mb-2 text-xl font-bold">Id Token</div>
                  <p class="text-xs text-gray-700">
                    <pre>{JSON.stringify(idClaims, null, 2)}</pre>
                  </p>
                </div>
              </div>
              <br />
              <hr />
              <br />
              <div class="w-full max-w-sm overflow-scroll lg:flex lg:max-w-full">
                <div class="px-6 py-4">
                  <div class="mb-2 text-xl font-bold">Access Token</div>
                  <p class="text-xs text-gray-700">
                    <pre>{JSON.stringify(accessToken, null, 2)}</pre>
                  </p>
                </div>
              </div>
            </>
          </div>
        )}
      </div>
    </>
  );
}


const LoginDropdown = ({ loginButtons, loginWithRedirect }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const selectedButton = loginButtons.find(button => button.text === selectedOption) ?? loginButtons[0];

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  return (
    <>
    <select
      value={selectedOption}
      onChange={handleChange}
      style={{ display: "inline-block"}}
      className="bg-gray-300 border border-white-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  max-w-sm mx-auto"
    >
      <option value="" disabled>Select a login option</option>
      {loginButtons.map((button) => (
        <option key={button.text} value={button.text}>
          {button.text}
        </option>
      ))}
    </select>
      <button
        onClick={() => loginWithRedirect({authorizationParams: selectedButton.params})}
        style={{ display: "inline-block", marginLeft: "10px" }}
        class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Go
      </button>
    </>
  );
};
