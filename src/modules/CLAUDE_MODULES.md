# Feature Modules

Every feature lives in `src/modules/{name}/` and follows a strict 5-file structure.
Do NOT add files outside this pattern without a strong reason.

## Data Flow

```
Component → Store → Service → Repo → API
                ↑
           (MobX observer)
```

- **Component** reads from store via `observer()`, calls store actions
- **Store** manages state, calls service with `to()`
- **Service** is a class that delegates to repo (transforms if needed)
- **Repo** is a plain object of Axios calls — no logic, no `to()`

---

## Full File Structure

```
src/modules/{name}/
├── {name}.types.ts       # IPost{Name} and IGet{Name} interfaces
├── {name}.constants.ts   # Endpoints, initial state, label maps
├── {name}.repo.ts        # Raw Axios calls — no logic, no error handling
├── {name}.service.ts     # Class — delegates to repo, thin transforms
├── {name}.store.ts       # MobX class store — state + actions via to()
├── {name}.mock.ts        # Mock data for dev/testing (optional)
├── {name}.test.ts        # Unit/integration tests
└── index.ts              # Re-exports everything for clean imports
```

---

## {name}.types.ts

Two core interfaces per module: `IPost{Name}` (create/update payload) and `IGet{Name}` (API response, extends IPost).

```ts
export interface IPostUser {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  is_active: boolean;
}

export interface IGetUser extends IPostUser {
  id: number;
  createdAt: string;
  updatedAt: string;
}
```

---

## {name}.constants.ts

Endpoints object + initial form state. No async logic.

```ts
import { IPostUser } from './users.types';

export const USERS_ENDPOINTS = {
  USERS: '/users/',
};

export const USER_INITIAL_STATE: IPostUser = {
  first_name: '',
  last_name: '',
  email: '',
  phone_number: '',
  is_active: true,
};
```

---

## {name}.repo.ts

Axios calls only. Use `axiosMain` from `@config/axiosConfig`.
Return type comes from global response interfaces in `@stores`.
No `to()`, no logic, no transforms.

```ts
import { axiosMain } from '@config/axiosConfig';
import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from '@stores';

import { USERS_ENDPOINTS } from './users.constants';
import { IGetUser, IPostUser } from './users.types';

const getAllUsers = (filters?: object): IApiPaginatedResponse<IGetUser> =>
  axiosMain.get(USERS_ENDPOINTS.USERS, { params: filters });

const getUserById = (id: number): IApiGetResponse<IGetUser> =>
  axiosMain.get(`${USERS_ENDPOINTS.USERS}${id}`);

const createUser = (payload: IPostUser): IApiPostResponse =>
  axiosMain.post(USERS_ENDPOINTS.USERS, payload);

const updateUser = (id: number, payload: IPostUser): IApiNoContentResponse =>
  axiosMain.put(`${USERS_ENDPOINTS.USERS}${id}`, payload);

export const usersRepo = { getAllUsers, getUserById, createUser, updateUser };
```

---

## {name}.service.ts

Class with methods that call repo. Use `to()` here only if transforms are needed;
otherwise just pass through. Return the same promise shape the repo returns.

```ts
import {
  IApiGetResponse,
  IApiNoContentResponse,
  IApiPaginatedResponse,
  IApiPostResponse,
} from '@stores';

import { usersRepo } from './users.repo';
import type { IGetUser, IPostUser } from './users.types';

class UsersService {
  getAllUsers = (filters?: object): IApiPaginatedResponse<IGetUser> =>
    usersRepo.getAllUsers(filters);

  getUserById = (id: number): IApiGetResponse<IGetUser> =>
    usersRepo.getUserById(id);

  createUser = (payload: IPostUser): IApiPostResponse =>
    usersRepo.createUser(payload);

  updateUser = (id: number, payload: IPostUser): IApiNoContentResponse =>
    usersRepo.updateUser(id, payload);
}

export const usersService = new UsersService();
```

---

## {name}.store.ts

MobX class. Implements `IBaseStoreConfig<T>` which provides `handleChange`.
Always use `to()` for async calls, `makeAutoObservable` in constructor.
Expose state via `getter*` computed properties.

```ts
import to from 'await-to-js';
import { makeAutoObservable } from 'mobx';
import {
  IBaseStoreConfig,
  INoContentResponse,
  IPaginatedResponse,
  IPostResponse,
} from '@stores';

import { USER_INITIAL_STATE } from './users.constants';
import { usersService } from './users.service';
import { IGetUser, IPostUser } from './users.types';

class UsersStore implements IBaseStoreConfig<UsersStore> {
  usersList: IGetUser[] = [];
  user: IGetUser | IPostUser = USER_INITIAL_STATE;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get getterUsersList(): IGetUser[] {
    return this.usersList;
  }

  get getterUser(): IGetUser | IPostUser {
    return this.user;
  }

  handleChange<K extends keyof UsersStore>(key: K, value: UsersStore[K]) {
    (this as Record<string, unknown>)[key as string] = value;
  }

  getAllUsers = async () => {
    this.isLoading = true;
    const [err, res] = await to<IPaginatedResponse<IGetUser>>(
      usersService.getAllUsers(),
    );
    if (err) return Promise.reject(err);
    this.handleChange('usersList', res as unknown as IGetUser[]);
  };

  createUser = async (payload: IPostUser) => {
    const [err] = await to<IPostResponse>(usersService.createUser(payload));
    if (err) return Promise.reject(err);
    void this.getAllUsers();
  };
}

export const usersStore = new UsersStore();
```

---

## index.ts

Re-exports everything from the module for clean external imports.

```ts
import { USER_INITIAL_STATE } from './users.constants';
import { usersRepo } from './users.repo';
import { usersService } from './users.service';
import { usersStore } from './users.store';
import type { IGetUser, IPostUser } from './users.types';

export {
  type IGetUser,
  type IPostUser,
  USER_INITIAL_STATE,
  usersRepo,
  usersService,
  usersStore,
};
```

---

## Rules

- Repo: Axios only — no `to()`, no logic, no transforms
- Service: calls repo only — never another module's repo
- Store: calls its own service only — never another module's service or repo
- Components: read store via `observer()`, call store actions only — never call service/repo directly
- Shared logic between modules goes in `src/utils/`
- Never import a store into another store
- Type convention: `IPost{Name}` for write payload, `IGet{Name}` for read response (extends IPost)
- Naming: pluralize the module folder and file prefix (e.g. `users/users.store.ts`)
