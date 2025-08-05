import { useState, useEffect } from "react";
import { useRoutes, Router, useParams, Link } from "react-router";
import Spinner from "../components/Spinner";

const API_URL = import.meta.env.VITE_COIN_API_URL;
function CoinPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setCoin(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="coin-details-container">
      <Link to="/">Bck to home</Link>
      <h2 className="coin-details-title">
        {coin ? `${coin.name} (${coin.symbol}) ` : "Coin details"}
      </h2>

      {!isLoading && !error && (
        <>
          <img src={coin.image.large} alt={coin.name} />
          <p>{coin.description.en.split(".")[0]}</p>

          <div className="coin-details-info">
            <h3>Rank: #{coin.market_cap_rank}</h3>
            <h3>Currency Price: {coin.market_data.current_price.usd} USD</h3>
            <h4>
              Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}
            </h4>
            <h4>24h High: ${coin.market_data.high_24h.usd.toLocaleString()}</h4>
            <h4>24h Low: ${coin.market_data.low_24h.usd.toLocaleString()}</h4>
            <h4>
              24h Price Change: ${coin.market_data.price_change_24h.toFixed(2)}{" "}
              ({coin.market_data.price_change_percentage_24h.toFixed(2)}%)
            </h4>
            <h4>
              Circulating Supply:{" "}
              {coin.market_data.circulating_supply.toLocaleString()}
            </h4>
            <h4>
              Total Supply:{" "}
              {coin.market_data.total_supply?.toLocaleString() || "N/A"}
            </h4>
            <h4>
              All-Time High: ${coin.market_data.ath.usd.toLocaleString()} on{" "}
              {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
            </h4>
            <h4>
              All-Time Low: ${coin.market_data.atl.usd.toLocaleString()} on{" "}
              {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
            </h4>
            <h4>
              Last Updated: {new Date(coin.last_updated).toLocaleDateString()}
            </h4>
          </div>
          {coin.categories.length > 0 && (
            <p>Categories: {coin.categories.join(", ")}</p>
          )}
        </>
      )}

      {!isLoading && !error && !coin && (
        <p className="error-message">No coin found with that symbol</p>
      )}
    </div>
  );
}

export default CoinPage;
