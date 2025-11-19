export function buildRoutePath(path){

    const routeParametersRegex = /:([a-zA-Z]+)/g // Valida Rotas : (:<string>)

    const pathWithParams = path.replaceAll(routeParametersRegex, `(?<$1>[a-z0-9\-_]+)`) // Remove :

    const pathRegex = new RegExp(`^${pathWithParams}`) // Valida se ela INICIA com aquela expressão!

    return pathRegex
}