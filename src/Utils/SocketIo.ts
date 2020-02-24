import React from 'react'
import io from 'socket.io-client'

interface Params {
  url: string
}

const useSocketIo = (params: Params) => {

  const [ client, setClient ] = React.useState<SocketIOClient.Socket>()

  React.useEffect(() => {
    setClient(io(params.url))
  }, [])

  return client
}

export default useSocketIo