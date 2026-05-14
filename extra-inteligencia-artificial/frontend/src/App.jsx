import { Routes, Route, useLocation } from "react-router"
import { lazy, Suspense, useState } from "react"

import { Header } from "./components/Header.jsx"
import { Footer } from "./components/Footer.jsx"
import { Spinner } from "./components/Spinner.jsx"

import { ProtectedRoute } from "./components/ProtectedRoute.jsx"

const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))
const DetailPage = lazy(() => import('./pages/Detail.jsx'))
const SignInPage = lazy(() => import('./pages/SignIn.jsx'))
const SignUpPage = lazy(() => import('./pages/SignUp.jsx'))
const ProfilePage = lazy(() => import('./pages/Profile.jsx'))
const NotFoundPage = lazy(() => import('./pages/404.jsx'))
const PageTransition = lazy(() => import('./components/PageTransition.jsx'))


function App() {
  const { pathname } = useLocation();

  return (
    <>
      <Header />
      <Suspense fallback={ <Spinner/> }>
        <PageTransition key={pathname}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/profile" element={
                <ProtectedRoute redirectTo='/signin'>
                  <ProfilePage />
                </ProtectedRoute>     
              } 
            />
            <Route path="/jobs/:jobId" element={<DetailPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </PageTransition>
      </Suspense>
      <Footer />
    </>
  )
}

export default App