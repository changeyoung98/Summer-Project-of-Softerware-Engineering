import React from 'react'
import {Button,message} from 'antd'
import Play from './Play'

const warning =()=> {
  message.warning('Waiting for selecting a camera');
};

const warning1 = () =>{
  message.warning('Please wait for a while')
};
const success = ()=>{
  message.success("Cut the picture and save it !")
};

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now_camera: null,
      url: null,
      history: [],
      instance:[],
      currentTime: null,
      state: 0,
      camera:
        [
          {
            instance: "rtmp://pull-g.kktv8.com/livekktv/100987038 ",
            history: "http://221.228.226.23/11/t/j/v/b/tjvbwspwhqdmgouolposcsfafpedmb/sh.yinyuetai.com/691201536EE4912BF7E4F1E2C67B8119.mp4"
          },
          {
            instance: "rtmp://192.168.1.127:1935/oflaDemo/stream15308",
            history: "http://localhost:8081/video/test.mp4"
          }]
    };
    this.getVideo = this.getVideo.bind(this);
    this.getVideoh = this.getVideoh.bind(this);
    this.get = this.get.bind(this);
    this.gets = this.gets.bind(this);
  }

  getVideo(index) {
    let tem=[];
    let url = this.state.camera[index];
    tem.push(
      <Play url={url.instance}/>
    );
    this.setState({
      state: 1,
      url: this.state.camera[index],
      now_camera: index,
      history:[],
      instance:tem,
    });
  }

  getVideoh() {
 //   console.log(this.state.url.history);
    let tem = [];
    if (this.state.state === 1) {
      tem.push(
        <video id="video1" className="video-js" controls preload="auto" width="320" height="240" data-setup="{}">
          <source src={this.state.url.history} type="video/mp4"/>
        </video>
      );
    }
    else {
      warning();
    }
    this.setState({
      history: tem,
    })
  }

  gets() {
    if (this.state.state === 1 && this.state.history !== []) {
      warning1();
      var myPlayer = document.getElementById('video1');
      let time = myPlayer.currentTime;
      this.setState({
        currentTime: time,
      }, () => {
        $.ajax({
          type: "GET",
          url: 'http://localhost:8081/videos/cut',
          data: {
            url: this.state.url.history,
            time: this.state.currentTime,
          },
          dataType: "json",
          success: function (data) {
            console.log(this.state.currentTime);
            console.log("success");
            if (JSON.parse(data) === 1) {
              success();
            }
          }.bind(this)
        });
      });
      this.props.handleTime(this.state.currentTime);
    }
    else {
      warning();
    }
    /*let time = this.state.currentTime;
    let result = time.split(":");
    result = result.reverse();
    let sec = 0;
    for (let i = 0;i<result.length;i++){
      sec += parseInt(result[i])*(60**i);
    }
    let secs = sec.toString();
    $.ajax({
      type: "GET",
      url: 'http://localhost:8081/video/cut',
      data: {
        url:this.state.historyUrl,
        time:secs,
      },
      dataType: "json",
      success: function (data) {
        console.log(secs);
        console.log("success");
      }.bind(this)
    });*/
  }

  get() {
    if (this.state.state === 1) {
      let tem = 0;
      $.ajax({
        type: "GET",
        url: 'http://localhost:8081/videos/Icut',
        data: {
          url: this.state.url.instance,
        },
        dataType: "json",
        success: function (data) {
          tem = JSON.parse(data);
     //     console.log("success");
        }.bind(this)
      });
    }
    else {
      warning();
    }
  }

  render() {
    return (
      <div>
        <img src="./floor1.jpg" height="300" width="500" align="center" useMap="#mymap"/>
        <map name="mymap">
          <area shape="rect" coords="0,0,100,100" alt="camera1" onClick={() => {
            this.getVideo(1)
          }}/>
          <area shape="rect" coords="240,0,320,100" alt="camera2" onClick={() => {
            this.getVideo(0)
          }}/>

        </map>

        <div id="player">
          <div>
            <h3>Camera {this.state.now_camera}</h3>
          </div>
          <div><Button type="primary" onClick={this.get}>Start</Button></div>
          <div>
            {this.state.instance}
          </div>
        </div>
        <div>
          <div>
            History Video
          </div>
          <Button type="primary" onClick={this.getVideoh}>Click</Button>
          <Button type="primary" onClick={this.gets}>Cut</Button>
          <p>{this.state.currentTime}</p>
        </div>
        <div id="playerh">
          {this.state.history}
        </div>
      </div>


    )
  }
}

export default Video;
