import React from "react";
import { useEffect, useState } from 'react';
import { api } from '../services/api.js';

export default function Settings(){
 const [settings,setSettings]=useState({darkMode:false,emailAlerts:true,smsAlerts:false}); const [msg,setMsg]=useState(''); const [password,setPassword]=useState({oldPassword:'',newPassword:''}); const [error,setError]=useState('');
 useEffect(()=>{api.profile().then(u=>setSettings(u.settings||settings)).catch(e=>setError(e.message))},[]);
 const toggle=key=>setSettings({...settings,[key]:!settings[key]});
 const save=async()=>{try{await api.updateSettings(settings); setMsg('Settings saved');}catch(e){setError(e.message)}};
 const changePass=async(e)=>{e.preventDefault(); try{await api.changePassword(password); setPassword({oldPassword:'',newPassword:''}); setMsg('Password changed');}catch(err){setError(err.message)}};
 return <section className="page"><div className="page-head"><div><p className="eyebrow">System</p><h1>Settings</h1></div></div>{error&&<div className="error-box">{error}</div>}{msg&&<div className="success-box">{msg}</div>}<div className="content-card"><h2>Notification Settings</h2><label className="setting-row"><span>Email alerts</span><input type="checkbox" checked={settings.emailAlerts} onChange={()=>toggle('emailAlerts')}/></label><label className="setting-row"><span>SMS alerts</span><input type="checkbox" checked={settings.smsAlerts} onChange={()=>toggle('smsAlerts')}/></label><label className="setting-row"><span>Dark mode</span><input type="checkbox" checked={settings.darkMode} onChange={()=>toggle('darkMode')}/></label><button className="primary-btn" onClick={save}>Save Settings</button></div><form className="content-card form-card" onSubmit={changePass}><h2>Change Password</h2><input className="plain-input" type="password" placeholder="Old password" value={password.oldPassword} onChange={e=>setPassword({...password,oldPassword:e.target.value})}/><input className="plain-input" type="password" placeholder="New password" value={password.newPassword} onChange={e=>setPassword({...password,newPassword:e.target.value})}/><button className="primary-btn">Change Password</button></form></section>
}
