import {useState} from 'react'
import { UseStudentLogin } from '../Hooks/UseLogin'

const LogIn = () => {
    const [FirstName, setFirstName] = useState('')
    const [Lastname, setLastName] = useState('')
    const [Username, setUsername] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const {login, error, isLoading} = UseStudentLogin()

    const handleSubmit = async (e) => {

        e.preventDefault()

        await login(Email, Password)
    }

    return(
        <form className="Login" onSubmit={handleSubmit}>
            <h3>Login</h3>


           <label>Email:</label>
            <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={Email} 
      />

           <label>Password</label>
            <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={Password} 
      />


      <button disabled={isLoading}>Login</button>
      {error && <div className="error">{error}</div>}
        </form>

        
    )
    
}

export default LogIn