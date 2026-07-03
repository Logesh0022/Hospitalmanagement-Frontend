import React, { useEffect, useState } from "react";
import { Bell, Trash2 } from "lucide-react";
import { api } from "../services/api.js";

export default function Notifications() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const data = await api.notifications();
      setItems(data);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const readAll = async () => {
    try {
      await api.markAllRead();
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const del = async (id) => {
    try {
      await api.deleteNotification(id);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="page">
      <div className="page-head">
        <div>
          <p className="eyebrow">Alerts</p>
          <h1>Notifications</h1>
        </div>

        <button className="primary-btn" onClick={readAll}>
          Mark all read
        </button>
      </div>

      {error && <div className="error-box">{error}</div>}

      <div className="cards-grid">
        {items.map((n) => (
          <div className="content-card" key={n._id}>
            <div className="card-head">
              <h2>
                <Bell size={18} /> {n.title}
              </h2>

              <button className="danger-btn" onClick={() => del(n._id)}>
                <Trash2 size={16} />
              </button>
            </div>

            <p>{n.message}</p>

            <span className={`badge ${n.isRead ? "completed" : "pending"}`}>
              {n.isRead ? "Read" : "Unread"}
            </span>
          </div>
        ))}

        {items.length === 0 && (
          <div className="content-card">
            <p>No notifications found</p>
          </div>
        )}
      </div>
    </section>
  );
}