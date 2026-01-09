import type { CVData } from "../../domain/cv.types";

export const migrateCVData = (oldData: any): CVData => {
  return {
    ...oldData,
    experiences: oldData?.experiences || [],
    educations: oldData?.educations || [],
    skills: oldData?.skills || [],
    languages: oldData?.languages || [],
    certifications: oldData?.certifications || [],
    personalInfo: {
      ...oldData?.personalInfo,
      contacts: oldData?.personalInfo?.contacts || [],
      socials: oldData?.personalInfo?.socials || [],
    }
  };
};