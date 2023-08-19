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
  return <b>Total of {total} exercises</b>;
};

const Course = ({ course }) => {
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

export default Course;
