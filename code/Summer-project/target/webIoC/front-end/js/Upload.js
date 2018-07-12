import React from 'react'
import Dropzone from 'react-dropzone'
import Cropper from 'react-cropper'
import {Button} from 'antd'

class Uploadform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadFiles: '',
            url: '',
        };
        this.onImageDrop = this.onImageDrop.bind(this);
    }

    onImageDrop(files) {
        this.setState({
            uploadFiles: files[0],
        });
        this.state.url = window.URL.createObjectURL(files[0]);
    }

    render() {
        return (
            <div>
                <Dropzone
                    multiple={false}
                    accept="image/*"
                    onDrop={this.onImageDrop}
                >
                    <p>Drop an image or click to select a file to upload.</p>
                </Dropzone>
                <div>{
                    this.state.uploadFiles===''?null:
                        <div>
                            <p>{this.state.uploadFiles.name}</p>
                            <img src={this.state.url} style={{maxHeight:300,}}/>
                        </div>
                }
                </div>
            </div>
        )
    }
}
export default Uploadform;