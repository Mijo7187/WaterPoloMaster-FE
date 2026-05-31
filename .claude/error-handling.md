# Error Handling

## IMPORTANT: Always use `await-to-js` for async calls

This project uses the `to` function from `await-to-js` for all async/await error handling.
**Never use try/catch blocks for async calls.** Use `to` instead.

## Pattern

```ts
import to from "await-to-js";

// Basic usage
const [err, res] = await to(someAsyncCall());
if (err) {
  // handle error
  return;
}
// use result safely here
```

## In a MobX Store action

```ts
import to from "await-to-js";

fetchUsers = async () => {
  this.loading = true;
  const [err, res] = await to(userService.fetchUsers());
  runInAction(() => {
    this.loading = false;
    if (err) {
      this.error = err.message;
      return;
    }
    this.users = res ?? [];
  });
};
```

## Rules

- Always destructure as `[err, res]` — err first, result second
- Always check `if (err)` before using `result`
- Never assume `res` is defined without checking `err` first
- For fire-and-forget calls that must not throw, still use `to` and log the error
- Do NOT mix `to` with try/catch in the same function
