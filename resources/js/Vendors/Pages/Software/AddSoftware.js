import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useHistory } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { venodrAxios } from "../../../axios";
import { validator } from "../../../utils";
import {UploadClient} from '@uploadcare/upload-client'

import {
    getCompanydetails,
    getCurrentVendorId,
    get_current_auth_id,
} from "../../Helpers/HelperFunction";
function AddSoftware() {
    const client = new UploadClient({ publicKey: "7236e8ede7c38af26acc" });
    const [Categories, setCategories] = useState([]);
    const [SoftwareName, setSoftwareName] = useState("");
    const [Tagline, setTagline] = useState("");
    const [ProductURL, setProductURL] = useState("");
    const [CategoryID, setCategoryID] = useState("");
    const [SoftwareCompt, setSoftwareCompt] = useState("");
    const [Summary, setSummary] = useState("");
    const [Description, setDescription] = useState("");
    const [Logo, setLogo] = useState("")
    const [SoftwareId, setSoftwareId] = useState("")
    const [FormSlider, setFormSlider] = useState(1)
    const [OfferTrial, setOfferTrial] = useState('')
    const [isLifeTimeFree, setisLifeTimeFree] = useState('')
    const [isCustomizable, setisCustomizable] = useState('')
    const [DesktopPlatform, setDesktopPlatform] = useState([])
    const [AviablePlatform, setAviablePlatform] = useState('')
    const [Romb, setRomb] = useState('')
    const [PaymentOption, setPaymentOption] = useState([])
    const [IsAPIavailable, setIsAPIavailable] = useState('')
    const [TargetAudience, setTargetAudience] = useState([])
    const [MPO, setMPO] = useState([])
    const [LA, setLA] = useState('')
    const [integration, setintegration] = useState('')
    const [AvailableSupport, setAvailableSupport] = useState([])
    const [SS, setSS] = useState('')
    const [VideoLink, setVideoLink] = useState('')
    const [BrochureLink, setBrochureLink] = useState('')
    const [Ebooks, setEbooks] = useState('')
    const [Whitepapers, setWhitepapers] = useState('')
    const [PDF, setPDF] = useState('')
    const [Guide, setGuide] = useState('')
    const [AppFile, setAppFile] = useState('')
    const history = useHistory()

    // const []

    useEffect(() => {
        axios.get("/api/software-categories").then((res) => {
            setCategories(res.data);
        });
        // setFormSlider()
    }, []);


  const [CompanyDetails, setCompanyDetails] = useState([]);
  const [loading, setloading] = useState(true)
  useEffect(() => {
    getCompanydetails().then((response) => {
      console.log(response);
      setCompanyDetails(response);
      if(response){
        setloading(false)
    }

    })
  }, [])


  if(!CompanyDetails){
      history.push('/vendor/add-company');
  }



    const HandleFirstSubmit = (e) => {
        e.preventDefault();
        const vendorid = get_current_auth_id();
        const data = {
            vendor_id: vendorid,
            software_name: SoftwareName,
            tagline: Tagline,
            category_id: CategoryID,
            software_competitors: SoftwareCompt,
            summary: Summary,
            description: Description,
        };
        const fileData = new FormData();
        fileData.append('file', Logo);

        venodrAxios.post("/software/create", data).then((res) => {
            console.log(res.data);
            fileData.append('id', res.data.data.id)
            setSoftwareId(res.data.data.id)
            venodrAxios.post('/software/handle-logo', fileData).then((res) => {
                if (res.status == 200) {
                    toast.success('🦄' + res.data.msg, {
                        position: "top-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setFormSlider(2)
                }
            }).catch((error) => {
                if (error.response && error.response.status == 422) {
                    const errors = error.response.data.errors;
                    for (const key in errors) {
                        if (Object.hasOwnProperty.call(errors, key)) {
                            const element = errors[key][0];
                            console.log(element);
                            toast.error('🦄' + element, {
                                position: "top-left",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }
                    }
                }
            })
        });
    };

    const HandleSecondSubmit = (e) => {
        e.preventDefault()

        const data = {
            software_id: SoftwareId,
            offer_trial: OfferTrial,
            is_lifetime_free: isLifeTimeFree,
            is_customizable: isCustomizable,
            desktop_platform: DesktopPlatform,
            available_support: AvailableSupport,
            runs_on_mobile_browser: Romb,
            payment_options: PaymentOption,
            is_api_available: IsAPIavailable,
            target_audience: TargetAudience,
            mobile_platform_options: MPO,
            language_available: LA,
            integration: integration
        }
        console.log(data);
        const rules = {
            software_id: "required",
            offer_trial: "required",
            is_lifetime_free: "required",
            is_customizable: "required",
            desktop_platform: "required",
            available_support: "required",
            runs_on_mobile_browser: "required",
            payment_options: "required",
            is_api_available: "required",
            target_audience: "required",
            mobile_platform_options: "required",
            language_available: "required",
            integration: "required"
        }
        if (validator(data, rules)) {
            venodrAxios.post('/software_specification/store', data).then((res) => {
                if (res.status == 201) {
                    toast.success('🦄' + res.data.msg, {
                        position: "top-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setFormSlider(3)
                }
            }).catch((error) => {
                if (error.response && error.response.status == 422) {
                    const errors = error.response.data.errors;
                    for (const key in errors) {
                        if (Object.hasOwnProperty.call(errors, key)) {
                            const element = errors[key][0];
                            console.log(element);
                            toast.error('🦄' + element, {
                                position: "top-left",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                            });
                        }
                    }
                }
            })
        }
    }

    const HandleThirdSubmit = async (e) =>{
        e.preventDefault()
        setloading(true)
        const thirdFormData = new FormData()
        thirdFormData.append('screenshots',SS)
        thirdFormData.append('brochure',BrochureLink)
        thirdFormData.append('ebooks',Ebooks)
        thirdFormData.append('video_link',VideoLink)
        thirdFormData.append('whitepapers',Whitepapers)
        thirdFormData.append('pdf',PDF)
        thirdFormData.append('guides',Guide)
        thirdFormData.append('software_id',SoftwareId)
        await client.uploadFile(AppFile).then((res) => {
            console.log(res.uuid);
             thirdFormData.append('app','https://ucarecdn.com/'+res.uuid)
            venodrAxios.post('/softwaremedia/create',thirdFormData).then(res=>{
                if(res){
                    setloading(false);
                    toast.success('🦄'+"Saved", {
                        position: "top-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                    });
                    window.location.href="/vendor"
                }
            })
        })

    }

    return (
        <div className="row">
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
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Add Software</h4>
                        {(FormSlider == 1) ?
                            <form className="form-sample">
                                <p className="badge">1. Basic Details</p>
                                <div className="row">

                                    <Form.Group className="col-md-6">
                                        <div className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Software Name
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) =>
                                                        setSoftwareName(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={SoftwareName}
                                                />
                                            </div>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="col-md-6">
                                        <div className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Product URL
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control
                                                    type="url"
                                                    onChange={(e) =>
                                                        setProductURL(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={ProductURL}
                                                />
                                            </div>
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="row">
                                    <Form.Group className="col-md-6">
                                        <div className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Tagline
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) =>
                                                        setTagline(e.target.value)
                                                    }
                                                    value={Tagline}
                                                />
                                            </div>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="col-md-6">
                                        <div className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Product Logo
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control
                                                    type="file"
                                                    className="form-control d-none visibility-hidden"
                                                    id="customFileLang"
                                                    lang="en"
                                                    onChange={(e) => setLogo(e.target.files[0])}
                                                />
                                                <label
                                                    className="custom-file-label"
                                                    htmlFor="customFileLang"
                                                >
                                                    Upload image
                                                </label>
                                            </div>
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="row">
                                    <Form.Group className="col-md-6">
                                        <div className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Category
                                            </label>
                                            <div className="col-sm-9">
                                                <select
                                                    className="form-control"
                                                    onChange={(e) =>
                                                        setCategoryID(
                                                            e.target.value
                                                        )
                                                    }
                                                >
                                                    {Categories.map((c, i) => {
                                                        return (
                                                            <option
                                                                key={i}
                                                                value={c.id}
                                                            >
                                                                {c.name}
                                                            </option>
                                                        );
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="col-md-6">
                                        <div className="row">
                                            <label className="col-sm-3 col-form-label">
                                                Software Competitors
                                            </label>
                                            <div className="col-sm-9">
                                                <Form.Control
                                                    type="text"
                                                    onChange={(e) =>
                                                        setSoftwareCompt(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={SoftwareCompt}
                                                />
                                            </div>
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="row">
                                    <Form.Group className="col-md-12">
                                        <div className="row">
                                            <label className="col-sm-2 col-form-label">
                                                Summary *
                                            </label>
                                            <div className="col-sm-9 offset-1">
                                                <textarea
                                                    className="form-control"
                                                    rows="5"
                                                    columns="2"
                                                    onChange={(e) =>
                                                        setSummary(e.target.value)
                                                    }
                                                    value={Summary}
                                                />
                                            </div>
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="row">
                                    <Form.Group className="col-md-12">
                                        <div className="row">
                                            <label className="col-sm-2 col-form-label">
                                                Description *
                                            </label>
                                            <div className="col-sm-9 offset-1">
                                                <textarea
                                                    className="form-control"
                                                    rows="5"
                                                    columns="2"
                                                    onChange={(e) =>
                                                        setDescription(
                                                            e.target.value
                                                        )
                                                    }
                                                    value={Description}
                                                />
                                            </div>
                                        </div>
                                    </Form.Group>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary mr-2"
                                    onClick={(e) => HandleFirstSubmit(e)}
                                >
                                    Save &#38; Next
                                </button>
                                <button type="reset" className="btn btn-light">
                                    Reset
                                </button>
                            </form> : null}
                        {
                            (FormSlider == 2) ?
                                <form className="form-sample">
                                    <p className="badge">2. Specifications</p><br />
                                    <div className="row">

                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-12 col-form-label">
                                                    How is Software accessible? *
                                                </label>
                                                <div className="col-sm-10">
                                                    <div className="d-flex justify-content-around flex-wrap">
                                                        <div className="form-check form-check-primary">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" name="access" value="Cloud Based" /> Cloud Based
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" name="access" value="On Premises" /> On Premises
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" name="access" value="Hybrid" /> Hybrid
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-Primary">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" name="access" value="Any" /> Any
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-12 col-form-label">
                                                    Does this Software Offers Free Trial?
                                                </label>
                                                <div className="col-sm-12">
                                                    <div className="d-flex flex-wrap">
                                                        <div className="form-check form-check-primary mr-3" onChange={(e) => setOfferTrial(e.target.value)}>
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" name="freet" value="1" /> Yes
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" name="freet" value="0" /> No
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-12 col-form-label">
                                                    Is Customization possible?
                                                </label>
                                                <div className="col-sm-10">
                                                    <div className="d-flex  flex-wrap" onChange={(e) => setisCustomizable(e.target.value)}>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" name="customization" value="1" /> Yes
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" name="customization" value="0" /> No
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-12 col-form-label">
                                                    Does the software run on mobile browser? *
                                                </label>
                                                <div className="col-sm-12">
                                                    <div className="d-flex flex-wrap" onChange={(e) => setRomb(e.target.value)}>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" name="mobile_supp_b" value="1" /> Yes
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" name="mobile_supp_b" value="0" /> No
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-12 col-form-label">
                                                    Does this software has a lifetime free plan? *
                                                </label>
                                                <div className="col-sm-10">
                                                    <div className="d-flex  flex-wrap" onChange={(e) => setisLifeTimeFree(e.target.value)}>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" name="lifetime" value="1" /> Yes
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" name="lifetime" value="0" /> No
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-12 col-form-label">
                                                    Are APIs available for this software? *
                                                </label>
                                                <div className="col-sm-12">
                                                    <div className="d-flex flex-wrap" onChange={(e) => setIsAPIavailable(e.target.value)}>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" name="is_Api" value="1" /> Yes
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" name="is_Api" value="0" /> No
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-12 col-form-label">
                                                    Payment Options *
                                                </label>
                                                <div className="col-sm-10">
                                                    <div className="d-flex  flex-wrap" onChange={(e) => setPaymentOption([...PaymentOption, e.target.value])}>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="po" value="yearly" /> Yearly
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="po" value="monthly" /> Monthly
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="po" value="onetime" /> Onetime (Perpetual license)
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="po" value="transaction" /> Transaction
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-12 col-form-label">
                                                    Target Audience
                                                </label>
                                                <div className="col-sm-12">
                                                    <div className="d-flex flex-wrap" onChange={(e) => setTargetAudience([...TargetAudience, e.target.value])}>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="po" value="Freelancers" /> Freelancers
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="po" value="Startups" /> Startups
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="po" value="SMEs" /> SMEs
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="po" value="Agencies" /> Agencies
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="po" value="Enterprises" /> Enterprises
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-12 col-form-label">
                                                    Desktop Platforms Options *
                                                </label>
                                                <div className="col-sm-10">
                                                    <div className="d-flex  flex-wrap" onChange={(e) => setDesktopPlatform([...DesktopPlatform, e.target.value])}>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="platforms" value="Web App" /> Web App
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="platforms" value="Windows" /> Windows
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="platforms" value="Machintosh" /> Machintosh
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-12 col-form-label">
                                                    Mobile Platforms Options
                                                </label>
                                                <div className="col-sm-12">
                                                    <div className="d-flex flex-wrap" onChange={(e) => setMPO(e.target.value)}>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="mplatforms" value="IOS/App Store" /> IOS/App Store
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="mplatforms" value="Android/Play Store" /> Androis/Play Store
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-12 col-form-label">
                                                    Aviable Support*
                                                </label>
                                                <div className="col-sm-10">
                                                    <div className="d-flex  flex-wrap" onChange={(e) => setAvailableSupport([...AvailableSupport, e.target.value])}>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="platforms" value="Email" /> Email
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="platforms" value="Phone" /> Phone
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="platforms" value="Live Support" /> Live Support
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="platforms" value="Training" /> Training
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="checkbox" className="form-check-input" name="platforms" value="Tickets" /> Tickets
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                                <label className="col-sm-12 col-form-label">
                                                    Available languages *
                                                </label>
                                                <div className="col-sm-12">
                                                    <div className="d-flex flex-wrap" onChange={(e) => setLA(e.target.value)}>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" name="lang" value="ENG Only" /> ENG only
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                        <div className="form-check form-check-primary mr-3">
                                                            <label className="form-check-label">
                                                                <input type="radio" className="form-check-input" name="lang" value="ENG and few others" /> ENG and few others
                                                                <i className="input-helper"></i>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="row">
                                                <label className="col-sm-2 text-center col-form-label">
                                                    Integrations
                                                </label>
                                                <div className="col-sm-9">
                                                    <textarea
                                                        className="form-control"
                                                        rows="5"
                                                        columns="2"
                                                        onChange={(e) => setintegration(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="my-lg-4 p-1">
                                        <button
                                            type="submit"
                                            className="btn btn-primary mr-2"
                                            onClick={(e) => HandleSecondSubmit(e)}
                                        >
                                            Save &#38; Next
                                        </button>
                                        <button type="reset" className="btn btn-light">
                                            Reset
                                        </button>
                                    </div>
                                </form> : null
                        }
                        {
                            (FormSlider == 3) ?
                                <form className="form-sample">
                                    <p className="badge">3. Software Media</p><br />
                                    <div className="row">
                                        <div className="col-md-8">
                                            <Form.Group>
                                                <label>Screenshots *</label>
                                                <div className="custom-file">
                                                    <Form.Control type="file" className="form-control visibility-hidden" id="ss" lang="en" onChange={(e) => setSS(e.target.files[0])}  />
                                                    <label className="custom-file-label" htmlFor="ss">Upload image</label>
                                                </div>
                                            </Form.Group>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-8">
                                            <Form.Group>
                                                <label>Video Link </label>
                                                <textarea className="form-control"></textarea>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-8">
                                            <Form.Group>
                                                <label>Brochure File </label>
                                                <div className="custom-file">
                                                    <Form.Control type="file" className="form-control visibility-hidden" id="brochureFile" lang="en" onChange={(e) => setBrochureLink(e.target.files[0])}  />
                                                    <label className="custom-file-label" htmlFor="brochureFile">Upload Brochure</label>
                                                </div>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-8">
                                            <Form.Group>
                                                <label>Ebooks </label>
                                                <div className="custom-file">
                                                    <Form.Control type="file" className="form-control visibility-hidden" id="ebookFile" lang="en" onChange={(e) => setEbooks(e.target.files[0])}  />
                                                    <label className="custom-file-label" htmlFor="ebookFile">Upload Ebook</label>
                                                </div>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-8">
                                            <Form.Group>
                                                <label>Whitepaper </label>
                                                <div className="custom-file">
                                                    <Form.Control type="file" className="form-control visibility-hidden" id="whitepaper" lang="en" onChange={(e) => setWhitepapers(e.target.files[0])}  />
                                                    <label className="custom-file-label" htmlFor="whitepaper">Upload Whitepaper</label>
                                                </div>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-8">
                                            <Form.Group>
                                                <label>PDF </label>
                                                <div className="custom-file">
                                                    <Form.Control type="file" className="form-control visibility-hidden" id="PDF" lang="en" onChange={(e) => setPDF(e.target.files[0])}  />
                                                    <label className="custom-file-label" htmlFor="PDF">Upload PDF</label>
                                                </div>
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-8">
                                            <Form.Group>
                                                <label>Guides </label>
                                                <div className="custom-file">
                                                    <Form.Control type="file" className="form-control visibility-hidden" id="Guides" lang="en" onChange={(e) => setGuide(e.target.files[0])}  />
                                                    <label className="custom-file-label" htmlFor="Guides">Upload Guides</label>
                                                </div>
                                            </Form.Group>
                                        </div>

                                        <div className="col-md-8">
                                            <Form.Group>
                                                <label>Application File </label>
                                                <div className="app-file">
                                                    <Form.Control type="file" className="form-control visibility-hidden" id="AppFile" lang="en" onChange={(e) => setAppFile(e.target.files[0])}  />
                                                    <label className="app-file-label" htmlFor="AppFile">Upload Application File</label>
                                                </div>
                                            </Form.Group>
                                        </div>
                                        { loading && <p>uploading to CDN...</p> }
                                    </div>
                                    <div className="my-lg-4 p-1">
                                        <button
                                            type="submit"
                                            className="btn btn-primary mr-2"
                                            onClick={(e) => HandleThirdSubmit(e)}
                                        >
                                            Save &#38; Next
                                        </button>
                                        <button type="reset" className="btn btn-light">
                                            Reset
                                        </button>
                                    </div>
                                </form> : null
                        }
                        {
                            (FormSlider == 4) ? fourth : null
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddSoftware;
