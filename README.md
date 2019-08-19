# Fauna Node

It will read data from the "orders" table and connect it with "customers" and "products" to show details of each order

The service will return a complex JSON object in response with:

an array containing each order, inside of each will have:

Array of the lines in each order with their item names and description and subtotal
Total price of all lines
Status
Shipping address
Customer name
