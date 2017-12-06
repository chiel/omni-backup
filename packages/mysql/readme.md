# @ocm/mysql

The MySQL package sets up a connection pool and exposes some convenience methods
for common functionality. This package is included in `@ocm/core`.

In order to use it, you will need to start Omni with a set of four environment
variables:

- `MYSQL_DB_HOST` - the host to connect to.
- `MYSQL_DB_USER` - the user to connect as.
- `MYSQL_DB_PASS` - the password for the user you're connecting as.
- `MYSQL_DB_NAME` - the database to use.


## Docs

`@ocm/mysql` exposes a couple of functions under the `omni.mysql` namespace.
Each of these functions is promise-based for your convenience.

### `insert` (`table`, `data`)

Insert `data` into `table`. This will resolve with the full record that now
exists in the database.

```js
function myAwesomePlugin(omni) {
  omni.mysql.insert('user', {
    first_name: 'Chiel',
    last_name: 'Kunkels',
  })
    .then(user => {
      // user will be the full row that was created
    });
}
```

### `select` (`table`, `id`)

Select a row from `table` by `id`.

```js
function myAwesomePlugin(omni) {
  omni.mysql.select('user', 1)
    .then(user => {
      // user will be the full row with id 1
    });
}
```

### `update` (`table`, `id`, `data`)

```js
function myAwesomePlugin(omni) {
  omni.mysql.update('user', 1, {
    last_name: 'Kunklols',
  })
    .then(user => {
      // user will be the full row that was updated
    });
}
```



### `delete`

### `query`
