import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";
import { Grid, Input } from "semantic-ui-react";
import { Title, Wrapper, StyledButton } from "../components/styled/styled";

const StyledInput = styled(Input)`
  padding-bottom: 7%;
`;

const StyledRow = styled(Grid.Row)`
  padding-top: 25%;
`;

const StyledMessage = styled.div`
  font-size: 2em;
  padding-top: 10%;
  color: #ffffff;
`;

class home extends Component {
  state = { playlistName: "", numSongs: "", initialLoad: true, success: false };

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
    this.setState({ initialLoad: false });
    if (response.status === 200) {
      this.setState({ success: true });
    } else {
      this.setState({ success: false });
    }
    console.log(response);
  };

  render() {
    return (
      <Wrapper>
        <Grid centered columns={1} textAlign="center">
          <Grid.Column textAlign="center" columns={1}>
            <Grid.Row centered>
              <Title fontSize="3em" bottomPadding="20%">
                Make a Playlist!
              </Title>
            </Grid.Row>
            {this.state.initialLoad && (
              <>
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
              </>
            )}
            {!this.state.initialLoad && (
              <>
                <Grid.Row centered>
                  {this.state.success && (
                    <StyledMessage>Success!</StyledMessage>
                  )}
                  {!this.state.success && (
                    <StyledMessage>Failed to create playlist</StyledMessage>
                  )}
                </Grid.Row>
              </>
            )}
          </Grid.Column>
        </Grid>
      </Wrapper>
    );
  }
}

export default home;
