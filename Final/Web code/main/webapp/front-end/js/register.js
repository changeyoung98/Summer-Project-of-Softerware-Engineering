import { Form, Input, Tooltip, Icon, Select, Checkbox, Button, AutoComplete,Modal,Alert } from 'antd';
import React from "react";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const onClose = function(e){
  console.log(e,'I was closed');
};

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      visible: false,
      username: null,
      password: null,
      cpassword: null,
      email: null,
      phone: null,
      result: -1,
      checkBox: false,           //the state of the checkbox
    };
    this.checkBox = this.checkBox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
    this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
    this.validateToNextPassword = this.validateToNextPassword.bind(this);
    this.handleWebsiteChange = this.handleWebsiteChange.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handle1 = this.handle1.bind(this);
    this.handle2 = this.handle2.bind(this);
    this.handle3 = this.handle3.bind(this);
    this.handle4 = this.handle4.bind(this);
    this.handle5 = this.handle5.bind(this);
    this.login = this.login.bind(this);
    this.validateUsername = this.validateUsername.bind(this);

  }

  checkBox() {
    if (this.state.checkBox === false) {
      this.setState({
        checkBox: true,
      })
    }
    else {
      this.setState({
        checkBox: false,
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  }

  compareToFirstPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  validateUsername(rule,value,callback){
    if(value.indexOf("--")!==-1||value.indexOf("'")!==-1||value.indexOf("\"")!==-1||
      value.indexOf("=")!==-1||value.indexOf("#")!==-1){
      callback("Can't contains -- ' \" = #");
    }
    else{
      callback();
    }
  }

  validateToNextPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    if(value.length<6){
      callback("Length must be larger than 5");
    }
    else {
      callback();
    }
  }

  handleWebsiteChange(value) {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({autoCompleteResult});
  }

  showModal() {
    this.setState({
      visible: true,
    });
  };

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

  login() {
    if (this.state.checkBox === false || this.state.password !== this.state.cpassword
    ||this.state.username.indexOf("--")!==-1||this.state.username.indexOf("'")!==-1||this.state.username.indexOf("\"")!==-1||
      this.state.username.indexOf("=")!==-1||this.state.username.indexOf("#")!==-1) {
      this.setState({
        result: 0,
      })
    }
    else {
      let tem = 0;
      $.ajax({
        type: "GET",
        url: 'http://localhost:8080/user/addUser',
        data: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          phone: this.state.phone,
        },
        dataType: "json",
        success: function (data) {
          tem = JSON.parse(data);
          this.setState({
            result: JSON.parse(data),
          });
          if (tem === 1) {
            this.setState({
              visible: false,
            })
          }
        }.bind(this)
      })
    }
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const {autoCompleteResult} = this.state;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{width: 70}}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    let tem_result=[];
    if(this.state.result===2) {
      tem_result.push(
        <div align="center">
          <Alert
            message="Error Message"
            description="Username and password already exist."
            type="error"
            closable
            onClose={onClose}
          />
        </div>
      )
    }
    else if(this.state.result===0){
      tem_result.push(
        <div align="center">
          <Alert
            message="Error Message"
            description="1.No aggrement
                  2.The two password is not same
                  3.Username not Validate"
            type="error"
            closable
            onClose={onClose}
          />
        </div>
      )
    }

    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Register</Button>
        <Modal
          title="Please register first"
          visible={this.state.visible}
          okText="Register"
          cancelText="Cancel"
          onOk={this.login}
          onCancel={this.handleCancel}
        >
          <div>
            {tem_result}
          </div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label="E-mail"
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Please input your E-mail!',
                }],
              })(
                <Input value={this.state.email}
                       onChange={this.handle4}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Password"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="password" value={this.state.password}
                       onChange={this.handle2}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="Confirm Password"
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur}
                       value={this.state.cpassword}
                       onChange={this.handle3}/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
              Nickname&nbsp;
                  <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o"/>
              </Tooltip>
            </span>
              )}
            >
              {getFieldDecorator('nickname', {
                rules: [{required: true, message: 'Please input your nickname!', whitespace: true},
                  {
                    validator:this.validateUsername,
                  }
                ],
              })(
                <Input value={this.state.username}
                       onChange={this.handle1}/>
              )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="Phone Number"
            >
              {getFieldDecorator('phone', {
                rules: [{required: true, message: 'Please input your phone number!'}],
              })(
                <Input addonBefore={prefixSelector} style={{width: '100%'}}
                       value={this.state.phone}
                       onChange={this.handle5}/>
              )}
            </FormItem>


            <FormItem {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
              })(
                <Checkbox onChange={this.checkBox}>I have read the <a href="">agreement</a></Checkbox>
              )}
            </FormItem>

          </Form>
        </Modal>
      </div>
    );
  }
}
const WrappedRegistrationForm = Form.create()(RegistrationForm)
export default WrappedRegistrationForm;

