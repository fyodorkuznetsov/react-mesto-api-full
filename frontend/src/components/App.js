import React from 'react';
import { Route, Switch, useHistory, withRouter } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import ProtectedRoute from './ProtectedRoute';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import apiInstance from '../utils/api';

import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoTooltip';
import * as auth from '../utils/auth';



function App() {

  const [isEditProfilePopupOpen, setIsEditProfileClick] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlaceClick] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarClick] = React.useState(false);

  const [isInfoToolTipOpened, setIsInfoToolIpState] = React.useState(false);
  const [registerMessage, setRegisterMessage] = React.useState("");
  const [registerSuccessfull, setRegisterSuccessfull] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});
  const [isPicturePopupOpen, setIsPicturePopupOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({ name: 'Chuck Testa', avatar: 'https://i.ytimg.com/vi/LJP1DphOWPs/hqdefault.jpg', about: 'American Taxidermist' });
  const [userEmail, setUserEmail] = React.useState('');

  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);

  /*стейт для блокировки отрисовки контента до проверки токена */
  const [tokenChecked, setTokenChecked] = React.useState(false);

  const history = useHistory();

  const handleTokenCheck = () => {
    auth.checkToken()
      .then((res) => {
        if (res.data) {
          if (!!res.data.email) {
            setUserEmail(res.data.email);
          }
          setLoggedIn(true);
          setTokenChecked(true);
          history.push('/');
        } else {
          setLoggedIn(false);
          setTokenChecked(true);
          if(history.location.pathname !== '/sign-up'){
            history.push('/sign-in');
          }
        }
      })
      .catch(err => console.log(err));
  }


  React.useEffect(() => {
    handleTokenCheck();
    /* зависимость от location для запрета перемещения на sign-in sign-up и проверки токена после авторизации при перемещении по истории */
  }, [history.location.pathname]);

  React.useEffect(() => {
    apiInstance.getInitialCards().then((res) => {
      setCards(res.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [loggedIn]);

  React.useEffect(() => {
    apiInstance.getUserInfo()
      .then((res) => {
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    apiInstance.likeAction(card._id, isLiked).then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard.data : c);
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    apiInstance.removeCard(card._id).then((newCard) => {
      const newCards = cards.filter((c) => c._id !== card._id);
      setCards(newCards);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditProfileClick(false);
    setIsAddPlaceClick(false);
    setIsEditAvatarClick(false);
    setIsPicturePopupOpen(false);
    setIsInfoToolIpState(false);
    setSelectedCard({});
  }

  function handlePictureClick(card) {
    setSelectedCard(card);
    setIsPicturePopupOpen(true);
  }

  function handleUpdateUser(userData) {
    apiInstance.updateUserProfile(userData)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userData) {
    apiInstance.updateUserAvatar(userData.avatar)
      .then((res) => {
        setCurrentUser(res.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    return apiInstance.addNewCard(newCard)
      .then((res) => {
        setCards([res.data, ...cards]);
        closeAllPopups();
        return true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleRegister(email, password) {
    if (!email || !password) {
      return;
    }
    auth.register(email, password)
      .then(data => {
        setRegisterSuccessfull(!data.error);
        if (!data.error) {
          setRegisterMessage('Вы успешно зарегистрировались!');
        } else {
          setRegisterMessage(data.error);
        }
        setIsInfoToolIpState(true)
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleLogin(email, password) {
    if (!email || !password) {
      return;
    }
    auth.login(email, password)
      .then(() => {
          history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleLogout() {
    setLoggedIn(false);

  }

  return (
    tokenChecked && <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} userEmail={userEmail} handleLogout={handleLogout} />
        <Switch>
          <ProtectedRoute component={Main} exact path="/" loggedIn={loggedIn} cards={cards} onCardDelete={handleCardDelete} onCardLike={handleCardLike} onEditProfile={() => { setIsEditProfileClick(true) }} onAddPlace={() => { setIsAddPlaceClick(true) }} onEditAvatar={() => { setIsEditAvatarClick(true) }} onCardPictureClick={handlePictureClick} />
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
            <InfoToolTip isOpened={isInfoToolTipOpened} resultText={registerMessage} isSuccess={registerSuccessfull} onClose={closeAllPopups} />
          </Route>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
        </Switch>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <PopupWithForm title="Вы уверены?" name="confirm" buttonText="Да" buttonDisabled={false} buttonClass="input__btn_type_alone" onClose={closeAllPopups} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup card={selectedCard} isOpened={isPicturePopupOpen} onClose={closeAllPopups} />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
