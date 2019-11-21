import React, { Component } from "react";
import ourmusic from "../apis/ourmusic";
import axios from "axios";

class home extends Component {
  state = { playlistName: "", numSongs: "" };

  handleTextChange = e => {
    this.setState({ playlistName: e.target.value });
  };

  handleNumChange = e => {
    const value = e.target.value;
    if (value <= 100 && value > 0) {
      this.setState({ numSongs: value });
    }
  };

  handleSubmit = async () => {
    const response = await axios.post("http://localhost:9000/playlist", {
      playlistName: this.state.playlistName,
      numSongs: this.state.numSongs
    });
    console.log(response);
  };

  render() {
    return (
      <div>
        <div>
          <h1>Lets Make a Playlist!</h1>
        </div>
        <div>
          <form>
            <label>
              Playlist Name:
              <input
                type="text"
                name="playlistName"
                value={this.state.playlistName}
                onChange={this.handleTextChange}
              />
            </label>
            <label>
              Number of songs:
              <input
                type="number"
                name="numSongs"
                value={this.state.numSongs}
                onChange={this.handleNumChange}
              />
            </label>
            <br />
            <input
              type="submit"
              value="Create Playlist"
              onClick={this.handleSubmit}
            ></input>
          </form>
        </div>
      </div>
    );
  }
}

export default home;
