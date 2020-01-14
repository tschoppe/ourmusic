import React, { Component } from "react";
import styled from "styled-components";
import axios from "axios";

const Title = styled.h1`
  text-align: center;
  color: #272838;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #2d132c;
`;

const PageContent = styled.div`
  max-width: 75%;
  text-align: center;
`;

const InputContainer = styled.div`
  float: left;
  width: 75%;
  margin-top: 10px;
`;

const LabelContainer = styled.div`
  float: left;
  width: 25%;
`;

const InputBox = styled.input`
  width: 100%;
  padding: 12px;
  box-sizing: border-box;
  resize: vertical;
`;

const InputLabel = styled.label`
  padding: 12px 12px 12px 0;
  display: inline-block;
  color: #272838;
`;

const Row = styled.div`
  padding: 5px;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;

const CreateButton = styled.button`
  transition: all 0.4s ease 0s;
  border-radius: 5px;
  font-size: 14px;
  padding: 12px 30px;
  margin-top: 16px;
  color: #ffffff;
  background-color: #2f3061;
  &:hover {
    color: #ffffff !important;
    background: #ea526f;
    border-color: #f6b93b !important;
    border-radius: 5px;
    transition: all 0.4s ease 0s;
  }
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
      <Wrapper className="Wrapper">
        <PageContent>
          <div>
            <Title>Discover New Music!</Title>
          </div>
          <div>
            <form>
              <Row>
                <LabelContainer>
                  <InputLabel>Playlist Name</InputLabel>
                </LabelContainer>
                <InputContainer>
                  <InputBox
                    type="text"
                    name="playlistName"
                    value={this.state.playlistName}
                    onChange={this.handleTextChange}
                  />
                </InputContainer>
              </Row>
              <Row>
                <LabelContainer>
                  <InputLabel>Number of songs</InputLabel>
                </LabelContainer>
                <InputContainer>
                  <InputBox
                    type="number"
                    name="numSongs"
                    value={this.state.numSongs}
                    onChange={this.handleNumChange}
                  />
                </InputContainer>
              </Row>
              <Row>
                <CreateButton onClick={this.handleSubmit}>
                  Create Playlist
                </CreateButton>
              </Row>
            </form>
          </div>
        </PageContent>
      </Wrapper>
    );
  }
}

export default home;
