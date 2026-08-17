"use client";
import {useEffect,useState} from "react";
export default function Attendance(){
 const [p,setP]=useState(null),[sessions,setSessions]=useState([]),[loading,setLoading]=useState(true),[busy,setBusy]=useState(null),[msg,setMsg]=useState("");
 useEffect(()=>{const x=localStorage.getItem("participant");if(!x){location.href="/";return}const q=JSON.parse(x);setP(q);load(q.code)},[]);
 async function load(code){const r=await fetch("/api/participant?code="+encodeURIComponent(code));const d=await r.json();if(r.ok)setSessions(d.sessions||[]);setLoading(false)}
 async function mark(id){setBusy(id);setMsg("");const r=await fetch("/api/attendance",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({code:p.code,session_id:id})});const d=await r.json();setBusy(null);setMsg(d.message||d.error||"");if(r.ok)load(p.code)}
 if(!p)return <main className="page"><div className="card">Loading…</div></main>;
 const done=sessions.filter(x=>x.attended).length, pct=Math.round(done/5*100);
 return <main className="page"><div className="card wide"><div className="top"><div><div className="muted">Welcome</div><h1>{p.name}</h1></div><button className="secondary" onClick={()=>{localStorage.removeItem("participant");location.href="/"}}>Log out</button></div><div className="progress"><strong>{pct}% attendance</strong><span>{done} of 5 sessions</span><div className="bar"><i style={{width:pct+"%"}}/></div>{msg&&<div className="notice">{msg}</div>}<h2>Sessions</h2>{loading?<p>Loading sessions…</p>:<div className="sessions">{sessions.map(s=><div className="session" key={s.id}><div><strong>{s.name}</strong><small>{s.session_date||"Date to be announced"}</small></div>{s.attended?<span className="done">✓ Present</span>:<button onClick={()=>mark(s.id)} disabled={busy===s.id}>{busy===s.id?"Saving…":"Mark attendance"}</button>}</div>)}</div>}</div></main>
}
