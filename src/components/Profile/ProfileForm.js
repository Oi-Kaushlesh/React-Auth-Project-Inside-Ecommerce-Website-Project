import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import AuthContext from '../../store/auth-context';
import { useHistory } from "react-router-dom";

const ProfileForm = () => {
  const history = useHistory();

  const newPasswordInputRef = useRef();

  const authCtx = useContext(AuthContext);
  const submitHandler = (event) => {

    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;
    // add validation
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAiOs1iUhJxoG_bOV3-8v55Femyrqc5YpI',{
      method: 'POST',
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: false
      }), 
      headers: {
        'content-type' : 'application/json'
      }
    }).then(res => {
      // assumption: Always Succeeds!

      history.replace('/');
    });
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
