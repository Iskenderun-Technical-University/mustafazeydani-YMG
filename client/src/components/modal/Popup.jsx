import React from 'react'
import "./popup.css"

function Popup({showPopup, handleClose}) {

  return (
    <div className="popup">
        <div className="popup-container">
          <button onClick={handleClose} className="popup-close">X</button>
          <h2>{showPopup.title}</h2>
          <p>{showPopup.description}</p>
        </div>
    </div>
  )
}

export default Popup