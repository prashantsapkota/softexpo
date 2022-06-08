import React from 'react'
import { Link } from 'react-router-dom'

function Explore() {
    return (
            <div className="container">
                <h3>Stay Productive while Working From Home</h3>
                <p>Take your business online with these popular tools that will help you work remotely as a team</p>
            <div className="row d-flex mr-2">
                <div className="card">
                    <div className="card-body">
                        <img src="/" />
                        <Link to="/software/test-software"></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explore
