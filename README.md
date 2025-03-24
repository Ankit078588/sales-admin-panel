# Sales Admin Panel API Documentation


## 1. Project Information
- `Project is live on AWS with a CI/CD pipeline implemented using GitHub Actions.`
- Live URL: http://3.233.252.224
- Please HIT the right API to get the response.


## 2. Quick LIVE Test - GET Routes  
- Below are some working live URL's where you can check these API's.
|------------------------|
| Endpoint | Description |
|----------|-------------|
1. `http://3.233.252.224/api/retailers/getAllRetailers`                       -->  Fetch all retailers 
2. `http://3.233.252.224/api/retailers/single-wholesaler`                     -->  Get retailers associated with exactly one wholesaler 
3. `http://3.233.252.224/api/wholesalers/1`                                   -->  Get a wholesaler along with their associated retailers 
4. `http://3.233.252.224/api/wholesalers/turnover?year=2025&wholesaler_id=1`  -->  Get monthly turnover for a wholesaler in a given year 
5. `http://3.233.252.224/api/wholesalers/max-turnover?wholesaler_id=2`        -->  Get the maximum turnover of a wholesaler from a single retailer 

- Remaining POST routes can be test using POSTMAN. 
- Below i've explained all the routes.



## 3. Database Information
- `Database Used: PostgreSQL`
- `Hosted on Neon (Free-Tier), so API responses may have latency. Please be patient while accessing the APIs.`
- `For faster API responses, you may use a local PostgreSQL database.`
- `Run PostgreSQL Locally Using Docker:  docker run --name postgres_container -e POSTGRES_DB=sales_admin -e POSTGRES_USER=root -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres`



## 4. NOTE:
- `The endpoint and their responses provided given below are **not** just example data but actual, tested responses from the live API using POSTMAN. `
- `All data is stored in a **PostgreSQL database hosted on Neon**, and you can verify the results by making API requests yourself.`





```json

## =======================================================================================
## [1.] Retailer API's


## 1. Register new Retailer
Endpoint:  POST /api/retailers

Request: Body:
{
    "name": "Retailer-7", 
    "mobile_number": "8340763577"
}

Response: 
{
    "message": "New Retailer registered.",
    "newRetailer": {
        "id": 7,
        "name": "Retailer-7",
        "mobile_number": "8340763577",
        "updatedAt": "2025-03-23T22:42:03.198Z",
        "createdAt": "2025-03-23T22:42:03.198Z"
    }
}





## 2. Get all Retailer
Endpoint:   GET /api/retailers/getAllRetailers
Response:
{
  "message": "Retailers fetched successfully.",
  "retailers": [
    {
      "id": 1,
      "name": "Retailer-1",
      "mobile_number": "8340763571",
      "createdAt": "2025-03-23T22:41:06.711Z",
      "updatedAt": "2025-03-23T22:41:06.711Z"
    },
    {
      "id": 2,
      "name": "Retailer-2",
      "mobile_number": "8340763572",
      "createdAt": "2025-03-23T22:41:17.382Z",
      "updatedAt": "2025-03-23T22:41:17.382Z"
    },
    {
      "id": 3,
      "name": "Retailer-3",
      "mobile_number": "8340763573",
      "createdAt": "2025-03-23T22:41:25.739Z",
      "updatedAt": "2025-03-23T22:41:25.739Z"
    },
    {
      "id": 4,
      "name": "Retailer-4",
      "mobile_number": "8340763574",
      "createdAt": "2025-03-23T22:41:35.121Z",
      "updatedAt": "2025-03-23T22:41:35.121Z"
    },
    {
      "id": 5,
      "name": "Retailer-5",
      "mobile_number": "8340763575",
      "createdAt": "2025-03-23T22:41:44.855Z",
      "updatedAt": "2025-03-23T22:41:44.855Z"
    },
    {
      "id": 6,
      "name": "Retailer-6",
      "mobile_number": "8340763576",
      "createdAt": "2025-03-23T22:41:53.809Z",
      "updatedAt": "2025-03-23T22:41:53.809Z"
    },
    {
      "id": 7,
      "name": "Retailer-7",
      "mobile_number": "8340763577",
      "createdAt": "2025-03-23T22:42:03.198Z",
      "updatedAt": "2025-03-23T22:42:03.198Z"
    }
  ]
}




## 3. Get Retailer linked with only One Wholesaler
Endpoint:   GET /api/retailers/single-wholesaler
Response:
{
    "message": "Retailers associated with exactly one wholesaler",
    "retailers": [
        {
            "id": 2,
            "name": "Retailer-2",
            "wholesalers": [ {"id": 1} ]
        },
        {
            "id": 3,
            "name": "Retailer-3",
            "wholesalers": [ {"id": 1} ]
        },
        {
            "id": 5,
            "name": "Retailer-5",
            "wholesalers": [ {"id": 7} ]
        }
    ]
}





# =======================================================================================
#### [2.] Wholesaler API's


## API-1. Register Wholesalers:
Endpoint:  POST /api/wholesalers/register/newWholesaler

Request:
{
    "name": "Wholesaler-10", 
    "mobile_number": "7848848488"
}

Response:
{
    "message": "New wholesaler registered.",
    "newWholesaler": {
        "id": 3,
        "name": "Wholesaler-10",
        "mobile_number": "7848848488",
        "updatedAt": "2025-03-23T19:38:42.626Z",
        "createdAt": "2025-03-23T19:38:42.626Z"
    }
}





## API-2. Associate Wholesaler with Retailers :
Endpoint:  POST /api/wholesalers/:wholesaler_id/associate-retailers

Request:  Body
{
  "retailer_ids": [1, 2]
}


Response: 
{
    "message": "Retailers associated successfully!",
    "wholesaler": {
        "id": 2,
        "name": "PK Traders",
        "mobile_number": "9876543210",
        "createdAt": "2025-03-23T15:49:31.087Z",
        "updatedAt": "2025-03-23T15:49:31.087Z"
    },
    "newlyAddedRetailers": [
        {
            "id": 1,
            "name": "Retailer-1",
            "mobile_number": "7858838489",
            "createdAt": "2025-03-23T16:12:49.645Z",
            "updatedAt": "2025-03-23T16:12:49.645Z"
        },
        {
            "id": 2,
            "name": "Retailer-2",
            "mobile_number": "7858838481",
            "createdAt": "2025-03-23T16:13:50.619Z",
            "updatedAt": "2025-03-23T16:13:50.619Z"
        }
    ]
}






## API-3: Calculate Monthly turnover of each year
Endpoint:   GET /api/wholesalers/turnover?year=2025&wholesaler_id=1

Response:
{
    "message": "Monthly turnover for wholesaler 1 in year 2025",
    "data": [
        {
            "month": "2025-03-01T00:00:00.000Z",
            "total_turnover": 1000
        },
        {
            "month": "2025-05-01T00:00:00.000Z",
            "total_turnover": 1000
        },
        {
            "month": "2025-07-01T00:00:00.000Z",
            "total_turnover": 1000
        },
        {
            "month": "2025-09-01T00:00:00.000Z",
            "total_turnover": 1000
        }
    ]
}



## API-4. Get Wholesaler with Retailer:
Endpoint:  GET  /api/wholesalers/:wholesaler_id

Request:  /api/wholesalers/1
Response:
{
    "wholesaler": {
        "id": 1,
        "name": "Wholesaler-1",
        "mobile_number": "7848848488",
        "createdAt": "2025-03-23T22:37:33.914Z",
        "updatedAt": "2025-03-23T22:37:33.914Z",
        "Retailers": [
            {
                "id": 2,
                "name": "Retailer-2",
                "mobile_number": "8340763572",
                "createdAt": "2025-03-23T22:41:17.382Z",
                "updatedAt": "2025-03-23T22:41:17.382Z"
            },
            {
                "id": 3,
                "name": "Retailer-3",
                "mobile_number": "8340763573",
                "createdAt": "2025-03-23T22:41:25.739Z",
                "updatedAt": "2025-03-23T22:41:25.739Z"
            },
            {
                "id": 4,
                "name": "Retailer-4",
                "mobile_number": "8340763574",
                "createdAt": "2025-03-23T22:41:35.121Z",
                "updatedAt": "2025-03-23T22:41:35.121Z"
            }
        ]
    }
}







## API-5. Get Maximum Turnover from single retailer
Endpoint:  GET /api/wholesalers/max-turnover?wholesaler_id=2

Response:
{
    "message": "Max turnover of each wholesaler from a single retailer",
    "maxTurnover": {
        "retailer_id": 1,
        "total_turnover": 933300,
        "Retailer": {
            "id": 1,
            "name": "Retailer-1"
        }
    }
}









## =======================================================================================
// 3. [Stock API's]



## 1. Wholesaler will sell stock to retailer
POST: /api/stocks/sell

Request: Body
{
  "wholesaler_id": 2,
  "retailer_id": 1,
  "stock_amount": 933300,
  "date": "2025-09-23"
}

Response:
{
    "message": "Stock sold successfully.",
    "newStock": {
        "id": 11,
        "wholesaler_id": 2,
        "retailer_id": 1,
        "stock_amount": 933300,
        "date": "2025-09-23"
    }
}



