// import React from 'react'
import io from 'socket.io-client'

const useSocketIo = () => {
  const URL = 'http://localhost:1111'
  const client = io(URL)
  
  client.on('blah', () => {
    console.log('got message')
  })

  return client
}

export default useSocketIo