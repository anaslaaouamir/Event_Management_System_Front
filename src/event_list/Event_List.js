import './Event_List.css'
import  Event  from './Event';
import Recomendation from './Recomendation';

const EventList = ({events,client,setEvents, token, reservations, setReservations, confirm, setConfirm, setAlert, recomendations, recomendationsLoading }) => {
  
  
  return (
    <>

  {client && reservations.length>0  &&
  <>
    <h1>Events For You</h1> <br/>
    {recomendationsLoading ? 

    <h3>Loading recommendations...</h3> :  
  
      <div className='card-container'>
      {recomendations.map(event => (
        <Recomendation  event={event} />
      ))}
      
      </div>}
      </>
  }

      <h1>All events</h1> <br/>
      <div className='card-container'>
          {events.filter(event => !recomendations.some(rec => rec.idEvent === event.idEvent )).map(event => (
            <Event  setAlert={setAlert} confirm={confirm} setConfirm={setConfirm} key={event.idEvent} event={event} client={client} setEvents={setEvents} events={events} token={token} reservations={reservations} setReservations={setReservations} />
          ))}
      </div>
 
      
    </>
  );
};

export default EventList;
