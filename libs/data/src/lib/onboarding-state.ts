export interface OnboardingState {
    onboardingId: string,
    intakeId: string,
    idCheckWorkflows: IdCheckWorkflow[],
    contactPhoneNumber: string,
}

export interface IdCheckWorkflow {
    idCheckWorkflowId: string,
    status: IdCheckStatus,
    idCheckIndex: number,
}

export enum IdCheckStatus {
    Initial = "Initial",
    PhotosUploaded = "PhotosUploaded",
    IdCheckStarted = "IdCheckStarted",
    IdCheckTimedOut = "IdCheckTimedOut",
    IdCheckFailed = "IdCheckFailed",
    IdCheckSuccessful = "IdCheckSuccessful",
}