import { useState, useEffect } from 'react';
import { Employee } from '../types/employee';

export const useEmployees = () => {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem('employees');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const addEmployee = (employee: Employee) => {
    setEmployees([...employees, { ...employee, id: crypto.randomUUID() }]);
  };

  const updateEmployee = (employee: Employee) => {
    setEmployees(employees.map(emp => emp.id === employee.id ? employee : emp));
  };

  const deleteEmployee = (id: string) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  return { employees, addEmployee, updateEmployee, deleteEmployee };
};