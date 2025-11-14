import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState('')
  const [queryCity, setQueryCity] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const query = city.trim()
    if (!query) {
      setError('Informe uma cidade.')
      setData(null)
      return
    }
    setQueryCity(query)
  }

  useEffect(() => {
    if (!queryCity) return
    setLoading(true)
    setError('')
    setData(null)

    fetch(`https://wttr.in/${encodeURIComponent(queryCity)}?format=j1`)
      .then((res) => {
        if (!res.ok) throw new Error('Falha ao buscar clima')
        return res.json()
      })
      .then((json) => {
        const current = json.current_condition?.[0]
        setData({
          tempC: current?.temp_C,
          feelsLikeC: current?.FeelsLikeC,
          desc: current?.weatherDesc?.[0]?.value,
          humidity: current?.humidity,
          windKmph: current?.windspeedKmph,
        })
      })
      .catch(() => {
        setError('Não foi possível obter o clima. Tente novamente.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [queryCity])

  return (
    <div className="container">
      <h1>Clima Simples</h1>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Digite a cidade (ex: São Paulo)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {loading && <p>Carregando...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <div className="card">
          <h2>{queryCity}</h2>
          <p><strong>Condição:</strong> {data.desc}</p>
          <p><strong>Temperatura:</strong> {data.tempC} °C</p>
          <p><strong>Sensação:</strong> {data.feelsLikeC} °C</p>
          <p><strong>Umidade:</strong> {data.humidity}%</p>
          <p><strong>Vento:</strong> {data.windKmph} km/h</p>
        </div>
      )}
    </div>
  )
}

export default App