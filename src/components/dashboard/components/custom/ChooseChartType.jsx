import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ChartTypeCard from "./ChartTypeCard";

export default function ChooseChartType({handleChartSelectionCallback}) {
  const [selectedCard, setSelectedCard] = React.useState({
    id: "",
    name: "",
    picture: "",
  });
  const gridItems = [
    { id: "0", name: "Bar Chart", picture: "/charts/bar-dark.png" },
    { id: "1", name: "Line Chart", picture: "/charts/lines-dark.png" },
    { id: "2", name: "Pie Chart", picture: "/charts/pie-dark.png" },
    { id: "3", name: "Scatter Chart", picture: "/charts/scatter-dark.png" },
    { id: "4", name: "Sparkline Chart", picture: "/charts/sparkline-dark.png" },
  ];
  const handleCardClick = (item) => {
    setSelectedCard(item);
    handleChartSelectionCallback(item)
  };
  return (
    <Box sx={{ width: "80%" }}>
      <Grid
        container
        spacing={2}
        columns={3}
        sx={{
          justifyContent: "center",
          m: 5,
        }}
      >
        {gridItems.map((item) => {
          return (
            <Grid key={item.id}>
              <ChartTypeCard
                isSelectedProp={selectedCard.id === item.id}
                setSelectedCardProp={() => handleCardClick(item)}
                name={item.name}
                picture={item.picture}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
