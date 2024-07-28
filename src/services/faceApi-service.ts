import * as faceapi from 'face-api.js';
import AuthModel from '../models/auth-model';

export default class FaceApi {
  private static faceMatcher: faceapi.FaceMatcher | null = null;

  async getLabeledFaceDescriptors(): Promise<faceapi.LabeledFaceDescriptors[]> {
    const auths = await AuthModel.find({ face: { $exists: true, $ne: null } }).exec();

    return auths.map(row => {
      const descriptors = JSON.parse(row.face ? row.face : '[]');
      const descriptor = new Float32Array(descriptors);
      console.log('Discritores carregados:', descriptor);
      return new faceapi.LabeledFaceDescriptors(row.name, [descriptor]);
    });
  }

  async createFaceMatcher() {
    if (!FaceApi.faceMatcher) {
      const labeledDescriptors = await this.getLabeledFaceDescriptors();
      FaceApi.faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
    }
    return FaceApi.faceMatcher;
  }

}