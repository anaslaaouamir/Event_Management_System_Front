// const Head = ({ event }) => {
//     // Extract and format date
//     const formattedDate = event.eventDateTime
//         ? event.eventDateTime.replace("T", " at ").slice(0, 16) // "YYYY-MM-DD HH:mm"
//         : "";

//     return (
//         <header id="site-header" className="site-header valign-center"> 
//             <div className="intro">
//                 <h2>{formattedDate}</h2> <br/>
                
//                 <h1>{event.title}</h1> <br/>
                
//                 <p>{event.location}</p> <br/>
                
//                 <button>Get Your Ticket</button>
//             </div>
//         </header>
//     );
// };

// export default Head;
import "./head.css";
import { Link } from "react-router-dom";

const Head = ({ event , client}) => {
    const formattedDate = event.eventDateTime
        ? event.eventDateTime.replace("T", " at ").slice(0, 16)
        : "";

   

        return (
            <header className="site-header">
                <div className="overlay">
                    <img 
                        src={`http://localhost:9092/${event.imagePath}`} 
                        alt={event.title} 
                        className="header-image"
                    />
                    <center>
                    <div className="intro"> 
                        <h1>{event.title}</h1>
                        <h2>{formattedDate}</h2>
                        <p>{event.location}</p>
                        {client ? <Link to={`/reserver/${event.idEvent}`}>
                            <button className="ticket-btn">Get Your Ticket</button>
                        </Link> : <Link to={`/login`}>
                            <button className="ticket-btn">Get Your Ticket</button>
                        </Link>}
                        
                    </div>
                    </center>
                </div>
            </header>
        );
};

export default Head;
