import { ImageResponse } from 'next/og';
import { loadSyne } from '@/lib/og-font';

// ============================================
// IMAGE D'APERÇU — affichée quand le lien du site est partagé
// (LinkedIn, Slack, WhatsApp…). Générée au build, 1200 × 630.
// ============================================

export const alt = 'Jayson Mooken — Développeur Full Stack JavaScript';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const syne800 = await loadSyne(800);
  const syne700 = await loadSyne(700);

  const fonts = [
    ...(syne800 ? [{ name: 'Syne', data: syne800, weight: 800 as const, style: 'normal' as const }] : []),
    ...(syne700 ? [{ name: 'Syne', data: syne700, weight: 700 as const, style: 'normal' as const }] : []),
  ];

  const tags = ['React', 'Node.js', 'PostgreSQL', 'TypeScript', 'DevOps'];

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 80px',
          background: '#0A0A0F',
          backgroundImage:
            'radial-gradient(circle at 12% 18%, rgba(80,32,122,0.55) 0%, transparent 45%), radial-gradient(circle at 92% 8%, rgba(131,140,229,0.28) 0%, transparent 40%), radial-gradient(circle at 85% 95%, rgba(214,185,252,0.12) 0%, transparent 45%)',
          color: '#EDE8FF',
          fontFamily: 'Syne',
        }}
      >
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 48, height: 2, background: '#838CE5' }} />
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 6,
              textTransform: 'uppercase',
              color: '#838CE5',
            }}
          >
            Prêt à rejoindre votre équipe
          </div>
        </div>

        {/* Nom + rôle */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Syne 800 est très large : taille calibrée pour tenir dans 1040 px */}
          {/* Pas de letter-spacing négatif : le générateur mesure mal la largeur
              de Syne 800 avec, et les deux mots se chevauchaient */}
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 800, lineHeight: 1 }}>
            <div style={{ display: 'flex' }}>Jayson</div>
            <div style={{ display: 'flex', marginLeft: 40, color: '#D6B9FC' }}>Mooken</div>
          </div>
          <div style={{ marginTop: 24, fontSize: 44, fontWeight: 700, color: '#EDE8FF' }}>
            Développeur Full Stack JavaScript
          </div>
          <div style={{ marginTop: 12, fontSize: 30, fontWeight: 700, color: '#7A7090' }}>
            Bac+5 mention TB · CDI / CDD · Île-de-France & remote
          </div>
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 14 }}>
          {tags.map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                padding: '10px 22px',
                borderRadius: 12,
                border: '2px solid rgba(131,140,229,0.35)',
                background: 'rgba(80,32,122,0.35)',
                fontSize: 26,
                fontWeight: 700,
                color: '#D6B9FC',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts }
  );
}
