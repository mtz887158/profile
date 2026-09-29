import { supabase } from '../lib/supabase'
const ok = ({ data, error }) => { if (error) throw new Error(error.message); return data }
export const list = (t) => supabase.from(t).select('*').order('created_at', { ascending: false }).then(ok)
export const getOne = (t) => supabase.from(t).select('*').eq('id', 1).maybeSingle().then(ok)
export const save = (t, row) => (row.id ? supabase.from(t).update(row).eq('id', row.id) : supabase.from(t).insert(row)).then(ok)
export const saveSingle = (t, row) => supabase.from(t).upsert({ ...row, id: 1 }).then(ok)
export const remove = (t, id) => supabase.from(t).delete().eq('id', id).then(ok)
export const sendMessage = (m) => supabase.from('messages').insert(m).then(ok)
export const count = (t) => supabase.from(t).select('*', { count: 'exact', head: true }).then((r) => r.count || 0)
export async function upload(file) {
  if (!file.type.startsWith('image/') || file.size > 3e6) throw new Error('Choose an image under 3 MB.')
  const path = `${Date.now()}-${file.name.replace(/[^\w.]/g, '_')}`
  ok(await supabase.storage.from('images').upload(path, file))
  return supabase.storage.from('images').getPublicUrl(path).data.publicUrl
}
