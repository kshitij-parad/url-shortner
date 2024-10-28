export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { long_url } = req.body;
  
      try {
        const response = await fetch('https://api.t.ly/api/v1/link/shorten', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SHORTURL_API_KEY}`,
          },
          body: JSON.stringify({ long_url }),
        });
  
        const data = await response.json();
        res.status(response.ok ? 200 : 400).json(data);
      } catch (error) {
        res.status(500).json({ error: 'Failed to shorten URL' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  