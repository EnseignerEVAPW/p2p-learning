import React, { useEffect, useRef } from 'react'

function VideoConferenceComp() {
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

  return (
    <>
      <div id="jaas-container" style={{ height: '100vh' }} />
    </>

  )
}

export default VideoConferenceComp
