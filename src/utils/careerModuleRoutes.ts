// Mapping configuration for career coaching routes

export const moduleRoutes: Record<string, string> = {
  "Career Development Planning": "/career-coaching/module/career-development",
  "Leadership Skills": "/career-coaching/module/leadership-skills",
  "Resume & Interview Prep": "/career-coaching/module/resume-building",
  "Goal Setting & Achievement": "/career-coaching/module/goal-setting",
};

export const courseRoutes: Record<string, string> = {
  "Leadership Fundamentals": "/career-coaching/course/leadership-fundamentals",
  "Strategic Communication": "/career-coaching/course/strategic-communication",
  "Remote Team Management": "/career-coaching/course/remote-team-management",
};

export const resourceRoutes: Record<string, string> = {
  "Career Path Assessment": "/career-coaching/resource/career-assessment",
  "Resume Templates": "/career-coaching/resource/template-library",
  "Interview Simulator": "/career-coaching/resource/interview-simulator",
  "Goal Planning Worksheet": "/career-coaching/resource/goal-planner",
};

export const getModuleRoute = (title: string): string => {
  return moduleRoutes[title] || "/career-coaching";
};

export const getCourseRoute = (title: string): string => {
  return courseRoutes[title] || "/career-coaching";
};

export const getResourceRoute = (title: string): string => {
  return resourceRoutes[title] || "/career-coaching";
};
