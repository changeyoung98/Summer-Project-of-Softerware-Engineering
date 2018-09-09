/**
 * Created by hp on 2018/4/2.
 */
import { Rate } from 'antd';
import React from 'react';

class Rater extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        value: 3,
    }
    }
    handleChange  (value) {
        this.setState({ value });
    }
    render() {
        const { value } = this.state;
        return (
            <span>
        <Rate onChange={()=>this.handleChange} value={value} />
                {value && <span className="ant-rate-text">{value} stars</span>}
      </span>
        );
    }
}
export default Rater;