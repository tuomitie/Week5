import React from 'react'

const Notification = ({ notification }) => {
    if (notification === '') {
        return null
    }
    return (
        <div className="notification alert alert-success col-12 px-2" role="alert">
            {notification}
        </div>
    )
}

export default Notification