import React, { useState } from 'react'
import { auth, provider } from '../firebase'
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const navigate = useNavigate()

  const register = async () => {
    const userCred = await createUserWithEmailAndPassword(auth, email, pw)
    await updateProfile(userCred.user, { displayName: name })
    navigate('/dashboard')
  }

  const login = async () => {
    await signInWithEmailAndPassword(auth, email, pw)
    navigate('/dashboard')
  }

  const loginWithGoogle = async () => {
    await signInWithPopup(auth, provider)
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">fitness-learning-muscle</h2>
        <input className="w-full mb-2 p-2 border rounded" placeholder="ชื่อ-นามสกุล" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full mb-2 p-2 border rounded" placeholder="อีเมล" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full mb-4 p-2 border rounded" placeholder="รหัสผ่าน" value={pw} onChange={e=>setPw(e.target.value)} />
        <div className="flex gap-2">
          <button className="flex-1 py-2 rounded bg-sky-500 text-white" onClick={login}>เข้าสู่ระบบ</button>
          <button className="flex-1 py-2 rounded border" onClick={register}>สมัคร</button>
        </div>
        <div className="mt-4">
          <button className="w-full py-2 rounded bg-white border" onClick={loginWithGoogle}>Sign in with Google</button>
        </div>
      </div>
    </div>
  )
}
