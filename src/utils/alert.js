import M from 'materialize-css'


export const alert = (message) => {
    M.toast({html: message})
}