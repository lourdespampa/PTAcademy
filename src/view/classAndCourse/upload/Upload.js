import React, { Component } from "react";
import Dropzone from "./Dropzone";
import Progress from "./Progress";
import "./Upload.sass";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      errorUploaded:false
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }

  onFilesAdded(files) {
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
  }

  async uploadFiles() {
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: false });
    } catch (e) {
      this.setState({ successfullUploaded: true, uploading: false });
    }
  }

  sendRequest(file) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      req.upload.addEventListener("progress", event => {
        if (event.lengthComputable) {
          const copy = { ...this.state.uploadProgress };
          copy[file.name] = {
            state: "pending",
            percentage: (event.loaded / event.total) * 100
          };
          this.setState({ uploadProgress: copy });
        }
      });

      req.upload.addEventListener("load", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "done", percentage: 100 };
        this.setState({ uploadProgress: copy });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("class_name",this.props.class_name)
      formData.append("desc",this.props.desc)
      console.log(file)

      var varToken = localStorage.getItem('token');
        
      req.open("POST", `http://192.168.1.29:4200/v1/api/teacher/${this.props.idteacher}/course/${this.props.idcourse}/class`);
      req.setRequestHeader('x-access-token', `${varToken}`)
      req.send(formData);
      console.log('asdmasd')
      req.onload=()=>{
        if(req.readyState===req.DONE){
          if(req.status===200){
            console.log(req.response)
            console.log('bien')
            this.props.handleClose()
          }
          else if(req.status===500){
            console.log(req.response)
            console.log('mal')
            this.setState({ errorUploaded: true});
          }
        }
      }
    });
  }

  renderProgress(file) {
    const uploadProgress = this.state.uploadProgress[file.name];
    if (this.state.uploading || this.state.successfullUploaded) {
      return (
        <div className="ProgressWrapper">
          <Progress progress={uploadProgress ? uploadProgress.percentage : 0} />
          <img
            className="CheckIcon"
            alt="done"
            src="baseline-check_circle_outline-24px.svg"
            style={{
              opacity:
                uploadProgress && uploadProgress.state === "done" ? 0.5 : 0
            }}
          />
        </div>
      );
    }
  }

  renderActions() {
    if (this.state.errorUploaded==true){
        return (
          <button
            onClick={() =>
              this.setState({ files: [], errorUploaded: false })
            }
          >
            Clear
          </button>
        );
    } else  if (this.state.successfullUploaded==true){
      return (
        <>
        </>
      );
    }else {
      return (
        <button
           disabled={this.state.files.length < 0 || this.state.uploading}
           onClick={this.uploadFiles}
        >
          crear curso
        </button>
      );
    }
  }

  render() {
    return (
      <div className="Upload">
        <div className="Content" style={{display: 'inline-flex'}}>
          <div>
            <Dropzone
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading || this.state.successfullUploaded}
            />
          </div>
          <div className="Files">
            {this.state.files.map(file => {
              return (
                <div key={file.name} className="Row">
                  <span className="Filename">{file.name}</span>
                  {this.renderProgress(file)}
                </div>
              );
            })}
          </div>
        </div>
        <div className="Actions">{this.renderActions()}</div>
        
      </div>
    );
  }
}

export default Upload;
