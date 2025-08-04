import { useState, useEffect } from "react";
import CoinCard from "./components/CoinCard";
import LimitSelector from "./components/LimitSelector";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `${API_URL}&order=market_cap_des&per_page=${limit}&page=1&sparkline=false`
        );
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
  }, [limit]);
  return (
    <div>
      <h1>Crypto Dash 🚀</h1>
      {isLoading && <p>Loading ...</p>}
      <LimitSelector limit={limit} onLimitChange={setLimit} />
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
