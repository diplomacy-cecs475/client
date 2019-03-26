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
            { name: "Hel", position: { x: 38, y: 45 } },
            { name: "Eng", position: { x: 19, y: 53 } },
            { name: "Iri", position: { x: 15, y: 48 } },
            { name: "Gulf of Lyon", position: { x: 27, y: 77 } },
            { name: "West Mediterranean", position: { x: 18, y: 85 } },
            { name: "Tyr", position: { x: 41, y: 83 } },
            { name: "Adr", position: { x: 48, y: 75 } },
            { name: "Ionian Sea", position: { x: 48, y: 93 } },
            { name: "Aeg", position: { x: 68, y: 89 } },
            { name: "Eas", position: { x: 77, y: 94 } },
            { name: "Black Sea", position: { x: 77, y: 72 } },
           
            { name: "Por", position: { x: 3, y: 75 } },
            { name: "Spain", position: { x: 12, y: 75 } },
            { name: "Bre", position: { x: 22, y: 60 } },
            { name: "Gas", position: { x: 22, y: 67 } },
            { name: "Paris", position: { x: 26, y: 59 } },
            { name: "Pic", position: { x: 28, y: 55.5 } },
            { name: "Bur", position: { x: 31, y: 62 } },
            { name: "Mar", position: { x: 29, y: 70 } },
            
            { name: "Cly", position: { x: 23, y: 34 } },
            { name: "Edi", position: { x: 25.5, y: 36 } },
            { name: "Lyp", position: { x: 23, y: 39 } },
            { name: "Yor", position: { x: 26.5, y: 44 } },
            { name: "Wal", position: { x: 22, y: 47 } },
            { name: "Lon", position: { x: 26, y: 49 } },
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