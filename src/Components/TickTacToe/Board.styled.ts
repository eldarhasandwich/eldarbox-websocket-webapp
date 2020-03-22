import styled from 'styled-components'

export const TileContent = styled.div`
  text-align: center;
  vertical-align: middle;

  width: 100%;
  height: 100%;

  font-size: 100px;
`

export const Tile = styled.div`
  color: green;

  flex-grow: 1;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-evenly;

  flex-grow: 1;

  width: 100vw;
  max-width: 500px;
`

export const Board = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  height: 500px;
`