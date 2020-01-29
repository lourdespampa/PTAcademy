import React from 'react'
export const BtnPuntos = ({data,funcion}) => {
    
    return (
        <>
        {
            data.map((point, id )=> (
            <button key={id} type="button" onClick={()=>funcion(point.valor)} className="punto-marco" >
                <div className="punto-marco2">
                    <div className="punto-marco3">
                    <img className="punto-img" src={point.imgen} alt="punto1" />
                    </div>
                </div>
                <div className="punto-texto">
                    <i>{point.title}</i>
                </div>
            </button>
            ))
            }
        </>
    )
}
