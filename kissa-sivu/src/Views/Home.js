import React, { Component } from 'react';


class Home extends Component {

    render() {
        return (
            <React.Fragment>
                <p>{this.props.title} {"<- props "}</p>
            </React.Fragment>
        );
    }
}

export default Home;