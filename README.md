# KIBU Games
### CodeOp REACT-FE-01 - Proyecto Final

## Descripción
[**KIBU Games**](https://kibu-games.vercel.app/) es una web app dirigido a usuarios gamers. La web app mostrará ofertas de videojuegos desde la plataforma [Steam](https://store.steampowered.com/). Tuvimos aproximadamente 39 horas para entregar el proyecto.

El usuario podrá filtrar por los juegos de Steam con diferentes parametros, como el título, precios máximo y mínimo, la puntuación del Steam (Steam rating).

Para obtener los datos, la app llama a la [API de CheapShark](https://apidocs.cheapshark.com/). El usuario también podrá ordenar los resultados por precio, puntuación y otros parametros.

Adicionalmente, es posible visualizar los precios en monedas diferentes. Los datos del cambio de moneda son proporcionados por la API [Currency API](https://github.com/fawazahmed0/currency-api#readme).

Si el usuario le gusta alguna oferta, puede clicar en la imagen or titulo del juego y llegará a la página del juego en la tienda de Steam.

## Tecnología Utilizada
- HTML
- CSS
- Javascript
- [Tailwind CSS](https://tailwindcss.com)
- [Vue.js](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Vercel](https://vercel.com/)
- ~~[Material Tailwind](https://www.material-tailwind.com/)~~

## Related Documents
- [x] [Prototipo en Figma](https://bit.ly/3sg32E1) 
- [x] [Our Kanban board](https://bit.ly/3z4yit8)
- [x] [User journey Flowchart](https://bit.ly/3f5ripf)

## Como instalar
1. Clonear el repositorio a un espacio local
2. Dentro de la carpeta, instala las dependencias con `npm install`
3. Para visualizar los cambios ejecutar la comanda `npm run dev`

## Nuestros pasos Iniciales

1. Creamos nuestro [repositorio en Github](https://github.com/gatzcat/codeop-final-project) para el proyecto
    - Después de crear el repo en Github, añadimos a las coders y CodeOp staff como colaboradores.
2. Clonamos el repo a una versión local y empecemos a instalar los paquetes y dependencias necesarios.
3. Instalamos Vue, Vite y Tailwind con _npm_, siguiendo los pasos en la [guía de instalación en la página de Tailwind](https://tailwindcss.com/docs/guides/vite#vue)
4. Instalamos a través de _npm_ [Material Tailwind](https://www.material-tailwind.com/) pero al final no fue utilizado ya que actualmente no es 100% compatible con Vue.
5. Instalmos Vue router con _npm_, siguiendo los pasos de en [la guía](https://router.vuejs.org/installation.html)
    - Creamos los routes `Home.vue` y `Notfound.vue`
6. Para poder ver los cambios en tiempo real con Vite, usamos la comanda `npm run dev`.

## Entendiendo CheapShark API

- La API de CheapShark recibe llamadas por el metodo `GET`.
- No require la creación de una cuenta ni un API Key.
- CheapShark permite la inclusión de 16 diferentes parametros opcionales.
- Para decidir que parametros usar y los resultados que deseamos mostrar, tomamos como referencia la página principal del [CheapShark](https://www.cheapshark.com/)
- Para este proyecto, hacemos la llamada para [`List of Deals`](https://apidocs.cheapshark.com/#c33f57dd-3bb3-3b1f-c454-08cab413a115).

## Creación del prototipo en Figma

- Empezando con el proceso creativo, creamos [un prototipo de la aplicación](https://bit.ly/3sg32E1) en Figma.
- Hemos escogido una plantilla un poco similar a lo que estábamos buscando, y hemos
añadido las modificaciones necesarias.
- Mientras ibamos trabajando, el diseño de la página y Figma también iba actualizando

## Posibles mejoras futuras
- Dejar el usuario buscar ofertas en otras tiendas de juegos, no solamente Steam.
- Implementar una función de autocomplete mientras el usuario teclear el título que quiere buscar.
- Monetizar la página aprovechando de los links de afiliados.
- Implementar la posibilidad de hacerse cuentas de usuarios que permitirá
    - Guardar y monitorizar los precios y ofertas de juegos
        - Proveer notificaciones cuando un juego guardado está de rebajas.
    - Conocer los gustos del usuario para poder recomendar juegos

## Aprendizajes
- No deberíamos trabajar en la misma branch en git

## Credits
_This is a student project by Adeline Lim and Lucía Lázaro that was created at [CodeOp](http://codeop.tech), a frontend development bootcamp in Barcelona._
