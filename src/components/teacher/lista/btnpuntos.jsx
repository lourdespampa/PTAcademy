import React from 'react'
export const BtnPuntos = ({imgen,title,fuction}) => {
    
    return (
        <>
            <button id="puntomas" type="button" onClick={fuction} className="punto-marco" >
                <div className="punto-marco2">
                    <div className="punto-marco3">
                    <img className="punto-img" src={imgen} alt="punto1" />
                    </div>
                </div>
                <div className="punto-texto">
                    <i>{title}</i>
                </div>
            </button>
        </>
    )
}
