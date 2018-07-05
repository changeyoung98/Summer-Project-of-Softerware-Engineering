import React from 'react'
import {Input,Modal,Icon,Button ,Row,Col} from 'antd'

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            username: null,
            password: null,
            cpassword:null,
            email:null,
            phone:null,
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handle1 = this.handle1.bind(this);
        this.handle2 = this.handle2.bind(this);
        this.handle3 = this.handle3.bind(this);
        this.handle4 = this.handle4.bind(this);
        this.handle5 = this.handle5.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    handle1(e) {
        this.setState({
            username: e.target.value,
        })
    }

    handle2(e) {
        this.setState({
            password: e.target.value,
        })
    }

    handle3(e) {
        this.setState({
            cpassword: e.target.value,
        })
    }

    handle4(e) {
        this.setState({
            email: e.target.value,
        })
    }

    handle5(e) {
        this.setState({
            phone: e.target.value,
        })
    }
    handleOk(e) {
        this.setState({
            visible: false,
        })
    }

    handleCancel(e) {
        this.setState({
            visible: false,
        })
    }

    showModal() {
        this.setState({
            visible: true,
        });
    };

    render() {
        return (
            <div>
                <div>
                    <Button type="primary" onClick={this.showModal}>Sign Up</Button>
                    <Modal
                        title="Please login in first"
                        visible={this.state.visible}
                        okText="Login"
                        cancelText="Cancel"
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <div className="input">
                            <Row>
                                <Col>
                                    <p>Username:</p>
                                </Col>
                                <Col>
                                    <Input size="large" value={this.state.username}
                                           onChange={this.handle1}
                                           prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                                </Col>
                            </Row>
                        </div>
                        <div className="input">
                            <Row>
                                <Col>
                                    <p>Password:</p>
                                </Col>
                                <Col>
                                    <Input size="large" value={this.state.password}
                                           onChange={this.handle2}
                                           prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                                </Col>
                            </Row>
                        </div>
                        <div className="input">
                            <Row>
                                <Col>
                                    <p>Confirm Password:</p>
                                </Col>
                                <Col>
                                    <Input size="large" value={this.state.cpassword}
                                           onChange={this.handle3}
                                           prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                                </Col>
                            </Row>
                        </div>
                        <div className="input">
                            <Row>
                                <Col>
                                    <p>E-email:</p>
                                </Col>
                                <Col>
                                    <Input size="large" value={this.state.email}
                                           onChange={this.handle4}
                                           prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                                </Col>
                            </Row>
                        </div>
                        <div className="input">
                            <Row>
                                <Col>
                                    <p>Phone:</p>
                                </Col>
                                <Col>
                                    <Input size="large" value={this.state.phone}
                                           onChange={this.handle5}
                                           prefix={<Icon type="mobile" style={{color: 'rgba(0,0,0,.25)'}}/>}/>
                                </Col>
                            </Row>
                        </div>
                    </Modal>
                </div>
            </div>
        )
    }
}

export default Register;

