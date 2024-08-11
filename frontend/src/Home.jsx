import React from 'react'
import {Box, Stack} from "@chakra-ui/react" 
import Card from './Card'
import axios from "axios";
//import Razorpay from "razorpay";

const Home = () => {
    const checkoutHandler=async(amount)=>{
        const {data:{key}} = await axios.get("https://razorpay-integration-backend.onrender.com/api/getKey");
        const {data:{order}}  = await axios.post("https://razorpay-integration-backend.onrender.com/api/checkout", {amount})

        const options = {
            key: key, // Enter the Key ID generated from the Dashboard
            amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "NeonNest",
            description: "Test Transaction",
            image: "https://avatars.githubusercontent.com/u/137366329?s=400&u=47dcdc75c3b7b56eca556f5c6431b5a1e936f0cc&v=4",
            order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            callback_url: "https://razorpay-integration-backend.onrender.com/api/paymentverification",
            prefill: {
                "name": "Ram Prasad",
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            },
            theme: {
                "color": "#3399cc"
            }
        };
        const razor = new window.Razorpay(options); //here we have to use window.Razorpay
        razor.open();
         

        console.log(order);
    }
  return (
     <Box>
        <Stack h={"100vh"} alignItems="Center" justifyContent="Center" direction={["column", "row"]}>
            <Card amount={5000} img={"https://images.unsplash.com/photo-1533246860975-b290a87773d3?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} checkoutHandler={checkoutHandler}/>
            <Card amount={20000} img={"https://images.unsplash.com/photo-1663354027456-ce6a7e07d212?q=80&w=250&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} checkoutHandler={checkoutHandler}/>
            <Card amount={2000} img={"https://images.unsplash.com/photo-1579811216948-6f57c19376a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBwbGUlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D"} checkoutHandler={checkoutHandler}/>
            <Card amount={10000} img={"https://images.unsplash.com/photo-1652721367098-0ecad4cc0370?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFwcGxlJTIwcGhvbmV8ZW58MHx8MHx8fDA%3D"} checkoutHandler={checkoutHandler}/>

        </Stack>
     </Box>
  )
}

export default Home
