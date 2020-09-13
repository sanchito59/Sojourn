import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { getWeather } from "../../../actions/profile";

const WeatherForecast = ({ getWeather, city, forecast }) => {
  useEffect(() => {
    getWeather(city);
  }, [getWeather]);

  const tempColor = (num) => {
    if (num > 74) {
      return "#e03800";
    } else if (num > 59) {
      return "#f6ff4d";
    } else if (num > 39) {
      return "textSecondary";
    } else {
      return "#82fff9";
    }
  };
  return forecast === null ? (
    <CircularProgress />
  ) : (
    <Container maxWidth="xs">
      <Card>
        {forecast.weather && (
          <CardMedia
            component="img"
            image={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
            title={city}
            style={{ width: "80px" }}
          />
        )}
        {forecast.main && (
          <CardContent style={{ padding: "0px", paddingBottom: "24px" }}>
            <Typography
              variant="body1"
              style={{ color: tempColor(Math.round(forecast.main.temp * 1)) }}
              component="p"
            >
              {Math.round(forecast.main.temp * 1)}
              <Typography variant="caption" color="textSecondary" component="p">
                {Math.round(forecast.main.temp_min * 1)} /{" "}
                {Math.round(forecast.main.temp_max * 1)}
              </Typography>
            </Typography>
            <Typography variant="caption" color="textSecondary" component="p">
              Feels like: {Math.round(forecast.main.feels_like * 1)}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              style={{ marginTop: "8px" }}
            >
              Conditions
            </Typography>
            {forecast.weather.map((weather) => {
              return (
                <Typography
                  variant="caption"
                  color="textSecondary"
                  component="span"
                  style={{ marginTop: "12px" }}
                >
                  | {weather.description} |
                </Typography>
              );
            })}
          </CardContent>
        )}
      </Card>
    </Container>
  );
};

WeatherForecast.propTypes = {
  city: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  forecast: state.profile.forecast,
});

export default connect(mapStateToProps, { getWeather })(WeatherForecast);
