# KIBU Games
### CodeOp REACT-FE-01 - Proyecto Final

## Descripción
**KIBU Games** es una web app dirigido a usuarios gamers. La web app mostrará ofertas de videojuegos desde la plataforma [Steam](https://store.steampowered.com/).

Para obtener los datos, la app llama a la [API de CheapShark](https://apidocs.cheapshark.com/).

## Tecnología Utilizada
- HTML
- CSS
- Javascript
- [Tailwind CSS](https://tailwindcss.com)
- [Vue.js](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- ~~[Material Tailwind](https://www.material-tailwind.com/)~~

## Related Documents
- [x] [Figma](https://bit.ly/3sg32E1) 
- [] [Trello board](https://bit.ly/3z4yit8)
- [] TODO: Flowchart

## Pasos Iniciales

1. Creamos nuestro [repositorio en Github](https://github.com/gatzcat/codeop-final-project) para el proyecto
    - Después de crear el repo en Github, añadimos a las coders y CodeOp staff como colaboradores.
2. Clonamos el repo a una versión local y empecemos a instalar los paquetes y dependencias necesarios.
3. Instalamos Vue, Vite y Tailwind con _npm_, siguiendo los pasos en la [guía de instalación en la página de Tailwind](https://tailwindcss.com/docs/guides/vite#vue)
4. Instalamos a través de _npm_ [Material Tailwind](https://www.material-tailwind.com/) pero al final no fue utilizado ya que actualmente no es 100% compatible con Vue.
5. Instalmos Vue router con _npm_, siguiendo los pasos de en [la guía](https://router.vuejs.org/installation.html)
    - Creamos los routes _Home.vue_ y _Notfound.vue_
6. Para poder ver los cambios en tiempo real con Vite, usamos la comanda _npm run dev_.

## Entendiendo la API

- La API de CheapShark recibe llamadas por GET.
- No require la creación de una cuenta ni un API Key.
- CheapShark permite la inclusión de 16 diferentes parametros opcionales.
- Para decidir que parametros usar y los resultados que deseamos mostrar, tomamos como referencia la página principal del [CheapShark](https://www.cheapshark.com/)
- Para este proyecto, hacemos la llamada para [_List of Deals_](https://apidocs.cheapshark.com/#c33f57dd-3bb3-3b1f-c454-08cab413a115).

## Creación del prototipo en Figma

- Empezando con el proceso creativo, creamos [un prototipo de la aplicación](https://bit.ly/3sg32E1) en Figma.
- Hemos escogido una plantilla un poco similar a lo que estábamos buscando, y hemos
añadido las modificaciones necesarias.

## Credits
_This is a student project by Adeline Lim and Lucía Lázaro that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
