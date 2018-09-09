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
      flashplayer:"http://localhost:8080/video/player.swf",
      file:"stream15308",
      streamer:this.state.src,
      width:328,
      height:200,
      controlbar:"over",
      screencolor:"#fff"
    })

    /*
    let url = this.state.src +"stream15308";

    var videoObject= {
      container: 'video',
      variable: "player",
      autoplay:true,
      live:true,
      video:"rtmp://live.hkstv.hk.lxdns.com/live/hks"
    };
    var player = new ckplayer(videoObject);
    */
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
