import styled from 'styled-components';
import Form from '../components/Form';


const Container = styled.div`
  width: 100vw;
  height:100vh;
  background-color: ${props => props.theme.bgColor};
`;

const H1 = styled.h1`
  color: ${props => props.theme.textColor}
`;

interface ChangeThemeProps {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

function Main({value, setValue}:ChangeThemeProps) {
  const onClick = () => {
    setValue((prev:boolean) => !prev);
  }

  return (
    <Container>
      {/*
        <Circle borderColor='yellow' bgColor="teal" />
        <Circle text="동그라미" bgColor="tomato" /> 
      */}
      <Form />
      <H1>행복하다</H1>
      <button onClick={onClick}>{value?'라이트모드':'다크모드'}</button>
    </Container>
  );
}

export default Main;
