import { createContext, useState, useEffect } from 'react';
import useAxiosFetch from '../hooks/useAxiosFetch';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const DataContext = createContext({});

export const DataProvider = ({ children }) => {


    const navigate = useNavigate();

    const [events, setEvents] = useState([]);

    const [reservations, setReservations] = useState([]);

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [client, setClient] = useState(null);

    const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:9092/events');

    const [token, setToken] = useState(localStorage.getItem('token') || null);


    const login = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const logout = () => {
        setToken(null);        // clear token state
        setClient(null);       // clear client data
        localStorage.removeItem('token'); // remove from storage
        navigate("/");
    };


    // 🔑 Setup Axios interceptor ONCE when provider mounts
    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            error => {
                if (error.response && error.response.status === 401) {
                    console.warn("Token expired → logging out...");
                    logout();
                }
                return Promise.reject(error);
            }
        );

        // Cleanup interceptor when component unmounts
        return () => {
            axios.interceptors.response.eject(interceptor);
        };
    }, []);
    


    useEffect(() => {
        setEvents(data);
    }, [data])

    useEffect(() => {
        const filteredResults = events.filter((event) =>
            ((event.description).toLowerCase()).includes(search.toLowerCase())
            || ((event.title).toLowerCase()).includes(search.toLowerCase()));

        setSearchResults(filteredResults.reverse());
    }, [events, search])

    useEffect(() => {
        
        if (token) {
            axios.get("http://localhost:9091/clients/me", {
                headers: { Authorization: `Bearer ${token}` }
            })
            
            .then(response => 
            {setClient(response.data)
            console.log(response.data)})
            .catch(error => console.error("Error fetching client data:", error));
        }
    }, [token])

    useEffect(() => {
        if (token && client) {
            console.log("Fetching reservations for client:", client.idClient);
            axios.get(`http://localhost:9093/reservations_client/${client.idClient}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            .then(response => {
                console.log("Reservations fetched:", response.data);
                setReservations(response.data);
            })
            .catch(error => console.error("Error fetching reservations:", error));
        }
    }, [token, client]);  // ✅ run when token or client updates
    



    return (
        <DataContext.Provider value={{
            search, setSearch,
            searchResults, fetchError, isLoading,
            events, setEvents,
            client,
            login, token, logout,
            reservations, setReservations
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext;