import {useState} from 'react'
import { UseStudentSignup } from '../Hooks/UseStudentSignup'

const SignUp = () => {
    const [FirstName, setFirstName] = useState('')
    const [Lastname, setLastName] = useState('')
    const [Username, setUsername] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const {signup, error, isLoading} = UseStudentSignup()

    const handleSubmit = async (e) => {

        e.preventDefault()

        await signup(FirstName, Lastname, Username, Email, Password)
    }

    return(
        <form className="Signup" onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <label>First Name:</label>
            <input 
        type="text" 
        onChange={(e) => setFirstName(e.target.value)} 
        value={FirstName} 
      />

           <label>Last Name:</label>
            <input 
        type="text" 
        onChange={(e) => setLastName(e.target.value)} 
        value={Lastname} 
      />

            <label>Username:</label>
            <input 
        type="text" 
        onChange={(e) => setUsername(e.target.value)} 
        value={Username} 
      />

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


      <button disabled={isLoading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
        </form>
    )
}

export default SignUp