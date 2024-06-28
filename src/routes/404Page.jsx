import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const PageNotFound = () => {
    return (
        <div className="container-fluid d-flex vh-100">
            <div className="row m-auto text-center">
                <div className="col">
                    <h1 className="display-1 text-primary">Oeps!</h1>
                    <h2 className="h4 text-dark">404 - PAGINA NIET GEVONDEN </h2>
                    <p className="text-muted">
                        De pagina die je zoekt is mogelijk verwijderd, 
                        de naam is gewijzigd of is tijdelijk niet beschikbaar.
                        
                    </p>
                    <a href="/" className="btn btn-outline-primary">Ga naar de homepagina</a>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;
