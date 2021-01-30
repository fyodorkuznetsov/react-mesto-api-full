import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup(props) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser(
      {
        name,
        about: description
      }
    );
  }

  return (
    <PopupWithForm title="Редактировать профиль" name="profile" buttonText="Сохранить" buttonDisabled={false} buttonClass="" isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="input__label">
        <input id="name-input" type="text" className="input__text input__text_type_name" placeholder="Имя" name="name" minLength="2" maxLength="40" required value={name} onChange={handleNameChange} />
        <span id="name-input-error" className="input__field-error"></span>
      </label>
      <label className="input__label">
        <input id="profession-input" type="text" className="input__text input__text_type_profession" placeholder="Профессия" name="profession" minLength="2" maxLength="200" required value={description} onChange={handleDescriptionChange} />
        <span id="profession-input-error" className="input__field-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
