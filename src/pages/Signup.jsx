import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { api, setAuth } from '../services/api.js';

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', password:'', phone:'', gender:'Male', age:'', address:'', bloodGroup:'' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => { e.preventDefault(); setError(''); setLoading(true); try { const data = await api.register({ ...form, role:'patient' }); setAuth(data); navigate('/dashboard'); window.location.reload(); } catch(err){ setError(err.message); } finally { setLoading(false); } };
  const onChange = e => setForm({...form,[e.target.name]:e.target.value});
  return <div className="auth-page"><div className="auth-visual"><div className="glass-panel"><div className="brand-mark large"><Activity size={34}/></div><h1>Create Patient Account</h1><p>Your details will be saved in MongoDB.</p></div></div><form className="auth-card" onSubmit={handleSubmit}><p className="eyebrow">Patient signup</p><h2>Create account</h2>{error && <div className="error-box">{error}</div>}<label>Name</label><input className="plain-input" name="name" required value={form.name} onChange={onChange}/><label>Email</label><input className="plain-input" name="email" type="email" required value={form.email} onChange={onChange}/><label>Password</label><input className="plain-input" name="password" type="password" required value={form.password} onChange={onChange}/><div className="form-grid"><div><label>Phone</label><input className="plain-input" name="phone" value={form.phone} onChange={onChange}/></div><div><label>Age</label><input className="plain-input" name="age" type="number" value={form.age} onChange={onChange}/></div></div><div className="form-grid"><div><label>Gender</label><select className="plain-input" name="gender" value={form.gender} onChange={onChange}><option>Male</option><option>Female</option><option>Other</option></select></div><div><label>Blood Group</label><input className="plain-input" name="bloodGroup" value={form.bloodGroup} onChange={onChange}/></div></div><label>Address</label><input className="plain-input" name="address" value={form.address} onChange={onChange}/><button className="primary-btn" disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button><p className="auth-link">Already have account? <Link to="/login">Login</Link></p></form></div>;
}
