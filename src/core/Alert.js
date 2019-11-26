import React from 'react'

export default function Alert(props) {
    const { status, error, message } = props

    if (message) {
        return (
            <div className={status} style={{ display: message ? "" : "none" }
            }>
                You have successfully signed up!
            </div>
        )
    } else {
        return (
            <div className={status} style={{ display: error ? "" : "none" }
            }>
                {error}
            </div>
        )
    }
}
