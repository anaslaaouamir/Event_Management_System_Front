import './Event_List.css'
import { Link } from 'react-router-dom';
import axios from "axios"; 
import { useEffect, useState } from 'react';


const EventList = ({event}) => {

  const classes = event.classes || [];


  let cheapest=10000000;

  classes.forEach(classe => {
    if(cheapest > classe.price) 
       cheapest = classe.price 
  });


  
  

  return (
    
      
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
              <p className="card__description">
              {event.description.length <= 75
                ? event.description
                : `${event.description.slice(0, 75)}...`}
            </p>
            </div>


            <Link to={`/event/${event.idEvent}`}>
              <button className="card__button">from {cheapest} MAD</button>
            </Link>

            
          </div>
        </article>
      
    
  );
};

export default EventList;
