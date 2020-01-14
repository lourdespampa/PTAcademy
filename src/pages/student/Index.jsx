import React,{useEffect} from 'react'
import io from 'socket.io-client';

export default function Index(props) {
    useEffect(()=>{
        const socket = io(props.socketUrl, {
          query:
              { pin: props.id_access }
        })
        socket.emit('newAlum')
      })
    return (
        <>
            <h1>Index</h1>
        </>
    )
}
