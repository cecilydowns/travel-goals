import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { deleteTrip } from '../actions/tripActions'
import { deleteActivity } from '../actions/activityActions'
import { Redirect } from 'react-router-dom'


import ActivityList from '../components/ActivityList'
import NewActivity from './NewActivity'

import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGoogleMap from "react-google-map"
import GoogleMapsKey from "../googleMapsKey.js"

import '../stylesheets/trip-page.css';
import '../stylesheets/activity.css';


class TripsShow extends Component {

    constructor(){
        super()

    }

    handleDeleteTrip = () => {
        this.props.deleteTrip(this.props.trip.id)
    }

    render(){

        if(this.props.deleted === true){
            return (
                <Redirect to="/trips" />
            )
        }

        const style = { backgroundImage: `url(${this.props.trip.image_regular})` }
        const mapCoordinates = [{
                title: this.props.trip.location,
                position: {
                    lat: this.props.trip.latitude,
                    lng: this.props.trip.longitude
                }
            }]

        return (
            <div>
                <div className="trip-header" style={style}></div>
                <div className="trips-body">
                    <ReactGoogleMapLoader
                        params={{  key: GoogleMapsKey(), libraries: "places,geometry" }}
                        render={googleMaps =>
                            googleMaps && (
                            <div className="trip-show-map">
                                <ReactGoogleMap
                                googleMaps={googleMaps}
                                autoFitBounds={false}
                                coordinates={mapCoordinates}
                                center={mapCoordinates[0].position}
                                zoom={4}
                                />
                            </div>
                            )}
                    />

                    <div className="trip-show-content">
                        <h2>{this.props.trip.location} <span className="trip-show-date">{this.props.trip.date}</span></h2>
                        <div className="trip-notes">{this.props.trip.notes}</div>
                        <ActivityList activities={this.props.trip.activities} deleteActivity={this.props.deleteActivity} />
                        <NewActivity tripId={this.props.trip.id} />
                    </div>

                    <div className="delete-trip" onClick={this.handleDeleteTrip}>Delete This Trip</div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = (state, ownProps) => {

    const trip = state.trips.find(trip => trip.id == ownProps.match.params.id)

    if(trip){
        return { trip }
    } else {
        return {
            trip: {},
            deleted: true }
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({deleteTrip: deleteTrip, deleteActivity: deleteActivity}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TripsShow)