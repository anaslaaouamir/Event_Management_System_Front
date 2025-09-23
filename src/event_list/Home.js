import { useContext } from 'react';
import DataContext from '../context/DataContext';
import Event_List from './Event_List'
import Popup from '../pop_up';

const Home = () => {
    const {alert, setAlert, searchResults, fetchError, isLoading,client, setEvents, token, reservations, setReservations, confirm, setConfirm, recomendations,recomendationsLoading} = useContext(DataContext);



    return (
        < >
            {alert && 
        <Popup alert={alert} setAlert={setAlert} />
        }
            {isLoading && <p className="statusMsg">Loading posts...</p>}
            {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
            {!isLoading && !fetchError && (searchResults.length ? 
            <Event_List events={searchResults} client={client} setEvents={setEvents} token={token} reservations={reservations} setReservations={setReservations} confirm={confirm} setConfirm={setConfirm} setAlert={setAlert} recomendations={recomendations} recomendationsLoading={recomendationsLoading} /> : 
            <p className="statusMsg">No posts to display.</p>) }
            
        </>
    )
}

export default Home