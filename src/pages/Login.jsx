import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity, ArrowRight, Lock, Mail } from 'lucide-react';
import { api, setAuth } from '../services/api.js';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: 'admin@hms.com', password: '123456' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const data = await api.login(form);
      setAuth(data);
      navigate('/dashboard');
      window.location.reload();
    } catch (err) { setError(err.message); } finally { setLoading(false); }
  };
  const quickLogin = (email) => setForm({ email, password: '123456' });

  return <div className="auth-page"><div className="auth-visual"><div className="glass-panel"><div className="brand-mark large"><Activity size={34} /></div><h1>Hospital Management System</h1><p>Connected with Node.js, Express and MongoDB backend.</p><div className="visual-stats"><div><b>API</b><span>Live</span></div><div><b>JWT</b><span>Auth</span></div><div><b>DB</b><span>MongoDB</span></div></div></div></div><form className="auth-card" onSubmit={handleSubmit}><p className="eyebrow">Welcome back</p><h2>Login to MedCare</h2><p className="muted">Run backend first, then use seed demo accounts.</p>{error && <div className="error-box">{error}</div>}<label>Email</label><div className="input-icon"><Mail size={18} /><input required type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})}/></div><label>Password</label><div className="input-icon"><Lock size={18} /><input required type="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})}/></div><button className="primary-btn" disabled={loading}>{loading ? 'Logging in...' : 'Login'} <ArrowRight size={18}/></button><div className="demo-box"><button type="button" onClick={()=>quickLogin('admin@hms.com')}>Admin</button><button type="button" onClick={()=>quickLogin('doctor@hms.com')}>Doctor</button><button type="button" onClick={()=>quickLogin('patient@hms.com')}>Patient</button></div><p className="auth-link">New patient? <Link to="/signup">Create account</Link></p></form></div>;
}
