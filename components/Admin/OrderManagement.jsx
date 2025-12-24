'use client';

import { useState, useEffect } from 'react';
import { X, Edit2, Trash2, Download, Calendar, Loader2 } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateFilterType, setDateFilterType] = useState('single'); // 'single' or 'range'
  const [deletingOrderId, setDeletingOrderId] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterOrders();
  }, [orders, startDate, endDate, dateFilterType]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/order');
      const data = await response.json();

      if (response.ok) {
        setOrders(data);
        setFilteredOrders(data);
      } else {
        setError(data.error || 'Failed to fetch orders');
      }
    } catch (err) {
      setError('Failed to fetch orders: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const filterOrders = () => {
    let filtered = [...orders];

    if (dateFilterType === 'single' && startDate) {
      const selectedDate = new Date(startDate);
      selectedDate.setHours(0, 0, 0, 0);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);

      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= selectedDate && orderDate < nextDay;
      });
    } else if (dateFilterType === 'range' && startDate && endDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= start && orderDate <= end;
      });
    }

    setFilteredOrders(filtered);
  };

  const handleDelete = async (orderId) => {
    if (!confirm('Are you sure you want to delete this order?')) {
      return;
    }

    setDeletingOrderId(orderId);
    try {
      const response = await fetch(`/api/order?id=${orderId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchOrders(); // Refresh orders
      } else {
        const data = await response.json();
        alert('Failed to delete order: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Failed to delete order: ' + err.message);
    } finally {
      setDeletingOrderId(null);
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order._id);
    setEditFormData({
      name: order.name,
      number: order.number,
      address: order.address,
      landmark: order.landmark,
      state: order.state,
      pincode: order.pincode,
      city: order.city,
      price: order.price,
      shipping: order.shipping,
    });
  };

  const handleUpdate = async (orderId) => {
    setUpdatingOrderId(orderId);
    try {
      const response = await fetch(`/api/order?id=${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editFormData),
      });

      if (response.ok) {
        setEditingOrder(null);
        fetchOrders(); // Refresh orders
      } else {
        const data = await response.json();
        alert('Failed to update order: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      alert('Failed to update order: ' + err.message);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingOrder(null);
    setEditFormData({});
  };

  const handleExportExcel = () => {
    if (filteredOrders.length === 0) {
      alert('No orders to export');
      return;
    }

    setIsExporting(true);
    try {
      // Prepare data for Excel
      const excelData = filteredOrders.map((order) => ({
        'Order ID': order._id,
        'Date': new Date(order.createdAt).toLocaleDateString(),
        'Time': new Date(order.createdAt).toLocaleTimeString(),
        'Name': order.name,
        'Mobile': order.number,
        'Address': order.address,
        'Landmark': order.landmark,
        'City': order.city,
        'State': order.state,
        'PIN Code': order.pincode,
        'Size': order.size || 'N/A',
        'Product Name': order.productDetails?.[0]?.name || 'N/A',
        'Quantity': order.productDetails?.[0]?.quantity || 0,
        'Product Price': order.productDetails?.[0]?.price || 0,
        'Total Price': order.price,
        'Shipping': order.shipping,
        'Grand Total': (order.price + Number(order.shipping)).toFixed(2),
      }));

      // Create workbook and worksheet
      const ws = XLSX.utils.json_to_sheet(excelData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Orders');

      // Generate filename with date range
      let filename = 'orders';
      if (dateFilterType === 'single' && startDate) {
        filename += `_${startDate}`;
      } else if (dateFilterType === 'range' && startDate && endDate) {
        filename += `_${startDate}_to_${endDate}`;
      } else {
        filename += '_all';
      }
      filename += '.xlsx';

      // Download
      XLSX.writeFile(wb, filename);
    } catch (err) {
      alert('Failed to export: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  // Calculate today's and yesterday's order counts
  const getTodayAndYesterdayCounts = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let todayCount = 0;
    let yesterdayCount = 0;

    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);

      if (orderDate >= today && orderDate < tomorrow) {
        todayCount++;
      } else if (orderDate >= yesterday && orderDate < today) {
        yesterdayCount++;
      }
    });

    const allOrdersCount = orders.length;

    return {
      todayCount,
      yesterdayCount,
      allOrdersCount,
    };
  };

  const { todayCount, yesterdayCount, allOrdersCount } = getTodayAndYesterdayCounts();

  if (isLoading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Filters Section */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border">
        <h2 className="text-base sm:text-lg font-semibold mb-4 flex items-center gap-2">
          <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
          Filter Orders by Date
        </h2>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Today's Orders</p>
                <p className="text-xl sm:text-2xl font-bold text-blue-700">{todayCount}</p>
              </div>
              <div className="bg-blue-200 rounded-full p-2 sm:p-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-700" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Yesterday's Orders</p>
                <p className="text-xl sm:text-2xl font-bold text-green-700">{yesterdayCount}</p>
              </div>
              <div className="bg-green-200 rounded-full p-2 sm:p-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-green-700" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-red-100 p-3 sm:p-4 rounded-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Total Orders</p>
                <p className="text-xl sm:text-2xl font-bold text-red-700">{allOrdersCount}</p>
              </div>
              <div className="bg-red-200 rounded-full p-2 sm:p-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-red-700" />
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs sm:text-sm text-gray-600 mb-1">Filtered Orders</p>
                <p className="text-xl sm:text-2xl font-bold text-purple-700">{filteredOrders.length}</p>
              </div>
              <div className="bg-purple-200 rounded-full p-2 sm:p-3">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-700" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Filter Type</label>
            <select
              value={dateFilterType}
              onChange={(e) => {
                setDateFilterType(e.target.value);
                setStartDate('');
                setEndDate('');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="single">Single Day</option>
              <option value="range">Date Range</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {dateFilterType === 'single' ? 'Select Date' : 'Start Date'}
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {dateFilterType === 'range' && (
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          )}

          <div className="flex items-end">
            <button
              onClick={() => {
                setStartDate('');
                setEndDate('');
                setFilteredOrders(orders);
              }}
              disabled={!startDate && !endDate}
              className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear Filter
            </button>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-gray-600">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
          <button
            onClick={handleExportExcel}
            disabled={isExporting || filteredOrders.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Exporting...
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                Export to Excel
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
                <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden lg:table-cell">Address</th>
                <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Size</th>
                <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase hidden md:table-cell">Product</th>
                <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Qty</th>
                <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-2 sm:px-4 py-8 text-center text-gray-500 text-sm">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    {editingOrder === order._id ? (
                      <>
                        <td className="px-2 sm:px-4 py-3 text-sm font-mono">#{order.orderId || order.orderNumber || order._id.substring(0, 8)}</td>
                        <td className="px-2 sm:px-4 py-3 text-sm">{formatDate(order.createdAt)}</td>
                        <td className="px-2 sm:px-4 py-3">
                          <input
                            type="text"
                            value={editFormData.name}
                            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-2 sm:px-4 py-3">
                          <input
                            type="text"
                            value={editFormData.number}
                            onChange={(e) => setEditFormData({ ...editFormData, number: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-2 sm:px-4 py-3 hidden lg:table-cell">
                          <input
                            type="text"
                            value={editFormData.address}
                            onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-sm">{order.size || 'N/A'}</td>
                        <td className="px-2 sm:px-4 py-3 text-sm hidden md:table-cell">{order.productDetails?.[0]?.name || 'N/A'}</td>
                        <td className="px-2 sm:px-4 py-3 text-sm">{order.productDetails?.[0]?.quantity || 0}</td>
                        <td className="px-2 sm:px-4 py-3">
                          <input
                            type="number"
                            value={editFormData.price}
                            onChange={(e) => setEditFormData({ ...editFormData, price: parseFloat(e.target.value) })}
                            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </td>
                        <td className="px-2 sm:px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdate(order._id)}
                              disabled={updatingOrderId === order._id}
                              className="text-green-600 hover:text-green-800 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Save"
                            >
                              {updatingOrderId === order._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                '✓'
                              )}
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              disabled={updatingOrderId === order._id}
                              className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-2 sm:px-4 py-3 text-sm font-mono">#{order.orderId || order.orderNumber || order._id.substring(0, 8)}</td>
                        <td className="px-2 sm:px-4 py-3 text-sm">{formatDate(order.createdAt)}</td>
                        <td className="px-2 sm:px-4 py-3 text-sm">{order.name}</td>
                        <td className="px-2 sm:px-4 py-3 text-sm">{order.number}</td>
                        <td className="px-2 sm:px-4 py-3 text-sm max-w-xs truncate hidden lg:table-cell">
                          {order.address}, {order.city}, {order.state} - {order.pincode}
                        </td>
                        <td className="px-2 sm:px-4 py-3 text-sm">{order.size || 'N/A'}</td>
                        <td className="px-2 sm:px-4 py-3 text-sm hidden md:table-cell">{order.productDetails?.[0]?.name || 'N/A'}</td>
                        <td className="px-2 sm:px-4 py-3 text-sm">{order.productDetails?.[0]?.quantity || 0}</td>
                        <td className="px-2 sm:px-4 py-3 text-sm font-semibold">
                          Rs. {(Number(order?.price) + Number(order?.shipping))?.toFixed(2)}
                        </td>
                        <td className="px-2 sm:px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(order)}
                              disabled={deletingOrderId === order._id || updatingOrderId === order._id}
                              className="text-blue-600 hover:text-blue-800 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(order._id)}
                              disabled={deletingOrderId === order._id || updatingOrderId === order._id}
                              className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Delete"
                            >
                              {deletingOrderId === order._id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

