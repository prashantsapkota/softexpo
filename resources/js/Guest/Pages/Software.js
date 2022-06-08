import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { getUseriD, isUserLogedIn } from '../../Controllers/AuthController';
import { Loading } from '../components/Loading';

function Software() {
    const { software } = useParams()
    const [Product, setProduct] = useState('');
    const [loading, setloading] = useState(true)
    const [LeadName, setLeadName] = useState('')
    const [LeadEmail, setLeadEmail] = useState('')
    const [LeadPhone, setLeadPhone] = useState('')
    const [USerID, setUSerID] = useState('')
    const [ReviewText, setReviewText] = useState('')
    const [Reviews, setReviews] = useState([])

    useEffect(() => {
        axios.get(`/api/softwares/show/${software}`).then((res) => {
            setProduct(res.data)
            setloading(false)
            setReviews(res.data.reviews)
        })

        const userid = getUseriD()
        setUSerID(userid)
    }, [software])

    const HandleLead = (e) => {
        e.preventDefault();
        let LeadData = {
            'name': LeadName,
            'email': LeadEmail,
            'phone': LeadPhone,
            'software_id': Product.id
        }

        axios.post('/api/leads/store',LeadData).then((res)=>{
            if (res.status==201) {
                toast.info('🦄' + " SAVED", {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setLeadEmail('')
                setLeadName('')
                setLeadPhone('')

            }
        })
        // console.log(LeadData)
    }

    const HandleReview = (e) =>{
        e.preventDefault()
        let data = {
            software_id: Product.id,
            user_id:USerID,
            text:ReviewText
        }
        axios.post('/api/review/store',data).then(res=>{
            if (res.status==201) {
                toast.info('🦄' + " Review submitted", {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });

            }
        }).finally(()=>{
            return setReviewText('')
        })
    }
    return (
        <>
        <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <section>
                <div className="container">
                    <Loading loading={loading} />
                    <div className="row mt-4 fixed">
                        <div className="col-md-3 col-lg-2">
                            <img src={Product.software_logo} width="100%" />
                        </div>
                        <div className="col-md-9 col-lg-10">
                            <span>
                                <h4>{Product.software_name}</h4>
                                <p>12 Reviews</p>
                                <div className="mt-2">
                                    {Product.specifications && (Product.specifications.offer_trial) ? <button className="btn btn-primary mx-2">Free Demo</button> : null}
                                    <a href="#Reviews" className="btn btn-secondary mx-2">Write a review</a>
                                </div>
                            </span>
                            <div className="col-12 d-flex justify-content-between p-0 mt-3">
                                <a href="#overview" className="btn">Overview</a>
                                <a href="#Screenshots" className="btn">Screenshots</a>
                                <a href="#Specifications" className="btn">Specifications</a>
                                <a href="#CompanyDetails" className="btn">Company Details</a>
                                <a href="#Description" className="btn">Description</a>
                                <a href="#Pricing" className="btn">Pricing</a>
                                <a href="#Reviews" className="btn">Reviews</a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <section id="overview" className="my-4 p-1">
                            <div className="container">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Overview</h4>
                                    </div>
                                    <div className="card-body">
                                        {Product.summary}
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id="Screenshots" className="my-4 p-1">
                            <div className="container">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Screenshots</h4>
                                    </div>
                                    <div className="card-body">
                                        {Product.software_media ?
                                            <img src={Product.software_media.screenshots} width="80%" /> : "No Screenshots found"}
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id="Specifications" className="my-4 p-1">
                            <div className="container">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Specifications</h4>
                                    </div>
                                    <div className="card-body row">
                                        {Product.specifications ? <>
                                            <div className="col-md-6">
                                                <p>Payment: {Product.specifications.payment_options}</p>
                                                <p>APIs Availability: {(Product.specifications.is_api_available == 1) ? "Yes" : "No"}</p>
                                                <p>Customizable: {(Product.specifications.is_customizable == 1) ? "Yes" : "No"}</p>
                                                <p>Lifetime Free: {(Product.specifications.is_lifetime_free == 1) ? "Yes" : "No"}</p>
                                                <p>Offer Trials: {(Product.specifications.offer_trial == 1) ? "Yes" : "No"}</p>
                                                <p>Runs on Mobile Browsers: {(Product.specifications.runs_on_mobile_browser == 1) ? "Yes" : "No"}</p>
                                                <h6 className="badge badge-danger">Available Support</h6>
                                                <p>{Product.specifications.available_support}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <h6 className="badge badge-info">Desktop Platform</h6>
                                                <p>{Product.specifications.desktop_platform}</p>

                                                <h6 className="badge badge-info">Integrations</h6>
                                                <p>{Product.specifications.integration}</p>

                                                <h6 className="badge badge-info">Languages Available</h6>
                                                <p>{Product.specifications.language_available}</p>

                                                <h6 className="badge badge-info">Mobile Options</h6>
                                                <p>{Product.specifications.mobile_platform_options}</p>

                                                <h6 className="badge badge-info">Target Audience</h6>
                                                <p>{Product.specifications.target_audience}</p>
                                            </div>
                                        </>
                                            : "No Specifications found"}
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id="CompanyDetails" className="my-4 p-1">
                            <div className="container">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Company Details</h4>
                                    </div>
                                    <div className="card-body">
                                        {Product.vendor && (Product.vendor.company) ?
                                            <ul>
                                                <li className="d-flex ">
                                                    <span className="font-weight-bolder mx-1">Company Name:</span>
                                                    <p>{Product.vendor.company.name}</p>
                                                </li>
                                                <li className="d-flex">
                                                    <span className="font-weight-bolder mx-1">Full Address:</span>
                                                    <p>{Product.vendor.company.address + "," + Product.vendor.company.city + "," + Product.vendor.company.country + "-" + Product.vendor.company.pincode}</p>
                                                </li>
                                                <li className="d-flex">
                                                    <span className="font-weight-bolder mx-1">Website: </span>
                                                    <p>
                                                        <a href={Product.vendor.company.website} className="btn btn-info" target="_blank">Visit Website</a>
                                                    </p>
                                                </li></ul>
                                            : "No Company Details found"}
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section id="Description" className="my-4 p-1">
                            <div className="container">
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Desription</h4>
                                    </div>
                                    <div className="card-body">
                                        {Product.description ? Product.description : "No Description found"}
                                    </div>
                                </div>
                            </div>
                        </section>

                    </div>
                    <div className="col-lg-4">
                        <section id="leads" className="my-4 p-1">
                            <div className="card">
                                <h6 className="card-header bg-primary">Have a Question?</h6>
                                <div className="card-body">
                                    <form onSubmit={(e)=> HandleLead(e)}>
                                    <div className="form-group">
                                        <input className="form-control w-100" type="text" value={LeadName} placeholder="Name *" onChange={(e) => setLeadName(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control w-100" type="email" value={LeadEmail} placeholder="Email *" onChange={(e) => setLeadEmail(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <input className="form-control w-100" type="tel" placeholder="Phone *" value={LeadPhone} onChange={(e) => setLeadPhone(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-block btn-outline-danger" />
                                    </div>
                                    </form>
                                </div>
                            </div>
                        </section>
                        <section id="Reviews" className="my-5 p-1">
                            <div className="card">
                                <h6 className="card-header bg-success">Reviews</h6>
                                <div className="card-body">
                                    { isUserLogedIn() ? <>
                                    <div className="form-group">
                                        <textarea className="form-control w-100" placeholder="Your Reviews" onChange={e=>setReviewText(e.target.value)}></textarea>
                                    </div>

                                    <div className="form-group">
                                        <input type="submit" className="btn btn-block btn-outline-success" onClick={e=>HandleReview(e)} />
                                    </div></>:<>
                                    <p>Login to write reviews</p>
                                    <Link to={`/home/guestlogin?ref=/softwares/${software}`} className="btn btn-outline-success">Login</Link>
                                    </>}
                                    { Reviews.map(R=>{
                                        return <>
                                         <hr />
                                    <div className="d-flex align-item-centre">
                                        <img className="img-xs rounded-circle" src="/assets/images/faces/face8.jpg" alt="Profile" />
                                        <h6 className="mx-3">{R.user.name}</h6>
                                    </div>
                                    <p className="my-3 p-2">{R.text}</p>
                                        </>
                                    })}

                                </div>
                            </div>
                        </section>
                        <section id="Medias" className="my-5 p-1">
                            <div className="card">
                                <h6 className="card-header bg-success">Medias</h6>
                                <div className="card-body">
                                    {Product.software_media &&
                                        (Product.software_media.ebooks) ?
                                            <a href={Product.software_media.ebooks} download>Ebook</a>
                                            : null
                                    }
                                    { Product.software_media &&
                                                (Product.software_media.video_link) ?
                                                <iframe src={Product.software_media.video_link} download>Ebook</iframe>
                                                : null

                                    }

                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Software
