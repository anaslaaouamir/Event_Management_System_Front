const EditEventForm = ({ event, classes }) => {
  return (
    <form>
      <div className="form-group">
        <span className="form-label">Title</span>
        <input className="form-control" type="text" defaultValue={event.title} />
      </div>

      <div className="form-group">
        <span className="form-label">Location</span>
        <input className="form-control" type="text" defaultValue={event.location} />
      </div>

      <div className="form-group">
        <span className="form-label">Date and time</span>
        <input
          className="form-control"
          type="datetime-local"
          defaultValue={event.eventDateTime.slice(0, 16)}
        />
      </div>

      <div className="form-group">
        <span className="form-label">Description</span>
        <textarea className="form-control" defaultValue={event.description} />
      </div>



      <div className="form-group form-group-inline">
        {classes.map(c=>(
        <div key={c.idClass}>
          <span className="form-label">{c.className} </span>
          <input className="form-control small-input" type="Number" defaultValue={c.fullCapacity} />
        </div>
))}
      </div>

      

      <div className="form-btn">
        <button type="submit" className="submit-btn">
          Proceed for checkOut
        </button>
      </div>
    </form>
  );
};

export default EditEventForm;
