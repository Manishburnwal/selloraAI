import { Worker } from "bullmq";
import redis from "../../../../shared/redis/redis.js"
import transporter from "./mail.js";

const emailWorker = new Worker("email-queue",
    async (job)=>{
        if(job.name === "payment-success"){
            const {customerName, customerEmail, partnerEmail, productTitle, amount} = job.data

            await transporter.sendMail({
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

            await transporter.sendMail({
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
        }

        if(job.name === "partner-payment"){
            const { partnerName, partnerEmail, amount, paymentId, adminEmail } = job.data
            await transporter.sendMail({
                from:{ name:"SelloraAI", address:process.env.USER_EMAIL! },
                to:partnerEmail,
                subject:`Payout Sent: ₹${amount.toFixed(2)} - SelloraAI`,
                html: `
                <h2>Payment Sent 🎉</h2>
                <p>Hello ${partnerName},</p>
                <p>Your partner payout has been successfully processed.</p>
                <p><strong>Amount:</strong> ₹${Number(amount).toFixed(2)}</p>
                <p><strong>Payment ID:</strong> ${paymentId}</p>
                <h3>Payment Details</h3>
                <p>Your payment has been sent to your registered bank account or UPI. It should arrive within 24 hours.</p>
                <p>If you do not receive the payment within 24 hours, please contact our admin team at:</p>
                <p><strong>Email:</strong></p>
                <a href="mailto:${adminEmail}">${adminEmail}</a>
                <p>Thank you for being a partner with SelloraAI!</p>
                `
            })
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