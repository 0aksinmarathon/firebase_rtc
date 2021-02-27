import React from "react";
import Video from "./Video";

const VideoRemote = ({ rtcClient }) => {
  const videoRef = rtcClient.remoteVideoRef;
  //   const currentVideoRef = videoRef.current;
  //   useEffect(() => {
  //     if (currentVideoRef === null) return;
  //     const getMedia = async () => {
  //       const constraints = { audio: true, video: true };

  //       try {
  //         const mediaStream = await navigator.mediaDevices.getUserMedia(
  //           constraints
  //         );
  //         currentVideoRef.srcObject = mediaStream;
  //       } catch (err) {
  //         console.error(err);
  //       }

  //     };
  //     getMedia();
  //   }, [currentVideoRef]);

  return (
    <Video
      isLocal={false}
      name={rtcClient.remotePeerName}
      videoRef={videoRef}
    />
  );
};

export default VideoRemote;
