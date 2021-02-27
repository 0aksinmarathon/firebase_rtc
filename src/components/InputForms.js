import React from "react";
import InputFormLocal from "./InputFormLocal";
import InputFormRemote from "./InputFormRemote";

const InputForms = ({rtcClient}) => {
  if (rtcClient === null) return <></>;

  return (
    <div>
      <InputFormLocal rtcClient={rtcClient} />
      <InputFormRemote rtcClient={rtcClient} />
    </div>
  );
};

export default InputForms;
