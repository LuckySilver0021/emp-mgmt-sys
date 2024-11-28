import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { LockKeyhole, Mail } from 'lucide-react';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials.email, credentials.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-lg w-full space-y-8 bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500 rounded-xl shadow-2xl p-8 border border-gray-600">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Employee Management System
          </h2>
          <p className="text-gray-300 text-sm">
            <span className="font-semibold text-gray-200">Dummy Credentials:</span>
          </p>
          <ul className="text-gray-300 text-sm mt-1">
            <li>User: <span className="font-medium text-white">user1@example.com(2,3 & 4 similarly)</span></li>
            <li>Pass: <span className="font-medium text-white">user123</span></li>
            <li>Admin: <span className="font-medium text-white">admin@example.com</span></li>
            <li>Pass: <span className="font-medium text-white">admin123</span></li>
          </ul>
        </div>
  
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                required
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-500 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                placeholder="Email address"
              />
            </div>
  
            <div className="relative">
              <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-500 bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                placeholder="Password"
              />
            </div>
          </div>
  
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
  
  
}