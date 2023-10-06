import React from 'react';
import {Route, Routes} from 'react-router-dom';
import ProtectedRoute from '../helpers/ProtectedRoute';
import PublicRoute from '../helpers/PublicRoute';
import {Navigate} from 'react-router-dom';
import {SignIn, SignUp, Dashboard} from '../pages';
export function Routers() {
  return (
    <>
      <Routes>
        <Route path = "/" element = {<PublicRoute />}>
          <Route path = "/" element = {<Navigate replace to = "/signIn" />} />
          <Route path = "/signIn" element = {<SignIn />} />
          <Route path = "/signUp" element = {<SignUp />} />
        </Route>
        <Route path = "/" element = {<ProtectedRoute />}>
          <Route path = "/dashboard" element = {<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}
