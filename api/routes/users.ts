import express from 'express';
import UserModel from '../models/user';
import { User } from '../../src/app/interfaces/user';
import bcrypt from 'bcryptjs';
const router = express.Router();
router.post('/', async (req, res) => {
  const encrytedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await UserModel.create({
    ...req.body,
    password: encrytedPassword,
  });
  res.send({ _id: user._id, firstname: user.firstname, surname: user.surname });
});
router.post('/login', async (req, res) => {
  const user = req.body as Pick<User, 'username' | 'password'>;
  console.log(user);
  const isUser = await UserModel.findOne({ username: user.username });
  if (!!isUser) {
    const encryptedPassword = await bcrypt.compare(
      user.password,
      isUser.password
    );
    if (encryptedPassword) {
      res.send({
        status: true,
        data: {
          _id: isUser._id,
          firstname: isUser.firstname,
          surname: isUser.surname,
        },
      });
    } else {
      res.send({ status: false });
    }
  } else {
    res.send({ status: false });
  }
});

export default router;
