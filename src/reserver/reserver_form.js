import { useEffect, useState } from 'react';
import './reserver.css';
import axios from "axios"; 
import { useContext } from 'react';
import DataContext from '../context/DataContext';
import Popup from '../pop_up';

const ReserverForm = ({ event, classes, token, setEvents, alert, setAlert }) => {
    const { client, setReservations , reservations,events} = useContext(DataContext);
    const [selectedClasseId, setSelectedClasseId] = useState("");
    const [error, setError] = useState("");

    // 👉 function to format datetime like "2025-08-11 11:00:10"
    const getNowDateTime = () => {
        return new Date().toISOString().slice(0, 19); 
        // Example: "2025-08-31T11:00:10"
      };
      

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {

            let classe=null;
            event.classes.forEach(element => {
                if(element.idClass == Number(selectedClasseId))
                    classe=element;
            });
              console.log("data: ", client.idClient,   // ✅ use client id
                 event.idEvent,
                 event,           // ✅ event id from props
                Number(selectedClasseId),  // ✅ from select
                classe,
                getNowDateTime())
              
            const response = await axios.post(
                "http://localhost:8888/RESERVATION-SERVICE/reservations",
                {
                    idClient: client.idClient,   // ✅ use client id
                    idEvent: event.idEvent,
                    event: event,           // ✅ event id from props
                    idClasse: Number(selectedClasseId),  // ✅ from select
                    classe:classe,
                    reservationDateTime: getNowDateTime() // ✅ now datetime
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            console.log("Reservation successful:", response.data);
            setReservations([...reservations,response.data]);

            // ---------------------------
        // Update the events state
        // ---------------------------
        // 1. Copy the old events array
        const updatedEvents = events.map(ev => {
            // 2. Find the event that matches the current one
            if (ev.idEvent === event.idEvent) {
                // 3. Update the classes array inside this event
                const updatedClasses = ev.classes.map(c => {
                    if (c.idClass === classe.idClass) {
                        // 4. Reduce the available capacity by 1
                        return {
                            ...c, // copy all other properties of the class
                            capacity: c.capacity - 1
                        };
                    } else {
                        return c; // other classes remain the same
                    }
                });

                // 5. Return the updated event object
                return {
                    ...ev, // copy all other properties of the event
                    classes: updatedClasses,
                    capacity: ev.capacity-1
                };
            } else {
                return ev; // other events remain the same
            }
        });

        // 6. Set the new events array into state
        setEvents(updatedEvents);
        setAlert({type:'success' , message:'Your seat is saved! 🎉 Enjoy the event!', show:true});

        } catch (err) {
            console.error("Reservation error:", err);
            setError("Reservation failed");
        }
    };

    return (

        <>

        {alert && 
        <Popup alert={alert} setAlert={setAlert} />
        }
        
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <span className="form-label">Name</span>
                {client ? (
                    <input
                        className="form-control"
                        type="text"
                        value={client.name}
                        readOnly
                    />
                ) : (
                    <input className="form-control" type="text" placeholder="Enter Your Name" />
                )}
            </div>

            <div className="form-group">
                <span className="form-label">Email</span>
                {client ? (
                    <input
                        className="form-control"
                        type="text"
                        value={client.email}
                        readOnly
                    />
                ) : (
                    <input className="form-control" type="text" placeholder="Enter Your Email" />
                )}
            </div>

            <div className="form-group">
                <span className="form-label">Phone Number</span>
                {client ? (
                    <input
                        className="form-control"
                        type="text"
                        value={client.phoneNumber}
                        readOnly
                    />
                ) : (
                    <input className="form-control" type="text" placeholder="Enter Your Phone Number" />
                )}
            </div>

            <div className="form-group">
                <span className="form-label">Classe</span>
                <select
                    className="form-control"
                    value={selectedClasseId}
                    onChange={(e) => setSelectedClasseId(e.target.value)}
                >
                    <option value="">-- Select Classe --</option>
                    {classes.map((classe) => (
                        <option key={classe.idClass} value={classe.idClass}>
                            {classe.className} = {classe.price} MAD
                        </option>
                    ))}
                </select>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="form-btn">
                <center>
                <button type="submit" className="submit-btn">
                    Reserve
                </button>
                </center>
            </div>
        </form>

        </>
    );
};

export default ReserverForm;
