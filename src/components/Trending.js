// components/Trending.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Trending.css";
import FeedCard from "./FeedCard";

const Trending = () => {
  const [trendingItems, setTrendingItems] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const trendingThemes = [
    "grunge", "techwear", "old money", "dark academia", "cottagecore",
    "vintage", "oversized", "minimal", "denim", "preppy","streetwear","goth","minimalist"
  ];

  useEffect(() => {
    const fetchTrendingItems = async () => {
      try {
        // Pick 3-5 random themes and fetch results for each
        const selectedThemes = trendingThemes
          .sort(() => 0.5 - Math.random())
          .slice(0, 6);

        const allItems = [];

        for (const theme of selectedThemes) {
          const res = await axios.post("https://outsyl-backend.onrender.com/recommendations/", {
            query: theme,
          });
          if (res.data?.recommendations?.length > 0) {
            // Pick a random item from the result for variety
            const randomItem = res.data.recommendations[
              Math.floor(Math.random() * res.data.recommendations.length)
            ];
            allItems.push(randomItem);
          }
        }

        setTrendingItems(allItems);
      } catch (err) {
        console.error("Error fetching trending items", err);
      }
    };

    fetchTrendingItems();
  }, [trendingThemes]);

  return (
    <div className="trending-container">
      <h2 className="trending-title">🔥 Trending Now</h2>
      <div className="trending-grid">
        {trendingItems.map((item, idx) => (
          <FeedCard key={idx} recommendation={item} />
        ))}
      </div>
    </div>
  );
};

export default Trending;
