const PersonForm = ({
  onSubmit,
  onChangeName,
  onChangeNumber,
  newName,
  newNumber,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={onChangeName} value={newName} />
      </div>
      <div>
        number: <input onChange={onChangeNumber} value={newNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
