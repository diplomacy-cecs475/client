import React, { Component } from 'react';
import '../css/map.css';

class Map extends Component {
    constructor() {
        super();
        this.territories = [
            { name: "Spain", position: { x: 12, y: 75 } }
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
            <div>
                <div className="map col-12">
                    {this.displayTerritories()}
                </div>
            </div>
        );
    }
}

export default Map;