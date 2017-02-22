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
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    addBox () {
        graphQlFetch(`mutation{addBox(id:"${this.props.id}",box:{text:"${this.state.text}",active:${this.state.active},timestamp:"${Date.now()}"}){boxes{text,active,timestamp}}}`)
            .then((resp) => {
                this.props.onAdd(resp.addBox.boxes);
            });
    }

    render () {
        return (
            <div className={s.root}>
                <label htmlFor="text-add">Box Text:</label>
                <input
                    id="text-add"
                    name="text"
                    type="text"
                    onChange={this.handleInputChange}
                />
                <label htmlFor="active-edit">Is Active:</label>
                <input
                    id="active-edit"
                    name="active"
                    type="checkbox"
                    onChange={this.handleInputChange}
                    checked={this.state.active}
                />
                <button onClick={this.addBox}>Add</button>
            </div>
        );
    }
}

export default withStyles(s)(Add);
