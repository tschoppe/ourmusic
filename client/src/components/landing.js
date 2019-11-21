import React, { Component } from "react";
import ourmusic from "../apis/ourmusic";

const onButtonClick = async () => {
  const response = await ourmusic.get("/login");
  window.location.replace(response.data);
};

const landing = () => {
  return (
    <div>
      <div>
        <h1>Sign in</h1>
      </div>
      <div>
        <button onClick={onButtonClick}>Sign in with Spotify</button>
      </div>
    </div>
  );
};

export default landing;
