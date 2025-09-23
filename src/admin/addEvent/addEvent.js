import { useContext } from 'react';
import './addEvent.css';
import AddEventForm from './addEventForm';
import DataContext from '../../context/DataContext';
import Popup from '../../pop_up';

const AddEvent = () =>{

    const {events,setEvents,token,alert, setAlert} = useContext(DataContext);

    return (

		<>{alert && 
			<Popup alert={alert} setAlert={setAlert} />
			}
			
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
                        
						<AddEventForm token={token} events={events} setEvents={setEvents} alert={alert} setAlert={setAlert}/>
                        
					</div>
				</div>
			</div>
		</div>
	</div>
	</>
    );
}

export default AddEvent;