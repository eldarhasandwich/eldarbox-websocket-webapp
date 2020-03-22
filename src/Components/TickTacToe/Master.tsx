import React from 'react'

import Board from './Board'

const TickTacToeType = 0

interface Props {
  socket: SocketIOClient.Socket
}

export const Master: React.FC<Props> = (props) => {

  const [ gameState, setGameState ] = React.useState<any | undefined>(undefined)


  React.useEffect(() => {
    props.socket.emit('index-createRoom', {
      gameTypeId: TickTacToeType
    })

    props.socket.on('index-gameCreated', (message: any) => {
      console.log('created game', { message })

      setGameState(message.gameObject)
    })

    props.socket.on('stateUpdate', (message: any) => {
      console.log('stateUpdate', { message })

      setGameState(message.state)
    })

  }, [props.socket])

  console.log({ gameState })

  return (
    <div>
      <h1>Master</h1>

      { gameState && (
        <div>
          <p>Pin: {gameState.pin}</p>
          { gameState.players.map((p: any) => 
            <p>player: {p.name}</p>
          ) }

          {
            gameState.state.board && (
              <Board board={gameState.state.board} />
            )
          }
        </div>
      )}

    </div>
  )
}

export default Master