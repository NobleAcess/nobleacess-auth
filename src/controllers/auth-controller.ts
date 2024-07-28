import { Request, Response } from "express";
import AuthModel from '../models/auth-model';
import FaceApi from "../services/FaceApi";
import NotFoundError from "../errors/NotFoundError";

const MATCH_THRESHOLD = 0.6; // Defina o limite de distância para uma correspondência válida

class AuthController {

  async create(httpRequest: Request, httpResponse: Response) {

    const { name, email, password, face } = httpRequest.body;

    const auth = await AuthModel.findOne({ email }).exec();

    if (auth) {
      return httpResponse.status(400).json({ message: 'Email já cadastrado' });
    }

    const authModel = new AuthModel({
      name,
      email,
      password,
      status: 'A',
      face
    });

    await authModel.save();
    return httpResponse.status(201).json(authModel);
  }

  async findAll(httpRequest: Request, httpResponse: Response) {
    const auth = await AuthModel.find().exec();
    return httpResponse.status(200).json(auth);
  }

  async findById(httpRequest: Request, httpResponse: Response) {
    const { id } = httpRequest.body;
    const auth = await AuthModel.findById(id);
    return httpResponse.status(200).json(auth);
  }

  async updateFace(httpRequest: Request, httpResponse: Response) {
    const { face, id } = httpRequest.body;

    await AuthModel.updateOne({ _id: id }, { face });
    const auth = await AuthModel.findById(id).exec();
    return httpResponse.status(200).json(auth);
  }

  async Authentication(httpRequest: Request, httpResponse: Response) {

    const { face } = httpRequest.body;

    if (!face) {
      throw new NotFoundError('Face não informada');
    }

    const descriptors = JSON.parse(face ? face : '[]');
    const descriptor = new Float32Array(descriptors);

    const faceApi = new FaceApi();
    const faceMatcher = await faceApi.createFaceMatcher();

    const result = faceMatcher.findBestMatch(descriptor);

    if (result.distance <= MATCH_THRESHOLD) {
      return httpResponse.status(200).json({ message: 'Autenticação bem-sucedida', result });
    }
    else {
      return httpResponse.status(401).json({ message: 'Autenticação falhou: face não reconhecida' });
    }
  }
}

export default new AuthController();