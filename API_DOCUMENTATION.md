# Order API Documentation

This API provides CRUD operations for managing orders with MongoDB Atlas.

## Setup

1. Create a `.env.local` file in the root directory with the following content:

```
MONGODB_URI=mongodb+srv://e-commerce:Dharmik%400137@cluster0.ry74mmc.mongodb.net/?appName=Cluster0
```

**Important:** If your password contains special characters like `@`, they must be URL encoded:
- `@` should be encoded as `%40`
- `#` should be encoded as `%23`
- etc.

## API Endpoints

Base URL: `/api/order`

### 1. Create Order (POST)

**Endpoint:** `POST /api/order`

**Request Body:**
```json
{
  "name": "John Doe",
  "number": "1234567890",
  "address": "123 Main Street",
  "landmark": "Near Park",
  "state": "California",
  "pincode": "12345",
  "city": "Los Angeles",
  "productDetails": [
    {
      "name": "Product 1",
      "quantity": 2,
      "price": 50.00,
      "productId": "prod123"
    }
  ],
  "price": 100.00,
  "shipping": 10.00
}
```

**Response:** `201 Created`
```json
{
  "_id": "order_id",
  "name": "John Doe",
  "number": "1234567890",
  "address": "123 Main Street",
  "landmark": "Near Park",
  "state": "California",
  "pincode": "12345",
  "city": "Los Angeles",
  "productDetails": [...],
  "price": 100.00,
  "shipping": 10.00,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 2. Get All Orders (GET)

**Endpoint:** `GET /api/order`

**Query Parameters:**
- `startDate` (optional): Filter orders from this date (format: YYYY-MM-DD)
- `endDate` (optional): Filter orders until this date (format: YYYY-MM-DD)
- `id` (optional): Get a specific order by ID

**Examples:**
- Get all orders: `GET /api/order`
- Get orders from a date range: `GET /api/order?startDate=2024-01-01&endDate=2024-01-31`
- Get a specific order: `GET /api/order?id=order_id`

**Response:** `200 OK`
```json
[
  {
    "_id": "order_id",
    "name": "John Doe",
    ...
  }
]
```

### 3. Get Single Order (GET)

**Endpoint:** `GET /api/order?id=order_id`

**Response:** `200 OK`
```json
{
  "_id": "order_id",
  "name": "John Doe",
  ...
}
```

### 4. Update Order (PUT)

**Endpoint:** `PUT /api/order?id=order_id`

**Request Body:** (all fields are optional)
```json
{
  "name": "Jane Doe",
  "price": 150.00,
  "shipping": 15.00
}
```

**Response:** `200 OK`
```json
{
  "_id": "order_id",
  "name": "Jane Doe",
  ...
}
```

### 5. Delete Order (DELETE)

**Endpoint:** `DELETE /api/order?id=order_id`

**Response:** `200 OK`
```json
{
  "message": "Order deleted successfully"
}
```

## Error Responses

All endpoints may return the following error responses:

- `400 Bad Request`: Invalid input or missing required fields
- `404 Not Found`: Order not found
- `500 Internal Server Error`: Server error

Example error response:
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

## Testing with cURL

### Create Order
```bash
curl -X POST http://localhost:3000/api/order \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "number": "1234567890",
    "address": "123 Main Street",
    "landmark": "Near Park",
    "state": "California",
    "pincode": "12345",
    "city": "Los Angeles",
    "productDetails": [{"name": "Product 1", "quantity": 2, "price": 50.00}],
    "price": 100.00,
    "shipping": 10.00
  }'
```

### Get All Orders
```bash
curl http://localhost:3000/api/order
```

### Get Orders with Date Filter
```bash
curl "http://localhost:3000/api/order?startDate=2024-01-01&endDate=2024-01-31"
```

### Update Order
```bash
curl -X PUT "http://localhost:3000/api/order?id=order_id" \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "price": 150.00}'
```

### Delete Order
```bash
curl -X DELETE "http://localhost:3000/api/order?id=order_id"
```


