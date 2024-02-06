import React, { useState } from 'react';

function MyOrders() {
  const [orders, setOrders] = useState([
    { id: '001', title: 'Market Analysis Q1 2024', dateOrdered: '2024-01-20', slides: 30, cost: 300 },
    { id: '002', title: 'Year-End Review 2023', dateOrdered: '2024-01-18', slides: 45, cost: 450 },
    { id: '003', title: 'Stock Analysis ', dateOrdered: '2024-01-22', slides: 35, cost: 450 },
   
  ]);

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>My Orders</h2>
      <div style={styles.ordersList}>
        {orders.map((order) => (
          <div key={order.id} style={styles.orderItem}>
            <h3 style={styles.orderTitle}>{order.title}</h3>
            <p style={styles.orderDetail}><strong>Ordered on:</strong> {order.dateOrdered}</p>
            <p style={styles.orderDetail}><strong>Total slides:</strong> {order.slides}</p>
            <p style={styles.orderDetail}><strong>Cost:</strong> ${order.cost}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
    container: {
        width: '100%',
        minHeight: '100vh',
        padding: '10px',
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
        backgroundColor: '#121212',
        color: '#e0e0e0',
        display: 'flex',
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center',
      },
      
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    color: '#1db954',
    fontSize: '24px',
  },
  ordersList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
  },
  
  orderItem: {
    width: '100%', 
    border: '1px solid #333',
    borderRadius: '16px',
    padding: '20px', 
    backgroundColor: '#222', 
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)', 
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  },
  
  orderTitle: {
    color: '#fff', 
    fontSize: '18px',
    marginBottom: '10px',
  },
  orderDetail: {
    fontSize: '16px',
    margin: '5px 0',
    color: '#ccc',
  },
};

export default MyOrders;
