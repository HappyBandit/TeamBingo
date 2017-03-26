/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Size.css';
import graphQlFetch from '../../../../../../core/graphQlFetch';

class Size extends React.Component {
    static propTypes = {
        config: PropTypes.shape({
            columns: PropTypes.number,
            rows: PropTypes.number,
        }),
        id: PropTypes.string.isRequired,
    };

    static defaultProps = {
        config: {
            columns: '',
            rows: '',
        },
        id: '',
    };

    constructor (props) {
        super(props);

        this.toggleEdit = this.toggleEdit.bind(this);
        this.saveState = this.saveState.bind(this);
        this.onChangeColumn = this.onChangeColumn.bind(this);
        this.onChangeRow = this.onChangeRow.bind(this);

        this.state = {
            isEdit: !props.config || !props.config.columns || !props.config.rows,
            columns: props.config ? props.config.columns : undefined,
            rows: props.config ? props.config.rows : undefined,
        };
    }

    onChangeColumn (event) {
        this.setState({ columns: event.target.value });
    }

    onChangeRow (event) {
        this.setState({ rows: event.target.value });
    }

    toggleEdit () {
        this.setState(prevState => ({
            isEdit: !prevState.isEdit,
        }));
    }

    saveState () {
        graphQlFetch(`mutation{updateConfig(id:"${this.props.id}",config:{columns:${this.state.columns},rows:${this.state.rows}}){_id}}`)
        .then(() => {
            this.toggleEdit();
        });
    }

    render () {
        let html;
        if (this.state.isEdit) {
            html = (
                <div className="form-inline">
                    <div className="form-group">
                        <label htmlFor="column-edit">Columns:</label>
                        <input
                            id="column-edit"
                            type="text"
                            className="form-control"
                            value={this.state.columns}
                            onChange={this.onChangeColumn}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="row-edit">Rows:</label>
                        <input
                            id="row-edit"
                            type="text"
                            value={this.state.rows}
                            className="form-control"
                            onChange={this.onChangeRow}
                        />
                    </div>
                    <button className="btn btn-primary" onClick={this.saveState}>Save</button>
                </div>);
        } else {
            html = (
                <div>
                    <p className={s.text}>Columns: {this.state.columns}, Rows: {this.state.rows}</p>
                    <button className="btn btn-primary" onClick={this.toggleEdit}>Edit</button>
                </div>
            );
        }

        return html;
    }
}

export default withStyles(s)(Size);
