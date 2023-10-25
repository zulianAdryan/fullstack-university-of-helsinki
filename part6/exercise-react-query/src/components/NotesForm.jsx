/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "../services/notes";

const NotesForm = ({ callbackMessage }) => {
  const queryClient = useQueryClient();
  const newNoteMutation = useMutation({
    mutationFn: createNote,
  });

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    // console.log(content);
    newNoteMutation.mutate(
      { content, important: true },
      {
        onSuccess: (newNote) => {
          // // THIS IS DOING THE FETCH AGAIN (NOT RECOMENDED);
          // queryClient.invalidateQueries({ queryKey: ["notes"] });

          // THIS IS UPDATE THE VALUE ONLY (RECOMENDED);
          const notes = queryClient.getQueryData(["notes"]);
          queryClient.setQueryData(["notes"], notes.concat(newNote));
        },
        onError: (error) => {
          callbackMessage(error?.response?.data?.error);
        },
        onSettled: () => {
          setTimeout(() => callbackMessage(null), 1500);
        },
      }
    );
    event.target.note.value = "";
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  );
};

export default NotesForm;
