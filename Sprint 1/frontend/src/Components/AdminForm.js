import { useState } from "react"

const AdminForm = () => {
    const[Username, setUsername] = useState('')
    const[Password, setPassword] = useState('')
    const[error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const course = {Username, Password}

        const response = await fetch('http://localhost:4000/admin/addadmin' , {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            } 
        })
        const json = await response.json()

        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setUsername('')
            setPassword('')
            setError(null)
            console.log('New admin added', json)
        }
    }

    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new Admin</h3>

            <label>Username:</label>
            <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={Username}
            />


        <label>Password:</label>
            <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={Password}
            />

            <button>Add Admin</button>
        </form>
    )
}

export default AdminForm