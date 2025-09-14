import { useContext } from 'react';
import AddClassForm from './addClassForm';
import './addEvent.css';
import { useParams } from "react-router-dom";
import DataContext from '../../context/DataContext';


const AddClass = ()=>{

    const { id } = useParams();
    const { events, isLoading, setEvents, token} = useContext(DataContext);

    if (isLoading) return <h2>Loading...</h2>;

    const event = events.find((event) => event.idEvent == id);

    if (!event) return <h2>Error: Event not found</h2>;

    return(
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
							<h2>Add Classes for</h2>
                            <h1>{event.title} </h1>
						</div>
                        
						<AddClassForm event={event} token={token} events = {events} setEvents={setEvents} />
                        
					</div>
				</div>
			</div>
		</div>
	</div>
    );
}

export default AddClass;