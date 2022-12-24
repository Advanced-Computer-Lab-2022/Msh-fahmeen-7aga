const InstDetails = ({ guestcourse }) => {
  return(
      <div className="course-details">
          <p><strong>Firstname: </strong> {guestcourse.Firstname}</p>
          <p><strong>Lastname: </strong> {guestcourse.Lastname}</p>
      </div>
  )
}

export default InstDetails