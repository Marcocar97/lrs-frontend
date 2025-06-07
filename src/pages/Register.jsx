import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    position: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://api.liquidwaterproofingacademy.com/api/register', form);
      alert(res.data.message); // o navegar al login
    } catch (err) {
      alert(err.response?.data?.message || 'Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Nombre" value={form.name} onChange={handleChange} required />
      <input type="text" name="position" placeholder="Puesto" value={form.position} onChange={handleChange} required />
      <input type="text" name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Correo" value={form.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Contraseña" value={form.password} onChange={handleChange} required />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Register;
