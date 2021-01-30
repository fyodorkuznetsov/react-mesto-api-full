import React from 'react';

function PopupWithForm(props) {

  const popupClass = `popup popup_type_${props.name}${props.isOpened ? ' popup_state_opened' : ''}`;
  const buttonClass = `input__btn ${!!props.buttonClass ? props.buttonClass : ''}`;

  /**Насчёт кнопки - помимо текста кнопки, отличаются начальное состояние и есть доп классы у разных попапов:)
   * Поэтому, мне всё-таки кажется, что удобнее было бы всё-таки оставить кнопку в children
   * */
  return (
    <section className={popupClass}>
      <div className="popup__container">
        <h3 className="popup__title">{props.title}</h3>
        <form className={`input input_type_${props.name}`} onSubmit={props.onSubmit} action="#" name={props.name} encType="multipart/form-data" method="POST" noValidate>
          {props.children}
          <button type="submit" className={buttonClass} disabled={props.buttonDisabled}>{props.buttonText}</button>
        </form>
        <button type="button" className="popup__close-btn" onClick={props.onClose}></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
