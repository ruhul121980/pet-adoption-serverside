export function combineAllUsersOrders(users) { 
  let allOrders = [];
  
  for (let i = 0; i < users.length; i++) {
    if (Array.isArray(users[i].order)) {
      allOrders = [...allOrders, ...users[i].order];
    }
  }
  
  return allOrders;
  }
export function checkAndUpdateUserOrder(users,order) { 
  console.log("found checkAndUpdateUserOrder uses data",users.length ," and order ",order)

  let updatedOrder = [];
  let userEmail = ''
  
  for (let i = 0; i < users.length; i++) {
    if (Array.isArray(users[i].order)) {
      for (let j = 0; j < users[i].order.length; j++) {
        if (users[i].order[j].transaction_id == order.transaction_id) {
          updatedOrder = [...users[i].order]
          updatedOrder[j] = {...order}
          userEmail = users[i].email
          return { 
            email: userEmail,
            order:updatedOrder,
          }
        }
      }
    
    }

  }
  
  return null;
  }