import styled from "styled-components";
import { Button } from "semantic-ui-react";

export const StyledButton = styled(Button)`
  color: #ffffff !important;
  background-color: #801336 !important;
  cursor: pointer;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #2d132c;
`;

export const Title = styled.div`
  font-size: ${props => props.fontSize};
  font-weight: bold;
  padding-bottom: ${props => props.bottomPadding};
  padding-top: 10%;
  color: #ffffff;
`;
