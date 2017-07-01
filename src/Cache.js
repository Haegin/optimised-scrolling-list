import React from 'react';
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
          this.setState({
            cache: data.reduce((cache, data, idx) => {
              cache[idx + start] = data
              return cache
            }, this.state.cache)
          })
          return data;
        })
    } else {
      return Promise.resolve(_.values(_.pick(this.state.cache, _.range(start, end))))
    }
  }

  render() {
    return <List {...this.props} loadData={this.loadDataUsingCache} />
  }
}

export default Cache;
