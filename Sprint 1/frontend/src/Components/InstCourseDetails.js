const InstCourseDetails = ({ instcourse }) => {
    return(
        <div className="course-details">
            <h4>{instcourse.title}</h4>
            <p><strong>Subtitle: </strong> {instcourse.subtitle}</p>
            <p><strong>Summary: </strong> {instcourse.summary}</p>
            <p><strong>Price: </strong> {instcourse.price}</p>
            <p><strong>Rating:</strong></p>
        </div>
    )
}

export default InstCourseDetails