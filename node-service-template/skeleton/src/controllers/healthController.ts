import { Request, Response } from 'express';

export const healthController = {
  health: (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
    });
  },

  ready: (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'READY',
      timestamp: new Date().toISOString(),
    });
  },

  live: (_req: Request, res: Response) => {
    res.status(200).json({
      status: 'ALIVE',
      timestamp: new Date().toISOString(),
    });
  },
};
