import React from 'react';
import { Layout, Menu, Icon ,Tabs, Button ,Modal,Input,Breadcrumb} from 'antd';
//import logo from './logo.svg';
import { Link} from 'react-router';
import Rater from './rate';
import Login from './login'
import Upload from './Upload'
import Crop from './Cropper'
import WrappedRegistrationForm from './register'
import Video from './Video'
import Selection from './Select'
const TabPane = Tabs.TabPane;
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;
;



class First extends React.Component {
    constructor(props){
        super(props);
        this.state={
            visible:false,
            username:null,
            password:null,
        };
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel= this.handleCancel.bind(this);
        this.handle1 = this.handle1.bind(this);
        this.handle2 = this.handle2.bind(this);
        this.showModal = this.showModal.bind(this);
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
    showModal(){
        this.setState({
            visible: true,
        });
    };

    render() {
        return (
            <Layout>
                <Header className="header">
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['3']}
                        style={{lineHeight: '64px'}}
                    >
                        <Menu.Item key="1" style={{float: 'right'}}><Login/></Menu.Item>
                        <Menu.Item key="2" style={{float: 'right'}}>
                            <div>
                                <Button type="primary" onClick={this.showModal}>Login</Button>
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
                                    <div className="input">
                                        <p>No account ?      <WrappedRegistrationForm /></p>
                                    </div>
                                </Modal>
                            </div>
                        </Menu.Item>
                        <Menu.Item key="3">Home</Menu.Item>
                    </Menu>

                </Header>
                <Layout>
                    <Sider width={200} style={{background: '#fff'}}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{height: '100%', borderRight: 0}}
                        >
                            <SubMenu key="sub1" title={<span><Icon type="user"/>subnav 1</span>}>
                                <Menu.Item key="1"><Link to="/login">option1</Link></Menu.Item>
                                <Menu.Item key="2">option2</Menu.Item>
                                <Menu.Item key="3">option3</Menu.Item>
                                <Menu.Item key="4">option4</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="laptop"/>subnav 2</span>}>
                                <Menu.Item key="5">option5</Menu.Item>
                                <Menu.Item key="6">option6</Menu.Item>
                                <Menu.Item key="7">option7</Menu.Item>
                                <Menu.Item key="8">option8</Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub3" title={<span><Icon type="notification"/>subnav 3</span>}>
                                <Menu.Item key="9">option9</Menu.Item>
                                <Menu.Item key="10">option10</Menu.Item>
                                <Menu.Item key="11">option11</Menu.Item>
                                <Menu.Item key="12">option12</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Breadcrumb style={{margin: '16px 0'}}>
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                            <Breadcrumb.Item>List</Breadcrumb.Item>
                            <Breadcrumb.Item>
                                App</Breadcrumb.Item>
                        </Breadcrumb>

                        <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab={<span><Icon type="apple"/>Home</span>} key="1">
                                    <Video />

                                </TabPane>
                                <TabPane tab={<span><Icon type="android"/>Page 2</span>} key="2">
                                    <Selection />
                                </TabPane>
                                <TabPane tab={<span><Icon type="android"/>Page 3</span>} key="3">
                                    <Rater/>
                                    <Crop/>
                                </TabPane>
                            </Tabs>

                        </Content>
                    </Layout>
                </Layout>

            </Layout>
        )
    }
}
export default First;

/*        <App />*/