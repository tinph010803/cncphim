import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword } from '../firebase'; // Import Firebase functions
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Start registration process
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Đăng ký thành công!');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // End registration process
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.heading}>Đăng ký</h2>
        <form onSubmit={handleRegister}>
          <div style={styles.inputGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              style={styles.inputField}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              required
              style={styles.inputField}
            />
          </div>

          <button
            type="submit"
            style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
            disabled={loading}
          >
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        <a href="/login" style={styles.link}>
          Đã có tài khoản? Đăng nhập ngay!
        </a>
      </div>
    </div>
  );
};

// Styles in JS (Inline styles)
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  box: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1.5rem',
    color: '#333',
  },
  inputGroup: {
    marginBottom: '1rem',
    width: '100%',
  },
  inputField: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
  },
  inputFieldFocus: {
    borderColor: '#4CAF50',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
    marginTop: '1rem',
  },
  link: {
    display: 'block',
    marginTop: '1rem',
    textDecoration: 'none',
    color: '#4CAF50',
    fontSize: '1rem',
  },
};

export default Register;
