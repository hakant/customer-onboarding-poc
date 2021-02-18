import { IdCheckStatus } from './onboarding-state';

export interface IdCheckStatusUpdate {
    idCheckWorkflowId: string,
    status: IdCheckStatus
}