export class Router {

    routes = {}

    add(RouteName, pages) {
        this.routes[RouteName] = pages
    }
    
  route(event) {
    event = event || window.event;
    event.preventDefault();

    window.history.pushState({}, "", event.target.href);
        this.handle();
  }
    handle() {
        const  { pathname } = window.location
        const route = this.routes[pathname] || this.routes[404]

        fetch(route)
        .then((data) => data.text())
        .then((html) => {
           document.querySelector(".app").innerHTML = html;
    })

    .then(() => {
        let backgroundUniverse = pathname === '/universe'
        let backgroundExploration = pathname === '/exploration'

        if (backgroundUniverse) {
            document.querySelector("main").style.setProperty("background-image", "var(--img-universe)");

        } else if(backgroundExploration) {
            document.querySelector('main').style.setProperty('background-image', 'var(--img-exploration)');

        } else {
            document.querySelector('main').style.setProperty('background-image', 'var(--img-home)');
        }
    })
}}



