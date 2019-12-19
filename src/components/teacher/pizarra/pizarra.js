import { cursorTo } from "readline";
import { url } from "inspector";


/*$(document).ready(function(){
    $(".menu-button").click(function(){
    $(".menu-bar").toggleClass( "open" );
    })
    })
*/
/*const btn = document.getElementsByClassName('menu-button');    
const menu = document.getElementsByClassName('menu-bar');

btn.addEventListener('click', ()=>
{
    menu.toggleClass('open');
});*/

/*import $ from 'jquery';
import ui from 'jquery-ui/ui/widgets/draggable';


//$("#draggable").ui({ scroll: false });
alert("hola");
*/

//export default arrastrar

const btn_pencil = document.getElementById('btn_pencil');

btn_pencil.addEventListener('click', () => {
    document.getElementById('canvas').style.cursor = 'url().crooshair';

})