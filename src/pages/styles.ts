import styled from 'styled-components/native';

export const Container = styled.View`
  margin: 10px;
  padding: 20px;
`;

export const Form = styled.View`
  flex-direction: row;
`;

export const TitleText = styled.Text`
  color: #3a3a3a;
  font-size: 32px;
  padding: 20px;
  margin-bottom: 50px;
`;

export const Input = styled.TextInput`
  background-color: #ffffff;
  flex: 1;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 10px;
  color: #3a3a3a;
`;

export const Button = styled.TouchableOpacity`
  background-color: #04D361;
  width: 100px;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  justify-content: center;
  align-items: center;
`;

export const TextButton = styled.Text`
  color: #ffffff;
`;

export const RepositoryContainer = styled.View`
  flex-direction: row;
  background-color: #ffffff;

  align-items: center;
  justify-content: center;
  margin-top: 12px;

  border-radius: 5px;
`;

export const InformationContainer = styled.View`
  flex: 1;
  margin: 10px;
`;

export const TextFullName = styled.Text`
  font-size: 18px;
  color: #3D3D4D;
`;

export const TextDescription = styled.Text`
  color: #A8A8B3;
`;

export const Img = styled.Image`
  margin: 10px;
`;