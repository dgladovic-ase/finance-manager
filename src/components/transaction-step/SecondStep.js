import { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Autocomplete } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import categories from '../../_mock/categories';
import subcategories from '../../_mock/subcategories';


const StartStep = ({ setTransactionContent, error, persistentContent }) => {

  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const fulldate = `${year}-${month}-${day}`;

  const handleDateChange = (date) => {
    const formDate = new Date(date.$d);
    const day = formDate.getDate();
    const month = formDate.getMonth() + 1;
    const year = formDate.getFullYear();
    setDate(`${year}-${month}-${day}`);

    setForm((prevFormData) => ({
      ...prevFormData,
      date: `${year}-${month}-${day}`
    }));

    return `${year}-${month}-${day}`;
  };

  const [categoryForm, setFormCategory] = useState([]);
  const [subCategoryForm, setFormSubcategory] = useState([]);
  const [amount, setAmount] = useState([]);
  const [customLabels, setCustomLabels] = useState([]);
  const [date, setDate] = useState('');

  const formData = {
    amount: [],
    category: '',
    date: '',
    // label: ''
  }

  const [form, setForm] = useState({
    amount: [],
    category: '',
    subcategory: '',
    date: fulldate
  });

  useEffect(() => {
    const modif = {
      ...persistentContent
    }
    if(modif.amount || modif.category || modif.date){
      setForm(persistentContent);
    }
  }, []);

  useEffect(() => {
    if(form.category === ''){
      setSelectedSubcategory('aa','');
      console.log('amoro-2')
    }
    setTransactionContent(form);
    console.log(form, 'amoro');
  }, [form]);

  useEffect(() => {

  }, [error]);

  const dateRef = useRef();
  const amountRef = useRef();
  const formRef = useRef();

  // podaci za autocomplete

  const categoriesList = categories;

  const subcategoriesList = subcategories;

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [filteredSubcategory, setFilteredSubcategory] = useState('');

  const handleCategoryChange = (event, newValue) => {
    if(!newValue){
      setForm((prevFormData) => ({
        ...prevFormData,
        subcategory: ''
      }));
    }
    getfilteredSubcategories(newValue);
    setSelectedCategory(() => (newValue));
    setForm((prevFormData) => ({
      ...prevFormData,
      category: newValue ? newValue.id : ''
    }));
    setSelectedSubcategory('');
  };

  const handleSubcategoryChange = (event, newValue) => {
    setSelectedSubcategory(() => (newValue));
    setForm((prevFormData) => ({
      ...prevFormData,
      subcategory: newValue ? newValue.id : ''
    }));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setForm((prevFormData) => ({
      ...prevFormData,
      amount: value
    }));
  }

  const getfilteredSubcategories = (category) => {
    if(!category){
      return setFilteredSubcategory('');
    }
    return setFilteredSubcategory(subcategoriesList.filter(subcategory => subcategory.parent_id === category.id));
  }

  return (
    <div>
      <form id='myForm'>
        <TextField
          ref={amountRef}
          label="Amount"
          fullWidth
          variant="outlined"
          // onChange={(e) => {
          //   setAmount(e.target.value);
          //   const obj = {...formData, amount: e.target.value}
          //   setForm(obj);
          //   handleData(obj);
          // }}
          onChange={handleAmountChange}
          margin="normal"
          error={error.amount}
          helperText={error.amount && "Amount is required"}
        />

        <FormControl fullWidth variant="outlined" margin="normal">
          <Autocomplete
            options={categoriesList}
            getOptionLabel={(category) => category.name !== undefined ? category.name : ''}
            value={selectedCategory}
            // onChange={(event,value)=>{
            //   console.log(value,'opa2san')
            //   getfilteredSubcategories(value);
            //   handleCategoryChange(event,value);
            //   setFormCategory(value);
            //   const obj = {...formData, category: value.id}
            //   setForm(obj);
            //   handleData(obj);
            // }}
            onChange={handleCategoryChange}
            renderInput={(params) => <TextField {...params} label="Category" variant="outlined" error={error.category}
            helperText={error.category && "Category is required"}/>}
          />
        </FormControl>
        {selectedCategory && (
          <FormControl fullWidth variant="outlined" margin="normal" style={{ marginBottom: '12px' }}>
            <Autocomplete
              options={filteredSubcategory}
              getOptionLabel={(subcategory) => subcategory.name !== undefined ? subcategory.name : ''}
              value={selectedSubcategory}
              // onChange={(event,value)=>{
              //   console.log(value,'opa3san')
              //   handleSubcategoryChange(event,value);
              //   setFormCategory(value);
              //   const obj = {...formData, category: value.id}
              //   setForm(obj);
              //   handleData(obj);
              // }}
              onChange={handleSubcategoryChange}
              renderInput={(params) => <TextField {...params} label="Subcategory" variant="outlined" />}
            />
          </FormControl>
        )}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{marginTop:'15px', marginBottom:'6px', width: '100%'}}
            name="date_of_birth"
            label="Transaction Date"
            ref={dateRef}
            onFocus={() => dateRef.current.focus()}
            onChange={(e) => handleDateChange(e)}
            // onChange={(e) => {
            //   const tex = handleDateChange(e);
            //   const obj = {...formData, date: tex}
            //   setForm(obj);
            //   handleData(obj);
            // }}
            // value={dateOfBirth}
            defaultValue={dayjs(today)}
            required
          />
        </LocalizationProvider>

        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel>Custom Label</InputLabel>
          <Select>
            {customLabels.map((label) => (
              <MenuItem key={label.id} value={label.id}>
                {label.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    </div>
  );
};

export default StartStep;