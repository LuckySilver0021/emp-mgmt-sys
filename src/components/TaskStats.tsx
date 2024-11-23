import React from 'react';
import { Task } from '../types';
import { CheckCircle, AlertCircle, Clock } from 'lucide-react';

interface Props {
  tasks: Task[];
}

export default function TaskStats({ tasks }: Props) {
  const stats = {
    active: tasks.filter(t => t.status === 'pending').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    failed: tasks.filter(t => t.status === 'failed').length
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
        <div className="p-3 bg-blue-100 rounded-full">
          <Clock className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Active Tasks</p>
          <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
        <div className="p-3 bg-green-100 rounded-full">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Completed Tasks</p>
          <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4">
        <div className="p-3 bg-red-100 rounded-full">
          <AlertCircle className="h-6 w-6 text-red-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-gray-600">Failed Tasks</p>
          <p className="text-2xl font-bold text-gray-900">{stats.failed}</p>
        </div>
      </div>
    </div>
  );
}