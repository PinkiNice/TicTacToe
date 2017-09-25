import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { appClearError } from '../actions/appActions';
import styled from 'styled-components'; 
import x from '../../public/x.png';

const Img = styled.img`
  width: 20%;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;

  margin: auto;
  margin-top: 5em;

  width: 100%;

  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: blue;
`;

class ErrorPage extends Component {

  render() {
    return (
      <Div>
        <Img src={x} alt="Error"/>
        { this.props.children }
        <StyledLink onClick={() => { this.props.dispatch(appClearError()) }} to='/'>Start Over Again</StyledLink>
      </Div>
    );
  }
}

export default connect()(ErrorPage);