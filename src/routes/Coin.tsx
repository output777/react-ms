import {useState, useEffect} from 'react';
import {useLocation, useParams, Outlet, Link, useMatch} from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoinInfo, fetchCoinTickers } from '../api';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet-async';

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
  background-color: rgba(0,0,0,0.5);
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

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2,1fr);
  margin: 25px 0px;
  gap: 10px;
`

const Tab = styled.span<{isActive: boolean}>`
  text-align:center;
  text-transform: uppercase;
  font-size:12px;
  font-weight:400;
  background-color: rgba(0,0,0,0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${props => props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
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
  const {coinId} = useParams();
  const {state} = useLocation();
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');
  const {isLoading: infoLoading, data: infoData} = useQuery<InfoDate>(['info', coinId], () => fetchCoinInfo(coinId))
  const {isLoading: tickersLoading, data: tickersData} = useQuery<PriceDate>(['tickers',coinId], () => fetchCoinTickers(coinId), {
    refetchInterval: 5000,
  })

/*   const [loading, setLoading] = useState(true);
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
  }, [coinId]); */

  const loading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</title>
      </Helmet>
      <Header>
        <Title>{state?.name ? state.name : loading ? "Loading..." : infoData?.name}</Title>
      </Header>
      {loading 
      ? <Loader>Loading...</Loader> 
      :
      <>
        <Overview>
          <OverviewItem>
            <span>rank:</span>
            <span>{infoData?.rank}</span>
          </OverviewItem>
          <OverviewItem>
            <span>symbol:</span>
            <span>${infoData?.symbol}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Price:</span>
            <span>${tickersData?.quotes.USD.price}</span>
          </OverviewItem>
        </Overview>
        <Description>
          {infoData?.description}
        </Description>
        <Overview>
          <OverviewItem>
            <span>total supply:</span>
            <span>{tickersData?.total_supply}</span>
          </OverviewItem>
          <OverviewItem>
            <span>max supply:</span>
            <span>{tickersData?.max_supply}</span>
          </OverviewItem>
        </Overview>
        <Tabs>
          <Tab isActive={chartMatch !== null}>
            <Link to={`/${coinId}/chart`}>Chart</Link>
          </Tab>
          <Tab isActive={priceMatch !== null}>
            <Link to={`/${coinId}/price`}>Price</Link>
          </Tab>
        </Tabs>
        <Outlet context={{coinId}} />
      </>
      } 
      </Container>
  )
}

export default Coin;