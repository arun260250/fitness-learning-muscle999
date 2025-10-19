import React from 'react'
import content from '../content/content.json'

export default function KnowledgeSarcopenia(){
  const data = content.pages && content.pages.length > 0 ? content.pages[0] : { text: '' }
  return (
    <div className="p-4 max-w-3xl">
      <h1 className="text-2xl font-bold mb-2">ความรู้: Sarcopenia</h1>
      <pre className="whitespace-pre-wrap">{data.text}</pre>
    </div>
  )
}
