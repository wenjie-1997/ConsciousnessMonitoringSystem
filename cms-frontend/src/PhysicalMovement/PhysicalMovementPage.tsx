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
import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";
import { io, Socket } from "socket.io-client";
import { SportsCricketRounded } from "@mui/icons-material";
import EmergencyNotificationModal from "./EmergencyNotificationModal";
import movementIcon from "../assets/image/movement.png";

const PhysicalMovementPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [currentXAcceleration, setCurrentXAcceleration] = useState(0);
  const [currentYAcceleration, setCurrentYAcceleration] = useState(0);
  const [currentZAcceleration, setCurrentZAcceleration] = useState(0);
  const [currentMagnitude, setCurrentMagnitude] = useState(0);
  const [movement, setMovement] = useState("Stationary");
  const [dataQueue, setdataQueue] = useState(
    new Array(60).fill({
      xAcceleration: 0,
      yAcceleration: 0,
      zAcceleration: 0,
      magnitude: 0,
    })
  );
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
      socket.on(
        "accData",
        (xAcc: number, yAcc: number, zAcc: number, mag: number) => {
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
          setChart2Key(new Date().toISOString() + "1");
          let average = Math.sqrt(
            dataQueue
              .slice(49)
              .reduce(
                (prevValue, curValue) =>
                  prevValue + Math.pow(curValue.magnitude, 2),
                0
              ) / 10
          );
          if (mag >= 4) {
            setOpenModal(true);
          }
          if (average >= 1) {
            setMovement("Running");
          } else if (average >= 0.1) {
            setMovement("Walking");
          } else {
            setMovement("Stationary");
          }
        }
      );
  }, [socket]);

  return (
    <>
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
                <img
                  style={{
                    width: "150px",
                    height: "150px",
                  }}
                  src={movementIcon}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "0 2.5%",
                    flexGrow: 1,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <p style={{ fontSize: "30px", paddingBottom: "10px" }}>
                      Acceleration
                    </p>
                    <p
                      style={{
                        fontSize: "30px",
                        paddingBottom: "10px",
                        fontWeight: "bold",
                      }}
                    >
                      {movement}
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginRight: "50px",
                        width: "25%",
                      }}
                    >
                      <div style={styles.valueContainer}>
                        <p style={{ ...styles.variableText, fontSize: "25px" }}>
                          Magnitude:{"  "}
                        </p>
                        <p style={styles.valueText}>
                          {currentMagnitude.toFixed(2)}
                        </p>
                      </div>
                      <div style={styles.unitText}>
                        m/s<sup>2</sup>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginRight: "50px",
                        width: "25%",
                      }}
                    >
                      <div style={styles.valueContainer}>
                        <p style={styles.variableText}>x:{"  "}</p>
                        <p style={styles.valueText}>
                          {currentXAcceleration.toFixed(2)}
                        </p>
                      </div>
                      <div style={styles.unitText}>
                        m/s<sup>2</sup>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginRight: "50px",
                        width: "25%",
                      }}
                    >
                      <div style={styles.valueContainer}>
                        <p style={styles.variableText}>y:{"  "}</p>
                        <p style={styles.valueText}>
                          {currentYAcceleration.toFixed(2)}
                        </p>
                      </div>
                      <div style={styles.unitText}>
                        m/s<sup>2</sup>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginRight: "50px",
                        width: "25%",
                      }}
                    >
                      <div style={styles.valueContainer}>
                        <p style={styles.variableText}>z:{"  "}</p>
                        <p style={styles.valueText}>
                          {currentZAcceleration.toFixed(2)}
                        </p>
                      </div>
                      <div style={styles.unitText}>
                        m/s<sup>2</sup>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <h2 style={{ padding: "15px 0" }}>Visualization</h2>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            <LineChart
              width={600}
              height={400}
              data={dataQueue}
              key={chart2Key}
            >
              <Line
                type="monotone"
                isAnimationActive={false}
                dataKey="magnitude"
                stroke="#8884d8"
              />
              <XAxis tick={false} label={{ value: "time" }} />
              <YAxis
                label={{ value: "m/s^2", angle: -90, position: "insideLeft" }}
              />
              <Legend />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            </LineChart>
            <LineChart width={600} height={400} data={dataQueue} key={chartKey}>
              <Line
                type="monotone"
                isAnimationActive={false}
                dataKey="xAcceleration"
                stroke="#8884d8"
              />
              <Line
                type="monotone"
                isAnimationActive={false}
                dataKey="yAcceleration"
                stroke="red"
              />
              <Line
                type="monotone"
                isAnimationActive={false}
                dataKey="zAcceleration"
                stroke="green"
              />
              <XAxis tick={false} label={{ value: "time" }} />
              <YAxis
                label={{ value: "m/s^2", angle: -90, position: "insideLeft" }}
              />
              <Legend />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            </LineChart>
          </div>
        </Box>
      </Box>
      <EmergencyNotificationModal
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
};

const styles = {
  valueContainer: {
    margin: 0,
    paddingRight: "15px",
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "baseline",
    justifyContent: "flex-end",
  },
  variableText: {
    fontSize: "30px",
    lineHeight: 0.7,
    margin: "0px",
    flexGrow: 1,
    textAlign: "end" as const,
  },
  valueText: {
    fontSize: "55px",
    lineHeight: 0.7,
    margin: "0px",
    flexGrow: 1,
    textAlign: "end" as const,
  },
  unitText: { fontSize: "20px", textAlign: "end" as const, lineHeight: 0.7 },
};

export default PhysicalMovementPage;
