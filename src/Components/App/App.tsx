import React from 'react'
import useSocketIo from '../../Utils/SocketIo'
  
const App: React.FC = () => {
  const [ eventName, setEventName ] = React.useState('')
  const [ eventObject, setEventObject ] = React.useState('')
  
  const socket = useSocketIo({
    url: 'http://localhost:1111'
  })

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
          socket.emit(eventName, JSON.stringify(eventObject))
        }}
      >
        Send
      </button>
    </div>
  )
}

export default App;
