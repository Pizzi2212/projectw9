import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'

function Welcome() {
  const [show, setShow] = useState(true)

  return (
    <>
      <Alert className="pt-5" show={show} variant="primary">
        <Alert.Heading>Benvenuto nel'App di Max D. Weather </Alert.Heading>
        <p>Cosa Indoserai oggi? Cannottiera?Felpa?Giacca? Scoprilo qui!!</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-primary">
            Chiudi e inizia!
          </Button>
        </div>
      </Alert>
    </>
  )
}

export default Welcome
