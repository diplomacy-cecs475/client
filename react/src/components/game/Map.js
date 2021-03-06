import React, { Component } from 'react';
import { createNotification } from "../../misc/CreateNotification";
import '../css/map.css';

class Map extends Component {
    constructor() {
        super();
        this.territories = [
            { key: "Mid", position: { x: 2, y: 57 } },
            { key: "NAt", position: { x: 2, y: 25 } },
            { key: "Nrg", position: { x: 30, y: 10 } },
            { key: "Bar", position: { x: 70, y: 3 } },
            { key: "Bot", position: { x: 58, y: 34 } },
            { key: "Bal", position: { x: 53, y: 44 } },
            { key: "Ska", position: { x: 44, y: 37 } },
            { key: "Nth", position: { x: 31, y: 36 } },
            { key: "Hel", position: { x: 38, y: 45 } },
            { key: "Eng", position: { x: 19, y: 53 } },
            { key: "Iri", position: { x: 15, y: 48 } },
            { key: "GoL", position: { x: 27, y: 77 } },
            { key: "Wes", position: { x: 18, y: 85 } },
            { key: "Tyn", position: { x: 41, y: 83 } },
            { key: "Adr", position: { x: 48, y: 75 } },
            { key: "Ion", position: { x: 48, y: 93 } },
            { key: "Aeg", position: { x: 68, y: 89 } },
            { key: "Eas", position: { x: 77, y: 94 } },
            { key: "Bla", position: { x: 77, y: 72 } },

            { key: "NAf", position: { x: 12, y: 93 } },
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
            { key: "Lvp", position: { x: 23, y: 39 } },
            { key: "Yor", position: { x: 26.5, y: 44 } },
            { key: "Wal", position: { x: 22, y: 47 } },
            { key: "Lon", position: { x: 26, y: 49 } },

            { key: "Bel", position: { x: 32, y: 54 } },
            { key: "Hol", position: { x: 35.5, y: 49 } },
            { key: "Ruh", position: { x: 37, y: 55 } },
            { key: "Kie", position: { x: 40, y: 51 } },
            { key: "Den", position: { x: 42, y: 41 } },
            { key: "Ber", position: { x: 46, y: 49 } },
            { key: "Pre", position: { x: 52, y: 49 } },
            { key: "Sil", position: { x: 51, y: 54 } },
            { key: "Mun", position: { x: 40, y: 59 } },

            { key: "Ven", position: { x: 42, y: 71 } },
            { key: "Pie", position: { x: 37, y: 69 } },
            { key: "Tus", position: { x: 41, y: 74 } },
            { key: "Rom", position: { x: 43, y: 78 } },
            { key: "Nap", position: { x: 47, y: 82 } },
            { key: "Apu", position: { x: 49, y: 80 } },

            { key: "Tyr", position: { x: 44, y: 65 } },
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
            { key: "StP", position: { x: 80, y: 25 } },

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
            { position: { x: 30, y: 53.5 }, home_territory: "Bel" },
            { position: { x: 35, y: 51 }, home_territory: "Net" },
            // Great britain
            { position: { x: 28, y: 50 }, home_territory: "Lon" },
            { position: { x: 24, y: 43 }, home_territory: "Liv" },
            { position: { x: 26, y: 35 }, home_territory: "Edi" },
            // Germany
            { position: { x: 42, y: 49 }, home_territory: "Kie" },
            { position: { x: 48, y: 52 }, home_territory: "Ber" },
            { position: { x: 43, y: 62 }, home_territory: "Mun" },
            // Denmark
            { position: { x: 46, y: 44 }, home_territory: "Den" },
            // Norway, sweden
            { position: { x: 41, y: 30 }, home_territory: "Nor" },
            { position: { x: 53, y: 35 }, home_territory: "Swe" },
            // Spain
            { position: { x: 15, y: 70 }, home_territory: "Spa" },
            { position: { x: 3.5, y: 75 }, home_territory: "Por" },
            // Tunis
            { position: { x: 38, y: 91 }, home_territory: "Tun" },
            // Russia
            { position: { x: 57, y: 52 }, home_territory: "War" },
            { position: { x: 70, y: 35 }, home_territory: "Rus" },
            { position: { x: 67, y: 50 }, home_territory: "Mos" },
            { position: { x: 80, y: 65 }, home_territory: "Sev" },
            // Saudi
            { position: { x: 81, y: 80 }, home_territory: "Ank" },
            { position: { x: 75, y: 83 }, home_territory: "Con" },
            { position: { x: 73, y: 89 }, home_territory: "Smy" },
            // Center europe
            { position: { x: 60, y: 65 }, home_territory: "Bud" },
            { position: { x: 51, y: 65 }, home_territory: "Vie" },
            { position: { x: 49, y: 70 }, home_territory: "Tri" },
            { position: { x: 60, y: 75 }, home_territory: "Ser" },
            { position: { x: 65, y: 78 }, home_territory: "Bul" },
            { position: { x: 70, y: 70 }, home_territory: "Rum" },
            { position: { x: 61, y: 85 }, home_territory: "Gre" },
            // Italia
            { position: { x: 42, y: 70 }, home_territory: "Ven" },
            { position: { x: 42.5, y: 78 }, home_territory: "Rom" },
            { position: { x: 48.5, y: 84 }, home_territory: "Nap" },
        ];

        this.neighbors = [
            { territory: "Par", neighbor: ["Bre", "Pic", "Bur", "Gas"] },
            { territory: "NAt", neighbor: ["Nrg", "Iri", "Mid"] },
            { territory: "Nrg", neighbor: ["NAt", "Cly", "Edi", "Nth", "Nwy", "Bar"] },
            {
                territory: "Bar", neighbor: ["Nrg", "Nwy", "StP"]
            },
            { territory: "StP", neighbor: ["Bar", "Fin", "Bot", "Lvn", "Mos"] },
            { territory: "Mos", neighbor: ["StP", "Lvn", "War", "Ukr", "Sev"] },
            { territory: "Sev", neighbor: ["Mos", "Ukr", "Rum", "Bla"] },
            { territory: "Bla", neighbor: ["Sev", "Rum", "Bul", "Con", "Ank", "Arm"] },
            { territory: "Arm", neighbor: ["Bla", "Ank", "Smy", "Syr"] },
            { territory: "Ank", neighbor: ["Bla", "Arm", "Smy", "Con"] },
            { territory: "Syr", neighbor: ["Arm", "Smy", "Eas"] },
            { territory: "Smy", neighbor: ["Con", "Ank", "Arm", "Syr", "Syr", "Eas", "Aeg"] },
            { territory: "Con", neighbor: ["Bla", "Ank", "Smy", "Aeg"] },
            { territory: "Aeg", neighbor: ["Gre", "Ion", "Eas", "Smy", "Con", "Bul"] },
            { territory: "Adr", neighbor: ["Ion", "Apu", "Ven", "Tri", "Alb"] },
            { territory: "Tyn", neighbor: ["Tus", "Rom", "Nap", "Ion", "Tun", "Wes", "GoL"] },
            { territory: "GoL", neighbor: ["Wes", "Spa", "Mar", "Pie", "Tus", "Tyn"] },
            { territory: "Wes", neighbor: ["NAf", "Spa", "GoL", "Tyn", "Tun"] },
            { territory: "Spa", neighbor: ["Wes", "Por", "Mid", "Gas", "Mar", "GoL"] },
            { territory: "Por", neighbor: ["Spa", "Mid"] },
            { territory: "Mid", neighbor: ["Spa", "Por", "NAf", "Gas", "Bre", "Eng", "Iri", "NAt"] },
            { territory: "Eng", neighbor: ["Bre", "Pic", "Bel", "Nth", "Lon", "Wal", "Iri", "Mid"] },
            { territory: "Iri", neighbor: ["Lvp", "Wal", "Eng", "Mid", "NAt"] },
            { territory: "Cly", neighbor: ["Lvp", "NAt", "Edi", "Nrg"] },
            { territory: "Edi", neighbor: ["Cly", "Lvp", "Yor", "Nth", "Nrg"] },
            { territory: "Lvp", neighbor: ["Cly", "NAt", "Iri", "Wal", "Yor", "Edi"] },
            { territory: "Yor", neighbor: ["Nth", "Lon", "Wal", "Lvp", "Edi"] },
            { territory: "Wal", neighbor: ["Iri", "Eng", "Lon", "Yor", "Lvp"] },
            { territory: "Lon", neighbor: ["Nth", "Eng", "Wal", "Yor"] },

            { territory: "Gas", neighbor: ["Bre", "Par", "Bur", "Mar", "Spa", "Mid"] },
            { territory: "Bre", neighbor: ["Gas", "Par", "Pic", "Eng", "Mid"] },
            { territory: "Pic", neighbor: ["Eng", "Bel", "Bur", "Par", "Bre"] },
            { territory: "Bur", neighbor: ["Bel", "Ruh", "Mun", "Mar", "Gas", "Par", "Pic"] },
            { territory: "Mar", neighbor: ["Spa", "Gas", "Bur", "Pie", "GoL"] },

            { territory: "Bel", neighbor: ["Pic", "Bur", "Ruh", "Hol", "Nth", "Eng"] },
            { territory: "Hol", neighbor: ["Bel", "Ruh", "Kie", "Hel", "Nth"] },
            { territory: "Ruh", neighbor: ["Hol", "Kie", "Mun", "Bur", "Bel"] },
            { territory: "Kie", neighbor: ["Den", "Ber", "Mun", "Ruh", "Hol", "Hel"] },

            { territory: "Mun", neighbor: ["Ruh", "Kie", "Ber", "Sil", "Boh", "Tyr", "Bur"] },
            { territory: "Pie", neighbor: ["Mar", "GoL", "Tus", "Ven", "Tyr"] },
            { territory: "Ven", neighbor: ["Tyr", "Tri", "Adr", "Apu", "Rom", "Tus", "Pie"] },
            { territory: "Tus", neighbor: ["Pie", "Ven", "Rom", "Tyn", "GoL"] },
            { territory: "Rom", neighbor: ["Tus", "Ven", "Apu", "Nap", "Tyn"] },
            { territory: "Apu", neighbor: ["Adr", "Ion", "Nap", "Rom", "Ven"] },
            { territory: "Nap", neighbor: ["Ion", "Tyn", "Rom", "Apu"] },
            { territory: "Tyr", neighbor: ["Mun", "Boh", "Vie", "Tri", "Ven", "Pie"] },

            { territory: "Tri", neighbor: ["Ven", "Tyr", "Vie", "Bud", "Ser", "Alb", "Adr"] },
            { territory: "Alb", neighbor: ["Tri", "Ser", "Gre", "Ion", "Adr"] },
            { territory: "Gre", neighbor: ["Alb", "Ser", "Bul", "Aeg", "Ion"] },
            { territory: "Ser", neighbor: ["Tri", "Bud", "Rum", "Bul", "Gre", "Alb"] },
            { territory: "Bul", neighbor: ["Gre", "Ser", "Rum", "Bla", "Aeg"] },
            { territory: "Rum", neighbor: ["Bul", "Ser", "Bud", "Gal", "Ukr", "Sev", "Bla"] },
            { territory: "Gal", neighbor: ["War", "Ukr", "Rum", "Bud", "Vie", "Boh", "Sil"] },
            { territory: "Vie", neighbor: ["Boh", "Gal", "Bud", "Tri", "Tyr"] },
            { territory: "Boh", neighbor: ["Sil", "Gal", "Vie", "Tyr", "Mun"] },
            { territory: "Sil", neighbor: ["Ber", "Pre", "War", "Gal", "Boh", "Mun"] },
            { territory: "Ber", neighbor: ["Bal", "Pre", "Sil", "Mun", "Kie"] },
            { territory: "Den", neighbor: ["Ska", "Bal", "Kie", "Hel", "Nth"] },
            { territory: "Nth", neighbor: ["Nrg", "Nwy", "Ska", "Den", "Hel", "Hol", "Bel", "Lon", "Yor", "Edi"] },
            { territory: "Hel", neighbor: ["Nth", "Den", "Kie", "Hol"] },
            { territory: "Ska", neighbor: ["Nwy", "Swe", "Den", "Nth"] },
            { territory: "Pre", neighbor: ["Bal", "Lvn", "War", "Sil", "Ber"] },
            { territory: "War", neighbor: ["Lvn", "Mos", "Ukr", "Gal", "Sil", "Pre"] },
            { territory: "Bud", neighbor: ["Gal", "Rum", "Ser", "Tri", "Vie"] },
            { territory: "Ukr", neighbor: ["Mos", "Sev", "Rum", "Gal", "War"] },
            { territory: "NAf", neighbor: ["Mid", "Wes", "Tun"] },

            { territory: "Tun", neighbor: ["NAf", "Wes", "Tyn", "Ion"] },
            { territory: "Bot", neighbor: ["Swe", "Fin", "StP", "Lvn", "Bal"] },
            { territory: "Lvn", neighbor: ["Bot", "StP", "Mos", "War", "Pre", "Bal"] }
        ];

        this.state = {
            selected_unit: null,
            orders: [],
            orders_sent: false
        }
    }
    // units
    componentDidMount() {
        global.socket.reconnect();
    }

    selectFleetUnit(territory) {
        this.setState({ selected_unit: { territory_name: territory.key, type: "fleet" } });
    }

    selectArmyUnit(territory) {
        console.log("army");
        this.setState({ selected_unit: { territory_name: territory.key, type: "army" } });
    }

    // Orders //

    allowOrder(from, to) {
        var from_neighbors = this.neighbors.find((neighbor) => { return (neighbor.territory === from) });
        if (from_neighbors < 0)
            return (false);
        if (from_neighbors.neighbor.find((territory) => { return (territory === to) }))
            return (true);
        return (false);
    }

    attack(territory) {
        const { selected_unit } = this.state;

        if (!this.allowOrder(selected_unit.territory_name, territory.key)) {
            createNotification("error", "This territory is too far");
            return;
        }
        createNotification("success", selected_unit.territory_name + " will attack " + territory.key + " with : " + selected_unit.type);
        this.addOrder(selected_unit.territory_name, territory.key, selected_unit.type, "attack");
        this.setState({ selected_unit: null });
    }

    support(territory) {
        const { selected_unit } = this.state;
        if (!this.allowOrder(selected_unit.territory_name, territory.key)) {
            createNotification("error", "This territory is too far");
            return;
        }
        createNotification("success", selected_unit.territory_name + " will support " + territory.key + " with : " + selected_unit.type);
        this.addOrder(selected_unit.territory_name, territory.key, selected_unit.type, "support");
        this.setState({ selected_unit: null });
    }

    addOrder(from, to, unit, type) {
        var { orders } = this.state;
        orders.push({ from: from, to: to, unit: unit, type: type });
        this.setState({ orders: orders })
    }

    removeOrder(from, to, unit) {
        var { orders } = this.state;

        var index = orders.findIndex((o) => { return (o.from === from && o.to === to && o.unit === unit); });
        if (index >= 0) {
            createNotification("success", "The order to " + orders[index].type + " " + orders[index].to + " from " + orders[index].from + " has been canceled");
            orders.splice(index, 1);
            this.setState({ orders: orders });
        }
    }

    sendOrders() {
        const { orders, orders_sent } = this.state;

        if (orders_sent) {
            createNotification("error", "Orders already sent");
            return;
        }
        global.socket.emit("send orders", { orders: orders }).then((response) => {
            console.log(response);
        });
        this.setState({ orders_sent: true });
    }

    isUnitInOrder(territory_name, unit_type) {
        const { orders } = this.state;
        return orders.find((o) => { return (o.from === territory_name && o.unit === unit_type) });
    }

    roundFinished() {
        this.setState({ orders_sent: false, orders: [] });
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
                        disabled={!territory_info.units.army || this.isUnitInOrder(territory_info.key, "army")}
                        onClick={() => { if (territory_info.units.army) this.selectArmyUnit(territory_info); }}
                    >
                        <i className="fas fa-male mr-1"></i>Army
                    </button>
                    <button
                        className="btn btn-light dropdown-item col-6"
                        disabled={!territory_info.units.fleet || this.isUnitInOrder(territory_info.key, "fleet")}
                        onClick={() => { if (territory_info.units.fleet) this.selectFleetUnit(territory_info); }}
                    >
                        <i className="fas fa-anchor mr-1"></i>Fleet
                </button>
                </div>
            </div>
        )
    }

    displayEnemyDropdown(territory) {
        const { selected_unit } = this.state;
        return (
            <div className="text-center">
                <label>Actions:</label>
                <div>
                    <button className="btn btn-light dropdown-item"
                        onClick={() => this.attack(territory)}
                        disabled={!selected_unit || selected_unit.type === "fleet"}>
                        <i className="fas fa-male mr-1"></i>Attack
            </button>
                    <button className="btn btn-light dropdown-item"
                        onClick={() => this.support(territory)}
                        disabled={!selected_unit || selected_unit.type === "fleet"}>
                        <i className="fas fa-anchor mr-1"></i>Support
                </button>
                </div>
            </div>
        );
    }

    displayTerritory(territory) {
        const { selected_unit } = this.state;
        const friendly = this.isFriendlyTerritory(territory.key);
        var territory_info = this.getTerritoryInfo(territory.key);
        var allow_order = true;
        var territory_color = "text-";

        if (selected_unit) {
            allow_order = this.allowOrder(selected_unit.territory_name, territory.key);
        }
        if (selected_unit && allow_order)
            territory_color += "primary";
        else if ((territory_info && territory_info.user === null) || !allow_order)
            territory_color += "muted";
        else if (friendly) {
            territory_color += "success";
        }
        else {
            territory_color += "danger";
        }
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
                    className={territory_color + " map-territory-name"}
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
                <div className="alert alert-info alert-dismissible fade show" role="alert">
                    <strong>Selected unit: </strong> {selected_unit.type} from {selected_unit.territory_name}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => { this.setState({ selected_unit: null }) }}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        );
    }

    displayOrders() {
        const { orders } = this.state;

        if (orders.length === 0) {
            return (<span className="dropdown-item">No orders yet</span>);
        }
        return orders.map((order, index) => {
            return (
                <div className="dropdown-item" key={"order-" + index} style={{ width: "250px" }}>
                    <span><i className={"fas fa-" + (order.unit === "fleet" ? "anchor" : "male") + " mr-1"}></i>{order.type}:{order.from} -> {order.to}
                        <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => { this.removeOrder(order.from, order.to, order.unit) }}>
                            <span aria-hidden="true">&times;</span>
                        </button></span>
                </div>
            );
        });
    }

    render() {
        return (
            <div className="col-12 map" id="map">
                <div className="dropdown map-orders-button">
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Orders
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        {this.displayOrders()}
                    </div>
                </div>
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
