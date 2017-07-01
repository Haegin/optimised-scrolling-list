import React from 'react';
import ReactDOM from 'react-dom';
import List from './List';

const store = {
  offset: 0,
  size: 500,
  list: [],
};

class App extends React.Component {
  constructor(props) {
    super(props)
    this.loadNames.bind(this)
  }

  loadNames(from, to) {
    return fetch(`/names?from=${from}&to=${to}`).
      then((response) => (response.json()))
  }

  render() {
    return <List size={500} loadData={this.loadNames} />
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('team')
)
