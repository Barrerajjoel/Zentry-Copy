import React, { useRef, useEffect } from "react";
import { useState } from "react";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 3;

  const nextVidRef = useRef(null);
  const mainVideoRef = useRef(null);
  
  // Log when currentIndex changes
  useEffect(() => {
    console.log(`Current video index changed to: ${currentIndex}`);
  }, [currentIndex]);

  const handleVideoLoad = (videoType, index) => {
    console.log(`Video loaded: ${videoType} - Index: ${index}`);
    setLoadedVideos((prev) => prev + 1);
  };

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;
  const handleMiniVidClick = () => {
    setHasClicked(true);
    console.log(`Changing from video ${currentIndex} to video ${upcomingVideoIndex}`);
    setCurrentIndex(upcomingVideoIndex);
  };

  const getVideoSrc = (index) => {
    return `/videos/hero-${index}.mp4`;
  };

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVidClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVidRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={() => handleVideoLoad('Mini Preview', upcomingVideoIndex)}
              />
            </div>
          </div>
          <video 
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={() => handleVideoLoad('Next Video', currentIndex)}
          />
          <video
            ref={mainVideoRef}
            src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={() => handleVideoLoad('Main Video', currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            onPlay={() => console.log(`Now playing main video: ${currentIndex === totalVideos - 1 ? 1 : currentIndex}`)}
          />
        </div>
        <h1 className="font-zentry">
            Gaming
        </h1>
      </div>
    </div>
  );
};

export default Hero;
