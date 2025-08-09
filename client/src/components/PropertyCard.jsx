// ... (imports are correct)

const PropertyCard = ({ property }) => {
  const currency = import.meta.env.VITE_CURRENCY || "$";
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        // The navigation path is correct based on your App.jsx
        navigate(`/property-details/${property._id}`);
        scrollTo(0, 0);
      }}
      className="group rounded-xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer"
    >
      {/* The rest of this component seems correct, assuming your backend data matches the property names. */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.images[0]} // <-- Assuming your backend returns an array of images. Change to property.image if it's a single string.
          alt="Property"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* ... (rest of the code is fine) */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg">
          <span className="font-semibold">
            {currency}
            {property.pricePerDay} {/* <-- Check if this should be 'pricePerMonth' */}
          </span>
          <span className="text-sm text-white/80"> / day</span> {/* <-- Change to ' / month' if needed */}
        </div>
      </div>
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-medium">{property.title}</h3>
            <p className="text-muted-foreground text-sm">
              {property.type} • Built in {property.builtYear} {/* <-- Make sure these properties exist on your backend data model */}
            </p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600">
          <div className="flex items-center text-sm text-muted-foreground">
            <img src={assets.bedroom_icon} alt="Bedrooms" className="h-4 mr-2" />
            <span>{property.bedrooms} Bedrooms</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <img src={assets.bathroom_icon} alt="Bathrooms" className="h-4 mr-2" />
            <span>{property.bathrooms} Bathrooms</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <img src={assets.furnished_icon} alt="Furnished" className="h-4 mr-2" />
            <span>{property.furnished ? "Furnished" : "Unfurnished"}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <img src={assets.location_icon} alt="Location" className="h-4 mr-2" />
            <span>{property.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;