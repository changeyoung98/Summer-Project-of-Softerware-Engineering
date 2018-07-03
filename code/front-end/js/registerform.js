import React from 'react'
import {Input,Modal,Icon} from 'antd'

class Registerform extends React.Component{
    constructor(props){
        super(props);
        this.state={
            visible:true,
            username:null,
            password:null,
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel= this.handleCancel.bind(this);
        this.handle1 = this.handle1.bind(this);
        this.handle2 = this.handle2.bind(this);
    }
    handle1(e){
        this.setState({
            username:e.target.value,
        })
    }
    handle2(e){
        this.setState({
            password:e.target.value,
        })
    }
    handleOk(e){
        this.setState({
            visible:false,
        })
    }
    handleCancel(e){
        this.setState({
            visible:false,
        })
    }
    render() {
        return (
            <div>
                <div>
                    <Modal
                        title="Please login in first"
                        visible={this.state.visible}
                        okText="Login"
                        cancelText="Cancel"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <div className="input">
                            <Input size="large" placeholder="Enter username" value={this.state.username}
                                   onChange={this.handle1}
                                   prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                        </div>
                        <div className="input">
                            <Input size="large" placeholder="Enter password" value={this.state.password}
                                   onChange={this.handle2}
                                   prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Registerform;

