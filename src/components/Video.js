import React from "react";

const Video = ({ name, videoRef, isLocal }) => {
  return (
    <div>
      <video autoPlay ref={videoRef} muted={isLocal}/>
      <div>{name}</div>
    </div>
  );
};

export default Video;
