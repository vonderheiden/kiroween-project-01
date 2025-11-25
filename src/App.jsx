import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import TodoList from './components/TodoList'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Check if environment variables are set
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

  useEffect(() => {
    if (!supabaseUrl || !supabaseKey) {
      setError('Missing Supabase configuration. Please check environment variables.')
      setLoading(false)
      return
    }

    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        setSession(session)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error getting session:', err)
        setError(err.message)
        setLoading(false)
      })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [supabaseUrl, supabaseKey])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <div className="text-sm text-gray-600 bg-gray-100 p-4 rounded">
            <p className="font-semibold mb-2">Environment Variables Status:</p>
            <p>VITE_SUPABASE_URL: {supabaseUrl ? '✓ Set' : '✗ Missing'}</p>
            <p>VITE_SUPABASE_ANON_KEY: {supabaseKey ? '✓ Set' : '✗ Missing'}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {!session ? <Auth /> : <TodoList user={session.user} />}
    </div>
  )
}
