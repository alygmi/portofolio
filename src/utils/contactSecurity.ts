/**
 * Anti-Scraper & Contact Obfuscation Utility
 *
 * Menyimpan informasi sensitif (Email & Nomor Telepon) dalam bentuk char-code chunks
 * sehingga bot scraper yang melakukan regex scan pada file HTML / JS statis
 * tidak akan menemukan pola email (@gmail.com) atau nomor telepon (+62...).
 * Data hanya di-decode di memori browser setelah user lolos verifikasi Cloudflare Turnstile.
 */

// Masked representation yang aman ditampilkan sebelum verifikasi Turnstile
export const MASKED_CONTACT = {
  email: 'nurrusuli••••••••@gmail.com',
  phoneDisplay: '+62 857-••••-5732',
};

// Char codes untuk "nurrusulialadiyat" dan "gmail.com" (dipisah agar tidak terdeteksi regex email)
const EMAIL_USER_CODES = [110, 117, 114, 114, 117, 115, 117, 108, 105, 97, 108, 97, 100, 105, 121, 97, 116];
const EMAIL_DOMAIN_CODES = [103, 109, 97, 105, 108, 46, 99, 111, 109];

// Char codes untuk "+62 857-4586-5732" dan "6285745865732"
const PHONE_DISPLAY_CODES = [43, 54, 50, 32, 56, 53, 55, 45, 52, 53, 56, 54, 45, 53, 55, 51, 50];
const PHONE_WA_CODES = [54, 50, 56, 53, 55, 52, 53, 56, 54, 53, 55, 51, 50];

function decodeCodes(codes: number[]): string {
  return String.fromCharCode(...codes);
}

export interface UnlockedContact {
  email: string;
  phoneDisplay: string;
  whatsappUrl: string;
  mailtoUrl: string;
}

export function revealProtectedContact(turnstileToken: string | null): UnlockedContact | null {
  if (!turnstileToken || turnstileToken.trim().length === 0) {
    return null;
  }

  const emailUser = decodeCodes(EMAIL_USER_CODES);
  const emailDomain = decodeCodes(EMAIL_DOMAIN_CODES);
  const email = `${emailUser}${String.fromCharCode(64)}${emailDomain}`;
  const phoneDisplay = decodeCodes(PHONE_DISPLAY_CODES);
  const phoneWa = decodeCodes(PHONE_WA_CODES);

  const greeting = encodeURIComponent(
    'Halo Al Adiyat, saya melihat website portofolio Anda dan tertarik untuk berdiskusi lebih lanjut.'
  );

  return {
    email,
    phoneDisplay,
    whatsappUrl: `https://wa.me/${phoneWa}?text=${greeting}`,
    mailtoUrl: `mailto:${email}?subject=${encodeURIComponent('Opportunity / Collaboration — via Portfolio')}`,
  };
}
