import {
  createDirectRelationship,
  createIntegrationEntity,
  Entity,
  Relationship,
  RelationshipClass,
} from '@jupiterone/integration-sdk-core';

import { Entities } from '../constants';
import { AcmeUser } from '../../types';

export function createAccountEntity(): Entity {
  return createIntegrationEntity({
    entityData: {
      source: {
        id: 'acme-unique-account-id',
        name: 'Example Co. Acme Account',
      },
      assign: {
        _key: 'acme-unique-account-id',
        _type: Entities.ACCOUNT._type,
        _class: Entities.ACCOUNT._class,
        mfaEnabled: true,
        // This is a custom property that is not a part of the data model class
        // hierarchy. See: https://github.com/JupiterOne/data-model/blob/master/src/schemas/Account.json
        manager: 'Manager Name',
      },
    },
  });
}

export function createUserEntity(user: AcmeUser): Entity {
  return createIntegrationEntity({
    entityData: {
      source: user,
      assign: {
        _type: Entities.USER._type,
        _class: Entities.USER._class,
        _key: user.id,
        username: 'testusername',
        email: 'test@test.com',
        active: true, // this is a required property
        // This is a custom property that is not a part of the data model class
        // hierarchy. See: https://github.com/JupiterOne/data-model/blob/master/src/schemas/User.json
        firstName: 'John',
      },
    },
  });
}

export function createAccountUserRelationship(
  account: Entity,
  user: Entity,
): Relationship {
  return createDirectRelationship({
    _class: RelationshipClass.HAS,
    from: account,
    to: user,
  });
}
