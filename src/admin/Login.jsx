import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/auth'
export default function Login() {
  const [email, setEmail] = useState(''); const [pw, setPw] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false)
  const nav = useNavigate()
  const go = async (e) => {
    e.preventDefault(); setBusy(true); setErr('')
    const { error } = await login(email, pw)
    setBusy(false)
    error ? setErr('Wrong email or password.') : nav('/admin')
  }
  return <form className="card" onSubmit={go} style={{ maxWidth: 380, margin: '15vh auto' }}>
    <h2>Admin login</h2>
    <label htmlFor="em">Email</label><input id="em" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
    <label htmlFor="pw">Password</label><input id="pw" type="password" required value={pw} onChange={(e) => setPw(e.target.value)} />
    {err && <div className="msg err">{err}</div>}
    <button className="btn pri" disabled={busy} style={{ marginTop: 14 }}>{busy ? 'Signing in…' : 'Sign in'}</button>
  </form>
}
