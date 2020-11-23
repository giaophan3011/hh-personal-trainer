export default async function getCustomers () {
    return await fetch("https://customerrest.herokuapp.com/api/customers")
    .then(response => response.json());
}

export async function deleteCustomer (customer) {
    return await fetch(customer.links.find(element => element.rel === "self").href, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      } // body data type must match "Content-Type" header
    })
  }

export async function editCustomer (customer)  {    
    return await  fetch(customer.links.find(element => element.rel === "self").href, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(customer)
      });
}




  
