import React from 'react';
import PropTypes from 'prop-types';
import List from './List';

class Cache extends React.Component {
  constructor(props) {
    super(props);
    this.loadDataUsingCache = this.loadDataUsingCache.bind(this);
    this.state = {
      cache: {}
    }
  }

  loadDataUsingCache(start, end) {
    let dataMissing = _.range(start, end).some(numb => !(this.state.cache[numb]))
    if (dataMissing) {
      return this.props.loadData(start, end).
        then((data) => {
          this.setState({cache: {...this.state.cache, ...data}})
          return data;
        })
    } else {
      return Promise.resolve(_.pick(this.state.cache, _.range(start, end)))
    }
  }

  render() {
    return <List {...this.props} loadData={this.loadDataUsingCache} />
  }
}

Cache.propTypes = {
  ...List.propTypes,
}

export default Cache;
