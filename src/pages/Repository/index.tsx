import React, { useCallback, useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native'
import { ScrollView, View } from 'react-native';
import api from '../../services/api';

import { 
  Issue,
  ProfileContainer,
  RepositoryContainer,
  Img,
  ContentProfile,
  Container,
  Stars,
  IssueView,
  Title,
  SubTitle
} from './style'

import Icon from 'react-native-vector-icons/Feather';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  user: {
    login: string;
  }
}

interface RepositoryParams {
  full_name: string;
}

const Repository: React.FC = () => {
  const route = useRoute();
  const params = route.params as RepositoryParams;

  const [repositoryName] = useState(params.full_name);
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      const [responseRepository, responseIssues] = await Promise.all([
        api.get(`/repos/${repositoryName}`),
        api.get(`/repos/${repositoryName}/issues`),
      ]);
  
      setRepository(responseRepository.data);
      setIssues(responseIssues.data);
    }

    loadData();
  }, [repositoryName]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          {repository && (
            <View>
              <ProfileContainer>
                <Img
                  source={{uri: repository.owner.avatar_url}}
                  style={{ width: 50, height: 50 }}
                />

                <ContentProfile>
                  <Title>{repository.full_name}</Title>
                  <SubTitle>{repository.description}</SubTitle>
                </ContentProfile>
              </ProfileContainer>

              <RepositoryContainer>
                <Stars>
                  <Title>{repository.stargazers_count}</Title>
                  <SubTitle>Stars</SubTitle>
                </Stars>

                <Stars>
                  <Title>{repository.forks_count}</Title>
                  <SubTitle>Forks</SubTitle>
                </Stars>

                <Stars>
                  <Title>{repository.open_issues_count}</Title>
                  <SubTitle>Issues Abertas</SubTitle>
                </Stars>
              </RepositoryContainer>
            </View>
          )} 

          {issues && issues.map((issue: Issue) => (
            <Issue key={issue.id}>
              <IssueView>
                <Title>{issue.title}</Title>
                <SubTitle>{issue.user.login}</SubTitle>
              </IssueView>
              <Icon name="chevron-right" color="#c9c9d4"/>
            </Issue>
          ))}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Repository;