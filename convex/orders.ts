

"use node";
import { action } from './_generated/server';
import { internal } from './_generated/api';
import { v } from 'convex/values';

// Action for external API calls (email sending)
export const createOrder: ReturnType<typeof action> = action({
  args: {
    customerDetails: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
      address: v.string(),
      city: v.string(),
      postcode: v.string(),
      country: v.string(),
      paymentMethod: v.string(),
    }),
    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),
    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      vat: v.number(),
      grandTotal: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    // First, create the order in the database using the mutation
    const orderId = await ctx.runMutation((internal as any).ordersMutations.createOrderMutation, {
      customerDetails: args.customerDetails,
      items: args.items,
      totals: args.totals,
    });

    // Send confirmation email using Resend
    try {
      const emailHtml = generateOrderEmail(
        args.customerDetails,
        args.items,
        args.totals,
        orderId
      );

      console.log('Attempting to send email to:', args.customerDetails.email);
      console.log('Resend API Key exists:', !!process.env.RESEND_API_KEY);

      const emailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: 'onboarding@resend.dev', // Use Resend's test domain
          to: [args.customerDetails.email], // Or use ['delivered@resend.dev'] for testing
          subject: `Order Confirmation #${orderId} - Audiophile`,
          html: emailHtml,
          reply_to: 'support@audiophile.com',
        }),
      });

      const responseData = await emailResponse.json();
      console.log('Resend API Response:', {
        status: emailResponse.status,
        statusText: emailResponse.statusText,
        data: responseData
      });

      if (!emailResponse.ok) {
        throw new Error(`Resend API error: ${JSON.stringify(responseData)}`);
      }

      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Email sending failed:', error);
      // Don't throw error - we still want to complete the order even if email fails
    }

    return orderId;
  },
});

function generateOrderEmail(
  customerDetails: any,
  items: any[],
  totals: any,
  orderId: any
): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            padding: 20px;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          
          .header {
            background: #000000;
            color: #ffffff;
            padding: 30px 20px;
            text-align: center;
          }
          
          .header h1 {
            font-size: 28px;
            margin-bottom: 10px;
          }
          
          .content {
            padding: 30px;
          }
          
          .order-number {
            background: #f8f8f8;
            padding: 15px;
            border-radius: 5px;
            margin-bottom: 25px;
            text-align: center;
          }
          
          .order-number h2 {
            color: #d87d4a;
            font-size: 20px;
          }
          
          .greeting {
            margin-bottom: 25px;
          }
          
          .section {
            margin-bottom: 25px;
          }
          
          .section-title {
            color: #d87d4a;
            font-size: 18px;
            margin-bottom: 15px;
            border-bottom: 2px solid #f1f1f1;
            padding-bottom: 8px;
          }
          
          .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
          }
          
          .items-table th {
            background: #f8f8f8;
            text-align: left;
            padding: 12px;
            font-weight: bold;
          }
          
          .items-table td {
            padding: 12px;
            border-bottom: 1px solid #f1f1f1;
          }
          
          .totals {
            background: #f8f8f8;
            padding: 20px;
            border-radius: 5px;
          }
          
          .total-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }
          
          .grand-total {
            font-weight: bold;
            font-size: 18px;
            color: #d87d4a;
            border-top: 2px solid #ddd;
            padding-top: 10px;
            margin-top: 10px;
          }
          
          .shipping-address {
            background: #f8f8f8;
            padding: 20px;
            border-radius: 5px;
            margin-top: 20px;
          }
          
          .footer {
            background: #2a2a2a;
            color: #ffffff;
            padding: 25px;
            text-align: center;
          }
          
          .footer a {
            color: #d87d4a;
            text-decoration: none;
          }
          
          .cta-button {
            display: inline-block;
            background: #d87d4a;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            font-weight: bold;
            margin: 20px 0;
          }
          
          @media (max-width: 600px) {
            .content {
              padding: 20px;
            }
            
            .items-table {
              font-size: 14px;
            }
            
            .header h1 {
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h1>Thank you for your order!</h1>
            <p>Your Audiophile journey begins here</p>
          </div>
          
          <!-- Content -->
          <div class="content">
            <!-- Order Number -->
            <div class="order-number">
              <h2>Order #${orderId}</h2>
              <p>Placed on ${new Date().toLocaleDateString()}</p>
            </div>
            
            <!-- Greeting -->
            <div class="greeting">
              <p>Dear <strong>${customerDetails.name}</strong>,</p>
              <p>Thank you for choosing Audiophile! Your order has been confirmed and is being processed. We'll notify you when it ships.</p>
            </div>
            
            <!-- Order Summary -->
            <div class="section">
              <h3 class="section-title">Order Summary</h3>
              <table class="items-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  ${items.map(item => `
                    <tr>
                      <td>${item.name}</td>
                      <td>${item.quantity}</td>
                      <td>$${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
              
              <div class="totals">
                <div class="total-row">
                  <span>Subtotal:</span>
                  <span>$${totals.subtotal.toFixed(2)}</span>
                </div>
                <div class="total-row">
                  <span>Shipping:</span>
                  <span>$${totals.shipping.toFixed(2)}</span>
                </div>
                <div class="total-row">
                  <span>VAT (20%):</span>
                  <span>$${totals.vat.toFixed(2)}</span>
                </div>
                <div class="total-row grand-total">
                  <span>Grand Total:</span>
                  <span>$${totals.grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <!-- Shipping Information -->
            <div class="section">
              <h3 class="section-title">Shipping Address</h3>
              <div class="shipping-address">
                <p><strong>${customerDetails.name}</strong></p>
                <p>${customerDetails.address}</p>
                <p>${customerDetails.city}, ${customerDetails.postcode}</p>
                <p>${customerDetails.country}</p>
                <p>📞 ${customerDetails.phone}</p>
              </div>
            </div>
            
            <!-- Payment Method -->
            <div class="section">
              <h3 class="section-title">Payment Method</h3>
              <p>${customerDetails.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Credit Card'}</p>
            </div>
            
            <!-- CTA Button -->
            <div style="text-align: center; margin: 30px 0;">
              <a href="#" class="cta-button">View Your Order</a>
            </div>
            
            <!-- Support Info -->
            <div class="section">
              <p><strong>Need help with your order?</strong></p>
              <p>Contact our customer support team at <a href="mailto:support@audiophile.com">support@audiophile.com</a> or call us at +1 (555) 123-4567.</p>
            </div>
          </div>
          
          <!-- Footer -->
          <div class="footer">
            <p><strong>Audiophile</strong></p>
            <p>Your premier destination for high-quality audio gear</p>
            <p>123 Audio Street, Sound City, SC 12345</p>
            <p>
              <a href="#">Website</a> | 
              <a href="#">Contact</a> | 
              <a href="#">Support</a>
            </p>
            <p style="margin-top: 20px; font-size: 12px; color: #999;">
              © 2024 Audiophile. All rights reserved.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}