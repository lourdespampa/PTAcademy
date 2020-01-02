import React from 'react';
import AzarPage from '../../components/teacher/azar/Azar';
class Azar extends React.Component {


    render(){
        return(
            <div>
              <AzarPage id_access={this.props.id_access} />
            </div>
        )
    }
}

export default Azar;