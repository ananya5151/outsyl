import React from "react";
import "./TrendingBar.css";
import { useNavigate } from "react-router-dom";

const categories = [
  "Grungecore", "Old Money", "Techwear", "Dark Academia", "Minimalist",
  "Y2K", "Gorpcore", "Boho Chic", "Cottagecore", "Streetwear"
];

const TrendingBar = () => {
  const navigate = useNavigate();

  return (
    <div className="trending-bar">
      {categories.map((cat, index) => (
        <div key={index} className="trending-item" onClick={() => navigate("/trending")}>
          #{cat}
        </div>
      ))}
    </div>
  );
};

export default TrendingBar;
