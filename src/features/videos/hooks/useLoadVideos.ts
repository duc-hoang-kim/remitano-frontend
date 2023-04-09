import useFetch from "../../../hooks/useFetch";
import { VideoType } from "../types";

type useLoadVideosProps = {
  pageIndex: number;
}

const useLoadVideos = ({ pageIndex }: useLoadVideosProps) => {
  const path = 'api/v1/videos'
  const params = { page: pageIndex }
  const { data, isLoading, error } = useFetch({ path: path, method: 'GET', params: params})

  const parsedData: VideoType[] = data == null ? [] : (data as any[]).map(raw_video =>
    ({
      id: raw_video.id,
      youtubeUrl: raw_video.youtube_url,
      youtubeId: raw_video.youtube_id,
      sharedBy: raw_video.shared_by,
      upvoteCount: raw_video.upvote_count,
      downvoteCount: raw_video.downvote_count,
      description: raw_video.description,
      title: raw_video.title,
      createdAt: raw_video.created_at,
      updatedAt: raw_video.updated_at
    }) as VideoType
  )

  return { data: parsedData, isLoading: isLoading, error: error }
}

export default useLoadVideos
