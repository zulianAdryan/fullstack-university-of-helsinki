const Finder = ({ onChange, find }) => {
  return (
    <p>
      find countries{" "}
      <input
        type="text"
        value={find}
        onChange={(ev) => onChange(ev.target.value)}
      />
    </p>
  );
};

export default Finder;
