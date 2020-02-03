import React, { useState } from "react";
import iconExit from "../../img/cerrar.png";
import FormularioCourse from './FormPostCourse'
import FormularioClass from './FormPostClass'
import Loanding from "../../components/teacher/loanding/spinner"

export default function BotonAgregar(props) {
    const [show, setShow] = useState(0);
    const [loanding, setLoanding] = useState(false);
    const handleDisableX = () => setLoanding(true)
    const handleClose = () => setShow(2)
    const handleEnableX=()=>setLoanding(false)
    const handleShow = () => setShow(1);
    const AgregarClick=()=>setShow(2)+props.getdata()
    return (
      <>
      {loanding?
      <Loanding/>:null
  
      }
        <div className="teacherCourses__main-menu__returnCourse" onClick={handleShow}>
          Agregar {props.agregarX}
        </div>
        <div id="modal-general_container" className={show === 0 ? "" : show === 1 ? "six" : show === 2 ? "six out" : ""}>
          <div className="modal-general_background">
            <div className="modal-general_bg_content">
              <button className="modal-general_close" onClick={handleClose}>
                <img className="button-zoom" src={iconExit} alt="imagen de cerrar modal" />
              </button>
              <div className="modal-general_container">
                { (props.agregarX === 'curso')?
              <FormularioCourse apiUrl={props.apiUrl} handleClose={AgregarClick} idteacher={props.idteacher} idcourse={props.idcourse} menuToggleNavbar={props.menuToggleNavbar}/>
              :
              <FormularioClass handleEnableX={handleEnableX} handleDisableX={handleDisableX}  apiUrl={props.apiUrl} handleClose={AgregarClick} idteacher={props.idteacher} idcourse={props.idcourse} menuToggleNavbar={props.menuToggleNavbar}/>
              }
              </div>
              <svg className="modal-general_svg" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                <rect x="0" y="0" fill="none" rx="3" ry="3"></rect>
              </svg>
            </div>
          </div>
        </div>
      </>
    );
  }