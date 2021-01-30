import React from 'react';
import logo from '../images/logo.svg';
import NavBar from './NavBar';

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Проект Место" />
      {/* компонент вывода меню / инфо профиле */}
      <NavBar loggedIn={props.loggedIn} userEmail={props.userEmail} handleLogout={props.handleLogout} />
    </header>
  );
}

export default Header;
