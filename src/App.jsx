import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";
const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_des&per_page=10&page=1&sparkline=false";
function App() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        console.log(data);
        setCoins(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoins();
  }, []);
  return (
    <div>
      <h1>Crypto Dash 🚀</h1>
      {isLoading && <p>Loading ...</p>}
      {error && <div className="error">{error}</div>}
      {!isLoading && !error && (
        <main className="grid">
          {coins.map((coin) => (
            <CoinCard coin={coin} key={coin.id} />
          ))}
        </main>
      )}
    </div>
  );
}

export default App;
