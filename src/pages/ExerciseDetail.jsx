import React from 'react'
import { useParams, Link } from 'react-router-dom'
import content from '../content/content.json'

export default function ExerciseDetail(){
  const { slug } = useParams()
  const ex = (content.exercises || []).find(e => e.slug === slug)
  if(!ex) return <div className="p-4">ไม่พบท่า</div>

  const getYouTubeEmbed = (url) => {
    try{
      if(!url) return ''
      const u = new URL(url)
      const v = u.searchParams.get('v')
      const id = v || url.split('/').pop()
      return `https://www.youtube.com/embed/${id}`
    }catch(e){ return url }
  }

  return (
    <div className="p-4 max-w-3xl">
      <Link to="/exercises" className="text-sm text-sky-600">◀ ย้อนกลับ</Link>
      <h1 className="text-2xl font-bold mt-2">{ex.title}</h1>
      <div className="mt-4 bg-white p-4 rounded shadow">
        <div className="mb-3">{ex.reps} • {ex.frequency}</div>
        <ol className="list-decimal pl-5 mb-3">
          {(ex.steps || []).map((s,i)=> <li key={i} className="mb-1">{s}</li>)}
        </ol>
        <div className="mb-3">
          <strong>ประโยชน์:</strong>
          <ul className="list-disc pl-5">
            {(ex.benefits || []).map((b,i)=> <li key={i}>{b}</li>)}
          </ul>
        </div>
        {ex.youtubeUrl && (
          <div style={{position:'relative', paddingBottom:'56.25%', height:0}}>
            <iframe title={ex.title} style={{position:'absolute', left:0, top:0, width:'100%', height:'100%'}} src={getYouTubeEmbed(ex.youtubeUrl)} frameBorder="0" allowFullScreen></iframe>
          </div>
        )}
      </div>
    </div>
  )
}
