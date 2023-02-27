import { useState } from 'react';
import { Box, Button, Modal, TextField, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { setData } from '../store/stock-actions';
import { useDispatch } from 'react-redux';

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


const ModalFirm = ({ open, handleClose, firmEdit, setFirmEdit, initialValues}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (firmEdit.id) {
      dispatch(setData('put', 'firm', firmEdit, navigate, '/stock/firms'))
    } else { 
      dispatch(setData('post', 'firm', firmEdit, navigate, '/stock/firms'))
    }
    setFirmEdit(initialValues);
    handleClose();
  }


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFirmEdit({ ...firmEdit, [name]: value })
    
  }
  return (
    <Modal open={ open } onClose={ handleClose }>
      <Box sx={ style }>
        <Box sx={ { display: 'flex', flexDirection: 'column', gap: 4 } } component="form" onSubmit={ submitHandler }>

          <FormControl>
            <TextField
              label="Firm Name" name="name" id="name" variant="outlined" value={ firmEdit.name }
              type="text"
              required onChange={ handleChange }
            />
          </FormControl>

          <FormControl>
            <TextField
              label="Phone" name="phone" id="phone" variant="outlined" value={ firmEdit.phone }
              type="text"
              required onChange={ handleChange }
            />
          </FormControl>

          <FormControl>
            <TextField
              label="Address" name="address" id="address" variant="outlined" value={ firmEdit.address }
              type="text"
              required onChange={ handleChange }
            />
          </FormControl>

          <Button type="submit" variant="contained" size="large">
            
            { firmEdit.id? "Update Firm": "Add New Firm"}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalFirm