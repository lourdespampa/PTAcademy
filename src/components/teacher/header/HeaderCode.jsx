import React from 'react';

import './HeaderCode.css'

function HeaderCode(props){

    return(
        <div className="header">
            <div className="clase-detail">
                <h1>
                    Nombre del curso
                </h1>
            </div>
            <div className="code-detail">
                <a href className="a" data-toggle="modal" data-target="#miCodigo" id="btnVerAlumnos">
                    <span>Código:</span>
                    <h3>
                       {props.id_access}
                    </h3>
                </a>
            </div>
            <div className="menu-detail">
                <div className="menu-detail-content">
                    <a className="btn-menu material-icons" style={{ fontSize: "50px"}} href="/teacher/logout">exit_to_app</a>
                </div>
            </div>
            <div id="miCodigo" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title"><strong>CODIGO DE LA CLASE:</strong></h4>
                        </div>
                        <div className="modal-body" style={{fontSize: "100px"}}>
                            ASDJA
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderCode;