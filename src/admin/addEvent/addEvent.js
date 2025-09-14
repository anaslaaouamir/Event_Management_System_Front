import { useContext } from 'react';
import './addEvent.css';
import AddEventForm from './addEventForm';
import DataContext from '../../context/DataContext';

const AddEvent = () =>{

    const {events,setEvents,token} = useContext(DataContext);

    return (
    <div
			id="booking"
			className="section"
			style={{
				
				backgroundSize: "cover",
				backgroundPosition: "center",
				height: "1200px",   // ⬅️ fixed height
			}}
			>
		<div className="section-center">
			<div className="container">
				<div className="row">
					<div className="booking-form">
						<div className="form-header">
							<h1>Add new Event</h1>
						</div>
                        
						<AddEventForm token={token} events={events} setEvents={setEvents} />
                        
					</div>
				</div>
			</div>
		</div>
	</div>
    );
}

export default AddEvent;