import React, { useState, Fragment, useEffect, useCallback } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Transition, Disclosure, Menu } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/outline'
import jwt_decode from "jwt-decode";
import googleOneTap from "google-one-tap";

export default function Home() {
  const { user, loginWithRedirect, getIdTokenClaims, getAccessTokenSilently, logout, isLoading, isAuthenticated } = useAuth0();
  const [ idClaims, setIdClaims ] = useState();
  const [ accessToken, setAccessToken ] = useState();
  const [ errorDescription, setErrorDescription ] = useState();

  const getClaims = useCallback(async () => {
    const data = await getIdTokenClaims();
    setIdClaims(data);
    await new Promise(resolve => setTimeout(resolve, 300));
    const auth0Values = localStorage.getItem('@@auth0spajs@@::jy9k2snrECCsGY6iDyTAOUFH9UEApycT::http://localhost:8080::openid profile email offline_access');
    console.log(auth0Values);
    let rawToken = JSON.parse(auth0Values)?.body?.access_token;
    if (rawToken === null || rawToken === undefined) {
      console.log('getting new tokens')
      rawToken = await getAccessTokenSilently({audience: 'http://localhost:8080'})
    }
    setAccessToken(jwt_decode(rawToken));
  }, [setAccessToken, setIdClaims]);

  useEffect(() => {
    if (user) {
      getClaims();
    }
  }, [user]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let error = params.get('error_description');
    if (error) {
      setErrorDescription(error);
    }
  }, []);

  const goToDatadog = () => {
    window.open('https://auth.samyap.dev/samlp/2OoBeHp2MThFiczdXVdrTJh5YHIE9p85', '_blank');
  }

  const goToAWS = () => {
    window.open('https://auth.samyap.dev/samlp/9l7gswp9KpFoj0k7v1cRQUsoMlKLMyZE', '_blank');
  }

  const goToOktaReact = () => {
    window.open('https://auth.samyap.dev/samlp/UzuMwOYAuauzsOBMOPY2esnrN9978oxE?RelayState=https://blueocean.samyap.dev/sso/callback', '_blank');
  }

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ')
  }

  const navigation = [
    { name: 'Home', href: '#', current: true },
    { name: 'About', href: 'about', current: false },
    { name: 'Privacy Policy', href: 'privacy-policy', current: false },
    { name: 'Terms of Service', href: 'terms-of-service', current: false },
  ];

  const [loginData, setLoginData] = useState(
    localStorage.getItem("loginData")
      ? JSON.parse(localStorage.getItem("loginData"))
      : null
  );

  useEffect(() => {
    const options = {
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // required
      auto_select: false, // optional
      cancel_on_tap_outside: false, // optional
      context: "signin", // optional
    };

    if (!loginData && !isAuthenticated && !errorDescription && !isLoading) {
      googleOneTap(options, async (response) => {
        setLoginData(response);
        localStorage.setItem("loginData", JSON.stringify(response));
        let jwt = jwt_decode(response.credential);
        try {
          const options = {
           redirect_uri: window.location.origin,
           login_hint: jwt.email,
           connection: 'google-oauth2'
          };
          loginWithRedirect(options);
        } catch (err) {
         console.err("Login failed", err);
        }
      });
    }
  }, [loginData, errorDescription, isLoading, isAuthenticated]);

  const logoutGlobally = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
    logout();
  };

  const loginButtons = [
    { text: 'Login', params: { custom_workflow: '1' } },
    { text: 'Login w SSO', params: { connection: 'OktaSAML' } },
    { text: 'Login w Org A', params: { organization: 'org_uTGQp17SrA1PX0tY' } },
    { text: 'Login w Org B', params: { organization: 'org_3vMJmTZoFIpZ1tp5' } },
    { text: 'Login w SMS', params: { connection: 'sms' } },
    { text: 'Login w Alt Brand', params: { 'ext-alt-brand' : 'portal_1' } },
    { text: 'Login w Custom DB', params: { connection : 'custom-db' } },
    { text: 'Signup', params: { screen_hint: 'signup' } },
  ];
  
  return (
    <>
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
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
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white text-gray-400 hover:text-white">
                      <span className="sr-only">Open user menu</span>
                      {/* {profileImage ? <img
                        className="h-8 w-8 rounded-full"
                        src={profileImage}
                        alt=""
                      /> :
                      <UserIcon className="h-6 w-6" aria-hidden="true"/>} */}
                      
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
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
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
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
    <div style={{width:"1100px", margin:"0 auto"}}>
      {!user && !errorDescription &&
        <>
          {loginButtons.map(b => {
            return (
                    <button 
                      onClick={() => loginWithRedirect(b.params)} 
                      style={{display: 'inline-block', marginLeft: '10px'}}
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {b.text}
                    </button>
            );
          })}
        </>
      }
      {!user && errorDescription && 
        <>
          <p>{errorDescription}</p>
          <button 
          onClick={() => loginWithRedirect({prompt: 'login'})} 
          style={{display: 'inline-block', marginLeft: '10px'}}
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Log In
        </button>
        </>
      }
      {user &&
        <div style={{margin: 'auto'}}>
          <div class="relative shadow-md sm:rounded-lg" style={{display: 'inline-block'}}>
              <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" class="px-6 py-3">
                              ID
                          </th>
                          <th scope="col" class="px-6 py-3">
                              Email
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" class="px-12 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                            {user.nickname}
                          </th>
                          <td class="px-6 py-4 dark:text-white whitespace-nowrap font-medium">
                            {user.email}
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>
          <br></br>
          <div>
            <button 
                onClick={() => logoutGlobally()} 
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                Logout
                </button>
        </div>
          <br/>
          <hr/>
          <br/>
          <>
          <button 
                onClick={() => goToOktaReact()} 
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                Partner App
                </button>
            <button 
                onClick={() => goToAWS()} 
                style={{display: 'inline-block', marginLeft: '10px'}}
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                AWS - SSO
                </button>
                <button 
                onClick={() => loginWithRedirect({acr_values: 'http://schemas.openid.net/pape/policies/2007/06/multi-factor'})} 
                style={{display: 'inline-block', marginLeft: '10px'}}
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Issue MFA
              </button>
              <button 
                onClick={() => loginWithRedirect({organization: 'org_3vMJmTZoFIpZ1tp5'})} 
                style={{display: 'inline-block', marginLeft: '10px'}}
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login to Team B
              </button>
          </>
          <br/>
          <br/>
          <hr/>
          <br/>
          <>
          <div class="max-w-sm w-full lg:max-w-full lg:flex overflow-scroll">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Id Token</div>
              <p class="text-gray-700 text-xs">
              <pre>{JSON.stringify(idClaims, null, 2)}</pre>
              </p>
            </div>
          </div>
          <br/>
          <hr/>
          <br/>
          <div class="max-w-sm w-full lg:max-w-full lg:flex overflow-scroll">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">Access Token</div>
              <p class="text-gray-700 text-xs">
              <pre>{JSON.stringify(accessToken, null, 2)}</pre>
              </p>
            </div>
          </div>
          </>
        </div>
      }
    </div>
    </>
  )
}