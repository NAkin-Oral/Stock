
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, Grid, Stack, Typography
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getData, setData } from '../store/stock-actions';
import { useEffect, useState } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModalCategory from '../components/ModalCategory';


const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector(state => state.stock.categories);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => { 
    dispatch(getData('category'))
  }, [])


  const handleDelete = (id) => {
    dispatch(setData('delete', 'category', id, navigate, '/stock/categories'))
  }
  return (
    <>
      <Grid item xs={ 12 } sx={ { p: 2, display: 'flex', flexDirection: 'column' } }>
        <Typography component="h1" variant="h5" color="inherit" noWrap sx={ { p: 2, pt: "2px" } } >
          Categories
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="warning" variant="contained" sx={ { backgroundColor: "darkslategray", mb: 1 } }
            onClick={ handleOpen}
          >
            New Category
          </Button>
        </Stack>

        <TableContainer sx={ { width: '60%', margin: '30px auto', alignItems: 'center' } } component={Paper }>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Number of Products</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { categories.map(row => (
                <TableRow key={ row.id } sx={ { "&:last-child td, &:last-child th": {border: 0} } }>
                  <TableCell component="th" > { row.id}</TableCell>
                  <TableCell align="center"> { row.name}</TableCell>
                  <TableCell align="center"> { row.product_count }</TableCell>
                  <TableCell>
                    <DeleteOutlineIcon sx={ { cursor: 'pointer', color: 'red' } } onClick={ ()=> handleDelete(row.id)} />
                  </TableCell>
                </TableRow>

              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Grid>


      <ModalCategory open={ open } handleClose={handleClose } />
    
    </>

  )
}

export default Categories