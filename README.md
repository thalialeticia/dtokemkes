# dtokemkes server
Dtokemkes server is a server for fulfilling dto.kemkes technical test project

This app has:
* RESTful endpoint for CRUD operation
* JSON formatted response

Tech Stack used to build this server:
* Node JS
* Adonis JS Framework
* PostgreSQL

### Global Responses
> These responses are applied globally on all endpoints
_Response (422 - Unprocessable Entity)_
```
{
  "errors": [
    {
      "rule": "required",
      "field": "username",
      "message": "required validation failed"
    },
    {
      "rule": "required",
      "field": "email",
      "message": "required validation failed"
    },
    {
      "rule": "required",
      "field": "password",
      "message": "required validation failed"
    }
  ]
}
```
_Response (400 - Bad Request)_
```
{
  "code": 400,
  "status": "password/email is incorrect", 
}
```
_Response (401 - Unauthorized)_
```
{
  "errors": [
    {
      "message": "E_UNAUTHORIZED_ACCESS: Unauthorized access"
    }
  ]
}
```
_Response (404 - Not Found)_
```
{
  "code": 404,
  "status": "not found"
}
```

## RESTful endpoints
### POST https://dtokemkesproject.herokuapp.com//register
_Request Header_
```
not needed
```

_Request Body_
```
{
    username,
    email,
    password
}
```

_Response (201)_
```
{
  "code": 201,
  "status": "success",
  "data": {
    "user": {
      "username": "thalia",
      "email": "thalialeticia1107@gmail.com",
      "password": "$bcrypt$v=98$r=10$ejKx5pQNM+KK/agD9drkzw$qXOxIktVzoM3N1wejYL0wW4ZblMNTSs",
      "created_at": "2022-03-23T12:32:12.139+07:00",
      "updated_at": "2022-03-23T12:32:12.210+07:00",
      "id": 1,
      "login": "true"
    },
    "token": {
      "type": "bearer",
      "token": "Y2wxMzRwZnNkMDAwMDUweG80aG94M3ByeA.VBAhtqiRIvkUIgXziLVMnsLNrROQwNwg-Z0bBYILJzhUKWlhqRcrmuawlsGS"
    }
  }
}
```
### POST https://dtokemkesproject.herokuapp.com//login
_Request Header_
```
not needed
```

_Request Body_
```
{
    email,
    password
}
```

_Response (200)_
```
{
  "code": 200,
  "status": "success",
  "data": {
    "type": "bearer",
    "token": "Y2wxMzRxN25uMDAwMDZveG82cmozM3pnNQ.UDDCKZvxP8bXUWE4wsM01M_vSQcvpPs3p_LZ9wsD-bc7N5fDi9td6wm22nTD"
  }
}
```
### POST https://dtokemkesproject.herokuapp.com//logout
_Request Header_
```
{
    Authorization : <Bearer access_token>
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "code": 200,
  "status": "success",
  "data": {
    "id": 1,
    "username": "thalia",
    "email": "thalialeticia1107@gmail.com",
    "password": "$bcrypt$v=98$r=10$ejKx5pQNM+KK/agD9drkzw$qXOxIktVzoM3N1wejYL0wW4ZblMNTSs",
    "login": "false",
    "created_at": "2022-03-23T12:32:12.139+07:00",
    "updated_at": "2022-03-23T13:00:33.470+07:00"
  }
}
```
### POST https://dtokemkesproject.herokuapp.com//faskes
_Request Header_
```
{
    Authorization : <Bearer access_token>
}
```

_Request Body_
```
{
    name,
    faskes_type,
    total_nakes
}
```

_Response (201)_
```
{
  "code": 201,
  "status": "success",
  "data": {
    "faskes": {
      "name": "Awal Bros",
      "faskes_type": "Puskesmas",
      "total_nakes": 5,
      "created_at": "2022-03-23T18:40:51.542+07:00",
      "updated_at": "2022-03-23T18:40:51.542+07:00",
      "id": 8
    }
  }
}
```
### GET https://dtokemkesproject.herokuapp.com//faskes
_Request Header_
```
{
    Authorization : <Bearer access_token>
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "code": 200,
  "status": "success",
  "data": [
    {
      "id": 2,
      "name": "PKC Penjaringan",
      "faskes_type": "Puskesmas",
      "total_nakes": 20,
      "created_at": "2022-03-23T18:48:05.371+07:00",
      "updated_at": "2022-03-23T18:48:05.371+07:00"
    },
    {
      "id": 1,
      "name": "Awal Bros",
      "faskes_type": "RS",
      "total_nakes": 30,
      "created_at": "2022-03-23T18:46:03.232+07:00",
      "updated_at": "2022-03-23T18:46:03.233+07:00"
    }
  ]
}
```
### PATCH https://dtokemkesproject.herokuapp.com//faskes/:id
_Request Header_
```
{
    Authorization : <Bearer access_token>
}
```

_Request Body_
```
{
    name (optional),
    faskes_type (optional),
    total_nakes (required)
}
```

_Response (200)_
```
{
  "code": 200,
  "status": "success",
  "data": {
    "id": 1,
    "name": "Awal Bros",
    "faskes_type": "RS",
    "total_nakes": 50,
    "created_at": "2022-03-23T18:46:03.232+07:00",
    "updated_at": "2022-03-23T19:03:26.052+07:00"
  }
}
```
### DELETE https://dtokemkesproject.herokuapp.com//faskes/:id
_Request Header_
```
{
    Authorization : <Bearer access_token>
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "code": 200,
  "status": "success",
  "data": {
    "id": 5,
    "name": "PKC Penjaringan",
    "faskes_type": "Puskesmas",
    "total_nakes": 0,
    "created_at": "2022-03-23T18:58:46.428+07:00",
    "updated_at": "2022-03-23T18:58:46.428+07:00"
  }
}
```
### GET https://dtokemkesproject.herokuapp.com//faskes/pdf
_Request Header_
```
{
    Authorization : <Bearer access_token>
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "code": 200,
  "status": "success",
  "data": "pdf output"
}
```