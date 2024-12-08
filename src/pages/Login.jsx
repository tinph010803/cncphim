import React, { useState, useEffect } from 'react';
import { auth, signInWithEmailAndPassword } from '../firebase'; // Import Firebase functions
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [rememberMe, setRememberMe] = useState(false); // Nhớ tôi checkbox
  const navigate = useNavigate();

  // Kiểm tra trạng thái đăng nhập khi trang Login được mở
  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      navigate('/'); // Nếu đã đăng nhập, chuyển hướng đến trang chủ
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu quá trình đăng nhập
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (rememberMe) {
        // Lưu thông tin đăng nhập nếu nhớ tôi được chọn
        localStorage.setItem('email', email);
      }
      alert('Đăng nhập thành công!');
      console.log('Điều hướng đến trang chính');
      
      // Điều hướng sau khi đăng nhập thành công
      navigate('/'); // Redirect to homepage after successful login
    } catch (error) {
      setError(error.message); // Set error if login fails
    } finally {
      setLoading(false); // Kết thúc quá trình đăng nhập
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.heading}>Đăng nhập</h2>
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              required
              style={styles.inputField}
            />
          </div>

          <div style={styles.inputGroup}>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Mật khẩu'
              required
              style={styles.inputField}
            />
          </div>

          <div style={styles.checkboxContainer}>
            <input 
              type='checkbox' 
              checked={rememberMe} 
              onChange={() => setRememberMe(!rememberMe)} 
            />
            <label style={{ marginLeft: '5px' }}>Nhớ tôi</label>
          </div>

          <button
            type='submit'
            style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}

        <a href='/register' style={styles.link}>
          Chưa có tài khoản? Đăng ký ngay!
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
    backgroundColor: '#f4f4f4'
  },
  box: {
    background: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#333'
  },
  inputGroup: {
    marginBottom: '1rem',
    width: '100%'
  },
  inputField: {
    width: '100%',
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box'
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1.2rem',
    cursor: 'pointer',
    transition: 'background-color 0.3s'
  },
  buttonDisabled: {
    backgroundColor: '#aaa'
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
    marginTop: '1rem'
  },
  link: {
    display: 'block',
    marginTop: '1rem',
    textDecoration: 'none',
    color: '#4CAF50'
  }
};

export default Login;
