import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedCard from "./FeedCard";
import "./Feed.css"; // Using Feed.css for consistent styling

const Explore = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Fetching recommendations for a specific query ("jackets")
        const res = await axios.post("http://localhost:8000/recommendations/", {
          query: "tshirts"
        });
        setRecommendations(res.data.recommendations);
      } catch (err) {
        console.error("Error fetching recommendations", err);
      }
    };
    fetchRecommendations();
  }, []);

  return (
    <div className="main-content">
      <h2 className="feed-title">⚡ Explore</h2>
      <div className="feed-grid">
        {recommendations.map((item, idx) => (
          <FeedCard key={idx} recommendation={item} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
