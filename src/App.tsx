import { useState } from 'react';
import { useStore } from './store/useStore';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import TaskStats from './components/TaskStats';
import Login from './components/Login';
import { Plus, LogOut, Search, LayoutGrid } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const { currentUser, tasks, setCurrentUser } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  if (!currentUser) {
    toast.error('Please log in to access the tasks');
    return <Login />;
  }

  const userTasks = tasks.filter(task => 
    currentUser.role === 'admin' || task.assignedTo === currentUser.id
  );

  const filteredTasks = userTasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-12 h-12 rounded-full border-2 border-blue-500"
                />
                <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{currentUser.name}</h1>
                <p className="text-sm text-gray-500 capitalize flex items-center gap-1">
                  <LayoutGrid size={14} />
                  {currentUser.role} {currentUser.department && `- ${currentUser.department}`}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {currentUser.role === 'admin' && (
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg transform hover:scale-[1.02]"
                >
                  <Plus size={20} />
                  <span>New Task</span>
                </button>
              )}
              
              <button
                onClick={() => setCurrentUser(null)}
                className="text-gray-500 hover:text-gray-700 bg-gray-100 p-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
          
          <div className="mt-6 flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskStats tasks={userTasks} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No tasks found</p>
          </div>
        )}
      </main>

      {showForm && <TaskForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default App;