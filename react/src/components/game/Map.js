import React, { Component } from 'react';
import '../css/map.css';

class Map extends Component {
    constructor() {
        super();
        this.territories = [
            { name: "Mid Atlantic", position: { x: 2, y: 57 } },
            { name: "North Atlantic", position: { x: 2, y: 25 } },
            { name: "Norwegian Sea", position: { x: 30, y: 10 } },
            { name: "Barents Sea", position: { x: 70, y: 3 } },
            { name: "Bot", position: { x: 58, y: 34 } },
            { name: "Bal", position: { x: 53, y: 44 } },
            { name: "Ska", position: { x: 44, y: 37 } },
            { name: "North Sea", position: { x: 31, y: 36 } },
            { name: "Hel", position: { x: 39, y: 45 } },
            { name: "Eng", position: { x: 19, y: 53 } },
            { name: "Iri", position: { x: 15, y: 48 } },
            { name: "Gulf of Lyon", position: { x: 27, y: 77 } },
            { name: "West Mediterranean", position: { x: 18, y: 85 } },
            { name: "Tyrhennian Sea", position: { x: 12, y: 75 } },
            { name: "Adriatic Sea", position: { x: 12, y: 75 } },
            { name: "Ionian Sea", position: { x: 12, y: 75 } },
            { name: "Aegean Sea", position: { x: 12, y: 75 } },
            { name: "East Mediterranean", position: { x: 12, y: 75 } },
            { name: "Black Sea", position: { x: 12, y: 75 } },
           
            
            { name: "Spain", position: { x: 12, y: 75 } },
            { name: "Bre", position: { x: 22, y: 60 } }
        ]
        this.supplyCenters = [
            { position: { x: 18, y: 57 } }
        ]
    }

    displaySupplyCenters() {
        return this.supplyCenters.map((supplyCenter) => {
            return (<i
                className="fas fa-warehouse map-supply-center"
                style={
                    {
                        marginLeft: supplyCenter.position.x + "%",
                        marginTop: supplyCenter.position.y + "%"
                    }
                }
            ></i>)
        });
    }

    displayTerritories() {
        return this.territories.map((territory) => {
            return (
                <label key={territory.name}
                    className={"map-territory-name " + (territory.rotate !== undefined ? "rotate" + territory.rotate : "")}
                    style={
                        {
                            marginLeft: territory.position.x + "%",
                            marginTop: territory.position.y + "%"
                        }
                    }
                >
                    {territory.name}
                </label >
            );
        });
    }

    render() {
        return (
            <div className="col-12 map">
                {this.displayTerritories()}
                {this.displaySupplyCenters()}
                {/* Display an empty element to set the correct size to the map */}
                <label style={
                    {
                        marginLeft: "100%",
                        marginTop: "100%"
                    }
                }></label>
            </div >
        );
    }
}

export default Map;