import { Injectable } from '@nestjs/common';
import { CreateUserSettingInput } from './dto/create-user-setting.input';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSetting } from './entities/user-setting.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { BaseService } from 'src/common/base/base-service';

@Injectable()
export class UserSettingsService extends BaseService<UserSetting> {
  constructor(
    @InjectRepository(UserSetting)
    private userSettingsRepository: Repository<UserSetting>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super(userSettingsRepository);
  }

  /**
   * Creates a new user setting.
   *
   * @param createUserSettingInput - The input data for creating a new user setting.
   * @returns The newly created user setting.
   */
  async create(
    createUserSettingInput: CreateUserSettingInput,
  ): Promise<UserSetting> {
    const userSetting = this.userSettingsRepository.create({
      name: createUserSettingInput.name,
      receiveEmails: createUserSettingInput.receiveEmails,
      receivePushNotifications: createUserSettingInput.receivePushNotifications,
      receiveSmsNotifications: createUserSettingInput.receiveSmsNotifications,
      receiveTextMessages: createUserSettingInput.receiveTextMessages,
      receiveVoiceMessages: createUserSettingInput.receiveVoiceMessages,
      user: {
        id: createUserSettingInput.userId,
      },
    });

    const savedUserSetting =
      await this.userSettingsRepository.save(userSetting);

    return this.userSettingsRepository.findOne({
      where: { id: savedUserSetting.id },
      relations: ['user'],
    });
  }

  async findAll(): Promise<UserSetting[]> {
    return await this.userSettingsRepository.find();
  }

  async findOne(id: string) {
    const userSetting = await this.userSettingsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    return userSetting;
  }

  remove(id: string) {
    return `This action removes a #${id} userSetting`;
  }

  async getUser(userSettingId: string) {
    const userSetting = await this.userSettingsRepository.findOne({
      where: { id: userSettingId },
      relations: ['user'],
    });

    return userSetting.user;
  }
}
