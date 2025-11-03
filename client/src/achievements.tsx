import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Box, Stack, Typography, Dialog, DialogTitle, DialogContent, Chip, Paper, Snackbar, Alert } from "@mui/material";

export type AchievementId =
  | "first_add"
  | "add_5"
  | "add_10"
  | "first_edit"
  | "first_delete";

export const ACHIEVEMENTS: Record<AchievementId, { title: string; desc: string; emoji: string }> = {
  first_add: { title: "First Book Added", desc: "You added your first book!", emoji: "📘" },
  add_5: { title: "On A Roll (5)", desc: "Five books added.", emoji: "📚" },
  add_10: { title: "Shelf Stacker (10)", desc: "Ten books added.", emoji: "🏆" },
  first_edit: { title: "First Edit", desc: "Updated a book.", emoji: "✏️" },
  first_delete: { title: "First Cleanup", desc: "Removed a book.", emoji: "🧹" },
};

type AchievementsState = {
  earned: AchievementId[];
  addCount: number;
  toasts: AchievementId[];
  openDialog: boolean;
  award: (id: AchievementId) => void;
  bumpAddCount: () => void;
  setDialog: (open: boolean) => void;
  popToast: () => AchievementId | undefined;
};

export const useAchievements = create<AchievementsState>()(
  persist(
    (set, get) => ({
      earned: [],
      addCount: 0,
      toasts: [],
      openDialog: false,
      award: (id) => {
        const { earned, toasts } = get();
        if (earned.includes(id)) return;
        set({ earned: [...earned, id], toasts: [...toasts, id] });
      },
      bumpAddCount: () => {
        const next = get().addCount + 1;
        set({ addCount: next });
        if (next === 1) get().award("first_add");
        if (next === 5) get().award("add_5");
        if (next === 10) get().award("add_10");
      },
      setDialog: (open) => set({ openDialog: open }),
      popToast: () => {
        const q = get().toasts.slice();
        const head = q.shift();
        set({ toasts: q });
        return head;
      },
    }),
    { name: "achievements" },
  ),
);

export function BadgesDialog() {
  const earned = useAchievements((s) => s.earned);
  const open = useAchievements((s) => s.openDialog);
  const setOpen = useAchievements((s) => s.setDialog);
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle>Your Badges</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          {Object.entries(ACHIEVEMENTS).map(([id, a]) => {
            const have = earned.includes(id as AchievementId);
            return (
              <Paper key={id} variant="outlined" sx={{ p: 2, opacity: have ? 1 : 0.6 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Typography sx={{ fontSize: 28 }}>{a.emoji}</Typography>
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontWeight: 600 }}>{a.title}</Typography>
                    <Typography color="text.secondary">{a.desc}</Typography>
                  </Box>
                  <Chip label={have ? "Earned" : "Locked"} color={have ? "success" : "default"} />
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export function BadgeToasts() {
  const toasts = useAchievements((s) => s.toasts);
  const pop = useAchievements((s) => s.popToast);
  const next = toasts[0];
  const data = next ? ACHIEVEMENTS[next] : undefined;
  if (!data) return null;
  return (
    <Snackbar open autoHideDuration={3000} onClose={() => pop()} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
      <Alert onClose={() => pop()} severity="success" variant="filled" icon={false} sx={{ alignItems: "center" }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography sx={{ fontSize: 22 }}>{data.emoji}</Typography>
          <Box>
            <Typography sx={{ fontWeight: 700 }}>{data.title}</Typography>
            <Typography variant="body2">{data.desc}</Typography>
          </Box>
        </Stack>
      </Alert>
    </Snackbar>
  );
}
