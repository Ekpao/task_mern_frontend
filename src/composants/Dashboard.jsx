import { useEffect  , useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { creatTask , getTasks , deleteTask } from "../app/features/task/taskSlice"
import { HiOutlinePlus, HiOutlineCheckCircle, HiOutlineClock, HiOutlineClipboardDocumentList , HiOutlineTrash } from 'react-icons/hi2';


const Dashboard = ()=> {

    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)
    const { tasks } = useSelector(state => state.tasks)
    const [completedIds, setCompletedIds] = useState([])

    useEffect(() => { if (!user) navigate('/login')}, [user, navigate])  
    const dispatch = useDispatch()
    useEffect(() => {
        if (user) {
            dispatch(getTasks())
        }} , [user, dispatch] )
    const [texte, setText] = useState('')

    const totalTasks = tasks ? tasks.length : 0;
    const completedTasks = tasks ? completedIds.length : 0
    const pendingTasks = tasks ? totalTasks - completedIds.length : 0
const recentTasks = Array.isArray(tasks) ? [...tasks].reverse().slice(0, 3) : [];  

    const onSubmit = (e) => {
      e.preventDefault() 
      if (!texte.trim()) return; //Evite de créer des tâches vides
      dispatch(creatTask({ texte: texte }))
      setText('')}
  return (
    <>
       <div className="min-h-screen bg-gray-50/50 pb-12">
      
      {/*1. HEADER DE BIENVENUE */}
      <div className="bg-white border-b border-gray-100 mb-8">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Welcome back, <span className="text-indigo-600">{user && user.nom}</span> 👋
          </h1>
          <p className="mt-2 text-gray-500 text-lg">
            Voici l'état actuel de vos projets et de vos tâches.
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4">
        
        {/* 2. STATS RAPIDES */ }
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
              <HiOutlineClipboardDocumentList size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">  Total Tasks  </p>
              <p className="text-2xl font-bold text-gray-900"> <span>{ totalTasks }</span> </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-600">
              <HiOutlineCheckCircle size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Completed</p>
              <p className="text-2xl font-bold text-gray-900"> <span>{ completedTasks }</span> </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
              <HiOutlineClock size={28} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">In Progress</p>
              <p className="text-2xl font-bold text-gray-900"><span>{ pendingTasks }</span> </p>
            </div>
          </div>
        </div>

        {/* 3. SECTION DISPOSITION SPÉCIALE */ }
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* COLONNE GAUCHE : Task Creator  */ }
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50 sticky top-24">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-2 h-8 bg-indigo-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-gray-900">Task Creator</h2>
              </div>
              <form  onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                  <textarea
                    value={texte}
                    onChange={e=>setText(e.target.value)}
                    rows="4"
                    placeholder="Détails de la tâche..."
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-gray-900 focus:ring-2 focus:ring-indigo-500 transition"
                  ></textarea>
                </div>
                <button type='submit' className="w-full bg-indigo-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all flex items-center justify-center space-x-2 cursor-pointer">
                  <HiOutlinePlus size={20} />
                  <span>Ajouter la tâche</span>
                </button>
              </form>
            </div>
          </div>

          {/* COLONNE DROITE : Aperçu des tâches  */}
          <div className="lg:col-span-3">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              Recent Activity
            </h3>
            <div className="space-y-4">
                
                {/* DEBUT DU CHANGEMENT DYNAMIQUE */}
                {recentTasks.length > 0 ? (
                    recentTasks.map((task, index) => (
                        <div key={task._id || index} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between hover:border-indigo-200 transition">
                            <div className="flex items-center space-x-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                                    ${completedIds.includes(task._id) ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}
                                >
                                    {index + 1}
                                </div>
                                <div>
                                    <h4 className={`font-semibold text-gray-900 ${completedIds.includes(task._id) ? 'line-through text-gray-400' : ''}`}> 
                                        {task.texte} 
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                        {task.createdAt ? new Date(task.createdAt).toLocaleDateString('fr-FR') : "Récemment"}
                                    </p>
                                </div>
                            </div>
          <div className="flex items-center space-x-3">
                 <button 
                        type="button"
                        className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                        title="Supprimer la tâche"
                         onClick={() => dispatch(deleteTask(task._id)) }
                  >
                    <HiOutlineTrash size={18} />
                </button>
               <span
                 onClick={() => setCompletedIds(prev => 
                  prev.includes(task._id) ? prev.filter(i => i !== task._id) : [...prev, task._id]
                   )}
                 className={`px-3 py-1 text-xs font-bold rounded-full cursor-pointer ${completedIds.includes(task._id) ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
                >
                 {completedIds.includes(task._id) ? 'COMPLETED' : 'PENDING'}
               </span>
          </div>
        </div>
                    ))
                ) : (
                    <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                        <p className="text-gray-400">Aucune tâche disponible pour le moment.</p>
                    </div>
                )}
                {/* FIN DU CHANGEMENT DYNAMIQUE */}
                
              <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 text-center">
                <p className="text-gray-400">D'autres tâches s'afficheront ici...</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
    </>
  );
}

export default Dashboard;


