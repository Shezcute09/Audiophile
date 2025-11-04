## 1. GitHub Repository Structure 

```
audiophile-ecommerce/
├── README.md
├── package.json
├── next.config.js
├── .env.example
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── ConvexClientProvider.tsx
│   ├── cart/
│   │   └── page.tsx
│   ├── checkout/
│   │   └── page.tsx
│   └── order-confirmation/
│       └── page.tsx
├── components/
│   └── Layout.tsx
├── context/
│   └── CartContext.tsx
├── convex/
│   ├── schema.ts
│   ├── orders.ts
│   └── _generated/
├── lib/
│   └── products.ts
├── emails/
│   └── order-confirmation.html
└── public/
    └── images/
```

# Audiophile E-commerce

A modern audio equipment e-commerce site built with Next.js 14, Convex, and Resend.

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Convex account
- Resend account

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Shezcute09/Audiophile
cd audiophile-ecommerce
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Configure environment variables in `.env.local`:
```env
NEXT_PUBLIC_CONVEX_URL=your_convex_deployment_url
CONVEX_DEPLOY_KEY=your_convex_deploy_key
RESEND_API_KEY=your_resend_api_key
```

5. Set up Convex:
```bash
npx convex dev
```

6. Run the development server:
```bash
npm run dev
```

## Deployment

### Netlify Deployment

1. Build command: `npm run build`
2. Publish directory: `.next`

### Required Environment Variables on Netlify:
- `NEXT_PUBLIC_CONVEX_URL`
- `CONVEX_DEPLOY_KEY` 
- `RESEND_API_KEY`
```

## 3. Environment Variables Template (.env.example)

```env
NEXT_PUBLIC_CONVEX_URL=
CONVEX_DEPLOY_KEY=
RESEND_API_KEY=
```

## 4. Next.js Configuration (next.config.js)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    images: {
        domains: ['localhost'],
    },
}

module.exports = nextConfig
```

## 5. Order Confirmation Email Template (emails/order-confirmation.html)

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <style>
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px;
        }
        .header { 
            background: #000; 
            color: white; 
            padding: 20px; 
            text-align: center; 
        }
        .order-details { 
            background: #f9f9f9; 
            padding: 20px; 
            margin: 20px 0; 
            border-radius: 5px;
        }
        .product-item { 
            border-bottom: 1px solid #ddd; 
            padding: 10px 0; 
        }
        .total { 
            font-weight: bold; 
            font-size: 1.2em; 
            border-top: 2px solid #000; 
            padding-top: 10px;
        }
        .footer { 
            text-align: center; 
            margin-top: 30px; 
            color: #666; 
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Audiophile</h1>
        <p>Order Confirmation</p>
    </div>

    <h2>Thank you for your order!</h2>
    <p>Hi {{customerName}}, your order has been confirmed and is being processed.</p>

    <div class="order-details">
        <h3>Order #{{orderId}}</h3>
        <p><strong>Order Date:</strong> {{orderDate}}</p>
        
        <h4>Items Ordered:</h4>
        {{#each items}}
        <div class="product-item">
            <strong>{{this.name}}</strong><br>
            Quantity: {{this.quantity}} × ${{this.price}}<br>
            Total: ${{this.total}}
        </div>
        {{/each}}
        
        <div class="total">
            <p>Grand Total: ${{grandTotal}}</p>
        </div>
    </div>

    <div class="shipping-info">
        <h3>Shipping Address</h3>
        <p>{{customerName}}<br>
        {{address}}<br>
        {{city}}, {{postcode}}<br>
        {{country}}</p>
    </div>

    <div class="footer">
        <p>If you have any questions, contact us at support@audiophile.com</p>
        <p>&copy; 2024 Audiophile. All rights reserved.</p>
    </div>
</body>
</html>
```

