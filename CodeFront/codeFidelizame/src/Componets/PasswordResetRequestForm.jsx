import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestPasswordReset } from '../Redux/Actions/actions';

const PasswordResetRequestForm = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestPasswordReset(email));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Enter your email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Enviar Correo de Recuperación</button>
    </form>
  );
};

export default PasswordResetRequestForm;
