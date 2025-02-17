import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Dialog, DialogContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
// components
import axios from 'axios';
import CircularWithValueLabel from '../../../components/CircularProgress';
import AuthContext, { AuthProvider } from '../../../context/AuthProvider';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function RegisterForm() {

  const { setAuth } = useContext(AuthContext);
  
  const userRef = useRef();
  const errRef = useRef();
  const submitRef = useRef(); 

  const handleDateChange = (date) => {
    const formDate = new Date(date.$d);
    const day = formDate.getDate();
    const month = formDate.getMonth() + 1;
    const year = formDate.getFullYear();
    setDate(`${year}-${month}-${day}`);
  };

  const [user,setUser] = useState('');
  const [pwd,setPwd] = useState('');
  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [dateOfBirth,setDate] = useState('');

  const [errMsg,setErrMsg] = useState('');
  const [success,setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(()=>{
    setErrMsg(''); 
  },[user,pwd]);

  const [showPassword, setShowPassword] = useState(false);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleFlag = (e) =>{
    if(e === 100){
      submitRef.current.click();
    }
  }

  const liveUrl = process.env.REACT_APP_BACKEND_URL;
  
  const registerUrl = `${liveUrl}/register`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user,pwd,firstName,lastName,dateOfBirth);
    if(dateOfBirth.length < 5){
      const formDate = new Date();
      const day = formDate.getDate();
      const month = formDate.getMonth() + 1;
      const year = formDate.getFullYear();
      setDate(`${year}-${month}-${day}`);
    }
    try{
      const response = await axios.post(registerUrl, {
        email: user, 
        password: pwd,
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth
      });
      console.log(JSON.stringify(response?.data));
      setAuth({user, pwd, id: response?.data.id})
      setUser('');
      setPwd('');
      setSuccess(true);
      navigate('/dashboard', { replace: true });
    }
    catch(err){
    console.log('greska',err);
      if(!err?.response){
        setErrMsg('No Server Response');
      }

    }

  };

  return (
    <>
    

        <form onSubmit={handleSubmit} id="myForm">
      <Stack spacing={3}>

        <TextField 
          name="first_name" 
          label="First Name" 
          ref={userRef}
          onChange={(e)=> setFirstName(e.target.value)}
          value = {firstName}
          required
        />

        <TextField 
          name="last_name" 
          label="Last Name" 
          ref={userRef}
          onChange={(e)=> setLastName(e.target.value)}
          value = {lastName}
          required
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
            name="date_of_birth"
            label="Date of Birth"
            ref={userRef}
            onChange={(e) => handleDateChange(e)}
            // value={dateOfBirth}
            required
            />
        </LocalizationProvider>

        <TextField 
          name="email" 
          label="Email address" 
          ref={userRef}
          onChange={(e)=> setUser(e.target.value)}
          value = {user}
          required
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          ref={userRef}
          onChange={(e)=> setPwd(e.target.value)}
          value = {pwd}
          required
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

<Dialog open={open} onClose={handleClose} style={{display: 'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
        <DialogContent>
          <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center', height: '300px', width:'300px' }}>
            <CircularWithValueLabel flag={handleFlag}/>
            <div style={{marginTop: '20px'}}>Getting things ready!</div>
            <div style={{marginTop: '20px'}}>If you are not logged in click the button again.</div>
          </div>
          <LoadingButton fullWidth size="large" ref={submitRef} type="submit" variant="contained" form="myForm">
        Register
      </LoadingButton>
        </DialogContent>
      </Dialog>

      <LoadingButton fullWidth size="large" onClick={handleOpen} type="submit" variant="contained" form="myForm">
        Register
      </LoadingButton>

      </Stack>

      </form>

      {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack> */}


    </>
  );
}
