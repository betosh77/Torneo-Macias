export async function getMatches() {
    const res = await fetch("https://script.google.com/macros/s/AKfycbw3qbrd2LEmCgIc_O3uXLWV1ssUA_YT6AxmJFdN-tNsUEMCITAovSfcb3SvKAyebnji/exec");
  
    if (!res.ok) {
      throw new Error("Error al obtener partidos");
    }
  
    return res.json();
  }