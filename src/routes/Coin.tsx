import React, {useState, useEffect} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import styled from 'styled-components';

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

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`
const Loader = styled.span`
  text-align: center;
  display: block;
  padding: 20px;
`

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
  box-sizing:border-box;
  background-color: #111;
  border-radius:16px;
`

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;

  span:first-child {
    font-size:12px;
    font-weight: 400;
    text-transform: uppercase;
    padding-bottom: 5px;
  }
`

const Description = styled.p`
  margin: 20px 0;
`

interface ITag {
  coin_counter: number;
  ico_counter: number;
  id: string;
  name: string;
}

interface InfoDate {
  id:string;
  name:string;
  symbol:string;
  rank:number;
  is_new:boolean;
  is_active:boolean;
  type:string;
  logo:string;
  tags: ITag[]
  description:string;
  message:string;
  open_source:boolean;
  started_at:string;
  development_status:string;
  hardware_wallet:boolean;
  proof_type:string;
  org_structure:string;
  hash_algorithm:string;
  first_data_at:string;
  last_data_at:string;
}



interface PriceDate {
  id:string;
  name:string;
  symbol:string;
  rank:number;
  circulating_supply:number;
  total_supply:number;
  max_supply:number;
  beta_value:number;
  first_data_at:string;
  last_updated:string;
  quotes: {
    USD: {
      ath_date:string;
      ath_price:number;
      market_cap:number;
      percent_change_1h:number;
      percent_change_1y:number;
      percent_change_6h:number;
      percent_change_7d:number;
      percent_change_12h:number;
      percent_change_15m:number;
      percent_change_24h:number;
      percent_change_30d:number;
      percent_change_30m:number;
      percent_from_price_ath:number;
      price:number;
      volume_24h:number;
      volume_24h_change_24h:number;
    }
  }
}


const Coin = () => {
  const [loading, setLoading] = useState(true);
  const {coinId} = useParams();
  const {state} = useLocation();
  const [info, setInfo] = useState<InfoDate>();
  const [priceInfo, setPriceInfo] = useState<PriceDate>();
  
  useEffect(() => {
    (async () => {
      // 캡슐화
      const infoData = await (await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)).json();
      const priceDate = await (await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)).json();
      setInfo(infoData);
      setPriceInfo(priceDate);
      setLoading(false);
    })();
  }, [coinId]);



  return (
    <Container>
      <Header>
        <Title>{state?.name ? state.name : loading ? "Loading..." : info?.name}</Title>
      </Header>
      {loading 
      ? <Loader>Loading...</Loader> 
      :
      <>
        <Overview>
          <OverviewItem>
            <span>rank:</span>
            <span>{info?.rank}</span>
          </OverviewItem>
          <OverviewItem>
            <span>symbol:</span>
            <span>${info?.symbol}</span>
          </OverviewItem>
          <OverviewItem>
            <span>open source:</span>
            <span>{info?.open_source}</span>
          </OverviewItem>
        </Overview>
        <Description>
          {info?.description}
        </Description>
        <Overview>
          <OverviewItem>
            <span>total supply:</span>
            <span>{priceInfo?.total_supply}</span>
          </OverviewItem>
          <OverviewItem>
            <span>max supply:</span>
            <span>{priceInfo?.max_supply}</span>
          </OverviewItem>
        </Overview>
      </>
      } 
      </Container>
  )
}

export default Coin;