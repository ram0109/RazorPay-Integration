import {instance} from "../server.js"
import crypto from "crypto";
import {Payment} from "../models/paymentModel.js"
export  const checkout = async (req, res)=>{
    const options = {
        amount: Number(req.body.amount * 100),  // amount in the smallest currency unit
        currency: "INR",
      };
      const order = await instance.orders.create(options);
      
      res.status(200).json({
        success:true,
        order,
      });
    };

    
export  const paymentVerification = async (req, res)=>{
    console.log(req.body);  
    const {razorpay_order_id, razorpay_payment_id, razorpay_signature} =req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    var expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET)
              .update(body.toString())
              .digest('hex');
        console.log("sig received", razorpay_signature);
        console.log("sig generated", expectedSignature);

        const isAuthentic = expectedSignature === razorpay_signature;
        if(isAuthentic)
        {
            // Database comes here
            await Payment.create({
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature
            })

            res.redirect (`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`)
        }
        else
        {
          res.status(400).json({
            success:false,
          });
        }

        // var response = {"signatureIsValid":"false"}
        // if(expectedSignature === req.body.response.razorpay_signature)
        // response = {"signatureIsValid": "true"}
        //       res.send(response);

    


   
  };