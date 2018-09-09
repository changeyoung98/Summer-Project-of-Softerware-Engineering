import React from 'react';
import { Layout, Menu, Icon ,Tabs,Button,Modal,Input,Breadcrumb} from 'antd';
//import logo from './logo.svg';
import { Link,hashHistory} from 'react-router';
import Login from './login'
import Video from './Video'
import Video1 from './Video1'
import Cropper from './Cropper'
import Select from './Select'

const TabPane = Tabs.TabPane;
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

const onClose = function(e){
  console.log(e,'I was closed');
};

class First extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      username: null,
      password: null,
      result: -1,
      time:null,
      floor:1,
    };
    this.handle1 = this.handle1.bind(this);
    this.handle2 = this.handle2.bind(this);
    this.quit = this.quit.bind(this);
    this.handleTime = this.handleTime.bind(this);
    this.floor1 = this.floor1.bind(this);
    this.floor2 = this.floor2.bind(this);
  }

  handleTime(time){
    this.setState({
      time:time,
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

  quit() {
   $.ajax({
     type:"GET",
     url:'http://localhost:8080/user/quitUser',
     dataType:"json",
     success:function (data) {
       let tem = JSON.parse(data);
       if(tem===1){
         hashHistory.push({
           pathname:'/quit'
           }
         )
       }
     }
   })
  };

  floor1(){
    this.setState({
      floor:1,
    })
  }

  floor2(){
    this.setState({
      floor:2,
    })
  }

  render() {
    let tem=[];
    if(this.state.floor===1){
      tem.push(
        <Video
          handleTime={this.handleTime}/>
      )
    }
    else if(this.state.floor===2){
      tem.push(
        <Video1
          handleTime={this.handleTime}/>
      )
    }
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
                <Button type="primary" onClick={this.quit}>Login in again</Button>
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
              <SubMenu key="sub1" title={<h2><Icon type="environment" theme="outlined" />FLOORS</h2>}>
                <Menu.Item key="1"><Button onClick={this.floor1}>Floor 1</Button></Menu.Item>
                <Menu.Item key="2"><Button onClick={this.floor2}>Floor 2</Button></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{padding: '0 24px 24px'}}>
            <Breadcrumb style={{margin: '16px 0'}}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>
                App</Breadcrumb.Item>
            </Breadcrumb>

            <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
              <Tabs defaultActiveKey="1">
                <TabPane tab={<span><Icon type="apple"/>Video</span>} key="1">
                  {tem}
                </TabPane>
                <TabPane tab={<span><Icon type="android"/>Find History</span>} key="2">
                  <Cropper time={this.state.time}/>
                </TabPane>
                <TabPane tab={<span><Icon type="android"/>Scan</span>} key="3">
                  <Select/>
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
