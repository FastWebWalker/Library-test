import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useBooksStore } from "../store";
import BookForm from "../components/BookForm";
import type { Book } from "../api";
import { useAchievements } from "../achievements";

export default function Library() {
  const {
    books,
    loading,
    error,
    fetchBooks,
    createBook,
    updateBook,
    deleteBook,
  } = useBooksStore();
  const [openForm, setOpenForm] = useState(false);
  const [edit, setEdit] = useState<Book | undefined>(undefined);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleCreate = async (data: any) => {
    await createBook(data);
    useAchievements.getState().bumpAddCount();
  };
  const handleUpdate = async (data: any) => {
    if (edit) await updateBook(edit.id, data);
    useAchievements.getState().award("first_edit");
  };

  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 3, sm: 4, md: 5, lg: 6 },
        px: { xs: 2, sm: 3, md: 4, lg: 6, xl: 8 },
        minHeight: "calc(100vh - 64px)",
      }}>
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
            fontSize: {
              xs: "1.5rem",
              sm: "1.75rem",
              md: "2rem",
              lg: "2.25rem",
            },
          }}>
          Library
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            setEdit(undefined);
            setOpenForm(true);
          }}
          sx={{
            px: { xs: 2, md: 3 },
            py: { xs: 1, md: 1.5 },
          }}>
          Add Book
        </Button>
      </Stack>
      {loading ? (
        <Stack alignItems="center" mt={8}>
          <CircularProgress />
        </Stack>
      ) : (
        <Grid
          container
          spacing={{ xs: 2, sm: 3, md: 4, lg: 4 }}
          sx={{ width: "100%", mx: 0 }}>
          {books.map((b) => (
            <Grid
              key={b.id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={2}
              sx={{
                display: "flex",
                flexDirection: "column",
              }}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}>
                {b.imageUrl ? (
                  <CardMedia
                    component="img"
                    image={b.imageUrl}
                    alt={b.title}
                    sx={{
                      aspectRatio: "3 / 4",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                ) : null}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.125rem", md: "1.25rem" },
                      mb: 1,
                    }}>
                    {b.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {b.author}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: { xs: "center", sm: "space-between" },
                    flexWrap: "wrap",
                    gap: 1,
                    px: 1.5,
                    pb: 1.5,
                  }}>
                  <Button
                    component={Link}
                    to={`/book/${b.id}`}
                    size="small"
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                    Open
                  </Button>
                  <Button
                    size="small"
                    onClick={() => {
                      setEdit(b);
                      setOpenForm(true);
                    }}
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                    Edit
                  </Button>
                  <Button
                    color="error"
                    size="small"
                    onClick={() => { deleteBook(b.id); useAchievements.getState().award("first_delete"); }}
                    sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <BookForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={edit ? handleUpdate : handleCreate}
        initial={edit}
      />

      <Snackbar open={!!error} autoHideDuration={4000}>
        <Alert severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
