import React, { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { api, getCurrentUser } from "../services/api.js";

export default function Doctors() {
  const user = getCurrentUser();
  const isAdmin = user?.role === "admin";

  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "doctor123",
    phone: "",
    specialization: "",
    department: "",
    experience: "",
  });

  const load = async () => {
    try {
      const data = await api.doctors();
      setDoctors(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const change = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const add = async (e) => {
    e.preventDefault();
    try {
      await api.createDoctor(form);
      setForm({
        name: "",
        email: "",
        password: "doctor123",
        phone: "",
        specialization: "",
        department: "",
        experience: "",
      });
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const del = async (id) => {
    if (!window.confirm("Delete doctor?")) return;

    try {
      await api.deleteDoctor(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="page">
      <div className="page-head">
        <div>
          <p className="eyebrow">Doctors</p>
          <h1>Doctor Management</h1>
        </div>
      </div>

      {error && <div className="error-box">{error}</div>}

      {isAdmin && (
        <form className="content-card form-card" onSubmit={add}>
          <div className="card-head">
            <h2>Add Doctor</h2>
            <Plus />
          </div>

          <div className="form-grid">
            <input className="plain-input" name="name" placeholder="Name" required value={form.name} onChange={change} />
            <input className="plain-input" name="email" placeholder="Email" required value={form.email} onChange={change} />
            <input className="plain-input" name="phone" placeholder="Phone" value={form.phone} onChange={change} />
            <input className="plain-input" name="specialization" placeholder="Specialization" value={form.specialization} onChange={change} />
            <input className="plain-input" name="department" placeholder="Department" value={form.department} onChange={change} />
            <input className="plain-input" name="experience" placeholder="Experience" type="number" value={form.experience} onChange={change} />
          </div>

          <button className="primary-btn">Add Doctor</button>
        </form>
      )}

      <div className="content-card">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Department</th>
                <th>Phone</th>
                {isAdmin && <th>Action</th>}
              </tr>
            </thead>

            <tbody>
              {doctors.map((d) => (
                <tr key={d._id}>
                  <td>
                    <b>{d.name}</b>
                    <br />
                    <small>{d.email}</small>
                  </td>
                  <td>{d.specialization || "-"}</td>
                  <td>{d.department || "-"}</td>
                  <td>{d.phone || "-"}</td>
                  {isAdmin && (
                    <td>
                      <button className="danger-btn" onClick={() => del(d._id)}>
                        <Trash2 size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}

              {doctors.length === 0 && (
                <tr>
                  <td colSpan={isAdmin ? 5 : 4}>No doctors found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}