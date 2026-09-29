import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
export const login = (email, password) => supabase.auth.signInWithPassword({ email, password })
export const logout = () => supabase.auth.signOut()
export function useSession() {
  const [s, setS] = useState(undefined)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setS(data.session))
    const { data } = supabase.auth.onAuthStateChange((_e, sess) => setS(sess))
    return () => data.subscription.unsubscribe()
  }, [])
  return s
}
