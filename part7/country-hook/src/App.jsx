import { useState } from "react";
import Finder from "./components/Finder";
import Content from "./components/Content";
import { useCountries } from "./hooks";

const App = () => {
  const { countries } = useCountries();
  const [find, setFind] = useState("");
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(find.toLowerCase())
  );
  const isTooMany = filteredCountries.length > 10;

  const onFind = (findText) => {
    setFind(findText);
  };

  const onShow = (name) => {
    setFind(name);
  };

  return (
    <div>
      <Finder find={find} onChange={(findText) => onFind(findText)} />
      <Content
        isFindEmpty={find === ""}
        isTooMany={isTooMany}
        countries={filteredCountries}
        onShow={onShow}
      />
    </div>
  );
};

export default App;
