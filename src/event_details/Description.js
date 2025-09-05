
const Description = ({event,classes}) => {

    

    return (
        <section id="about" className="section about">

        <div className="container">
            <div className="row">
                <div className="col-sm-6">

                    <h3 className="section-title">Description</h3> 
                    <p style={{ color: 'black' , fontSize:'15px' }}>{event.description} </p>
                    <br/>
                    <h3 className="section-title">Salle</h3> 
                    <figure>
                        <img alt="" className="img-responsive" src={`http://localhost:9092/${event.salleImagePath}`}/>
                    </figure>

                </div>

                <div className="col-sm-6">

                    <h3 className="section-title multiple-title">Classes: </h3>

                
                    <ul className="list-arrow-right" >

                        {classes.map(classe=>(

                       
                        <li style={{
                            backgroundColor: '#f9f9f9',  // light background
                            padding: '10px 15px',        // spacing inside
                            marginBottom: '8px',         // space between list items
                            borderRadius: '8px',         // rounded corners
                            boxShadow: '0 1px 3px rgba(0,0,0,0.1)', // subtle shadow
                            fontSize: '16px',            // font size
                            color: '#333',               // text color
                            lineHeight: '1.5'            // spacing between lines
                        }} key={classe.idClass}>
                        <strong>{classe.className}</strong> ({classe.price} dh): {classe.description} <br/>
                        <span style={{ color: '#007BFF' }}>{classe.fullCapacity} places</span> - <em>{classe.capacity} available</em>
                        </li>

                        
                    ))}
                    
                    </ul>

                </div>
              </div>
            
                </div>
          </section>
    )
}

export default Description