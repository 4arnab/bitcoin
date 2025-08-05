import React from "react";
import { BarLoader } from "react-spinners";

const overRide = {
  display: "block",
  margin: "0 auto",
};
function Spinner({ color = "blue", size = 150 }) {
  return (
    <div>
      <BarLoader cssOverride={overRide} color={color} size={size} />
    </div>
  );
}

export default Spinner;
