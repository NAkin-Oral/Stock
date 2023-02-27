import { Button, Typography, Modal, TextField, FormControl, Box } from "@mui/material";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setData } from '../store/stock-actions';

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

const ModalBrand = ({ open, handleClose, initialValues, brandEdit, setBrandEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBrandEdit({ ...brandEdit, [name]: value })
  }

  const submitHandler = (e) => { 
    e.preventDefault()
    if (brandEdit.id) {
      dispatch(setData('put', 'brand', brandEdit, navigate, '/stock/brands'));
    } else { 
      dispatch(setData('post', 'brand', brandEdit, navigate, '/stock/brands'));  
    }
    setBrandEdit(initialValues);
    handleClose()
  }
  return (
    <Modal open={ open } onClose={ handleClose }>
      <Box sx={ style }>
        <Box sx={ { display: 'flex', flexDirection: 'column', gap: 4 } } component="form" onSubmit={ submitHandler }>

       
          <FormControl>
            <TextField
              label="Brand Name" name="name" id="name" variant="outlined" value={ brandEdit.name }
              type="text"
              required onChange={ handleChange }
            />
          </FormControl>

          <FormControl>
            <TextField
              label="Image Url" name="image" id="image" variant="outlined" value={ brandEdit.image }
              type="text"
               onChange={ handleChange }
            />
          </FormControl>

          <Button type="submit" variant="contained" size="large">
            { brandEdit.id ? "Update Brand" : "Add New Brand" }
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalBrand