import FooterContent from '../Compornents/FooterContent'
import { useState } from 'react';
import { Search, UserPlus, Edit, Trash, ChevronDown, ChevronUp, Save } from 'lucide-react';

// Sample initial employee data
const initialEmployees = [
  { id: 1, name: 'John Smith', position: 'Frontend Developer', department: 'Engineering', email: 'john@example.com', status: 'Active' },
  { id: 2, name: 'Sarah Johnson', position: 'UX Designer', department: 'Design', email: 'sarah@example.com', status: 'Active' },
  { id: 3, name: 'Michael Brown', position: 'Project Manager', department: 'Management', email: 'michael@example.com', status: 'On Leave' },
  { id: 4, name: 'Emily Davis', position: 'Backend Developer', department: 'Engineering', email: 'emily@example.com', status: 'Active' },
  { id: 5, name: 'Robert Wilson', position: 'HR Specialist', department: 'Human Resources', email: 'robert@example.com', status: 'Inactive' },
];


function home() {

const [employees, setEmployees] = useState(initialEmployees);
const [searchTerm, setSearchTerm] = useState('');
const [sortField, setSortField] = useState('name');
const [sortDirection, setSortDirection] = useState('asc');
const [newEmployee, setNewEmployee] = useState({ name: '', position: '', department: '', email: '', status: 'Active' });
const [editingEmployee, setEditingEmployee] = useState(null);
const [showAddForm, setShowAddForm] = useState(false);
const [activeTab, setActiveTab] = useState('employees');

// Filter employees based on search term
const filteredEmployees = employees.filter(employee => 
  employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
  employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
  employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  employee.status.toLowerCase().includes(searchTerm.toLowerCase())
);

// Sort employees based on sort field and direction
const sortedEmployees = [...filteredEmployees].sort((a, b) => {
  if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
  if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
  return 0;
});

// Handle column header click for sorting
const handleSort = (field) => {
  if (sortField === field) {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  } else {
    setSortField(field);
    setSortDirection('asc');
  }
};

// Handle adding a new employee
const handleAddEmployee = () => {
  if (newEmployee.name && newEmployee.position && newEmployee.department && newEmployee.email) {
    setEmployees([
      ...employees,
      {
        id: employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1,
        ...newEmployee
      }
    ]);
    setNewEmployee({ name: '', position: '', department: '', email: '', status: 'Active' });
    setShowAddForm(false);
  }
};

// Handle editing an employee
const handleEditEmployee = (employee) => {
  setEditingEmployee({...employee});
};

// Handle saving edited employee
const handleSaveEdit = () => {
  if (editingEmployee) {
    setEmployees(employees.map(emp => 
      emp.id === editingEmployee.id ? editingEmployee : emp
    ));
    setEditingEmployee(null);
  }
};

// Handle deleting an employee
const handleDeleteEmployee = (id) => {
  setEmployees(employees.filter(employee => employee.id !== id));
};
  return (
    <>
      <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Employee Management System</h1>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100 overflow-auto">
        {/* Tab Navigation */}
        <div className="flex mb-6 border-b border-gray-300">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'employees' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('employees')}
          >
            Employees
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'reports' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
        </div>

        {activeTab === 'employees' && (
          <div className="bg-white rounded-lg shadow p-6">
            {/* Actions Bar */}
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                <UserPlus size={18} className="mr-2" />
                Add Employee
              </button>
            </div>

            {/* Add Employee Form */}
            {showAddForm && (
              <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
                <h2 className="text-lg font-semibold mb-4">Add New Employee</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newEmployee.name}
                      onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newEmployee.department}
                      onChange={(e) => setNewEmployee({...newEmployee, department: e.target.value})}
                    >
                        <option value="Engineering">HR</option>
                        <option value="Design">IT</option>
                        <option value="Management">FINANCE</option>
                        <option value="Human Resources">OPERATION</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newEmployee.email}
                      onChange={(e) => setNewEmployee({...newEmployee, email: e.target.value})}
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
                    onClick={() => setShowAddForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={handleAddEmployee}
                  >
                    Add Employee
                  </button>
                </div>
              </div>
            )}

            {/* Employee Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="p-3 text-left text-sm font-medium text-gray-600 cursor-pointer" onClick={() => handleSort('name')}>
                      <div className="flex items-center">
                        ID
                        {sortField === 'name' && (
                          sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        )}
                      </div>
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600 cursor-pointer" onClick={() => handleSort('position')}>
                      <div className="flex items-center">
                        Name
                        {sortField === 'position' && (
                          sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        )}
                      </div>
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600 cursor-pointer" onClick={() => handleSort('department')}>
                      <div className="flex items-center">
                        Department
                        {sortField === 'department' && (
                          sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        )}
                      </div>
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600 cursor-pointer" onClick={() => handleSort('email')}>
                      <div className="flex items-center">
                        Email
                        {sortField === 'email' && (
                          sortDirection === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                        )}
                      </div>
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600 cursor-pointer" onClick={() => handleSort('status')}>
                      <div className="flex items-center">
                        Create Date
                      </div>
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600 cursor-pointer" onClick={() => handleSort('status')}>
                      <div className="flex items-center">
                        Update Date
                      </div>
                    </th>
                    <th className="p-3 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedEmployees.map(employee => (
                    <tr key={employee.id} className="border-b hover:bg-gray-50">
                      {editingEmployee && editingEmployee.id === employee.id ? (
                        // Edit Mode
                        <>
                          <td className="p-3">
                            <input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={editingEmployee.name}
                              onChange={(e) => setEditingEmployee({...editingEmployee, name: e.target.value})}
                            />
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={editingEmployee.position}
                              onChange={(e) => setEditingEmployee({...editingEmployee, position: e.target.value})}
                            />
                          </td>
                          
                          <td className="p-3">
                            <select
                              className="w-full p-1 border border-gray-300 rounded"
                              value={editingEmployee.department}
                              onChange={(e) => setEditingEmployee({...editingEmployee, department: e.target.value})}
                            >
                              <option value="Engineering">HR</option>
                              <option value="Design">IT</option>
                              <option value="Management">FINANCE</option>
                              <option value="Human Resources">OPERATION</option>
                            </select>
                          </td>
                          <td className="p-3">
                            <input
                              type="email"
                              className="w-full p-1 border border-gray-300 rounded"
                              value={editingEmployee.email}
                              onChange={(e) => setEditingEmployee({...editingEmployee, email: e.target.value})}
                            />
                          </td>
                          {/* <td className="p-3">
                            <select
                              className="w-full p-1 border border-gray-300 rounded"
                              value={editingEmployee.status}
                              onChange={(e) => setEditingEmployee({...editingEmployee, status: e.target.value})}
                            >
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                              <option value="On Leave">On Leave</option>
                            </select>
                          </td> */}
                          <td className="p-3 flex">
                            <button
                              className="p-1 bg-green-500 text-white rounded mr-1"
                              onClick={handleSaveEdit}
                            >
                              <Save size={16} />
                            </button>
                            <button
                              className="p-1 bg-gray-500 text-white rounded"
                              onClick={() => setEditingEmployee(null)}
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        // View Mode
                        <>  
                          <td className="p-3">{employee.name}</td>
                          <td className="p-3">{employee.position}</td>
                          <td className="p-3">{employee.department}</td>
                          <td className="p-3">{employee.email}</td>
                          <td className="p-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium
                              ${employee.status === 'Active' ? 'bg-green-100 text-green-800' : 
                                employee.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}`}>
                              {employee.status}
                            </span>
                          </td>
                          <td className="p-3">
                            <div className="flex">
                              <button 
                                className="p-1 bg-blue-500 text-white rounded mr-1"
                                onClick={() => handleEditEmployee(employee)}
                              >
                                <Edit size={16} />
                              </button>
                              <button 
                                className="p-1 bg-red-500 text-white rounded"
                                onClick={() => handleDeleteEmployee(employee.id)}
                              >
                                <Trash size={16} />
                              </button>
                            </div>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {sortedEmployees.length === 0 && (
                    <tr>
                      <td colSpan="6" className="p-3 text-center text-gray-500">
                        No employees found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

            </div>
          </div>
        )}

        {/* {activeTab === 'departments' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Departments</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Engineering', 'Design', 'Management', 'Human Resources', 'Marketing', 'Sales'].map(dept => {
                const count = employees.filter(e => e.department === dept).length;
                return (
                  <div key={dept} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-lg">{dept}</h3>
                    <p className="text-gray-600">{count} employees</p>
                    <div className="mt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${Math.min(100, (count / employees.length) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )} */}

{/* 
        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Reports</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-lg mb-2">Employee Status Distribution</h3>
                <div className="h-64 flex items-end justify-around">
                  {['Active', 'Inactive', 'On Leave'].map(status => {
                    const count = employees.filter(e => e.status === status).length;
                    const height = `${Math.max(10, (count / employees.length) * 100)}%`;
                    return (
                      <div key={status} className="flex flex-col items-center">
                        <div 
                          className={`w-16 ${
                            status === 'Active' ? 'bg-green-500' : 
                            status === 'On Leave' ? 'bg-yellow-500' : 'bg-red-500'
                          }`} 
                          style={{ height }}
                        ></div>
                        <div className="mt-2 text-sm">{status}</div>
                        <div className="text-gray-600 font-medium">{count}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium text-lg mb-2">Department Distribution</h3>
                <div className="mt-4">
                  {['Engineering', 'Design', 'Management', 'Human Resources', 'Marketing', 'Sales'].map(dept => {
                    const count = employees.filter(e => e.department === dept).length;
                    const width = `${Math.max(5, (count / employees.length) * 100)}%`;
                    return (
                      <div key={dept} className="mb-4">
                        <div className="flex justify-between text-sm">
                          <span>{dept}</span>
                          <span>{count}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )} */}
      </main>

    </div>
    <FooterContent></FooterContent>
    </>
  )
}

export default home