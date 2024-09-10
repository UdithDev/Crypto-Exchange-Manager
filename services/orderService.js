let orders = [];

const createOrder = (order) => {
  orders.push(order);
  return order;
};

const getOrders = () => {
  return orders;
};

const updateOrder = (orderId, updatedOrder) => {
  const index = orders.findIndex((order) => order.id === orderId);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updatedOrder };
    return orders[index];
  }

  return null;
};

module.exports = { createOrder, getOrders, updateOrder };
