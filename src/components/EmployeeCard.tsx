import React from 'react';
import { Employee } from '../types/employee';
import { Pencil, Trash2, Mail, Phone, Calendar, Building2 } from 'lucide-react';

interface Props {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
}

export default function EmployeeCard({ employee, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:scale-102 hover:shadow-lg">
      <div className="relative h-48">
        <img
          src={employee.avatar}
          alt={employee.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{employee.name}</h3>
          <p className="text-sm opacity-90">{employee.position}</p>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="flex items-center space-x-2 text-gray-600">
          <Mail size={16} />
          <span className="text-sm">{employee.email}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <Phone size={16} />
          <span className="text-sm">{employee.phone}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <Building2 size={16} />
          <span className="text-sm">{employee.department}</span>
        </div>
        
        <div className="flex items-center space-x-2 text-gray-600">
          <Calendar size={16} />
          <span className="text-sm">Joined: {new Date(employee.joinDate).toLocaleDateString()}</span>
        </div>
        
        <div className="pt-3 flex justify-between items-center border-t">
          <span className="font-semibold text-green-600">
            ${employee.salary.toLocaleString()}
          </span>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(employee)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => onDelete(employee.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}