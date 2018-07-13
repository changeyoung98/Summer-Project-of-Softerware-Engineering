import React from 'react'
import {Button} from 'antd'

class Video extends React.Component{
    constructor(props){
        super(props);
        this.state={
          camera:0,
          url:"rtmp://live.hkstv.hk.lxdns.com/live/hks",
          history:[],
        };
        this.getVideo = this.getVideo.bind(this);
        this.getVideoh=this.getVideoh.bind(this);
        this.get = this.get.bind(this);
    }

    getVideo(){
        this.setState({
          camera:1,
        })
    }
    getVideoh(){
      let tem = [];
      tem.push(
        <iframe
          src="/front-end/history.html"
          width="320px"
          height="240px"
          allowFullScreen="true"
        >good</iframe>
      );
      this.setState({
        history:tem,
      })
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
                <Button type="primary" >Cut</Button>
            </div>
            <div id="playerh">
              {this.state.history}
            </div>
        </div>


        )
    }
}

export default Video;
