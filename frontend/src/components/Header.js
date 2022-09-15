import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListItem from "@mui/joy/ListItem";
import Link from "@mui/joy/Link";
import Sheet from "@mui/joy/Sheet";
import ListItemButton from "@mui/joy/ListItemButton";
import Typography from "@mui/joy/Typography";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import drz from "../images/time/drz.jpg";
import AspectRatio from "@mui/joy/AspectRatio";
import Home from "@mui/icons-material/Home";
import ListDivider from "@mui/joy/ListDivider";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Tabs from "@mui/joy/Tabs";
import InsightsIcon from "@mui/icons-material/Insights";
export default function Header() {
  return (
    <Box
      component="nav"
      sx={{
        flexGrow: 1,
        maxWidth: 450,
        overflow: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        display: "block",
      }}
    >
      <List
        role="menubar"
        row
        sx={{
          "--List-radius": "8px",
          "--List-padding": "4px",
          "--List-gap": "1px",
        }}
      >
        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            component={Link}
            underline="none"
            href="/"
          >
            <ListItemDecorator>
              <Home />
            </ListItemDecorator>
            Home
          </ListItemButton>
        </ListItem>
        <ListDivider />
        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            component={Link}
            underline="none"
            href="/campeonatos"
          >
            <ListItemDecorator>
              <EmojiEventsIcon />
            </ListItemDecorator>
            Campeonatos
          </ListItemButton>
        </ListItem>
        <ListDivider />
        <ListItem role="none">
          <ListItemButton
            role="menuitem"
            component={Link}
            underline="none"
            href="/desempenho"
          >
            <ListItemDecorator>
              <InsightsIcon />
            </ListItemDecorator>
            Desempenho
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
