const Summary =({event}) =>{

    const formattedDate = event.eventDateTime
        ? event.eventDateTime.replace("T", " at ").slice(0, 16) // "YYYY-MM-DD HH:mm"
        : "";

    return (
<section id="facts" className="section bg-image-1 facts text-center">
        <div className="container">
            <div className="row">
                <div className="col-sm-3">

                    <i className="ion-ios-calendar"></i>
                    <h3>{formattedDate}</h3>
                
                </div>
                <div className="col-sm-3">

                    <i className="ion-ios-location"></i>
                    <h3>{event.location}</h3>
                
                </div>
                <div className="col-sm-3">

                    <i className="ion-pricetags"></i>
                    <h3>{event.fullCapacity} Places</h3>
                
                </div>
                <div className="col-sm-3">
                
                    <i className="ion-speakerphone"></i>
                    <h3>{event.capacity} Places available</h3>
                
                </div>
            </div>
        </div>
    </section>
    )
}

export default Summary