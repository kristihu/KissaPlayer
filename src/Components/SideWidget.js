import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideWidget extends Component {

    render() {
        return this.props.Videos.map((json, i) => (
            <table>
                <tbody>
                    <tr key={i}>
                        <td>
                            <p>{json.Video}</p>
                            <Link onClick={() => this.props.changeVideo(json.Video)} to={`/${json.Video}`} >
                                <canvas id={`canvas${i}`}> </canvas>
                            </Link>
                            <video id={`${json.Video}`} width="80%" controls>
                                <source src={`/Media/${json.Video}`} />
                                Your browser does not support HTML5 video.
                    </video>
                        </td>
                    </tr>
                </tbody>
            </table>
        ));
    }
}

export default SideWidget;