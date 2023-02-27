import React, { useState, useEffect } from 'react';
import { Button, Grid, Stack, Typography, Box } from "@mui/material";
import ModalBrand from '../components/ModalBrand';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../store/stock-actions';
import BrandCard from '../components/BrandCard';
const initialValues = {
  "name": "",
  "image": ""
}
const Brands = () => {
  const dispatch = useDispatch();
  const [brandEdit, setBrandEdit] = useState(initialValues)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const brands = useSelector(state => state.stock.brands);

  useEffect(() => {
    dispatch(getData('brand'))
  }, [dispatch])



  const handleEdit = (data) => { 
    setBrandEdit(data);
    handleOpen();
  }
  return (

    <Box sx={{flexGrow:1, margin:3} }>
      <Typography component="h1" variant="h5" color="inherit" noWrap sx={ { p: 2, pt: "2px" } } >
        Brands
      </Typography>
       <Stack direction="row" spacing={2}>
          <Button color="warning" variant="contained" sx={ { backgroundColor: "darkslategray", mb: 1 } }
            onClick={ handleOpen}
          >
            New Brand
          </Button>
        </Stack>
      
      <Grid container spacing={1}>
        { brands?.map(item => (
          <Grid item xs={ 12 } md={ 3 } lg={ 4 } key={ item.id }>
            <BrandCard item={ item } handleEdit={ handleEdit} />
          </Grid>
        ))}
      </Grid>
      <ModalBrand open={ open } handleClose={ handleClose } initialValues={ initialValues }
        brandEdit={ brandEdit } setBrandEdit={ setBrandEdit}/>
    </Box>


  )
}

export default Brands