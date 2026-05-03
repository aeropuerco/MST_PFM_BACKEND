# mel_onserver__ /// Proyecto Final de Master

## BACK_END : Documentación

### Introducción

La idea del proyecto es construir un editor de contenido básico, que sirva como estructura para diferentes proyectos que tengo en mente. Desde un Blog para un amigo, una web de una agencia de viajes, una web personal, etc.

La parte que tienen en común sería:

- Un login para diferentes roles de usuarios (admins, editores, visitantes)
- Un editor básico de "Posts" o "Paginas" que tenga para incluir Titulos, Parrafos, Imagenes, Codigo, Subtitulos, etc.. en cualquier cantidad. 
- Posibilidad de que los visitantes puedan poner comentarios.
- CRUD para usuarios, posts y comentarios.

### Instrucciones

`server.js` Lanza el servidor

### ENDPOINTS

#### USERS

- `POST` /api/users/createditor
- `GET` /api/users/editors
- `GET` /api/users/:id
- `PUT` /api/users/update/:id
- `DELETE` /api/users/:id

#### POSTS

- `POST` /api/post/createpost
- `GET` /api/post/
- `GET` /api/post/:id
- `PUT` /api/post/update/:id
- `DELETE` /api/post/delete/:id

#### COMMENTS

- `POST` /api/comment/create
- `GET` /api/comment/post/:id
- `DELETE` /api/comment/delete/:id

### ROLES DE USARIO

#### "sin login"

 Cualquier usuario puede acceder a ciertas rutas sin token.

- Leer el resumen de posts
- ver un post completo
- leer los comentarios
- ver la lista de editores.

#### "visitor"

El registro básico, accesible a todo el mundo. Se accede con usuario y contraseña. Puede hacer algunas acciones más:

- Comentar en los posts, quedando reflejado el comentario con su nombre de usuario.
- Eliminar sus propios comentarios

#### "editor"

 Un registo avanzado, que solamente un "admin" puede realizar. El "admin" crea una cuenta nueva, que cuando haga login podrá:

- Crear Posts definiendo sus bloques de contenido, titulo, imagenes, etc.
- Editar posteriormente sus Post creados, así como Eliminarlos.
- Moderar los comentarios sus propios Posts eliminando los que considere.
- Comentar en Posts, tanto propios como ajenos, como cualquier otro usuario registrado

#### "admin"

 El usuario con más permisos, puede hacer lo mismo que un "visitor", y además:

- Dar de Alta/Baja a editores
- Eliminar Posts de cualquier editor
- Eliminar Comentarios de cualquier usuario

### MIDDLEWARES Usados

- Auth: Verifica el token JWT generado para la sesión del usuario actual.
- Editor: Limita la ruta para roles de "editor" o "admin". Sino, deniega el acceso.
- Admin: Limita la ruta para rol de "admin". Si el token no es de rol "admin" deniega el acceso.
- Role: No limita la ruta, pero añade el rol a la request.

### UTILS

- createToken: Crea el token JWT encriptado. Se llama por ejemplo desde login o registro.
