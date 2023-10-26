export const timelineFormatDate = (date: string) => {
    return date /*new Date(date)
    /*.toLocaleDateString('es-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })*/
}

export const timelineFormatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
    })
}


export function formatDateToYYYYMMDD(isoDate: string): string  {
    const date = new Date(isoDate);     
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }