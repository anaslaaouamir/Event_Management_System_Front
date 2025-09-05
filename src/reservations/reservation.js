import "./reservation_list.css";
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import axios from "axios"; 


const Reservation = ({reservations, setReservations,token}) =>{

    const formattedDate = (date) =>{return date ? date.replace("T", " at ").slice(0, 16) : ''};
    const formattedDate1 = (date) =>{return date ? date.slice(0, 10) : ''};

    const navigate = useNavigate();

    const handleDelete = async (id) => {
        try {

            const response = await axios.delete(
                `http://localhost:9093/reservations/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const reservationsList = reservations.filter(reservation => reservation.idReservation !== id);
            setReservations(reservationsList);
            
        } catch (err) {
            console.log(`Error: ${err.message}`);
        }
    }

    return (
        <tbody>
            {
            reservations?.map(reservation=>(
                
           
						    <tr className="alert" role="alert" key={reservation.idReservation}>
						    	<td>
                                <div
                                    className="img1"
                                    style={{ backgroundImage: `url(http://localhost:9092/${reservation.event.imagePath})` }}>
                                </div>

						    	</td>
						      <td>
						      	<div className="email">
                                  {reservation.event.title}
						      	</div>
						      </td>
						      <td>{reservation.classe.className} </td>
                              <td>{reservation.classe.price}</td>
						      <td>{formattedDate(reservation.event.eventDateTime)}</td>
				                <td>{formattedDate1(reservation.reservationDateTime)}</td>
						      
                              <td>
                              <button className="p-2 rounded-full hover:bg-gray-200" onClick={()=>handleDelete(reservation.idReservation)} >
                                <CancelIcon style={{ color: "red", fontSize: 30 }} />
                            </button>
                              </td>
						    </tr>
 ))}

						  </tbody>
    );
}

export default Reservation;