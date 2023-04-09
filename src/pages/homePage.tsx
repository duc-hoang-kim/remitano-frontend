import React from 'react'
import useLoadVideos from '../features/videos/hooks/useLoadVideos'

type Props = {}

const HomePage = (props: Props) => {
  const { data: videos } = useLoadVideos({ pageIndex: 0 })

  console.log(videos)
  return (
    <div>{ process.env.REACT_APP_REMITANO_BACKEND_URL }</div>
  )
}

export default HomePage
