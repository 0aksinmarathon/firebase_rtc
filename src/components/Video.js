import React, { useRef, useState } from "react";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

import useDimensions from "./hooks/useDimensions";
import VolumeButton from "./VolumeButton";
import AudioAnalyser from "./AudioAnalyser";

const Video = ({ name, videoRef, rtcClient, isLocal }) => {
  const [muted, setMuted] = useState(rtcClient.initialAudioMuted);
  const refCard = useRef(null);
  const dimensionsCard = useDimensions(refCard);
  const refVolumeButton = useRef(null);
  const dimensionsVolumeButton = useDimensions(refVolumeButton);
  return (
    <Card ref={refCard}>
      <CardActionArea>
        <video
          autoPlay
          ref={videoRef}
          muted={isLocal || muted}
          width={dimensionsCard.width}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <VolumeButton
          isLocal={isLocal}
          muted={muted}
          rtcClient={rtcClient}
          setMuted={setMuted}
          refVolumeButton={refVolumeButton}
        />
        {!muted && videoRef.current && videoRef.current.srcObject && (
          <AudioAnalyser
            audio={videoRef.current.srcObject}
            width={dimensionsCard.width - dimensionsVolumeButton.width - 40}
          />
        )}
      </CardActions>
    </Card>
  );
};

export default Video;
