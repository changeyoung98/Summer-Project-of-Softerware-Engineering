import React from 'react'
import {Button} from 'antd'

class Video extends React.Component{
    constructor(props){
        super(props);
        this.getVideo = this.getVideo.bind(this);
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

    render(){
        return(
            <div id="player">
                <Button type="primary" onClick={this.getVideo}>Click</Button>

            </div>



        )
    }
}

export default Video;