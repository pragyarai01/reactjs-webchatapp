import { createBrowserHistory } from 'history';
const history = createBrowserHistory()
history.listen((location, action) => {
    if (action === 'POP') {
        console.log('locationpop',location)
     // history.replace(location.pathname);
    }
    if (action === 'PUSH') {
        console.log('locationpush',location)
     // history.replace(location.pathname);
    }
})
export default history;