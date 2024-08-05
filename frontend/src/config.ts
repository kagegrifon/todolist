export type TaskSource = 'localStorage' | 'api'

interface FeatureFlag {
    taskSource: TaskSource
}

export const featureFlag: FeatureFlag = {
    taskSource: 'api',
}

export const BASE_API_URL = 'http://localhost:3000/api'
