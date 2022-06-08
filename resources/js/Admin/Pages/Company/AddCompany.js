import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';
import venodrAxios from '../../../axios';
import { useHistory } from 'react-router';
import { getCompanydetails } from '../../Helpers/HelperFunction';

function AddCompany() {

    const [name, setname] = useState('');
    const [Website, setWebsite] = useState('');
    const [Email, setEmail] = useState('');
    const [State, setState] = useState('');
    const [Country, setCountry] = useState('');
    const [City, setCity] = useState('');
    const [Pincode, setPincode] = useState('');
    const [Address, setAddress] = useState('');
    const [NOE, setNOE] = useState('');
    const [NOC, setNOC] = useState('');
    const [GST_IN, setGST_IN] = useState('');
    const [RC, setRC] = useState('');
    const [YOE, setYOE] = useState('');
    const [HSC, setHSC] = useState('');
    const [Logo, setLogo] = useState('');
    const history = useHistory()

    useEffect(() => {
    getCompanydetails().then((response)=>{
       if(response){
           history.push('/vendor/company');
       }
    })
    }, [])


    const handleChange = date => {
      setYOE(date)
      };

    useEffect(() => {
        bsCustomFileInput.init()
        setYOE(new Date())
    }, [])

    const handleSubmit = (e) =>{
        e.preventDefault();
        let data = {
            name: name,
            website: Website,
            email:Email,
            state: State,
            country:Country,
            city:City,
            pincode: Pincode,
            address: Address,
            number_of_employee:NOE,
            number_of_customers:NOC,
            GST_IN:GST_IN,
            RC:RC,
            HSC:HSC,
            YOE:YOE,
            logo: Logo,
        }
        // console.log(data);
        const fileData = new FormData();
        fileData.append('file',Logo);


        venodrAxios.post('/company/create',data).then((result)=>{
            if (result.status==201) {
                console.log(result)
            const config = { headers: { 'Content-Type': 'multipart//form-data' } };
            fileData.append('id',result.data.data.id)
            venodrAxios.post('/company/handlelogo',fileData,config).then((res)=>{
                if(res){
                    history.push('/vendor/company')
                }
            })
            }
        })
    }

    return (
        <div className="row">
              <div className="col-12 grid-margin">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add Company Details</h4>
                <form className="form-sample" onSubmit={(e)=>handleSubmit(e)}>
                  {/* <p className="card-description"> Personal info </p> */}
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Company Name</label>
                        <div className="col-sm-9">
                        <Form.Control  type="text" onChange={(e)=>setname(e.target.value)} value={name} />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Website</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" onChange={(e)=>setWebsite(e.target.value)} value={Website} />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Email</label>
                        <div className="col-sm-9">
                        <Form.Control  type="email" onChange={(e)=>setEmail(e.target.value)} value={Email} />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Country</label>
                        <div className="col-sm-9">
                          <select className="form-control" onChange={(e)=>setCountry(e.target.value)} value={Country}>
                            <option>America</option>
                            <option>Italy</option>
                            <option>Russia</option>
                            <option>Britain</option>
                          </select>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">State</label>
                        <div className="col-sm-9">
                          <select className="form-control" onChange={(e)=>setState(e.target.value)} value={State}>
                            <option>Category1</option>
                            <option>Category2</option>
                            <option>Category3</option>
                            <option>Category4</option>
                          </select>
                        </div>
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">City</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" onChange={(e)=>setCity(e.target.value)} value={City}/>
                        </div>
                      </Form.Group>
                    </div>

                  </div>
                  {/* <p className="card-description"> Address </p> */}
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Address</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" onChange={(e)=>setAddress(e.target.value)} value={Address}/>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Pin Code</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" onChange={(e)=>setPincode(e.target.value)} value={Pincode} />
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Number of employess</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" onChange={(e)=>setNOE(e.target.value)} value={NOE}/>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Number of Customers</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" onChange={(e)=>setNOC(e.target.value)} value={NOC}/>
                        </div>
                      </Form.Group>
                    </div>
                  </div>
                  <div className="row">
                  <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">GST_IN</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" onChange={(e)=>setGST_IN(e.target.value)} value={GST_IN}/>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">RC</label>
                        <div className="col-sm-9">
                        <Form.Control type="text" onChange={(e)=>setRC(e.target.value)} value={RC}/>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                      <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">HSC</label>
                        <div className="col-sm-9">
                        <Form.Control type="text"  onChange={(e)=>setHSC(e.target.value)} value={HSC}/>
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6">
                    <Form.Group className="row">
                        <label className="col-sm-3 col-form-label">Year of Establishment</label>
                        <div className="col-sm-9">
                        <DatePicker className="form-control w-100"
                          selected={YOE}
                          onChange={()=> handleChange}
                        />
                        </div>
                      </Form.Group>
                    </div>
                    <div className="col-md-6 m-auto">
                    <Form.Group>
                    <label>Company Logo</label>
                    <div className="custom-file">
                      <Form.Control type="file" className="form-control visibility-hidden" id="customFileLang" lang="en" onChange={(e)=>setLogo(e.target.files[0])}  />
                      <label className="custom-file-label" htmlFor="customFileLang">Upload image</label>
                    </div>
                  </Form.Group>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary mr-2">Submit</button>
                  <button type="reset" className="btn btn-light">Reset</button>
                </form>
              </div>
            </div>
          </div>
        </div>
    )
}

export default AddCompany
