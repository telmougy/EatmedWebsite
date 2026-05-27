import Link from 'next/link';

export default function RootNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          padding: '4rem 1rem',
          textAlign: 'center',
          background: '#fff',
          color: '#0f172a',
          minHeight: '100vh',
        }}
      >
        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>404 — Not Found</h1>
        <p style={{ marginTop: '1rem', color: '#64748b' }}>
          The page you are looking for does not exist.
        </p>
        <p style={{ marginTop: '1.5rem' }}>
          <Link
            href="/"
            style={{
              color: '#16a34a',
              fontWeight: 600,
              textDecoration: 'underline',
            }}
          >
            Go home
          </Link>
        </p>
      </body>
    </html>
  );
}
