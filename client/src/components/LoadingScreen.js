import React, { Component } from 'react';
import xo from '../../public/xo.png';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const Xo = styled.img`
  height: 30%;
  margin-right: 50%;
  transform-origin: 76.1862917% center; 
`;

class LoadingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { rotation: 0 };
  }

  startRotation() {
    const id = setInterval(() => {
        // Rotate image every 100
        this.setState((prevState, props) => ({
          intervalId: prevState.intervalId,
          rotation: (90 * Math.ceil(4 * Math.random()))
        }));

    }, 100);  

    // Save interval ID
    this.setState((prevState, props) => ({
      intervalId: id,
      rotation: 0
    }));
  }

  stopRotation() {
    clearInterval(this.state.intervalId);
    this.setState(() => ({
      rotation: 0
    }));
  }

  componentWillMount() {
    if (this.props.rotating) {
      this.startRotation();
    }
  }

  componentWillUnmount() {
    this.stopRotation();
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.props.rotating && !nextProps.rotating) {
      this.stopRotation();
    } else if (!this.props.rotating && nextProps.rotating) {
      this.startRotation();
    }
  }

  render() {
    return (
      <Wrapper>
        <Xo style={{ transform: `rotate(${this.state.rotation}deg)` }} alt="loading" src={xo} />
      </Wrapper>
    );
  }
}

export default LoadingScreen;