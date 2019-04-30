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
            { name: 'Turkey', url: flags_path + "turkey.png" },
            { name: 'Unknown', url: flags_path + "unknown.png" }
        ];
    }

    render() {
        var flag_name;
        if (!this.props.flag)
            flag_name = "Unknown";
        else
            flag_name = this.props.flag;
        return (<img className={this.props.className} src={this.flags.find((f) => { return (f.name === flag_name) }).url} alt={flag_name} title={flag_name} />);
    }
}

export default Flags;
