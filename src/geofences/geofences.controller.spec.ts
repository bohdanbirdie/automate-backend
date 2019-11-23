import { Test, TestingModule } from '@nestjs/testing';
import { GeofencesController } from './geofences.controller';

describe('Geofences Controller', () => {
  let controller: GeofencesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeofencesController],
    }).compile();

    controller = module.get<GeofencesController>(GeofencesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
