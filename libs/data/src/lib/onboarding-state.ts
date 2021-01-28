export interface OnboardingState {
    onboardingId: string,
    intakeId: string,
    idCheckWorkflows: IdCheckWorkflow[]
}

export interface IdCheckWorkflow {
    idCheckWorkflowId: string,
    status: IdCheckStatus
}

export enum IdCheckStatus {
    Initial = "Initial",
    PhotosUploaded = "PhotosUploaded",
    IdCheckStarted = "IdCheckStarted",
    IdCheckTimedOut = "IdCheckTimedOut",
    IdCheckFailed = "IdCheckFailed",
    IdCheckSuccessful = "IdCheckSuccessful"
}