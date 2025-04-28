import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import React from "react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/joy/styles";
import { Card, CardActionArea, CardContent } from "@mui/material";
export default function TestComponent() {
  return (
    <Card sx={{
        width:'fit-content'
    }}>
      <CardActionArea onClick={console.log("test")}>
        <CardContent>
          <Box
            sx={{
              height: 480,
              width: 720,
              my: 4,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              p: 2,
              border: "12px dashed lightgrey",
              borderRadius: 10,
            }}
          >
            <CloudUploadIcon
              style={{
                fontSize: "100",
                color: "lightgray",
              }}
            />
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
