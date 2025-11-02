import { useEffect, useState } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import { BooksApi } from "../api";
import type { Book } from "../api";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (id) {
      BooksApi.get(id).then(setBook);
    }
  }, [id]);

  if (!book) return null;

  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 3, sm: 4, md: 5, lg: 6 },
        px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
        minHeight: "calc(100vh - 64px)",
      }}>
      <Box sx={{ width: "100%", mx: 0 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={4}
          sx={{ flexWrap: { xs: "wrap", sm: "nowrap" }, gap: 2 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              flex: 1,
              minWidth: 0,
              fontSize: {
                xs: "1.5rem",
                sm: "1.75rem",
                md: "2rem",
                lg: "2.25rem",
              },
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: { xs: "normal", sm: "nowrap" },
            }}>
            {book.title}
          </Typography>
          <Button
            component={RouterLink}
            to="/library"
            size="large"
            sx={{
              flexShrink: 0,
              px: { xs: 2, md: 3 },
              py: { xs: 1, md: 1.5 },
            }}>
            Back
          </Button>
        </Stack>
        <Grid container spacing={{ xs: 3, sm: 4, md: 5, lg: 6 }}>
          <Grid item xs={12} md={5} lg={4}>
            <Card>
              {book.imageUrl ? (
                <CardMedia
                  component="img"
                  image={book.imageUrl}
                  alt={book.title}
                  sx={{
                    aspectRatio: "3 / 4",
                    objectFit: "cover",
                    width: "100%",
                  }}
                />
              ) : null}
            </Card>
          </Grid>
          <Grid item xs={12} md={7} lg={8}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontSize: { xs: "1.125rem", sm: "1.25rem", md: "1.5rem" },
                    mb: 2,
                  }}>
                  Author: {book.author}
                </Typography>
                <Typography
                  color="text.secondary"
                  sx={{
                    whiteSpace: "pre-wrap",
                    fontSize: { xs: "0.875rem", sm: "1rem", md: "1.125rem" },
                    lineHeight: 1.7,
                  }}>
                  {book.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
