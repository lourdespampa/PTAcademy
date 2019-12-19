import React from 'react';
import Roulette from './Roulette';

const handleOnComplete = (value) => {
    console.log(value);
  };
  
function genCharArray(charA, charZ) {
var a = [], i = charA.charCodeAt(0), j = charZ.charCodeAt(0);
for (; i <= j; ++i) {
    a.push(String.fromCharCode(i));
}
return a;
}


const options = genCharArray('a', 'z');

class Azar extends React.Component {


    render(){
        return(
            <div>
                <Roulette options={options} baseSize={150} onComplete={handleOnComplete}/>
            </div>
        )
    }
}

export default Azar;