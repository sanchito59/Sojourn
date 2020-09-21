import React, { useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  Button,
  Box,
  Container,
  TextField,
  Typography,
  FormControl,
} from "@material-ui/core";
import { Map, Marker, Popup, TileLayer, ScaleControl } from "react-leaflet";
import { addPost } from "../../../../actions/post";

const CallToAction = styled(Typography)<any>`
  @media only screen and (max-width: 767px) {
    font-size: 1.6rem;
  }
`;

const PostForm = ({ addPost }: { addPost: Function }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [markers, setMarkers] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const addMarker = (e: any) => {
    const markers: any = [];
    markers.push(e.latlng);
    setMarkers(markers);
    setLatitude(markers[0].lat);
    setLongitude(markers[0].lng);
  };

  const L = require("leaflet");

  delete L.Icon.Default.prototype._getIconUrl;

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });

  return (
    <Container>
      <Box my={4}>
        <CallToAction variant="h4" component="h1" paragraph>
          Find something interesting?
        </CallToAction>
        <div style={{ margin: "32px 0px" }}>
          <Map
            center={[44.29296554197513, -122.88739542796756]}
            zoom={14}
            onClick={(e: Event) => addMarker(e)}
            doubleClickZoom={false}
          >
            <ScaleControl position="bottomright" />
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((position, idx) => (
              <Marker key={`marker-${idx}`} position={position}>
                <Popup>
                  <span>
                    {latitude}, {longitude}
                  </span>
                </Popup>
              </Marker>
            ))}
          </Map>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addPost({ title, text, latitude, longitude });
            setText("");
            setTitle("");
            setLatitude(null);
            setLongitude(null);
            setMarkers([]);
          }}
        >
          <FormControl style={{ marginBottom: "32px" }}>
            <TextField
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              label="Post Title"
            />
          </FormControl>

          <textarea
            placeholder="What'd you find?"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ width: "90%", height: "200px" }}
          />
          <br />
          <Button
            variant="outlined"
            type="submit"
            style={{ marginTop: "16px" }}
          >
            Share it!
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default connect(null, { addPost })(PostForm);
