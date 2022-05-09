import { Modal, Box, Button } from "@mui/material";
import React from "react";
import { Error } from "@mui/icons-material";

const EmergencyNotificationModal = ({ open, onClose }: any) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "40%",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: 24,
          p: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Error sx={{ color: "#FF6A00", width: "45px", height: "45px" }} />
          <b style={{ color: "#FF6A00", fontSize: "25px", marginLeft: "30px" }}>
            Emergency Alert
          </b>
        </div>
        <p>
          <b>
            The user may fall onto the ground and does not response based on the
            movement. Contacting to emergency contact...
          </b>
        </p>

        <Button
          onClick={() => onClose()}
          variant="contained"
          sx={{
            backgroundColor: "#FF6A00",
            color: "white",
            padding: "8px 16px",
            fontSize: "12px",
            "&:hover": {
              backgroundColor: "#FF6A00",
              color: "#white",
            },
          }}
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default EmergencyNotificationModal;
