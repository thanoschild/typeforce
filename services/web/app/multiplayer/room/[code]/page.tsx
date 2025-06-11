import React, {use} from 'react'
import RoomSection from '@/components/multiplayer/RoomSection'

export default function RoomPage(props: { params: Promise<{ code: string }> }) {
  const { code } = use(props.params);
  return (
      <RoomSection code={code}/>
  )
}