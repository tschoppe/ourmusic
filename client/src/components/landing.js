import React from "react";
import ourmusic from "../apis/ourmusic";
import { Grid, GridColumn } from "semantic-ui-react";
import { Title, Wrapper, StyledButton } from "../components/styled/styled";

const onButtonClick = async () => {
  const response = await ourmusic.get("login");
  window.location.replace(response.data);
};

const landing = () => {
  return (
    <Wrapper>
      <Grid centered columns={1} textAlign="center">
        <Grid.Row centered columns={1}>
          <Grid.Column textAlign="center">
            <Title fontSize="5em" bottomPadding="25%">
              Your Music
            </Title>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered columns={1}>
          <GridColumn textAlign="center">
            <StyledButton size="big" onClick={onButtonClick}>
              Login with Spotify
            </StyledButton>
          </GridColumn>
        </Grid.Row>
      </Grid>
    </Wrapper>
  );
};

export default landing;
