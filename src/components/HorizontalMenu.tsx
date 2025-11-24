'use client';

import { LogOut, Bell, Search, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function HorizontalMenu() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Title */}
          <div className="flex items-center space-x-4">
            <div className="lg:hidden h-10 w-10" /> {/* Spacer for hamburger */}
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">
                Employee Management
              </h1>
              <p className="text-sm text-gray-500 hidden sm:block">
                Welcome back, {user?.name}!
              </p>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search */}
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors hidden sm:block"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </button>

            {/* Notifications */}
            <button
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="hidden sm:flex items-center space-x-3 px-3 py-2 bg-gray-50 rounded-lg">
              <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-3 py-2 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div className="border-t border-gray-200 overflow-x-auto">
        <nav className="px-4 lg:px-8">
          <ul className="flex space-x-1 lg:space-x-2 py-2">
            <li>
              <a
                href="/dashboard"
                className="inline-block px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 rounded-lg"
              >
                All Employees
              </a>
            </li>
            <li>
              <a
                href="/dashboard"
                className="inline-block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Departments
              </a>
            </li>
            <li>
              <a
                href="/dashboard"
                className="inline-block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Analytics
              </a>
            </li>
            <li>
              <a
                href="/dashboard"
                className="inline-block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
              >
                Reports
              </a>
            </li>
            {user?.role === 'admin' && (
              <li>
                <a
                  href="/dashboard"
                  className="inline-block px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  Settings
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

