import React from 'react';
import _ from 'lodash';
import Row from './Row';

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      data: {}
    };
    this.doLoadData();
  }

  componentDidMount() {
    window.addEventListener('scroll', () => {
      const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.setState({ offset }, this.doLoadData);
    });
  }

  doLoadData() {
    this.props.loadData(this.numberOfPastRows() + 1, this.numberOfPastRows() + this.numberOfRows() + 1).
      then((data) => {
        this.setState({
          data: _.reduce(data, (acc, item, idx) => {
            acc[idx + this.numberOfPastRows() + 1] = item
            return acc
          }, {})
        })
      }
    )
  }

  numberOfRows() {
    return Math.ceil(window.innerHeight / Row.height());
  }

  numberOfPastRows() {
    return Math.floor(this.state.offset / Row.height());
  }

  numberOfFutureRows() {
    return Math.max(0, this.props.size - this.numberOfPastRows() - this.numberOfRows());
  }

  render() {
    const rows = _.range(this.numberOfRows()).map((idx) => {
      const numb = idx + this.numberOfPastRows() + 1;
      return <Row key={numb} idx={numb} item={this.state.data[numb]} />
    })

    return (
      <div>
        <div style={{ height: `${this.numberOfPastRows() * Row.height()}px` }} />
        <div>{rows}</div>
        <div style={{ height: `${this.numberOfFutureRows() * Row.height()}px` }} />
      </div>
    );
  }
}

export default List;
