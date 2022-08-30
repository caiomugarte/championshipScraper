import { Link } from "react-router-dom";

import { useState } from "react";

import Tabs from "@mui/joy/Tabs";
import TabList from "@mui/joy/TabList";
import Tab from "@mui/joy/Tab";
import TabPanel from "@mui/joy/TabPanel";

import Box from "@mui/joy/Box";

export default function Home() {
  const [index, setIndex] = useState(0);

  return (
    const ColorSchemeToggle = () => {
      const { mode, setMode } = useColorScheme();
      const [mounted, setMounted] = React.useState(false);
      React.useEffect(() => {
        setMounted(true);
      }, []);
      if (!mounted) {
        return <IconButton size="sm" variant="outlined" color="primary" />;
      }
      return (
        <IconButton
          id="toggle-mode"
          size="sm"
          variant="outlined"
          color="primary"
          onClick={() => {
            if (mode === 'light') {
              setMode('dark');
            } else {
              setMode('light');
            }
          }}
        >
          {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
      );
    };
    <Box sx={{ display: "flex" }}>
      <Tabs
        aria-label="Outlined"
        value={index}
        onChange={(event, value) => setIndex(value)}
      >
        <TabList variant="outlined">
          <Tab
            variant={index === 0 ? "soft" : "plain"}
            color={index === 0 ? "primary" : "neutral"}
          >
            Teste Tab
          </Tab>
          <Tab
            variant={index === 1 ? "soft" : "plain"}
            color={index === 1 ? "primary" : "neutral"}
          >
            Teste Tab 2
          </Tab>
          <Tab
            variant={index === 2 ? "soft" : "plain"}
            color={index === 2 ? "primary" : "neutral"}
          >
            Teste Tab 3
          </Tab>
        </TabList>
        <TabPanel value={0}>Primeiro Tab PAnel</TabPanel>
      </Tabs>
    </Box>
  );
}
