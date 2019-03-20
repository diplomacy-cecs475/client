import React, { Component } from 'react';
import '../css/map.css';

class Map extends Component {
    constructor() {
        super();
        this.territories = [
            { name: "Spain", position: { x: 12, y: 75 } },
            { name: "Bre", position: { x: 22, y: 60 } }
        ]

        // Position of the supply centers
        this.supplyCenters = [
            // France
            { position: { x: 18, y: 57 }, home_territory: "Bre" },
            { position: { x: 27, y: 60 }, home_territory: "Paris" },
            { position: { x: 30, y: 71 }, home_territory: "Marseille" },
            // Belgium, netherland
            { position: { x: 30, y: 53.5 }, home_territory: "Belg" },
            { position: { x: 35, y: 51 }, home_territory: "Neth" },
            // Great britain
            { position: { x: 28, y: 50 }, home_territory: "London" },
            { position: { x: 24, y: 43 }, home_territory: "Liverpool" },
            { position: { x: 26, y: 35 }, home_territory: "Edinburgh" },
            // Germany
            { position: { x: 42, y: 49 }, home_territory: "Kiel" },
            { position: { x: 48, y: 52 }, home_territory: "Berlin" },
            { position: { x: 43, y: 62 }, home_territory: "Munich" },
            // Denmark
            { position: { x: 46, y: 44 }, home_territory: "Denmark" },
            // Norway, sweden
            { position: { x: 41, y: 30 }, home_territory: "Norway" },
            { position: { x: 53, y: 35 }, home_territory: "Sweden" },
            // Spain
            { position: { x: 15, y: 70 }, home_territory: "Spain" },
            { position: { x: 3.5, y: 75 }, home_territory: "Portugal" },
            // Tunis
            { position: { x: 38, y: 91 }, home_territory: "Tunis" },
            // Russia
            { position: { x: 57, y: 52 }, home_territory: "Warsaw" },
            { position: { x: 70, y: 35 }, home_territory: "Russia2" },
            { position: { x: 67, y: 52 }, home_territory: "Moscow" },
            { position: { x: 80, y: 65 }, home_territory: "Sevastopol" },
            // Saudi
            { position: { x: 81, y: 80 }, home_territory: "Ankara" },
            { position: { x: 75, y: 83 }, home_territory: "Constantinople" },
            { position: { x: 73, y: 89 }, home_territory: "Smyrna" },
            // Center europe
            { position: { x: 60, y: 65 }, home_territory: "Budapest" },
            { position: { x: 51, y: 65 }, home_territory: "Vienna" },
            { position: { x: 49, y: 70 }, home_territory: "Trieste" },
            { position: { x: 60, y: 75 }, home_territory: "Serbia" },
            { position: { x: 65, y: 78 }, home_territory: "Bulgaria" },
            { position: { x: 70, y: 70 }, home_territory: "Rumania" },
            { position: { x: 61, y: 85 }, home_territory: "Greece" },
            // Italia
            { position: { x: 42, y: 70 }, home_territory: "Venice" },
            { position: { x: 42.5, y: 78 }, home_territory: "Rome" },
            { position: { x: 48.5, y: 84 }, home_territory: "Naples" },
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