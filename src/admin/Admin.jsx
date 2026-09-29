import { useEffect, useState } from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import { logout } from '../services/auth'
import { list, getOne, save, saveSingle, remove, count } from '../services/db'
import { schemas, singles } from './config'
import Form from './Form'
function Crud({ table }) {
  const s = schemas[table]; const [rows, setRows] = useState(null); const [edit, setEdit] = useState(null); const [err, setErr] = useState('')
  const load = () => list(table).then(setRows).catch((e) => setErr(e.message))
  useEffect(() => { setEdit(null); setRows(null); load() }, [table])
  const del = async (r) => { if (!confirm(`Delete "${r[s.label]}"? This cannot be undone.`)) return; try { await remove(table, r.id); load() } catch (e) { setErr(e.message) } }
  return <><h2>{s.title}</h2>{err && <div className="msg err">{err}</div>}
    {edit ? <Form fields={s.fields} initial={edit} onCancel={() => setEdit(null)} onSave={async (v) => { await save(table, v); await load(); setEdit(null) }} />
      : <button className="btn pri" onClick={() => setEdit({})}>Add new</button>}
    {rows === null ? <p>Loading…</p> : !rows.length ? <p className="mut">Nothing here yet. Click "Add new".</p> :
      <div style={{ marginTop: 16 }}>{rows.map((r) => <div key={r.id} className="card row" style={{ justifyContent: 'space-between', marginBottom: 8 }}>
        <span>{r[s.label]}</span><span className="row"><button className="btn" onClick={() => setEdit(r)}>Edit</button><button className="btn danger" onClick={() => del(r)}>Delete</button></span></div>)}</div>}</>
}
function Single({ table }) {
  const s = singles[table]; const [row, setRow] = useState(null)
  useEffect(() => { setRow(null); getOne(table).then((r) => setRow(r || {})) }, [table])
  return <><h2>{s.title}</h2>{row && <Form fields={s.fields} initial={row} onSave={(v) => saveSingle(table, v)} />}</>
}
function Dashboard() {
  const [n, setN] = useState({})
  useEffect(() => { Promise.all(['projects', 'certificates', 'youtube_videos', 'messages'].map(count)).then(([a, b, c, d]) => setN({ Projects: a, Certificates: b, Videos: c, Messages: d })) }, [])
  return <><h2>Dashboard</h2><div className="grid">{Object.entries(n).map(([k, v]) => <div key={k} className="card"><h1 className="grad">{v}</h1>{k}</div>)}</div></>
}
function Messages() {
  const [rows, setRows] = useState(null)
  const load = () => list('messages').then(setRows)
  useEffect(() => { load() }, [])
  return <><h2>Messages</h2>{rows === null ? <p>Loading…</p> : !rows.length ? <p className="mut">No messages yet.</p> : rows.map((m) => <div key={m.id} className="card" style={{ marginBottom: 8 }}>
    <b>{m.name}</b> <a href={`mailto:${m.email}`} className="mut">{m.email}</a><p style={{ whiteSpace: 'pre-wrap' }}>{m.message}</p>
    <button className="btn danger" onClick={async () => { if (confirm('Delete this message?')) { await remove('messages', m.id); load() } }}>Delete</button></div>)}</>
}
export default function Admin() {
  const links = [['', 'Dashboard'], ['profile', 'Profile'], ['skills', 'Skills'], ['projects', 'Projects'], ['certificates', 'Certificates'], ['youtube', 'YouTube'], ['social', 'Social Links'], ['messages', 'Messages'], ['settings', 'Settings']]
  return <div className="adm"><aside className="side">{links.map(([p, l]) => <NavLink key={p} end to={`/admin/${p}`} className={({ isActive }) => (isActive ? 'on' : '')}>{l}</NavLink>)}
    <a href="#/">View site</a><a href="#/" onClick={logout}>Log out</a></aside>
    <div className="main"><Routes>
      <Route index element={<Dashboard />} /><Route path="profile" element={<Single table="profile" />} /><Route path="settings" element={<Single table="settings" />} />
      <Route path="skills" element={<Crud table="skills" />} /><Route path="projects" element={<Crud table="projects" />} /><Route path="certificates" element={<Crud table="certificates" />} />
      <Route path="youtube" element={<Crud table="youtube_videos" />} /><Route path="social" element={<Crud table="social_links" />} /><Route path="messages" element={<Messages />} />
    </Routes></div></div>
}
