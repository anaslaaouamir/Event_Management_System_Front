import ListAltIcon from '@mui/icons-material/ListAlt';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"; 
import "./table.css";


const Events = ({reservations, setReservations,token, events, setEvents}) =>{

    const formattedDate = (date) =>{return date ? date.replace("T", " at ").slice(0, 16) : ''};

    const navigate = useNavigate();

    const handleDelete = async (id,idEvent,idClass) => {
        try {

            const response = await axios.delete(
                `http://localhost:8888/RESERVATION-RESERVATION/reservations/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const reservationsList = reservations.filter(reservation => reservation.idReservation !== id);
            setReservations(reservationsList);

            // ---------------------------
        // Update the events state
        // ---------------------------
        // 1. Copy the old events array
        const updatedEvents = events.map(ev => {
            // 2. Find the event that matches the current one
            if (ev.idEvent === idEvent) {
                // 3. Update the classes array inside this event
                const updatedClasses = ev.classes.map(c => {
                    if (c.idClass === idClass) {
                        // 4. Reduce the available capacity by 1
                        return {
                            ...c, // copy all other properties of the class
                            capacity: c.capacity + 1
                        };
                    } else {
                        return c; // other classes remain the same
                    }
                });

                // 5. Return the updated event object
                return {
                    ...ev, // copy all other properties of the event
                    classes: updatedClasses,
                    capacity: ev.capacity + 1
                };
            } else {
                return ev; // other events remain the same
            }
        });

        // 6. Set the new events array into state
        setEvents(updatedEvents);
            
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

    const isFinished = (eventDateTime) => {
        if (!eventDateTime) return false; // default
        const eventDate = new Date(eventDateTime);
        const now = new Date();
        return eventDate < now; // true if event date is before now
      };

    return (
        <tbody>
            {
            events?.map(event=>(
                
           
						    <tr className="alert" role="alert" key={event.idEvent}>
						    	<td>
                                <div
                                    className="img1"
                                    style={{ backgroundImage: `url(http://localhost:8888/EVENT-SERVICE/${event.imagePath})` }}>
                                </div>

						    	</td>
						      <td>
						      	<div className="email">
                                  {event.title}
						      	</div> 
						      </td>
                              <td>{formattedDate(event.eventDateTime)}</td>
						      <td>{event.fullCapacity - event.capacity} </td>
                              <td>{event.capacity}</td>
						      
                              <td>{isFinished(event.eventDateTime) ? 'Finished' : 'Not finished'}</td>
						      
                              <td>
                              <Link to={'reservations_event/'+event.idEvent}>
                              <button className="p-2 rounded-full hover:bg-gray-200">
                                <ListAltIcon style={{ color: "green", fontSize: 30 }} />
                                </button>
                              </Link>
                              </td>
						    </tr>
 ))} 

						  </tbody>
    );
}

export default Events;