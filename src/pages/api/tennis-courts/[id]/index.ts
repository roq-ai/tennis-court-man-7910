import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { tennisCourtValidationSchema } from 'validationSchema/tennis-courts';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.tennis_court
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTennisCourtById();
    case 'PUT':
      return updateTennisCourtById();
    case 'DELETE':
      return deleteTennisCourtById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTennisCourtById() {
    const data = await prisma.tennis_court.findFirst(convertQueryToPrismaUtil(req.query, 'tennis_court'));
    return res.status(200).json(data);
  }

  async function updateTennisCourtById() {
    await tennisCourtValidationSchema.validate(req.body);
    const data = await prisma.tennis_court.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTennisCourtById() {
    const data = await prisma.tennis_court.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
