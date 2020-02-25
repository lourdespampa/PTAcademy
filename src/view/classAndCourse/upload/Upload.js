import React, { Component } from "react";
import Dropzone from "./Dropzone";
import "./Upload.sass";

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      uploading: false,
      uploadProgress: {},
      successfullUploaded: false,
      errorUploaded:false,
      slideOn:false,
      NoData:false,
      UploadDone:false,
      limpiarInputFile:false,
      DisableDropZone:{},
      fileEditOn:false
    };

    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.uploadFiles = this.uploadFiles.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.renderActions = this.renderActions.bind(this);
  }
componentDidMount(){
  if(this.props.EditDiapo){
    this.getFile()
  }
}
getFile(){
  this.setState({
    files:this.props.fileActual,
    slideOn:true,
    DisableDropZone:{pointerEvents:'none'},
    fileEditOn:false

  })
}
  onFilesAdded(files) {
    this.setState({
      files: []
    });
    this.setState({slideOn:true})
    this.setState(prevState => ({
      files: prevState.files.concat(files)
    }));
    console.log(files)
  }

  async uploadFiles() {
    if(this.props.EditDiapo){
      if (Object.keys(this.state.files).length === 0){
        this.setState({NoData:true})
      }else{
        document.addEventListener("keydown", function(e){
          if (e.which === 27){
              return false
          }})
       this.setState({ uploadProgress: {}, uploading: true });
       const promises = [];
       this.state.files.forEach(file => {
         promises.push(this.sendRequest(file));
       });
       try {
         await Promise.all(promises);
   
         this.setState({ successfullUploaded: true, uploading: true, limpiarInputFile: true });
       } catch (e) {
         this.setState({ successfullUploaded: true, uploading: true });
       }
      }
    }else{
    if (this.props.class_name==='' || this.props.desc==='' ||  Object.keys(this.state.files).length === 0){
      this.setState({NoData:true})
    }else{
    this.props.handleDisableX()
     document.addEventListener("keydown", function(e){
       if (e.which === 27){
           return false
       }})
    this.setState({ uploadProgress: {}, uploading: true });
    const promises = [];
    this.state.files.forEach(file => {
      promises.push(this.sendRequest(file));
    });
    try {
      await Promise.all(promises);

      this.setState({ successfullUploaded: true, uploading: true, limpiarInputFile: true });
    } catch (e) {
      this.setState({ successfullUploaded: true, uploading: true });
    }}}
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
        this.setState({ uploadProgress: copy,UploadDone:true,uploading:false });
        resolve(req.response);
      });

      req.upload.addEventListener("error", event => {
        const copy = { ...this.state.uploadProgress };
        copy[file.name] = { state: "error", percentage: 0 };
        this.setState({ uploadProgress: copy });
        reject(req.response);
      });

      var varToken = localStorage.getItem('token');
      const formData = new FormData();
      formData.append("file", file, file.name);
      
      if(this.props.EditDiapo===false){
        formData.append("class_name",this.props.class_name)
        formData.append("desc",this.props.desc)
        console.log(file)

        req.open("POST", `${this.props.apiUrl}/v1/api/teacher/${this.props.idteacher}/course/${this.props.idcourse}/class`);
        // req.open("POST", `${this.props.apiUrl}/v1/api/teacher/${this.props.idteacher}/course/${this.props.idcourse}/falllaApropocito`);
        req.setRequestHeader('x-access-token', `${varToken}`)
        req.send(formData);
        console.log('asdmasd')
        req.onload=()=>{
          if(req.readyState===req.DONE){
            if(req.status===200){
              console.log(req.response)
              console.log('bien')
              this.props.handleClose()
              this.props.cleanInputs()
              this.props.handleEnableX()
              this.setState({
                files: [],
                uploading: false,
                uploadProgress: {},
                successfullUploaded: false,
                errorUploaded:false,
                slideOn:false,
                NoData:false,
                UploadDone:false,
                limpiarInputFile:false
              })
            }
            else{
              console.log(req.response)
              console.log('mal')
              this.setState({ errorUploaded: true});
              this.props.handleEnableX()
              // this.props.cleanInputs()
              this.setState({
                successfullUploaded: false,
                errorUploaded:true,
                uploading: false,
                uploadProgress: {},
                slideOn:false,
                NoData:false,
                UploadDone:false,
                limpiarInputFile:false
              })
            }
          }
        }
      }else{
        console.log(file)
        req.open("PUT", `192.168.1.66:4200/v1/api/teacher/presentation/${this.props.id_class}`);
        // req.open("POST", `${this.props.apiUrl}/v1/api/teacher/${this.props.idteacher}/course/${this.props.idcourse}/falllaApropocito`);
        req.setRequestHeader('x-access-token', `${varToken}`)
        req.send(formData);
        console.log('asdmasd')
        req.onload=()=>{
          if(req.readyState===req.DONE){
            if(req.status===200){
              console.log(req.response)
              console.log('bien')
              this.setState({
                files: [],
                uploading: false,
                uploadProgress: {},
                successfullUploaded: false,
                errorUploaded:false,
                slideOn:false,
                NoData:false,
                UploadDone:false,
                limpiarInputFile:false,
                fileEditOn:false,
                DisableDropZone:{}
              })
            }
            else{
              console.log(req.response)
              console.log('mal')
              this.setState({
                successfullUploaded: false,
                errorUploaded:true,
                uploading: false,
                uploadProgress: {},
                slideOn:false,
                NoData:false,
                UploadDone:false,
                limpiarInputFile:false
              })
            }
          }
        }
      }
    });
  }

  renderActions() {
    if (this.state.errorUploaded===true){
        return (
          <>
          <button className='modal-body__button backCursos'
            onClick={() =>{
              this.props.cleanInputs()
              this.setState({ files: [], uploading: false, errorUploaded: false,slideOn:false })
            }}
          >
            <div className="button-zoom">LIMPIAR</div>
          </button>
          <p className="mensageAction negative">
            OCURRIO UN ERROR, LIMPIE Y SUBA OTRA DIAPOSITIVA
          </p>
          </>
        );
    } else  if (this.state.uploading===true & this.state.UploadDone===false){
      return (
        <>
        <p className="mensageAction pocitive">
        Procesando diapositiva...
        </p>
        </>
      );
    }else  if (this.state.uploading===true & this.state.UploadDone===true){
      return (
        <>
        <p className="mensageAction pocitive"> 
        Subiendo diapositiva...
        </p>
        </>
      );
    }else {
      return (
        <>
          {this.props.EditDiapo?
          this.state.fileEditOn?
            <>
              <button id='modal-body__button-cursos' type="submit" className="modal-body__button yes"
                      hidden={this.state.files.length < 0 || this.state.uploading}
                      onClick={this.uploadFiles}>
                <div className="button-zoom">GUARDAR</div>
              </button>
              <button id='modal-body__button-cursos' type="submit" className="modal-body__button no"
                      hidden={this.state.files.length < 0 || this.state.uploading}
                      onClick={()=>this.getFile()}>
                <div className="button-zoom">CANCELAR</div>
              </button>
            </>:null
            :
            <button id='modal-body__button-cursos' type="submit" className="modal-body__button yes"
                  hidden={this.state.files.length < 0 || this.state.uploading}
                  onClick={this.uploadFiles}>
              <div className="button-zoom">CREAR CLASE</div>
            </button>
            }
          {this.state.files.length>0 ?
          this.props.EditDiapo?
          this.state.fileEditOn?null:
          <button className='modal-body__button backCursos'
            onClick={() => {
              this.setState({ files: [],DisableDropZone:{},fileEditOn:true, uploading: false, errorUploaded: false,slideOn:false,NoData:false })
            }}
          >
            <div className="button-zoom">CAMBIAR DIAPOSITIVA</div>
          </button>
          :
            <button className='modal-body__button backCursos'
            onClick={() => {
              this.props.cleanInputs()
              this.setState({ files: [], uploading: false, errorUploaded: false,slideOn:false,NoData:false })
            }}
          >
            <div className="button-zoom">LIMPIAR</div>
          </button>
          :
            null
          }
          { this.state.NoData?
          this.props.class_name==='' || this.props.desc==='' ||  Object.keys(this.state.files).length === 0?
          <p className="mensageAction negative">RELLENA TODOS LOS CAMPOS</p>:null:null
          }
        </>
      );
    }
  }

  render() {
    return (
      <div className="Upload">
        <div className="Content" style={this.state.DisableDropZone}>
          <div>
            <Dropzone
              limpiarInputFile={this.state.limpiarInputFile}
              slideOn={this.state.slideOn}
              onFilesAdded={this.onFilesAdded}
              disabled={this.state.uploading||this.state.files.length>0}
            />
          </div>
          <div className="Files">
            {this.state.files.map((file, id) => {
              return (
                <>
                  <span key={id}>{file.name}</span>
                </>
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
