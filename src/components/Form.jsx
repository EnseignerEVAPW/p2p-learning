import React, { useState } from 'react'

function FormReport() {
  const [emocion, setEmocion] = useState('')

  const manejoEmocion = (feel) => {
    setEmocion(feel)
  }

  const style = {
    body: {
      color: 'black',
    },
    titulo: {
      color: '#D9436B',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '2rem',
      marginBottom: '5px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '20px',
      gap: '10px',
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
      padding: '40px',
      borderRadius: '20px',
      width: '60%',
      backgroundColor: 'thistle',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      lineHeight: '2.1',
    },

    sorpresa: {
      color: 'thistle',
      textTransform: 'capitalize',
      fontSize: '1.2rem',
      textAlign: 'center',
    },

    button: {
      background: '#d95786',
      padding: '5px',
      color: 'white',
      borderRadius: '10px',
      textDecoration: 'none',
      margin: '20px',
      textAlign: 'center',
      width: '100px',
      alignSelf: 'center',
    },
  }
  return (
    <div style={style.body}>
      <h1 style={style.titulo}>Formulario para reporte</h1>
      <div style={style.containerForm}>
        <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'center' }}>
            <div class="col">
              <img src="/emociones/happy.png" alt="happy-face" onClick={() => { manejoEmocion('feliz') }} />
            </div>
            <div class="col" onClick={() => { manejoEmocion('triste') }}>
              <img src="/emociones/sad.png" alt="sad-face" />
            </div>
            <div class="col" onClick={() => { manejoEmocion('sorprendido') }}>
              <img src="/emociones/surprised.png" alt="surprised-face" />
            </div>
            <div class="col" onClick={() => { manejoEmocion('pensativo') }}>
              <img src="/emociones/thinking.png" alt="thinked-face" />
            </div>
            <div class="col" onClick={() => { manejoEmocion('encantado') }}>
              <img src="/emociones/loved.png" alt="heart" />
            </div>
          </div>
        </div>
        <div style={style.sorpresa}>
          {emocion}
        </div>
        <form style={style.form}>
          <div style={style.box}>
            <label for="customRange1" className="form-label">Grado de Satisfacción</label>
            <input type="range" className="form-range" id="customRange1" />
            <div className="Resolucion">
              <label htmlFor="resuelto">¿Lograron resolver el ejercicio?</label>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                <label className="form-check-label" for="flexRadioDefault1">Sí</label>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                <label className="form-check-label" for="flexRadioDefault2">No</label>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label for="exampleFormControlTextarea1" className="form-label">Comentarios</label>
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" style={{ formSizing: 'content' }}></textarea>
            </div>

            <a style={style.button} href="">Enviar</a>
          </div>
        </form>
      </div>
    </div>
  )
}
export default FormReport
