import React from 'react'

import * as s from './Board.styled'

const Tile: React.FC<{
  board: any,
  xPosition: 0 | 1 | 2,
  yPosition: 0 | 1 | 2
}> = (props) => {
  
  const x = props.xPosition
  const y = props.yPosition

  if (props.board[x][y] === 1) {
    return (
      <s.Tile>
        <s.TileContent>
          X
        </s.TileContent>
      </s.Tile>
    )
  }

  if (props.board[x][y] === 2) {
    return (
      <s.Tile>
        <s.TileContent>
          O
        </s.TileContent>
      </s.Tile>
    )
  }

  return (
    <s.Tile>
      <s.TileContent>
        -
      </s.TileContent>
    </s.Tile>
  )
}

const Board: React.FC<{
  board: any
}> = (props) => {

  const { board } = props

  return (
    <s.Board>
      <s.Row>
        <Tile board={board} xPosition={0} yPosition={0}/>
        <Tile board={board} xPosition={1} yPosition={0}/>
        <Tile board={board} xPosition={2} yPosition={0}/>
      </s.Row>

      <s.Row>
        <Tile board={board} xPosition={0} yPosition={1}/>
        <Tile board={board} xPosition={1} yPosition={1}/>
        <Tile board={board} xPosition={2} yPosition={1}/>
      </s.Row>

      <s.Row>
        <Tile board={board} xPosition={0} yPosition={2}/>
        <Tile board={board} xPosition={1} yPosition={2}/>
        <Tile board={board} xPosition={2} yPosition={2}/>
      </s.Row>
    </s.Board>
  )
}

export default Board