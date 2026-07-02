import React from "react";
import { Activity, Bell, CalendarDays, ClipboardList, Home, LogOut, Settings, Stethoscope, UserCircle, UsersRound, X } from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { getCurrentUser, logoutUser } from '../services/storage.js';

export default function Sidebar({ isOpen = false, onClose }) {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: Home },
    { to: '/doctors', label: 'Doctors', icon: Stethoscope, hideFor: ['doctor', 'patient'] },
    { to: '/patients', label: 'Patients', icon: UsersRound, hideFor: ['patient'] },
    { to: '/appointments', label: 'Appointments', icon: CalendarDays },
    { to: '/prescriptions', label: 'Prescriptions', icon: ClipboardList },
    { to: '/notifications', label: 'Notifications', icon: Bell },
    { to: '/activity', label: 'Activity', icon: Activity, hideFor: ['patient'] },
    { to: '/profile', label: 'Profile', icon: UserCircle },
    { to: '/settings', label: 'Settings', icon: Settings, hideFor: ['doctor', 'patient'] },
  ].filter((item) => !item.hideFor?.includes(user?.role));

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
    window.location.reload();
  };

  return (
    <aside className={isOpen ? 'sidebar open' : 'sidebar'}>
      <div className="brand-card">
        <div className="brand-mark"><Activity size={25} /></div>
        <div>
          <h1>MedCare</h1>
          <p>Smart HMS Panel</p>
        </div>
        <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
          <X size={20} />
        </button>
      </div>

      <nav className="side-nav">
        {links.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Icon size={19} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="role-card">
        <span>Your Role</span>
        <b>{user?.role}</b>
        <small>Demo frontend access</small>
      </div>

      <button className="logout-btn" onClick={handleLogout}>
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
