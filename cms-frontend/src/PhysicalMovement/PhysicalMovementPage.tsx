import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { socket } from "../services/socketService";
import { SportsCricketRounded } from "@mui/icons-material";

const data = [
  { xAcceleration: 0.4, yAcceleration: 0.0, zAcceleration: 0.98 },
  { xAcceleration: 0.0, yAcceleration: 0.0, zAcceleration: 0.98 },
  { xAcceleration: 0.3, yAcceleration: 0.12, zAcceleration: 0.89 },
  { xAcceleration: 0.2, yAcceleration: 0.0, zAcceleration: 1.03 },
  { xAcceleration: 0.5, yAcceleration: -0.2, zAcceleration: 0.98 },
  { xAcceleration: 0.2, yAcceleration: 0.0, zAcceleration: 0.9 },
  { xAcceleration: 0.4, yAcceleration: -0.16, zAcceleration: 0.89 },
  { xAcceleration: 0.3, yAcceleration: 0, zAcceleration: 0.95 },
];

const PhysicalMovementPage = () => {
  const [currentXAcceleration, setCurrentXAcceleration] = useState(0);
  const [currentYAcceleration, setCurrentYAcceleration] = useState(0);
  const [currentZAcceleration, setCurrentZAcceleration] = useState(0);
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
    });
    socket.on("accData", (xAcc, yAcc, zAcc) => {
      console.log(xAcc, yAcc, zAcc);
      setCurrentXAcceleration(xAcc);
      setCurrentYAcceleration(yAcc);
      setCurrentZAcceleration(zAcc);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: "275px",
          flexShrink: 1,
          "& .MuiDrawer-paper": {
            width: "275px",
            boxSizing: "border-box",
            backgroundColor: "#FF4D52",
            color: "white",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem>
            <ListItemText>
              <h1>Big Brains</h1>
            </ListItemText>
          </ListItem>
          <ListItemButton>
            <ListItemText>User Profile</ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemText>Analytics</ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemText>Heart Rate</ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemText>Blood Oxugen Level</ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemText>Blood Glucose Level</ListItemText>
          </ListItemButton>
          <ListItemButton>
            <ListItemText>Physical Movement</ListItemText>
          </ListItemButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingLeft: "2.5%",
          paddingRight: "7.5%",
          paddingY: "2%",
        }}
      >
        <h2>Measure</h2>

        <Card>
          <CardContent>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  backgroundColor: "blue",
                }}
              ></div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginLeft: "2.5%",
                }}
              >
                <p style={{ fontSize: "30px", paddingBottom: "10px" }}>
                  Acceleration
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    marginLeft: "20%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "50px",
                    }}
                  >
                    <div
                      style={{
                        margin: 0,
                        paddingRight: "15px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "baseline",
                      }}
                    >
                      <p style={{ fontSize: "30px", lineHeight: 0.7 }}>
                        x:{"  "}
                      </p>
                      <p style={{ fontSize: "55px", lineHeight: 0.7 }}>
                        {currentXAcceleration}
                      </p>
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        textAlign: "end",
                        lineHeight: 0.7,
                      }}
                    >
                      m/s<sup>2</sup>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "50px",
                    }}
                  >
                    <div
                      style={{
                        margin: 0,
                        paddingRight: "15px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "baseline",
                      }}
                    >
                      <p style={{ fontSize: "30px", lineHeight: 0.7 }}>
                        y:{"  "}
                      </p>
                      <p style={{ fontSize: "55px", lineHeight: 0.7 }}>
                        {currentYAcceleration}
                      </p>
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        textAlign: "end",
                        lineHeight: 0.7,
                      }}
                    >
                      m/s<sup>2</sup>
                    </div>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginRight: "50px",
                    }}
                  >
                    <div
                      style={{
                        margin: 0,
                        paddingRight: "15px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "baseline",
                      }}
                    >
                      <p style={{ fontSize: "30px", lineHeight: 0.7 }}>
                        z:{"  "}
                      </p>
                      <p style={{ fontSize: "55px", lineHeight: 0.7 }}>
                        {currentZAcceleration}
                      </p>
                    </div>
                    <div
                      style={{
                        fontSize: "20px",
                        textAlign: "end",
                        lineHeight: 0.7,
                      }}
                    >
                      m/s<sup>2</sup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <h2 style={{ padding: "15px 0" }}>Visualization</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <LineChart width={600} height={300} data={data}>
            <Line type="monotone" dataKey="xAcceleration" stroke="#8884d8" />
            <Line type="monotone" dataKey="yAcceleration" stroke="red" />
            <Line type="monotone" dataKey="zAcceleration" stroke="green" />
            <XAxis />
            <YAxis />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          </LineChart>
        </div>
      </Box>
    </Box>
  );
};

export default PhysicalMovementPage;
