import React from 'react'

import Board from './Board'

const TickTacToeType = 0

interface Props {
  socket: SocketIOClient.Socket
  gameState?: any
}

const Guest: React.FC<Props> = (props) => {

  const [ playerName, setPlayerName ] = React.useState('')
  const [ connectCode, setConnectCode ] = React.useState('')

  const [ gameState, setGameState ] = React.useState<any | undefined>(undefined)


  React.useEffect(() => {
    props.socket.on('index-gameCreated', (message: any) => {
      console.log('created game', { message })

      setGameState(message.state)
    })

    props.socket.on('index-gameJoined', (message: any) => {
      console.log('game joined', { message })

      setGameState(message.state)
    })

    props.socket.on('stateUpdate', (message: any) => {
      console.log('stateUpdate', { message })

      setGameState(message.state)
    })

    props.socket.on('disconnect', () => {
      setGameState(undefined)
    })
  }, [props.socket])

  const CreateGame = () => {
    props.socket.emit('index-createRoom', {
      gameTypeId: TickTacToeType
    })
  }

  const SendPlaceCommand = (position: { x: number, y: number }) => {
    props.socket.emit('gameCommand', {
      messageType: 'place',
      invokingPlayer: playerName || 'master',
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
      <h1>Ticktactoe</h1>

      { !gameState && ( // we are NOT in a game
        <div>
          <h2>Create Game</h2>
          <button onClick={() => { CreateGame() }}>Create</button>

          <h2>Join Game</h2>
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
          <p>Pin: {gameState.pin}</p>
          { gameState.players.map((p: any) => 
            <p>player: {p.name}</p>
          ) }

          {
            gameState.state.winner 
              ? ( <h3> {`${gameState.state.winner === 1 ? 'O' : 'X'} Won!`} </h3> )
              : ( <h3> {`Next token: ${gameState.state.nextToken === 1 ? 'O' : 'X'}`} </h3> )
          }

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