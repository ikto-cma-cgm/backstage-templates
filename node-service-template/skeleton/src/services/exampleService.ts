import { Request, Response } from 'express';

export const exampleController = {
  getInfo: (_req: Request, res: Response) => {
    res.json({
      service: '${{ values.name }}',
      message: 'Service ${{ values.name }} running',
    });
  },
};
