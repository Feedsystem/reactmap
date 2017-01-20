import React, { Component } from 'react';
import './App.css';
import ReactModal from 'react-modal';

/* global google */
import fetch from "isomorphic-fetch";

import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps/lib";

import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";

const MarkerClustererExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={5}
    defaultCenter={{ lat: 64.9277795, lng: 20.7601013 }}
  >
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
    >
      {props.markers.map(marker => (
        <Marker
          position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
          key={encodeURIComponent(marker.title)}
          onClick={props.handleOpenModal.bind(marker)}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

class App extends Component {

  constructor () {
    super();
    this.state = {
      markers: [],
      showModal: false
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal () {
    this.setState({ showModal: true });
  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  componentDidMount() {
    fetch(`http://circlek.dev/stations.json`)
      .then(res => res.json())
      .then(data => {
        this.setState({ markers: data.data });
      });
  }

  render() {
    return (
      <div style={{ height: `100%` }}>
      <MarkerClustererExampleGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        markers={this.state.markers}
        handleOpenModal={this.handleOpenModal}
      />

      <ReactModal
         isOpen={this.state.showModal}
         contentLabel="Minimal Modal Example"
      >
        <button onClick={this.handleCloseModal}>Close Modal</button>
      </ReactModal>
    </div>
    );
  }
}

export default App;
