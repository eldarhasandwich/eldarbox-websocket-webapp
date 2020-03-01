import React from 'react'
import useSocketIo from '../../Utils/SocketIo'
  
const App: React.FC = () => {
  const [ eventName, setEventName ] = React.useState('')
  const [ eventObject, setEventObject ] = React.useState('')
  
  const socket = useSocketIo({
    url: 'http://localhost:1111'
  })

  React.useEffect(() => {
    if (!socket) return

    socket.on('index-gameCreated', (message: unknown) => {
      console.log('created game', { message })
    })

    socket.on('index-gameJoined', (message: unknown) => {
      console.log('game joined', { message })
    })

    socket.on('stateUpdate', (message: unknown) => {
      console.log('stateUpdate', { message })
    })

    socket.on('index-error', (message: unknown) => {
      console.log('error', { message })
    })
  }, [socket])

  if (!socket) {
    return (<div>loading socket</div>)
  }

  return (
    <div>
      <span><code>Name</code></span>
      <input
        type='text'
        onChange={(e) => setEventName(e.target.value)}
        value={eventName}
      />
      <br/>

      <span><code>Obj.</code></span>
      <input
        type='text'
        onChange={(e) => setEventObject(e.target.value)}
        value={eventObject}
      />
      <br/>


      <button
        onClick={() => {
          console.log('click')
          socket.emit(eventName, JSON.parse(eventObject))
        }}
      >
        Send
      </button>
    </div>
  )
}

export default App;
