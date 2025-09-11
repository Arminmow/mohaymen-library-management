import { InjectionToken } from '@angular/core';
import { User } from '../../stores/users.store';

export interface ModalServiceAbstraction {
  confirmDelete(user: User): void;
  confirmRoleChange(user: User, newRole: User['role']): void;
}

export const MODAL_ABSTRACTION = new InjectionToken<ModalServiceAbstraction>('MODAL_ABSTRACTION');
