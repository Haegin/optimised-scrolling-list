import React from 'react';
import ReactDOM from 'react-dom';
import Cache from './Cache';

const store = {
  offset: 0,
  size: 500,
  list: [],
};

class App extends React.Component {
  loadNames(from, to) {
    return fetch(`/names?from=${from}&to=${to}`).
      then(response => response.json()).
      then(list => _.reduce(list, (acc, item, idx) => {
        acc[idx + from] = item
        return acc
      }, {}))
  }

  render() {
    return <Cache size={500} loadData={this.loadNames} />
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('team')
)
