import React from "react";
import { useEffect, useState } from 'react';
import { api, setAuth, getToken } from '../services/api.js';

export default function Profile(){
 const [form,setForm]=useState(null); const [msg,setMsg]=useState(''); const [error,setError]=useState('');
 useEffect(()=>{api.profile().then(setForm).catch(e=>setError(e.message))},[]);
 const change=e=>setForm({...form,[e.target.name]:e.target.value});
 const save=async(e)=>{e.preventDefault(); setMsg(''); try{const data=await api.updateProfile(form); setAuth({token:getToken(), user:data.user}); setMsg('Profile updated successfully');}catch(err){setError(err.message)}};
 if(!form) return <section className="page"><div className="content-card">Loading profile...</div></section>;
 return <section className="page"><div className="page-head"><div><p className="eyebrow">Account</p><h1>My Profile</h1></div></div>{error&&<div className="error-box">{error}</div>}{msg&&<div className="success-box">{msg}</div>}<form className="content-card form-card" onSubmit={save}><div className="form-grid"><input className="plain-input" name="name" value={form.name||''} onChange={change}/><input className="plain-input" value={form.email||''} disabled/><input className="plain-input" name="phone" placeholder="Phone" value={form.phone||''} onChange={change}/><input className="plain-input" name="age" placeholder="Age" value={form.age||''} onChange={change}/><select className="plain-input" name="gender" value={form.gender||''} onChange={change}><option value="">Gender</option><option>Male</option><option>Female</option><option>Other</option></select><input className="plain-input" name="bloodGroup" placeholder="Blood Group" value={form.bloodGroup||''} onChange={change}/></div><input className="plain-input" name="address" placeholder="Address" value={form.address||''} onChange={change}/><button className="primary-btn">Update Profile</button></form></section>
}
