import React from 'react';
import { Task } from '../types';
import { Calendar, Clock, Tag, Users, BarChart } from 'lucide-react';
import { useStore } from '../store/useStore';
import { formatDistanceToNow } from 'date-fns';

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const { users, updateTask } = useStore();
  
  const assignedTo = users.find(u => u.id === task.assignedTo);
  const assignedBy = users.find(u => u.id === task.assignedBy);
  
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800'
  };

  const priorityColors = {
    low: 'bg-gray-100 text-gray-800',
    medium: 'bg-orange-100 text-orange-800',
    high: 'bg-red-100 text-red-800'
  };

  const categoryColors = {
    development: 'bg-blue-100 text-blue-800',
    design: 'bg-purple-100 text-purple-800',
    marketing: 'bg-green-100 text-green-800',
    sales: 'bg-yellow-100 text-yellow-800',
    support: 'bg-indigo-100 text-indigo-800',
    other: 'bg-gray-100 text-gray-800'
  };

  const handleStatusUpdate = (status: Task['status']) => {
    updateTask(task.id, { status });
  };

  const timeLeft = new Date(task.dueDate) > new Date() 
    ? formatDistanceToNow(new Date(task.dueDate), { addSuffix: true })
    : 'Overdue';

  const isOverdue = new Date(task.dueDate) < new Date() && task.status === 'pending';

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] overflow-hidden">
      <div className={`h-1 ${
        isOverdue ? 'bg-red-500' : 
        task.status === 'completed' ? 'bg-green-500' :
        task.status === 'failed' ? 'bg-red-500' :
        'bg-blue-500'
      }`} />
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-semibold text-lg text-gray-900">{task.title}</h3>
          <div className="flex gap-2">
            <span className={`px-2 py-1 rounded-full text-xs ${priorityColors[task.priority]}`}>
              {task.priority}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs ${statusColors[task.status]}`}>
              {task.status}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-4">{task.description}</p>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Tag size={16} />
            <span className={`px-2 py-1 rounded-full text-xs ${categoryColors[task.category]}`}>
              {task.category}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>Created {formatDistanceToNow(new Date(task.createdAt))} ago</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className={isOverdue ? 'text-red-500' : ''} />
            <span className={isOverdue ? 'text-red-500 font-medium' : ''}>
              Due {timeLeft}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>{assignedTo?.department}</span>
          </div>
          {task.status === 'completed' && (
            <div className="flex items-center gap-2">
              <BarChart size={16} className="text-green-500" />
              <span className="text-green-500">
                Completed {formatDistanceToNow(new Date(task.updatedAt || ''))} ago
              </span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={assignedTo?.avatar}
                alt={assignedTo?.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="text-sm">
                <p className="text-gray-900 font-medium">{assignedTo?.name}</p>
                <p className="text-gray-500 text-xs">Assigned by {assignedBy?.name}</p>
              </div>
            </div>

            {task.status === 'pending' && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleStatusUpdate('completed')}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm hover:bg-green-200 transition-colors"
                >
                  Complete
                </button>
                <button
                  onClick={() => handleStatusUpdate('failed')}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm hover:bg-red-200 transition-colors"
                >
                  Mark Failed
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}