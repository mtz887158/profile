import { useState } from 'react'
import { upload } from '../services/db'
export default function Form({ fields, initial, onSave, onCancel }) {
  const [v, setV] = useState(initial || {}); const [busy, setBusy] = useState(false); const [msg, setMsg] = useState(null)
  const set = (k, x) => setV((o) => ({ ...o, [k]: x }))
  const pick = async (k, file) => { if (!file) return; setBusy(true); try { set(k, await upload(file)) } catch (e) { setMsg({ e: e.message }) } setBusy(false) }
  const submit = async (e) => {
    e.preventDefault()
    const missing = fields.find((f) => f[3] && !String(v[f[0]] || '').trim())
    if (missing) return setMsg({ e: `${missing[1]} is required.` })
    setBusy(true); setMsg(null)
    try { await onSave(v); setMsg({ ok: 'Saved.' }) } catch (er) { setMsg({ e: er.message }) }
    setBusy(false)
  }
  return <form onSubmit={submit} className="card" style={{ maxWidth: 640, marginBottom: 20 }}>
    {fields.map(([k, label, type]) => <div key={k}><label htmlFor={k}>{label}</label>
      {type === 'textarea' ? <textarea id={k} rows="4" value={v[k] || ''} onChange={(e) => set(k, e.target.value)} />
        : type === 'bool' ? <input id={k} type="checkbox" style={{ width: 20 }} checked={!!v[k]} onChange={(e) => set(k, e.target.checked)} />
        : type === 'image' ? <>{v[k] && <img src={v[k]} alt="" style={{ height: 80, borderRadius: 8, display: 'block', marginBottom: 6 }} />}<input id={k} type="file" accept="image/*" onChange={(e) => pick(k, e.target.files[0])} /></>
        : <input id={k} value={v[k] || ''} onChange={(e) => set(k, e.target.value)} />}</div>)}
    {msg && <div className={`msg ${msg.ok ? 'ok' : 'err'}`}>{msg.ok || msg.e}</div>}
    <div className="row" style={{ marginTop: 14 }}><button className="btn pri" disabled={busy}>{busy ? 'Working…' : 'Save'}</button>{onCancel && <button type="button" className="btn" onClick={onCancel}>Cancel</button>}</div>
  </form>
}
