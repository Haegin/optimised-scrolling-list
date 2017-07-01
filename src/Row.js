import React from 'react';
import Spinner from 'react-spinkit';
import './styles.css';

class Row extends React.Component {
  static height() {
    return 30;
  }

  render() {
    if (this.props.item) {
      return (
        <div style={{height: Row.height(), textAlign: "center"}}>
          {this.props.idx}: {this.props.item || "Loading"}
        </div>
      )
    } else {
      return <Spinner className='center' fadeIn='none' name='wave' />
    }
  }
}

export default Row;
