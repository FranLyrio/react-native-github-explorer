import React, { useCallback, useEffect, useState } from 'react';
import api from '../services/api';

import AsyncStorage from '@react-native-community/async-storage';

import { Controller, useForm } from 'react-hook-form';

import Icon from 'react-native-vector-icons/Feather';

import {
  Input,
  Button,
  Container,
  TextButton,
  TitleText,
  Form,
  RepositoryContainer,
  InformationContainer,
  TextFullName,
  TextDescription,
  Img
} from './styles'
import { FlatList, SafeAreaView, ScrollView } from 'react-native';

interface SearchedRepository {
  newRepo: string;
}

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const { control, handleSubmit, errors } = useForm();

  const storeData = useCallback(async () => {
      try {
        await AsyncStorage.setItem(
          '@GithubExplorer:repository',
          JSON.stringify(repositories),
        );
      } catch (error) {
      console.log(error);
    }
  }, [repositories]);

  const onSubmit = useCallback(async (data: SearchedRepository) => {
    const response = await api.get<Repository>(`/repos/${data.newRepo}`);
    repositories.push(response.data);

    setRepositories([...repositories]);

    storeData();
  }, [repositories]);

  useEffect(() => {
    const getDataFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('@GithubExplorer:repository');
        
        if (value) {
          const repos = JSON.parse(value);
          
          setRepositories([...repos]);
        }
      } catch (error) {
        console.log(error);
      }
    }

    getDataFromStorage();
  }, [repositories]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Container>
          <TitleText>
            Explore repositórios no Github.
          </TitleText>

          <Form>
            <Controller 
              control={control}
              name="newRepo"
              defaultValue=""
              render={({ onChange, onBlur, value }) => (
                <Input
                  placeholder="Digite aqui"
                  onBlur={onBlur}
                  value={value}
                  onChangeText={value => onChange(value)}
                />
              )}
            />

            <Button onPress={handleSubmit(onSubmit)}>
              <TextButton>
                Pesquisar
              </TextButton>
            </Button>
          </Form>

          {repositories.map((repo: Repository) => (
            <RepositoryContainer key={repo.full_name}>
              <Img
                source={{ uri: repo.owner.avatar_url }}
                style={{ width: 45, height: 45 }}
              />

              <InformationContainer>
                <TextFullName>{repo.full_name}</TextFullName>
                <TextDescription>{repo.description}</TextDescription>
              </InformationContainer>

              <Icon size={20} name="chevron-right" color="#c9c9d4" />
            </RepositoryContainer>
          ))}
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Dashboard;