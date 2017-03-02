import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Add.css';
import graphQlFetch from '../../../../../../core/graphQlFetch';

class Add extends React.Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        onAdd: PropTypes.func.isRequired,
    };

    constructor (props) {
        super(props);

        this.addBox = this.addBox.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        this.state = {
            active: true,
            text: '',
        };
    }

    handleInputChange (event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value.trim();
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    addBox () {
        if (this.state.text.length > 0) {
            graphQlFetch(`mutation{addBox(id:"${this.props.id}",box:{text:"${this.state.text}",active:${this.state.active},timestamp:"${Date.now()}"}){boxes{text,active,timestamp}}}`)
            .then((resp) => {
                this.props.onAdd(resp.addBox.boxes);
            });
        }
    }

    render () {
        return (
            <div className={`form-inline ${s.inline}`}>
                <div className="form-group">
                    <label htmlFor="text-add">Box Text:</label>
                    <input
                        id="text-add"
                        name="text"
                        type="text"
                        className="form-control"
                        onChange={this.handleInputChange}
                    />
                </div>
                <div className="checkbox">
                    <label htmlFor="#active-edit">
                        <input
                            id="active-edit"
                            name="active"
                            type="checkbox"
                            className="form-control"
                            onChange={this.handleInputChange}
                            checked={this.state.active}
                        />
                        Is Active
                    </label>
                </div>
                <button
                    className="btn btn-success"
                    onClick={this.addBox}
                >
                    Add
                </button>
            </div>
        );
    }
}

export default withStyles(s)(Add);
