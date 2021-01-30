import React from 'react';

function ImagePopup(props) {

  return (
    <section className={`popup popup_type_picture ${props.isOpened ? ' popup_state_opened' : ''}`}>
      <div className="popup__picture-container">
        <img src={props.card.link} className="popup__picture" alt={props.card.name} />
        <p className="popup__picture-title">{props.card.name}</p>
        <button type="button" className="popup__close-btn" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default ImagePopup;
