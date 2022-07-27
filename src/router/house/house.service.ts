import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHouseDto } from 'src/core/dto/dto.house';
import { paramDTO } from 'src/core/dto/dto.param';
import { house, houseDocument } from 'src/schema/house.schema';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { verify } from 'src/core/response/verify/verify.token';
import { idBody } from 'src/core/dto/idBody';

@Injectable()
export class HouseService {
  constructor(
    @InjectModel(house.name) private houseModel: Model<houseDocument>,
  ) {}
  // async createHouse(data: CreateHouseDto, param: paramDTO, res: Response) {
  //   const house = data;
  //   let houseID: string;
  //   const a = await this.houseModel.create({
  //     type: house.type,
  //     adress: house.adress,
  //     price: house.price,
  //     user: param.id,
  //   });
  //   return a.id;
  // }

  //create house by user
  async createHouseByUser(data: CreateHouseDto, req: Request, res: Response) {
    const a = req.headers.authorization;
    const id = verify.verifyToken(a);
    const house = await this.houseModel.create({
      type: data.type,
      adress: data.adress,
      price: data.price,
      picture: data.picture,
      describe: data.describe,
      user: id,
    });
    const b = { house: house.id, user: id };
    return b;
  }

  async find(status: string, soft: string, next: NextFunction, res: Response) {
    const data = await this.houseModel.find({ status: status });
    if (data.length === 0) {
      console.log('ko co nha nay');
      throw new NotFoundException('Khong co du lieu');
    }
    console.log(data.length);
    return res.status(200).json(data);
  }
  //get all house by user
  async getAllHouse(id: string, res: Response) {
    const a = await this.houseModel.find({ user: id }).populate({
      path: 'user',
      select: 'fullname',
    });
    if (a.length === 0) {
      return res.status(200).json({
        message: 'ban chua dang nha nao',
      });
    }
    return a;
  }

  //update house
  async updateHouse(data: idBody, req: Request, res: Response) {
    const house = await this.houseModel.findById(data.id);
    if (!house || house.status === '1') {
      return res.status(404).json({
        message: 'nha nay` ko ton tai hoac da duoc duyet',
      });
    }
    await this.houseModel.findByIdAndUpdate(data.id, {
      status: '1',
    });
    return res.status(200).json({
      message: 'success, nha da dc duyet va hien o bang tin',
    });
  }
}
