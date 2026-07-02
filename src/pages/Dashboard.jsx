import { useEffect, useState } from 'react';
import { CalendarCheck, ClipboardList, Clock3, Stethoscope, Users, TrendingUp } from 'lucide-react';
import { api } from '../services/api.js';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => { api.dashboard().then(setData).catch(e => setError(e.message)); }, []);
  if (error) return <section className="page"><div className="error-box">{error}</div></section>;
  if (!data) return <section className="page"><div className="content-card">Loading dashboard...</div></section>;
  const stats = [
    { title:'Doctors', value:data.totalDoctors, icon:Stethoscope, note:'Available specialists' },
    { title:'Patients', value:data.totalPatients, icon:Users, note:'Registered records' },
    { title:'Appointments', value:data.totalAppointments, icon:CalendarCheck, note:`${data.pendingAppointments} waiting` },
    { title:'Prescriptions', value:data.totalPrescriptions, icon:ClipboardList, note:`${data.completedAppointments} completed visits` },
  ];
  return <section className="page"><div className="hero-card"><div><p className="eyebrow">Overview</p><h1>Hospital dashboard</h1><p>Backend connected dashboard from MongoDB.</p></div><div className="hero-badge"><TrendingUp size={22}/> Active System</div></div><div className="stats-grid">{stats.map(({title,value,icon:Icon,note})=><div className="stat-card" key={title}><div className="stat-icon"><Icon size={24}/></div><p>{title}</p><h2>{value}</h2><span>{note}</span></div>)}</div><div className="dashboard-grid"><div className="content-card wide-card"><div className="card-head"><h2>Recent Appointments</h2><span>{data.recentAppointments?.length || 0} latest</span></div><div className="table-wrap"><table><thead><tr><th>Patient</th><th>Doctor</th><th>Date</th><th>Time</th><th>Status</th></tr></thead><tbody>{data.recentAppointments?.map(item=><tr key={item._id}><td><b>{item.patient?.name}</b></td><td>{item.doctor?.name}</td><td>{item.date}</td><td>{item.time}</td><td><span className={`badge ${item.status?.toLowerCase()}`}>{item.status}</span></td></tr>)}</tbody></table></div></div><div className="content-card schedule-card"><div className="card-head"><h2>Today Plan</h2><Clock3 size={21}/></div>{data.recentAppointments?.slice(0,4).map(item=><div className="timeline-item" key={item._id}><span>{item.time}</span><div><b>{item.patient?.name}</b><p>{item.reason}</p></div></div>)}</div></div></section>;
}
