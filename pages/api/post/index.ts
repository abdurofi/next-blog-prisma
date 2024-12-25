import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import { authOptions } from '../auth/[...nextAuth]';
import { getServerSession } from 'next-auth';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
 const { title, content } = req.body;
 const { user } = await getServerSession(
  req,
  res,
  authOptions
 );
 const result = await prisma.post.create({
  data: {
   title: title,
   content: content,
   author: { connect: { email: user?.email } },
  },
 });
 res.json(result);
}