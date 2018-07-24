import React from 'react'
import {Select,Button,Icon} from 'antd'

const Option = Select.Option;

class Selection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: -1,
      visible:false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.find_instance = this.find_instance.bind(this);
    this.handleModal = this.handleModal.bind(this);

  }

  handleChange(value) {
    console.log(`selected ${value}`);
  }

  find_instance() {
    /*$.ajax({
      type:"GET",
      url:"http://localhost:8081/videos/con_cut",
      dataType:"json",
      data:{
        camera:
          "1 rtmp://ns8.indexforce.com/home/mystream;2 rtmp://ns8.indexforce.com/home/mystream"
      },
      success:function(data){
        console.log("success");
      }.bind(this)
    });
    */
    this.setState({
      visible:true,
    });
    $.ajax({
      type: "GET",
      url: 'http://localhost:8081/find/instance',
      dataType: "text",
      success: function (data) {
        this.setState({
          result:data,
        });
        console.log("success");
        console.log(data);
      }.bind(this)
    });
  }

  handleModal(){
    this.setState({
      visible:false,
    })
  }


  render() {
    let tem_result = [];
    let tem = this.state.result;
    if (this.state.result === -1) {
      tem_result.push(
        <div>
          <p>Please wait for a while</p>
          <Icon type="loading"/>
        </div>)
    }
    else if (tem.indexOf("Found:")!==-1) {
      let path = this.state.result.split(":")[1];
      let filepath = "http://localhost:8081/recv/"+path;
      let camera = path.split("_")[1];
      tem_result.push(
        <div>
          <h3>Found In Camera {camera}</h3>
          <img src={filepath}/>
        </div>)
    }
    else if(tem ==="Not Found"){
      tem_result.push(
        <div>
          <h3>Sorry,Not Found</h3>
        </div>
      )
    }
    else{
      tem_result.push(
        <div>
          <h3>Something wrong happened!</h3>
        </div>
      )
    }
    return (
      <div>
        <Modal
          title="——RESULT——"
          visible={this.state.visible}
          onOk={this.handleModal}
          onCancel={this.handleModal}
        >
          <div>
            {tem_result}
          </div>
        </Modal>
        <div style={{float: 'left'}}>
          <h4>Sex</h4>
          <Select
            showSearch
            style={{width: 200}}
            placeholder="Select sex"
            optionFilterProp="children"
            onChange={this.handleChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="unknown">Unknown</Option>
          </Select>
          <h4>Age</h4>
          <Select
            showSearch
            style={{width: 200}}
            placeholder="Select age"
            optionFilterProp="children"
            onChange={this.handleChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="baby">Baby(0~1)</Option>
            <Option value="toddler">Toddler(1~3)</Option>
            <Option value="preschooler">Preschooler(3~6)</Option>
            <Option value="schoolchild">Schoolchild(6~13)</Option>
            <Option value="teenager">Teenager(13~19)</Option>
            <Option value="young adult">Young Adult(19~40)</Option>
            <Option value="middle age">Middle Age(40~60)</Option>
            <Option value="old">Old People(≥60)</Option>
          </Select>
          <h4>Height</h4>
          <Select
            showSearch
            style={{width: 200}}
            placeholder="Select height"
            optionFilterProp="children"
            onChange={this.handleChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="≤155">≤155</Option>
            <Option value="155~165">155~165</Option>
            <Option value="165~175">165~175</Option>
            <Option value="175~185">175~185</Option>
            <Option value="185~195">185~195</Option>
            <Option value="≥195">≥195</Option>
          </Select>
          <h4>Build</h4>
          <Select
            showSearch
            style={{width: 200}}
            placeholder="Select build"
            optionFilterProp="children"
            onChange={this.handleChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="thin">Thin</Option>
            <Option value="medium">Medium</Option>
            <Option value="fat">Fat</Option>
          </Select>
          <h4>Hairstyle</h4>
          <Select
            showSearch
            style={{width: 200}}
            placeholder="Select hairstyle"
            optionFilterProp="children"
            onChange={this.handleChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="bald">Bald</Option>
            <Option value="crew cut">Crew cut</Option>
            <Option value="short">short</Option>
            <Option value="shoulder-length">Shoulder-length</Option>
            <Option value="pony-tail">Pony-tail</Option>
          </Select>
          <h4>Colour of clothes</h4>
          <Select
            showSearch
            style={{width: 200}}
            placeholder="Select colour"
            optionFilterProp="children"
            onChange={this.handleChange}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="black">Black</Option>
            <Option value="white">White</Option>
            <Option value="grey">Grey</Option>
            <Option value="red">Red</Option>
            <Option value="blue">Blue</Option>
            <Option value="yellow">Yellow</Option>
            <Option value="green">Green</Option>
            <Option value="orange">Orange</Option>
            <Option value="purple">Purple</Option>
            <Option value="pink">Pink</Option>
          </Select>
        </div>
        <div style={{float: 'right'}}>
          <img style={{width: '50%'}} src="child.jpg" alt="cropped image"/>
        </div>
        <div>
          <Button onClick={this.find_instance}>Scan</Button>
        </div>
      </div>
    )
  }
}

export default Selection;
