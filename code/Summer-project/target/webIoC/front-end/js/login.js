import React from 'react'
import {Input,Modal,Icon,Alert} from 'antd'
import WrappedRegistrationForm from './register'

const onClose = function(e){
  console.log(e,'I was closed');
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      username: null,
      password: null,
      result: -1,
    };
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handle1 = this.handle1.bind(this);
    this.handle2 = this.handle2.bind(this);
    this.login = this.login.bind(this);
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

  login() {
    let tem=0;
    $.ajax({
      type: "GET",
      url: 'http://localhost:8081/user/checkUser',
      data: {
        username: this.state.username,
        password: this.state.password,
      },
      dataType: "json",
      success: function (data) {
        tem = JSON.parse(data);
        this.setState({
          result: JSON.parse(data),
        });
        if(tem===1){
          this.setState({
            visible:false,
          })
        }
      }.bind(this)
    });
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
            onOk={this.login}
            onCancel={this.handleCancel}
          >
            <div>{
            this.state.result===1 ||this.state.result===-1 ? null:
              <div align="center">
                <Alert
                  message="Wrong username or password !"
                  type="error"
                  closable
                  onClose={onClose}
                />
              </div>
          }
          </div>
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
            <div className="input">
              <p>No account ? <WrappedRegistrationForm/></p>
            </div>
            <p>{this.state.result}</p>
          </Modal>
        </div>
      </div>
    )
  }
}

export default Login;

