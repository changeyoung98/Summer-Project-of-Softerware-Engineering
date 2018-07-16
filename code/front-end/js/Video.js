import React from 'react'
import {Button} from 'antd'
import Upload from './Upload'

class Video extends React.Component{
    constructor(props){
        super(props);
        this.getVideo = this.getVideo.bind(this);
        this.getVideoh=this.getVideoh.bind(this);
    }

    getVideo(){
        jwplayer("player").setup({
            flashplayer:'player.swf',
            image:"preview.jpg",
             file:"stream15308",
            streamer:"rtmp://localhost/oflaDemo"
        });
        console.log("haha");
    }
    getVideoh(){
        jwplayer("playerh").setup({
            flashplayer:'player.swf',
            image:"preview.jpg",
            file:"./BladeRunner2049.flv",
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

            </div>
            <div style={{margin:10}}><Button >Start</Button></div>
            <div >
                <div style={{margin:10}}>
                    <h3> History Video</h3>
                </div>
                <Button  onClick={this.getVideoh}>Click</Button>
                <Button >Cut</Button>
            </div>

            <div id="playerh">

            </div>
        </div>


        )
    }
}

export default Video;