// ============================================
// Police Syne pour les images générées (aperçu de partage, favicon).
// Récupérée sur Google Fonts au moment du build. Si le réseau n'est pas
// disponible, l'image est générée avec la police par défaut plutôt que
// de faire échouer le build.
// ============================================

export async function loadSyne(weight: 700 | 800): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Syne:wght@${weight}`
    ).then((res) => res.text());

    // Sans user-agent de navigateur, Google renvoie une police TrueType,
    // format que le générateur d'images sait lire (contrairement au woff2).
    const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
    if (!match) return null;

    const font = await fetch(match[1]);
    if (!font.ok) return null;
    return await font.arrayBuffer();
  } catch {
    return null;
  }
}
