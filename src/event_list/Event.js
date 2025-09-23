import './Event_List.css'
import { Link } from 'react-router-dom';
import axios from "axios"; 
import { useEffect, useState } from 'react';


const EventList = ({ event, client, setEvents, events, token, reservations, setReservations, confirm, setConfirm, setAlert}) => {

  const classes = event.classes || [];

  const [id,setId]= useState(null);

  let cheapest=10000000;

  classes.forEach(classe => {
    if(cheapest > classe.price) 
       cheapest = classe.price 
  });


  const deleteEvent= (idEvent,title)=>{
    setAlert({type:'info' , message:'Are you sure you want to Delete "'+title+'" Event', show:true});
    setId(idEvent);
  }

  useEffect(() => {

    if(confirm===true && id){
      handleDelete(id);
    }

  }, [confirm,id]);



  const handleDelete = async (id) =>{
    try{

      const response = await axios.delete(
        `http://localhost:8888/EVENT-SERVICE/events/${id}`,
        {
            headers: { Authorization: `Bearer ${token}` }
        }
      );
      const eventsList = events.filter(ev => ev.idEvent !== id);
      setEvents(eventsList);
      const reservationsList = reservations.filter(res=>res.idEvent !== event.idEvent);
      setReservations(reservationsList);

      setConfirm(false);
      setAlert({
        type: "success",
        message: "The event deleted successfully!",
        show: true,
      });

    }catch(err){
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

    <>
      { !isFinished(event.eventDateTime) && 
        <article className="card" key={event.idEvent}>
          <img
            className="card__background"
            src={`http://localhost:8888/EVENT-SERVICE/${event.imagePath}`}
            
            alt="Photo of Cartagena's cathedral"
            width="1920"
            height="2193"
          />
          <div className="card__content | flow">
            <div className="card__content--container | flow">
              <h2 className="card__title" style={{color:"white"}}>{event.title} "{event.idEvent}"</h2>

                        {client && client.roles.includes("ROLE_ADMIN") ? (
            <center><p className="card__reservation">{event.fullCapacity - event.capacity} reservations  <br/> {event.capacity} places available</p></center>
          ) : (
            <p className="card__description">
              {event.description.length <= 75
                ? event.description
                : `${event.description.slice(0, 75)}...`}
            </p>
          )}

            </div>

            {client ?
            client.roles.includes("ROLE_ADMIN") ?

            <div className='inline'>
            <Link to={`/edit_event/${event.idEvent}`}>
              <button className="edit">Edit</button>
            </Link>
            
            <button className="delete" onClick={() => deleteEvent(event.idEvent,event.title)}>Delete</button>
          
          </div>

            :

            <Link to={`/event/${event.idEvent}`}>
              <button className="card__button">from {cheapest} MAD</button>
            </Link>
:
<Link to={`/event/${event.idEvent}`}>
              <button className="card__button">from {cheapest} MAD</button>
            </Link>
            }
            
          </div>
        </article>
        }
        </>
      
  );
};

export default EventList;
