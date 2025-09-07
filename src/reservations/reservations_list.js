import { useContext } from "react";
import Reservation from "./reservation";
import "./reservation_list.css";
import DataContext from "../context/DataContext";


const ReservationList = () =>{

    const{reservations, setReservations, token, events, setEvents} = useContext(DataContext);

    return (

		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6 text-center mb-4">
					<h2 className="heading-section">Your Reservations</h2>
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
						      <th>Classe</th>
						      <th>Price</th>
						      <th>Event Date</th>
						      <th>Reservation Date</th>
                              <th>Cancel</th>
						    </tr>
						  </thead>
						  <Reservation reservations={reservations} setReservations={setReservations} token={token} events={events} setEvents={setEvents} />
						</table>
					</div>
				</div>
			</div>
		</div>

    );
}

export default ReservationList;