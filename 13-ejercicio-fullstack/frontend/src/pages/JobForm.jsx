import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Spinner } from '../components/Spinner.jsx'
import styles from './Profile.module.css'

const API_URL = import.meta.env.VITE_API_URL

const EMPTY_FORM = {
  title: '',
  company: '',
  location: '',
  description: '',
  data: {
    modality: 'remote',
    level: 'junior',
    technology: []
  },
  content: {
    description: '',
    responsibilities: '',
    requirements: '',
    about: ''
  }
}

export default function JobFormPage() {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const isEditing = Boolean(jobId)

  const [form, setForm] = useState(EMPTY_FORM)
  const [techInput, setTechInput] = useState('')
  const [loading, setLoading] = useState(isEditing)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEditing) return
    fetch(`${API_URL}/jobs/${jobId}`)
      .then(res => res.json())
      .then(job => setForm(job))
      .finally(() => setLoading(false))
  }, [jobId])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleDataChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, data: { ...prev.data, [name]: value } }))
  }

  const handleContentChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, content: { ...prev.content, [name]: value } }))
  }

  const handleAddTech = () => {
    if (!techInput.trim()) return
    setForm(prev => ({
      ...prev,
      data: { ...prev.data, technology: [...prev.data.technology, techInput.trim()] }
    }))
    setTechInput('')
  }

  const handleRemoveTech = (tech) => {
    setForm(prev => ({
      ...prev,
      data: { ...prev.data, technology: prev.data.technology.filter(t => t !== tech) }
    }))
  }

  const handleSubmit = async () => {
    setSaving(true)
    const method = isEditing ? 'PATCH' : 'POST'
    const url = isEditing ? `${API_URL}/jobs/${jobId}` : `${API_URL}/jobs`

    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    setSaving(false)
    navigate('/manage-jobs')
  }

  if (loading) return <Spinner />

  return (
    <div className={styles.layout}>
      <main className={styles.main}>
        <header className={styles.mainHeader}>
          <h1>{isEditing ? 'Editar Job' : 'Nuevo Job'}</h1>
        </header>

        <div className={styles.formWrapper}>

          <section className={styles.section}>
            <h2>Información básica</h2>
            <div className={styles.field}>
              <label className={styles.label}>Título</label>
              <input className={styles.input} name="title" value={form.title} onChange={handleChange} placeholder="Frontend Developer" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Empresa</label>
              <input className={styles.input} name="company" value={form.company} onChange={handleChange} placeholder="Tech Corp" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Ubicación</label>
              <input className={styles.input} name="location" value={form.location} onChange={handleChange} placeholder="Madrid, España" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Descripción corta</label>
              <input className={styles.input} name="description" value={form.description} onChange={handleChange} placeholder="Breve descripción del puesto" />
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label className={styles.label}>Modalidad</label>
                <select className={styles.input} name="modality" value={form.data.modality} onChange={handleDataChange}>
                  <option value="remote">Remoto</option>
                  <option value="onsite">Presencial</option>
                  <option value="hybrid">Híbrido</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Nivel</label>
                <select className={styles.input} name="level" value={form.data.level} onChange={handleDataChange}>
                  <option value="junior">Junior</option>
                  <option value="mid">Mid</option>
                  <option value="senior">Senior</option>
                </select>
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <h2>Tecnologías</h2>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                className={styles.input}
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                placeholder="React, Node.js..."
                onKeyDown={e => e.key === 'Enter' && handleAddTech()}
              />
              <button onClick={handleAddTech}>Agregar</button>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {form.data.technology.map(tech => (
                <span key={tech} className='tag' onClick={() => handleRemoveTech(tech)} style={{ cursor: 'pointer' }}>
                  {tech} ✕
                </span>
              ))}
            </div>
          </section>

          <section className={styles.section}>
            <h2>Contenido detallado</h2>
            <div className={styles.field}>
              <label className={styles.label}>Descripción completa</label>
              <textarea className={styles.textarea} name="description" value={form.content.description} onChange={handleContentChange} rows={4} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Responsabilidades</label>
              <textarea className={styles.textarea} name="responsibilities" value={form.content.responsibilities} onChange={handleContentChange} rows={4} placeholder="- Responsabilidad 1&#10;- Responsabilidad 2" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Requisitos</label>
              <textarea className={styles.textarea} name="requirements" value={form.content.requirements} onChange={handleContentChange} rows={4} placeholder="- Requisito 1&#10;- Requisito 2" />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Acerca de la empresa</label>
              <textarea className={styles.textarea} name="about" value={form.content.about} onChange={handleContentChange} rows={3} />
            </div>
          </section>

          <div className={styles.formFooter}>
            <button onClick={() => navigate('/manage-jobs')} style={{ marginRight: '0.5rem' }}>Cancelar</button>
            <button onClick={handleSubmit} disabled={saving}>
              {saving ? 'Guardando...' : isEditing ? 'Guardar cambios' : 'Crear job'}
            </button>
          </div>

        </div>
      </main>
    </div>
  )
}