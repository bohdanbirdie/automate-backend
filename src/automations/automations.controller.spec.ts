import { Test, TestingModule } from '@nestjs/testing';
import { AutomationsController } from './automations.controller';

describe('Automations Controller', () => {
  let controller: AutomationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AutomationsController],
    }).compile();

    controller = module.get<AutomationsController>(AutomationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
