import { useState, useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox, Dialog, DialogContent } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import axios from 'axios';
import CircularWithValueLabel from '../../../components/CircularProgress';
import AuthContext, { AuthProvider } from '../../../context/AuthProvider';
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {

  const { setAuth } = useContext(AuthContext);

  const userRef = useRef();
  const submitRef = useRef();
  const errRef = useRef();

  const [user,setUser] = useState('');
  const [pwd,setPwd] = useState('');
  const [errMsg,setErrMsg] = useState('');
  const [success,setSuccess] = useState(false);

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

  useEffect(()=>{
    setErrMsg('');
  },[user,pwd]);

  const [showPassword, setShowPassword] = useState(false);

  const liveUrl = process.env.REACT_APP_BACKEND_URL;
  
  const loginUrl = `${liveUrl}/login`;

  const handleFlag = (e) =>{
    if(e === 100){
      submitRef.current.click();
    }
  }

  const handleSubmit = async (e) => {
    console.log(loginUrl);
    e.preventDefault();
    try{
      const response = await axios.post(loginUrl, {
        email: user, 
        password: pwd
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
      </Stack>
      </form>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <Dialog open={open} onClose={handleClose} style={{display: 'flex', flexDirection:'column', justifyContent:'space-evenly'}}>
        <DialogContent>
          <div style={{ display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center', height: '300px', width:'300px' }}>
            <CircularWithValueLabel flag={handleFlag}/>
            <div style={{marginTop: '20px'}}>Getting things ready!</div>
            <div style={{marginTop: '20px'}}>If you are not logged in click the button again.</div>
          </div>
        <LoadingButton fullWidth size="large" ref={submitRef} type="submit" variant="contained" form="myForm">
          Login
        </LoadingButton>
        </DialogContent>
      </Dialog>
        <LoadingButton fullWidth size="large"  onClick={handleOpen} variant="contained" form="myForm">
          Login
        </LoadingButton>
    </>
  );
}
