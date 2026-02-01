import Swal from 'sweetalert2';
import type { CVData } from '../domain/cv.types';

export const saveCvToJson = (data: CVData) => {
  try {
    if (!data || Object.keys(data).length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Il n’y a aucune donnée à sauvegarder.',
        confirmButtonColor: '#3b82f6',
      });
      return;
    }

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    const fileName = `mon-cv-${new Date().toLocaleDateString()}.json`;
    
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    Swal.fire({
      icon: 'success',
      title: 'Sauvegardé !',
      text: 'Votre configuration CV a été téléchargée avec succès.',
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      timerProgressBar: true,
    });

  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oups...',
      text: 'Une erreur est survenue lors de la génération du fichier.',
    });
    console.error(error);
  }
};