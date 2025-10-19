import React, { useState } from 'react'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import HeartRating from '../components/HeartRating'

export default function Survey(){
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()
  const [type, setType] = useState('pre')
  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('no')
  const [rating, setRating] = useState(0)
  const [saving, setSaving] = useState(false)
  const [note, setNote] = useState('')

  if(loading) return <div className="p-4">Loading...</div>
  if(!user) return <div className="p-4">Please login to fill the survey.</div>

  const save = async () => {
    setSaving(true)
    try{
      await addDoc(collection(db, 'users', user.uid, 'surveys'), {
        type,
        q1,
        q2,
        rating,
        note,
        createdAt: serverTimestamp()
      })
      setSaving(false)
      navigate('/dashboard')
    }catch(e){ console.error(e); setSaving(false); alert('บันทึกข้อมูลไม่สำเร็จ') }
  }

  return (
    <div className="p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">แบบสอบถามก่อน/หลังการออกกำลังกาย</h1>
      <div className="mb-4">
        <label className="mr-2">ประเภท:</label>
        <select value={type} onChange={e=>setType(e.target.value)} className="p-2 border rounded">
          <option value="pre">ก่อนการออกกำลังกาย (Pre-Workout)</option>
          <option value="post">หลังการออกกำลังกาย (Post-Workout)</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">1) ตอนนี้คุณรู้สึกอย่างไร? (บรรยายสั้น ๆ)</label>
        <input className="w-full p-2 border rounded" value={q1} onChange={e=>setQ1(e.target.value)} placeholder="เช่น รู้สึกเบาสบาย / เหนื่อย / เจ็บ" />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">2) มีอาการเจ็บหรือปวดไหม?</label>
        <select className="p-2 border rounded" value={q2} onChange={e=>setQ2(e.target.value)}>
          <option value="no">ไม่มี</option>
          <option value="yes">มี</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">3) ความพึงพอใจต่อเว็บไซต์ (หัวใจ 5 ดวง)</label>
        <HeartRating value={rating} onChange={setRating} />
      </div>

      <div className="mb-4">
        <label className="block font-medium mb-1">หมายเหตุเพิ่มเติม (ถ้ามี)</label>
        <textarea className="w-full p-2 border rounded" rows={3} value={note} onChange={e=>setNote(e.target.value)} />
      </div>

      <div className="flex gap-2">
        <button className="py-2 px-4 bg-sky-600 text-white rounded" onClick={save} disabled={saving}>{saving ? 'กำลังบันทึก...' : 'บันทึกแบบสอบถาม'}</button>
        <button className="py-2 px-4 border rounded" onClick={()=>navigate('/dashboard')}>ยกเลิก</button>
      </div>
    </div>
  )
}
