import { useState } from "react";
import {
  Edit,
  Trash,
  ChevronDown,
  ChevronUp,
  Save,
} from "lucide-react";

const initialEmployees = [
  { id: 1, name: "John Smith", position: "Frontend Developer", department: "Engineering", email: "john@example.com", status: "Active" },
  { id: 2, name: "Sarah Johnson", position: "UX Designer", department: "Design", email: "sarah@example.com", status: "Active" },
  { id: 3, name: "Michael Brown", position: "Project Manager", department: "Management", email: "michael@example.com", status: "On Leave" },
  { id: 4, name: "Emily Davis", position: "Backend Developer", department: "Engineering", email: "emily@example.com", status: "Active" },
  { id: 5, name: "Robert Wilson", position: "HR Specialist", department: "Human Resources", email: "robert@example.com", status: "Inactive" },
];

function Table() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedEmployees = [...employees].sort((a, b) => {
    if (!sortField) return 0;
    const aValue = a[sortField];
    const bValue = b[sortField];
    if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
    if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Handle editing an employee
  const handleEditEmployee = (employee) => {
    setEditingEmployee({ ...employee });
  };

  // Handle saving edited employee
  const handleSaveEdit = () => {
    if (editingEmployee) {
      setEmployees(
        employees.map((emp) =>
          emp.id === editingEmployee.id ? editingEmployee : emp
        )
      );
      setEditingEmployee(null);
    }
  };

  // Handle deleting an employee
  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th
              className="p-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                Name
                {sortField === "name" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  ))}
              </div>
            </th>
            <th
              className="p-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
              onClick={() => handleSort("position")}
            >
              <div className="flex items-center">
                Position
                {sortField === "position" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  ))}
              </div>
            </th>
            <th
              className="p-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
              onClick={() => handleSort("department")}
            >
              <div className="flex items-center">
                Department
                {sortField === "department" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  ))}
              </div>
            </th>
            <th
              className="p-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
              onClick={() => handleSort("email")}
            >
              <div className="flex items-center">
                Email
                {sortField === "email" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  ))}
              </div>
            </th>
            <th
              className="p-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">
                Status
                {sortField === "status" &&
                  (sortDirection === "asc" ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  ))}
              </div>
            </th>
            <th className="p-3 text-left text-sm font-medium text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedEmployees.map((employee) => (
            <tr key={employee.id} className="border-b hover:bg-gray-50">
              {editingEmployee && editingEmployee.id === employee.id ? (
                // Edit Mode
                <>
                  <td className="p-3">
                    <input
                      type="text"
                      className="w-full p-1 border border-gray-300 rounded"
                      value={editingEmployee.name}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          name: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="p-3">
                    <input
                      type="text"
                      className="w-full p-1 border border-gray-300 rounded"
                      value={editingEmployee.position}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          position: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="p-3">
                    <select
                      className="w-full p-1 border border-gray-300 rounded"
                      value={editingEmployee.department}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          department: e.target.value,
                        })
                      }
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="Management">Management</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Sales">Sales</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <input
                      type="email"
                      className="w-full p-1 border border-gray-300 rounded"
                      value={editingEmployee.email}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          email: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="p-3">
                    <select
                      className="w-full p-1 border border-gray-300 rounded"
                      value={editingEmployee.status}
                      onChange={(e) =>
                        setEditingEmployee({
                          ...editingEmployee,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="On Leave">On Leave</option>
                    </select>
                  </td>
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
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        employee.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : employee.status === "On Leave"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
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
  );
}

export default Table;