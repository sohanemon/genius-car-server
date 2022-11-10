## Create a secret key

```js
require("crypto").randomBytes(64).toString("hex");
```
## Passing to the header
```js
axios.post(
  `${process.env.REACT_APP_server}/jwt`,
  { data: "" }, // at least something needs to be passed
  {
    headers: {
      authorization: user.email,
    },
  }
);
```
> `axios.post(URI,body,config)` should be in this serial

- to use only config/headers as `axios.post(URI,'',config)` or `axios.post(URI,{},{headers: {token: 123})`
