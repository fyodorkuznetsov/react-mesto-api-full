import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card(props) {

  const [isOwn, setIsOwn] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(false);

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setIsOwn(props.card.owner === currentUser._id);
    setIsLiked(props.card.likes.some(i => i === currentUser._id));
  }, [currentUser, props.card]);

  function handleClick() {
    props.onPictureClick(props.card);
  }

  function handleLike() {
    props.onCardLike(props.card);
  }

  function handleDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <article className="places__place">
      <figure className="places__picture-wrap">
        <img src={props.card.link} alt={props.card.name} className="places__picture" onClick={handleClick}/>
      </figure>
      <div className="places__title-wrap">
        <h2 className="places__title">{props.card.name}</h2>
        <div className="places__like">
          <button type="button" onClick={handleLike} className={isLiked ? 'places__like-btn places__like-btn_state_active' : 'places__like-btn'}></button>
          <p className="places__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
      <button type="button" onClick={handleDelete} className={`places__remove ${isOwn ? '' : 'places__remove_hidden'}`}></button>
    </article>
  );
}

export default Card;
