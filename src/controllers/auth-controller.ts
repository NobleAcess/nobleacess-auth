import { Request, Response } from "express";
import AuthModel from '../models/auth-model';
import FaceApi from "../services/faceApi-service";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../errors";
import { POST, GET } from "../decorators/http-decorators";

const MATCH_THRESHOLD = 0.6; // Defina o limite de distância para uma correspondência válida

class AuthController {

  @POST()
  async create(httpRequest: Request) {

    const { name, email, password, face } = httpRequest.body;

    const auth = await AuthModel.findOne({ email }).exec();

    if (auth) {
      throw new BadRequestError('Email já cadastrado');
    }

    const authModel = new AuthModel({
      name,
      email,
      password,
      status: 'A',
      face
    });

    await authModel.save();
    return authModel;
  }

  @GET()
  async findAll() {
    return await AuthModel.find().exec();
  }

  @GET()
  async findById(httpRequest: Request) {
    const { id } = httpRequest.params;
    return await AuthModel.findById(id).exec();
  }

  @GET()
  async updateFace(httpRequest: Request) {
    const { face, id } = httpRequest.body;

    await AuthModel.updateOne({ _id: id }, { face });
    return await AuthModel.findById(id).exec();
  }

  @GET()
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
      return { message: 'Autenticação bem-sucedida', result };
    }
    else {
      throw new UnauthorizedError('Autenticação falhou: face não reconhecida');
    }
  }
}

export default new AuthController();