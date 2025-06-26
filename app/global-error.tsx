'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A1628',
          color: 'white',
          padding: '20px',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <div style={{
            maxWidth: '500px',
            textAlign: 'center',
            backgroundColor: '#1E3A5F',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
          }}>
            <h1 style={{ fontSize: '24px', marginBottom: '16px' }}>
              Critical Application Error
            </h1>
            <p style={{ marginBottom: '24px', opacity: 0.8 }}>
              The application encountered a critical error and cannot recover automatically.
            </p>
            <button
              onClick={() => reset()}
              style={{
                backgroundColor: '#F4A261',
                color: '#0A1628',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Reload Application
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}