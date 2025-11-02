import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import type { Book, BookInput } from "../api";

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: BookInput) => Promise<void>;
  initial?: Partial<Book>;
};

export default function BookForm({ open, onClose, onSubmit, initial }: Props) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setTitle(initial?.title ?? "");
    setAuthor(initial?.author ?? "");
    setImageUrl(initial?.imageUrl ?? "");
    setDescription(initial?.description ?? "");
  }, [initial, open]);

  const handleSubmit = async () => {
    setSubmitting(true);
    await onSubmit({ title, author, imageUrl, description });
    setSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initial?.id ? "Edit book" : "Create book"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="text">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          variant="contained">
          {initial?.id ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
