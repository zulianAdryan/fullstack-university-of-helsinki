const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ courses }) => {
  return courses?.map(({ name, exercises }) => (
    <p key={name}>
      {name} {exercises}
    </p>
  ));
};

const Footer = ({ total }) => {
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const total = course.parts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.exercises;
  }, 0);

  return (
    <div>
      <Header course={course.name} />
      <Content courses={course.parts} />
      <Footer total={total} />
    </div>
  );
};

export default App;
