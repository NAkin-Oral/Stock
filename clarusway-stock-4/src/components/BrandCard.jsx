import React, { useState} from 'react';
import { Card, CardHeader, CardMedia, Typography, } from "@mui/material";

import cw from '../assets/cw.jpeg';

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setData } from '../store/stock-actions';

const BrandCard = ({ item, handleEdit }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editVisible, setEditVisible] = useState(false);

  const handleDelete = (id) => { 
    dispatch(setData('delete', 'brand', id, navigate, '/stock/brands'))
  }

  return (
 
    <Card sx={ {
      p: 2,
      display: "flex",
      flexDirection: "column",
      flexWrap: "nowrap",
      minWidth: 300,
      maxWidth: 300,
      minHeight: 400,
      maxHeight: 400,
      position: 'relative'
    } }
      onMouseOver={ () => setEditVisible(true) }
      onMouseOut={ ()=> setEditVisible(false)}
    >
      <CardHeader title={ item.name }> </CardHeader>
      <CardMedia component="img" height="325" width="250" sx={ { padding: 2, objectFit: "cover" } }
        image={ item.image !== null ? item.image : cw } alt={ item.name } title={ item.name}/>

      <>
        { editVisible && (
          <Typography component="p" variant="h6" sx={ { position: 'absolute', top: '10px', right: '10px'} }>
            <EditIcon onClick={ () => handleEdit(item) } sx={ { cursor: 'pointer', color: 'orange' } } />
            <DeleteOutlineIcon onClick={ () => handleDelete(item.id) } sx={ { cursor: 'pointer', color: 'red' } } />
          </Typography>
          
      )}

      </>

    </Card>
  )
}

export default BrandCard