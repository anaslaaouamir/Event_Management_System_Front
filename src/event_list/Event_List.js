import './Event_List.css'
import  Event  from './Event';

const EventList = ({events,client,setEvents, token, reservations, setReservations}) => {
  

  return (
    <div className='card-container'>
        {events.map(event => (
          <Event key={event.idEvent} event={event} client={client} setEvents={setEvents} events={events} token={token} reservations={reservations} setReservations={setReservations} />
        ))}
    </div>
    
  );
};

export default EventList;
