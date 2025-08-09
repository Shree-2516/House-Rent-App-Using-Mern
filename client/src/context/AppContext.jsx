// appcontext.jsx

import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false); // House owner flag
  const [showLogin, setShowLogin] = useState(false);
  const [moveInDate, setMoveInDate] = useState("");
  const [moveOutDate, setMoveOutDate] = useState("");

  const [houses, setHouses] = useState([]); // All houses

  // ✅ Fetch logged-in user data
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/data");
      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      } else {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Fetch all houses from backend
  const fetchHouses = async () => {
    try {
      const { data } = await axios.get("/api/user/houses");
      data.success
        ? setHouses(data.houses)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // ✅ Logout
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    axios.defaults.headers.common["Authorization"] = "";
    toast.success("You have been logged out");
  };

  // ✅ Load token from localStorage & fetch houses
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    fetchHouses();
  }, []);

  // ✅ Fetch user if token exists
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
      fetchUser();
    }
  }, [token]);

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchHouses,
    houses,
    setHouses,
    moveInDate,
    setMoveInDate,
    moveOutDate,
    setMoveOutDate,
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
