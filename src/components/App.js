import React, { useReducer, useState } from "react";
import InputForms from "./InputForms";

import VideoArea from "./VideoArea";
import useRtcClient from "./hooks/useRtcClient";

const App = () => {
  const rtcClient = useRtcClient();
  console.log({ rtcClient });
  return (
    <div>
      <InputForms rtcClient={rtcClient} />
      <VideoArea rtcClient={rtcClient} />
    </div>
  );
};

export default App;
