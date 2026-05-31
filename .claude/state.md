# State Management (MobX)

## Setup

- MobX with `makeAutoObservable` — used in all stores
- Stores are instantiated as singletons and exported as instances
- Components access stores via direct import (not React context, unless noted otherwise)

## Store Structure Pattern

```ts
import { makeAutoObservable, runInAction } from "mobx";
import to from "await-to-js";
import { UserDto, UserFilters } from "./user.types";
import { fetchUsers } from "./user.service";

class UserStore {
  users: UserDto[] = [];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }
}

export const userStore = new UserStore();
```

## Rules (IMPORTANT)

- Computed values use `get` — never derive data manually in components
- Do NOT mutate store state directly from components — call store actions
- Each feature module has its own store in `src/modules/{name}/{name}.store.ts`
- Global UI state (modals, drawers, pagination, etc.) lives in `src/stores/`

## In Components (MobX Observer)

```tsx
import { observer } from "mobx-react-lite";
import { userStore } from "@/modules/user/user.store";

const UserList = observer(() => {
  return (
    <div>
      {userStore.users.map((u) => (
        <div key={u.id}>{u.name}</div>
      ))}
    </div>
  );
});
```

- Always wrap components that read from a store with `observer()`
- Use `mobx-react-lite` (not `mobx-react`) — lighter, hooks-compatible
