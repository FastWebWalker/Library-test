import {
  Typography,
  Box,
  Stack,
  Button,
  Container,
  Grid,
  Paper,
  Divider,
  Chip,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box sx={{ width: "100%" }}>
      {/* Hero */}
      <Box
        sx={{
          width: "100%",
          minHeight: "calc(100vh - 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: { xs: 8, md: 12 },
          px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
          backgroundImage:
            "radial-gradient(1200px 400px at 50% -10%, rgba(100,108,255,0.25), transparent), linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.05) 100%)",
        }}
      >
        <Box textAlign="center" sx={{ width: "100%", mx: 0, maxWidth: 1100 }}>
          <Chip
            label="Your Personal, Organized, Always-Open Library"
            color="primary"
            variant="outlined"
            sx={{ mb: 2, fontWeight: 600 }}
          />
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 2,
              letterSpacing: -0.5,
              fontSize: { xs: "2.25rem", sm: "3rem", md: "3.75rem", lg: "4.25rem" },
            }}
          >
            Discover, track and love your books
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 4,
              color: "text.secondary",
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.35rem" },
              maxWidth: 820,
              mx: "auto",
            }}
          >
            A simple, delightful way to browse your collection, manage reading lists,
            and find your next favorite read.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 6 }}>
            <Button
              component={Link}
              to="/library"
              variant="contained"
              size="large"
              sx={{ px: { xs: 3, md: 4 }, py: { xs: 1.5, md: 2 }, fontSize: { xs: "1rem", md: "1.125rem" } }}
            >
              Browse Library
            </Button>
            <Button href="#features" variant="outlined" size="large">
              Learn More
            </Button>
          </Stack>
          <Stack direction="row" spacing={4} justifyContent="center" sx={{ color: "text.secondary" }}>
            <Typography variant="body2">No ads</Typography>
            <Typography variant="body2">Private by default</Typography>
            <Typography variant="body2">Fast search</Typography>
          </Stack>
        </Box>
      </Box>

      {/* Features */}
      <Container id="features" sx={{ py: { xs: 8, md: 10 } }}>
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Everything you need for your library
          </Typography>
          <Typography color="text.secondary">
            Organize, search, and share in a few clicks.
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {[
            {
              title: "Powerful Search",
              desc: "Find any book instantly by title, author, or tag.",
              emoji: "🔎",
            },
            {
              title: "Reading Lists",
              desc: "Plan what to read next and track progress.",
              emoji: "📚",
            },
            {
              title: "Borrow & Return",
              desc: "Keep tabs on who has which book.",
              emoji: "🤝",
            },
            {
              title: "Tags & Notes",
              desc: "Add context with custom tags and personal notes.",
              emoji: "🏷️",
            },
          ].map((f) => (
            <Grid item xs={12} sm={6} md={3} key={f.title}>
              <Paper variant="outlined" sx={{ p: 3, height: "100%", borderRadius: 2 }}>
                <Box sx={{ fontSize: 32, mb: 1 }}>{f.emoji}</Box>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                  {f.title}
                </Typography>
                <Typography color="text.secondary">{f.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Collections */}
      <Container sx={{ pb: { xs: 8, md: 10 } }}>
        <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
          <Stack spacing={2}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Explore popular shelves
            </Typography>
            <Typography color="text.secondary">
              Jump into curated categories to get started.
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1.5} sx={{ mt: 1 }}>
              {[
                "Fiction",
                "Non‑Fiction",
                "Science",
                "History",
                "Fantasy",
                "Biographies",
                "Self‑Help",
                "Technology",
              ].map((c) => (
                <Chip key={c} label={c} component={Link} to="/library" clickable />
              ))}
            </Stack>
          </Stack>
        </Paper>
      </Container>

      {/* Stats */}
      <Container sx={{ pb: { xs: 8, md: 10 } }}>
        <Paper variant="outlined" sx={{ p: { xs: 3, md: 4 }, borderRadius: 3 }}>
          <Grid container spacing={3} alignItems="center">
            {[
              { value: "5k+", label: "Books Tracked" },
              { value: "1.2k", label: "Authors" },
              { value: "320", label: "Tags" },
            ].map((s) => (
              <Grid key={s.label} item xs={12} md={4}>
                <Stack direction={{ xs: "row", md: "column" }} spacing={1} alignItems={{ xs: "center", md: "flex-start" }}>
                  <Typography variant="h3" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
                    {s.value}
                  </Typography>
                  <Typography color="text.secondary">{s.label}</Typography>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>

      {/* How it works */}
      <Container sx={{ pb: { xs: 8, md: 12 } }}>
        <Box textAlign="center" sx={{ mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            Get started in minutes
          </Typography>
          <Typography color="text.secondary">Three simple steps</Typography>
        </Box>
        <Grid container spacing={3}>
          {[
            { step: "1", title: "Add books", desc: "Import or add manually with title and author." },
            { step: "2", title: "Organize", desc: "Use shelves and tags to group your collection." },
            { step: "3", title: "Enjoy", desc: "Browse, search and track your reading progress." },
          ].map((h) => (
            <Grid key={h.step} item xs={12} md={4}>
              <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, height: "100%" }}>
                <Chip label={`Step ${h.step}`} color="primary" sx={{ mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                  {h.title}
                </Typography>
                <Typography color="text.secondary">{h.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Divider />

      {/* Final CTA */}
      <Container sx={{ py: { xs: 8, md: 12 } }}>
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Ready to find your next great read?
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Dive into your collection now.
          </Typography>
          <Button component={Link} to="/library" size="large" variant="contained">
            Open Library
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
