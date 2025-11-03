import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
  IconButton,
  Badge,
} from "@mui/material";
import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import Home from "./pages/Home";
import Library from "./pages/Library";
import BookDetails from "./pages/BookDetails";
import { BadgesDialog, useAchievements, BadgeToasts } from "./achievements";

export default function App() {
  let theme = createTheme({
    palette: { mode: "dark" },
  });
  theme = responsiveFontSizes(theme);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <AppBar position="sticky">
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              Library
            </Typography>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/library">
              Library
            </Button>
            <BadgesButton />
          </Toolbar>
        </AppBar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
        <BadgesDialog />
        <BadgeToasts />
      </BrowserRouter>
    </ThemeProvider>
  );
}

function BadgesButton() {
  const earned = useAchievements((s) => s.earned);
  const setOpen = useAchievements((s) => s.setDialog);
  return (
    <IconButton color="inherit" onClick={() => setOpen(true)} aria-label="badges">
      <Badge badgeContent={earned.length} color="secondary">
        <span role="img" aria-label="medal">🏅</span>
      </Badge>
    </IconButton>
  );
}
