import React from 'react';
import AzarPage from '../../components/teacher/azar/Azar';
class Azar extends React.Component {


    render(){
        return(
            <div>
              <AzarPage socketUrl={this.props.socketUrl} id_access={this.props.id_access} apiUrl={this.props.apiUrl} />
            </div>
        )
    }
}

export default Azar;