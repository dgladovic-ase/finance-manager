import {useEffect, useState }from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { useNavigate } from 'react-router-dom';
import AuthContext, { useAuth } from '../../context/AuthProvider';
import StartStep from './SecondStep';
import ZeroStep from './StartStep';
import StandardTransaction from '../StandardTransaction';
import LastStep from './ThirdStep';
import categories from '../../_mock/categories';


const steps = [
  'Choose transaction type',
  'Fill transaction info',
  'Summary',
];

const templates = [
  { id: '1', name: 'Template 1' },
  { id: '2', name: 'Template 2' },
];

const defaultTemp = { id: '3', name: 'Template 3' };

const categoriesList = categories;

const subcategories = [
  { id: '101', name: 'Fruits', parentId: '100' },
  { id: '102', name: 'Vegetables', parentId: '100' },
  { id: '103', name: 'Grains', parentId: '100' },
  { id: '201', name: 'Car', parentId: '200' },
  { id: '202', name: 'Bus', parentId: '200' },
  { id: '203', name: 'Bike', parentId: '200' },
  { id: '301', name: 'Apartment', parentId: '300' },
  { id: '302', name: 'House', parentId: '300' },
  { id: '303', name: 'Condo', parentId: '300' }
];

export default function TransactionStep() {
  
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [template, setTemplate] = useState([]);
  const [content, setContent] = useState({
    amount: [],
    category: '',
    subcategory: '',
    date: ''
  });
  const [errorContent, setErrorContent] = useState(false);
  const [persistentContent, setPersistentContent] = useState(null);
  const [contMeta, setContMeta] = useState({id: '',name:''});
  const [contMetaSub, setContMetaSub] = useState({id:'',name:''});

  const liveUrl = process.env.REACT_APP_BACKEND_URL;
  const userId = auth.id;

  useEffect(()=>{
    let catName = [];
    catName = content?.category.length > 1 ? categoriesList.filter((cat) => cat.id === content.category)[0] : [{name:`---`}];
    setContMeta(catName);
  },[content.category]);

  useEffect(()=>{
    let catName = [];
    catName = content?.subcategory.length > 1 ? subcategories.filter((cat) => cat.id === content.subcategory)[0] : [{name:`---`}];
    setContMetaSub(catName);
  },[content.subcategory]);

  const setTemplateContext = (data) =>{
    setTemplate(data);
  }

  const setTransactionContent = (data) =>{
    setContent(data);
  }

  const handleNext = () => {
    if(activeStep === 1){ // proverava da li je popunjena forma
      setPersistentContent(content);
      const amountBool = content.amount.length < 1 ? 1 : false;
      console.log(amountBool,content.category,'TEST!-raw');
      console.log(!amountBool,!content.category,'TEST!-raw-if');

      if(amountBool || !content.category){
        setErrorContent({
          amount: amountBool,
          category: !content.category,
        });
        return;
      }

      // const keyz = Object.values(content);
      // let validation;
      // let number = 100;
      // const valid = keyz.forEach((e,i)=>{
      //   console.log(e.length,'testiram-stvari');
      //   if(e.length < 2){
      //     validation = false;
      //     number = i;
      //     return false;
      //   }
      //   return true;  
      // });
      // if(keyz.length === 0 || !validation){
      //   console.log('testiram-nikako',number); // ovo radi
      //   setErrorContent(number);
      //   // potrebno je da se setuje error bool to moze u state
      // }
      //   console.log(keyz,'testiram');
      //   console.log(validation,'testiram2');
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if(activeStep === 2){
      setContent(persistentContent);
    }
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    console.log('SENT-PAYLOAD', persistentContent);
    const payload = { ...persistentContent, user_id:userId };
    axios.post(`${liveUrl}/transactions`, payload).then(
      (e) => {
        console.log('Saved successfully!');
        navigate('/dashboard/scan');
        // setFetching(false);
      }
    ).catch((error) => {
      if (error.response && error.response.status === 400) {
        console.log(error);
        // setError(error);
        // handleOpenErrorModal();
      }
    });
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection:'column' }}>
      <Stepper activeStep={activeStep} alternativeLabel >
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel StepIconProps={{ style: { color: '#00af78' } }}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {steps.map((label, index) => (
        <div key={label} style={{ display: index === activeStep ? 'block' : 'none' }}>
          <Card variant="outlined" sx={{ width: '90%', maxWidth:'450px', margin:'auto', marginTop:'40px', marginBottom:'40px' }}>
            <CardContent style={{paddingTop:'10px'}}>
                <StandardTransaction template={template} content={content} />
                {activeStep === 0 && <ZeroStep templates={templates} setTemplateContext={setTemplateContext}/> }
                {activeStep === 1 && <StartStep setTransactionContent={setTransactionContent} error={errorContent} persistentContent={persistentContent}/>}
                {activeStep === 2 && <LastStep persistentContent={persistentContent}/>}
            </CardContent>
            <CardActions sx={{ justifyContent: 'space-around', marginBottom:'20px' }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mr: 2, color:'black' }}>
                  Back
                </Button>
                // kad se stisne back obrisu se sve vrednosti iz forme to treba da se resi
              )}
              {activeStep !== steps.length - 1 && (
                <Button onClick={handleNext} variant="contained" style={{backgroundColor: '#00af78'}}>
                  Next
                </Button>
              )}
              {activeStep === steps.length - 1 && (
                <Button onClick={handleSubmit} variant="contained" style={{backgroundColor: '#00af78'}}>
                  Submit
                </Button>
              )}
            </CardActions>
          </Card>
        </div>
      ))}
    </Box>
  );
}
