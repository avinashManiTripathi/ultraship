'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Calendar, Award, TrendingUp, MoreVertical } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  age: number;
  class: string;
  subjects: string[];
  attendance: number;
  role: string;
  department: string;
  joinDate: string;
  phone: string;
  address: string;
  salary?: number;
}

interface EmployeeTilesProps {
  employees: Employee[];
  onEmployeeClick: (employee: Employee) => void;
  onOptionsClick: (employee: Employee, action: string) => void;
}

export default function EmployeeTiles({ employees, onEmployeeClick, onOptionsClick }: EmployeeTilesProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 95) return 'from-green-500 to-emerald-500';
    if (attendance >= 85) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  const getDepartmentColor = (department: string) => {
    const colors: Record<string, string> = {
      'Engineering': 'bg-blue-100 text-blue-700',
      'Design': 'bg-purple-100 text-purple-700',
      'Marketing': 'bg-pink-100 text-pink-700',
      'Finance': 'bg-green-100 text-green-700',
      'Sales': 'bg-orange-100 text-orange-700',
      'Human Resources': 'bg-indigo-100 text-indigo-700',
      'Product': 'bg-cyan-100 text-cyan-700',
      'Management': 'bg-red-100 text-red-700',
      'Customer Support': 'bg-teal-100 text-teal-700',
      'Quality Assurance': 'bg-lime-100 text-lime-700',
    };
    return colors[department] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {employees.map((employee) => (
        <div
          key={employee.id}
          className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group border border-gray-100 hover:border-blue-200"
          onClick={() => onEmployeeClick(employee)}
        >
          {/* Header with gradient */}
          <div className={`h-24 bg-gradient-to-br ${getAttendanceColor(employee.attendance)} relative`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-3 right-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenu(openMenu === employee.id ? null : employee.id);
                }}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-lg"
              >
                <MoreVertical className="h-4 w-4 text-gray-700" />
              </button>
              
              {openMenu === employee.id && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOptionsClick(employee, 'view');
                      setOpenMenu(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    View Details
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOptionsClick(employee, 'edit');
                      setOpenMenu(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOptionsClick(employee, 'flag');
                      setOpenMenu(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-yellow-600 hover:bg-yellow-50"
                  >
                    Flag
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOptionsClick(employee, 'delete');
                      setOpenMenu(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Avatar */}
          <div className="flex justify-center -mt-12 mb-4">
            <div className="h-24 w-24 rounded-full bg-white p-2 shadow-xl">
              <div className="h-full w-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 pb-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
              {employee.name}
            </h3>
            <p className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${getDepartmentColor(employee.department)}`}>
              {employee.department}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-center mb-1">
                  <Award className="h-4 w-4 text-gray-400 mr-1" />
                </div>
                <p className="text-xs text-gray-500 mb-1">Class</p>
                <p className="text-sm font-semibold text-gray-900">{employee.class}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-center mb-1">
                  <TrendingUp className="h-4 w-4 text-gray-400 mr-1" />
                </div>
                <p className="text-xs text-gray-500 mb-1">Attendance</p>
                <p className="text-sm font-semibold text-gray-900">{employee.attendance}%</p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 text-left bg-gray-50 rounded-lg p-3">
              <div className="flex items-center text-xs text-gray-600">
                <Mail className="h-3 w-3 mr-2 flex-shrink-0 text-gray-400" />
                <span className="truncate">{employee.email}</span>
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <Phone className="h-3 w-3 mr-2 flex-shrink-0 text-gray-400" />
                <span>{employee.phone}</span>
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <MapPin className="h-3 w-3 mr-2 flex-shrink-0 text-gray-400" />
                <span className="truncate">{employee.address}</span>
              </div>
              <div className="flex items-center text-xs text-gray-600">
                <Calendar className="h-3 w-3 mr-2 flex-shrink-0 text-gray-400" />
                <span>Joined {new Date(employee.joinDate).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Role Badge */}
            <div className="mt-4">
              <span className={`px-3 py-1.5 text-xs font-semibold rounded-full ${
                employee.role === 'admin' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {employee.role === 'admin' ? '👑 Admin' : '👤 Employee'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

