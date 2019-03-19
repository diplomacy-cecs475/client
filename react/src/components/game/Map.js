import React, { Component } from 'react';
import '../css/map.css';

class Map extends Component {
    constructor() {
        super();
        this.territories = [
            { name: "Spain", position: { x: 12, y: 75 } },
            { name: "Bre", position: { x: 22, y: 60 } }
        ]
    }

    displayTerritories() {
        return this.territories.map((territory) => {
            return (
                <label key={territory.name}
                    className="map-territory-name"
                    style={
                        {
                            marginLeft: territory.position.x + "%",
                            marginTop: territory.position.y + "%"
                        }
                    }
                >
                    {territory.name}
                </label>
            );
        });
    }

    render() {
        return (
            <div className="col-12 map">
                {this.displayTerritories()}
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