import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';

import GitHubProvider from 'next-auth/providers/github';
import prisma from '../../../lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, authOptions);
export default authHandler;

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
};