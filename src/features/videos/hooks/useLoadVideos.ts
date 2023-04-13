import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { VideoType } from "../types";

type useLoadVideosProps = {
  pageIndex: number;
}

const useLoadVideos = ({ pageIndex }: useLoadVideosProps) => {
  const path = 'api/v1/videos'
  const { data, isLoading, error, total, fetchApi } = useFetch({ path: path, method: 'GET'})

  const parsedData: VideoType[] = data == null ? [] : (data as any[]).map(raw_video =>
    ({
      id: raw_video.id,
      youtubeUrl: raw_video.youtube_url,
      youtubeId: raw_video.youtube_id,
      sharedBy: raw_video.sharer_email,
      upvoteCount: raw_video.upvote_count,
      downvoteCount: raw_video.downvote_count,
      description: raw_video.description,
      title: raw_video.title,
      createdAt: raw_video.created_at,
    }) as VideoType
  )

    useEffect(()=>{
      fetchApi({ page: pageIndex })
    }, [pageIndex])

  return { data: parsedData, isLoading, error, total, fetchVideos: fetchApi }
}

export default useLoadVideos
