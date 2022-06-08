import React from 'react'
import { Link } from 'react-router-dom'

function ProductListing({Softwares}) {
    return(
            <div className="col-md-4">
                <Link to={`/softwares/${Softwares.slug}`} className="text-decoration-none">
                <div className="card">
                    <div className="card-body">
                        <img src={Softwares.software_logo} width="100%"/>
                       <h6 className="">{Softwares.software_name}</h6>
                       <p>12 Reviews</p>
                    </div>
                </div>
                </Link>
            </div>

    )
}

export default ProductListing
