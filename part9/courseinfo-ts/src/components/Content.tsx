import { CoursePart, Courses } from "../types";

const Part = ({ course }: { course: CoursePart }) => {
  const renderContent = (_course: CoursePart) => {
    switch (_course.kind) {
      case "basic":
        return <p>{_course.description}</p>;
      case "group":
        return <p>{`projet exercises ${_course.groupProjectCount}`}</p>;
      case "background":
        return (
          <>
            <p>{_course.description}</p>
            <p>{`submit to ${_course.backgroundMaterial}`}</p>
          </>
        );
      case "special":
        return (
          <>
            <p>{_course.description}</p>
            <p>{`required skills: ${_course.requirements.join(", ")}`}</p>
          </>
        );
      default:
        break;
    }
  };

  return (
    <div>
      <p style={{ fontWeight: "bold" }}>
        {course.name} {course.exerciseCount}
      </p>
      {renderContent(course)}
    </div>
  );
};

const Content = ({ courses }: Courses) => {
  return courses.map((course: CoursePart, index: number) => (
    <Part course={course} key={index} />
  ));
};

export default Content;
