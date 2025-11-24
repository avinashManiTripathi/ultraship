'use client';

import { X, Mail, Phone, MapPin, Calendar, Award, TrendingUp, Briefcase, DollarSign, BookOpen, Clock } from 'lucide-react';

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
  createdAt?: string;
  updatedAt?: string;
}

interface EmployeeDetailProps {
  employee: Employee;
  onClose: () => void;
}

export default function EmployeeDetail({ employee, onClose }: EmployeeDetailProps) {
  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 95) return 'from-green-500 to-emerald-500';
    if (attendance >= 85) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Header with gradient */}
        <div className={`relative h-48 bg-gradient-to-br ${getAttendanceColor(employee.attendance)}`}>
          <div className="absolute inset-0 bg-black/20"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-lg hover:bg-white transition-colors shadow-lg z-10"
          >
            <X className="h-5 w-5 text-gray-700" />
          </button>
          
          {/* Avatar */}
          <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2">
            <div className="h-32 w-32 rounded-full bg-white p-2 shadow-2xl">
              <div className="h-full w-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-4xl">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pt-20 px-8 pb-8">
          {/* Name and Role */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{employee.name}</h1>
            <div className="flex items-center justify-center space-x-3">
              <span className="px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                {employee.department}
              </span>
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                employee.role === 'admin' 
                  ? 'bg-purple-100 text-purple-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {employee.role === 'admin' ? '👑 Admin' : '👤 Employee'}
              </span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="h-6 w-6 text-blue-600" />
                <span className="text-2xl font-bold text-blue-600">{employee.attendance}%</span>
              </div>
              <p className="text-sm text-gray-600">Attendance Rate</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <Award className="h-6 w-6 text-purple-600" />
                <span className="text-2xl font-bold text-purple-600">{employee.class}</span>
              </div>
              <p className="text-sm text-gray-600">Class Level</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <div className="flex items-center justify-between mb-2">
                <Briefcase className="h-6 w-6 text-green-600" />
                <span className="text-2xl font-bold text-green-600">{employee.age}</span>
              </div>
              <p className="text-sm text-gray-600">Age</p>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Mail className="h-5 w-5 mr-2 text-gray-600" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Mail className="h-4 w-4 mr-3 mt-1 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm text-gray-900 font-medium">{employee.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-4 w-4 mr-3 mt-1 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm text-gray-900 font-medium">{employee.phone}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-3 mt-1 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="text-sm text-gray-900 font-medium">{employee.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Briefcase className="h-5 w-5 mr-2 text-gray-600" />
                Professional Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <Calendar className="h-4 w-4 mr-3 mt-1 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Join Date</p>
                    <p className="text-sm text-gray-900 font-medium">
                      {new Date(employee.joinDate).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Award className="h-4 w-4 mr-3 mt-1 text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-500">Class</p>
                    <p className="text-sm text-gray-900 font-medium">{employee.class}</p>
                  </div>
                </div>
                {employee.salary && (
                  <div className="flex items-start">
                    <DollarSign className="h-4 w-4 mr-3 mt-1 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Salary</p>
                      <p className="text-sm text-gray-900 font-medium">
                        ${employee.salary.toLocaleString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Subjects */}
          <div className="mt-6 bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-gray-600" />
              Subjects & Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {employee.subjects.map((subject, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                  {subject}
                </span>
              ))}
            </div>
          </div>

          {/* Timestamps */}
          {(employee.createdAt || employee.updatedAt) && (
            <div className="mt-6 flex items-center justify-center space-x-6 text-xs text-gray-500">
              {employee.createdAt && (
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Created: {new Date(employee.createdAt).toLocaleDateString()}
                </div>
              )}
              {employee.updatedAt && (
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  Updated: {new Date(employee.updatedAt).toLocaleDateString()}
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex items-center justify-center space-x-4">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

