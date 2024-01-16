import express, { Request, Response } from 'express';


const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

router.get('/', (req: Request, res: Response) => {
  res.send({"data": "this is my data", "title": "About Page"});
});

export default router;
