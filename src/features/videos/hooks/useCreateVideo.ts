import { useHomepageContext } from "../../../contexts/HomepageContext";
import useFetch from "../../../hooks/useFetch";

const useCreateVideo = (props: { onSuccess: () => void }) => {
  const { refresh } = useHomepageContext();
  const onSuccess = () => {
    props.onSuccess();
    refresh();
  }

  const { data, error, fetchApi } = useFetch({
    path: "api/v1/videos",
    method: "POST",
    onSuccess: onSuccess,
  });

  return { data, error, fetchCreateVideo: fetchApi };
};

export default useCreateVideo;
