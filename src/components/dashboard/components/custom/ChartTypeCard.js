import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

export default function ChartTypeCard({ name, picture, setSelectedCardProp, isSelectedProp }) {
  const [isSelected, setIsSelected] = React.useState(isSelectedProp)
  React.useEffect(()=>{
    setIsSelected(isSelectedProp)
  },[isSelectedProp])
  return (
    <Card sx={{ maxWidth: 345, borderRadius: 5 }}>
      <CardActionArea
        data-active={isSelected ? '' : undefined}
        sx={{
          height: "100%",
          "&[data-active]": {
            backgroundColor: "action.selected",
            "&:hover": {
              backgroundColor: "action.selectedHover",
            },
          },
        }}
        onClick={setSelectedCardProp}
      >
        <CardMedia
          component="img"
          height="140"
          image={picture}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h7" component="div">
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
