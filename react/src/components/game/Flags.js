import React, { Component } from 'react';
import '../css/flags.css';

class Flags extends Component {
    constructor() {
        super();
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
        return (<img className={this.props.className} src={this.flags.find((f) => { return (f.name === this.props.flag) }).url} alt={this.props.flag} title={this.props.flag} />);
    }
}

export default Flags;
