"use client";

import React, { useState, useEffect, Suspense } from "react";

import PaymentEditPage from "./component/PaymentEdit";

export default function PaymentEditMain() {
  return(
    <Suspense>
<PaymentEditPage/>
</Suspense>
  
  );
}