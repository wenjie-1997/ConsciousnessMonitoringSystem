import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { io, Socket } from "socket.io-client";
import { SportsCricketRounded } from "@mui/icons-material";

const PhysicalMovementPage = () => {
  const [currentXAcceleration, setCurrentXAcceleration] = useState(0);
  const [currentYAcceleration, setCurrentYAcceleration] = useState(0);
  const [currentZAcceleration, setCurrentZAcceleration] = useState(0);
  const [currentMagnitude, setCurrentMagnitude] = useState(0);
  const [dataQueue, setdataQueue] = useState(new Array(60).fill({ xAcceleration: 0, yAcceleration: 0, zAcceleration: 0, magnitude: 0 }));
  const [socket, setSocket] = useState<Socket | null>(null);
  const [chartKey, setChartKey] = useState<string>("");
  const [chart2Key, setChart2Key] = useState<string>("1");

  useEffect(() => {
    const newSocket = io(`http://localhost:8000`);
    setSocket(newSocket);
    return () => {
      newSocket.close();
    };
  }, [setSocket]);

  useEffect(() => {
    if (socket !== null)
      socket.on("accData", (xAcc: number, yAcc: number, zAcc: number, mag: number) => {
        const currentDataQueue = dataQueue;
        currentDataQueue.push({
          xAcceleration: xAcc,
          yAcceleration: yAcc,
          zAcceleration: zAcc,
          magnitude: mag,
        });
        currentDataQueue.shift();
        setCurrentXAcceleration(xAcc);
        setCurrentYAcceleration(yAcc);
        setCurrentZAcceleration(zAcc);
        setCurrentMagnitude(mag);
        setdataQueue(currentDataQueue);
        setChartKey(new Date().toISOString());
        setChart2Key(new Date().toISOString() + "122");
      });
  }, [socket]);

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
                <p style={{ fontSize: "30px", paddingBottom: "10px" }}>Acceleration</p>

                <div
                  style={{
                    margin: 0,
                    paddingRight: "15px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "baseline",
                  }}
                >
                  <p style={{ fontSize: "30px", lineHeight: 0.7 }}>Magnitude:{"  "}</p>
                  <p style={{ fontSize: "55px", lineHeight: 0.7 }}>{currentMagnitude.toFixed(2)}</p>
                </div>

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
                      <p style={{ fontSize: "30px", lineHeight: 0.7 }}>x:{"  "}</p>
                      <p style={{ fontSize: "55px", lineHeight: 0.7 }}>{currentXAcceleration.toFixed(2)}</p>
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
                      <p style={{ fontSize: "30px", lineHeight: 0.7 }}>y:{"  "}</p>
                      <p style={{ fontSize: "55px", lineHeight: 0.7 }}>{currentYAcceleration.toFixed(2)}</p>
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
                      <p style={{ fontSize: "30px", lineHeight: 0.7 }}>z:{"  "}</p>
                      <p style={{ fontSize: "55px", lineHeight: 0.7 }}>{currentZAcceleration.toFixed(2)}</p>
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
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
          <LineChart width={600} height={300} data={dataQueue} key={chart2Key}>
            <Line type="monotone" isAnimationActive={false} dataKey="magnitude" stroke="#8884d8" />
            <XAxis />
            <YAxis />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          </LineChart>
          <LineChart width={600} height={300} data={dataQueue} key={chartKey}>
            <Line type="monotone" isAnimationActive={false} dataKey="xAcceleration" stroke="#8884d8" />
            <Line type="monotone" isAnimationActive={false} dataKey="yAcceleration" stroke="red" />
            <Line type="monotone" isAnimationActive={false} dataKey="zAcceleration" stroke="green" />
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
