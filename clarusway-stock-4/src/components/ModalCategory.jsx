import { useState } from 'react';
import { Box, Button, Modal, TextField, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setData } from '../store/stock-actions';

const initialValues = {
"name": ""
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const ModalCategory = ({ open, handleClose }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const [categoryInfo, setCategoryInfo] = useState(initialValues);

  const submitHandler = (e) => { 
    e.preventDefault();
    dispatch(setData('post', 'category', categoryInfo, navigate, '/stock/categories'))
    setCategoryInfo(initialValues);
    handleClose();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoryInfo({ ...categoryInfo, [name]: value })
  }

  return (
    <Modal open={ open } onClose={ handleClose }>
      <Box sx={ style }>
        <Box sx={ { display: 'flex', flexDirection: 'column', gap: 4 } } component="form" onSubmit={ submitHandler }>

          <FormControl>
            <TextField
              label="Category Name" name="name" id="name" variant="outlined" value={ categoryInfo.name }
              type="text" 
              required onChange={ handleChange }
            />
          </FormControl>


          <Button type="submit" variant="contained" size="large"> Add New Category</Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalCategory