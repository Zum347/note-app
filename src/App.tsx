import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreatePage from './pages/CreatePage';
import MainPage from './pages/MainPage/index';
import DetailPage from './pages/DetailPage';
import EditPage from './pages/EditPage';
import { useLocalStorage } from '@uidotdev/usehooks';
import { Note, NoteData, Tag } from './types';
import { v4 } from 'uuid';
import Layout from './components/Layout/index';

const App = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>('notess', []);
  const [tags, setTags] = useLocalStorage<Tag[]>('tagss', []);

  const createTag = (tag: Tag): void => {
    setTags((prev) => [...prev, tag]);
  };
  const createNote = (noteData: NoteData): void => {
    const newNote: Note = {
      id: v4(),
      ...noteData,
    };
    setNotes((prev) => [...prev, newNote]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n: { id: string; }) => n.id !== id));
  };


  const updateNote = (id: string, updatedData: NoteData) => {
    const updated = notes.map((note: { id: string; }) =>
      note.id == id
        ? {
            id,
            ...updatedData,
          }
        : note
    );
    setNotes(updated);
  };

  return (
  <BrowserRouter>
    <Routes>
      <Route path="/"
        element={<MainPage notes={notes} availableTags={tags} />}


      />

      <Route path="/new"
        element={
          <CreatePage
            handleSubmit={createNote}
            createTag={createTag}
            availableTags={tags}
          />
        }
      />
      <Route path="/:id" element={<Layout notes={notes} />}>
        <Route
          index 
          element={<DetailPage deleteNote={deleteNote} />}
        />
        <Route
          path="edit"
          element={
            <EditPage
              availableTags={tags}
              createTag={createTag}
              onSubmit={updateNote}
            />
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>
  );
};

export default App;