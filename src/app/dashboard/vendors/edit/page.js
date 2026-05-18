"use client";

import React, { Suspense, useEffect, useState } from "react";
import VendorEdit from "./component/VendorEdit";

export default function VendorEditMain() {
  return(
    <Suspense>
    <VendorEdit/>
    </Suspense>
  );
}