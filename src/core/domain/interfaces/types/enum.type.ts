export const OutpatientStatus: {
    FINISHED: 'FINISHED'
    UNFINISHED: 'UNFINISHED'
} = {
    FINISHED: 'FINISHED',
    UNFINISHED: 'UNFINISHED',
}

export type OutpatientStatus = typeof OutpatientStatus[keyof typeof OutpatientStatus]

export const VerificationStatus: {
    ACCEPTED: 'ACCEPTED'
    REJECTED: 'REJECTED'
    PENDING: 'PENDING'
} = {
    ACCEPTED: 'ACCEPTED',
    REJECTED: 'REJECTED',
    PENDING: 'PENDING'
}

export type VerificationStatus = typeof VerificationStatus[keyof typeof VerificationStatus]

export const QueueStatus: {
    WAITING: 'WAITING'
    PROCESSED: 'PROCESSED'
    FINISHED: 'FINISHED'
} = {
    WAITING: 'WAITING',
    PROCESSED: 'PROCESSED',
    FINISHED: 'FINISHED'
}

export type QueueStatus = typeof QueueStatus[keyof typeof QueueStatus]

