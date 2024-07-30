export type TaskSource = 'localStorage' | 'api'

interface FeatureFlag {
    taskSource: TaskSource
}

export const featureFlag: FeatureFlag = {
    taskSource: 'api',
}
