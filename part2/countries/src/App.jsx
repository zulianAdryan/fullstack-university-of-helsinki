import { useState, useEffect } from "react";
import Finder from "./components/Finder";
import Content from "./components/Content";
import CountriesService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [find, setFind] = useState("");
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(find.toLowerCase())
  );
  const isTooMany = filteredCountries.length > 10;

  useEffect(() => {
    CountriesService.getAll().then((allCountries) =>
      setCountries(allCountries)
    );
  }, []);

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
