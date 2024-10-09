import React from "react";
import NewNote from "~/components/NewNote.tsx";
import NoteList from "~/components/NoteList";
import { getStoredNotes, storeNotes } from "~/data/notes";
import { redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";


interface Note {
  title: string,
  content: string,
  id: string
}

const Notes = () => {
  const notes = useLoaderData<Note[]>();
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
};

export default Notes;

export async function loader() {
  const notes = await getStoredNotes();
  return notes;
}


export async function action({ request }) {
  const formData = await request.formData();
  const noteData = {
    title: formData.get('title'),
    content: formData.get('content')
  }
  const existingNotes = await getStoredNotes()
  noteData.id = new Date().toISOString();
  const updatedNotes = existingNotes.concat(noteData);
  await storeNotes(updatedNotes);

  return redirect('/notes')
}
