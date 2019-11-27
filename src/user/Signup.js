import React, { Component } from 'react'
import Alert from '../core/Alert';

export default class Signup extends Component {

    state = {
        name: "",
        email: "",
        password: "",
        error: "",
        message: false
    }


    handleChange = (name) => (event) => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })
    }

    clickSubmit = (event) => {
        event.preventDefault();
        const { name, email, password } = this.state;
        const user = {
            name,
            email,
            password,

        }


        this.signup(user)
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error })

                } else this.setState({ error: "", name: "", email: "", password: "", message: true })
            })
    }

    signup = (user) => {
        return fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                return response.json();
            }).catch(err => console.log(err))
    }

    render() {
        const { name, email, password, error, message } = this.state
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signup</h2>

                <Alert status="alert alert-danger" error={error} />
                <Alert status="alert alert-success" message={message} />

                <form action="">

                    <div className="form-group">
                        <label className="text-muted">Name</label>
                        <input onChange={this.handleChange("name")} className="form-control" type="text" name="name" id="name" value={name} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} className="form-control" type="email" name="email" id="email" value={email} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} className="form-control" type="password" name="password" id="password" value={password} />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}
