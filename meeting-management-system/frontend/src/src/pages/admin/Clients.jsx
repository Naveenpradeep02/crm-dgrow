import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import {
  createClient,
  getClients,
  updateClient,
  deleteClient,
} from "../../services/clientService";

const Clients = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company_name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    website: "",
    notes: "",
  });

  const [clients, setClients] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const fetchClients = async () => {
    try {
      const res = await getClients();
      setClients(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateClient(editingId, form);

        alert("Client Updated Successfully");
      } else {
        const res = await createClient(form);

        alert(
          `Client Created Successfully

Password:
${res.data.password}`,
        );
      }

      fetchClients();

      setEditingId(null);

      setForm({
        name: "",
        email: "",
        company_name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        website: "",
        notes: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete Client?");

    if (!confirmDelete) return;

    try {
      await deleteClient(id);

      fetchClients();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>
      {/* Client Form */}

      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6">
          {editingId ? "Update Client" : "Add Client"}
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Client Name"
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
            name="company_name"
            value={form.company_name}
            placeholder="Company Name"
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

          <textarea
            name="address"
            value={form.address}
            placeholder="Address"
            className="border p-3 rounded col-span-2"
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            value={form.city}
            placeholder="City"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          <input
            type="text"
            name="state"
            value={form.state}
            placeholder="State"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          <input
            type="text"
            name="country"
            value={form.country}
            placeholder="Country"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          <input
            type="text"
            name="website"
            value={form.website}
            placeholder="Website"
            className="border p-3 rounded"
            onChange={handleChange}
          />

          <textarea
            name="notes"
            value={form.notes}
            placeholder="Notes"
            className="border p-3 rounded col-span-2"
            onChange={handleChange}
          />
          <div className="col-span-2 flex gap-4">
            <button
              type="submit"
              className="bg-green-600 text-white p-3 rounded"
            >
              {editingId ? "Update Client" : "Create Client"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);

                  setForm({
                    name: "",
                    email: "",
                    company_name: "",
                    phone: "",
                    address: "",
                    city: "",
                    state: "",
                    country: "",
                    website: "",
                    notes: "",
                  });
                }}
                className="bg-gray-500 text-white p-3 rounded"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Client List */}

      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-bold mb-4">Client List</h2>

        <table className="w-full border">
          <thead>
            <tr className="bg-slate-100">
              <th className="border p-3">Client Name</th>

              <th className="border p-3">Company</th>

              <th className="border p-3">Email</th>

              <th className="border p-3">Phone</th>

              <th className="border p-3">City</th>

              <th className="border p-3">Country</th>
              <th className="border p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clients.length > 0 ? (
              clients.map((client) => (
                <tr key={client.id}>
                  <td className="border p-3">{client.name}</td>

                  <td className="border p-3">{client.company_name}</td>

                  <td className="border p-3">{client.email}</td>

                  <td className="border p-3">{client.phone}</td>

                  <td className="border p-3">{client.city}</td>

                  <td className="border p-3">{client.country}</td>
                  <td className="border p-3">
                    <button
                      onClick={() => {
                        setEditingId(client.id);

                        setForm({
                          name: client.name,
                          email: client.email,
                          company_name: client.company_name,
                          phone: client.phone,
                          address: client.address,
                          city: client.city,
                          state: client.state,
                          country: client.country,
                          website: client.website,
                          notes: client.notes,
                        });
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(client.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  No Clients Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Clients;
