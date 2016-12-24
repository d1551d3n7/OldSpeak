import $ from 'jquery'
import _ from 'lodash'
import React from 'react'
import HeaderView from './HeaderView.jsx'
import LoadingView from './LoadingView.jsx'

import AuthenticatedView from './AuthenticatedView.jsx'
import ErrorView from './ErrorView.jsx'

import { Col, Panel, Button } from 'react-bootstrap';
import {connect} from 'react-redux';

import APIClient from '../networking.jsx';


class DashboardView extends React.Component {
    propTypes: {
        errors: React.PropTypes.array,
    }
    constructor() {
        super();
        this.api = new APIClient();
        this.refresh = this.refresh.bind(this);
    }
    refresh(){
        const {store} = this.context;
        store.dispatch({
            type: "CLEAR_ERRORS",
        });
    }
    componentDidMount() {
        this.timer = setTimeout(() => {
            this.refresh();
        }.bind(this), 3000);
    }
    render() {
        const {errors} = this.props;
        return (
            <AuthenticatedView>
                <HeaderView navigation={true} />
                <Col md={12}>
                    <h1>OldSpeak</h1>
                </Col>
                <Col md={6}>
                    {errors.length > 0 ? <ErrorView /> : null}
                </Col>
            </AuthenticatedView>
        )
    }
}

DashboardView.contextTypes = {
    store: React.PropTypes.object
};

export default DashboardView = connect(
    (state) => {
        return {
            errors: state.errors || [],
        }
    },
    (dispatch) => {
        return {
        }
    },
)(DashboardView);
