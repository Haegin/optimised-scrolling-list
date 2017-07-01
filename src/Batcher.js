import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Cache from './Cache';

class Batcher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTimer: undefined,
      from: undefined,
      cancelPreviousRequest: _.noop,
      to: undefined
    };
    this.batchLoadData = this.batchLoadData.bind(this);
  }

  batchLoadData(from, to) {
    if (this.state.currentTimer) {
      clearTimeout(this.state.currentTimer)
    }
    if (this.state.cancelPreviousRequest) {
      this.state.cancelPreviousRequest("Sending in a later batch")
      this.setState({cancelPreviousRequest: _.noop})
    }
    const min = Math.min(..._.compact([this.state.from, from]))
    const max = Math.max(..._.compact([this.state.to, to]))
    this.setState({from: min, to: max})
    return new Promise((resolve, reject) => {
      this.setState({
        currentTimer: setTimeout(resolve, this.props.delayAmount),
        cancelPreviousRequest: reject
      })
    }).then(() => {
      this.setState({currentTimer: undefined, from: undefined, to: undefined})
      return this.props.loadData(min, max)
    })
  }

  render() {
    return (<Cache size={this.props.size} loadData={this.batchLoadData} />);
  }
}

Batcher.defaultProps = {
  delayAmount: 200,
}

Batcher.propTypes = {
  ...Cache.propTypes,
  delayAmount: PropTypes.number,
}


export default Batcher;
