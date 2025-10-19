import React from 'react'

export default function HeartRating({ value=0, onChange }){
  const hearts = [1,2,3,4,5]
  return (
    <div className="flex items-center gap-2">
      {hearts.map(h => (
        <button key={h} onClick={()=>onChange(h)} aria-label={`${h} hearts`} className="text-2xl">
          <span style={{color: h<=value ? '#ef4444' : '#e5e7eb'}}>{h<=value ? '❤' : '♡'}</span>
        </button>
      ))}
      <div className="text-sm text-slate-500 ml-2">{value}/5</div>
    </div>
  )
}
