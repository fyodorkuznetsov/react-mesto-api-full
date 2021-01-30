import React from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup(props) {

  const avatarRef = React.createRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm title="Обновить аватар" name="avatar" buttonText="Сохранить" buttonDisabled={false} buttonClass="" isOpened={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <label className="input__label">
        <input id="avatar-input" ref={avatarRef} type="url" className="input__text input__text_type_avatar" placeholder="Ссылка на картинку" name="avatar" required />
        <span id="avatar-input-error" className="input__field-error"></span>
      </label>
    </PopupWithForm>
  );

}

export default EditAvatarPopup;
