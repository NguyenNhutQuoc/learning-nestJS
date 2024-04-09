import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base-service';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProfileInput } from './dto/create-profile.input';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ProfileService extends BaseService<Profile> {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super(profileRepository);
  }

  async create(profile: CreateProfileInput): Promise<Profile> {
    const newProfile = this.profileRepository.create({
      firstName: profile.firstName,
      lastName: profile.lastName,
      age: profile.age,
      gender: profile.gender,
      phoneNumber: profile.phoneNumber,
      email: profile.email,
      address: profile.address,
      user: { id: profile.userId },
    });

    const id = profile.userId;

    const profileResult = await this.profileRepository.save(newProfile);

    if (profileResult) {
      const userResult = await this.usersRepository.findOne({
        where: { id },
      });

      if (userResult) {
        userResult.profile = profileResult;
        await this.usersRepository.save(userResult);
      }
    }
    return profileResult;
  }
}
