import styled from 'styled-components'
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
import path from 'path';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items:center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: #fff;
  color: ${props => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items:center;
    padding:20px;
    transition: color 0.2s ease-in;
    // block으로 변경해줘서 끝부분을 눌러도 링크될 수 있게 만듬 -> 그런데 display:flex하면 block 지워도 됨
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`
const Loader = styled.span`
  text-align: center;
  display: block;
  padding: 20px;
`

const Img = styled.img`
  width:35px;
  height:35px;
  margin-right: 10px;
`

interface CoinInterface {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string,
}

const Coins = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    /**
     * 함수를 바로 실행시키는 팁
     * (() => console.log(1))();
     */
    (async() => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const json = await response.json();
      setCoins(json.slice(0,100));
      setLoading(false);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>코인</Title>
      </Header>
      {loading ? 
        <Loader>Loading...</Loader> 
        :
        <CoinsList>
          {coins.map(coin => 
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`} state={{name:coin.name}}>
            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
            {coin.name} &rarr;
            </Link> 
          </Coin>
          )}
        </CoinsList>
      }
    </Container>
  )
}

export default Coins