import React from 'react';

// images
import board from '../../img/menuLeft/board.png';
import puzzle from '../../img/menuLeft/puzzle.png';
// import cat from '../../img/menuLeft/cat.png';

// style
import './MenuLeft.css'

// function aparecer(){
//     var soc = document.getElementById('social')
//     soc.style.display = "block";
// }

function MenuLeft(){
    return(
        <>
            <div id="focussocial"
                className="socialfocus"
            //   onMouseOver={aparecer} 
            //   onMouseOut="desaparecer()"
            ></div>
            <div id="social"
                className="social" 
            //   onMouseOut="desaparecer()" 
            //   onMouseOver="aparecer()"
            style={{display: 'block'}}
              >
                <ul> 
                    <li>
                        <a href="/command/pizarra/?cod=<%= codigoClase %>" className="icon-facebook"><img src={board} width="40" alt="board"/>
                            <p className="text-menu-left">PIZARRA</p>
                        </a>
                    </li>
                    <li>
                        <a href="/command/blockly/?cod=<%= codigoClase %>" className="icon-twitter" ><img src={puzzle} width="40" alt="blocks"/>
                            <p className="text-menu-left">BLOCKY</p>
                        </a>
                    </li>
                    <li>
                        <a href="/command/code/?cod=<%= codigoClase %>" className="icon-googleplus"><img src={require('../../img/menuLeft/cat.png')} width="40" alt="cat"/>
                            <p className="text-menu-left">SCRATCH</p>
                        </a>
                    </li>
                </ul>
            </div>
        </> 
    )
}

export default MenuLeft;