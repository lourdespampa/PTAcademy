import React from 'react';
import {Link} from 'react-router-dom'
// images
import board from '../../../img/menuLeft/board.png';
import puzzle from '../../../img/menuLeft/puzzle.png';
//import Bloques from '../blocky/App';

// import cat from '../../img/menuLeft/cat.png';
import {Link} from 'react-router-dom'

// style
import './MenuLeft.sass'

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
                        <Link className="icon-facebook" to={props.view}> <img src={board} width="40px" alt="board"></img> <p className="text-menu-left">PIZARRA</p></Link>
                    </li>
                    <li>
<<<<<<< HEAD:src/components/teacher/left/MenuLeft.jsx
                        <Link className="icon-twitter" to={'/teacher/:id_class/:id_access/bloque'}> <img src={puzzle} width="40px" alt="blocks"></img> <p className="text-menu-left">BLOCKY</p></Link>
=======
                        <Link  className="icon-twitter" to="/blockly"> <img src={puzzle} width="40" alt="blocks"/>  <p className="text-menu-left">BLOCKY</p>  </Link>
>>>>>>> 9711e3cf4419017f4700e783408651f4f8a91ce9:src/components/left/MenuLeft.jsx
                    </li>
                    <li>
                        <a href="xD" className="icon-googleplus"><img src={require('../../../img/menuLeft/cat.png')} width="40" alt="cat"/>
                            <p className="text-menu-left">SCRATCH</p>
                        </a>
                    </li>
                </ul>
            </div>
        </> 
    )
}

export default MenuLeft;