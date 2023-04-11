import React, { ReactNode, useState } from "react";
import useLoadVideos from "../features/videos/hooks/useLoadVideos";
import { VideoType } from "../features/videos/types";

type AuthProviderPropsType = {
  children: ReactNode;
};

type HompageContextType = {
  videos: VideoType[],
  numberOfPages: number,
  page: number,
  setPage: (page: number) => void,
  refresh: () => void,
}

const HomepageContext = React.createContext<HompageContextType>({
  videos: [],
  numberOfPages: 0,
  page: 0,
  setPage: (page: number) => {},
  refresh: () => {}
});

const HomepageProvider = ({ children }: AuthProviderPropsType) => {
  const [page, setPage] = useState<number>(1)
  const { data: videos, total, fetchVideos } = useLoadVideos({ pageIndex: page })

  const refresh = () => {
    console.log('refresh')
    setPage(1);
    fetchVideos();
  }

  const value = {
    page,
    setPage,
    videos,
    numberOfPages: Math.ceil(total/4),
    refresh,
  };

  return <HomepageContext.Provider value={value}>{children}</HomepageContext.Provider>;
};

const useHomepageContext = () => {
  const context = React.useContext(HomepageContext);
  if (context === undefined) {
    throw new Error("must be used within a AuthProvider");
  }
  return context;
};

export { HomepageProvider, useHomepageContext };
