/* eslint-disable prettier/prettier */
enum TaskStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}

export class ServiceTask {
    id: string
    name: string
    description: string
    status: TaskStatus
    createdAt: Date
    updatedAt: Date
}

