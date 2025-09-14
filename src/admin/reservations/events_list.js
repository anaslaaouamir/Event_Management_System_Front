import { useContext } from "react";
import "./table.css";
import DataContext from "../../context/DataContext";
import Events from "./events";

const EventList=()=>{

    const{reservationsByEvent, setReservationsByEvent, searchResults, setEvents, token} = useContext(DataContext);

    return (

		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6 text-center mb-4">
					<h2 className="heading-section">Events</h2>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<div className="table-wrap">
						<table className="table">
						  <thead className="thead-primary">
						    <tr>
						    	<th>&nbsp;</th>
						    	<th>Event</th>
                                <th>Event date</th>
                                <th>Number of Reservations</th>
                                <th>Number of places available</th>
                                <th>State</th>
                                <th>Reservations</th>
						    </tr>
						  </thead>
						  <Events reservations={reservationsByEvent} setReservations={setReservationsByEvent} token={token} events={searchResults} setEvents={setEvents} />
						</table>
					</div>
				</div>
			</div>
		</div>

    );
}

export default EventList;