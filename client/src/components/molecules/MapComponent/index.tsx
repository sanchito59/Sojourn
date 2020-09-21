import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Map, Marker, Popup, TileLayer, ScaleControl } from "react-leaflet";
import L from "leaflet";
import "./map.css";

const StyledMap = styled(Map)<any>`
  width: ${(props) => props.mapWidth}%;
  height: ${(props) => props.mapHeight}px;
`;

const MapComponent = ({
  markers,
  clickZoom,
  latitude,
  longitude,
  zoom,
  mapWidth,
  mapHeight,
}: {
  markers: any[];
  clickZoom: boolean;
  latitude: number;
  longitude: number;
  zoom: number;
  mapWidth: number;
  mapHeight: number;
}) => {
  const L = require("leaflet");

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  return (
    <div style={{ margin: "32px 0px" }}>
      <StyledMap
        center={[latitude, longitude]}
        zoom={zoom}
        doubleClickZoom={clickZoom}
        mapWidth={mapWidth}
        mapHeight={mapHeight}
      >
        <ScaleControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {markers.map((position, idx) => {
          return (
            <Marker key={`marker-${idx}`} position={position}>
              <Popup>
                <span>
                  {position.lat}, {position.lng}
                </span>
              </Popup>
            </Marker>
          );
        })}
      </StyledMap>
    </div>
  );
};

MapComponent.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

MapComponent.defaultProps = {
  clickZoom: true,
  zoom: 14,
  mapWidth: 100,
  mapHeight: 280,
};

export default MapComponent;
