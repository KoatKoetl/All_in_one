import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";

type Note = {
  title: string;
  description: string;
  creationDate: Date;
};

const PopUpForm = ({
  isFormOpen,
  closeCreateNoteForm,
  createNote,
  noteToEdit,
  updateNote,
}: {
  isFormOpen: boolean;
  closeCreateNoteForm: () => void;
  createNote: (note: Note) => void;
  noteToEdit: Note | null;
  updateNote: (note: Note) => void;
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creationDate, setCreationDate] = useState(new Date());

  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title);
      setDescription(noteToEdit.description);
      setCreationDate(noteToEdit.creationDate);
    } else {
      setTitle("");
      setDescription("");
      setCreationDate(new Date());
    }
  }, [noteToEdit]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) return;

    const note = { title, description, creationDate };

    if (noteToEdit) {
      updateNote(note);
    } else {
      createNote(note);
    }

    setTitle("");
    setDescription("");
    setCreationDate(new Date());
  };

  return (
    <div
      className={`fixed w-screen h-screen inset-0 items-center justify-center bg-black/50 ${
        isFormOpen ? "flex" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded shadow-lg relative min-w-96">
        <button
          onClick={() => closeCreateNoteForm()}
          className="absolute right-0 top-0 text-black cursor-pointer px-3 py-1"
        >
          x
        </button>
        <h2 className="text-lg font-semibold mb-4">
          {noteToEdit ? "Edit Note" : "Create New Note"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <div>
              <Label htmlFor="note-title" className="text-sm font-medium">
                Title
              </Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="note-title"
                type="text"
                placeholder="Note title"
              />
            </div>
            <div>
              <Label htmlFor="note-description" className="text-sm font-medium">
                Description
              </Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="note-description"
                className="max-h-48 max-w-lg"
                placeholder="Note description"
              />
            </div>
          </div>
          <div className="flex my-2 gap-2">
            <Button type="submit" onClick={handleSubmit}>
              {noteToEdit ? "Save Changes" : "Create"}
            </Button>
            <Button
              type="button"
              className="ml-2"
              variant="destructive"
              onClick={() => closeCreateNoteForm()}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DeleteConfirmationModal = ({
  note,
  onConfirm,
  onCancel,
}: {
  note: Note;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md min-w-64">
        <h3 className="text-lg font-semibold mb-4">
          Delete note "{note.title}"?
        </h3>
        <p className="mb-4 text-sm">This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

const ToDoApp = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [notes, setNotes] = useState([] as Note[]);
  const [noteToDelete, setNoteToDelete] = useState<Note | null>(null);
  const [noteToEdit, setNoteToEdit] = useState<Note | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) {
      const parsedNotes: Note[] = JSON.parse(saved).map((note: Note) => ({
        ...note,
        creationDate: new Date(note.creationDate),
      }));
      setNotes(parsedNotes);
    }
  }, []);

  const openCreateNoteForm = () => {
    setNoteToEdit(null);
    setIsFormOpen(true);
  };

  const closeCreateNoteForm = () => {
    setIsFormOpen(false);
    setNoteToEdit(null);
  };

  const createNote = (note: Note) => {
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNoteToEdit(null);
    closeCreateNoteForm();
  };

  const deleteNote = (noteId: number) => {
    const updatedNotes = notes.filter(
      (note) => note.creationDate.getTime() !== noteId
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  const updateNote = (updatedNote: Note) => {
    const updatedNotes = notes.map((note) =>
      note.creationDate.getTime() === updatedNote.creationDate.getTime()
        ? updatedNote
        : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    closeCreateNoteForm();
  };

  return (
    <section>
      <h1>To Do app</h1>
      <div>
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
          <Button onClick={openCreateNoteForm}>Create note</Button>
        </div>
      </div>
      <PopUpForm
        isFormOpen={isFormOpen}
        noteToEdit={noteToEdit}
        closeCreateNoteForm={closeCreateNoteForm}
        createNote={createNote}
        updateNote={updateNote}
      />

      <div className="notes-wrapper my-6">
        {noteToDelete && (
          <DeleteConfirmationModal
            note={noteToDelete}
            onCancel={() => setNoteToDelete(null)}
            onConfirm={() => {
              deleteNote(noteToDelete.creationDate.getTime());
              setNoteToDelete(null);
            }}
          />
        )}

        <h2 className="text-xl font-semibold mb-4">All notes</h2>
        <ul className="grid gap-4">
          {notes.map((note, index) => (
            <li key={index}>
              <div
                id={note.creationDate.getTime().toString()}
                className="grid gap-2 border p-4 rounded shadow-sm max-w-3xl"
              >
                <h3 className="text-lg font-semibold">{note.title}</h3>
                <div>
                  <h4 className="font-semibold mb-1">Description</h4>
                  <p className="whitespace-pre-line">{note.description}</p>
                </div>
                <p className="text-sm text-gray-500 text-right">
                  Created on: {note.creationDate.toLocaleDateString()} at{" "}
                  {note.creationDate.toLocaleTimeString()}
                </p>
                <div className="justify-self-end flex gap-2">
                  <Button
                    type="button"
                    onClick={() => {
                      setNoteToEdit(note);
                      setIsFormOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => setNoteToDelete(note)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ToDoApp;
