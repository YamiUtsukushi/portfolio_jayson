import { NextResponse } from 'next/server';
import { SITE_URL } from '@/lib/site';

// Échappe le HTML : les champs saisis par le visiteur sont insérés
// dans l'email, ils ne doivent pas pouvoir y injecter de balises.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ============================================
// API CONTACT — POST /api/contact
// Envoie un email via Brevo (ex-Sendinblue)
// Doc : https://developers.brevo.com/reference/sendtransacemail
// ============================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis.' },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide.' },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Le message doit faire au moins 10 caractères.' },
        { status: 400 }
      );
    }

    // Clé absente (variable non configurée sur l'hébergeur) : on le dit
    // clairement dans les logs au lieu d'envoyer une requête vouée à l'échec.
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error('[Contact API] BREVO_API_KEY manquante : configure-la sur l\'hébergeur.');
      return NextResponse.json(
        { error: 'Le formulaire est momentanément indisponible. Écris-moi directement par email.' },
        { status: 503 }
      );
    }

    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safeMessage = escapeHtml(String(message)).replace(/\n/g, '<br>');

    const res = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'Portfolio — Jayson Mooken',
          email: 'jaymooken@gmail.com',
        },
        to: [{ email: 'jaymooken@gmail.com', name: 'Jayson Mooken' }],
        replyTo: { email, name },
        subject: `[Portfolio] Nouveau message de ${name}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8" />
              <style>
                body { font-family: -apple-system, sans-serif; background: #0A0A0F; color: #EDE8FF; margin: 0; padding: 0; }
                .container { max-width: 560px; margin: 40px auto; background: #12101A; border: 1px solid rgba(131,140,229,0.2); border-radius: 16px; overflow: hidden; }
                .header { background: linear-gradient(135deg, #50207A, #6B2FA0); padding: 28px 32px; }
                .header h1 { margin: 0; font-size: 20px; color: #F0EAFF; font-weight: 700; }
                .header p { margin: 6px 0 0; font-size: 13px; color: rgba(214,185,252,0.8); }
                .body { padding: 32px; }
                .field { margin-bottom: 24px; }
                .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #838CE5; margin-bottom: 6px; }
                .value { font-size: 15px; color: #EDE8FF; }
                .message-box { background: rgba(131,140,229,0.06); border: 1px solid rgba(131,140,229,0.15); border-radius: 10px; padding: 16px; font-size: 15px; color: #EDE8FF; line-height: 1.7; white-space: pre-wrap; }
                .footer { border-top: 1px solid rgba(131,140,229,0.1); padding: 20px 32px; font-size: 12px; color: #7A7090; }
                .reply-btn { display: inline-block; margin-top: 20px; padding: 12px 24px; background: linear-gradient(135deg, #50207A, #6B2FA0); color: #F0EAFF; text-decoration: none; border-radius: 8px; font-size: 14px; font-weight: 600; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>✉️ Nouveau message de contact</h1>
                  <p>Portfolio — ${SITE_URL.replace('https://', '')}</p>
                </div>
                <div class="body">
                  <div class="field">
                    <div class="label">Nom</div>
                    <div class="value">${safeName}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email</div>
                    <div class="value">${safeEmail}</div>
                  </div>
                  <div class="field">
                    <div class="label">Message</div>
                    <div class="message-box">${safeMessage}</div>
                  </div>
                  <a href="mailto:${safeEmail}" class="reply-btn">Répondre à ${safeName}</a>
                </div>
                <div class="footer">
                  Ce message a été envoyé depuis le formulaire de contact de ton portfolio.
                </div>
              </div>
            </body>
          </html>
        `,
      }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error('[Brevo error]', errorData);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi. Réessaie dans un moment.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[Contact API error]', err);
    return NextResponse.json(
      { error: 'Erreur serveur inattendue.' },
      { status: 500 }
    );
  }
}
