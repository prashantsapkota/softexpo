import React from 'react'
import Switch from '@material-ui/core/Switch';

function Menubar() {
    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <div>
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="card">
                        <h5 className="card-header">App Settings / Menubar</h5>
                        <div className="card-body">
                            <div className="row">
                            <div className="col-md-6">
                            <span className="d-flex align-items-center">
                        <h5 className="mx-3">Show search button?</h5>
                        <Switch
                            checked={state.checkedA}
                            onChange={handleChange}
                            name="checkedA"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                        </span>
                        </div>
                        <div className="col-md-6">
                        <h5 className="">Navigation Links</h5>
                        <span className="d-flex justify-content-between">
                            <p>For Vendors</p>
                            <p>http://localhost</p>
                            <div>
                                <button>Delete</button>
                                <button>Edit</button>
                            </div>
                        </span>
                        </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menubar
