import FooterContent from "../Compornents/FooterContent";
import { useState, useEffect } from "react";
import {
  Search,
  UserPlus,
  Edit,
  Trash,
  ChevronDown,
  ChevronUp,
  Save,
} from "lucide-react";
import Header from "../Compornents/Header";
import Swal from "sweetalert2";
import Button from "../Compornents/Button";

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    department: "",
    email: "",
  });
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (employee.position &&
        employee.position.toLowerCase().includes(searchTerm.toLowerCase())) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (employee.status &&
        employee.status.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employees");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleAddEmployee = async () => {
    if (newEmployee.name && newEmployee.department && newEmployee.email) {
      const response = await fetch("http://localhost:8080/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmployee),
      });

      if (!response.ok) {
        Swal.fire({
          title: "Fail!",
          icon: "error",
        });
        throw new Error("Failed to add employee");
      } else {
        Swal.fire({
          title: "successfully!",
          icon: "success",
        });
      }

      setNewEmployee({ name: "", department: "", email: "" });
    }
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee({ ...employee });
  };

  const handleSaveEdit = async () => {
    if (editingEmployee) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/employees/${editingEmployee.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(editingEmployee),
          }
        );

        if (!response.ok) {
          Swal.fire({
            title: "Fail!",
            icon: "error",
          });
          throw new Error("Failed to update employee");
        }
        Swal.fire({
          title: "successfully!",
          icon: "success",
        });

        const updatedEmployee = await response.json();

        setEmployees(
          employees.map((emp) =>
            emp.id === updatedEmployee.id ? updatedEmployee : emp
          )
        );
        setEditingEmployee(null);
      } catch (error) {
        console.error("Error updating employee:", error);
      }
    }
  };

  const handleDeleteEmployee = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(
            `http://localhost:8080/api/employees/${id}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            Swal.fire({
              title: "Fail!",
              icon: "error",
            });
            throw new Error("Failed to delete employee");
          }

          setEmployees(employees.filter((employee) => employee.id !== id));
        } catch (error) {
          console.error("Error deleting employee:", error);
        }

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <>
      <div className="flex flex-col h-screen">
        <Header></Header>

        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="relative">
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
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

            {showAddForm && (
              <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-50">
                <h2 className="text-lg font-semibold mb-4">Add New Employee</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newEmployee.name}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Department
                    </label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newEmployee.department}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          department: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Department</option>
                      <option value="HR">HR</option>
                      <option value="IT">IT</option>
                      <option value="FINANCE">FINANCE</option>
                      <option value="OPERATION">OPERATION</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-2 border border-gray-300 rounded"
                      value={newEmployee.email}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded mr-2"
                    onClick={() => setShowAddForm(false)}
                    content="Cancel"
                  ></Button>

                  <Button
                     className="px-4 py-2 bg-blue-600 text-white rounded"
                     onClick={handleAddEmployee}
                    content="Add Employee"
                  ></Button>
                </div>
              </div>
            )}

            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th
                      className="p-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center">
                        ID
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
                        Name
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
                      <div className="flex items-center">Create Date</div>
                    </th>
                    <th
                      className="p-3 text-left text-sm font-medium text-gray-600 cursor-pointer"
                      onClick={() => handleSort("status")}
                    >
                      <div className="flex items-center">Update Date</div>
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
                              <option value="">
                                {editingEmployee.department}
                              </option>
                              <option value="HR">HR</option>
                              <option value="IT">IT</option>
                              <option value="FINANCE">FINANCE</option>
                              <option value="OPERATION">OPERATION</option>
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
                        <>
                          <td className="p-3">{employee.id}</td>
                          <td className="p-3">{employee.name}</td>
                          <td className="p-3">{employee.department}</td>
                          <td className="p-3">{employee.email}</td>
                          <td className="p-3">{employee.createAt}</td>
                          <td className="p-3">{employee.updateAt}</td>
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
                                onClick={() =>
                                  handleDeleteEmployee(employee.id)
                                }
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
        </main>
      </div>
      <FooterContent></FooterContent>
    </>
  );
};

export default Home;
