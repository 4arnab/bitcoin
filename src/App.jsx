import { useState, useEffect } from "react";
import { Routes, Route } from "react-router";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import Header from "./components/Header";
import NotFoundPage from "./pages/notfound";
import CoinPage from "./pages/coin";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `${API_URL}&order=market_cap_des&per_page=${limit}&page=1&sparkline=false`
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
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
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              setLimit={setLimit}
              setSortBy={setSortBy}
              error={error}
              sortBy={sortBy}
              coins={coins}
              filter={filter}
              isLoading={isLoading}
              limit={limit}
              setFilter={setFilter}
              setCoins={setCoins}
            />
          }
        />
        <Route path="/coin/:id" element={<CoinPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
