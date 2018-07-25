import React from 'react'
import {Button} from 'antd'

class Demo extends React.Component{
  constructor(props){
    super(props);
    this.state={
      src:this.props.src,
    };
  }


  componentDidMount(){
    jwplayer("container").setup({
      flashplayer:"http://localhost:8081/video/player.swf",
      file:"stream15308",
      streamer:this.state.src,
      width:328,
      height:200,
      controlbar:"over",
      screencolor:"#fff"
    })
  }

  render(){
    return(
      <div>
        <div id="container">
          <p>Loading.....</p>
        </div>
      </div>
    )
  }
}

export default Demo;
