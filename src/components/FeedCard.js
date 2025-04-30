import React from "react";
import "./FeedCard.css";

// Helper function to generate a random price between 600 and 2500
const getRandomPrice = () => {
  return Math.floor(Math.random() * (2500 - 600 + 1)) + 600;
};

const FeedCard = ({ recommendation }) => {
  if (!recommendation) return null;

  const {
    image_url,
    title_Translated,
    description_Translated,
    Type,
    Gender,
    Subtype,
  } = recommendation;

  // Get random price in rupees
  const price = getRandomPrice();

  // Limit the description to 6 words
  const description = description_Translated
    ? description_Translated.split(" ").slice(0, 2).join(" ") + "..."
    : "No description available";

  return (
    <div className="feed-card">
      <img src={image_url} alt={title_Translated} className="feed-card-image" />
      <div className="feed-card-info">
        {/* Display title without the <h3> */}
        <p className="feed-card-title">{title_Translated}</p>
        <p>{description}</p>
        <p className="category">{Type} | {Gender} | {Subtype}</p>
        <div className="price">₹{price}</div>
      </div>
    </div>
  );
};

export default FeedCard;
