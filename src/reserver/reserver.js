import './reserver.css';
import ReserverForm from './reserver_form';
import { useParams } from "react-router-dom";
import DataContext from "../context/DataContext";
import { useContext } from "react";


const Reserver = ()=>{

	const {token} = useContext(DataContext);

	const { id } = useParams();
  	const { events, isLoading } = useContext(DataContext);

  if (isLoading) return <h2>Loading...</h2>;

  const event = events.find((event) => event.idEvent == id);

  if (!event) return <h2>Error: Event not found</h2>;

  const classes = event.classes || [];

    return (
        <div id="booking" className="section">
		<div className="section-center">
			<div className="container">
				<div className="row">
					<div className="booking-form">
						<div className="form-header">
							<h1>{event.title}</h1>
						</div>
                        
						<ReserverForm event={event} classes={classes} token= {token}/>
                        
					</div>
				</div>
			</div>
		</div>
	</div>
    )
}

export default Reserver;