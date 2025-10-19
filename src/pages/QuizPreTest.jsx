
import React, { useState } from 'react'
import content from '../content/quiz_questions.json'
import { auth, db } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

export default function QuizPreTest(){
  const [user, loading] = useAuthState(auth)
  const navigate = useNavigate()
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState(Array(content.length).fill(null))
  const [finished, setFinished] = useState(false)
  const [score, setScore] = useState(null)
  const TYPE = 'pre'

  if(loading) return <div className="p-4">Loading...</div>
  if(!user) return <div className="p-4">Please login to take the quiz.</div>

  const q = content[index]

  const select = (choiceIndex) => {
    const copy = [...answers]
    copy[index] = choiceIndex
    setAnswers(copy)
  }

  const next = () => {
    if(index < content.length - 1) setIndex(index+1)
    else submit()
  }

  const prev = () => { if(index>0) setIndex(index-1) }

  const submit = async () => {
    let s = 0
    for(let i=0;i<content.length;i++){
      if(answers[i] === content[i].answer) s += 1
    }
    setScore(s)
    setFinished(true)
    try{
      await addDoc(collection(db, 'users', user.uid, 'quiz_results'), {
        type: TYPE,
        answers,
        score: s,
        total: content.length,
        createdAt: serverTimestamp()
      })
    }catch(e){ console.error(e) }
  }

  return (
    <div className="p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">แบบทดสอบ ({TYPE === 'pre' ? 'ก่อนใช้งาน' : 'หลังใช้งาน'})</h1>
      {!finished ? (
        <div>
          <div className="mb-4"><strong>ข้อ {index+1} / {content.length}</strong></div>
          <div className="mb-4 text-lg">{q.q}</div>
          <div className="grid gap-2 mb-4">
            {q.choices.map((c,ci)=> (
              <button key={ci} onClick={()=>select(ci)} className={"p-3 text-left border rounded " + (answers[index]===ci ? 'bg-sky-100' : '')}>{String.fromCharCode(65+ci)}. {c}</button>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="py-2 px-4 border rounded" onClick={prev} disabled={index===0}>ย้อนกลับ</button>
            <button className="py-2 px-4 bg-sky-600 text-white rounded" onClick={next} disabled={answers[index]===null}>{index===content.length-1 ? 'ส่งคำตอบ' : 'ถัดไป'}</button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">ผลลัพธ์</h2>
          <div>คะแนน: {score} / {content.length}</div>
          <div className="mt-3">
            <h3 className="font-semibold">เฉลย</h3>
            <ol className="list-decimal pl-5">
              {content.map((qq,ii)=> (
                <li key={ii} className="mb-2">
                  <div className="font-medium">{qq.q}</div>
                  <div>คำตอบที่ถูก: {String.fromCharCode(65+qq.answer)}. {qq.choices[qq.answer]}</div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-3">
            <button className="py-2 px-4 bg-sky-600 text-white rounded" onClick={()=>navigate('/dashboard')}>กลับไปที่ Dashboard</button>
          </div>
        </div>
      )}
    </div>
  )
}
