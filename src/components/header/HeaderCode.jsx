import React from 'react';

import './HeaderCode.css'

function HeaderCode(){

    return(
        <div className="header">
            <div className="clase-detail">
                <h1>
                    Nombre del curso

                </h1>
            </div>
            <div className="code-detail">
                <a className="a" data-toggle="modal" data-target="#miCodigo" id="btnVerAlumnos">
                    <span>Código:</span>
                    <h3>
                       ROSALI
                    </h3>
                </a>
            </div>
            <div className="menu-detail">
                <div className="menu-detail-content">

                    <a className="btn-menu material-icons" style={{color: "aliceblue", fontSize: "50px"}} href="/teacher/logout">exit_to_app</a>
                </div>
            </div>

            <div id="miCodigo" className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content" style={{color: "#000"}}>
                        <div className="modal-header">
                            <h4 className="modal-title"><strong>CODIGO DE LA CLASE:</strong></h4>
                        </div>
                        <div className="modal-body" style={{fontSize: "54px", textAlign: "center"}}>
                            <h2>
                                 La rosalia
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeaderCode;