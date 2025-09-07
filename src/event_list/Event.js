import './Event_List.css'
import { Link } from 'react-router-dom';

const EventList = ({event,client}) => {

  const classes = event.classes || [];

  let cheapest=1000000;

  classes.forEach(classe => {
    if(cheapest > classe.price) 
       cheapest = classe.price 
  });
  

  return (
    
      
        <article className="card" key={event.idEvent}>
          <img
            className="card__background"
            src={`http://localhost:9092/${event.imagePath}`}
            
            alt="Photo of Cartagena's cathedral"
            width="1920"
            height="2193"
          />
          <div className="card__content | flow">
            <div className="card__content--container | flow">
              <h2 className="card__title" style={{color:"white"}}>{event.title}</h2>

                        {client && client.roles.includes("ROLE_ADMIN") ? (
            <center><p className="card__reservation">15 reservations  <br/> 20 places available</p></center>
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
            <Link to={`/event/${event.idEvent}`}>
            <button className="delete">Delete</button>
          </Link>
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
      
    
  );
};

export default EventList;
