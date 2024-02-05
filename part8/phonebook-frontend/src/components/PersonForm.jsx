import { useMutation } from "@apollo/client";
import { useField } from "../hooks";
import { ALL_PERSONS, CREATE_PERSON } from "../services/queries";
import { updateCache } from "../App";

const PersonForm = ({ setError }) => {
  const { reset: resetName, ...name } = useField("text", "name");
  const { reset: resetPhone, ...phone } = useField("text", "phone");
  const { reset: resetStreet, ...street } = useField("text", "street");
  const { reset: resetCity, ...city } = useField("text", "city");

  const [createPerson] = useMutation(CREATE_PERSON, {
    onCompleted: () => {
      // console.log("success", res);
    },
    onError: (error) => {
      // const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      const messages = error.graphQLErrors
        .map((e) => e.extensions.error.message)
        .join("\n");
      setError(messages);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    const createNewPerson = await createPerson({
      variables: {
        name: name.value,
        phone: phone.value.length > 0 ? phone.value : undefined,
        street: street.value,
        city: city.value,
      },
      // AUTOMATICALLY WAY TO REFETCH AND UPDATE THE CACHE
      // refetchQueries: [{ query: ALL_PERSONS }],
      // MANUAL WAY TO REFETCH QUERY AND UPDATE THE CACHE
      update: (cache, response) => {
        updateCache(cache, ALL_PERSONS, response?.data?.addPerson);
      },
    });
    console.log("createNewPerson", createNewPerson);
    if (createNewPerson.data) {
      resetName();
      resetPhone();
      resetStreet();
      resetCity();
    }
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
