const CourseDetailsnp = ({ course }) => {
  return (
    <div className="course-details">
      <h4>{course.title}</h4>
      <p>
        <strong>Subtitle: </strong> {course.subtitle}
      </p>
      <p>
        <strong>Summary: </strong> {course.summary}
      </p>
      <p>{course.createdAt}</p>
    </div>
  );
};

export default CourseDetailsnp;
