import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Loading } from '../components/Loading';

function Search() {
    const [Result, setResult] = useState([]);
    const [loading, setloading] = useState(true)
    let query = (new URLSearchParams(window.location.search)).get("query-text")
    useEffect(() => {
        axios.post('/api/search',{query: query}).then((res)=>{
            setResult(res.data.data)
            setloading(false)

        })
    }, [query])
    return (
        <section>
            <div className="container mt-3">
            <Loading loading={loading} />
                <h4>Search Results: </h4><hr/>
                <div className="row">
                    <div className="col-md-8">
                        { Result.map((R,k)=>{

                            return <Link to={`/softwares/${R.slug}`}><div className="card my-3 p-2" key={k}>
                             <div className="row">
                                 <div className="col-md-4">
                                     <img src={R.software_logo} className="p-1" width="100%"/>
                                 </div>
                                 <div className="col-md-8">
                                     <h4 className="">{R.software_name}</h4>
                                     <hr />
                                     <p>{R.summary}</p>
                                 </div>
                             </div>
                         </div></Link>
                        }) }


                    </div>
                </div>
            </div>
        </section>
    )
}

export default Search
