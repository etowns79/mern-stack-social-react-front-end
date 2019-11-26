import React, { Component } from 'react'
import Alert from '../core/Alert';
import { Redirect } from 'react-router-dom';

export default class Signin extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        redirectToReferer: false,
        loading: false
    }

    handleChange = (name) => (event) => {
        this.setState({ error: "" })
        this.setState({ [name]: event.target.value })
    }

    authenticate = (jwt, next) => {
        if (typeof window !== 'undefined') {
            localStorage.setItem("jwt", JSON.stringify(jwt))
            next();
        }
    }

    clickSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const { email, password } = this.state;
        const user = {
            email,
            password
        }

        this.signin(user)
            .then(data => {
                if (data.error) {
                    this.setState({ error: data.error, loading: false })

                } else {
                    //authenticate
                    this.authenticate(data, () => {
                        this.setState({ redirectToReferer: true })
                    })

                }
            })
    }

    signin = (user) => {
        return fetch("http://localhost:8080/api/auth/signin", {
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
        const { email, password, error, redirectToReferer, loading } = this.state;

        if (redirectToReferer) {
            return <Redirect to="/" />
        }
        return (
            <div className="container">
                <h2 className="mt-5 mb-5">Signin</h2>

                <Alert status="alert alert-danger" error={error} />
                {loading ? <div className="jumbotron text-center"><h2>Loading</h2></div> : ""}

                <form action="">


                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={this.handleChange("email")} className="form-control" type="email" name="email" id="email" value={email} />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={this.handleChange("password")} className="form-control" type="password" name="password" id="password" value={password} />
                    </div>
                    <button onClick={this.clickSubmit} className="btn btn-raised">
                        Submit
                    </button>
                </form>
            </div>

        )
    }
}
