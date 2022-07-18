import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'
import '../App.css'

function Logout(props) {
    const { logout } = useAuth0()
    return (
        <div>
            <button 
                onClick={()=>logout()} 
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                Logout
                </button>
        </div>
    )
}

export default Logout