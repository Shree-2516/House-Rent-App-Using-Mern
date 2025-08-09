// ... (imports are correct, but change HouseCard to PropertyCard)
import PropertyCard from '../components/PropertyCard' // <-- Use the correct component name

const Houses = () => {
  const [searchParams] = useSearchParams();
  const location = searchParams.get('location');
  const checkInDate = searchParams.get('checkInDate');
  const checkOutDate = searchParams.get('checkOutDate');

  const { houses, setHouses, axios } = useAppContext(); // <-- You'll need a setHouses function in your context
  const [input, setInput] = useState('');
  const isSearchData = location && checkInDate && checkOutDate;
  const [filteredHouses, setFilteredHouses] = useState([]);

  // Add this new useEffect hook to fetch all houses on initial load
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const { data } = await axios.get('/api/properties'); // <-- Assuming your new backend endpoint is '/api/properties'
        setHouses(data.properties); // <-- Assuming your backend sends an object with a properties array
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      }
    };

    // Only fetch all properties if no search parameters are present.
    if (!isSearchData) {
      fetchHouses();
    }
  }, []); // Run only once on component mount

  const applyFilter = async () => {
    if (input === '') {
      setFilteredHouses(houses);
      return null;
    }
    const filtered = houses.slice().filter((house) => {
      return house.title.toLowerCase().includes(input.toLowerCase())
        || house.type.toLowerCase().includes(input.toLowerCase())
        || house.location.toLowerCase().includes(input.toLowerCase());
    });
    setFilteredHouses(filtered);
  };

  const searchHouseAvailability = async () => {
    const { data } = await axios.post('/api/bookings/check-availability', { location, checkInDate, checkOutDate });
    if (data.success) {
      setFilteredHouses(data.availableHouses);
      if (data.availableHouses.length === 0) {
        toast('No houses available');
      }
      return null;
    }
  };

  useEffect(() => {
    isSearchData && searchHouseAvailability();
  }, [location, checkInDate, checkOutDate]); // Run when search params change

  useEffect(() => {
    houses.length > 0 && !isSearchData && applyFilter();
  }, [input, houses]);

  return (
    <div>
      {/* ... (rest of the component is fine) */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
        {filteredHouses.map((house, index) => (
          <motion.div key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
          >
            <PropertyCard property={house} /> {/* <-- Pass `house` as `property` prop */}
          </motion.div>
        ))}
      </div>
      {/* ... (rest of the component) */}
    </div>
  );
};

export default Houses;