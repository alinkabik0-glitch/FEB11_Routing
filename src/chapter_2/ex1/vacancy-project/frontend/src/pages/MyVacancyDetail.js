import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVacancyById, cancelResponse, fetchMyVacancies } from '../store/vacanciesSlice';
import styled from 'styled-components';

const DetailContainer = styled.div`
  background: white;
  border: 2px solid #6b7c93;
  border-radius: 8px;
  padding: 30px;
  max-width: 900px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  margin: 0;
  flex: 1;
`;

const MetaTags = styled.div`
  display: flex;
  gap: 10px;
`;

const Tag = styled.span`
  padding: 6px 12px;
  border: 1px solid #4a90d9;
  border-radius: 4px;
  font-size: 12px;
  color: #4a90d9;
  background: white;
`;

const DescBlock = styled.div`
  background: #d8b4fe;
  padding: 30px;
  border-radius: 4px;
  margin: 20px 0;
  color: #2c3e50;
  font-size: 16px;
  min-height: 150px;
`;

const ContactsSection = styled.div`
  margin: 30px 0;
`;

const ContactsTitle = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: 2px solid #e74c3c;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  font-size: 14px;
  background: white;
  color: #e74c3c;
  
  &:hover {
    background: #e74c3c;
    color: white;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #4a90d9;
  cursor: pointer;
  font-size: 14px;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const MyVacancyDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { current: v, loading } = useSelector((state) => state.vacancies);

  useEffect(() => {
    dispatch(fetchVacancyById(id));
  }, [dispatch, id]);

  if (loading || !v) return <p>Loading...</p>;

  const handleCancel = () => {
    dispatch(cancelResponse(id)).then(() => {
      dispatch(fetchMyVacancies());
      history.push('/my-vacancies');
    });
  };

  const tagsArray = v.tags ? v.tags.split(',').map(t => t.trim()) : [];

  return (
    <DetailContainer>
      <Header>
        <Title>{v.title}</Title>
        <MetaTags>
          <Tag>{v.english_level}</Tag>
          <Tag>{v.grade}</Tag>
        </MetaTags>
      </Header>
      
      <DescBlock>{v.description}</DescBlock>
      
      <ContactsSection>
        <ContactsTitle>Contacts</ContactsTitle>
        <TagsContainer>
          {tagsArray.map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </TagsContainer>
      </ContactsSection>
      
      <ButtonContainer>
        <Button onClick={handleCancel}>Cancel response</Button>
      </ButtonContainer>
      
      <BackButton onClick={() => history.goBack()}>← Back</BackButton>
    </DetailContainer>
  );
};

export default MyVacancyDetail;