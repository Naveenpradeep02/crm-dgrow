import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../../services/employeeService";

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

      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-bold mb-4">Employee List</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-3">Name</th>
              <th className="border p-3">Email</th>
              <th className="border p-3">Department</th>
              <th className="border p-3">Designation</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="border p-3">{employee.name}</td>
                <td className="border p-3">{employee.email}</td>
                <td className="border p-3">{employee.department}</td>
                <td className="border p-3">{employee.designation}</td>
                <td className="border p-3">
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
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(employee.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Employees;
