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

            { name: "Naf", position: { x: 12, y: 93 } },
            { name: "Tun", position: { x: 35, y: 93 } },
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

            { name: "Bel", position: { x: 32, y: 54 } },
            { name: "Hol", position: { x: 35.5, y: 49 } },
            { name: "Ruh", position: { x: 37, y: 55 } },
            { name: "Kie", position: { x: 40, y: 51 } },
            { name: "Den", position: { x: 42, y: 41 } },
            { name: "Ber", position: { x: 46, y: 49 } },
            { name: "Pru", position: { x: 52, y: 49 } },
            { name: "Sil", position: { x: 51, y: 54 } },
            { name: "Mun", position: { x: 40, y: 59 } },

            { name: "Ven", position: { x: 42, y: 71 } },
            { name: "Pie", position: { x: 37, y: 69 } },
            { name: "Tus", position: { x: 41, y: 74 } },
            { name: "Rom", position: { x: 43, y: 78 } },
            { name: "Nap", position: { x: 47, y: 82 } },
            { name: "Apu", position: { x: 49, y: 80 } },

            { name: "Trl", position: { x: 44, y: 65 } },
            { name: "Boh", position: { x: 48, y: 58 } },
            { name: "Vie", position: { x: 51, y: 62 } },
            { name: "Gal", position: { x: 60, y: 58 } },
            { name: "Bud", position: { x: 57, y: 65 } },
            { name: "Tri", position: { x: 52, y: 70 } },

            { name: "Ser", position: { x: 58, y: 74 } },
            { name: "Alb", position: { x: 57, y: 79 } },
            { name: "Gre", position: { x: 60.5, y: 83 } },
            { name: "Bul", position: { x: 65, y: 75 } },
            { name: "Rum", position: { x: 66, y: 71 } },

            { name: "War", position: { x: 59, y: 53 } },
            { name: "Ukr", position: { x: 70, y: 57 } },
            { name: "Sev", position: { x: 82, y: 57 } },
            { name: "Mos", position: { x: 81, y: 44 } },
            { name: "Lvn", position: { x: 64, y: 42 } },
            { name: "Stp", position: { x: 80, y: 25 } },

            { name: "Fin", position: { x: 64, y: 25 } },
            { name: "Swe", position: { x: 51, y: 27 } },
            { name: "Nwy", position: { x: 44, y: 29 } },

            { name: "Con", position: { x: 73, y: 83 } },
            { name: "Smy", position: { x: 78, y: 87 } },
            { name: "Ank", position: { x: 84, y: 80 } },
            { name: "Arm", position: { x: 95, y: 79 } },
            { name: "Syr", position: { x: 92, y: 90 } },

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
        ];

        this.state = {
            my_territories: [],
            units: [],
            selected_unit: undefined
        }
    }

    componentDidMount() {
        this.setState({
            my_territories: [
                { name: "Bre" },
                { name: "Paris" },
                { name: "Gas" },
            ],
            units: [
                { id: 1, territory: "Bre", type: "fleet" },
                { id: 2, territory: "Paris", type: "army" }
            ]
        });
    }

    // units

    selectNewUnit(unitId) {
        var unit = this.state.units.find((u) => { return (u.id === unitId) });

        if (!unit)
            return;
        this.setState({ selected_unit: unit });
    }

    // check if a territory is friendly
    isFriendlyTerritory(territoryName) {
        const { my_territories } = this.state;
        if (!my_territories)
            return (false);
        return (my_territories.find((territory) => { return (territory.name === territoryName) }));
    }

    displaySupplyCenters() {
        return this.supplyCenters.map((supplyCenter, index) => {
            return (<span
                key={"supply-center-" + index}
                className="map-supply-center circle"
                style={
                    {
                        marginLeft: supplyCenter.position.x + "%",
                        marginTop: supplyCenter.position.y - 1 + "%",
                    }
                }
            ></span>)
        });
    }

    // territory display //

    displayFriendlyTerritory(territory) {
        var units = this.state.units.filter((u) => { return (u.territory === territory.name) });
        var fleet = units.find((u) => { return (u.type === "fleet") });
        var army = units.find((u) => { return (u.type === "army") });

        return (
            <div className="dropdown show map-territory"
                style={
                    {
                        marginLeft: territory.position.x + "%",
                        marginTop: territory.position.y + "%"
                    }
                }
                key={"territory-" + territory.name}
            >
                <label
                    className={"text-success map-territory-name " + (territory.rotate !== undefined ? "rotate" + territory.rotate : "")}
                    data-toggle="dropdown"
                    id={"territory-text-" + territory.name}
                >
                    {territory.name}
                    <br />
                </label >

                <div className="dropdown-menu" >
                    <div className="text-center">
                        <label>Units:</label>
                        <div className="row">
                            <button
                                className="btn btn-light dropdown-item col-6"
                                disabled={!army}
                                onClick={() => { if (army) this.selectNewUnit(army.id); }}
                            >
                                <i className="fas fa-male mr-1"></i>Army
                                </button>
                            <button
                                className="btn btn-light dropdown-item col-6"
                                disabled={!fleet}
                                onClick={() => { if (fleet) this.selectNewUnit(fleet.id); }}
                            >
                                <i className="fas fa-anchor mr-1"></i>Fleet
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    hoverCallback(territory) {
        console.log("mouse is over " + territory.name);
        // var newImage = document.createElement("img");
        // newImage.src = "..";
        // document.getElementById("map").appendChild(newImage);
    }

    addListeners() {
        this.territories.forEach((territory) => {
            var element = document.getElementById("territory-text-" + territory.name);
            if (element)
                element.addEventListener("mouseover", () => { this.hoverCallback(territory) });
        });
    }

    displayEnemyTerritory(territory) {
        return (
            <div className="dropdown show map-territory"
                style={
                    {
                        marginLeft: territory.position.x + "%",
                        marginTop: territory.position.y + "%"
                    }
                }
                key={"territory-" + territory.name}
            >
                <label
                    className={"text-danger map-territory-name " + (territory.rotate !== undefined ? "rotate" + territory.rotate : "")}
                    data-toggle="dropdown"
                    id={"territory-text-" + territory.name}
                >
                    {territory.name}
                </label >

                <div className="dropdown-menu" >
                    <div className="text-center">
                        <label>Actions:</label>
                        <div>
                            <button className="btn btn-light dropdown-item">
                                <i className="fas fa-male mr-1"></i>Attack
                            </button>
                            <button className="btn btn-light dropdown-item">
                                <i className="fas fa-anchor mr-1"></i>Support
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    displayTerritories() {
        return this.territories.map((territory) => {
            if (this.isFriendlyTerritory(territory.name))
                return this.displayFriendlyTerritory(territory);
            else
                return this.displayEnemyTerritory(territory);
        });
    }

    displaySelectedUnit() {
        const { selected_unit } = this.state;

        if (!selected_unit) {
            return;
        }
        return (
            <div className="selected-unit-container row">
                <button className="btn btn-danger selected-unit-remove-btn"
                    onClick={() => { this.setState({ selected_unit: null }) }}>
                    <i className="fas fa-times-circle"></i>
                </button>
                <h4 hidden={!selected_unit} className="selected-unit-text">
                    Selected unit: <u>{selected_unit.type}</u> from <u>{selected_unit.territory}</u>
                </h4>
            </div>
        );
    }

    render() {
        return (
            <div className="col-12 map" id="map">
                {this.displaySelectedUnit()}
                {this.displaySupplyCenters()}
                {this.displayTerritories()}
                {this.addListeners()}
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