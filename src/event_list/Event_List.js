import './Event_List.css'
import  Event  from './Event';

const EventList = ({events}) => {
  

  return (
    <div className='card-container'>
        {events.map(event => (
          <Event key={event.idEvent} event={event} />
        ))}
    </div>
    
  );
};

export default EventList;
