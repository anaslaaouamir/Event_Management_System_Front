import { useState , useEffect} from "react";
import axios from "axios"; 

const EditEventForm = ({ event, classes, token, events, setEvents }) => {
  const [error, setError] = useState("");

  // Controlled states
  const [title, setTitle] = useState(event.title || "");
  const [location, setLocation] = useState(event.location || "");
  const [eventDateTime, setEventDateTime] = useState(
    event.eventDateTime ? event.eventDateTime.slice(0, 16) : ""
  );
  const [description, setDescription] = useState(event.description || "");
  const [eventImage, setEventImage] = useState(event.imagePath || "");
  const [salleImage, setSalleImage] = useState(event.salleImagePath || "");

  // For class capacities
  const [classCapacities, setClassCapacities] = useState(
    classes.map(c => ({ idClass: c.idClass, className: c.className, fullCapacity: c.fullCapacity}))
  );

  const handleClassChange = (idClass, value) => {
    setClassCapacities(prev =>
      prev.map(c =>
        c.idClass === idClass   ? { ...c, fullCapacity: value } : c
      )
    );
  };

  console.log(
    title + " - " + location + " - " + eventDateTime + " - " + description + " - " +
    salleImage + " - " + eventImage + " - " +
    JSON.stringify(classCapacities)
  );
  
  console.log("token: "+token)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.put(
        `http://localhost:9092/events/${event.idEvent}`,
        {
          title,
          location,
          eventDateTime,
          description,
          imagePath: eventImage,
          salleImage,
          classes: classCapacities
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
  
      const updatedEvent = response.data;
      // ✅ Proper update of events state
      setEvents(events.map(ev =>
      ev.idEvent === updatedEvent.idEvent ? updatedEvent : ev
      ));         
      console.log("Event updated:", updatedEvent);
    } catch (err) {
      console.error("Update error:", err);
      setError("Update failed");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="form-group">
        <span className="form-label">Title</span>
        <input
          className="form-control"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="form-group">
        <span className="form-label">Location</span>
        <input
          className="form-control"
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="form-group">
        <span className="form-label">Date and time</span>
        <input
          className="form-control"
          type="datetime-local"
          value={eventDateTime}
          onChange={(e) => setEventDateTime(e.target.value)}
        />
      </div>

      <div className="form-group">
        <span className="form-label">Description</span>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group form-group-inline">
        {classCapacities.map((c) => (
          <div key={c.idClass}>
            <span className="form-label">{c.className}</span>
            <input
              className="form-control small-input"
              type="number"
              value={c.fullCapacity}
              onChange={(e) =>
                handleClassChange(c.idClass, Number(e.target.value))
              }
            />
          </div>
        ))}
      </div>

        {/* Event Image Upload */}
        <div className="form-group">
          <span className="form-label">Change Event Image</span>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                const file = e.target.files[0];
                setEventImage(`images/events/${file.name}`);
              }
            }}
          />
        </div>

        {/* Salle Image Upload */}
        <div className="form-group">
          <span className="form-label">Change Salle Image</span>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files.length > 0) {
                const file = e.target.files[0];
                setSalleImage(`images/salles/${file.name}`);
              }
            }}
          />
        </div>


      <div className="form-btn">
        <button type="submit" className="submit-btn">
          Update Event
        </button>
      </div>
    </form>
  );
};

export default EditEventForm;
