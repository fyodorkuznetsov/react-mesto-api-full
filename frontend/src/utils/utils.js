import Card from '../components/Card.js';
import PopupWithForm from '../components/PopupWithForm.js';

export const createCardMarkup = ({item, picturePopup, apiInstance}) => {
  const card = new Card(
    {
      data: item,
      cardSelector: '#place-template',
      cardClickHandler : (link, title) => {
        picturePopup.open(link, title);
      },
      deleteHandler: () => {
        const confirmPopup = new PopupWithForm(
          {
            popupSelector: '.popup_type_confirm',
            handleFormSubmit: () => {
              apiInstance.removeCard(item.id)
              .then((res) => {
                card.removeElement();
                confirmPopup.close();
              })
              .catch((err) => {
                console.log(err);
              });
            }
          }
        );
        confirmPopup.setEventListeners();
        confirmPopup.open();
      },
      likeHandler: () => {
        const method = card.isLiked() ? 'DELETE' : 'PUT';
        apiInstance.likeAction(item.id, method)
              .then((res) => {
                card.processLikeBtnClick();
                card.updateLikeCounter(res.likes.length);
              })
              .catch((err) => {
                console.log(err);
              });
      }
    }
  )
  return card.generateCard();
}
