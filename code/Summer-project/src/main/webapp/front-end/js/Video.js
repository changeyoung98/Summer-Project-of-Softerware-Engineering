import React from 'react'
import {Button} from 'antd'
import Demo from './demo'

class Video extends React.Component{
    constructor(props){
        super(props);
        this.state={
          camera:0,
          url:"rtmp://live.hkstv.hk.lxdns.com/live/hks",
          history:[],
          currentTime:null,
          historyUrl:null,
        };
        this.getVideo = this.getVideo.bind(this);
        this.getVideoh=this.getVideoh.bind(this);
        this.get = this.get.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.gets = this.gets.bind(this);
        this.handleUrl = this.handleUrl.bind(this);
    }

    handleUrl(url){
      this.setState({
        historyUrl:url,
      })
    }

    handleTime(time){
      this.setState({
        currentTime:time,
      })
    }

    getVideo(){
        this.setState({
          camera:1,
        })
    }
    getVideoh(){
      let tem = [];
      tem.push(
        <Demo handleTime={this.handleTime} handleUrl={this.handleUrl}/>
      );
      this.setState({
        history:tem,
      })
    }

    gets(){
      let time = this.state.currentTime;
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
      });
    }

  get(){
    let tem = 0;
    $.ajax({
      type: "GET",
      url: 'http://localhost:8081/video/Icut',
      data: {
        url:this.state.url,
      },
      dataType: "json",
      success: function (data) {
        tem = JSON.parse(data);
        console.log("success");
      }.bind(this)
    });
  }

  render(){
        return(
        <div>
            <img src="./floor1.jpg"  height="300" width="500" align="center" useMap="#mymap"/>
                <map name="mymap">
                    <area shape = "rect" coords="0,0,100,100" alt="camera1" onClick={this.getVideo} />

                </map>

            <div id="player">
              <div><Button type="primary" onClick={this.get}>Start</Button></div>
              <div>
                {
                  this.state.camera===0?null:
                    <iframe
                      src="/front-end/demo.html"
                      width="320px"
                      height="240px"
                      allowFullScreen="true"
                    >nice</iframe>
                }
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
