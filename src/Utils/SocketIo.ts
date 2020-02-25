import React from 'react'
import io from 'socket.io-client'

interface Params {
  url: string
}

const useSocketIo = (params: Params) => {

  const [ client, setClient ] = React.useState<SocketIOClient.Socket>()

  React.useEffect(() => {
    const client = io(params.url)
    setClient(client)
  }, [params.url])

  return client
}

export default useSocketIo