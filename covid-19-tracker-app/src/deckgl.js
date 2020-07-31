import React, { Component } from "react";
import { MapView } from "@deck.gl/core";
import DeckGL from "@deck.gl/react";
import { StaticMap } from "react-map-gl";
import { ScatterplotLayer } from "@deck.gl/layers";
import axios from "axios";
// import Supercluster from "supercluster";

const INITIAL_VIEW_STATE = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 30,
};

const MAP_VIEW = new MapView({ repeat: true });
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY; // eslint-disable-line

export class Root extends Component {
  state = {
    countries: [],
  };

  async componentDidMount() {
    const { data } = await axios.get("https://corona.lmao.ninja/v2/countries");
    this.setState({ countries: data });
  }

  render() {
    const layers = [
      new ScatterplotLayer({
        id: "scatter",
        data: this.state.countries,
        pickable: true,
        opacity: 0.8,
        filled: true,
        radiusMinPixels: 30,
        getPosition: (d) => [d.countryInfo.long, d.countryInfo.lat],
        getFillColor: (d) =>
          d.critical > 5 ? [200, 0, 40, 150] : [255, 140, 0, 100],
        onHover: ({ object, x, y }) => {
          const el = document.getElementById("tooltip");
          if (object) {
            const { cases, country, deaths, recovered } = object;
            el.innerHTML = `<strong>Country ${country}</strong> <br /> <span>Cases: ${cases}</span> <br /> <span>Death: ${deaths} </span> <br /> <span>Recovered: ${recovered} </span>`;
            el.style.display = "block";
            el.style.opacity = 0.9;
            el.style.left = x + "px";
            el.style.top = y + 1000 + "px";
          } else {
            el.style.opacity = 0.0;
          }
        },
      }),
    ];

    return (
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={{ dragRotate: false }}
        layers={layers}
        views={MAP_VIEW}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      >
        <StaticMap
          reuseMaps
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v9"
          preventStyleDiffing={true}
        />
      </DeckGL>
    );
  }
}
