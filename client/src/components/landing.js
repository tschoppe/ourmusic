import React, { Component } from "react";
import ourmusic from "../apis/ourmusic";
import styled from "styled-components";
import { Grid, Header, GridColumn, Button } from "semantic-ui-react";

const onButtonClick = async () => {
  const response = await ourmusic.get("/login");
  window.location.replace(response.data);
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #2d132c;
`;

const Title = styled.div`
  font-size: 5em;
  font-weight: bold;
  padding-bottom: 10%;
  color: #ffffff;
`;

const StyledButton = styled(Button)`
  color: #ffffff !important;
  background-color: #801336 !important;
`;

const landing = () => {
  return (
    <Wrapper>
      <Grid centered columns={1} textAlign="center">
        <Grid.Row centered columns={1}>
          <Grid.Column textAlign="center">
            <Title>Your Music</Title>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={1}>
          <GridColumn textAlign="center">
            <StyledButton onClick={onButtonClick}>
              Login with Spotify
            </StyledButton>
          </GridColumn>
        </Grid.Row>
      </Grid>
    </Wrapper>
  );
};

export default landing;
