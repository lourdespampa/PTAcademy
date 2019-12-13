import React from 'react';

// images
import board from '../../img/menuLeft/board.png';
import puzzle from '../../img/menuLeft/puzzle.png';
import {Link} from 'react-router-dom';
// import cat from '../../img/menuLeft/cat.png';

// style
import './MenuLeft.css'

function MenuLeft(props){
    return(
        <>
            <div id="focussocial"
                className="socialfocus"
                onMouseOver={props.aparecer} 
                onMouseOut={props.desaparecer}
            ></div>
            <div 
                className="socialpestaña"
                onMouseOver={props.aparecer} 
                onMouseOut={props.desaparecer}
            ><h5>Arrastre el click aqui</h5></div>
            <div id="social"
                className="social" 
                onMouseOver={props.aparecer}
                onMouseOut={props.desaparecer}
              >
                <ul> 
                    <li>
                      
                        <Link className="icon-facebook" to="/pizarra"> <img src={board} width="40px" alt="board"></img> <p className="text-menu-left">PIZARRA</p></Link>
                    </li>
                    <li>
                        <a href="xD" className="icon-twitter" ><img src={puzzle} width="40" alt="blocks"/>
                            <p className="text-menu-left">BLOCKY</p>
                        </a>
                    </li>
                    <li>
                        <a href="xD" className="icon-googleplus"><img src={require('../../img/menuLeft/cat.png')} width="40" alt="cat"/>
                            <p className="text-menu-left">SCRATCH</p>
                        </a>
                    </li>
                </ul>
            </div>
        </> 
    )
}

export default MenuLeft;