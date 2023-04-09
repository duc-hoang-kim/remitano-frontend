import React from 'react'
import useLoadVideos from '../features/videos/hooks/useLoadVideos'
import { Container } from '@mui/material'
import VideoIframe from '../features/videos/components/videoIframe'
import VideoItem from '../features/videos/components/videoItem'

type Props = {}

const HomePage = (props: Props) => {
  const { data: videos } = useLoadVideos({ pageIndex: 0 })
  console.log(videos)

  return (
    <Container>
      { videos.map(video =>
        <VideoItem video={ video } />
      ) }
    </Container>
  )
}

export default HomePage
