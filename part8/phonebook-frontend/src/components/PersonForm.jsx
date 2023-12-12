import { useMutation } from "@apollo/client";
import { useField } from "../hooks";
import { ALL_PERSONS, CREATE_PERSON } from "../services/queries";

const PersonForm = ({ setError }) => {
  const { reset: resetName, ...name } = useField("text", "name");
  const { reset: resetPhone, ...phone } = useField("text", "phone");
  const { reset: resetStreet, ...street } = useField("text", "street");
  const { reset: resetCity, ...city } = useField("text", "city");

  const [createPerson] = useMutation(CREATE_PERSON, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      setError(messages);
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();

    createPerson({
      variables: {
        name: name.value,
        phone: phone.value,
        street: street.value,
        city: city.value,
      },
      refetchQueries: [{ query: ALL_PERSONS }],
    });

    resetName();
    resetPhone();
    resetStreet();
    resetCity();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          name <input {...name} />
        </div>
        <div>
          phone <input {...phone} />
        </div>
        <div>
          street <input {...street} />
        </div>
        <div>
          city <input {...city} />
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  );
};

export default PersonForm;
