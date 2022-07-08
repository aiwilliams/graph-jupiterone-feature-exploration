import {
  IntegrationStep,
  IntegrationStepExecutionContext,
} from '@jupiterone/integration-sdk-core';
import { IntegrationConfig } from '../../config';
import { AcmeUser } from '../../types';
import { Entities, Relationships, Steps } from '../constants';
import {
  createAccountEntity,
  createAccountUserRelationship,
  createUserEntity,
} from './converter';

export async function executionHandler({
  jobState,
}: IntegrationStepExecutionContext<IntegrationConfig>) {
  const accountEntity = await jobState.addEntity(createAccountEntity());

  const users: AcmeUser[] = [
    {
      id: 'acme-user-1',
      name: 'User One',
    },
    {
      id: 'acme-user-2',
      name: 'User Two',
    },
  ];

  for (const user of users) {
    const userEntity = await jobState.addEntity(createUserEntity(user));
    await jobState.addRelationship(
      createAccountUserRelationship(accountEntity, userEntity),
    );
  }
}

export const recentlyDeletedSteps: IntegrationStep<IntegrationConfig>[] = [
  {
    id: Steps.RECENTLY_DELETED,
    name: 'Recently Deleted',
    entities: [Entities.ACCOUNT, Entities.USER],
    relationships: [Relationships.ACCOUNT_HAS_USER],
    dependsOn: [],
    executionHandler,
  },
];
