import React from 'react'

import * as s from './Board.styled'

const Tile: React.FC<{
  board: any,
  x: 0 | 1 | 2,
  y: 0 | 1 | 2,
  onClick: () => void
}> = (props) => {
  
  const x = props.x
  const y = props.y

  let token = "-"

  if (props.board[x][y] === 2) {
    token = "X"
  }

  if (props.board[x][y] === 1) {
    token = "O"
  }

  return (
    <s.Tile onClick={() => { props.onClick() }}>
      <s.TileContent>
        { token }
      </s.TileContent>
    </s.Tile>
  )
}

const Board: React.FC<{
  board: any
  placeCommand?: (position: { x: number, y: number }) => void
}> = (props) => {

  const { board, placeCommand } = props
  
  const place = (x: number, y: number) => {
    if (!placeCommand) {
      return
    }

    placeCommand({ x, y })
  }

  return (
    <s.Board>
      <s.Row>
        <Tile board={board} x={0} y={0} onClick={() => { place(0,0) }} />
        <Tile board={board} x={1} y={0} onClick={() => { place(1,0) }}/>
        <Tile board={board} x={2} y={0} onClick={() => { place(2,0) }}/>
      </s.Row>

      <s.Row>
        <Tile board={board} x={0} y={1} onClick={() => { place(0,1) }}/>
        <Tile board={board} x={1} y={1} onClick={() => { place(1,1) }}/>
        <Tile board={board} x={2} y={1} onClick={() => { place(2,1) }}/>
      </s.Row>

      <s.Row>
        <Tile board={board} x={0} y={2} onClick={() => { place(0,2) }}/>
        <Tile board={board} x={1} y={2} onClick={() => { place(1,2) }}/>
        <Tile board={board} x={2} y={2} onClick={() => { place(2,2) }}/>
      </s.Row>
    </s.Board>
  )
}

export default Board