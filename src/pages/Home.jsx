import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Youtube, Linkedin, Instagram, Facebook, Globe, ExternalLink, Send } from 'lucide-react'
import { list, getOne, sendMessage } from '../services/db'
import Reveal from '../components/Reveal'
const icons = { github: Github, youtube: Youtube, linkedin: Linkedin, instagram: Instagram, facebook: Facebook }
const Empty = ({ t }) => <p className="mut">Nothing here yet. Add {t} in /admin.</p>
export default function Home() {
  const [d, setD] = useState({ profile: {}, skills: [], projects: [], certificates: [], youtube_videos: [], social_links: [] })
  const [cat, setCat] = useState('All')
  const [err, setErr] = useState('')
  useEffect(() => {
    Promise.all([getOne('profile'), getOne('settings'), ...['skills', 'projects', 'certificates', 'youtube_videos', 'social_links'].map(list)])
      .then(([profile, s, skills, projects, certificates, youtube_videos, social_links]) => {
        setD({ profile: profile || {}, skills, projects, certificates, youtube_videos, social_links })
        if (s?.seo_title) document.title = s.seo_title
        if (s?.seo_description) document.querySelector('meta[name=description]')?.setAttribute('content', s.seo_description)
      }).catch((e) => setErr(e.message))
  }, [])
  const { profile: p } = d
  const cats = ['All', ...new Set(d.projects.map((x) => x.category).filter(Boolean))]
  const shown = d.projects.filter((x) => cat === 'All' || x.category === cat).sort((a, b) => b.featured - a.featured)
  return (<>
    <header className="nav"><div className="wrap"><b className="grad">{p.name || 'Portfolio'}</b>
      <nav>{['about', 'skills', 'projects', 'certificates', 'videos', 'contact'].map((s) => <a key={s} href={`#${s}`} onClick={(e) => { e.preventDefault(); document.getElementById(s)?.scrollIntoView() }}>{s}</a>)}</nav></div></header>
    <main>
      {err && <p className="msg err wrap">Could not load data: {err}. Check your .env and Supabase setup (see README).</p>}
      <section className="wrap hero" style={{ position: 'relative' }}>
        {['{ }', '</>', '01', 'fn()'].map((c, i) => <span key={c} className="code" style={{ left: `${10 + i * 24}%`, top: `${8 + (i % 2) * 70}%`, animationDelay: `${i}s` }}>{c}</span>)}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <h1>Hi, I'm <span className="grad">{p.name}</span></h1>
          <h2 className="mut">{p.title}</h2><p className="mut">{p.bio}</p>
          <div className="row"><a className="btn pri" href="#projects" onClick={(e) => { e.preventDefault(); document.getElementById('projects').scrollIntoView() }}>View My Projects</a>
            <a className="btn" href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact').scrollIntoView() }}>Contact Me</a>
            {p.cv_url && <a className="btn" href={p.cv_url} target="_blank" rel="noreferrer">Download CV</a>}</div>
          <div className="row" style={{ marginTop: 16 }}>{d.social_links.map((s) => { const I = icons[s.platform.toLowerCase()] || Globe; return <a key={s.id} className="btn" href={s.url} target="_blank" rel="noreferrer" aria-label={s.platform}><I size={18} /></a> })}</div>
        </motion.div>
        <img className="avatar" src={p.avatar_url || undefined} alt={`Portrait of ${p.name || 'the developer'}`} />
      </section>
      <section id="about" className="wrap"><Reveal><h2>About me</h2><p className="mut">{p.about}</p>
        <div className="grid">{[['Education', p.education], ['University', p.university], ['Location', p.location], ['Career interests', p.interests], ['Currently learning', p.learning], ['Goals', p.goals]].filter(([, v]) => v).map(([k, v]) => <div className="card" key={k}><b>{k}</b><p className="mut">{v}</p></div>)}</div></Reveal></section>
      <section id="skills" className="wrap"><Reveal><h2>Skills</h2>{!d.skills.length && <Empty t="skills" />}
        <div className="grid">{d.skills.map((s) => <div className="card" key={s.id}><h3>{s.icon} {s.name}</h3><span className="tag">{s.category}</span> <span className="mut">{s.level}</span></div>)}</div></Reveal></section>
      <section id="projects" className="wrap"><Reveal><h2>Projects</h2>
        <div className="row" style={{ marginBottom: 16 }}>{cats.map((c) => <button key={c} className={`btn ${c === cat ? 'pri' : ''}`} onClick={() => setCat(c)}>{c}</button>)}</div>
        {!shown.length && <Empty t="projects" />}
        <div className="grid">{shown.map((x) => <article className="card" key={x.id}>{x.image_url && <img loading="lazy" src={x.image_url} alt={x.name} />}
          <h3>{x.name} {x.featured && <span className="tag">Featured</span>}</h3><p className="mut">{x.short_description}</p>
          <p>{(x.technologies || '').split(',').filter(Boolean).map((t) => <span className="tag" key={t} style={{ marginRight: 6 }}>{t.trim()}</span>)}</p>
          <div className="row">{x.github_url && <a className="btn" href={x.github_url} target="_blank" rel="noreferrer"><Github size={16} />Code</a>}{x.demo_url && <a className="btn" href={x.demo_url} target="_blank" rel="noreferrer"><ExternalLink size={16} />Demo</a>}</div></article>)}</div></Reveal></section>
      <section id="certificates" className="wrap"><Reveal><h2>Certificates</h2>{!d.certificates.length && <Empty t="certificates" />}
        <div className="grid">{d.certificates.map((x) => <div className="card" key={x.id}>{x.image_url && <img loading="lazy" src={x.image_url} alt={x.name} />}<h3>{x.name}</h3><p className="mut">{x.organization} · {x.date}</p>{x.url && <a className="btn" href={x.url} target="_blank" rel="noreferrer">View</a>}</div>)}</div></Reveal></section>
      <section id="videos" className="wrap"><Reveal><h2>YouTube</h2>{!d.youtube_videos.length && <Empty t="videos" />}
        <div className="grid">{d.youtube_videos.map((x) => <div className="card" key={x.id}>{x.image_url && <img loading="lazy" src={x.image_url} alt={x.title} />}<h3>{x.title}</h3><p className="mut">{x.description}</p><span className="tag">{x.category}</span> <span className="mut">{x.date}</span><p><a className="btn pri" href={x.url} target="_blank" rel="noreferrer"><Youtube size={16} />Watch on YouTube</a></p></div>)}</div></Reveal></section>
      <Contact p={p} links={d.social_links} />
    </main>
    <footer className="wrap mut" style={{ padding: '30px 20px' }}>© {new Date().getFullYear()} {p.name}</footer>
  </>)
}
function Contact({ p, links }) {
  const [f, setF] = useState({ name: '', email: '', message: '' }); const [st, setSt] = useState(null)
  const submit = async () => {
    if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email) || f.message.trim().length < 5) return setSt({ e: 'Enter your name, a valid email and a message.' })
    try { await sendMessage(f); setF({ name: '', email: '', message: '' }); setSt({ ok: 'Message sent. Thank you!' }) } catch (e) { setSt({ e: e.message }) }
  }
  return <section id="contact" className="wrap"><Reveal><h2>Contact</h2>
    <p className="mut">{p.email} {p.whatsapp && <a href={`https://wa.me/${p.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">· WhatsApp</a>} {links.map((l) => <a key={l.id} href={l.url} target="_blank" rel="noreferrer"> · {l.platform}</a>)}</p>
    <div className="card" style={{ maxWidth: 560 }}>
      <label htmlFor="n">Name</label><input id="n" value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} />
      <label htmlFor="e">Email</label><input id="e" type="email" value={f.email} onChange={(e) => setF({ ...f, email: e.target.value })} />
      <label htmlFor="m">Message</label><textarea id="m" rows="5" value={f.message} onChange={(e) => setF({ ...f, message: e.target.value })} />
      {st && <div className={`msg ${st.ok ? 'ok' : 'err'}`}>{st.ok || st.e}</div>}
      <button className="btn pri" onClick={submit}><Send size={16} />Send message</button></div></Reveal></section>
}
