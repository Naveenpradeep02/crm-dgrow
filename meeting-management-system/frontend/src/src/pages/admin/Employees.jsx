import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../../services/employeeService";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const Employees = () => {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    phone: "",
  });

  const [employees, setEmployees] = useState([]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch (error) {
      console.log("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateEmployee(editingId, form);

        alert("Employee Updated Successfully");
      } else {
        await createEmployee(form);

        alert("Employee Created Successfully");
      }

      fetchEmployees();

      setEditingId(null);

      setForm({
        name: "",
        email: "",
        department: "",
        designation: "",
        phone: "",
      });
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Operation Failed");
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete Employee?");

    if (!confirmDelete) return;

    try {
      await deleteEmployee(id);

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      <div className="bg-white p-6 rounded-lg shadow">
        {/* <h1 className="text-2xl font-bold mb-6">Add Employee</h1> */}
        <h1 className="text-2xl font-bold mb-6">
          {editingId ? "Update Employee" : "Add Employee"}
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Employee Name"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          <input
            type="text"
            name="department"
            value={form.department}
            placeholder="Department"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          <input
            type="text"
            name="designation"
            value={form.designation}
            placeholder="Designation"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            value={form.phone}
            placeholder="Phone"
            className="border p-3 rounded"
            onChange={handleChange}
          />
          <div className="flex gap-5">
            <button
              type="submit"
              className={`text-white rounded p-3 ${
                editingId ? "bg-yellow-500" : "bg-blue-600"
              }`}
            >
              {editingId ? "Update Employee" : "Create Employee"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);

                  setForm({
                    name: "",
                    email: "",
                    department: "",
                    designation: "",
                    phone: "",
                  });
                }}
                className="bg-gray-500 text-white rounded p-3"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Employee List */}

      <div className="bg-white rounded-xl shadow-sm border mt-6 overflow-hidden">
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-2xl font-bold text-gray-800">Employee List</h2>

          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search"
              className="h-10 px-4 border rounded-lg text-sm outline-none"
            />

            <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm">
              Add Employee
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#F7F3F4] text-gray-700 text-sm">
                <th className="px-6 py-4 text-left">Emp ID</th>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Department</th>
                <th className="px-6 py-4 text-left">Designation</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map((employee, index) => (
                <tr
                  key={employee.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm text-gray-600">
                    EMP {String(index + 1).padStart(3, "0")}
                  </td>

                  {/* Name Column */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ui-avatars.com/api/?name=${employee.name}`}
                        alt=""
                        className="w-10 h-10 rounded-full"
                      />

                      <div>
                        <h4 className="font-medium text-gray-800">
                          {employee.name}
                        </h4>

                        <p className="text-xs text-gray-400">
                          {employee.designation}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {employee.email}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {employee.department}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {employee.designation}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <span className="bg-green-600 text-white px-3 py-1 rounded text-xs font-medium">
                      Active
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => {
                          setEditingId(employee.id);

                          setForm({
                            name: employee.name,
                            email: employee.email,
                            department: employee.department,
                            designation: employee.designation,
                            phone: employee.phone,
                          });
                        }}
                        className="text-gray-500 hover:text-orange-500 text-lg"
                      >
                        <FiEdit2 />
                      </button>

                      <button
                        onClick={() => handleDelete(employee.id)}
                        className="text-gray-500 hover:text-red-500 text-lg"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Employees;
