import React from 'react'
import HeaderContainer from '../../components/student/Header/HeaderContainer'

class Header extends React.Component{

    render(){
        return(
            <>
            <HeaderContainer id_access={this.props.id_access}/>
        </>
        )
    }
}

export default Header




// export default function Footer() {
//     return (
//         <>
//             <HeaderContainer id_access={this.props.id_access}/>
//         </>
//     )
// }
