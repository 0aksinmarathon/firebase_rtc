import React, { useReducer, useState } from "react";
import InputForms from "./InputForms";

import VideoArea from "./VideoArea";
import useRtcClient from "./hooks/useRtcClient";

const App = () => {
  const rtcClient = useRtcClient();
  console.log({ rtcClient });
  return (
    <>
      <InputForms rtcClient={rtcClient} />
      <VideoArea rtcClient={rtcClient} />
    </>
  );
};

export default App;
