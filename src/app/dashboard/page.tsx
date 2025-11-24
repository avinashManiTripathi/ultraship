'use client';

import { useState, useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { LayoutGrid, LayoutList, Search, Filter, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import HamburgerMenu from '@/components/HamburgerMenu';
import HorizontalMenu from '@/components/HorizontalMenu';
import EmployeeGrid from '@/components/EmployeeGrid';
import EmployeeTiles from '@/components/EmployeeTiles';
import EmployeeDetail from '@/components/EmployeeDetail';
import { GET_EMPLOYEES_PAGINATED, DELETE_EMPLOYEE } from '@/lib/queries';
import { useAuth } from '@/contexts/AuthContext';

type ViewMode = 'grid' | 'tiles';

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

export default function DashboardPage() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<ViewMode>('tiles');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [departmentFilter, setDepartmentFilter] = useState('');

  const { data, loading, error, refetch } = useQuery(GET_EMPLOYEES_PAGINATED, {
    variables: {
      page,
      pageSize,
      sortField,
      sortOrder,
      filter: departmentFilter ? { department: departmentFilter } : undefined,
    },
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    onCompleted: () => {
      refetch();
      alert('Employee deleted successfully');
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const employees = data?.employeesPaginated?.employees || [];
  const totalPages = data?.employeesPaginated?.totalPages || 1;
  const totalCount = data?.employeesPaginated?.totalCount || 0;

  // Filter employees by search query
  const filteredEmployees = useMemo(() => {
    if (!searchQuery) return employees;
    
    const query = searchQuery.toLowerCase();
    return employees.filter((emp: Employee) =>
      emp.name.toLowerCase().includes(query) ||
      emp.email.toLowerCase().includes(query) ||
      emp.department.toLowerCase().includes(query) ||
      emp.class.toLowerCase().includes(query)
    );
  }, [employees, searchQuery]);

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleOptionsClick = (employee: Employee, action: string) => {
    switch (action) {
      case 'view':
        setSelectedEmployee(employee);
        break;
      case 'edit':
        alert(`Edit employee: ${employee.name} (Feature coming soon)`);
        break;
      case 'flag':
        alert(`Flagged employee: ${employee.name}`);
        break;
      case 'delete':
        if (user?.role !== 'admin') {
          alert('Only admins can delete employees');
          return;
        }
        if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
          deleteEmployee({ variables: { id: employee.id } });
        }
        break;
    }
  };

  const departments = ['Engineering', 'Design', 'Marketing', 'Finance', 'Sales', 'Human Resources', 'Product', 'Management', 'Customer Support', 'Quality Assurance'];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <HamburgerMenu />
      
      <div className="flex-1 flex flex-col lg:ml-0">
        <HorizontalMenu />
        
        <main className="flex-1 p-4 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Employee Directory
                </h2>
                <p className="text-gray-600 mt-1">
                  {totalCount} {totalCount === 1 ? 'employee' : 'employees'} found
                </p>
              </div>
              
              {user?.role === 'admin' && (
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">
                  <Plus className="h-5 w-5" />
                  <span>Add Employee</span>
                </button>
              )}
            </div>

            {/* Filters and Controls */}
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
              {/* Search and View Toggle */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search employees by name, email, department..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('tiles')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                      viewMode === 'tiles'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <LayoutGrid className="h-5 w-5" />
                    <span className="hidden sm:inline font-medium">Tiles</span>
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                      viewMode === 'grid'
                        ? 'bg-white text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <LayoutList className="h-5 w-5" />
                    <span className="hidden sm:inline font-medium">Grid</span>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <select
                    value={departmentFilter}
                    onChange={(e) => {
                      setDepartmentFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sort By
                  </label>
                  <select
                    value={sortField}
                    onChange={(e) => setSortField(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="name">Name</option>
                    <option value="age">Age</option>
                    <option value="attendance">Attendance</option>
                    <option value="joinDate">Join Date</option>
                    <option value="salary">Salary</option>
                  </select>
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order
                  </label>
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-8 text-center">
              <p className="text-red-700 font-medium">Error loading employees</p>
              <p className="text-red-600 text-sm mt-2">{error.message}</p>
              <button
                onClick={() => refetch()}
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg font-medium">No employees found</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
            </div>
          ) : (
            <>
              {viewMode === 'tiles' ? (
                <EmployeeTiles
                  employees={filteredEmployees}
                  onEmployeeClick={handleEmployeeClick}
                  onOptionsClick={handleOptionsClick}
                />
              ) : (
                <EmployeeGrid
                  employees={filteredEmployees}
                  onEmployeeClick={handleEmployeeClick}
                  onOptionsClick={handleOptionsClick}
                />
              )}

              {/* Pagination */}
              {!searchQuery && (
                <div className="mt-8 flex items-center justify-between bg-white rounded-xl shadow-sm p-4">
                  <div className="text-sm text-gray-600">
                    Page {page} of {totalPages}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      <span>Previous</span>
                    </button>
                    <button
                      onClick={() => setPage(Math.min(totalPages, page + 1))}
                      disabled={page === totalPages}
                      className="flex items-center space-x-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <span>Next</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <EmployeeDetail
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}

