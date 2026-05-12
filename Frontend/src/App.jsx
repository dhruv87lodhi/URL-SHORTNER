import { useState } from 'react'
import QRCode from 'react-qr-code'
import QRCodeGenerator from "qrcode"

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("")
  const [copied, setCopied] = useState(false);
  const [qrImage, setQrImage] = useState("");
  const [urlFOrClicks, setUrlForClicks] = useState("");
  const [clicks, setClicks] = useState(0);

  const handleShorten = async () => {
    if (!url) return;

    try {
      const response = await fetch(`${API_BASE_URL}/url/shorten`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ originalUrl: url })
      })

      const result = await response.json();
      const newShortenUrl = result.shortUrl;
      setShortUrl(newShortenUrl);
    } catch (err) {
      alert("something wrong")
    }
  }

  const handleSeeClicks = async () => {
    if (!urlFOrClicks) {
      setClicks(0);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/url/clicks/${urlFOrClicks.trim().slice(-7)}`);
      const result = await response.json();

      if(result.error) {
        alert(result.error)
        setClicks(0);
        return;
      }

      const newClicks = result.clicks;
      setClicks(newClicks);
    } catch (error) {
      alert("something wrong");
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      alert("cant copy")
    }
  }

  return (
    <>
      <div className='min-h-screen flex flex-col justify-center items-center'>
        <h1 className='text-4xl font-bold mb-6'>URL SHORTNER</h1>
        <div className='flex flex-col space-y-2 w-4xl mb-4'>
          <input className='border border-white p-2' type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
          <button className='btn btn-primary' onClick={handleShorten}>Shorten</button>
        </div>
        {shortUrl && (
          <div className='flex flex-col space-y-2 w-4xl text-center'>
            <a className='link link-primary break-all' href={shortUrl} target='_blank'>{shortUrl}</a>
            <button onClick={handleCopy} className={`btn ${copied ? "btn-success" : "btn-secondary"}`}>
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        )}
        <div className='w-4xl flex flex-col mt-4'>
          <h3 className='text-2xl font-semibold mb-3 text-center'>See clicks on your shorten url</h3>
          <div className='space-y-2 flex flex-col'>
            <input className='border border-white p-2' type="text" value={urlFOrClicks} onChange={(e) => setUrlForClicks(e.target.value)} />
            <div className='flex justify-between'>
              <button className='w-1/2 btn btn-accent' onClick={handleSeeClicks}>See Clicks</button>
              <div className='btn w-1/2 '>{clicks} Clicks</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
