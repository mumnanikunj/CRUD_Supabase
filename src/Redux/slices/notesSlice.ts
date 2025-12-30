import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../../lib/supabase';

export interface Note {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

interface NotesState {
  notes: Note[];
  filteredNotes: Note[];
  searchQuery: string;
  loading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  filteredNotes: [],
  searchQuery: '',
  loading: false,
  error: null,
};

const filterNotes = (notes: Note[], query: string) => {
  const q = query.toLowerCase().trim();
  if (!q) return notes;
  return notes.filter(
    n =>
      n.title.toLowerCase().includes(q) ||
      n.content.toLowerCase().includes(q)
  );
};

export const fetchNotes = createAsyncThunk(
  'notes/fetch',
  async (_, { rejectWithValue }) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return rejectWithValue('Not authenticated');

    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Note[];
  }
);

export const createNote = createAsyncThunk(
  'notes/create',
  async (
    { title, content }: { title: string; content: string },
    { rejectWithValue }
  ) => {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return rejectWithValue('Not authenticated');

    const { data, error } = await supabase
      .from('notes')
      .insert({ title, content, user_id: user.id })
      .select()
      .single();

    if (error) throw error;
    return data as Note;
  }
);

export const updateNote = createAsyncThunk(
  'notes/update',
  async (
    { id, title, content }: { id: string; title: string; content: string },
    { rejectWithValue }
  ) => {
    const { data, error } = await supabase
      .from('notes')
      .update({ title, content })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Note;
  }
);

export const deleteNote = createAsyncThunk(
  'notes/delete',
  async (id: string, { rejectWithValue }) => {
    const { error } = await supabase.from('notes').delete().eq('id', id);
    if (error) throw error;
    return id;
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    resetNotes: () => initialState,
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.filteredNotes = filterNotes(state.notes, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNotes.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
        state.filteredNotes = filterNotes(
          action.payload,
          state.searchQuery
        );
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.unshift(action.payload);
        state.filteredNotes = filterNotes(
          state.notes,
          state.searchQuery
        );
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        const index = state.notes.findIndex(
          n => n.id === action.payload.id
        );
        if (index !== -1) state.notes[index] = action.payload;
        state.filteredNotes = filterNotes(
          state.notes,
          state.searchQuery
        );
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter(
          n => n.id !== action.payload
        );
        state.filteredNotes = filterNotes(
          state.notes,
          state.searchQuery
        );
      });
  },
});

export const { resetNotes, setSearchQuery } = notesSlice.actions;
export default notesSlice.reducer;
