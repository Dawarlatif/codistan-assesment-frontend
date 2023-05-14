import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import axios from 'axios';





const ChildTable = ({ totalAmount, childData, sender, reciever }) => {
   console.log(childData);
   const [totalAmountPaid, setTotalAmountPaid] = useState(0);



   useEffect(() => {
      const sumPaidAmount = childData.reduce((total, obj) => total + obj.paidAmount, 0);

      setTotalAmountPaid(sumPaidAmount)

   }, [childData]);


   return (
      <div style={{ padding: '100px' }}>
         <Typography style={{ fontsize: '36px', fontWeight: 'bold', margin: '24px' }}>child Component</Typography>

         <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
               <TableHead>
                  <TableRow>
                     <TableCell>Child Id </TableCell>
                     <TableCell>Parent Id </TableCell>
                     <TableCell align="right">sender</TableCell>
                     <TableCell align="right">reciever</TableCell>
                     <TableCell align="right">total amount</TableCell>
                     <TableCell align="right">Installment amount</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {childData.map((row) => (
                     <TableRow
                        key={row.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                     >
                        <TableCell component="th" scope="row">
                           {row.id}
                        </TableCell>
                        <TableCell component="th" scope="row">
                           {row.parentId}
                        </TableCell>
                        <TableCell align="right">{sender}</TableCell>
                        <TableCell align="right">{reciever}</TableCell>
                        <TableCell align="right">{totalAmount}</TableCell>
                        <TableCell align="right">{row.paidAmount}</TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
         <Typography style={{ fontsize: "24px", fontWeight: 'bold', margin: '20px' }}>Total&nbsp;paid:&nbsp; {totalAmountPaid}</Typography>
      </div>
   )
}

export default ChildTable