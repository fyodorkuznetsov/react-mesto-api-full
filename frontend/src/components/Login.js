import React from 'react';

function Login(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email, password);
  }

  return (
    <section className="auth-container">
      <h3 className="auth-container__title">Вход</h3>
      <form className="input" action="#" name={props.name} encType="multipart/form-data" method="POST" noValidate onSubmit={handleSubmit} >
        <label className="input__label">
          <input id="email-input" type="email" className="input__text input__text_type_auth" placeholder="Email" name="email" value={email} required onChange={handleEmailChange} />
          <span id="email-input-error" className="input__field-error"></span>
        </label>
        <label className="input__label">
          <input id="password-input" type="password" className="input__text input__text_type_auth" placeholder="Пароль" name="password" value={password} required onChange={handlePasswordChange} />
          <span id="password-input-error" className="input__field-error"></span>
        </label>
        <button type="submit" className="input__btn input__btn_type_auth">Войти</button>
      </form>
    </section >
  );
}

export default Login;
