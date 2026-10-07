import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createVacancy } from '../store/vacanciesSlice';
import styled from 'styled-components';

const Form = styled.form`
  max-width: 700px;
  background: white;
  padding: 30px;
  border-radius: 8px;
  border: 2px solid #4a90d9;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #4a90d9;
  border-radius: 4px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #2c5aa0;
  }
`;

const TextArea = styled.textarea`
  padding: 12px;
  border: 1px solid #4a90d9;
  border-radius: 4px;
  min-height: 120px;
  font-size: 14px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #2c5aa0;
  }
`;

const Select = styled.select`
  padding: 12px;
  border: 1px solid #4a90d9;
  border-radius: 4px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: #2c5aa0;
  }
`;

const Label = styled.label`
  font-size: 14px;
  color: #2c3e50;
  margin-bottom: -10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 12px 30px;
  border: 2px solid ${props => props.danger ? '#e74c3c' : '#27ae60'};
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  background: white;
  color: ${props => props.danger ? '#e74c3c' : '#27ae60'};
  
  &:hover {
    background: ${props => props.danger ? '#e74c3c' : '#27ae60'};
    color: white;
  }
`;

const CreateVacancy = () => {
  const [form, setForm] = useState({ 
    title: '', 
    description: '', 
    englishLevel: 'B2', 
    grade: 'Middle', 
    tags: '' 
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const { error } = useSelector((state) => state.vacancies);

  const handleSubmit = (e) => {
    e.preventDefault();
    const tagsArray = form.tags.split(',').map(t => t.trim());
    dispatch(createVacancy({ ...form, tags: tagsArray })).then(() => {
      history.push('/active-vacancies');
    });
  };

  return (
    <div>
      <h2>Create Vacancy</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form onSubmit={handleSubmit}>
        <Label>Vacancy title</Label>
        <Input 
          placeholder="Vacancy title" 
          value={form.title} 
          onChange={e => setForm({...form, title: e.target.value})} 
          required 
        />
        
        <Label>Vacancy description</Label>
        <TextArea 
          placeholder="Vacancy description" 
          value={form.description} 
          onChange={e => setForm({...form, description: e.target.value})} 
          required 
        />
        
        <Label>English lvl</Label>
        <Select 
          value={form.englishLevel} 
          onChange={e => setForm({...form, englishLevel: e.target.value})}
        >
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
          <option value="C2">C2</option>
        </Select>
        
        <Label>Grade</Label>
        <Select 
          value={form.grade} 
          onChange={e => setForm({...form, grade: e.target.value})}
        >
          <option value="Junior">Junior</option>
          <option value="Middle">Middle</option>
          <option value="Senior">Senior</option>
          <option value="Lead">Lead</option>
        </Select>
        
        <Label>Tags</Label>
        <Input 
          placeholder="Tags (comma separated)" 
          value={form.tags} 
          onChange={e => setForm({...form, tags: e.target.value})} 
          required 
        />
        
        <ButtonContainer>
          <Button danger type="button" onClick={() => history.goBack()}>Close</Button>
          <Button type="submit">Save</Button>
        </ButtonContainer>
      </Form>
    </div>
  );
};

export default CreateVacancy;