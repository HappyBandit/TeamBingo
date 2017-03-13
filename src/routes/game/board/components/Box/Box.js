import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Box.css';
import graphQlFetch from '../../../../../core/graphQlFetch';

class Box extends React.Component {
    static propTypes = {
        gameId: PropTypes.string.isRequired,
        width: PropTypes.string.isRequired,
        boardTimestamp: PropTypes.string,
        box: PropTypes.shape({
            text: PropTypes.string.isRequired,
            timestamp: PropTypes.string,
            selected: PropTypes.bool,
        }).isRequired,
    };

    static defaultProps = {
        boardTimestamp: '',
    };

    constructor (props) {
        super(props);

        this.clickBox = this.clickBox.bind(this);

        this.state = {
            box: this.props.box,
        };
    }

    clickBox () {
        if (this.state.box.timestamp !== null) {
            graphQlFetch(`mutation{selectBox(boxTimestamp:"${this.state.box.timestamp}",gameId:"${this.props.gameId}",selected:${!this.state.box.selected},boardTimestamp:"${this.props.boardTimestamp}"){text,selected,timestamp}}`)
            .then((resp) => {
                this.setState({ box: resp.selectBox });
            });
        }
    }

    render () {
        return (
            <a
                className={`${s.box} ${this.state.box.selected ? s.selected : ''}`}
                style={{ width: this.props.width }}
                onClick={this.clickBox}
                tabIndex="0"
            >
                <div className={s.square}>
                    <p>
                        {this.state.box.text || '\u00A0'}
                    </p>
                </div>
            </a>
        );
    }
}

export default withStyles(s)(Box);
