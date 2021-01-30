import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar(props) {
  if (props.loggedIn && props.userEmail) {
    return (
      <div className="menu">
        <span className="menu__item">{props.userEmail}</span>
        <button type="button" className="menu__item menu__item_type_exit" onClick={props.handleLogout}>Выйти</button>
      </div>
    );
  } else {
    return (
      <nav className="menu">
        <NavLink className="menu__item" activeClassName="menu__item_state_active" to="/sign-in">Войти</NavLink>
        <NavLink className="menu__item" activeClassName="menu__item_state_active" to="/sign-up">Регистрация</NavLink>
      </nav>
    );
  }
}

export default NavBar;
