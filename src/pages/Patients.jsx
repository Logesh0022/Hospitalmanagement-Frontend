import { useEffect, useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { api, getCurrentUser } from '../services/api.js';

export default function Patients(){
 const user=getCurrentUser(); const isAdmin=user?.role==='admin';
 const [patients,setPatients]=useState([]); const [error,setError]=useState('');
 const [form,setForm]=useState({name:'',email:'',password:'patient123',phone:'',age:'',gender:'Male',bloodGroup:'',address:''});
 const load=()=>api.patients().then(setPatients).catch(e=>setError(e.message)); useEffect(load,[]);
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 const add=async(e)=>{e.preventDefault(); try{await api.createPatient(form); setForm({name:'',email:'',password:'patient123',phone:'',age:'',gender:'Male',bloodGroup:'',address:''}); load();}catch(err){setError(err.message)}};
 const del=async(id)=>{if(!confirm('Delete patient?'))return; await api.deletePatient(id); load();};
 return <section className="page"><div className="page-head"><div><p className="eyebrow">Patients</p><h1>Patient Management</h1></div></div>{error&&<div className="error-box">{error}</div>}{isAdmin&&<form className="content-card form-card" onSubmit={add}><div className="card-head"><h2>Add Patient</h2><Plus/></div><div className="form-grid"><input className="plain-input" name="name" placeholder="Name" required value={form.name} onChange={change}/><input className="plain-input" name="email" placeholder="Email" required value={form.email} onChange={change}/><input className="plain-input" name="phone" placeholder="Phone" value={form.phone} onChange={change}/><input className="plain-input" name="age" placeholder="Age" type="number" value={form.age} onChange={change}/><select className="plain-input" name="gender" value={form.gender} onChange={change}><option>Male</option><option>Female</option><option>Other</option></select><input className="plain-input" name="bloodGroup" placeholder="Blood Group" value={form.bloodGroup} onChange={change}/></div><input className="plain-input" name="address" placeholder="Address" value={form.address} onChange={change}/><button className="primary-btn">Add Patient</button></form>}<div className="content-card"><div className="table-wrap"><table><thead><tr><th>Name</th><th>Age/Gender</th><th>Blood</th><th>Phone</th>{isAdmin&&<th>Action</th>}</tr></thead><tbody>{patients.map(p=><tr key={p._id}><td><b>{p.name}</b><br/><small>{p.email}</small></td><td>{p.age || '-'} / {p.gender || '-'}</td><td>{p.bloodGroup || '-'}</td><td>{p.phone || '-'}</td>{isAdmin&&<td><button className="danger-btn" onClick={()=>del(p._id)}><Trash2 size={16}/></button></td>}</tr>)}</tbody></table></div></div></section>
}
