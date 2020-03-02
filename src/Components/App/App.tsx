import React from 'react'
import useSocketIo from '../../Utils/SocketIo'

import Master from '../TickTacToe/Master'
import Guest from '../TickTacToe/Guest'
  
const App: React.FC = () => {

  const [ clientType, setClientType ] = React.useState<'guest' | 'master'>('guest')

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
      <button onClick={() => setClientType('guest')}>
        Guest
      </button>

      <button onClick={() => setClientType('master')}>
        Master
      </button>

      { clientType === 'guest' && <Guest socket={socket} /> }      
      { clientType === 'master' && <Master socket={socket} /> }      
    </>
  )
}

export default App;
