import { create } from 'zustand';
import { User, Task,} from '../types';
import { generateDummyTasks } from '../utils/dummyData';
import toast from 'react-hot-toast';

interface Store {
  currentUser: User | null;
  users: User[];
  tasks: Task[];
  setCurrentUser: (user: User | null) => void;
  addTask: (task: Task) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
}

const demoUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    role: 'admin',
    department: 'Management',
    avatar: 'https://source.unsplash.com/random/200x200/?portrait&1'
  },
  ...Array.from({ length: 9 }, (_, i) => ({
    id: String(i + 2),
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    password: 'user123',
    role: 'user' as const,
    department: ['Development', 'Design', 'Marketing', 'Sales', 'Support'][Math.floor(Math.random() * 5)],
    avatar: `https://source.unsplash.com/random/200x200/?portrait&${i + 2}`
  }))
];

const demoTasks = generateDummyTasks(demoUsers);

export const useStore = create<Store>((set) => ({
  currentUser: null,
  users: demoUsers,
  tasks: demoTasks,
  
  setCurrentUser: (user) => set({ currentUser: user }),
  
  addTask: (task) => {
    const newTask = { ...task, id: crypto.randomUUID() };
    set((state) => ({ tasks: [...state.tasks, newTask] }));
    toast.success('New task created successfully!');
  },
  
  updateTask: (taskId, updates) => {
    set((state) => ({
      tasks: state.tasks.map(task =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    }));
    
    if (updates.status) {
      const message = updates.status === 'completed' 
        ? 'Task marked as completed! 🎉' 
        : updates.status === 'failed'
        ? 'Task marked as failed'
        : 'Task status updated';
      toast[updates.status === 'failed' ? 'error' : 'success'](message);
    }
  },
  
  login: (email, password) => {
    const user = demoUsers.find(u => u.email === email && u.password === password);
    if (user) {
      set({ currentUser: user });
      toast.success(`Welcome back, ${user.name}! ${user.role === 'admin' ? '(Admin)' : ''}`);
    } else {
      toast.error('Invalid credentials');
    }
  },

  logout: () => {
    set({ currentUser: null });
    toast.success('Logged out successfully');
  }
}));