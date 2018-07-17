import React from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {Button,Input,Icon} from 'antd'
/* global FileReader */

const src = 'child.jpg';
export default class Crop extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      src,
      cropResult: null,
      result: -1,
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.useDefaultImage = this.useDefaultImage.bind(this);
    this.upload = this.upload.bind(this);
  }

  onChange(e) {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({src: reader.result});
    };
    reader.readAsDataURL(files[0]);
  }

  cropImage() {
    if (typeof this.cropper.getCroppedCanvas() === 'undefined') {
      return;
    }
    this.setState({
      cropResult: this.cropper.getCroppedCanvas().toDataURL(),
    }, () => {
      if (this.state.cropResult !== null) {
        $.ajax({
          type: "GET",
          url: 'http://localhost:8081/image/download',
          data: {
            url: this.state.cropResult,
          },
          dataType: "json",
          success: function (data) {
            console.log("success");
          }.bind(this)
        });
      }
      console.log("nice")
    });
    console.log(this.state.cropResult);
  }

  upload() {
    $.ajax({
      type: "GET",
      url: 'http://localhost:8081/find/user',
      dataType: "json",
      success: function (data) {
        this.setState({
          result: JSON.parse(data),
        });
        console.log("success");
      }.bind(this)
    });
  }

  useDefaultImage() {
    this.setState({src});
  }

  render() {
    let tem_result = [];
    if (this.state.result === -1) {
      tem_result.push(
        <div>
          <p>Please wait for a while</p>
          <Icon type="loading"/>
        </div>)
    }
    else if (this.state.result === 1) {
      tem_result.push(
        <div>
          <img src="http://localhost:8081/recv/recv.jpg"/>
        </div>)
    }
    else {
      tem_result.push(
        <div>
          <p>Failed</p>
        </div>
      )
    }
    return (
      <div>
        <div style={{width: '100%'}}>
          <div>
            <Input type="file" onChange={this.onChange}>
              Select File
            </Input>
          </div>
          <div>
            <Button onClick={this.useDefaultImage}>Use default img</Button>
          </div>
          <br/>
          <br/>
          <Cropper
            style={{height: 400, width: '100%'}}
            preview=".img-preview"
            guides={false}
            src={this.state.src}
            ref={cropper => {
              this.cropper = cropper;
            }}
          />
        </div>
        <div>
          <div className="box" style={{width: '50%', float: 'right'}}>
            <h1>
                            <span>
                            Preview
                            </span>
            </h1>
            <div className="img-preview" style={{width: '100%', float: 'left', height: 500}}/>
          </div>
          <div className="box" style={{width: '50%', float: 'right'}}>
            <h1>
              <span>Crop</span>
              <div>
                <Button onClick={this.cropImage} style={{float: 'right'}}>
                  Crop Image
                </Button>
                <Button style={{float: 'right'}}><Icon type="upload" onClick={this.upload}/>Upload</Button>
              </div>
            </h1>
            <img style={{width: '50%'}} src={this.state.cropResult} alt="cropped image"/>
          </div>
        </div>
        <br style={{clear: 'both'}}/>
        <div>
          {tem_result}
        </div>
      </div>
    );
  }
}/**
 * Created by hp on 2018/7/11.
 */
