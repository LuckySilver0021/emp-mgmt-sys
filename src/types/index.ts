export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  avatar: string;
  department?: string;
};

export type TaskStatus = 'pending' | 'completed' | 'failed';

export type TaskCategory = 'development' | 'design' | 'marketing' | 'sales' | 'support' | 'other';

export type Task = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  status: TaskStatus;
  category: TaskCategory;
  assignedTo: string;
  assignedBy: string;
  updatedAt?: string;
};