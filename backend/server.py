from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd

# Initialize FastAPI app
app = FastAPI()

# Add CORS middleware to allow frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This allows any frontend to access the API
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Load your dataset
df = pd.read_csv('cleaned_clip_dataset.csv')  # Replace with correct cleaned file path


# Define the request model to accept query parameters
class RecommendationRequest(BaseModel):
    query: str = None
    gender: str = None  # Optional filter for gender
    category: str = None  # Optional filter for category
    subtype: str = None  # Optional filter for subtype

# Filter the dataset based on query and other optional filters
def filter_images(query=None, gender=None, category=None, subtype=None):
    filtered_df = df.copy()

    # Convert relevant columns to string to avoid AttributeError
    for col in ['Gender', 'Type', 'Subtype', 'description_Translated', 'title_Translated']:
        filtered_df[col] = filtered_df[col].astype(str)

    # Apply filters based on the passed parameters
    if gender:
        filtered_df = filtered_df[filtered_df['Gender'].str.contains(gender, case=False, na=False)]
    if category:
        filtered_df = filtered_df[filtered_df['Type'].str.contains(category, case=False, na=False)]
    if subtype:
        filtered_df = filtered_df[filtered_df['Subtype'].str.contains(subtype, case=False, na=False)]
    if query:
        filtered_df = filtered_df[
            filtered_df['description_Translated'].str.contains(query, case=False, na=False) |
            filtered_df['title_Translated'].str.contains(query, case=False, na=False)
        ]

    # Return selected columns as a list of dicts
    result = filtered_df[['image_url', 'title_Translated', 'description_Translated', 'Type', 'Gender', 'Subtype']].to_dict(orient='records')
    return result

# API endpoint to fetch recommendations based on user query and filters
@app.post("/recommendations/")
async def get_recommendations(request: RecommendationRequest):
    # Fetch recommendations by applying filters
    recommendations = filter_images(
        query=request.query,
        gender=request.gender,
        category=request.category,
        subtype=request.subtype
    )
    return {"recommendations": recommendations}
