# Ngopskuy

### About
A backend program for Ngopskuy website.
A e-commerce website which sell coffees and foods.

### Endpoints
| **url** | **Method** | **Description** |
| ------------- | ------------- | ------------- |
| product | GET | Get a list of product data |
| product/:id | GET | Get a detailed product data |
| product | POST | Insert a product data |
| product/:id | PATCH | Update a product data |
| product/delete/:id | PATCH | Delete a product data |
| product/favorite | GET | Get list of product which are most ordered in the last month |
| category | GET | Get a list of category product data |
| category/:id | GET | Get a detailed category product data |
| category | POST | Insert a category product data |
| category/:id | PATCH | Update a category product data |
| category/:id | Delete | Delete a category product data |
| user | GET | Get a list of user data |
| user/:id | GET | Get a detailed user data |
| user | POST | Insert a user data |
| user/:id | PATCH | Update a user data |
| user/delete/:id | PATCH | Soft delete a user data |
| user/:id | DELETE | Delete a user data |
| profile/ | GET | Get a logged in user profile data |
| profile/ | PATCH | Update a logged in user profile data |
| profile/change_password | PATCH | Change a logged in User password |
| promo | GET | Get a list of promo data |
| promo/:id | GET | Get a detailed promo data |
| promo | POST | Insert a promo data |
| promo/:id | PATCH | Update a promo data |
| promo/delete/:id | PATCH | Delete a promo data |
| size | GET | Get a list of Size of product or promo |
| size/:id | GET | Get a detailed Size of product or promo |
| size | POST | Insert a Size of product or promo |
| size/:id | PATCH | Update a Size of product or promo |
| size/:id | DELETE | Delete a Size of product or promo |
| delivery_type | GET | Get a list of delivery type/method of product or promo |
| delivery_type/:id | GET | Get a detailed delivery type/method of product or promo |
| delivery_type | POST | Insert a delivery type/method of product or promo |
| delivery_type/:id | PATCH | Update a delivery type/method of product or promo |
| delivery_type/:id | DELETE | Delete a delivery type/method of product or promo |
| transaction | GET | Get a list of transaction data |
| transaction/:id | GET | Get a detailed transaction data |
| transaction | POST | Insert a transaction data |
| transaction/:id | PATCH | Update a transaction data |
| transaction/delete/:id | PATCH | Delete a transaction data |
| transaction/product/:id | GET | Get list of transaction filtered by product id |
| transaction/user/:id | GET | Get list of transaction filtered by user id |
| transaction_status | GET | Get a list of Transaction status |
| transaction_status/:id | GET | Get a detailed Transaction status |
| transaction_status | POST | Insert a Transaction status |
| transaction_status/:id | PATCH | Update a Transaction status |
| transaction_status/:id | DELETE | Delete a Transaction status |
| transaction_status | GET | Get a list of Transaction status |
| transaction_status/:id | GET | Get a detailed Transaction status |
| transaction_status | POST | Insert a Transaction status |
| transaction_status/:id | PATCH | Update a Transaction status |
| transaction_status/:id | DELETE | Delete a Transaction status |