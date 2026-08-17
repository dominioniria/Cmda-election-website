"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
export default function Home(){
 const [code,setCode]=useState(""); const [loading,setLoading]=useState(false); const [error,setError]=useState("");
 const router=useRouter();
 async function login(e){e.preventDefault();setError("");setLoading(true);
  const r=await fetch("/api/participant",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({code})});
  const d=await r.json();setLoading(false);
  if(!r.ok){setError(d.error||"Unable to log in.");return}
  localStorage.setItem("participant",JSON.stringify(d.participant));router.push("/attendance");
 }
 return <main className="page"><div className="card hero"><div className="badge">CMDA</div><h1>Attendance Portal</h1><p>Enter your attendance code to continue.</p><form onSubmit={login}><input value={code} onChange={e=>setCode(e.target.value.toUpperCase())} placeholder="Attendance code" required/><button disabled={loading}>{loading?"Checking…":"Continue"}</button></form>{error&&<div className="error">{error}</div>}</div></main>
}
