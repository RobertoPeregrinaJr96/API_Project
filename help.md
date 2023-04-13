# kill a port

sudo kill -9 $(sudo lsof -t -i:9001)

```js
// login
fetch("/api/session", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-Token": "tnwUL7fL-hTp2Vm-hY8vJUELEehbxnYLhG6g",
  },
  body: JSON.stringify({ credential: "Demo-lition", password: "password" }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));

// logout
fetch("/api/session", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "XSRF-Token": "tnwUL7fL-hTp2Vm-hY8vJUELEehbxnYLhG6g",
  },
})
  .then((res) => res.json())
  .then((data) => console.log(data));

// sign up
fetch("/api/users", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "XSRF-Token": "tnwUL7fL-hTp2Vm-hY8vJUELEehbxnYLhG6g",
  },
  body: JSON.stringify({
    email: "Robertoperegrina@Aol.com",
    username: "username",
    password: "password",
    firstName: "Roberto",
    lastName: "Peregrina",
  }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```
