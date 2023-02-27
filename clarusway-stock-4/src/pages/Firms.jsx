import React, { useState, useEffect } from 'react';
import { Button, Grid, Stack, Typography, Box } from "@mui/material";
import ModalFirm from '../components/ModalFirm';
import { useDispatch, useSelector } from 'react-redux';
import { getData } from '../store/stock-actions';
import FirmCard from '../components/FirmCard';

const initialValues = {
  "name": "",
  "phone": "", 
"address":""
}
 
const Firms = () => {
  const dispatch = useDispatch();
  const [firmEdit, setFirmEdit] = useState(initialValues)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const firms = useSelector(state => state.stock.firms);

  useEffect(() => {
    dispatch(getData('firm'))
  }, [dispatch])



  const handleEdit = (data) => {
    setFirmEdit(data);
    handleOpen();
  }
  return (

    <Box sx={ { flexGrow: 1, margin: 3 } }>
      <Typography component="h1" variant="h5" color="inherit" noWrap sx={ { p: 2, pt: "2px" } } >
        Firms
      </Typography>
      <Stack direction="row" spacing={ 2 }>
        <Button color="warning" variant="contained" sx={ { backgroundColor: "darkslategray", mb: 1 } }
          onClick={ handleOpen }
        >
          New Firm
        </Button>
      </Stack>

      <Grid container spacing={ 1 }>
        { firms?.map(item => (
          <Grid item xs={ 12 } md={ 3 } lg={ 4 } key={ item.id }>
            <FirmCard item={ item } handleEdit={ handleEdit } />
          </Grid>
        )) }
      </Grid>
      <ModalFirm open={ open } handleClose={ handleClose } initialValues={ initialValues }
        firmEdit={ firmEdit } setFirmEdit={ setFirmEdit } />
    </Box>


  )
}

export default Firms