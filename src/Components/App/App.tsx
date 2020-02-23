import React from 'react'
import useSocketIo from '../../Utils/SocketIo'
  
const App: React.FC = () => {

  const socket = useSocketIo()

  return (
    <div>
      app

      <button
        onClick={() => {
          console.log('click')
          socket.emit('hello', { thing: 'yes' })
        }}
      >
        Send
      </button>
    </div>
  )
}

export default App;
