import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import DatePicker from "react-datepicker";
import bsCustomFileInput from 'bs-custom-file-input';
import { venodrAxios } from '../../../axios';
import { useHistory } from 'react-router';
import { getCompanydetails } from '../../Helpers/HelperFunction';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { makeStyles, useTheme } from '@material-ui/core/styles';
  import Input from '@material-ui/core/Input';
  import InputLabel from '@material-ui/core/InputLabel';
  import MenuItem from '@material-ui/core/MenuItem';
  import FormControl from '@material-ui/core/FormControl';
  import Select from '@material-ui/core/Select';
  import Chip from '@material-ui/core/Chip';

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
}



function AddCompany() {

    const [name, setname] = useState('');
    const [Website, setWebsite] = useState('');
    const [Email, setEmail] = useState('');
    const [Country, setCountry] = useState('');
    const [Pincode, setPincode] = useState('');
    const [NOE, setNOE] = useState('');
    const [NOC, setNOC] = useState('');
    const [GST_IN, setGST_IN] = useState('');
    const [RC, setRC] = useState('');
    const [YOE, setYOE] = useState('');
    const [HSC, setHSC] = useState('');
    const [Logo, setLogo] = useState('');
    const [Countries, setCountries] = useState([]);
    const history = useHistory()
    const classes = useStyles()
    const theme = useTheme()
    const [personName, setPersonName] = React.useState([]);
    const [cityC, setcityC] = useState("")
    const [Branches, setBranches] = useState([])
    const [HeadOffice, setHeadOffice] = useState("")
    const [FullAddress, setFullAddress] = useState("")


    useEffect(() => {
        getCompanydetails().then((response) => {
            if (response) {
                history.push('/vendor/company');
            }
        })
    }, [])





    const handleChanges = (event) => {
        const options = event.target.value;
        setBranches(options);
      };


    const handleChange = date => {
        const year = new Date(date);
        // const year = new Date(d).getFullYear()
        console.log(year);
        setYOE(year)
    };

    useEffect(() => {
        bsCustomFileInput.init()
        setYOE(new Date())
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            name: name,
            website: Website,
            email: Email,
            country: Country,
            pincode: Pincode,
            number_of_employee: NOE,
            number_of_customers: NOC,
            GST_IN: GST_IN,
            RC: RC,
            HSC: HSC,
            YOE: YOE,
            logo: Logo,
            head_office:HeadOffice,
            branches:Branches,
            full_address: FullAddress,
        }
        console.log(data);
        const fileData = new FormData();
        fileData.append('file', Logo);
        fileData.append('rc',RC)


        venodrAxios.post('/company/create', data).then((result) => {
            if (result.status == 201) {
                console.log(result)
                const config = { headers: { 'Content-Type': 'multipart//form-data' } };
                fileData.append('id', result.data.data.id)
                venodrAxios.post('/company/handlelogo', fileData, config).then((res) => {
                    if (res) {
                        history.push('/vendor/company')
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


    const newFunction = (e) =>{
        setname(e.target.value);

    }



    const HandleCountry = (e) =>{
       const data = JSON.parse(e)
       setCountry(data.name)
       setcityC(data.alpha2Code)
    }

    useEffect(() => {

       if (cityC) {

        const options = {
            method: 'GET',
            url: 'https://spott.p.rapidapi.com/places/autocomplete',
            params: {country: cityC, type: 'CITY'},
            headers: {
              'x-rapidapi-key': '4c867d69ccmsh0bdd9cea6e20c70p15487cjsn0dd816841b19',
              'x-rapidapi-host': 'spott.p.rapidapi.com'
            }
          };

          axios.request(options).then(function (response) {
              setCities(response.data);
          }).catch(function (error) {
              console.error(error);
          });
        }
    }, [cityC])




    return (
        <div className="row">
            <div className="col-12 grid-margin">
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-title">Add Company Details</h4>
                        <form className="form-sample" onSubmit={(e) => handleSubmit(e)}>
                            {/* <p className="card-description"> Personal info </p> */}
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">Company Name</label>
                                        <div className="col-sm-9">
                                            <Form.Control type="text" onChange={(e) => setname(e.target.value)} value={name} />
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">Website</label>
                                        <div className="col-sm-9">
                                            <Form.Control type="text" onChange={(e) => setWebsite(e.target.value)} value={Website} />
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">Email</label>
                                        <div className="col-sm-9">
                                            <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} value={Email} />
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">Country</label>
                                        <div className="col-sm-9">
                                            <select className="form-control" onChange={(e) => setCountry(e.target.value)} >
                                                     <option value="Nepal"> Nepal</option>
                                                     <option value="India"> India</option>
                                                        <option value="China"> China</option>
                                                        <option value="Japan"> Japan</option>
                                                        <option value="USA"> USA</option>
                                                        <option value="UK"> UK</option>
                                                        <option value="France"> France</option>
                                                        <option value="Germany"> Germany</option>
                                                        <option value="Italy"> Italy</option>
                                                        <option value="Spain"> Spain</option>
                                                        <option value="Canada"> Canada</option>
                                                        <option value="Australia"> Australia</option>
                                                        <option value="Brazil"> Brazil</option>
                                                        <option value="Argentina"> Argentina</option>
                                            </select>
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">Head Office</label>
                                        <div className="col-sm-9">
                                        <Form.Control type="text" onChange={(e) => setHeadOffice(e.target.value)} value={HeadOffice} />
                                        </div>
                                    </Form.Group>
                                    </div>
                                    <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">Full Address</label>
                                        <div className="col-sm-9">
                                            <Form.Control type="text" onChange={(e) => setFullAddress(e.target.value)} value={FullAddress} />
                                        </div>
                                    </Form.Group>
                                </div>

                            </div>
                            {/* <p className="card-description"> Address </p> */}
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                <label className="col-sm-3 col-form-label">Branch Office</label>
                                <div className="col-sm-9">
                                <FormControl className="w-100">
                                <Form.Control type="text" onChange={(e) => setBranches(e.target.value)} value={Branches} />

      </FormControl>
      </div>
                                </div>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">Pin Code</label>
                                        <div className="col-sm-9">
                                            <Form.Control type="text" onChange={(e) => setPincode(e.target.value)} value={Pincode} />
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">Number of employess</label>
                                        <div className="col-sm-9">
                                        <select className="form-control" onChange={(e) => setNOE(e.target.value)} >
                                                   <option value="Undisclosed">Undisclosed</option>
                                                   <option value="Freelancer">Freelancer</option>
                                                   <option value="2-9">2-9</option>
                                                   <option value="10-49">10-49</option>
                                                   <option value="50-249">50-249</option>
                                                   <option value="250-999">250-999</option>
                                                   <option value="1000+">1000+</option>
                                            </select>
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">Number of Customers</label>
                                        <div className="col-sm-9">
                                        <select className="form-control" onChange={(e) => setNOC(e.target.value)} >
                                                   <option value="Undisclosed">Undisclosed</option>
                                                   <option value="2-9">1-25</option>
                                                   <option value="10-49">25-50</option>
                                                   <option value="50-249">50-100</option>
                                                   <option value="250-999">100-250</option>
                                                   <option value="1000+">250+</option>
                                            </select>
                                        </div>
                                    </Form.Group>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">GST_IN</label>
                                        <div className="col-sm-9">
                                            <Form.Control type="text" onChange={(e) => setGST_IN(e.target.value)} value={GST_IN} />
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">RC</label>
                                        <div className="col-sm-9">
                                            <Form.Control type="text" onChange={(e) => setRC(e.target.value)} value={RC} />
                                        </div>
                                    </Form.Group>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-md-6">
                                <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">HSC</label>
                                        <div className="col-sm-9">
                                            <Form.Control type="text" onChange={(e) => setHSC(e.target.value)} value={HSC} />
                                        </div>
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="row">
                                        <label className="col-sm-3 col-form-label">Year of Establishment</label>
                                        <div className="col-sm-9">
                                            <DatePicker className="form-control w-100"
                                                dateFormat="y"
                                                dateFormatCalendar="y"
                                                selected={YOE}
                                                onChange={(e) => handleChange(e)}
                                            />
                                        </div>
                                    </Form.Group>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-md-6 m-auto">
                                    <Form.Group>
                                        <label>Company Logo</label>
                                        <div className="custom-file">
                                            <Form.Control type="file" className="form-control visibility-hidden" id="customFileLang" lang="en" onChange={(e) => setLogo(e.target.files[0])} />
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
