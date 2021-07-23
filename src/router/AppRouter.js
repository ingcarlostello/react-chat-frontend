// @React
import React, { useContext, useEffect } from 'react';

// @Package
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
} from 'react-router-dom';

// @Routes
import { AuthRouter } from './AuthRouter';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// @Pages
import { ChatPage } from '../pages/ChatPage';

// @Context
import { AuthContext } from '../auth/AuthContext';


export const AppRouter = () => {

    const {auth, verifyToken} = useContext(AuthContext)

    useEffect(() => {
        verifyToken()
    }, [verifyToken])

    if(auth.checking){
        return <h1>Wait a moment</h1>
    }

    return (
        <Router>
            <div>
                <Switch>
                    {/* <Route path="/auth" component={AuthRouter} /> */}
                    <PublicRoute 
                        isAuthenticated={auth.logged}
                        path="/auth" component={AuthRouter}
                    />
                    <PrivateRoute 
                        isAuthenticated={auth.logged}
                        exact path="/" component={ChatPage} 
                    />
                    <Redirect to="/" />
                </Switch>
            </div>
        </Router>
    )
}
