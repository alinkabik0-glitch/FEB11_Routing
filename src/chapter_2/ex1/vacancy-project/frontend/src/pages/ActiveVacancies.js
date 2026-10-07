import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActiveVacancies } from '../store/vacanciesSlice';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const List = styled.div`display: flex; flex-direction: column; gap: 20px;`;
const Card = styled.div`border: 2px solid #6b7c93; border-radius: 4px; padding: 20px; background: white; display: flex; justify-content: space-between; align-items: center; cursor: pointer; &:hover { border-color: #4a90d9; } ${props => !props.active && 'opacity: 0.6; border-style: dashed;'}`;

const ActiveVacancies = () => {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.vacancies);

  useEffect(() => {
    dispatch(fetchActiveVacancies());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Active Vacancies</h2>
      <List>
        {list.map(v => (
          <Link to={`/active-vacancies/${v.id}`} key={v.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Card active={v.is_active === 1}>
              <div>
                <h3 style={{ margin: '0 0 8px 0' }}>{v.title} {v.is_active === 0 && '(Closed)'}</h3>
                <p style={{ margin: 0, color: '#6b7c93', fontSize: 14 }}>{v.short_description}...</p>
              </div>
              <span style={{ color: '#6b7c93' }}>👤 {v.response_count || 0} responses</span>
            </Card>
          </Link>
        ))}
      </List>
    </div>
  );
};
export default ActiveVacancies;