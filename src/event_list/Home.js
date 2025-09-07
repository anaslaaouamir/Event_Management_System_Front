import { useContext } from 'react';
import DataContext from '../context/DataContext';
import Event_List from './Event_List'

const Home = () => {
    const { searchResults, fetchError, isLoading,client } = useContext(DataContext);



    return (
        < >
            {isLoading && <p className="statusMsg">Loading posts...</p>}
            {!isLoading && fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
            {!isLoading && !fetchError && (searchResults.length ? <Event_List events={searchResults} client={client} /> : 
            <p className="statusMsg">No posts to display.</p>) }
        </>
    )
}

export default Home