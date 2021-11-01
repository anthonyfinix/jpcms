import React from 'react';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import classes from './createCompanyDialog.module.scss';
import handleCreateCompany from '../redux/middlewares/handleCreateCompany';
import { connect } from 'react-redux';
const CreateCompanyDialog = (props) => {
    const [companyName, setCompanyName] = React.useState("");
    const [companyPassword, setCompanyPassword] = React.useState("");
    const handleCompanyNameChange = (e) => {
        let value = e.currentTarget.value;
        setCompanyName(value);
    }
    const handleCompanyPasswordChange = (e) => {
        let value = e.currentTarget.value;
        setCompanyPassword(value)
    }
    return (
        <>
            <div className={`${classes.main_wrapper}`}>
                <Card variant="outlined" className={`${classes.card_wrapper} p-md`}>
                    <Typography variant="h5">Create Company</Typography>
                    <Typography variant="subtitle">Create a new company to start cataloging</Typography>
                    <TextField value={companyName} onChange={handleCompanyNameChange} label="Companies Name" variant="outlined" size="small" />
                    <TextField value={companyPassword} onChange={handleCompanyPasswordChange} label="Companies Password" type="password" variant="outlined" size="small" />
                    <div className={`${classes.action_wrapper}`}>
                        <Button onClick={props.goBack} >Back</Button>
                        <Button variant="contained" onClick={() => props.handleCreateCompany({ name: companyName, password: companyPassword })}>Create</Button>
                    </div>
                </Card>
            </div>
        </>
    )
}
const mapDispatchToProps = {
    handleCreateCompany
}
export default connect(null, mapDispatchToProps)(CreateCompanyDialog);