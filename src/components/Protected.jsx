import React from 'react'
import { auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'

export default function Protected({ children }){
  const [user, loading] = useAuthState(auth)
  if(loading) return <div className="p-4">Loading...</div>
  if(!user) return <Navigate to="/login" />
  return children
}
