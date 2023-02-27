import { Card, Typography } from "@mui/material";
import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setData } from "../store/stock-actions";




const FirmCard = ({ item, handleEdit}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [editVisible, setEditVisible] = useState(false);

  const handleDelete = (id) => {
    dispatch(setData('delete', 'firm', id, navigate, '/stock/firms'))
  }

  const cardStyles = {
    p: 2,
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    backgroundColor: "#348888",
    color: "white",
    m: 2,
    position: 'relative',
    background: editVisible && 'rgba(0,0,0,0.2)'
  }

  return (
    <Card sx={ cardStyles }
      onMouseOver={ () => setEditVisible(true) }
      onMouseOut={ () => setEditVisible(false) }
    >
      <Typography sx={ {color:"#1C2331"} }>Name </Typography>
      <Typography component="p" variant="h6"> { item.name}</Typography>
      <Typography sx={ {color:"#1C2331"} }>Phone Number </Typography>
      <Typography component="p" variant="h6"> { item.phone}</Typography>
      <Typography sx={ {color:"#1C2331"} }>Address </Typography>
      <Typography component="p" variant="h6"> { item.address }</Typography>
      
      <>
        { editVisible && (
          <Typography component="p" variant="h6" sx={ {
            position: 'absolute', top: '50%', right: '50%',
            transform: 'translate(-50%, -50%)'
          } }>
            <EditIcon onClick={ () => handleEdit(item) } sx={ { cursor: 'pointer', color: 'orange' } } />
            <DeleteOutlineIcon onClick={ () => handleDelete(item.id) } sx={ { cursor: 'pointer', color: 'red' } } />
          </Typography>
        ) }

      </>
   </Card>
  )
}

export default FirmCard