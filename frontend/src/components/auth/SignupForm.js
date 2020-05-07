import React, {useState} from "react";

function RegisterForm({onSubmit}) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Sign up</h4>
                <div>
                    <div className="form-group">
                        <label>First name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={firstName}
                            onChange={ e => setFirstName(e.target.value) }
                            placeholder="First Name"/>
                    </div>

                    <div className="form-group">
                        <label>Last name:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={lastName}
                            onChange={ e => setLastName(e.target.value) }
                            placeholder="Last Name"/>
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={ e => setEmail(e.target.value) }
                            className="form-control"
                            placeholder="Email"/>
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)} />
                    </div>

                    <div className="form-group">
                        <button
                            className="btn btn-success"
                            onClick={() => onSubmit({firstName, lastName, email, password})}>
                            Create account
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default RegisterForm;