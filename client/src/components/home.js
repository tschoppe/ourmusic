import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { Grid, Button, Input } from "semantic-ui-react";

const Title = styled.h1`
  font-size: 3em;
  font-weight: bold;
  padding-bottom: 20%;
  color: #ffffff;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #2d132c;
`;

const StyledInput = styled(Input)`
  padding-bottom: 7%;
`;

const StyledButton = styled(Button)`
  color: #ffffff !important;
  background-color: #801336 !important;
  cursor: pointer;
`;

const StyledRow = styled(Grid.Row)`
  padding-top: 25%;
`;

class home extends Component {
  state = { playlistName: "", numSongs: "" };

  handleTextChange = e => {
    this.setState({ playlistName: e.target.value });
  };

  handleNumChange = e => {
    const value = e.target.value;
    if (value <= 100 && value >= 0) {
      this.setState({ numSongs: value });
    }
  };

  handleSubmit = async e => {
    e.preventDefault();
    const response = await axios.post("http://localhost:9000/playlist", {
      playlistName: this.state.playlistName,
      numSongs: this.state.numSongs
    });
    console.log(response);
  };

  render() {
    return (
      <Wrapper>
        <Grid centered columns={1} textAlign="center">
          <Grid.Column textAlign="center" columns={1}>
            <Grid.Row centered>
              <Title>Discover New Music!</Title>
            </Grid.Row>
            <Grid.Row centered>
              <StyledInput
                name="playlistName"
                size="big"
                type="text"
                placeholder="Playlist name"
                value={this.state.playlistName}
                onChange={this.handleTextChange}
              ></StyledInput>
            </Grid.Row>
            <Grid.Row centered>
              <StyledInput
                name="numSongs"
                size="big"
                type="number"
                placeholder="Number of songs"
                value={this.state.numSongs}
                onChange={this.handleNumChange}
              ></StyledInput>
            </Grid.Row>
            <StyledRow>
              <StyledButton size="big" onClick={this.handleSubmit}>
                Create Playlist
              </StyledButton>
            </StyledRow>
          </Grid.Column>
        </Grid>
      </Wrapper>
    );
  }
}

export default home;
