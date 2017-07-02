import React from 'react';
import PropTypes from 'prop-types';
import List from './List';

class Cache extends React.Component {
  constructor(props) {
    super(props);
    this.loadDataUsingCache = this.loadDataUsingCache.bind(this);
    this.state = {
      cache: {},
      generations: {oldest: 0, current: 0}
    }
  }

  addDataToCache(data) {
    const requiredSlots = Math.min(_.size(data), this.props.cacheSize);
    let newCache = {...this.state.cache};
    let newOldestGeneration = this.state.generations.oldest;
    while (this.props.cacheSize - _.size(newCache) < requiredSlots) {
      newCache = _.pickBy(newCache, item => item.generation > newOldestGeneration);
      newOldestGeneration++;
    }
    newCache = {
      ...newCache,
      ..._.reduce(data, (acc, value, idx) => {
        acc[idx] = {generation: this.state.generations.current, value: value}
        return acc;
      }, {})
    }
    this.setState({
      generations: {
        oldest: newOldestGeneration,
        current: this.state.generations.current + 1
      },
      cache: newCache
    })
  }

  loadDataUsingCache(start, end) {
    let dataMissing = _.range(start, end).some(numb => !(this.state.cache[numb]))
    if (dataMissing) {
      return this.props.loadData(start, end).
        then((data) => {
          this.addDataToCache(data)
          return data;
        })
    } else {
      return Promise.resolve(
        _.mapValues(
          _.pick(this.state.cache, _.range(start, end)),
          'value'
        )
      )
    }
  }

  render() {
    return <List {...this.props} loadData={this.loadDataUsingCache} />
  }
}

Cache.defaultProps = {
  cacheSize: 1000,
}

Cache.propTypes = {
  ...List.propTypes,
  cacheSize: PropTypes.number
}

export default Cache;
