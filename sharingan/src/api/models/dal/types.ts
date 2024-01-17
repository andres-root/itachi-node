interface ListFilters {
  isDeleted?: boolean;
  includeDeleted?: boolean;
}

export interface GetAllJobsFilter extends ListFilters {}
