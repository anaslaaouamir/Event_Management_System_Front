import { useEffect, useState } from 'react';
import './reserver.css';
import axios from "axios"; 
import { useContext } from 'react';
import DataContext from '../context/DataContext';

const ReserverForm = ({ event, classes, token }) => {
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
              console.log(token)
              
            const response = await axios.post(
                "http://localhost:9093/reservations",
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

            // 👉 you can redirect or show success message here
        } catch (err) {
            console.error("Reservation error:", err);
            setError("Reservation failed");
        }
    };

    return (
        
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
                <button type="submit" className="submit-btn">
                    Proceed for checkOut
                </button>
            </div>
        </form>
    );
};

export default ReserverForm;
