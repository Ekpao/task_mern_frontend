import React from 'react'
import { FiLogIn , FiLogOut } from "react-icons/fi"
import { BiUserPlus, BiColumns } from 'react-icons/bi';
import {useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../app/features/auth/authSlice'

export default function Header() {
         
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  
  const logoutFn = () => {
   dispatch(logout())
   dispatch(reset())
   navigate('/')
   }

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* À GAUCHE : Nom du site (comme sur ta capture) */}
        <a href="/" className="text-xl font-bold tracking-tight text-gray-900 hover:text-indigo-600 transition">
          Task Creator
        </a>

        {/* AU MILIEU : Lien Dashboard optionnel */}
        <nav className="hidden sm:flex items-center space-x-1">
          <a href="/" className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition">
            <BiColumns className="text-lg" />
            <span>Dashboard</span>
          </a>
        </nav>

        {/* À DROITE : Login et Register avec les icônes */}
        <div className="flex items-center space-x-4">
          {/* Bouton Login */}
          { user ? (
        <button 
        onClick={logoutFn}
         className="flex items-center space-x-2 text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 transition cursor-pointer py-2 px-4 rounded-lg active:scale-[0.98]"
         >
         <FiLogOut className="text-lg" />
         <span>Logout</span>
         </button>
         ) : ( <>
          <a 
            href="/login" 
            className="flex items-center space-x-2 text-sm font-semibold text-gray-700 hover:text-indigo-600 transition py-2 px-3 rounded-lg hover:bg-gray-50"
          >
            <FiLogIn className="text-lg" />
            <span>Login</span>
          </a>

          {/* Bouton Register (Habillé aux couleurs indigo de tes formulaires) */}
          <a 
            href="/register" 
            className="flex items-center space-x-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition py-2 px-4 rounded-lg shadow-sm active:scale-[0.98]"
          >
            <BiUserPlus className="text-xl" />
            <span>Register</span>
          </a> </> )
           }
        </div>
      </div>
    </header>
  );
}