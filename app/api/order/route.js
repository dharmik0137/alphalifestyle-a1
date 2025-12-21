import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET - View orders with optional date filtering
export async function GET(request) {
  try {
    const db = await getDatabase();
    const collection = db.collection('orders');

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const orderId = searchParams.get('id');

    // If specific order ID is requested
    if (orderId) {
      if (!ObjectId.isValid(orderId)) {
        return NextResponse.json(
          { error: 'Invalid order ID format' },
          { status: 400 }
        );
      }

      const order = await collection.findOne({ _id: new ObjectId(orderId) });
      
      if (!order) {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(order, { status: 200 });
    }

    // Build query for date filtering
    const query = {};
    
    if (startDate || endDate) {
      query.createdAt = {};
      
      if (startDate) {
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        query.createdAt.$gte = start;
      }
      
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.createdAt.$lte = end;
      }
    }

    const orders = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Ensure we always return JSON, even if there's an error
    return NextResponse.json(
      { 
        error: 'Failed to fetch orders', 
        details: error?.message || 'Unknown error occurred',
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}

// POST - Create a new order
export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate required fields
    const requiredFields = [
      'name',
      'number',
      'address',
      'state',
      'pincode',
      'city',
      'size',
      'productDetails',
      'price',
    ];

    for (const field of requiredFields) {
      if (!body[field] && body[field] !== 0) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate shipping (can be 0 for free shipping)
    if (body.shipping === undefined || body.shipping === null) {
      return NextResponse.json(
        { error: 'Missing required field: shipping' },
        { status: 400 }
      );
    }

    // Validate productDetails is an array
    if (!Array.isArray(body.productDetails) || body.productDetails.length === 0) {
      return NextResponse.json(
        { error: 'productDetails must be a non-empty array' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection('orders');

    // Generate sequential numeric orderId starting from 1000
    const counters = db.collection('counters');

    let orderNumber;

    // Try to increment existing counter with upsert
    try {
      const counterResult = await counters.findOneAndUpdate(
        { _id: 'orderId' },
        { $inc: { seq: 1 } },
        { upsert: true, returnDocument: 'after' }
      );

      if (counterResult && counterResult.value) {
        orderNumber = counterResult.value.seq;
        // If this was a new document (seq would be 1), set it to 1000
        if (orderNumber === 1) {
          await counters.updateOne(
            { _id: 'orderId' },
            { $set: { seq: 1000 } }
          );
          orderNumber = 1000;
        }
      } else {
        // If counter doesn't exist, create it with initial value 1000
        await counters.insertOne({ _id: 'orderId', seq: 1000 });
        orderNumber = 1000;
      }
    } catch (error) {
      // If insert fails due to duplicate key (race condition), try to increment again
      if (error.code === 11000 || error.message?.includes('duplicate key')) {
        const counterResult = await counters.findOneAndUpdate(
          { _id: 'orderId' },
          { $inc: { seq: 1 } },
          { returnDocument: 'after' }
        );
        if (counterResult && counterResult.value) {
          orderNumber = counterResult.value.seq;
        } else {
          // Fallback: get current value and increment
          const existing = await counters.findOne({ _id: 'orderId' });
          if (existing) {
            orderNumber = existing.seq + 1;
            await counters.updateOne(
              { _id: 'orderId' },
              { $set: { seq: orderNumber } }
            );
          } else {
            orderNumber = 1000;
            await counters.insertOne({ _id: 'orderId', seq: 1000 });
          }
        }
      } else {
        throw error;
      }
    }

    const newOrder = {
      ...body,
      orderId: orderNumber, // Sequential order ID (1000, 1001, 1002, ...)
      orderNumber, // Keep for backward compatibility
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await collection.insertOne(newOrder);

    const createdOrder = await collection.findOne({ _id: result.insertedId });

    return NextResponse.json(createdOrder, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    console.error('Error stack:', error?.stack);
    // Ensure we always return JSON, even if there's an error
    return NextResponse.json(
      { 
        error: 'Failed to create order', 
        details: error?.message || 'Unknown error occurred',
        message: error?.message || 'Unknown error occurred',
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}

// PUT - Update an existing order
export async function PUT(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(orderId)) {
      return NextResponse.json(
        { error: 'Invalid order ID format' },
        { status: 400 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Check if order exists
    const db = await getDatabase();
    const collection = db.collection('orders');

    const existingOrder = await collection.findOne({ _id: new ObjectId(orderId) });

    if (!existingOrder) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Update order
    const updateData = {
      ...body,
      updatedAt: new Date(),
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    await collection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: updateData }
    );

    const updatedOrder = await collection.findOne({ _id: new ObjectId(orderId) });

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update order', 
        details: error?.message || 'Unknown error occurred',
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}

// DELETE - Delete an order
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('id');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(orderId)) {
      return NextResponse.json(
        { error: 'Invalid order ID format' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection('orders');

    const result = await collection.deleteOne({ _id: new ObjectId(orderId) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Order deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { 
        error: 'Failed to delete order', 
        details: error?.message || 'Unknown error occurred',
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined
      },
      { status: 500 }
    );
  }
}

