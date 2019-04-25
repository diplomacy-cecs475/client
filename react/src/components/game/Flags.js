import React, { Component } from 'react';

class Flags extends Component {
    constructor() {

    }

    render() {
        if (!this.props.flag)
            return ("Unknown flag");
    }
}

export default Flags;
