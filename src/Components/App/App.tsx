import React from 'react'
import useSocketIo from '../../Utils/SocketIo'

import Guest from '../TickTacToe'
  
const App: React.FC = () => {

  const socket = useSocketIo({
    url: 'http://localhost:1111'
  })

  React.useEffect(() => {
    if (!socket) return

    socket.on('index-error', (message: unknown) => {
      console.log('error', { message })
    })

  }, [socket])

  if (!socket) {
    return (<div>loading socket</div>)
  }

  return (
    <>
      <Guest socket={socket} />
    </>
  )
}

export default App;
