import React from 'react'
import './styles/Header.css'

class Header extends React.Component {
    render(){
 return(<table id="main">        
     <tr>
         <td>
        <table id="tab">
            <tr id="tabRow">
                 <td id="tab_blocks" className="tabon" onclick="tabClick('blocks')">Bloques</td>
                 <td  className="tabmin"> </td>
                 <td id="tab_arduino" className="taboff" onclick="tabClick('arduino')"></td>

                        <td className="tabmin"> </td>
                            <td className="tabmax">
                                  <a href="#top">  <i className="small material-icons">  content_copy    </i></a>
                                  <a href="#top">  <i className="small material-icons">  delete          </i></a>
                                  <a href="#top">  <i className="small material-icons">  cloud_download  </i></a>
                                  <a href="#top">  <i className="small material-icons">  cloud_upload    </i></a>
                                  <a href="#top">  <i className="small material-icons">  arrow_drop_down </i></a>
                                  <input className="file"  type="file"id="load"/>
                            </td>
            </tr>        
        </table>
        </td>
     </tr>
     <tr>
         </tr>
 </table>
 );
    }
}
export default Header