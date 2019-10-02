import React, { Component } from 'react';

class SideWidget extends Component {

render() {
    return this.props.Videos.map((json, i) => (
        <tr key={i}>
            <td>
                <p>{json.Video}</p>
                <canvas id="canvas"></canvas>
                    <video id={`${json.Video}`} width="80%" controls>
                    <source src={`/Media/${json.Video}`}/>
                    Your browser does not support HTML5 video.
                    </video>
            </td>
        </tr>
    ));
}
}

export default SideWidget;