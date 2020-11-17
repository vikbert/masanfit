import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { secondsToTime } from '../../utils/TimeHelper';
import './TimeDisplay.scss';

let intervals = [];

const clearAllIntervals = () => {
  intervals.forEach(window.clearInterval);
  intervals = [];
};

class TimerDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = { seconds: 0 };
  }

  reset = () => {
    clearAllIntervals();
    this.setState({ seconds: 0 });
    window.alert
      .play()
      .then(() => {
        console.log('alert played');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  countDown(counterInSeconds) {
    if (counterInSeconds === 0) {
      return;
    }

    clearAllIntervals();

    this.setState({ seconds: counterInSeconds });
    const intervalId = setInterval(() => {
      counterInSeconds--;
      this.setState({ seconds: counterInSeconds });
      if (counterInSeconds === 0) {
        this.reset();
        this.props.resetOption();
      }
    }, 1000);
    intervals.push(intervalId);
  }

  componentDidMount() {
    this.props.onRef(this);
  }

  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  componentDidUpdate({ counterInSeconds }, prevState, snapshot) {
    if (
      this.props.counterInSeconds &&
      counterInSeconds !== this.props.counterInSeconds
    ) {
      this.countDown(this.props.counterInSeconds);
    }
  }

  render() {
    return (
      <div className="timer-window">
        <div className="time-display timer-display">
          {secondsToTime(this.state.seconds)}
        </div>
      </div>
    );
  }
}

TimerDisplay.propTypes = {
  counterInSeconds: PropTypes.number.isRequired,
  onRef: PropTypes.func,
  resetOption: PropTypes.func,
};

TimerDisplay.defaultProps = {
  onRef: () => {},
  resetOption: () => {},
};

export default TimerDisplay;
