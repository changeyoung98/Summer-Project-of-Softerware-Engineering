import React from 'react'
import {Button} from 'antd'
class Play extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      player:null,
    }
    this.time = this.time.bind(this);
  }

  componentDidMount() {
    var myPlayer = videojs('video1');
    videojs('video1').ready(function () {
      var myPlayer = this;
      myPlayer.play();
    });
    this.setState({
      player:myPlayer,
    })
  }

  time(){
    let whereYouAt = this.state.player.currentTime();
    console.log(whereYouAt);
  }

  render() {
    return (
      <div>
        <video id="video1" controls preload="auto" width="320" height="240" data-setup="{}">
          <source src="http://localhost:8081/video/guardians2.mp4" type="video/mp4"/>
        </video>
        <Button onClick={this.time}>click</Button>
      </div>
    )
  }
}

export default Play;
