import { Link } from 'react-router-dom'
import { UseLogout } from '../Hooks/UseLogout'
import { UseLoginContext } from '../Hooks/UseLoginContext'

const Navbar = () => {
  const { logout } = UseLogout()
  const { student } = UseLoginContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Online learning platform</h1>
        </Link>
        <nav>
          {student && (  
          <div>
            <span>{student.FirstName}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
          )}
          {!student && (
          <div>
            <Link to="/studentlogin">Login</Link>
            <Link to="/studentsignup">Signup</Link>
          </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar