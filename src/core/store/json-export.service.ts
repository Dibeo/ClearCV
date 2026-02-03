import Swal from 'sweetalert2';
import type { CVData } from '../domain/cv.types';
import type { TFunction } from 'i18next';

export const saveCvToJson = (data: CVData, t: TFunction) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      Swal.fire({
        icon: 'error',
        title: t('topbar.errors.title'),
        text: t('topbar.errors.noData'),
        confirmButtonColor: '#3b82f6',
      });
      return;
    }

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    const fileName = `${t('topbar.file.name')}-${new Date().toLocaleDateString()}.json`;
    
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    Swal.fire({
      icon: 'success',
      title: t('topbar.success.saved'),
      text: t('topbar.success.downloaded'),
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      timerProgressBar: true,
    });

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: t('topbar.errors.oops'),
      text: t('topbar.errors.generationFailed'),
    });
    console.error(error);
  }
};

export const importCvFromJson = (file: File, updateData: (data: CVData) => void, t: TFunction) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      const parsedData = JSON.parse(content);

      updateData(parsedData);

      Swal.fire({
        icon: 'success',
        title: t('topbar.success.imported'),
        text: t('topbar.success.dataLoaded'),
        timer: 2000,
        showConfirmButton: false,
        toast: true,
        position: 'top-end',
      });
    } catch (error) {
      Swal.fire({ 
        icon: 'error', 
        title: t('topbar.errors.title'), 
        text: t('topbar.errors.invalidJson') 
      });
      console.error(error);
    }
  };
  reader.readAsText(file);
};