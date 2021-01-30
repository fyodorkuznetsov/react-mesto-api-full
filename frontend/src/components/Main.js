import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <figure className="profile__avatar-wrap">
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" />
          <button className="profile__avatar-btn" aria-label="Редактировать аватар" onClick={props.onEditAvatar}></button>
        </figure>
        <div className="profile__info">
          <div className="profile__name-wrap">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace}>+</button>
      </section>
      <section className="places">
        {props.cards.map((card, i) => (
          <Card key={card._id} card={card} onPictureClick={props.onCardPictureClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
        ))}
      </section>
    </main>
  );
}

export default Main;
