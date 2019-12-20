import React from 'react'
import ReactLoading from 'react-loading';

const Loading = ({status}) => {
  if(!status){
    return(
      <div>{ status }</div>
    )
  }else{
    return(
      <ReactLoading className='center' type='bars' color='rgb(230, 8, 8)' height={64} width={64}/>
    )
  }
}

export default Loading;