import { useContext } from 'react';
import DataContext from '../context/DataContext';
import Event_List from './Event_List'

const Home = () => {
    const { searchResults, fetchError, isLoading,client, setEvents, token, reservations, setReservations } = useContext(DataContext);



    return (
        < >
            {isLoading && <p className="statusMsg">Loading posts...</p>}
            {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
            {!isLoading && !fetchError && (searchResults.length ? <Event_List events={searchResults} client={client} setEvents={setEvents} token={token} reservations={reservations} setReservations={setReservations} /> : 
            <p className="statusMsg">No posts to display.</p>) }
        </>
    )
}

export default Home