import React, { Component, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ModalAgregar from "../../classAndCourse/ModalAgregar"
import iconExit from "../../../img/cerrar1.png";
import FormAddStudent from "./FormAddStudent";
import iconBack from "../../../img/back_button.svg";
// function BotonAgregar(props) {
//   const [show, setShow] = useState(0);
//   const handleClose = () => setShow(2);
//   const handleShow = () => setShow(1);
//   const AgregarClick = () => setShow(false) + props.getdata();
//   return (
//     <>
//       <div
//         className="teacherCourses__main-menu__addCourse"
//         onClick={handleShow}
//       >
//         Agregar Alumno
//       </div>
//       <div
//         id="modal-general_container"
//         className={
//           show === 0 ? "" : show === 1 ? "six" : show === 2 ? "six out" : ""
//         }
//       >
//         <div className="modal-general_background">
//           <div className="modal-general_bg_content">
//             <button className="modal-general_close" onClick={handleClose}>
//               <img
//                 className="button-zoom"
//                 src={iconExit}
//                 alt="imagen de cerrar modal"
//               />
//             </button>
//             <div className="modal-general_container">
//               <FormAddStudent
//                 handleClose={AgregarClick}
//                 apiUrl={props.apiUrl}
//                 idcourse={props.idcourse}
//                 idteacher={props.idteacher}
//               />
//             </div>
//             <svg
//               className="modal-general_svg"
//               xmlns="http://www.w3.org/2000/svg"
//               preserveAspectRatio="none"
//             >
//               <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
//             </svg>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
function BotonCerrarSesion(props) {
  const [show, setShow] = useState(0);
  const handleClose = () => setShow(2);
  const handleShow = () => setShow(1);
  return (
    <>
      <div className="teacherCourses__main-menu__LogOut" onClick={handleShow}>
        Cerrar sesión
      </div>
      <div
        id="modal-general_container"
        className={
          show === 0 ? "" : show === 1 ? "six" : show === 2 ? "six out" : ""
        }
      >
        <div className="modal-general_background">
          <div className="modal-general_bg_content">
            <button className="modal-general_close" onClick={handleClose}>
              <img
                className="button-zoom"
                src={iconExit}
                alt="imagen de cerrar modal"
              />
            </button>
            <div className="modal-general_container">
              <div className="modal-general_container_header">
                <span className="modal-title__controlname">
                  ¿DESEA CERRAR SESIÓN?
                </span>
              </div>
              <div className="modal-general_container_body">
                <Link style={{ textDecoration: "none" }} to="/">
                  <button
                    className="modal-body__button yes"
                    onClick={props.cerrarSesion}
                    variant="primary"
                  >
                    <div className="button-zoom">SI</div>
                  </button>
                </Link>

                <button className="modal-body__button no" onClick={handleClose}>
                  <div className="button-zoom">NO</div>
                </button>
              </div>
            </div>
            <svg
              className="modal-general_svg"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

export default class NavCourse extends Component {
  state = {
    token: false,
    inputValue:""
  };

  UNSAFE_componentWillMount = async () => {
    let tokenStorage = localStorage.getItem("token");
    await this.setState({ token: tokenStorage });
  };

  cerrarSesion = () => {
    localStorage.clear();
    this.setState({ token: null });
  };

  Abrir = () => {
    const nav = document.getElementById("main-nav");
    nav.classList.toggle("show");
  };
  onFilesAdded=(evt)=>{
    this.setState({
      inputValue: evt.value})
      this.sendRequest(evt.value)
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

      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("class_name",this.props.class_name)
      formData.append("desc",this.props.desc)
      console.log(file)

      var varToken = localStorage.getItem('token');
        
      req.open("POST", `${this.props.apiUrl}/v1/api/teacher/${this.props.idteacher}/upload_excel/${this.props.idcourse}`);
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
    });
  }
  render() {
    return (
      <>
        {this.state.token ? null : <Redirect to="/notfound"></Redirect>}
        {
          this.props.editarTodos
          ?
          <div className="teacherCourses__floatingActionButton teacherCourses_editStudent" onClick={this.props.handleEditAllStudentDisable} style={{background: "#52BE7F"}} ><i className="fas fa-save"></i></div>
          :
          <div className="teacherCourses__floatingActionButton teacherCourses_editStudent" onClick={this.props.handleEditAllStudentEnable}><i className="fas fa-edit"></i></div>
          }
        <div className="teacherCourses__floatingActionButton teacherCourses_addStudent" onClick={this.props.handleAddStudent}><i className="fas fa-plus"></i></div>
        <header className="teacherCourses__main-header">
          <div className="teacherCourses__l-container teacherCourses__main-header__block">
            <Link
              to={`/CoursesTeacher/${this.props.idteacher}`}
              style={{ textDecoration: "none" }}
            >
              <img src={iconBack} alt="imgagen de volver atras" />
            </Link>
            <h3>Bienvenido(a) </h3>

            <div
              className="teacherCourses__main-menu-toggle"
              id="main-menu-toggle"
              onClick={this.Abrir}
            ></div>
            {/* <div className="teacherCourseNav" onClick={this.SegundaFuncion}></div> */}

            <nav className="teacherCourses__main-nav" id="main-nav">
              <ul className="teacherCourses__main-menu">
                <li className="teacherCourses__main-menu__item">
                  <ModalAgregar
                   apiUrl={this.props.apiUrl}
                   idteacher={this.props.idteacher}
                   idcourse={this.props.idcourse}
                   agregarX={"Alumno"}
                   getdata={this.props.getdata}>
                  </ModalAgregar>
                  {/* <BotonAgregar
                    apiUrl={this.props.apiUrl}
                    idteacher={this.props.idteacher}
                    idcourse={this.props.idcourse}
                    agregarX={this.props.agregarX}
                    getdata={this.props.getdata}
                  ></BotonAgregar> */}
                </li>
                <li className="teacherCourses__main-menu__item">
                  <BotonCerrarSesion cerrarSesion={this.cerrarSesion} />
                </li>
                {/* <li className="teacherCourses__main-menu__item">
                  <input ref="" type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excels" 
                  onChange={this.onFilesAdded} value={this.state.inputValue}/>
                </li> */}
              </ul>
            </nav>
          </div>
        </header>
      </>
    );
  }
}
