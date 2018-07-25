import React from 'react'
import {Button} from 'antd'

class Play extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    var myPlayer = videojs("myVideo");
    videojs("myVideo").ready(function (){
      var myPlayer = this;
      myPlayer.play();
    })
  }

  render() {
    const {url} = this.props;
    return (
      <div className="m">
        <video id="myVideo" className="video-js" controls preload="auto" width="320" height="240" data-setup="{}">
          <source src={url} type="rtmp/flv"/>
        </video>
      </div>
    )
  }
}

export default Play;
