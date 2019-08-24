# Node

Applications with node and express.

This application is for save projects and tasks in a array.

## Routes

- `POST /projects`: The route receive `id` and `title` and a body with this format: `{ id: "1", title: 'Novo projeto', tasks: [] }`;

- `GET /projects`: show all the projects;

- `PUT /projects/:id`: change only the title from project with `id` that there is in the params;

- `DELETE /projects/:id`: delete a project with `id` that there is in the params;

- `POST /projects/:id/tasks`: receive a `title` and save one new task in the array from tasks. The project is with `id` in the params;

### Example

If i call the route `POST /projects` passing `{ id: 1, title: 'New project' }` and the route `POST /projects/1/tasks` with `{ title: 'New Task' }`, my array stay:

```js
[
  {
    id: "1",
    title: 'New Project',
    tasks: ['New Task']
  }
]
```

## Middlewares

- Local middleware for find the project passed in the params. If not exists the api return error, if not return the respost ;

- Global middleware called in all the requests (`console.log`) count de number of requests;