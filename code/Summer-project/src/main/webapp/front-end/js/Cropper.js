import React from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import {Button,Input,Icon ,Modal} from 'antd'
/* global FileReader */

const src = "child.jpg";

export default class Crop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src,
      cropResult: null,
      result: -1,
      visible:false,
    };
    this.cropImage = this.cropImage.bind(this);
    this.onChange = this.onChange.bind(this);
    this.useDefaultImage = this.useDefaultImage.bind(this);
    this.upload = this.upload.bind(this);
    this.load = this.load.bind(this);
    this.handleModal = this.handleModal.bind(this);
  }

  handleModal(){
    this.setState({
      visible:false,
    })
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
    this.setState({
      visible:true,
    });
    $.ajax({
      type: "GET",
      url: 'http://localhost:8081/find/history',
      dataType: "text",
      success: function (data) {
        this.setState({
          result: data,
        });
        console.log("success");
        console.log(data);
      }.bind(this)
    });
  }

  useDefaultImage() {
    this.setState({src});
  }

  load() {
    document.getElementById('upfile').click();
  }

  render() {
    console.log(this.state.result);
    let tem_result = [];
    let tem = this.state.result;
    if (this.state.result === -1) {
      tem_result.push(
        <div>
          <p>Please wait for a while</p>
          <Icon type="loading"/>
        </div>)
    }
    else if (tem.indexOf("Found:")!==-1) {
      setTimeout(2000);
      tem_result.push(
        <div>
          <h3>{this.state.result}</h3>
          <img src="http://localhost:8081/recv/recv.jpg"/>
        </div>)
    }
    else if(tem === "Not Found"){
      tem_result.push(
        <div>
          <h3>Sorry,Not Found</h3>
        </div>
      )
    }
    else{
      tem_result.push(
        <div>
          <h3>Something wrong happened!</h3>
        </div>
      )
    }
    return (
      <div>
        <Modal
          title="——RESULT——"
          visible={this.state.visible}
          onOk={this.handleModal}
          onCancel={this.handleModal}
        >
          <div>
            {tem_result}
          </div>
        </Modal>
        <div style={{width: '100%'}}>
          <div className="fileInput left">
            <input type="file" name="upfile" id="upfile" className="upfile" onChange={this.onChange}/>
            <Button onClick={this.load}><Icon type="folder-open"/>Select File</Button>
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
              <div>
                <span>Crop</span>
                <Button onClick={this.cropImage} style={{float: 'right'}}>
                  Crop Image
                </Button>
                <Button onClick={this.upload} style={{float: 'right'}}><Icon type="upload"/>Upload</Button>
              </div>
            </h1>
            <img style={{height: 500}} src={this.state.cropResult} alt="cropped image"/>
          </div>
        </div>
        <br style={{clear: 'both'}}/>
      </div>
    );
  }
}/**
 * Created by hp on 2018/7/11.
 */
