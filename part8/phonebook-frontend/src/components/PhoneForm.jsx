import { useMutation } from "@apollo/client";
import { useField } from "../hooks";
import { EDIT_NUMBER } from "../services/queries";
import { useEffect } from "react";

const PhoneForm = ({ setError }) => {
  const { reset: resetName, ...name } = useField("text");
  const { reset: resetPhone, ...phone } = useField("text");

  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  useEffect(() => {
    if (result.data && !result.data.editNumber) {
      setError("person not found");
    }
  }, [result.data]);

  const onSubmit = (event) => {
    event.preventDefault();

    changeNumber({ variables: { name: name.value, phone: phone.value } });

    resetName();
    resetPhone();
  };

  return (
    <div>
      <h2>change number</h2>

      <form onSubmit={onSubmit}>
        <div>
          name <input {...name} />
        </div>
        <div>
          phone <input {...phone} />
        </div>
        <button type="submit">change number</button>
      </form>
    </div>
  );
};

export default PhoneForm;
