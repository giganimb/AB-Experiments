export const EXPERIMENT_STATUSES = ['active', 'completed'] as const;

export type TExperimentStatus = (typeof EXPERIMENT_STATUSES)[number];