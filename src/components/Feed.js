import React, { useEffect, useState } from "react";
import axios from "axios";
import FeedCard from "./FeedCard";
import "./Feed.css";

const Feed = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await axios.post("http://localhost:8000/recommendations/", {
          query: "jackets"
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
      <h2 className="feed-title">❤️ Feed</h2>
      <div className="feed-grid">
        {recommendations.map((item, idx) => (
          <FeedCard key={idx} recommendation={item} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
