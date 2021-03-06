import React from 'react'
import {Button} from 'antd'

class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      currentTime:0,
    }
  }

  componentDidMount() {
    var myPlayer = videojs('videos');
    videojs('videos').ready(function () {
      var myPlayer = this;
      myPlayer.play();
    });
  }

  render() {
    const {url} = this.props;
    return (
      <div className="m">
        <video id="videos" className="video-js" controls preload="auto" width="320" height="240" data-setup="{}">
          <source src={url} type="rtmp/flv"/>
        </video>
      </div>
    )
  }
}

export default Play;
