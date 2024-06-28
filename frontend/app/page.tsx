import React from 'react';
import { verifySession } from './_libs/session';
import { redirect } from 'next/navigation';
import AuthPage from './_components/AuthPage';

const Home = async () => {
  const { authorized } = await verifySession();
  console.log(authorized);
  if (authorized) {
    redirect('/dashboard');
  }

  return (
    <AuthPage authorized={authorized} />
  );
};

export default Home;