import React, { useState } from 'react'
import styled from 'styled-components'

/**
 * TypeScript에게 bgColor를 styled-component에게도 보내고 싶은 경우
 * interface사용하고 styled-component에 <interfaceName>을 붙여준다
 */
interface ContainerProps {
  bgColor: string;
  /**
   * styled-component에서 사용하는 interface에는 borderColor를 required로 적어줌 (optional 아님)
   */
  borderColor: string;
}

const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${props => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${props => props.borderColor};
`;

interface CircleProps {
  bgColor: string;
  /**
   * required가 아닌 optional로 만들어 주려면 ?를 사용하면 됨
   */
  borderColor?: string;
  text?:string;
}

/**
 * TypeScript에 prop을 전달하는 방법
 * interface: 객체모양을 TypeScript에게 설명해주는 TypeScript의 개념
 */

// text='defalut text'로 기본값 주기 (es6)
const Circle = ({bgColor, borderColor, text='defalut text'}:CircleProps) => {
  /**
   * <number|string>는 value가 number, string 둘 다 될 수 있음
   * defalut값을 넣어주면 TypeScript가 추론해서 타입을 지정해주기 때문에 위와 같은 경우말고는 따로 지정해 줄 필요는 없음
   */
  const [value, setValue] = useState<number|string>(0);
  return (
    // borderColor이 undefined이면 bgColor라고 기본 값을 줌 -> 이렇게 하면 에러 해결
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>  
      {text}
    </Container>  
  )
}

export default Circle;