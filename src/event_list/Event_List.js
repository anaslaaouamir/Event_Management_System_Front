import './Event_List.css'
import  Event  from './Event';

const EventList = ({events,client}) => {
  

  return (
    <div className='card-container'>
        {events.map(event => (
          <Event key={event.idEvent} event={event} client={client} />
        ))}
    </div>
    
  );
};

export default EventList;
