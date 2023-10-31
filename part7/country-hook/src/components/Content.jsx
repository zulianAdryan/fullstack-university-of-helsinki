import Weather from "./Weather";

const Content = ({ isFindEmpty, isTooMany, countries, onShow }) => {
  if (isFindEmpty) return <p>Please type some country name</p>;

  if (isTooMany) return <p>To many matches, specify another filter</p>;

  if (!countries || countries.length === 0) return <p>No any country found</p>;

  if (countries.length > 1) {
    return countries.map((country) => (
      <p key={country.area}>
        {country.name.common}{" "}
        <button type="button" onClick={() => onShow(country.name.common)}>
          show
        </button>
      </p>
    ));
  }

  const country = countries[0];
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <b>languages:</b>
      <ul>
        {Object.keys(country.languages).map((language) => (
          <li key={language}>{country.languages[language]}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt} width={"15%"} />
      <Weather name={country.name.common} capital={country.capital} />
    </div>
  );
};

export default Content;
