import { useContext, useEffect } from "react";
import "./table.css";
import DataContext from "../../context/DataContext";
import { useParams } from "react-router-dom";
import Reservation from "./reservations";
import Popup from "../../pop_up";

const ReservationListByEvent=()=>{

	useEffect(() => {
		setEventId(id);
		setSearch("");
		setSearchLabel("Search Client");

	}, [])
 
    const { id } = useParams();

    const{setSearchLabel, reservationsByEventResults, setReservationsByEvent, events, setEvents, token, setEventId, isLoading, setSearchResults,setSearch , alert, setAlert, confirm, setConfirm} = useContext(DataContext);

    if (isLoading) return <h2>Loading...</h2>;

    const event = events.find((event) => event.idEvent == id);

    if (!event) return <h2>Error: Event not found</h2>;

    const classes = event.classes || [];

	

    return (

		
		<>
		{alert && 
        <Popup alert={alert} setAlert={setAlert} />
        }

		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6 text-center mb-4">
					<h2 className="heading-section">Reservations of "{event.title}" Event</h2>
				</div>
			</div>
			<div className="row">
				<div className="col-md-12">
					<div className="table-wrap">
						<table className="table">
						  <thead className="thead-primary">
						    <tr>
                            <th>&nbsp;</th>
						    	<th>Client</th>
						      <th>Classe</th>
						      <th>Price</th>
						      <th>Event Date</th>
						      <th>Reservation Date</th>
                              <th>Cancel</th> 
						    </tr>
						  </thead>
						  <Reservation reservations={reservationsByEventResults} setReservations={setReservationsByEvent} token={token} events={events} setEvents={setEvents} classses={classes} setSearchResults={setSearchResults} confirm={confirm} setConfirm={setConfirm} setAlert={setAlert} />
						</table>
					</div>
				</div>
			</div>
		</div>
		</>
    );
}

export default ReservationListByEvent;