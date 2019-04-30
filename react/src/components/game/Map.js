import React, { Component } from 'react';
import '../css/map.css';

class Map extends Component {
    constructor() {
        super();
        this.territories = [
            { key: "Mid Atlantic", position: { x: 2, y: 57 } },
            { key: "North Atlantic", position: { x: 2, y: 25 } },
            { key: "Norwegian Sea", position: { x: 30, y: 10 } },
            { key: "Barents Sea", position: { x: 70, y: 3 } },
            { key: "Bot", position: { x: 58, y: 34 } },
            { key: "Bal", position: { x: 53, y: 44 } },
            { key: "Ska", position: { x: 44, y: 37 } },
            { key: "North Sea", position: { x: 31, y: 36 } },
            { key: "Hel", position: { x: 38, y: 45 } },
            { key: "Eng", position: { x: 19, y: 53 } },
            { key: "Iri", position: { x: 15, y: 48 } },
            { key: "GoL", position: { x: 27, y: 77 } },
            { key: "Wes", position: { x: 18, y: 85 } },
            { key: "Tyr", position: { x: 41, y: 83 } },
            { key: "Adr", position: { x: 48, y: 75 } },
            { key: "Ion", position: { x: 48, y: 93 } },
            { key: "Aeg", position: { x: 68, y: 89 } },
            { key: "Eas", position: { x: 77, y: 94 } },
            { key: "Bla", position: { x: 77, y: 72 } },

            { key: "Naf", position: { x: 12, y: 93 } },
            { key: "Tun", position: { x: 35, y: 93 } },
            { key: "Por", position: { x: 3, y: 75 } },
            { key: "Spa", position: { x: 12, y: 75 } },
            { key: "Bre", position: { x: 22, y: 60 } },
            { key: "Gas", position: { x: 22, y: 67 } },
            { key: "Par", position: { x: 26, y: 59 } },
            { key: "Pic", position: { x: 28, y: 55.5 } },
            { key: "Bur", position: { x: 31, y: 62 } },
            { key: "Mar", position: { x: 29, y: 70 } },

            { key: "Cly", position: { x: 23, y: 34 } },
            { key: "Edi", position: { x: 25.5, y: 36 } },
            { key: "Lyp", position: { x: 23, y: 39 } },
            { key: "Yor", position: { x: 26.5, y: 44 } },
            { key: "Wal", position: { x: 22, y: 47 } },
            { key: "Lon", position: { x: 26, y: 49 } },

            { key: "Bel", position: { x: 32, y: 54 } },
            { key: "Hol", position: { x: 35.5, y: 49 } },
            { key: "Ruh", position: { x: 37, y: 55 } },
            { key: "Kie", position: { x: 40, y: 51 } },
            { key: "Den", position: { x: 42, y: 41 } },
            { key: "Ber", position: { x: 46, y: 49 } },
            { key: "Pru", position: { x: 52, y: 49 } },
            { key: "Sil", position: { x: 51, y: 54 } },
            { key: "Mun", position: { x: 40, y: 59 } },

            { key: "Ven", position: { x: 42, y: 71 } },
            { key: "Pie", position: { x: 37, y: 69 } },
            { key: "Tus", position: { x: 41, y: 74 } },
            { key: "Rom", position: { x: 43, y: 78 } },
            { key: "Nap", position: { x: 47, y: 82 } },
            { key: "Apu", position: { x: 49, y: 80 } },

            { key: "Trl", position: { x: 44, y: 65 } },
            { key: "Boh", position: { x: 48, y: 58 } },
            { key: "Vie", position: { x: 51, y: 62 } },
            { key: "Gal", position: { x: 60, y: 58 } },
            { key: "Bud", position: { x: 57, y: 65 } },
            { key: "Tri", position: { x: 52, y: 70 } },

            { key: "Ser", position: { x: 58, y: 74 } },
            { key: "Alb", position: { x: 57, y: 79 } },
            { key: "Gre", position: { x: 60.5, y: 83 } },
            { key: "Bul", position: { x: 65, y: 75 } },
            { key: "Rum", position: { x: 66, y: 71 } },

            { key: "War", position: { x: 59, y: 53 } },
            { key: "Ukr", position: { x: 70, y: 57 } },
            { key: "Sev", position: { x: 82, y: 57 } },
            { key: "Mos", position: { x: 81, y: 44 } },
            { key: "Lvn", position: { x: 64, y: 42 } },
            { key: "Stp", position: { x: 80, y: 25 } },

            { key: "Fin", position: { x: 64, y: 25 } },
            { key: "Swe", position: { x: 51, y: 27 } },
            { key: "Nwy", position: { x: 44, y: 29 } },

            { key: "Con", position: { x: 73, y: 83 } },
            { key: "Smy", position: { x: 78, y: 87 } },
            { key: "Ank", position: { x: 84, y: 80 } },
            { key: "Arm", position: { x: 95, y: 79 } },
            { key: "Syr", position: { x: 92, y: 90 } },

        ]

        // Position of the supply centers
        this.supplyCenters = [
            // France
            { position: { x: 18, y: 57 }, home_territory: "Bre" },
            { position: { x: 27, y: 60 }, home_territory: "Par" },
            { position: { x: 30, y: 71 }, home_territory: "Mar" },
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
            selected_unit: undefined
        }
    }
    // units

    selectFleetUnit(territory) {
        this.setState({ selected_unit: { territory_name: territory.key, type: "fleet" } });
    }

    selectArmyUnit(territory) {
        this.setState({ selected_unit: { territory_name: territory.key, type: "army" } });
    }

    // check if a territory is friendly
    isFriendlyTerritory(territoryName) {
        const { territories } = this.props;
        const my_username = localStorage.getItem("username");

        if (!territories)
            return (false);

        return (territories.find((territory) => { return (territory.key === territoryName && territory.user === my_username) }));
    }

    // Return informations about a territory (units, owner, ..)
    getTerritoryInfo(territory_name) {
        return (this.props.territories.find((t) => { return (t.key === territory_name) }));
    }

    // Territory hover functions //

    hoverCallback(territory) {
        // var newImage = document.createElement("img");
        // newImage.src = "..";
        // document.getElementById("map").appendChild(newImage);
    }

    addListeners() {
        this.territories.forEach((territory) => {
            var element = document.getElementById("territory-text-" + territory.key);
            if (element)
                element.addEventListener("mouseover", () => { this.hoverCallback(territory) });
        });
    }
    // //

    // territory display //

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

    displayFriendlyDropdown(territory) {
        const territory_info = this.getTerritoryInfo(territory.key);

        return (
            <div className="text-center">
                <label>Units:</label>
                <div className="row">
                    <button
                        className="btn btn-light dropdown-item col-6"
                        disabled={!territory_info.units.army}
                        onClick={() => { if (territory_info.units.army) this.selectArmyUnit(territory_info); }}
                    >
                        <i className="fas fa-male mr-1"></i>Army
                    </button>
                    <button
                        className="btn btn-light dropdown-item col-6"
                        disabled={!territory_info.units.fleet}
                        onClick={() => { if (territory_info.units.fleet) this.selectFleetUnit(territory_info); }}
                    >
                        <i className="fas fa-anchor mr-1"></i>Fleet
                </button>
                </div>
            </div>
        )
    }

    displayEnemyDropdown(territory) {
        return (
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
        );
    }

    displayTerritory(territory) {
        const friendly = this.isFriendlyTerritory(territory.key);

        return (
            <div className="dropdown show map-territory"
                style={
                    {
                        marginLeft: territory.position.x + "%",
                        marginTop: territory.position.y + "%"
                    }
                }
                key={"territory-" + territory.key}
            >
                <label
                    className={"text-" + (friendly ? "success" : "danger") + " map-territory-name"}
                    data-toggle="dropdown"
                    id={"territory-text-" + territory.key}
                >
                    {territory.key}
                    <br />
                </label >

                <div className="dropdown-menu" >
                    {(friendly ?
                        this.displayFriendlyDropdown(territory) :
                        this.displayEnemyDropdown(territory))}
                </div>
            </div >
        )
    }

    // //

    displayTerritories() {
        return this.territories.map((territory) => {
            return this.displayTerritory(territory);
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
                    Selected unit: <u>{selected_unit.type}</u> from <u>{selected_unit.territory_name}</u>
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