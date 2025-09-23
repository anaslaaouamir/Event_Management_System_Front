import "./reservation_list.css";
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';
import axios from "axios"; 
import { useEffect, useState } from "react";

 
const Reservation = ({reservations, setReservations,token, events, setEvents, setAlert,confirm,setConfirm}) =>{

    const formattedDate = (date) =>{return date ? date.replace("T", " at ").slice(0, 16) : ''};
    const formattedDate1 = (date) =>{return date ? date.slice(0, 10) : ''};
    const [id,setId]= useState(null);
    const [idEvent,setIdEvent]=useState(null);
    const [idClass,setIdClass]=useState(null);

    const navigate = useNavigate();

    const deleteReservation= (idReservatino,idEv,idCls)=>{
        setAlert({type:'info' , message:'Are you sure you want to cancel you reservation?', show:true});
        setId(idReservatino);
        setIdEvent(idEv);
        setIdClass(idCls);
    }


    useEffect(() => {
        if(confirm)
            {console.log("inside use effect")
        console.log(confirm,'   *   ',id ,'   *   ', idEvent ,'   *   ', idClass)
        if(confirm === true && id && idEvent && idClass){
            handleDelete(id,idEvent,idClass);
            
        }}
    }, [confirm,id , idEvent , idClass]);

    const handleDelete = async (id,idEvent,idClass) => {
        try {

            const response = await axios.delete(
                `http://localhost:8888/RESERVATION-SERVICE/reservations/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            const reservationsList = reservations.filter(reservation => reservation.idReservation !== id);
            setReservations(reservationsList);

            // ---------------------------
        // Update the events state
        // ---------------------------
        // 1. Copy the old events array
        const updatedEvents = events.map(ev => {
            // 2. Find the event that matches the current one
            if (ev.idEvent === idEvent) {
                // 3. Update the classes array inside this event
                const updatedClasses = ev.classes.map(c => {
                    if (c.idClass === idClass) {
                        // 4. Reduce the available capacity by 1
                        return {
                            ...c, // copy all other properties of the class
                            capacity: c.capacity + 1
                        };
                    } else {
                        return c; // other classes remain the same
                    }
                });

                // 5. Return the updated event object
                return {
                    ...ev, // copy all other properties of the event
                    classes: updatedClasses,
                    capacity: ev.capacity + 1
                };
            } else {
                return ev; // other events remain the same
            }
        });

        // 6. Set the new events array into state
        setEvents(updatedEvents);

        setConfirm(false)

        setAlert({
            type: "success",
            message: "Your reservation has been cancelled successfully. We hope to see you again soon!",
            show: true,
          });
          
            
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
                              <button className="p-2 rounded-full hover:bg-gray-200" onClick={()=>deleteReservation(reservation.idReservation,reservation.idEvent,reservation.idClasse)} 
                            //   onClick={()=>handleDelete(reservation.idReservation,reservation.idEvent,reservation.idClasse)} 
                            >
                                <CancelIcon style={{ color: "red", fontSize: 30 }} />
                            </button>
                              </td>
						    </tr>
 ))}

						  </tbody>
    );
}

export default Reservation;