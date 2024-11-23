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
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8 bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl">
        <div className="text-center">
          <h2 className="text-4xl font-serif text-gray-900 mb-2">
            Employee Management System
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                required
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transform transition-all hover:scale-[1.02]"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}