import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../app/features/auth/authSlice'
import Spinner from './Spinner'


const Login = ()=>{
    
    const [formData, setFormData] = useState({ email: "" , password: "" })
    const { email, password } = formData
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)
    useEffect(()=>{
      if (isError) toast.error(message)
        if(isSuccess || user) navigate('/')
          dispatch(reset())
    }, [isError , isSuccess, user , isLoading , navigate , dispatch])

    const onChange = e => {
     setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
   }
    const onSubmit = e => {
      e.preventDefault()
      const userData = { email, password }
      dispatch(login(userData))
    }
    return(
      isLoading ? <Spinner/> : ( 
        <>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
  <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-100">
    
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 className="text-center text-3xl font-extrabold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit ={onSubmit} className="space-y-5">
        <div>
          {/*Champ pour l'email*/ }
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
            Email address
          </label>
          <div className="mt-1.5">
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Veuillez entrer votre adresse email"
              onChange={onChange}
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm transition"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            {/* Champ pour le password*/}
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
          </div>
          <div className="mt-1.5">
            <input
              id="password"
              name="password"
              type="password"
              required
              onChange={onChange}
              autoComplete="current-password"
              placeholder="Veuillez entrer votre mot de passe"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-sm transition"
            />
          </div>
        </div>
        <div className="pt-2">
          {/*Bouton de soumission*/}
          <button
            type="submit" 
            className="cursor-pointer flex w-full justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-100 hover:bg-indigo-700 transition duration-200 active:scale-[0.98]"
          >
            Sign in
          </button>
        </div>
      </form>
      <p className="mt-8 text-center text-sm text-gray-500">
        Not a member?{' '}
        <a href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500 transition hover:underline">
          Register here
        </a>
      </p>
    </div>

  </div>
</div>
      </>  )
    )
}

export default Login;