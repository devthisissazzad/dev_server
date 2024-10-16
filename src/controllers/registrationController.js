import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"

async function registrationController(req, res) {
	const { name, email, password } = req.body

	const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

	if (!regex.test(email)) {
		res.status(200).send({ success: false, error: "Invalid email address" })
		return
	}

	const userExist = await userModel.findOne({ email })

	if (userExist) {
		res.status(200).send({ success: false, error: "An account with same email already exists" })
		return
	}

	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_KEY,
		},
	})

	bcrypt.hash(password, 5, async (err, hashedPass) => {
		const user = new userModel({
			name,
			email,
			password: hashedPass,
		})

		try {
			const verificationString = `${email}?verified`
			const verificationUrl = `http://localhost:3000/verify-email?${verificationString}`

			await user.save()

			const mailOptions = {
				from: process.env.EMAIL_USER,
				to: email,
				subject: "Email Verification",
				html: `<div style= "font-family: sans-serif; font-size: 19px"><span style="margin-bottom: 20px">Hello</span><p style="margin-bottom: 20px">Please click on the button below to verify your account.</p><a href="${verificationUrl}" target="_blank"><button style="padding: 10px 15px; background-color: #737373;color: white;font-size: 16px; border-style: none; cursor: pointer;">Verify</button></a></div>`,
			}
			await transporter.sendMail(mailOptions)
			res.status(200).send({ success: true, message: "Registration Successfull!" })
		} catch (error) {
			res.status(200).send({ success: false, error })
		}
	})
}

async function emailVerification(req,res){
    const {email} = req.body
    const userExist = await userModel.findOne({ email })
    if (!userExist){
        res.status(200).send({ success: false, error: "Invalid Link" })
		return
    }

    try {
        await userModel.findOneAndUpdate({email},{emailVerified: true}, {new:true})
        res.status(200).send({ success: true, message: "Email verified" })
    } catch (error) {
        res.status(200).send({ success: false, error })
    }
}

export {registrationController, emailVerification}
