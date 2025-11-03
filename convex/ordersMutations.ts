import { mutation } from './_generated/server';
import { v } from 'convex/values';

// Mutation for database operations (has access to ctx.db)
export const createOrderMutation = mutation({
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
    // Create the order in the database
    const orderId = await ctx.db.insert('orders', {
      ...args,
      status: 'confirmed',
      timestamp: Date.now(),
    });

    console.log('Order created in database:', orderId);
    return orderId;
  },
});