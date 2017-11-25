import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { getTrips } from '../actions/tripActions'
import { connect } from 'react-redux'

import NewTrip from './NewTrip'
import Trip from '../components/Trip'


class TripsIndex extends Component {

    constructor(props) {
        super(props)
    }

    componentWillMount(){
        this.props.getTrips()
    }

    render(){
        const trips = this.props.trips.map((trip) => (<Trip key={trip.id} trip={trip} />) )
        return (
            <div>
                <div className="trips-header">
                    <NewTrip />
                </div>
                <div className="trips-body">
                    <h2>Your Trips</h2>
                    <div>
                        {trips}
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        trips: state.trips
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({getTrips: getTrips}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(TripsIndex)