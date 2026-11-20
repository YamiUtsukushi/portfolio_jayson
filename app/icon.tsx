import { ImageResponse } from 'next/og';
import { loadSyne } from '@/lib/og-font';

// ============================================
// FAVICON — monogramme « J » aux couleurs du site
// (remplace le favicon Next.js par défaut)
// ============================================

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default async function Icon() {
  const syne800 = await loadSyne(800);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 14,
          background: 'linear-gradient(135deg, #50207A 0%, #838CE5 100%)',
          color: '#F0EAFF',
          fontSize: 44,
          fontWeight: 800,
          fontFamily: 'Syne',
        }}
      >
        J
      </div>
    ),
    {
      ...size,
      fonts: syne800 ? [{ name: 'Syne', data: syne800, weight: 800, style: 'normal' }] : [],
    }
  );
}
