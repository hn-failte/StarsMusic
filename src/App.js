import React from 'react';
import Layout from "@layout"
import { Switch, Route, Redirect } from "react-router-dom"
import { Provider } from "react-redux"
import { mainRouter } from "@routers"
import NotFound from '@common/NotFound';
import { MusicList } from "@views";
import store from "@store"

function App() {
  return (
    <div className="container">
      <Provider store={store}>
        <Layout>
            <Switch>
              <Redirect from="/" exact to="/recommend"></Redirect>
              {
                mainRouter.map((item, index)=>{
                  return <Route key={"mainRouter"+index} path={item.path} component={item.component} />
                })
              }
              <Route key={"mainRouter404"} path="/404" component={NotFound}></Route>
              <Route path="/musiclist" component={MusicList}></Route>
              <Redirect from="**" to="/404"></Redirect>
            </Switch>
        </Layout>
      </Provider>
    </div>
  );
}

export default App;
