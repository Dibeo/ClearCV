import Swal from "sweetalert2";
import { getBase64ImageFromURL } from "../../utils/imageUtils";
import { exportCvPdf } from "./cv-export.service";
import type { TFunction } from "i18next";
import type { CVData } from "../../domain/cv.types";

export const handleCvExport = async (data: CVData, t: TFunction) => {
  if (!data.personalInfo.fullName) {
    return Swal.fire({ 
      icon: "warning", 
      title: t("topbar.alerts.warning"), 
      text: t("topbar.alerts.name_required") 
    });
  }

  Swal.fire({ 
    title: t("topbar.alerts.preparing"), 
    icon: "info", 
    timer: 2000, 
    showConfirmButton: false, 
    didOpen: () => Swal.showLoading() 
  });

  try {
    const dataForPdf = structuredClone(data);
    if (data.personalInfo.photoUrl?.startsWith("http")) {
      dataForPdf.personalInfo.photoUrl = await getBase64ImageFromURL(data.personalInfo.photoUrl).catch(() => data.personalInfo.photoUrl);
    }
    await exportCvPdf(dataForPdf);
  } catch (error) {
    Swal.fire({ icon: "error", title: t("topbar.alerts.error"), text: t("alerts.export_failed") });
    console.error(error);
  }
};