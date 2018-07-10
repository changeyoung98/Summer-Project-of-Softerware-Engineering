import React from 'react'
import {Tabs,Button,Input,Modal,Icon} from 'antd'

const TabPane = Tabs.TabPane;

function callback(key){
  console.log(key);
}

class Admin extends React.Component{
  constructor(props){
    super(props);
    this.state={
      id:null,
      bookid:null,
      orderid:null,
      visible:false,
      bookname:null,
      author:null,
      image:null,
      introduction:null,
      publish:null,
      price:null,
      sale:null,
    };
    this.handleID = this.handleID.bind(this);
    this.handleDeleteuser = this.handleDeleteuser.bind(this);
    this.handleDeletebook = this.handleDeletebook.bind(this);
    this.handleDeleteorder = this.handleDeleteorder.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel= this.handleCancel.bind(this);
    this.handle1 = this.handle1.bind(this);
    this.handle2 = this.handle2.bind(this);
    this.handle3 = this.handle3.bind(this);
    this.handle4 = this.handle4.bind(this);
    this.handle5 = this.handle5.bind(this);
    this.handle6 = this.handle6.bind(this);
    this.handle7 = this.handle7.bind(this);
  }
  handle1(e){
    this.setState({
      bookname:e.target.value,
    })
  }
  handle2(e){
    this.setState({
     author:e.target.value,
    })
  }
  handle3(e){
    this.setState({
      image:e.target.value,
    })
  }
  handle4(e){
    this.setState({
      introduction:e.target.value,
    })
  }
  handle5(e){
    this.setState({
      publish:e.target.value,
    })
  }
  handle6(e){
    this.setState({
      price:e.target.value,
    })
  }
  handle7(e){
    this.setState({
      sale:e.target.value,
    })
  }
  showModal(){
    this.setState({
      visible:true,
    })
  }
  handleOk(e){
    this.serverRequest = $.get("http://localhost:8080/webIoC/book/addBook",{
      'bookname':this.state.bookname,
      'author':this.state.author,
      'image':this.state.image,
      'introduction':this.state.introduction,
      'publish':this.state.publish,
      'price':parseInt(this.state.price),
      'sale':parseInt(this.state.sale),
    },function(data) {
    }.bind(this));
  }
  handleCancel(e){
    this.setState({
      visible:false,
    })
  }
  handleID(e){
    this.setState({
      id:e.target.value,
    })
  }
  handleBookId(e){
    this.setState({
      bookid:e.target.value,
    })
  }
  handleOrderId(e){
    this.setState({
      orderid:e.target.value,
    })
  }
  handleDeleteuser(){
    let id_input = parseInt(this.state.id);
    this.serverRequest = $.get("http://localhost:8080/webIoC/user/deleteUser",{'id':id_input},function(data) {

    });
  }
  handleDeletebook(){
    let id_input = parseInt(this.state.bookid);
    this.serverRequest = $.get("http://localhost:8080/webIoC/book/deleteBook",{'id':id_input},function(data) {

    });
  }
  handleDeleteorder(){
    let id_input = parseInt(this.state.orderid);
    this.serverRequest = $.get("http://localhost:8080/webIoC/order/deleteOrder",{'id':id_input},function(data) {

    });
  }
  render(){
    return(
      <div>
        <div>
          <h1>——管理员界面——</h1>
        </div>
      <Tabs onChange={callback} type="card">
        <TabPane tab="用户管理" key="1">
          <div className="input2">
            <Input size="large" placeholder="Enter the userID" value={this.state.id} onChange={this.handleID}
            />
          </div>
          <div className="input2">
            <Button type="primary" onClick={this.handleDeleteuser}>删除用户</Button>
          </div>
        </TabPane>
        <TabPane tab="书籍管理" key="2">
          <div className="input2">
            <Input size="large" placeholder="Enter the bookID" value={this.state.bookid} onChange={this.handleBookId}
          />
         </div>
         <div className="input2">
           <Button type="primary" onClick={this.handleDeletebook}>删除用户</Button>
         </div>
          <div className="input2">
            <Button type="primary" onClick={this.showModal}>增加书籍</Button>
            <Modal
              title="add book"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              >
              <div>
                <Input size="large" placeholder="Enter bookname"  value={this.state.bookname} onChange={this.handle1}
                       prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
              </div>
              <div>
                <Input size="large" placeholder="Enter author"  value={this.state.author} onChange={this.handle2}
                       prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
              </div>
              <div>
                <Input size="large" placeholder="Enter image"  value={this.state.image} onChange={this.handle3}
                       prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
              </div>
              <div>
                <Input size="large" placeholder="Enter introduction"  value={this.state.introduction} onChange={this.handle4}
                       prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
              </div>
              <div>
                <Input size="large" placeholder="Enter publish"  value={this.state.publish} onChange={this.handle5}
                       prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
              </div>
              <div>
                <Input size="large" placeholder="price"  value={this.state.price} onChange={this.handle6}
                       prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
              </div>
              <div>
                <Input size="large" placeholder="sale"  value={this.state.sale} onChange={this.handle7}
                       prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}/>
              </div>
            </Modal>
          </div>
        </TabPane>
        <TabPane tab="订单管理" key="3">
          <div className="input2">
            <Input size="large" placeholder="Enter the orderID" value={this.state.orderid} onChange={this.handleOrderId}
            />
          </div>
          <div className="input2">
            <Button type="primary" onClick={this.handleDeleteorder}>删除用户</Button>
          </div>
        </TabPane>
      </Tabs>
      </div>
    )
  }
}

export default Admin;

