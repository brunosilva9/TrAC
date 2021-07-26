export const baseUserConfig = {
  SHOW_PROGRESS_STUDENT_CYCLE: false,
  SHOW_DROPOUT: false,
  SHOW_DOWNLOAD: false,
  SHOW_GROUPED_VIEW: false,
  SHOW_STUDENT_COMPLEMENTARY_INFORMATION: false,
  SHOW_GROUPED_COMPLEMENTARY_INFO: false,
  SHOW_STUDENT_LIST: false,
  FOREPLAN: false,
  FOREPLAN_ADVICES_COMPARE_BY_PERFORMANCE: false,
  FOREPLAN_COURSE_STATS: false,
  FOREPLAN_COURSE_FAIL_RATE_STATS: true,
  FOREPLAN_COURSE_EFFORT_STATS: true,
  FOREPLAN_SUMMARY_LIST: false,
  FOREPLAN_SUMMARY_BADGES: true,
  FOREPLAN_SUMMARY_WAFFLE_CHART: true,
  FOREPLAN_SUMMARY_ADVICE: true,
  FOREPLAN_FUTURE_COURSE_PLANIFICATION: true,
  FOREPLAN_PREDICT_CURRENT_COURSE: true,
  FEEDBACK: true,
};

export type UserConfig = typeof baseUserConfig &
  Record<string, boolean | string | number>;
