import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { login } from '../store/authSlice';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Form = styled.form`
  border: 2px solid #6b7c93;
  padding: 40px;
  border-radius: 8px;
  background: white;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const Button = styled.button`
  padding: 10px;
  background: #4a90d9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  &:hover { background: #357abd; }
`;

const Login = () => {
  const [formData, setFormData] = useState({ login: '', password: '' });
  const dispatch = useDispatch();
  const history = useHistory();
  const { error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData)).then((res) => {
      if (!res.error) history.push('/vacancies');
    });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center', margin: 0 }}>Login</h2>
        {error && <p style={{ color: 'red', fontSize: 12 }}>{error}</p>}
        <Input placeholder="Login" value={formData.login} onChange={e => setFormData({...formData, login: e.target.value})} required />
        <Input type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
        <Button type="submit">Sign In</Button>
        <div style={{ textAlign: 'center', fontSize: 12 }}>
          <Link to="/signup">Create an account (Seeker)</Link><br/>
          <Link to="/company-signup">Create an account (Company)</Link>
        </div>
      </Form>
    </Container>
  );
};

export default Login;