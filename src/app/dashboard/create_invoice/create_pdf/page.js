"use client";
import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import MyDocument from '../invoice_pdf/page';

export default function fun1(){

           ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);
           
return(
    <>
 
</>
)
    }