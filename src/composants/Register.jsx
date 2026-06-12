


import { useState , useEffect} from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { register, reset } from '../app/features/auth/authSlice'
import Spinner from "./Spinner"



const Register = ()=>{
  
  const [formData, setFormData] = useState({ nom: "", email: "", password: "", password2: "" })
  const { nom, email, password, password2 } = formData ;
  
const navigate = useNavigate()
const dispatch = useDispatch()
const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)

useEffect(() => {
if (isError) toast.error(message)
if (isSuccess || user) navigate('/')
dispatch(reset())} , [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = e => {
  setFormData(prevState => ({
  ...prevState ,
  [e.target.name]: e.target.value
  }))
  }
  const onSubmit = e => {
     e.preventDefault() 
     if (password !== password2) {
toast.error('Les mots de passe sont différents')

} else {
const userData = { nom, email, password }
dispatch(register(userData))
}
}

return( 
  isLoading ? <Spinner/> : ( 
        <>        
          <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
  {/* Le bloc conteneur blanc avec ombre douce (shadow-xl) et angles arrondis (rounded-2xl) */}
  <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-100">
    
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900">
        Create your account
      </h2>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={onSubmit} className="space-y-5">
        
        {/* 1. Champ Nom complet */}
        <div>
          <label htmlFor="nom"  className="block text-sm font-semibold text-gray-700">
            Full Name
          </label>
          <div className="mt-1.5">
            <input
              id="nom"
              name="nom"
              type="text"
              required
              value={nom}
              onChange={onChange}
              placeholder="Veuillez entrer votre nom complet"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm transition"
            />
          </div>
        </div>

        {/* 2. Champ Adresse Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Email address
          </label>
          <div className="mt-1.5">
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={onChange}
              autoComplete="email"
              placeholder="Veuillez entrer votre adresse email"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm transition"
            />
          </div>
        </div>

        {/* 3. Champ Mot de passe */}
        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
            Password
          </label>
          <div className="mt-1.5">
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={onChange}
              autoComplete="new-password"
              placeholder="Veuillez créer un mot de passe"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm transition"
            />
          </div>
        </div>
         {/*Champ de confirmation du mot de passe*/}
          <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
            Confirm your password
          </label>
          <div className="mt-1.5">
            <input
              id="password2"
              name="password2"
              type="password"
              required
              value={password2}
              onChange={onChange}
              autoComplete="password2"
              placeholder="Confirmez votre mot de passe"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm transition"
            />
          </div>
        </div>
        {/* Bouton de validation */}
        <div className="pt-2">
          <button
            type="submit"
            className="cursor-pointer flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-100 hover:bg-indigo-700 transition duration-200 active:scale-[0.98]"
          >
            Register
          </button>
        </div>
      </form>

      {/* Redirection vers Connexion */}
      <p className="mt-8 text-center text-sm text-gray-500">
        Avez-vous déjà un compte ?{' '}
        <a href="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition hover:underline">
          Connectez-vous
        </a>
      </p>
    </div>

  </div>
</div>
        </> )
    )
}
 
export default Register;