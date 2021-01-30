import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace(
      {
        name,
        link
      }
    )
    .then(success => {
      if(success){
        setName('');
        setLink('');
      }
    });
  }

  return (
    <PopupWithForm title="Новое место" name="place" buttonText="Создать" buttonDisabled={false} buttonClass="" isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="input__label">
        <input id="place-input" type="text" className="input__text input__text_type_place-title" placeholder="Название" name="place-title" minLength="2" maxLength="30" required  onChange={handleNameChange} value={name}/>
        <span id="place-input-error" className="input__field-error"></span>
      </label>
      <label className="input__label">
        <input id="place-img-input" type="url" className="input__text input__text_type_place-img" placeholder="Ссылка на картинку" name="place-img" required onChange={handleLinkChange} value={link}/>
        <span id="place-img-input-error" className="input__field-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
