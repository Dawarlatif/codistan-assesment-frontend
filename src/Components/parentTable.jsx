import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Button } from '@mui/material';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import axios from 'axios';
import ChildTable from './childTable';


const ParentTable = () => {
   const [ParentData, setParentData] = useState([]);
   const [childData, setChildData] = useState([]);

   const [showChildTable, setShowChildTable] = useState(false);
   const [currentParentId, setCurrentParentId] = useState(null);
   const [currentTotalAmount, setCurrentTotalAmount] = useState(null);
   const [sender, setSender] = useState('');
   const [reciever, setReciever] = useState('');

   const handleDetails = (parentId, totalAmount, sender, receiver) => {
      setCurrentParentId(parentId);
      setCurrentTotalAmount(totalAmount);
      setShowChildTable(true);
      setSender(sender);
      setReciever(receiver);

      axios.get(`http://localhost:8000/parent/find/${parentId}`)
         .then(res => {
            setChildData(res.data);
            // console.log(childData);

         })
         .catch(error => {
            console.error(error);
         });
   }

   useEffect(() => {
      axios.get('http://localhost:8000/parent/find')
         .then(res => {
            setParentData(res.data);
            // console.log(ParentData);
         })
         .catch(error => {
            console.error(error);
         });
   }, []);


   return (
      <div style={{ padding: '100px' }}>
         <Typography style={{ fontsize: '36px', fontWeight: 'bold', margin: '24px' }}>Parent Component</Typography>

         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell>Id </TableCell>
                     <TableCell align="right">sender</TableCell>
                     <TableCell align="right">reciever</TableCell>
                     <TableCell align="right">total amount</TableCell>
                     <TableCell align="right"></TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {ParentData.map((row) => (
                     <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{row.id}</TableCell>
                        <TableCell align="right">{row.sender}</TableCell>
                        <TableCell align="right">{row.receiver}</TableCell>
                        <TableCell align="right">{row.totalAmount}</TableCell>
                        <TableCell align="right">{<Button variant="contained" endIcon={<ManageAccountsIcon />}
                           onClick={() => handleDetails(row.id, row.totalAmount, row.sender, row.receiver)}
                        >
                           Details
                        </Button>}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>


         {showChildTable && (
            <ChildTable
               parentId={currentParentId}
               totalAmount={currentTotalAmount}
               childData={childData}
               sender={sender}
               reciever={reciever}
            />
         )}
      </div>
   )
}

export default ParentTable