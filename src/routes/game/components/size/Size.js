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
        this.SaveConfig().then(() => {
            this.toggleEdit();
        });
    }

    async SaveConfig () {
        const resp = await fetch('/graphql', {
            method: 'post',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `mutation{updateConfig(id:"${this.props.id}",config:{columns:${this.state.columns},rows:${this.state.rows}}){_id}}`,
            }),
            credentials: 'include',
        });
        const { data } = await resp.json();
        if (!data) throw new Error('Failed to update.');
    }

    render () {
        return (
            <div className={s.root}>
                {this.state.isEdit ?
                    (
                        <div>
                            <label htmlFor="column-edit">Columns:</label>
                            <input
                              id="column-edit"
                              type="text"
                              value={this.state.columns}
                              onChange={this.onChangeColumn}
                            />
                            <label htmlFor="row-edit">Rows:</label>
                            <input
                              id="row-edit" type="text" value={this.state.rows}
                              onChange={this.onChangeRow}
                            />
                            <button onClick={this.saveState}>Save</button>
                        </div>
                    ) :
                    (
                        <div>
                            <p>Columns: {this.state.columns}, Rows: {this.state.rows}</p>
                            <button onClick={this.toggleEdit}>Edit</button>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default withStyles(s)(Size);
