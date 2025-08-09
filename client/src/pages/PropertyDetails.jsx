// client/src/pages/PropertyDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  // Get the property id from the URL params (if you use route like /properties/:id)
  const { id } = useParams();

  // For now, just show a placeholder with the id
  return (
    <div style={{ padding: "20px" }}>
      <h1>Property Details</h1>
      <p>Showing details for property ID: <strong>{id}</strong></p>
      {/* TODO: Fetch property details from backend using the id */}
    </div>
  );
};

export default PropertyDetails;
