import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import '../App.css'

function LoginButton(props) {
    const { loginWithRedirect } = useAuth0();
    return (
        <button 
            onClick={()=>loginWithRedirect({organization: props.organization, login_hint: props.email})} 
            style={{display: 'inline-block'}}
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
            Login
        </button>
    )
}

export default LoginButton