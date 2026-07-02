import { Bell, CalendarDays, Menu, Search, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../services/api.js';

export default function Navbar({ onMenuClick }) {
  const user = getCurrentUser();
  const currentDate = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'short' });
  return (
    <header className="topbar">
      <button className="hamburger-btn" onClick={onMenuClick} aria-label="Open menu"><Menu size={22} /></button>
      <div className="topbar-title"><p className="eyebrow">Hospital workspace</p><h2>Welcome back, {user?.name}</h2></div>
      <div className="topbar-actions">
        <div className="search-box"><Search size={17} /><span>Search patient, doctor...</span></div>
        <div className="date-pill"><CalendarDays size={17} /> {currentDate}</div>
        <Link to="/notifications" className="icon-btn"><Bell size={20} /></Link>
        <Link to="/profile" className="profile-chip"><UserCircle size={28} /><div><b>{user?.name}</b><small>{user?.role}</small></div></Link>
      </div>
    </header>
  );
}
