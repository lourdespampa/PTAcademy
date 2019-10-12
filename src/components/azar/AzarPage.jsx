import React from 'react';
import './azar.css'
import Ruleta from './ruleta'
// import js from '../../plugins/js.js'
function AzarPage(pros){
    return(
        <>
        <div class="azar-con" style={{color:"#000"}}>
                <div class="cuerpo-azar">
                    {/* <%- include('./partials/ruleta.html') -%> */}
                    <Ruleta />
                </div>
                <div class="GroupsGeneratorResult">
                    <div class="GroupsGeneratorResult__container">
                        <div class="GroupsGeneratorResult__group">
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AzarPage;