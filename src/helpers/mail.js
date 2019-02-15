import nodemailer from "nodemailer"
import sgTransport from "nodemailer-sendgrid-transport"

const { MAIL_API_KEY, FRONTEND_URL, MAIL_FROM_ADDRESS } = process.env

export const mailer = nodemailer.createTransport(
  sgTransport({
    auth: {
      api_key: MAIL_API_KEY
    }
  })
)

export const makeCustomerOrderEmail = orderId => `
  <div className="email" style="
    padding: 20px;
    font-family: sans-serif;
    line-heigh: 2;
    font-size: 20px
  ">
    <h3>Great news - your token is being minted!</h3>
    <ul>
      <li>Order number: ${orderId}</li>
      <li>Check on it's progress <a href="${FRONTEND_URL}/order?id=${orderId}">here</a></li>
    </ul>
    <p>If you are having any trouble please reply to this email.</p>
    
    <h4>What happens now?</h4>
    <p>After we have successfully processed your payment, your token will be created and published to the Ethereum blockchain. Please be patient as this may take between 5 - 15 minutes depending on how busy the network is.</p>

    <h4>New to blockchain? What to know more?</h4>
    <p>MintMyToken was created by <a href="https://broadhaven.tech">broadhaven</a>. Broadhaven helps businesses understand, benefit from, and build on blockchain.</p>

    <p>If you would like to know more, please <a href="mailto:hi@broadhaven.tech">email us</a>.</p>
  </div>
`

export const makeAdminOrderEmail = orderId => `
  <div className="email" style="
    padding: 20px;
    font-family: sans-serif;
    line-heigh: 2;
    font-size: 20px
  ">
    <a href="${FRONTEND_URL}/order?id=${orderId}">View details</a></li>
  </div>
`
