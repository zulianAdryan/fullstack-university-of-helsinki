const Persons = ({ persons, onDelete }) => {
  return persons?.map((person) => (
    <p key={person?.id}>
      {person?.name} {person?.number}{" "}
      <button type="button" onClick={() => onDelete(person?.id)}>
        delete
      </button>
    </p>
  ));
};

export default Persons;
