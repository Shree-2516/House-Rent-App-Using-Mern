// client/src/components/FeaturedSection.jsx

import React, { useEffect, useState } from "react";
import Title from "./Title";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import PropertyCard from "./PropertyCard"; // <-- Correct import
import { useAppContext } from "../context/AppContext";

const FeaturedSection = () => {
    // Get the houses from your app context
    const { houses, setHouses, axios } = useAppContext();

    // Fetch houses when the component mounts
    useEffect(() => {
        const fetchHouses = async () => {
            try {
                const { data } = await axios.get('/api/properties'); // Assuming this is your new endpoint
                setHouses(data.properties);
            } catch (error) {
                console.error("Failed to fetch properties:", error);
            }
        };

        if (houses.length === 0) { // Only fetch if the houses array is empty
            fetchHouses();
        }
    }, [axios, setHouses, houses.length]); // Dependencies for useEffect

    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center py-20 px-6 sm:px-16 lg:px-24 xl:px-32">
            <Title title="Featured Houses" subTitle="Explore some of our top-rated properties" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {/* Check if houses exist and then map over them */}
                {houses.slice(0, 3).map((property, index) => (
                    <PropertyCard key={index} property={property} />
                ))}
            </div>

            <button 
                onClick={() => navigate("/properties")} 
                className="mt-10 px-8 py-3 bg-primary text-white rounded-full font-medium transition-transform transform hover:scale-105"
            >
                View More Properties
            </button>
        </div>
    );
};

export default FeaturedSection;