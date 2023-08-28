import Image from 'next/image';
import Head from 'next/head';
import { UserProps } from '@/lib/get-user';
import { NextPage } from 'next';
import { signIn, signOut } from 'next-auth/react';

const Page: NextPage<UserProps> = ({ user }) => {
  return (
    <>
      <Head>
        <title>Whop OAuth Demo</title>
      </Head>
      <main className="h-screen w-screen flex flex-col justify-center items-center">
        <h1 className="text-3xl font-semibold text-[#363636]">
          Whop OAuth Demo
        </h1>
        {user ? (
          <div className="flex flex-col justify-center items-center mt-6">
            <p className="text-gray-500">Welcome Back!</p>
            <div className="flex mt-8 flex-row space-x-4">
              <img
                height={58}
                width={58}
                className="my-auto rounded-full"
                src={user?.profile_pic_url}
              />
              <div className="my-auto flex flex-col space-y-0.5">
                <p className="font-medium text-[#363636]">
                  {user.email}
                </p>
                <p className="text-sm font-regular text-gray-500">
                  @{user.username}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                signOut();
              }}
              className="mt-8 font-medium text-white hover:opacity-90 px-4 py-1 rounded bg-[#FF623D]"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center mt-4">
            <p className="text-gray-500">
              You aren't signed in, sign in with Whop to continue!
            </p>
            <button
              onClick={() => {
                signIn('whop');
              }}
              className="mt-8 hover:opacity-90 px-4 py-1 rounded bg-[#FF6243] text-white font-medium"
            >
              Sign In
            </button>
          </div>
        )}
      </main>
    </>
  );
};

export default Page;

export { default as getServerSideProps } from '@/lib/get-user';
