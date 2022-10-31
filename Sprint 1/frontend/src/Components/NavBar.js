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
            

            <div className="row mb-3">
    <label className="mb-2">Country</label>
    <select name="country" className="form-control">
        <option>--Select Country--</option>

        <option>USA</option>
        <option>Germany</option>
        <option>UK</option>
        <option>Sweden</option>
        <option>Spain</option>
        <option>Belguim</option>
        <option>Egypt</option>
        <option>Kafr El Sheikh</option>
        <option>Embaba</option>
        <option>Matareya</option>
        <option>Kafr Abdo</option>
        <option>Sayeda Zeinab</option>
        <option>Mosky</option>
        <option>Toshka</option>
        <option>Luxor w Aswan</option>
        <option>Smouha</option>
        <option>Maadi</option>
        <option>Netherlands</option>
        <option>Canada</option>
        <option>Switzerland</option>
        <option>Ireland</option>
    </select>
</div>
          </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar