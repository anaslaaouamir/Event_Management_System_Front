import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../../context/DataContext";
import './reserver.css';
import EditEventForm from "./editEventForm";
import Popup from "../../pop_up";

const EditEvent = () => { 
  const { id } = useParams();

  const { events, isLoading, setEvents, token, setEventId, alert, setAlert} = useContext(DataContext);

  useEffect(() => {
	setEventId(id);
}, [])

  if (isLoading) return <h2>Loading...</h2>;

  const event = events.find((event) => event.idEvent == id);

  if (!event) return <h2>Error: Event not found</h2>;

  const classes = event.classes || [];

  

 

  return (
	<>{alert && 
		<Popup alert={alert} setAlert={setAlert} />
		}
		
				<div
			id="booking"
			className="section"
			style={{
				backgroundImage: `url(http://localhost:8888/EVENT-SERVICE/${event.imagePath})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
				height: "1000px",   // ⬅️ fixed height
			}}
			>
		<div className="section-center">
			<div className="container">
				<div className="row">
					<div className="booking-form">
						<div className="form-header">
							<h1>{event.title}</h1>
						</div>
                        
						<EditEventForm setAlert={setAlert} event={event} classes={classes} token={token} events={events} setEvents={setEvents} />
                        
					</div>
				</div>
			</div>
		</div>
	</div>
	</>
  );
};

export default EditEvent;
