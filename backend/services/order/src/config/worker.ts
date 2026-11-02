import { Worker } from "bullmq";
import redis from "../../../../shared/redis/redis.js"
import transporter from "./mail.js";

const emailWorker = new Worker("email-queue",
    async (job)=>{
        if(job.name === "payment-success"){
            const {customerName, customerEmail, partnerEmail, productTitle, amount} = job.data

            const customerMail = await transporter.sendMail({
                from:{ name:"SelloraAI", address:process.env.USER_EMAIL! },
                to:customerEmail,
                subject:`Payment Successful - ${productTitle}`,
                html: `
                <h2>Payment Successful 🎉</h2>
                <p>Hello ${customerName},</p>
                <p>Your payment was successful.</p>
                <p><strong>Product:</strong> ${productTitle}</p>
                <p><strong>Amount:</strong> ₹${amount}</p>
                <p>Thank you for purchasing from SelloraAI!</p>
                `
            })
            console.log("Customer mail response:",customerMail.messageId)


            const partnerMail = await transporter.sendMail({
                from:{ name:"SelloraAI", address:process.env.USER_EMAIL! },
                to:partnerEmail,
                subject:`New Sale: ₹${Number(amount).toFixed(2)} - ${productTitle}`,
                html: `
                <h2>New Sale 🎉</h2>
                <p>Hello Partner,</p>
                <p>You have received a new order on SelloraAI.</p>
                <p><strong>Product:</strong> ${productTitle}</p>
                <p><strong>Amount:</strong> ₹${amount}</p>
                <h3>Customer Details</h3>
                <p><strong>Name:</strong> ${customerName}</p>
                <p><strong>Email:</strong> ${customerEmail}</p>
                <p>Thank you for being a partner with SelloraAI!</p>
                `
            })
            console.log("Partner mail response:",partnerMail.messageId)
        }

        if(job.name === "partner-payment"){

        }
    },
    {
        connection:redis
    }
)

emailWorker.on("completed",(job)=>{
    console.log("Email sent:",job.id)
})

emailWorker.on("failed",(job,error)=>{
    console.log("Email failed:",error)
})