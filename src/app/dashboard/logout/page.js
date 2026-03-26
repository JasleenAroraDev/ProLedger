'use client';
import react,{useEffect} from 'react';
import { useRouter } from 'next/navigation';

export default function page(){

    const router = useRouter();

    useEffect(()=>{
        const logoutExecute = ()=>{
            localStorage.removeItem("Token");
            router.push("/signin");
        }
        logoutExecute();
    },[])
};

