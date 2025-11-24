'use client';

import { useState } from 'react';
import { Menu, X, Users, LayoutDashboard, Settings, FileText, BarChart, ChevronDown, ChevronRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SubMenuItem {
  label: string;
  icon: any;
  href: string;
}

interface MenuItem {
  label: string;
  icon: any;
  href?: string;
  subItems?: SubMenuItem[];
}

export default function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const { user } = useAuth();

  const menuItems: MenuItem[] = [
    {
      label: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
    },
    {
      label: 'Employees',
      icon: Users,
      subItems: [
        { label: 'All Employees', icon: Users, href: '/dashboard' },
        { label: 'Add New', icon: Users, href: '/dashboard' },
        { label: 'Departments', icon: Users, href: '/dashboard' },
      ],
    },
    {
      label: 'Reports',
      icon: FileText,
      subItems: [
        { label: 'Attendance', icon: BarChart, href: '/dashboard' },
        { label: 'Performance', icon: BarChart, href: '/dashboard' },
        { label: 'Analytics', icon: BarChart, href: '/dashboard' },
      ],
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/dashboard',
    },
  ];

  const toggleItem = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg hover:bg-gray-50 transition-colors lg:hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-gray-700" />
        ) : (
          <Menu className="h-6 w-6 text-gray-700" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:shadow-none lg:border-r lg:border-gray-200`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <div>
                <h2 className="font-bold text-gray-900">UltraShip</h2>
                <p className="text-xs text-gray-500">Employee Portal</p>
              </div>
            </div>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-lg">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                  <p className="text-xs text-gray-600 truncate">{user.email}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                    {user.role === 'admin' ? '👑 Admin' : '👤 Employee'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.label}>
                  {item.subItems ? (
                    <>
                      <button
                        onClick={() => toggleItem(item.label)}
                        className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="h-5 w-5 text-gray-500 group-hover:text-blue-600" />
                          <span className="font-medium">{item.label}</span>
                        </div>
                        {expandedItem === item.label ? (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                      {expandedItem === item.label && (
                        <ul className="mt-1 ml-4 space-y-1">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.label}>
                              <a
                                href={subItem.href}
                                className="flex items-center space-x-3 px-4 py-2 text-gray-600 hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-colors"
                                onClick={() => setIsOpen(false)}
                              >
                                <subItem.icon className="h-4 w-4" />
                                <span className="text-sm">{subItem.label}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <a
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors group"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5 text-gray-500 group-hover:text-blue-600" />
                      <span className="font-medium">{item.label}</span>
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              © 2024 UltraShip. All rights reserved.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

