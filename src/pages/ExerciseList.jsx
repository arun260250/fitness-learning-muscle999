import React from 'react'
import { Link } from 'react-router-dom'
import content from '../content/content.json'

export default function ExerciseList(){
  const exercises = content.exercises || []
  const groups = exercises.reduce((acc, ex) => {
    (acc[ex.category] ||= []).push(ex)
    return acc
  }, {})

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">คู่มือท่าออกกำลังกาย</h1>
      {exercises.length === 0 && <div className="p-4 bg-white rounded shadow">ยังไม่มีข้อมูลท่าใน content.json</div>}
      {Object.keys(groups).map(cat => (
        <div key={cat} className="mb-6">
          <h2 className="font-semibold mb-2">{cat}</h2>
          <div className="grid grid-cols-1 gap-2">
            {groups[cat].map(ex => (
              <Link key={ex.slug} to={`/exercises/${ex.slug}`} className="p-3 bg-white rounded shadow flex justify-between">
                <div>
                  <div className="font-medium">{ex.title}</div>
                  <div className="text-sm text-slate-500">{ex.reps || ''}</div>
                </div>
                <div className="text-sm">ดูรายละเอียด</div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
