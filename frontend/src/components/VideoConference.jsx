import React, { useState, useEffect, useRef } from 'react'

function VideoConferenceComp() {
  const [dataFromUser2, setDataFromUser2] = useState({
    name: '',
    content: '',
  })
  const apiRef = useRef(null)

  useEffect(() => {
    const scriptId = 'jitsi'
    let script = document.getElementById(scriptId)

    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.src = 'https://8x8.vc/vpaas-magic-cookie-15a65f78518d4474b1896c5505157fd8/external_api.js'
      script.async = true
      document.body.appendChild(script)
    }

    script.onload = () => {
      if (window.JitsiMeetExternalAPI) {
        apiRef.current = new window.JitsiMeetExternalAPI('8x8.vc', {
          roomName: 'vpaas-magic-cookie-15a65f78518d4474b1896c5505157fd8/780012',
          parentNode: document.querySelector('#jaas-container'),
        })
        apiRef.current.on('incomingMessage', (event) => {
          console.log(`Message received from ${event.from}: ${event.message}`);
          setDataFromUser2({ name: event.from, content: event.message });
        });
      }
      else {
        console.error('JitsiMeetExternalAPI not loaded')
      }
    }

    return () => {
      if (apiRef.current) {
        apiRef.current.dispose()
        apiRef.current = null
      }
    }
  }, [])

  const handleMessages = () => {
    console.log("minimo entre");
    const optionsPost = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataFromUser2)
    }
    try {
      fetch('http://localhost:3000/chatLog', optionsPost)
        .then(response => {
          if(!response.ok) {
            console.log("triste")
          }else{
            response.json()}})
        .then(response => {

          console.log(response)
        })
        .catch(err => console.error(err))
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <>
      <div id="jaas-container" style={{ height: '90vh' }} />
      <button onClick={ handleMessages}>Guardar mensajes recibidos</button>

    </>

  )
}

export default VideoConferenceComp
