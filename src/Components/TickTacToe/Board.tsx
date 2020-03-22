import React from 'react'

const Token: React.FC<{
  token: number
}> = (props) => {
  

  if (props.token === 1) {
    return (
      <span>
        X
      </span>
    )
  }

  if (props.token === 2) {
    return (
      <span>
        O
      </span>
    )
  }

  return (
    <span>
      -
    </span>
  )
}

const Board: React.FC<{
  board: any
}> = (props) => {
  console.log('board render')

  return (
    <div>
      <Token token={0} />
      <Token token={0} />
      <Token token={0} />
      <br/>
      <Token token={0} />
      <Token token={0} />
      <Token token={0} />
      <br/>
      <Token token={0} />
      <Token token={0} />
      <Token token={0} />
    </div>
  )
}

export default Board