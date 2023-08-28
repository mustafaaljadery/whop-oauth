import { WhopSDK } from "@whop-sdk/core"
import { User } from "@whop-sdk/core"
import type { GetServerSidePropsContext } from "next"
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./auth"
import { GetServerSideProps } from "next";

export type UserProps = {
  user: User | null;
}

const getSdk = async (
  req: GetServerSidePropsContext["req"],
  res: GetServerSidePropsContext["res"]
) => {
  const session: any = await unstable_getServerSession(req, res, authOptions);
  if (!session) return {};
  return {
    sdk: new WhopSDK({ TOKEN: session.accessToken }).userOAuth,
    user: session.user,
  };
};

const getServerSideProps: GetServerSideProps<UserProps> = async ({
  req,
  res
}) => {
  const { sdk } = await getSdk(req, res);

  const user = await sdk?.retrieveUsersProfile({});
  return {
    props: {
      user: user || null,
    },
  };
}

export default getServerSideProps;