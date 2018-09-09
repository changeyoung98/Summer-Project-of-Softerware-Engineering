import React from 'react'
import {Input,Modal,Icon,Alert} from 'antd'
import {Link} from "react-router";

class Quit extends React.Component {
  render() {
    return (
      <div>
        <h3>
          Quit current login,
          <Link to="/">Click it to login again</Link>
        </h3>
      </div>
    )
  }
}

export default Quit;

