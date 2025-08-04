import { useRoutes, Router, useParams } from "react-router";
function CoinPage() {
  const params = useParams();
  console.log(params.id);
  return <div>CoinPage</div>;
}

export default CoinPage;
