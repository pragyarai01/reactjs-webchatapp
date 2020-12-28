import { createBrowserHistory } from 'history';
const history = createBrowserHistory()
history.listen((location, action) => {
    if (action === 'POP') {
        console.log('locationpop',location)
        console.log("yehhh kya ho rha :'(")
     // history.replace(location.pathname);
    }
    if (action === 'PUSH') {
        console.log('locationpush',location)
        console.log("location push,....yehhh kya ho rha :'(")
     // history.replace(location.pathname);
    }
})
export default history;