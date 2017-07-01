import React from 'react';

class Row extends React.Component {
  static height() {
    return 30;
  }

  render() {
    return (
      <div style={{height: Row.height(), textAlign: "center"}}>
        {this.props.idx}: {this.props.item}
      </div>
    )
  }
}

export default Row;
