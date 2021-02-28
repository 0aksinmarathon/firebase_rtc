import React from "react";
import IconButton from "@material-ui/core/IconButton";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  icon: {
    height: 38,
    widht: 38,
  },
});

const VolumeButton = ({
  isLocal,
  muted,
  refVolumeButton,
  rtcClient,
  setMuted,
}) => {
  const Icon = muted ? VolumeOffIcon : VolumeUpIcon;
  const classes = useStyles();
  return (
    <IconButton
      aria-label="switch mute"
      onClick={() => {
        setMuted((previousState) => !previousState);
        if (isLocal) rtcClient.toggleAudio();
      }}
    >
      <Icon className={classes.icon} ref={refVolumeButton} />
    </IconButton>
  );
};

export default VolumeButton;
