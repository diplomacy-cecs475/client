import React, { Component } from 'react';

class Flags extends Component {
    constructor() {
        const flags_path = "/images/flags/";
        this.flags = [
            { name: 'Austria', url: flags_path + "austria.png" },
            { name: 'England', url: flags_path + "england.png" },
            { name: 'France', url: flags_path + "france.png" },
            { name: 'Germany', url: flags_path + "germany.png" },
            { name: 'Italy', url: flags_path + "italy.png" },
            { name: 'Russia', url: flags_path + "russia.png" },
            { name: 'Turkey', url: flags_path + "turkey.png" }
        ];
    }

    render() {
        if (!this.props.flag)
            return ("Unknown flag");
        return (<img src={this.flags.find((f) => { return (f.name === this.props.flag) }).url} />);
    }
}

export default Flags;
