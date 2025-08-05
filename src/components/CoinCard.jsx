import { Link } from "react-router";

function CoinCard({ coin }) {
  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="coin-card">
        <div className="coin-header">
          <img src={coin.image} alt={coin.name} className="coin-image" />
          <div>
            <h2>{coin.name}</h2>
            <p className="symbol">{coin.symbol.toUpperCase()}</p>
          </div>
        </div>
        <p>Price: {coin.current_price.toLocaleString()}</p>
        <p
          className={
            coin.price_change_percentage_24h >= 0 ? "positive" : "negative"
          }
        >
          {coin.price_change_percentage_24h.toFixed(5)} %
        </p>
        <p>Market Cap: {coin.market_cap.toLocaleString()}</p>
        <p>
          Total Volume:
          <strong> {coin.total_volume.toLocaleString()}</strong>
        </p>
        <p>
          Low 24:
          <strong> {coin.low_24h}</strong>
        </p>
        <p>
          Last Updated:
          <strong> {new Date(coin.last_updated).toDateString()}</strong>
        </p>
      </div>
    </Link>
  );
}

export default CoinCard;
