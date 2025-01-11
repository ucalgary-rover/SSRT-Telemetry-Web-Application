/*
Authors: Marc Ty and Braeden
*/

import React, { useState, useEffect, useRef } from 'react';

import 'ol/ol.css';
import MapOL from 'ol/Map';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';

import MousePosition from 'ol/control/MousePosition';

import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style';
import { Control, ScaleLine, defaults as defaultControls } from 'ol/control';
import { fromLonLat } from 'ol/proj';
import { createStringXY } from 'ol/coordinate';

// Map server settings
import './Map.css';

import { UseSettingsGlobalState } from '../../context/SettingsContext.jsx';

// Initial position of the map
const INITIAL_POSITION = [-114.1347, 51.0784]; // Longitude, Latitude

function Map() {
  const { state } = UseSettingsGlobalState();
  const [intervalId, setIntervalId] = useState(null);
  const [ubloxmeta, setUbloxMeta] = useState(null);

  const dotFeature = useRef(null);
  const vectorSourceRef = useRef(null);
  const olmap = useRef(null); // Ref to store MapOL instance
  const position = useRef(null); // Ref to store current position

  const updateMapPosition = () => {
    if (olmap.current) {
      if (position.current != null) {
        console.log(`Going to last coordinate ${position.current}`) 
        olmap.current.getView().animate({
          center: fromLonLat(position.current),
          duration: 1000,
        });
      }
      else {
        console.log("Not going to last coordinate because it is null") 
        olmap.current.getView().animate({
          center: fromLonLat(INITIAL_POSITION),
          duration: 1000,
        });
      }
    }
  };

  // Function to create and update the dot feature
  const updateDotPosition = (lon, lat) => {
    if (!dotFeature.current) {
      dotFeature.current = new Feature({
        geometry: new Point(fromLonLat([lon, lat])),
      });

      const dotStyle = new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({ color: 'red' }), // Change color if needed
        }),
      });

      dotFeature.current.setStyle(dotStyle);
      vectorSourceRef.current.addFeatures([dotFeature.current]);
    } else {
      dotFeature.current.getGeometry().setCoordinates(fromLonLat([lon, lat]));
    }
  }

  // Initialize the map and set up the refs
  useEffect(() => {
    const vectorSource = new VectorSource();
    vectorSourceRef.current = vectorSource;

    const style = new Style({
      stroke: new Stroke({
        color: 'orange',
        width: 5,
      }),
    });

    const mousePositionControl = new MousePosition({
      coordinateFormat: createStringXY(6),
      projection: 'EPSG:4326',
      className: 'coordinate-label',
      target: document.getElementById('mouse-position'),
    });

    const tileLayer = new TileLayer({
      source: new OSM({
        url: state.tile_url,
        crossOrigin: 'anonymous',
      }),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: style,
    });

    const vectorLayerDots = new VectorLayer({
      source: vectorSource,
      style: new Style({
        image: new CircleStyle({
          radius: 5,
          fill: new Fill({ color: 'black' }),
        }),
      }),
    });

    olmap.current = new MapOL({
      controls: defaultControls().extend([
        new ScaleLine({
          units: 'degrees',
        }),
        mousePositionControl,
        new SetLastPositionControl()
      ]),
      target: 'map',
      layers: [
        tileLayer,
        vectorLayer,
        vectorLayerDots,
      ],
      view: new View({
        projection: 'EPSG:3857',
        center: fromLonLat(INITIAL_POSITION),
        zoom: 18,
      }),
    });

    // Cleanup event listener on unmount
    return () => {
      if (olmap.current) {
        olmap.current.setTarget(null); // Cleanup map target
      }
    };
  }, [state.tile_url]);

  // Creates a custom control within the map class
  // Referenced here: https://openlayers.org/en/latest/examples/custom-controls.html
  class SetLastPositionControl extends Control {
    /**
     * @param {Object} [opt_options] Control options.
     */
    constructor(opt_options) {
      const options = opt_options || {};
  
      const button = document.createElement('button');
      button.innerHTML = 'O';
  
      const element = document.createElement('div');
      element.className = 'set-last ol-control';
      element.appendChild(button);
  
      super({
        element: element,
        target: options.target,
      });
  
      button.addEventListener('click', updateMapPosition.bind(this), false);
    }
  }

  return (
    <div className="container-fluid">
      <div id="map"/>
    </div>
  );
}

export default Map;
