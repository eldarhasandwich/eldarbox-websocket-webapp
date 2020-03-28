import React from 'react'

import Board from './Board'

interface Props {
  socket: SocketIOClient.Socket
  gameState?: any
}

const Guest: React.FC<Props> = (props) => {

  const [ playerName, setPlayerName ] = React.useState('')
  const [ connectCode, setConnectCode ] = React.useState('')

  const [ gameState, setGameState ] = React.useState<any | undefined>(undefined)

  React.useEffect(() => {
    props.socket.on('index-gameJoined', (message: any) => {
      console.log('game joined', { message })

      setGameState(message.gameObject)
    })

    props.socket.on('stateUpdate', (message: any) => {
      console.log('stateUpdate', { message })

      setGameState(message.state)
    })
  }, [props.socket])

  const SendPlaceCommand = (position: { x: number, y: number }) => {
    props.socket.emit('gameCommand', {
      messageType: 'place',
      invokingPlayer: playerName,
      position
    })
  }

  const SendResetCommand = () => {
    props.socket.emit('gameCommand', {
      messageType: 'newGame'
    })
  }

  return (
    <div>
      <h1>Guest</h1>

      { !gameState && ( // we are NOT in a game
        <div>
          <input value={playerName} onChange={(e) => { setPlayerName(e.target.value) }} /> 
          <br/>
          <input value={connectCode} onChange={(e) => { setConnectCode(e.target.value) }} /> 
          <br/>
          <button onClick={() => {
            props.socket.emit('index-joinRoom', {
              playerName,
              connectCode
            })
          }}>
            Submit
          </button>
        </div>
      )}

      { gameState && ( // we are in a game
        <div>
          <Board 
            board={gameState.state.board}
            placeCommand={SendPlaceCommand} 
          />
          <button 
            onClick={() => { SendResetCommand() }}
          >
            Reset
          </button>
        </div>
      )}
      
    </div>
  )
}

export default Guest