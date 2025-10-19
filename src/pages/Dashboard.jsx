import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore'

export default function Dashboard(){
  const [user, loading] = useAuthState(auth)
  const [lastRating, setLastRating] = useState(null)

  useEffect(()=>{
    if(!user) return
    const fetchLast = async () => {
      try{
        const q = query(collection(db, 'users', user.uid, 'surveys'), orderBy('createdAt', 'desc'), limit(1))
        const snap = await getDocs(q)
        if(!snap.empty){
          const doc = snap.docs[0].data()
          setLastRating(doc.rating || null)
        }
      }catch(e){
        console.error(e)
      }
    }
    fetchLast()
  }, [user])

  if(loading) return <div className="p-4">Loading...</div>

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 gap-3 mb-6">
        <Link to="/knowledge/sarcopenia" className="p-4 bg-white rounded shadow">ความรู้: ภาวะ Sarcopenia</Link>
        <Link to="/exercises" className="p-4 bg-white rounded shadow">คู่มือท่าออกกำลังกาย</Link>
      </div>

      <div className="grid grid-cols-1 gap-3 mb-6">
        <Link to="/survey" className="p-4 bg-white rounded shadow">กรอกแบบสอบถามก่อน/หลังการออกกำลังกาย</Link>
        <Link to="/quiz/pretest" className="p-4 bg-white rounded shadow">แบบทดสอบก่อนใช้งาน (Pre-test)</Link>
        <Link to="/quiz/posttest" className="p-4 bg-white rounded shadow">แบบทดสอบหลังใช้งาน (Post-test)</Link>
      </div>

      <div className="p-4 bg-white rounded shadow">
        <h2 className="font-semibold mb-2">สถิติผู้ใช้ (ล่าสุด)</h2>
        <div>ชื่อผู้ใช้: {user?.displayName || user?.email}</div>
        <div>คะแนนความพึงพอใจล่าสุด: {lastRating ? `${lastRating}/5 หัวใจ` : 'ยังไม่มีข้อมูล'}</div>
      </div>
    </div>
  )
}
