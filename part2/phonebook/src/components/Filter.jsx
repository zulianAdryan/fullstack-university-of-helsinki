const Filter = ({ filter, onChange }) => {
  return (
    <div>
      filter shown by name: <input onChange={onChange} value={filter} />
    </div>
  );
};

export default Filter;
