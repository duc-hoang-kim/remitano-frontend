import React, { useState } from 'react'
import useLoadVideos from '../features/videos/hooks/useLoadVideos'
import { Box, Pagination } from '@mui/material'
import VideoItem from '../features/videos/components/VideoItem'

type Props = {}

const HomePage = (props: Props) => {
  const [page, setPage] = useState(0)
  const { data: videos, total: totalVideos } = useLoadVideos({ pageIndex: page })

  return (
    <Box>
      {videos.map(video =>
        <VideoItem key={video.id} video={video} />
      )}
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Pagination count={Math.ceil(totalVideos/4)} page={page} onChange={(e, page) => setPage(page)} />
      </Box>
    </Box>
  )
}

export default HomePage
